import { useEffect, useState } from "react";

const useTimer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return function cleanup() {
      clearInterval(interval);
    };
  });

  return time;
};

export default useTimer;
