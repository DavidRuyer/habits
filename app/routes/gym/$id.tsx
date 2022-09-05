import { useState } from "react";
import type { Dayjs } from "dayjs";
import { Form, useLoaderData, useParams } from "@remix-run/react";
import {
  ActionArgs,
  json,
  LoaderArgs,
  redirect,
  Response,
} from "@remix-run/node";
import invariant from "tiny-invariant";

import Progress from "../../components/Progress";
import useTimer from "../../utils/useTimer";
import dayjs from "../../utils/dayjs";
import { EXERCISES, RATINGS, WEIGHTS } from "../../config/gymConfig";
import classNames from "../../utils/classnames";
import {
  createSession,
  getLastSession,
  Reps,
  RepsSchema,
} from "../../services/gym.service";
import { CloudArrowUpIcon } from "@heroicons/react/24/solid";

const TIMERS = [30, 45, 60];

export const loader = async ({ params }: LoaderArgs) => {
  invariant(params.id, "Expected params.id");

  const exercise = EXERCISES.find((e) => e.id === params.id);

  if (!exercise) {
    throw new Response("Not Found", {
      status: 404,
    });
  }

  const lastSession = await getLastSession(params.id);
  const lastReps = lastSession ? RepsSchema.parse(lastSession.reps) : [];

  return json({ exercise, lastReps });
};

export const action = async ({ request, params }: ActionArgs) => {
  invariant(params.id, "Expected params.id");

  const formData = await request.formData();
  const repsData = formData.get("reps") as string;
  invariant(repsData, "Expected reps in payload");

  const reps = RepsSchema.parse(JSON.parse(repsData));

  await createSession({
    slug: params.id,
    reps,
  });

  return redirect("/gym");
};

function RepsList(props: { reps: Reps }) {
  return (
    <div>
      {props.reps.map((rep, index) => (
        <div
          key={index}
          className="inline-block mx-1 bg-clear-light rounded px-2 py-1 text-xs"
        >
          {rep.weight} {RATINGS.find((r) => r.rate === rep.rating)?.label}
        </div>
      ))}
    </div>
  );
}

export default function ExercicePage() {
  const { exercise, lastReps } = useLoaderData<typeof loader>();

  const [reps, setReps] = useState<Reps>([]);
  const [currentWeight, setCurrentWeight] = useState<number | null>(null);
  const [currentRating, setCurrentRating] = useState<number | null>(null);

  const [timerEnd, setTimerEnd] = useState<Dayjs | null>(null);
  const [timerDelay, setTimerDelay] = useState(30);
  const time = useTimer();

  const remaining =
    timerEnd && timerEnd.isAfter(time) && timerEnd.diff(time, "second");

  const handleTimer = (delay: number) => {
    // Add 0.9 otherwise direct jump from 30 to 28 remaining (may be due to a misunderstanding somewhere else though)
    setTimerEnd(dayjs(time).add(delay + 0.9, "second"));
    setTimerDelay(delay);
  };

  const handleAppend = () => {
    if (!currentRating || !currentWeight) {
      alert("Fill in");
      return;
    }

    setReps([...reps, { weight: currentWeight, rating: currentRating }]);
    setCurrentWeight(null);
    setCurrentRating(null);
  };

  const handleSubmit = () => {
    console.log("Submitting", exercise.id, reps);
  };

  return (
    <div className="flex flex-col h-full">
      <Form reloadDocument method="post">
        <input type="hidden" name="reps" value={JSON.stringify(reps)} />
        <button
          type="submit"
          className="bg-clear-light rounded-full p-3 text-xl absolute top-3 right-3"
        >
          <CloudArrowUpIcon className="h-8 w-8" />
        </button>
      </Form>

      <div className="text-2xl text-center mt-6 px-20">{exercise.name}</div>

      <div className="flex flex-row mx-4 items-center mt-8 h-7">
        <div className="text-clear text-right uppercase text-xs w-16 mr-4">
          Last
        </div>
        <RepsList reps={lastReps} />
      </div>
      <div className="flex flex-row mx-4 items-center mt-1 h-7">
        <div className="text-clear text-right uppercase text-xs w-16 mr-4">
          Current
        </div>
        <RepsList reps={reps} />
      </div>

      <div className="flex-grow"></div>

      <div className="mx-12">
        <Progress
          value={remaining ? 1 - remaining / timerDelay : 0}
          text={remaining ? `${remaining}s` : "Start"}
        />
        <div className="flex flex-row justify-around mt-4">
          {TIMERS.map((delay) => (
            <button
              className="bg-clear-light inline-block rounded-full text-lg px-6 h-8"
              key={delay}
              onClick={() => handleTimer(delay)}
            >
              {delay}s
            </button>
          ))}
        </div>
      </div>

      <div className="flex-grow"></div>

      <div className="overflow-x-scroll flex flex-row space-x-4 scrollbar-hide mt-10">
        {WEIGHTS.map((weight) => (
          <button
            className={classNames(
              "bg-clear-light h-8 rounded-full text-lg px-6 border-2 first:ml-8 last:mr-8",
              weight === currentWeight ? "border-clear" : "border-transparent"
            )}
            key={weight}
            onClick={() => setCurrentWeight(weight)}
          >
            {weight}
          </button>
        ))}
      </div>

      <div className="flex flex-row space-x-4 justify-between mt-6 mx-8">
        {RATINGS.map((rating) => (
          <button
            className={classNames(
              "bg-clear-light h-8 rounded-full text-lg px-6 border-2",
              rating.rate === currentRating
                ? "border-clear"
                : "border-transparent"
            )}
            key={rating.rate}
            onClick={() => setCurrentRating(rating.rate)}
          >
            {rating.label}
          </button>
        ))}
      </div>

      <button
        onClick={handleAppend}
        className="bg-clear-light rounded text-center text-xl px-6 py-2 mx-8 mb-8 mt-6"
      >
        Add
      </button>
    </div>
  );
}
