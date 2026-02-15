import { useMemo, useState } from "react"
import { useWeather } from "./WeatherProvider"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { Skeleton } from "./ui/skeleton"
import type { ChartConfig } from "./ui/chart"

const chartConfig = {
  rain: {
    label: "Rain",
    color: "var(--rain)",
  },
  snow: {
    label: "Snow",
    color: "var(--snow)",
  },
} satisfies ChartConfig


export const PrecipitationChart = () => {

  const { weather } = useWeather();

  const chartData = useMemo(() => {
    return weather?.hourly.map((item) => ({
      hour: new Date(item.dt * 1000).toLocaleTimeString(
        "en-US", {
        hour: "numeric",
        hour12: true
      }),
      rain: item.rain?.["1h"] || 0,
      snow: item.snow?.["1h"] || 0,
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
          dataKey="pop"
          tickLine={false}
          axisLine={false}
          tickCount={3}
          tickMargin={16}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />

        <Bar
          dataKey="rain"
          fill="var(--color-rain)"
          stroke="var(--color-rain)"
          radius={[100, 100, 0, 0]}
        />

        <Bar
          dataKey="snow"
          fill="var(--color-snow)"
          stroke="var(--color-snow)"
          radius={[100, 100, 0, 0]}
        />

        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  )
}
