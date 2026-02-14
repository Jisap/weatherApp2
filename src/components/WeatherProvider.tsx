

import { openWeatherApi } from "@/api";
import { APP, WEATHER_API } from "@/config";
import { createContext, useCallback, useEffect, useState, type ReactNode } from "react";
import type { CurrentWeather, MinutelyForecast, Alert, Geocoding, WeatherTimezone, OneCallWeatherRes, HourlyForecast, DailyForecast } from "@/types";


export type WeatherUNitType = "metric" | "imperial";

type Weather = {
  current: CurrentWeather;
  minutely: MinutelyForecast[];
  hourly: HourlyForecast[];
  daily: DailyForecast[];
  alerts?: Alert[];
  location: Geocoding;
  timezone: WeatherTimezone;
}

type WeatherStateParam = {
  lat?: number;
  lon?: number;
  unit?: WeatherUNitType;
}

type WeatherProviderState = {
  weather: Weather | null;
  setWeather: (weather: WeatherStateParam) => void;
}

const initialState: WeatherProviderState = {
  weather: null,
  setWeather: () => { }
}

export const WeatherProviderContext = createContext<WeatherProviderState>(initialState);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {

  const defaultLat = WEATHER_API.DEFAULTS.LAT;
  const defaultLon = WEATHER_API.DEFAULTS.LON;
  const defaultUnit = WEATHER_API.DEFAULTS.UNIT;

  const [weather, setWeather] = useState<Weather | null>(null);

  const oneCall = useCallback(
    async (lat: number, lon: number, units: WeatherUNitType) => {
      const response = await openWeatherApi.get("/data/3.0/onecall", {
        params: {
          lat,
          lon,
          units
        }
      })
      //console.log(response.data)
      return response.data as OneCallWeatherRes;
    }, []);

  const reverseGeo = useCallback(async (lat: number, lon: number, limit = 10) => {
    const response = await openWeatherApi.get("/geo/1.0/reverse", {
      params: {
        lat,
        lon,
        limit
      }
    })
    return response.data as Geocoding[];
  }, []);

  const getWeather = useCallback(async ({ lat = defaultLat, lon = defaultLon, unit = defaultUnit }: WeatherStateParam) => {
    const oneCallRes = await oneCall(lat, lon, unit);
    const reverseGeoRes = await reverseGeo(lat, lon);

    setWeather({
      current: oneCallRes.current,
      minutely: oneCallRes.minutely,
      hourly: oneCallRes.hourly,
      daily: oneCallRes.daily,
      alerts: oneCallRes.alerts,
      location: reverseGeoRes[0],
      timezone: {
        timezone: oneCallRes.timezone,
        offset: oneCallRes.timezone_offset
      }
    })

  }, [defaultLat, defaultLon, defaultUnit, oneCall, reverseGeo])


  useEffect(() => {
    (async () => await getWeather({}))()
  }, [getWeather]);


  return (
    <WeatherProviderContext.Provider
      value={{ weather, setWeather: getWeather }}
    >
      {children}
    </WeatherProviderContext.Provider>
  )
}
