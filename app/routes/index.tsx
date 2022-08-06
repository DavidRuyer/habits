import type { Hit } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { db } from "../utils/db.server";

type LoaderData = { hits: Array<Hit> };

export const loader: LoaderFunction = async () => {
  const data: LoaderData = {
    hits: await db.hit.findMany(),
  };
  return json(data);
};

export const action: ActionFunction = async ({ request }) => {
  await db.hit.create({ data: {} });

  return redirect("/");
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  return (
    <>
      <h1>HITS</h1>
      <ul>
        {data.hits.map((hit) => (
          <li key={hit.id}>
            {hit.id} - {hit.createdAt}
          </li>
        ))}
      </ul>
      <Form method="post">
        <button type="submit">Create</button>
      </Form>
    </>
  );
}
