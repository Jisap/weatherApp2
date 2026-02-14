import { APP, WEATHER_API } from "@/config"
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

import { useWeather, type WeatherUNitType } from "./WeatherProvider"


export const UnitDropdown = () => {

  const { setWeather } = useWeather();

  const [unit, setUnit] = useState<WeatherUNitType>(localStorage.getItem(APP.STORE_KEY.UNIT) as WeatherUNitType || WEATHER_API.DEFAULTS.UNIT);

  useEffect(() => {
    setWeather({ unit });
    localStorage.setItem(APP.STORE_KEY.UNIT, unit);
  }, [unit]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
        >
          ° {unit === 'metric' ? 'C' : 'F'}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-[200px]">
        <DropdownMenuLabel className="text-muted-foreground">
          Weather settings
        </DropdownMenuLabel>

        <DropdownMenuRadioGroup value={unit} onValueChange={(value) => setUnit(value as WeatherUNitType)}>
          <DropdownMenuRadioItem value="metric">
            Metric (°C)
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="imperial">
            Imperial (°F)
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}