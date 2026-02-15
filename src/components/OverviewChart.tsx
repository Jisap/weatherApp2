import { useMemo, useState } from "react"
import { useWeather } from "./WeatherProvider"
import { Area, CartesianGrid, XAxis, YAxis } from "recharts"
import { AreaChart } from "lucide-react"
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "./ui/chart"
import { Skeleton } from "./ui/skeleton"
import type { ChartConfig } from "./ui/chart"

const chartConfig = {
  temp: {
    label: "Temperature",
    color: "var(--chart-1)",
  },
  feels: {
    label: "Feels Like",
    color: "var(--muted-foreground)",
  },
} satisfies ChartConfig


export const OverviewChart = () => {

  const { weather } = useWeather();

  const chartData = useMemo(() => {
    return weather?.hourly.map((item) => ({
      hour: new Date(item.dt * 1000).toLocaleTimeString(
        "en-US", {
        hour: "numeric",
        hour12: true
      }
      )
    }))
  }, [weather])

  return (
    <div>OverviewChart</div>
  )
}
