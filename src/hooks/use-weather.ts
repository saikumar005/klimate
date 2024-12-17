import { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

const WEATHER_KEY={
    weather:(coords:Coordinates)=>["weather",coords] as const,
    forecast:(coords:Coordinates)=>["forecast",coords] as const,
    location:(coords:Coordinates)=>["location",coords] as const,
} as const;

export function useWeatherQuery(coordinates:Coordinates | null){
    return useQuery(
        {
            queryKey:WEATHER_KEY.weather(coordinates ?? {lat:'0',lon:'0'}),
            queryFn:()=>
                coordinates? weatherAPI.getCurrentWeather(coordinates) : null,
                enabled: !!coordinates,
        }
    );
}

export function useForeCastQuery(coordinates:Coordinates | null){
    return useQuery(
        {
            queryKey:WEATHER_KEY.forecast(coordinates ?? {lat:'0',lon:'0'}),
            queryFn:()=>
                coordinates? weatherAPI.getForeCast(coordinates) : null,
                enabled: !!coordinates,
        }
    );
}

export function useReverseGeocode(coordinates:Coordinates | null){
    return useQuery(
        {
            queryKey:WEATHER_KEY.location(coordinates ?? {lat:'0',lon:'0'}),
            queryFn:()=>
                coordinates? weatherAPI.reverseGeocode(coordinates) : null,
                enabled: !!coordinates,
        }
    );
}