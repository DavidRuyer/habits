import { Link, useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import { Bar, BarChart, ReferenceLine, ResponsiveContainer } from "recharts";
import { db } from "../utils/db.server";

interface Result {
  date: Date;
  count: number;
}

export async function loader() {
  const lastWeek = dayjs().subtract(7, "days").toDate();

  // Consider day end at 4AM
  const results: any = await db.$queryRaw`
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

  const stats: Result[] = results.map((res: any) => ({
    date: res.date,
    count: Number(res.count),
  }));

  return { stats };
}

export default function Stats() {
  const data = useLoaderData<typeof loader>();

  return (
    <div className="flex flex-col h-full mx-8">
      <div className="flex-grow"></div>

      <ResponsiveContainer width="100%" height="60%">
        <BarChart width={400} height={400} data={data.stats}>
          <ReferenceLine
            y={2}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={4}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={6}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={8}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={10}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeDasharray="3 3"
          />

          <ReferenceLine y={0} stroke="white" strokeWidth={2} />
          <Bar dataKey="count" className="fill-clear" />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex-grow"></div>

      <Link to="/">
        <div className="text-center mb-2 p-4 text-lg text-clear">Back</div>
      </Link>
    </div>
  );
}
