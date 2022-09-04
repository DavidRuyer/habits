import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import dayjs from "../utils/dayjs";
import { useEffect, useState } from "react";
import Progress from "../components/Progress";
import { createHit, fetchLastHit } from "../services/hits.service";
import Layout from "../components/Layout";

export async function loader() {
  const lastHit = await fetchLastHit();

  return json({
    lastHit: lastHit?.toDate(),
  });
}

export async function action({ request }: ActionArgs) {
  await createHit({});

  return redirect("/");
}

const useTimer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return function cleanup() {
      clearInterval(interval);
    };
  });

  return time;
};

function SafeProgress(props: { lastHit: string | undefined; now: Date }) {
  const dayNow = dayjs(props.now);

  if (!props.lastHit) {
    return (
      <Progress value={dayNow.second() / 60} text={dayNow.format("mm:ss")} />
    );
  }

  const elapsed = dayjs.duration(dayNow.diff(dayjs(props.lastHit)));

  return (
    <Progress value={elapsed.seconds() / 60} text={elapsed.format("H:mm:ss")} />
  );
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  // Timer
  const time = useTimer();

  return (
    <Layout backUrl="/" nextUrl="/stats" nextTitle="Stats">
      <SafeProgress lastHit={data.lastHit} now={time} />

      <div className="mt-12">
        <Form method="post">
          <button
            type="submit"
            className="bg-clear-dark text-2xl px-6 py-4 w-full rounded"
          >
            Hit
          </button>
        </Form>
      </div>
    </Layout>
  );
}
