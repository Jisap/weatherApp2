import { CurrentWeatherCard } from "./components/CurrentWeatherCard"
import { HourlyWeatherTabs } from "./components/HourlyWeatherTabs"
import { Map } from "./components/Map"
import { PageHeader } from "./components/PageHeader"
import { ThemeProvider } from "./components/ThemeProvider"
import { TopAppBar } from "./components/TopAppBar"
import { WeatherProvider } from "./components/WeatherProvider"




export const App = () => {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <TopAppBar />

        <main className="py-4">
          <div className="container ">
            <PageHeader />

            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              <CurrentWeatherCard />

              <Map />
            </div>

            <HourlyWeatherTabs />
          </div>
        </main>

        <footer className="pb-5">
          <p className="text-center text-muted-foreground">
            &copy; 2026 Powered by OpenWeatherMap
          </p>
        </footer>
      </WeatherProvider>
    </ThemeProvider>
  )
}

