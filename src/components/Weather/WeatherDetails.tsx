import React from 'react'
import type { WeatherData } from '@/api/types'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Compass, Gauge, PercentSquare, Sunrise, Sunset, WindArrowDown } from 'lucide-react';
import { format } from 'date-fns';
interface weatherDetailsProps{
    data:WeatherData
}
// interface detailsDtype{
//     id:number,
//     desc:string,
//     value:string,
//     icon:React.ReactNode,
//     color:string
// }
const WeatherDetails = ({data}:weatherDetailsProps) => {
    const {
        main:{pressure},
        sys:{sunrise,sunset},
        wind:{deg}
    }=data;

    const formatTime=(time:number)=>{
        return format(new Date(time * 1000),"h:mm a")
    }
    const getWindDirection=(degree: number)=>{
        const directions=['N','E','W','S','NE',"NW","SE","SW"];
        const index=Math.round(((degree%=360) < 0 ? degree + 360: degree) / 45) % 8 ;
        return directions[index]
    }
    const detailsData=[
        {
            id:0,
            desc:"Sunrise",
            value:formatTime(sunrise),
            icon:Sunrise,
            color:"text-orange-500"
        },
        {
            id:1,
            desc:"Sunset",
            value:formatTime(sunset),
            icon:Sunset,
            color:"text-blue-500"
        },
        {
            id:2,
            desc:"Wind direction",
            value:` ${getWindDirection(deg)} ${deg}°`,
            icon:Compass,
            color:"text-green-500"
        },
        {
            id:3,
            desc:"Pressure",
            value:`${pressure} hpa`,
            icon:Gauge,
            color:"text-purple-500"
        }
    ]
  return (
    <Card>
        <CardHeader>
            <CardTitle>Weather Details</CardTitle>
        </CardHeader>
        <CardContent className='grid md:grid-cols-2 gap-4'>
            {
                detailsData.map((item)=>{
                    return(
                        <div key={item.id} className='rounded-lg border p-4 flex gap-4 items-center'>
                            <div>
                                <item.icon className={`w-6 h-6 ${item.color}`} />
                            </div>
                            <div>
                                <p className='font-bold text-sm leading-none'>{item.desc}</p>
                                <p className='text-sm  text-muted-foreground'>{item.value}</p>
                            </div>
                        </div>
                    )
                })
            }
        </CardContent>
    </Card>

  )
}

export default WeatherDetails