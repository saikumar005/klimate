import { ForecastData } from '@/api/types'
import React from 'react'
import {format} from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { ArrowDown, ArrowUp, Droplet, Wind } from 'lucide-react';
interface WeatherForeCastProps{
    data:ForecastData
}
interface DailyForecast{
    date:number,
    temp_min:number,
    temp_max:number,
    humidity:number,
    wind:number,
    weather:{
        id:number,
        main:string,
        description:string,
        icon:string
    }
}
const WeatherForeCast = ({data}:WeatherForeCastProps) => {
    const dailyForecast=data.list.reduce((acc,forecast)=>{
        const date=format(new Date( forecast.dt * 1000) , "yyyy-mm-dd")
        if(!acc[date]){
            acc[date]={
                temp_min:forecast.main.temp_min,
                temp_max:forecast.main.temp_max,
                humidity:forecast.main.humidity,
                wind:forecast.wind.speed,
                weather:forecast.weather[0],
                date:forecast.dt
            }
        }
        else{
            acc[date].temp_min=Math.min(acc[date].temp_min,forecast.main.temp_min),
            acc[date].temp_max=Math.max(acc[date].temp_max,forecast.main.temp_max)
        }
        return acc;
    },{} as Record<string,DailyForecast>)
    const nextDays=Object.values(dailyForecast).slice(0,6);
    const formatDate=(temp:number)=>{return `${Math.round(temp)}°`}
  return (
    <Card>
  <CardHeader>
    <CardTitle>Next 5 Days Forecast</CardTitle>
  </CardHeader>
  <CardContent className='grid gap-4'>
    {
        nextDays.map((day,ind)=>{
            return(
                <div key={ind} className='grid grid-cols-3 gap-2 md:gap-4 rounded-lg border p-4'>
                    <div>
                        <p className='text-xl '>{format((day.date * 1000), "EEE ,MMM d")}</p>
                        <p className='text-muted-foreground'>{day.weather.description}</p>
                    </div>
                    <div className='flex gap-2'>
                        <span className='flex items-center'>
                            <ArrowDown className='h-5 w-5 text-blue-500' />
                            {formatDate(day.temp_min)}
                        </span>
                        <span className='flex items-center'>
                            <ArrowUp className='h-5 w-5 text-red-500' />
                            {formatDate(day.temp_max)}
                        </span>
                    </div>
                    <div className='flex justify-end gap-4'>
                        <span className='flex items-center gap-1'>
                            <Droplet className='text-blue-500 h-4 w-4' />
                            {day.humidity} %
                        </span>
                        <span className='flex items-center gap-1'>
                            <Wind className='text-blue-500 h-4 w-4' />
                            {day.wind} m/s
                        </span>
                    </div>
                </div>
            )
        })
    }
  </CardContent>
</Card>

  )
}

export default WeatherForeCast