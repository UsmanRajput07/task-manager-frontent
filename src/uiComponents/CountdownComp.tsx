import React, { useRef } from "react";
import Countdown from "react-countdown";

const CountdownComp = React.memo(
  ({
    submitTest,
  }: {
    // minutes: number;
    submitTest: () => void;
  }) => {
      const endTimeRef = useRef(Date.now() + 30 * 60 * 1000);
    return (
      <div className="text-lg font-semibold text-red-500">
        <Countdown
          date={endTimeRef.current}
          onComplete={submitTest}
          renderer={({ minutes, seconds }) => (
            <div>
              <span className="text-lg font-bold text-red-500 bg-red-100 px-2 rounded-md">
                {minutes}
              </span>
              :
              <span className="text-lg font-bold text-red-500 bg-red-100 px-2 rounded-md">
                {seconds}
              </span>
            </div>
          )}
        />
      </div>
    );
  }
);

export default CountdownComp;
