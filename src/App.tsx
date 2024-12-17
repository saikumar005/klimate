import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import { ThemeProvider } from "@/context/theme-provider"
import WeatherDashboard from './Pages/weather-dashboard'
import City from './Pages/City'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
function App() {
  const queryClient = new QueryClient({
    defaultOptions:{
      queries:{
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry:false,
        refetchOnWindowFocus:false,
      }
    }
  })
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <Layout>
            <Routes>
              <Route path='/' element={<WeatherDashboard/>} />
              <Route path='/city/:cityName' element={<City/>} />
            </Routes>
          </Layout>
          </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
