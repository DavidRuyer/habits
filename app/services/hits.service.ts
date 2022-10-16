import type { Dayjs } from "dayjs";
import dayjs from "../utils/dayjs";
import { db } from "../utils/db.server";
import {
  countBy,
  groupBy,
  maxBy,
  minBy,
  range,
  rangeRight,
  wrap,
} from "lodash";
import { Habit, HABITS } from "../config/habitsConfig";
import { date } from "zod";

const MIN_ELAPSED_IN_SECONDS = 30;
const HISTORY_IN_DAYS = 21;
const HISTORY_TICKS = 18;

export const fetchLastHit = async () => {
  const hit = await db.hit.findFirst({
    where: { kind: "smoke" },
    orderBy: { createdAt: "desc" },
  });

  return hit ? dayjs(hit.createdAt) : null;
};

export const createHit = async (args: { createdAt?: Dayjs }) => {
  const lastHit = await fetchLastHit();

  if (lastHit) {
    const elapsed = dayjs.duration(dayjs().diff(lastHit));
    if (elapsed.seconds() <= MIN_ELAPSED_IN_SECONDS) {
      console.log(`Only ${elapsed.seconds()} seconds since last hit, skipping`);
      return;
    }
  }

  // Avoid double clicks : check if created in the last 30 seconds
  await db.hit.create({
    data: {
      kind: "smoke",
      createdAt: (args.createdAt ?? dayjs()).toDate(),
    },
  });
};

export const createCustomHit = async (kind: string) => {
  await db.hit.create({
    data: {
      kind,
      createdAt: dayjs().toDate(),
    },
  });
};

const getBucket = (date: Date, frequency: Habit["frequency"]): number => {
  const wrapped = dayjs(date).subtract(4, "hour");
  const now = dayjs();

  switch (frequency) {
    case "day":
      return now.diff(wrapped, "day");

    case "week":
      return now.diff(wrapped, "week");

    case "month":
      return now.diff(wrapped, "month");
  }
};

export const categorizedHits = async () => {
  const allHits = await db.hit.findMany({
    where: { kind: { not: "smoke" } },
  });

  const getCategoryData = (category: Habit) => {
    const categoryHits = allHits.filter((hit) => hit.kind === category.id);

    const oldestDate =
      minBy(categoryHits, (hit) => hit.createdAt)?.createdAt ?? new Date();
    const latestDate =
      maxBy(categoryHits, (hit) => hit.createdAt)?.createdAt ?? new Date();

    const grouped = countBy(categoryHits, (hit) =>
      getBucket(hit.createdAt, category.frequency)
    );

    const ticks =
      Math.min(
        getBucket(oldestDate ?? new Date(), category.frequency),
        HISTORY_TICKS
      ) + 1;

    // Get only the ones which matter
    const stats = range(ticks).map((i) => grouped[i] ?? 0);

    return {
      latest: latestDate,
      stats,
    };
  };

  return HABITS.map((habit) => ({ ...habit, ...getCategoryData(habit) }));
};

interface StatPoint {
  date: Date;
  count: number;
}

export const getStats = async () => {
  const lastWeek = dayjs().subtract(HISTORY_IN_DAYS, "days").toDate();

  // Consider day end at 4AM
  const results: { date: Date; count: BigInt }[] = await db.$queryRaw`
    WITH bydate AS (
      SELECT
        id,
        DATE("createdAt" - interval '4' hour) date
      FROM
        "Hit"
      WHERE kind = 'smoke'
    )
    SELECT
      date,
      COUNT(id) count
    FROM
      bydate
    WHERE
      date >= ${lastWeek}
    GROUP BY
      date
    ORDER BY
      date ASC
  `;

  // Enforce a datapoint for each day event if no hit
  const stats: StatPoint[] = rangeRight(HISTORY_IN_DAYS)
    .map((days) => dayjs().subtract(days, "days"))
    .map((day) => ({
      date: day.toDate(),
      count: Number(results.find(({ date }) => day.isSame(date, "day"))?.count),
    }));

  return stats;
};
