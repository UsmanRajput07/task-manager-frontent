import { intervalToDuration } from "date-fns";

export const secToMin = (data: number) => {
  const duration = intervalToDuration({
    start: 0,
    end: (data ?? 0) * 1000, // convert to milliseconds
  });
  const formatted = `${duration?.minutes ?? 0}m ${
    duration.seconds ?? 0
  }s`;
  return formatted;
};
