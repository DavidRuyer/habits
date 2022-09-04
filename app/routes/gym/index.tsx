import Layout from "../../components/Layout";
import { ChevronRightIcon } from "@heroicons/react/24/solid";
import { Link } from "@remix-run/react";
import { EXERCISES } from "../../config/gymConfig";

export default function GymList() {
  return (
    <Layout>
      <div className="overflow-y-scroll scroll space-y-4 mt-12 scrollbar-hide">
        {EXERCISES.map(({ id, name }) => (
          <Link
            to={`/gym/${id}`}
            key={name}
            className="bg-clear-light rounded text-xl px-6 py-4 flex flex-row justify-between items-center"
          >
            {name}
            <ChevronRightIcon className="h-6 w-6" />
          </Link>
        ))}
      </div>
    </Layout>
  );
}
