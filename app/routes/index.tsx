import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import { createShit } from "../services/coolShit.service";
import Layout from "../components/Layout";
import invariant from "tiny-invariant";

const SUBMITS = [
  "Cool shit is cool 😎",
  "Better done than todo",
  "Adventure !",
  "Progress 💪",
  "🎉",
];

// export async function loader() {
//   return json({});
// }

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();
  const shit = formData.get("shit") as string;
  invariant(shit, "Expected reps in payload");

  await createShit({ shit });

  return redirect("/");
}

export default function CoolShit() {
  // const data = useLoaderData<typeof loader>();

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
            className="bg-clear-dark text-2xl px-6 py-4 w-full rounded"
          >
            {submit}
          </button>
        ))}
      </Form>

      <div className="flex-grow"></div>

      <div className="flex flex-row justify-between mb-2 p-4 text-lg text-clear">
        <Link to="/smoke">Smoke</Link>
        <Link to="/gym">Gym</Link>
      </div>
    </Layout>
  );
}
