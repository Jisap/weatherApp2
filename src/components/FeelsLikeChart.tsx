import { useMemo, useState } from "react"
import { useWeather } from "./WeatherProvider"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { Skeleton } from "./ui/skeleton"
import type { ChartConfig } from "./ui/chart"

const chartConfig = {
  feels: {
    label: "Temperature",
    color: "var(--chart-1)",
  },
  temp: {
    label: "Feels Like",
    color: "var(--muted-foreground)",
  },
} satisfies ChartConfig


export const FeelsLikeChart = () => {

  const { weather } = useWeather();

  const chartData = useMemo(() => {
    return weather?.hourly.map((item) => ({
      hour: new Date(item.dt * 1000).toLocaleTimeString(
        "en-US", {
        hour: "numeric",
        hour12: true
      }),
      temp: item.temp.toFixed(),
      feels: item.feels_like.toFixed(),
    }))
  }, [weather]);

  if (!chartData) return <Skeleton className="h-[360px]" />

  return (
    <ChartContainer config={chartConfig} className="h-[360px] w-full">
      <AreaChart
        accessibilityLayer
        data={chartData}
      >
        <CartesianGrid strokeDasharray={4} />
        <XAxis
          dataKey="hour"
          tickLine={false}
          axisLine={false}
          tickCount={12}
          tickMargin={16}
        />
        <YAxis
          dataKey="feels"
          tickLine={false}
          axisLine={false}
          tickCount={5}
          tickMargin={16}
          tickFormatter={(value) => `${value}`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent />}
        />

        <defs>
          <linearGradient
            id="fillFeelsLike"
            x1="0"
            y1="0"
            x2="0"
            y2="0"
          >
            <stop
              offset="0%"
              stopColor="var(--temp-high)"
              stopOpacity={1}
            />
            <stop
              offset="50%"
              stopColor="var(--temp-mid)"
              stopOpacity={0.5}
            />
            <stop
              offset="100%"
              stopColor="var(--temp-low)"
              stopOpacity={0}
            />
          </linearGradient>
        </defs>

        <Area
          dataKey="feels"
          type="natural"
          fill="url(#fillFeelsLike)"
          fillOpacity={0.5}
          stroke="var(--color-feels)"
          strokeOpacity={0}
        />

        <Area
          dataKey="temp"
          type="natural"
          fillOpacity={0}
          stroke="var(--color-temp)"
          strokeWidth={2}
          activeDot={false}
        />

        <ChartLegend content={<ChartLegendContent />} />
      </AreaChart>
    </ChartContainer>
  )
}
