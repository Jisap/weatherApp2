import { ThemeProvider } from "./components/ThemeProvider"
import { TopAppBar } from "./components/TopAppBar"
import { WeatherProvider } from "./components/WeatherProvider"




export const App = () => {
  return (
    <ThemeProvider>
      <WeatherProvider>
        <TopAppBar />
      </WeatherProvider>
    </ThemeProvider>
  )
}

