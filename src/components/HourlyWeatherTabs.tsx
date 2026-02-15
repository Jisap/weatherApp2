import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Bar, BarChart } from "recharts"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"
import { useState } from "react";
import { OverviewChart } from "./OverviewChart";

type Tab =
  | "overview"
  | "precipitation"
  | "wind"
  | "humidity"
  | "cloudCover"
  | "pressure"
  | "uv"
  | "visibility"
  | "feelsLike";

const TABS_LIST = [
  {
    title: "Overwiew",
    value: "overview",
  },
  {
    title: "Precipitation",
    value: "precipitation",
  },
  {
    title: "Wind",
    value: "wind",
  },
  {
    title: "Humidity",
    value: "humidity",
  },
  {
    title: "Cloud Cover",
    value: "cloudCover",
  },
  {
    title: "Pressure",
    value: "pressure",
  },
  {
    title: "UV",
    value: "uv",
  },
  {
    title: "Visibility",
    value: "visibility",
  },
  {
    title: "Feels Like",
    value: "feelsLike",
  },
]




export const HourlyWeatherTabs = () => {

  const [tab, setTab] = useState<Tab>("overview");

  return (
    <Tabs
      value={tab}
      onValueChange={(value) => setTab(value as Tab)}
      className="py-4 gap-4"
    >
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">
          Hourly Weather
        </h2>

        <TabsList
          className="bg-background gap-2 overflow-x-auto overflow-y-hidden justify-start"
          style={{ scrollbarWidth: "none" }}
        >
          {TABS_LIST.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="border-none bg-secondary h-9 px-4 rounded-full data-[state=active]:bg-primary! data-[state=active]:text-background"
            >
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      <TabsContent value="overview">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>

          <CardContent>
            <OverviewChart />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

