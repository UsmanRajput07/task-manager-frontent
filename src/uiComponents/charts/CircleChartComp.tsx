import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import type { quizSummary } from "@/Types/quiz";
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

const chartConfig = {
  scorePercent: {
    label: "Score Percent",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export default function CircleChartComp({ data }: { data: quizSummary }) {
  const radialValue = Math.floor((data?.scorePercent / 100) * 360);
  const chartData = [
    { name: "Score", scorePercent: data?.scorePercent, fill: "var(--chart-1)" },
  ];
  return (
    <ChartContainer config={chartConfig} className="mx-auto w-full h-full mt-4">
      <RadialBarChart
        data={chartData}
        startAngle={0}
        endAngle={radialValue}
        innerRadius={80}
        outerRadius={110}
      >
        <PolarGrid
          gridType="circle"
          radialLines={false}
          stroke="none"
          polarRadius={[86, 74]}
        />

        <RadialBar
          dataKey="scorePercent"
          background
          cornerRadius={10}
          fill="var(--chart-1)"
        />
        <PolarRadiusAxis
          tick={false}
          tickLine={false}
          axisLine={false}
          domain={[0, 360]}
        >
          <Label
            content={({ viewBox }) => {
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text
                    x={viewBox.cx}
                    y={viewBox.cy}
                    textAnchor="middle"
                    dominantBaseline="middle"
                  >
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {Math.round(data?.scorePercent || 0)}%
                    </tspan>
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  );
}
