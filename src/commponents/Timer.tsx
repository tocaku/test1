import React, { useEffect, useState } from "react";

interface TimerProps {
  durationInSeconds: number;
  onTimeout: () => void;
}

const Timer: React.FC<TimerProps> = ({ durationInSeconds, onTimeout }) => {
  const [secondsLeft, setSecondsLeft] = useState(durationInSeconds);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (secondsLeft > 0) {
        setSecondsLeft((prevSeconds) => prevSeconds - 1);
      } else {
        clearInterval(intervalId); 
        onTimeout(); 
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [secondsLeft, onTimeout]);

  return (
    <div>
      <p>Time Left: {secondsLeft} seconds</p>
    </div>
  );
};

export default Timer;
