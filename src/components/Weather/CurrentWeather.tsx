import type { GeocodingResponse, WeatherData } from "@/api/types"
import { Card, CardContent } from "../ui/card"
import { ArrowDown, ArrowUp, Droplet, Wind } from "lucide-react";

interface currentWeatherProps{
    data:WeatherData,
    locationName?:GeocodingResponse 
}
const CurrentWeather = ({data,locationName}:currentWeatherProps) => {
    const {
        weather:[currentWeather],
        main:{temp,feels_like,temp_min, temp_max,humidity },
        wind:{speed}
    }=data;

    const convertDegree=(temp:number)=>{return Math.round(temp)}

  return (
    <Card className="overflow-hidden">
        <CardContent className="p-6">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <div className="flex gap-2">
                        <h2 className="text-2xl font-bold tracking-tighter">{locationName?.name}</h2>
                        {locationName?.state && <span className="text-sm text-muted-foreground">{locationName?.state}</span>}
                    </div>
                    <p>{locationName?.country}</p>
                    <div className="flex gap-3 items-center">
                        <h2 className="text-7xl font-bold tracking-tighter">
                            {convertDegree(temp)}°
                        </h2>
                        <div className="flex flex-col items-center">
                            <p className="text-muted-foreground ">Feels like {convertDegree(feels_like)}°</p>
                            <div className="flex gap-2 items-center">
                                <span className="text-blue-500">
                                    <ArrowDown className="h-3 w-3"/>
                                    {convertDegree(temp_min)}°
                                </span>
                                <span className="text-red-500">
                                    <ArrowUp className="h-3 w-3"/>
                                    {convertDegree(temp_max)}°
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <Droplet className="h-3 w-3 text-blue-500" />
                            <div>
                                <p>
                                    Humidity
                                </p>
                                <p>
                                    {humidity}%
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <Wind className="h-3 w-3 text-blue-500" />
                            <div>
                                <p>
                                    wind speed
                                </p>
                                <p>
                                    {speed} m/s
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-center">
                    <img
                    className="max-w-[200px]"
                    src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                    alt={currentWeather.description}
                    />
                    <p>{currentWeather.description}</p>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default CurrentWeather