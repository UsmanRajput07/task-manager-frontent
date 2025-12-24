import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import type {  quizSummary } from "@/Types/quiz";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";

const chartConfig = {
  value: { label: "Value" },
  Correct: { label: "Correct", color: "var(--chart-1)" },
  Wrong: { label: "Wrong", color: "var(--chart-2)" },
  Attempted: { label: "Attempted", color: "var(--chart-3)" },
  NotAttempted: { label: "NotAttempted", color: "var(--chart-4)" },
} satisfies ChartConfig;

export default function BarChartComp({ data }: { data: quizSummary }) {
  const barData = [
    { label: "Correct", value: data?.correctCount, fill: "var(--chart-1)" },
    {
      label: "Wrong",
      value: data?.attemptedQuestion - data?.correctCount,
      fill: "var(--chart-2)",
    },
    {
      label: "Attempted",
      value: data?.attemptedQuestion,
      fill: "var(--chart-3)",
    },
    {
      label: "Not Attempted",
      value: data?.totalQuestions - data?.attemptedQuestion,
      fill: "var(--chart-4)",
    },
  ];
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={barData}>
        <CartesianGrid vertical={false} />

        <XAxis
          dataKey="label"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />

        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent hideLabel />}
        />

        <Bar
          dataKey="value"
          radius={8}
          strokeWidth={2}
          activeBar={({ ...props }) => (
            <Rectangle
              {...props}
              fillOpacity={0.8}
              stroke={props.payload.fill}
              strokeDasharray={4}
              strokeDashoffset={4}
            />
          )}
        />
      </BarChart>
    </ChartContainer>
  );
}
