import { useLoaderData } from "@remix-run/react";
import { Bar, BarChart, ReferenceLine, ResponsiveContainer } from "recharts";
import Layout from "../components/Layout";
import { getStats } from "../services/hits.service";

export async function loader() {
  const stats = await getStats();

  return { stats };
}

export default function Stats() {
  const data = useLoaderData<typeof loader>();

  return (
    <Layout>
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
          <ReferenceLine
            y={15}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={20}
            stroke="rgba(255, 255, 255, 0.8)"
            strokeDasharray="3 3"
          />

          <ReferenceLine y={0} stroke="white" strokeWidth={2} />
          <Bar dataKey="count" className="fill-clear" />
        </BarChart>
      </ResponsiveContainer>
    </Layout>
  );
}
