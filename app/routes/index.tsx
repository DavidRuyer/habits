import type { Hit } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useEffect, useState } from "react";
import Progress from "../components/Progress";
import { db } from "../utils/db.server";

dayjs.extend(duration);

type LoaderData = { lastHit: Hit | null };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    lastHit: await db.hit.findFirst({ orderBy: { createdAt: "desc" } }),
  };
  return json(data);
};

export const action: ActionFunction = async ({ request }) => {
  await db.hit.create({ data: {} });

  return redirect("/");
};

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
  const data = useLoaderData<LoaderData>();

  // Timer
  const time = useTimer();

  return (
    <div className="flex flex-col h-full ">
      <div className="flex-grow"></div>

      <div className="m-8">
        <SafeProgress lastHit={data.lastHit?.createdAt} now={time} />
      </div>

      <div className="mt-12 mx-8">
        <Form method="post">
          <button
            type="submit"
            className="bg-slate-600 text-2xl px-6 py-4 w-full rounded"
          >
            Hit
          </button>
        </Form>
      </div>

      <div className="flex-grow"></div>
    </div>
  );
}
