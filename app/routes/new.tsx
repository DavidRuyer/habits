import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { createHit } from "../services/hits.service";
import dayjs from "../utils/dayjs";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const quickValue = formData.get("quick_value");
  const customValue = formData.get("custom_value");

  // Type assertion
  if (
    (quickValue && typeof quickValue !== "string") ||
    typeof customValue !== "string" ||
    (!quickValue && !customValue)
  ) {
    throw new Error(`Form not submitted correctly.`);
  }

  const value = quickValue ? Number(quickValue) : Number(customValue);
  const actualCreatedAt = dayjs().subtract(value, "minutes");

  await createHit({ createdAt: actualCreatedAt });

  return redirect("/");
};

export default function New() {
  return (
    <div className="flex flex-col h-full mx-8 ">
      <div className="flex-grow"></div>

      <Form method="post" className="space-y-12">
        <div className="space-y-4">
          <button
            name="quick_value"
            value="5"
            type="submit"
            className="bg-clear-light text-white rounded-sm w-full px-4 py-3 text-lg"
          >
            5 minutes
          </button>
          <button
            name="quick_value"
            value="10"
            type="submit"
            className="bg-clear-light text-white rounded-sm w-full px-4 py-3 text-lg"
          >
            10 minutes
          </button>
          <button
            name="quick_value"
            value="15"
            type="submit"
            className="bg-clear-light text-white rounded-sm w-full px-4 py-3 text-lg"
          >
            15 minutes
          </button>
        </div>

        <label className="flex flex-row items-center">
          <input
            name="custom_value"
            placeholder="30"
            className="rounded-sm py-2 px-4 text-gray-700 mr-2 flex-grow bg-clear"
          />
          <div className="text-clear">minutes ago</div>
        </label>
        <button
          type="submit"
          className="bg-clear-dark text-2xl px-6 py-4 w-full rounded"
        >
          Fix
        </button>
      </Form>

      <div className="flex-grow"></div>

      <Link to="/">
        <div className="text-center mb-2 p-4 text-lg text-clear">Back</div>
      </Link>
    </div>
  );
}
