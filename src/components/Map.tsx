import mapboxgl from "mapbox-gl";
import { MAPBOX } from "@/config";
import { useEffect, useMemo, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { useWeather } from "./WeatherProvider";
import { Map as MapType, type LngLatLike } from "mapbox-gl";
import { Marker } from "./Marker";



export const Map = () => {

  const { theme } = useTheme();
  const { weather } = useWeather();

  const center = useMemo<LngLatLike>(
    () => weather
      ? [weather.location.lon, weather.location.lat]
      : MAPBOX.DEFAULTS.CENTER, [weather]
  );
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<MapType | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !center) return;

    mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

    setMap(new mapboxgl.Map({
      container: mapContainerRef.current,
      center,
      zoom: MAPBOX.DEFAULTS.ZOOM,
      style: "mapbox://styles/mapbox/standard",
      config: {
        basemap: {
          lightPreset: theme === "light" ? "day" : "night"
        }
      }
    }))

    return () => map?.remove();

  }, [center, theme])


  return (
    <div
      ref={mapContainerRef}
      className="h-[300px] bg-card text-card-foreground rounded-xl overflow-hidden shadow-sm"
    >
      {map && (
        <Marker map={map} coordinates={center} />
      )}
    </div>
  )
}

