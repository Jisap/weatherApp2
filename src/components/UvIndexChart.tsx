import { useMemo, useState } from "react"
import { useWeather } from "./WeatherProvider"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { Skeleton } from "./ui/skeleton"
import type { ChartConfig } from "./ui/chart"

const chartConfig = {
  uv: {
    label: "UV",
    color: "var(--uv)",
  },
} satisfies ChartConfig


export const UvIndexChart = () => {

  const { weather } = useWeather();

  const chartData = useMemo(() => {
    return weather?.hourly.map((item) => ({
      hour: new Date(item.dt * 1000).toLocaleTimeString(
        "en-US", {
        hour: "numeric",
        hour12: true
      }),
      uv: item.uvi,
    }))
  }, [weather]);

  if (!chartData) return <Skeleton className="h-[360px]" />

  return (
    <ChartContainer config={chartConfig} className="h-[360px] w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        barSize={20}
        barCategoryGap={0}
      >
        <CartesianGrid strokeDasharray={4} vertical={false} />
        <XAxis
          dataKey="hour"
          tickLine={false}
          axisLine={false}
          tickCount={12}
          tickMargin={16}
        />
        <YAxis
          dataKey="uv"
          tickLine={false}
          axisLine={false}
          tickMargin={16}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />

        <Bar
          dataKey="uv"
          fill="var(--color-uv)"
          stroke="var(--color-uv)"
          radius={[100, 100, 0, 0]}
        />

        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  )
}
