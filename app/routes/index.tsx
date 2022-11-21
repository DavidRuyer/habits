import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, Link, useLoaderData } from "@remix-run/react";
import Layout from "../components/Layout";
import invariant from "tiny-invariant";
import { createShit, getLastShit } from "../services/coolShit.service";
import dayjs from "../utils/dayjs";
import { categorizedHits, createCustomHit } from "../services/hits.service";
import { reverse, shuffle } from "lodash";
const SUBMITS = ["😎", "😨", "🤔"];

export async function loader() {
  const lastShit = await getLastShit();
  const categories = await categorizedHits();

  return json({
    lastShit,
    categories,
  });
}

export async function action({ request }: ActionArgs) {
  const formData = await request.formData();

  const section = formData.get("section") as string;
  invariant(section, "Expected section in payload");

  switch (section) {
    case "shit":
      const shit = formData.get("shit") as string;
      invariant(shit, "Expected shit in payload");

      const flag = formData.get("flag") as string;
      invariant(flag, "Expected flag in payload");

      console.log("Creating shit", { shit, flag });
      await createShit({ shit, flag });

      return redirect("/");

    case "hit":
      const kind = formData.get("kind") as string;
      invariant(kind, "Expected kind in payload");

      console.log("Creating hit", { kind });
      await createCustomHit(kind);

      return redirect("/");

    default:
      throw new Error(`Unrecognized section : ${section}`);
  }
}

const HitButton = ({
  id,
  emoji,
  title,
  latest,
}: {
  id: string;
  emoji: string;
  title: string;
  latest?: string;
}) => (
  <Form reloadDocument key={id} method="post">
    <input type="hidden" name="kind" value={id} />
    <input type="hidden" name="section" value="hit" />
    <button className="bg-clear-light w-full rounded px-6 py-4 space-y-2 flex flex-col items-center">
      <div className="">{title}</div>
      <div className="h-auto text-4xl">{emoji}</div>
      <div className="text-xs text-clear">
        {latest ? dayjs(latest).fromNow() : "-"}
      </div>
    </button>
  </Form>
);

export default function CoolShit() {
  const { categories, lastShit } = useLoaderData<typeof loader>();

  return (
    <Layout>
      {reverse(lastShit).map((shit, index) => (
        <div
          key={shit.id}
          className="text-sm text-center flex flex-row justify-between"
          style={{ opacity: `${20 + index * 25}%` }}
        >
          <div>
            {shit.flag} {shit.shit}
          </div>
          <div className="text-right">{dayjs(shit.createdAt).fromNow()}</div>
        </div>
      ))}

      <Form reloadDocument method="post" className="mt-2 mb-6 space-y-4">
        <input type="hidden" name="section" value="shit" />
        <input
          name="shit"
          placeholder="Cool shit"
          className="w-full rounded px-6 py-4 text-xl bg-clear-light text-white focus:ring-clear focus:outline-none focus:ring-2 placeholder:text-clear"
        />
        <div className="flex flex-row space-x-4">
          {SUBMITS.map((submit) => (
            <button
              type="submit"
              key={submit}
              name="flag"
              value={submit}
              className="bg-clear-dark text-2xl px-6 py-4 flex-grow rounded"
            >
              {submit}
            </button>
          ))}
        </div>
      </Form>

      {categories
        .filter((cat) => cat.obj)
        .map((cat) => (
          <div key={cat.id}>
            <button className="flex flex-row w-full rounded bg-clear-light px-6 py-4 items-baseline my-2">
              <div className="text-2xl self-center mr-2">{cat.emoji}</div>
              <div className="text-lg">{cat.title}</div>
              <div className="flex-1 text-xs text-clear text-right">
                {cat.latest && dayjs(cat.latest).fromNow()}
              </div>
            </button>
          </div>
        ))}

      <div className="overflow-y-scroll scroll my-auto scrollbar-hide mt-6">
        <div className="grid grid-cols-2 gap-4">
          {shuffle(categories)
            .filter((cat) => !cat.obj)
            .map((cat) => (
              <HitButton key={cat.id} {...cat} />
            ))}
        </div>
      </div>

      <div className="flex flex-row justify-between mb-2 p-4 text-lg text-clear">
        <Link to="/smoke">Smoke</Link>
        <Link to="/gym">Gym</Link>
      </div>
    </Layout>
  );
}
