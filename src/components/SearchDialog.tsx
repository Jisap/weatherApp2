
import { APP, WEATHER_API } from "@/config";
import { useCallback, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
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
  ItemGroup,
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
    const shortcut = (event: KeyboardEvent) => {
      if (event.key === 'k' && event.metaKey || event.ctrlKey) {
        event.preventDefault();
        setSearchDialogOpen(true);
      }
    }

    document.addEventListener('keydown', shortcut);
    return () => document.removeEventListener('keydown', shortcut);
  }, [results])

  useEffect(() => {
    if (!search) return;

    const timeoutId = setTimeout(async () => {
      const results = await geoCoding(search);
      console.log(results);
      if (results) setResults(results);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [search, geoCoding]);

  return (
    <Dialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="lg:w-auto lg:px-3 max-lg:size-9 lg:bg-secondary dark:lg:bg-secondary/50"
          onClick={() => setSearchDialogOpen((prev) => !prev)}
        >
          <SearchIcon className="lg:text-muted-foreground" />

          <div className="flex justify-between w-[250px] max-lg:hidden">
            Search Weather
            <KbdGroup>
              <Kbd>Ctrl</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent
        className="p-0 bg-card gap-0"
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search Weather</DialogTitle>
          <DialogDescription>
            Find weather information for any location
          </DialogDescription>
        </DialogHeader>

        <InputGroup className="ring-0! border-t-0! border-x-0! border-b border-boder! rounded-b-none bg-transparent!">
          <InputGroupInput
            placeholder="Search weather..."
            value={search}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />

          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
        </InputGroup>

        <ItemGroup className="min-h-80 p-2">
          {!results.length && (
            <p className="text-center text-sm py-4">
              No results found
            </p>
          )}

          {results.map(({ name, lat, lon, state, country }) => (
            <Item
              key={name + lat + lon}
              size="sm"
              className="relative p-2"
            >
              <ItemContent>
                <ItemTitle>{name}</ItemTitle>
                <ItemDescription>
                  {state ? state + ", " : ""}
                  {country}
                </ItemDescription>
              </ItemContent>

              <ItemActions>
                <DialogClose asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="after:absolute after:inset-0"
                  >
                    <MapPinnedIcon />
                  </Button>
                </DialogClose>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </DialogContent>
    </Dialog>
  )
}
