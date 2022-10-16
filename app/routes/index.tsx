import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import Layout from "../components/Layout";
import invariant from "tiny-invariant";
import { getLastShit } from "../services/coolShit.service";
import dayjs from "../utils/dayjs";

const SUBMITS = [
  "Appreciate cool 😎",
  "One step forward 💪",
  "Adventure 😨",
  "Fuck yeah 🎉",
];

export async function loader() {
  const lastShit = await getLastShit();
  return json({
    lastShit,
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const shit = formData.get("shit") as string;
  invariant(shit, "Expected shit in payload");

  const flag = formData.get("flag") as string;
  invariant(flag, "Expected flag in payload");

  console.log({ shit, flag });

  return redirect("/");
}

export default function CoolShit() {
  const { lastShit } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="flex-grow"></div>

      <Form reloadDocument method="post" className="space-y-4">
        <input
          name="shit"
          placeholder="Cool shit"
          className="w-full rounded px-6 py-4 text-xl bg-clear-light text-white focus:ring-clear focus:outline-none focus:ring-2 placeholder:text-clear"
        />
        {SUBMITS.map((submit) => (
          <button
            type="submit"
            key={submit}
            name="flag"
            value={submit}
            className="bg-clear-dark text-2xl px-6 py-4 w-full rounded"
          >
            {submit}
          </button>
        ))}
      </Form>

      <div className="flex-grow"></div>

      {lastShit && (
        <div className="text-sm text-center text-clear-light mb-2">
          {lastShit.shit} - {dayjs(lastShit.createdAt).fromNow()}{" "}
        </div>
      )}
      <div className="flex flex-row justify-between mb-2 p-4 text-lg text-clear">
        <Link to="/hits">Hits</Link>
        <Link to="/gym">Gym</Link>
      </div>
    </Layout>
  );
}
