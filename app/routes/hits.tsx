import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { ActionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import dayjs from "../utils/dayjs";
import Layout from "../components/Layout";
import { categorizedHits, createCustomHit } from "../services/hits.service";
import classNames from "../utils/classnames";
import invariant from "tiny-invariant";
import { reverse } from "lodash";

// 15 ticks should fit in the layout

export async function loader() {
  const categories = await categorizedHits();
  return json({
    categories,
  });
}

export const action = async ({ request }: ActionArgs) => {
  const formData = await request.formData();
  const kind = formData.get("kind") as string;
  invariant(kind, "Expected kind in payload");

  console.log("hitting", kind);

  await createCustomHit(kind);

  return redirect("/hits");
};

const Tick = (props: { current: boolean; value: number }) => (
  <div
    className={classNames(
      "h-4 w-1.5 rounded",
      props.value === 1
        ? "bg-clear"
        : props.current
        ? "bg-clear animate-pulse"
        : "bg-clear-light"
    )}
  ></div>
);

export default function Hits() {
  const { categories } = useLoaderData<typeof loader>();

  return (
    <Layout>
      <div className="overflow-y-scroll scroll my-auto scrollbar-hide">
        {categories.map(({ id, emoji, title, stats, latest }) => (
          <form
            key={id}
            method="post"
            className="bg-clear-light rounded px-6 py-4 space-x-6 flex flex-row justify-between items-center mb-4 first:mt-8 last:mb-8"
          >
            <div className="h-auto text-4xl w-8">{emoji}</div>
            <div className="flex-1 flex-col space-y-2">
              <div className="flex flex-row justify-between items-baseline">
                <div className="text-lg">{title}</div>
                <div className="text-clear text-sm">
                  {dayjs(latest).fromNow()}
                </div>
              </div>
              <div className="flex flex-row justify-end space-x-1">
                {/* flex-row-reverse display bug */}
                {reverse(stats).map((val, index) => (
                  <Tick
                    key={index}
                    current={index === stats.length - 1}
                    value={val}
                  />
                ))}
              </div>
              <input type="hidden" name="kind" value={id} />
            </div>
            <button>
              <PlusCircleIcon className="h-8 w-8" />
            </button>
          </form>
        ))}
      </div>
    </Layout>
  );
}
