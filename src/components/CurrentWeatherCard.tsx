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

      <CardContent className="grow">
        <div className="flex flex-wrap items-center gap-x-6">
          <figure>
            <img
              src={`https://openweathermap.org/img/wn/${currentWeather.iconCode}10d@4x.png`}
              alt={currentWeather.description}
              width={70}
              height={70}
              className="object-contain"
            />

            <p className="text-5xl font-medium items-start sm:text-7xl">
              {currentWeather.temp}
              <span className="text-3xl">{APP.UNIT.TEMP[weatherUnit]}</span>
            </p>

            <div>
              <p className="font-medium capitalize sm:text-lg">
                {currentWeather.description}
              </p>

              <div className="text-sm flex items-center gap-2">
                <span>
                  Feels like
                </span>

                <span>
                  {currentWeather.feelsLike}°
                </span>
              </div>
            </div>
          </figure>
        </div>
      </CardContent>

      <CardFooter className="flex-wrap gap-x-8 gap-y-2 @lg:justify-between">
        <div>
          <p className="text-xm text-muted-foreground">Wind</p>

          <div className="flex items-center gap-1">
            <p>
              {currentWeather.windSpeed} {APP.UNIT.WIND[weatherUnit]}
            </p>

            <Navigation2Icon
              size={14}
              fill="currentColor"
              style={{
                rotate: `${currentWeather.windDeg}deg`
              }}
            />
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Humidity
          </p>

          <div className="flex items-center gap-1">
            <p>
              {currentWeather.humidity}%
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Visibility
          </p>

          <div className="flex items-center gap-1">
            <p>
              {currentWeather.visibility} km
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Pressure
          </p>

          <div className="flex items-center gap-1">
            <p>
              {currentWeather.pressure} hPa
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">
            Dew Point
          </p>

          <div className="flex items-center gap-1">
            <p>
              {currentWeather.dewPoint} °
            </p>
          </div>
        </div>
      </CardFooter>
    </Card>
  )
}
