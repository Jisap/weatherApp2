import { useMemo, useState } from "react"
import { useWeather } from "./WeatherProvider"
import { Area, Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { Skeleton } from "./ui/skeleton"
import type { ChartConfig } from "./ui/chart"

const chartConfig = {
  humidity: {
    label: "Humidity",
    color: "var(--humidity)",
  },
  dew_point: {
    label: "Dew Point",
    color: "var(--dew_point)",
  },
} satisfies ChartConfig


export const HumidityChart = () => {

  const { weather } = useWeather();

  const chartData = useMemo(() => {
    return weather?.hourly.map((item) => ({
      hour: new Date(item.dt * 1000).toLocaleTimeString(
        "en-US", {
        hour: "numeric",
        hour12: true
      }),
      humidity: item.humidity,
      dew_point: item.dew_point
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
          dataKey="humidity"
          tickLine={false}
          axisLine={false}
          tickMargin={16}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />

        <defs>
          <linearGradient
            id="fillHumidity"
            x1="0"
            y1="0"
            x2="0"
            y2="0"
          >
            <stop
              offset="0%"
              stopColor="var(--color-humidity)"
              stopOpacity={1}
            />
            <stop
              offset="100%"
              stopColor="var(--color-humidity)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <Area
          dataKey="humidity"
          type="natural"
          fill="url(#fillHumidity)"
          fillOpacity={0.5}
          stroke="var(--color-humidity)"
          strokeOpacity={0}
        />

        <Area
          dataKey="dew_point"
          type="natural"
          fill="var(--color-dew_point)"
          fillOpacity={0}
          stroke="var(--color-dew_point)"
          strokeWidth={2}
          activeDot={false}
        />

        <ChartLegend content={<ChartLegendContent />} />
      </BarChart>
    </ChartContainer>
  )
}
