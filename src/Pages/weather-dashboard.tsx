import { Button } from '@/components/ui/button'
import WeatherSkeleton from '@/components/WeatherSkeleton';
import { useGeolocation } from '@/hooks/use-geolocation'
import { AlertTriangle, MapPin, RefreshCw } from 'lucide-react';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { useForeCastQuery, useReverseGeocode, useWeatherQuery } from '@/hooks/use-weather';
import CurrentWeather from '@/components/Weather/CurrentWeather';
import HourlyWeatherForecast from '@/components/Weather/HourlyWeatherForecast';
import WeatherDetails from '@/components/Weather/WeatherDetails';
import WeatherForeCast from '@/components/Weather/WeatherForeCast';

const WeatherDashboard = () => {
  const {coordinates,error:locationError,isLoading:locationLoading,getLocation}=useGeolocation();
  const weatherQuery=useWeatherQuery(coordinates);
  const forecastQuery=useForeCastQuery(coordinates);
  const locationQuery=useReverseGeocode(coordinates);

  const locationName = locationQuery?.data?.[0]
  const handleRefresh=()=>{
    if(coordinates){
      weatherQuery.refetch();
      forecastQuery.refetch();
      locationQuery.refetch();
    }
  }

  if(locationLoading){
    return <WeatherSkeleton />
  }

  if(locationError){
    return(
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>{locationError}</p>
          <Button className='w-fit' variant={'outline'}>
            <MapPin className='h-4 w-4' />
            <p>Enable Location</p>
          </Button>
        </AlertDescription>
    </Alert>
    )
  }

  if(!coordinates){
    return(
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Please enable your location access for fetching local weather. </p>
          <Button className='w-fit' variant={'outline'}>
            <MapPin className='h-4 w-4' />
            <p>Enable Location</p>
          </Button>
        </AlertDescription>
    </Alert>
    )
  }

  if(weatherQuery.error || forecastQuery.error){
    return(
      <Alert variant="destructive">
        <AlertTriangle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className='flex flex-col gap-4'>
          <p>Failed to fetch the weather.</p>
          <Button onClick={handleRefresh} className='w-fit' variant={'outline'}>
            <p>Retry</p>
          </Button>
        </AlertDescription>
    </Alert>
    )
  }

  if(!weatherQuery.data || !forecastQuery.data){
    return <WeatherSkeleton />
  }

  return (
    <div>
      {/* favourite cities */}
      <div className='space-y-4 mb-3'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-bold tracking-tight'>
            My Location
          </h1>
          <Button
          size={"icon"}
          variant={'outline'}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
          >
            <RefreshCw className={`h-4 w-4 ${weatherQuery.isFetching? "animate-spin":""}`} />
          </Button>
        </div>
      </div>
      {/* current and hourly weather */}
      <div className='grid gap-6'>
        
        <div className='flex flex-col md:flex-row gap-4'>
          {/* current weather */}
          <CurrentWeather data={weatherQuery?.data} locationName={locationName} />
          {/* todays temperature graph */}
          <HourlyWeatherForecast data={forecastQuery.data} />
        </div>
        
        {/* section two */}
        <div className='grid md:grid-cols-2 gap-6 items-start'>
            {/* Weather Details */}
            <div>
              <WeatherDetails data={weatherQuery?.data} />
            </div>
            {/* 5 days forecast */}
            <div>
              <WeatherForeCast data={forecastQuery?.data} />
            </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherDashboard