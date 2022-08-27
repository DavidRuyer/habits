import type { Dayjs } from "dayjs";
import dayjs from "../utils/dayjs";
import { db } from "../utils/db.server";
import { rangeRight } from "lodash";

const MIN_ELAPSED_IN_SECONDS = 30;
const HISTORY_IN_DAYS = 21;

export const fetchLastHit = async () => {
  const hit = await db.hit.findFirst({ orderBy: { createdAt: "desc" } });

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
      createdAt: (args.createdAt ?? dayjs()).toDate(),
    },
  });
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
