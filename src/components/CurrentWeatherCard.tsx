import { APP, WEATHER_API } from "@/config"
import { useWeather } from "./WeatherProvider"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Navigation2Icon } from "lucide-react";
import type { WeatherUnitType } from "./WeatherProvider";
import { Skeleton } from "./ui/skeleton";



export const CurrentWeatherCard = () => {

  const { weather } = useWeather();

  if (!weather) return <Skeleton className="min-h-[300px] rounded-xl" />

  const currentWeather = {
    dt: new Date(weather.current.dt * 1000)
      .toLocaleTimeString(
        "en-US", {
        timeStyle: "short"
      },
      ),
    iconCode: weather.current.weather[0].icon,
    temp: weather.current.temp.toFixed(),
    description: weather.current.weather[0].description,
    feelsLike: weather.current.feels_like.toFixed(),
    windSpeed: weather.current.wind_speed.toFixed(),
    windDeg: weather.current.wind_deg,
    humidity: (weather.current.humidity / 1000).toFixed(),
    pressure: weather.current.pressure,
    visibility: (weather.current.visibility / 1000).toFixed(),
    dewPoint: weather.current.dew_point.toFixed(),
  };

  const weatherUnit = (localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUnitType) || WEATHER_API.DEFAULTS.UNIT;

  return (
    <Card className="@container min-h-[300px]">
      <CardHeader>
        <CardTitle>
          Current Weather
        </CardTitle>

        <CardDescription>
          {currentWeather.dt}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}
