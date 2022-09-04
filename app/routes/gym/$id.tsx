import Layout from "../../components/Layout";
import Progress from "../../components/Progress";
import useTimer from "../../utils/useTimer";
import dayjs from "../../utils/dayjs";
import { useState } from "react";
import type { Dayjs } from "dayjs";
import { useParams } from "@remix-run/react";
import { EXERCISES, WEIGHTS } from "../../config/gymConfig";
import classNames from "../../utils/classnames";

const TIMERS = [30, 45, 60];

type SCREEN = "timer" | "weight" | "rate";

export default function ExercicePage() {
  const params = useParams();
  const exercise = EXERCISES.find((e) => e.id === params.id);

  const [currentWeight, setCurrentWeight] = useState<number | null>(null);

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

  const handleWeightClick = (weight: number) => {
    console.log("Clicked weight", weight);
    setCurrentWeight(weight);
  };

  return (
    <Layout>
      <Progress
        value={remaining ? 1 - remaining / timerDelay : 0}
        text={remaining ? `${remaining}s` : "Start"}
      />

      <div className="flex flex-row justify-around mt-8">
        {TIMERS.map((delay) => (
          <button
            className="bg-clear-light inline-block rounded-full text-lg px-6 py-1"
            key={delay}
            onClick={() => handleTimer(delay)}
          >
            {delay}s
          </button>
        ))}
      </div>

      <div className="flex-grow"></div>

      <div className="overflow-x-scroll flex flex-row space-x-4 scrollbar-hide">
        {WEIGHTS.map((weight) => (
          <button
            className={classNames(
              "bg-clear-light rounded-full text-lg px-6 py-1 border-2",
              weight === currentWeight ? "border-clear" : "border-transparent"
            )}
            key={weight}
            onClick={() => handleWeightClick(weight)}
          >
            {weight}
          </button>
        ))}
      </div>
    </Layout>
  );
}
