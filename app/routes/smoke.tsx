import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import dayjs from "../utils/dayjs";
import Progress from "../components/Progress";
import { createHit, fetchLastHit } from "../services/hits.service";
import Layout from "../components/Layout";
import useTimer from "../utils/useTimer";

export async function loader() {
  const lastHit = await fetchLastHit();

  return json({
    lastHit: lastHit?.toDate(),
  });
}

export async function action({ request }: ActionArgs) {
  await createHit({});

  return redirect("/smoke");
}

function SafeProgress(props: { lastHit: string | undefined; now: Date }) {
  const dayNow = dayjs(props.now);

  if (!props.lastHit) {
    return (
      <Progress value={dayNow.second() / 60} text={dayNow.format("mm:ss")} />
    );
  }

  const elapsed = dayjs.duration(dayNow.diff(dayjs(props.lastHit)));
  const displayed =
    elapsed.months() >= 1
      ? elapsed.format("M[m] D[d]")
      : elapsed.days() >= 1
      ? elapsed.format("D[d] H[H]")
      : elapsed.format("H:mm:ss");

  return <Progress value={elapsed.seconds() / 60} text={displayed} />;
}

export default function Smoke() {
  const data = useLoaderData<typeof loader>();

  // Timer
  const time = useTimer();

  return (
    <Layout>
      <div className="flex-grow"></div>

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

      <div className="flex-grow"></div>

      <div className="flex flex-row justify-between mb-2 p-4 text-lg text-clear">
        <Link to="/stats">Stats</Link>
        <Link to="/gym">Gym</Link>
      </div>
    </Layout>
  );
}
