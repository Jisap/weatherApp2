
import { APP, WEATHER_API } from "@/config";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Kbd, KbdGroup } from "@/components/ui/kbd"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item"
import { MapPinnedIcon, SearchIcon } from "lucide-react";
import type { Geocoding } from "@/types"
import { openWeatherApi } from "@/api";


export const SearchDialog = () => {

  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState<Geocoding[]>([]);
  const [searchDialogOpen, setSearchDialogOpen] = useState<boolean>(false);

  const geoCoding = useCallback(async (search: string) => {
    if (!search) return;

    const response = await openWeatherApi.get('/geo/1.0/direct', {
      params: {
        q: search,
        limit: WEATHER_API.DEFAULTS.SEARCH_RESULT_LIMIT,
      }
    });

    return response.data as Geocoding[];
  }, []);

  useEffect(() => {
    if (!search) return;

    (async () => {
      const results = await geoCoding(search);
      console.log(results);
      if (results) setResults(results);
    })();
  }, [search, geoCoding]);

  return (
    <div>
      Search Dialog
    </div>
  )
}


