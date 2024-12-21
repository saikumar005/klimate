import { API_CONFIG } from "./config";
import { Coordinates, ForecastData, GeocodingResponse, WeatherData } from "./types";

class WeatherAPI{
    private createUrl(endpoint:string,params:Record<string,string | number>){
        const searchParams=new URLSearchParams({appid:API_CONFIG.DEFAULT_PARAMS.appid,...params})
        return `${endpoint}?${searchParams.toString()}`
    }

    private async fetchDate<T>(url:string):Promise<T>{
        const response=await fetch(url);
        if(!response.ok){
            throw new Error(`Weather API Error: ${response.statusText}`)
        }

        return response.json()
    }

    async getCurrentWeather({lat,lon} : Coordinates):Promise<WeatherData>{
        const url= this.createUrl(`${API_CONFIG.BASE_URL}/weather`,{
            lat: lat.toString(),
            lon: lon.toString(),
            units:API_CONFIG.DEFAULT_PARAMS.units
        })

        return this.fetchDate<WeatherData>(url);
    }

    async getForeCast({lat,lon} : Coordinates):Promise<ForecastData>{
        const url= this.createUrl(`${API_CONFIG.BASE_URL}/forecast`,{
            lat: lat.toString(),
            lon: lon.toString(),
            appid:API_CONFIG.DEFAULT_PARAMS.appid
        })

        return this.fetchDate<ForecastData>(url);
    }

    async reverseGeocode({lat,lon} : Coordinates):Promise<GeocodingResponse[]>{
        const url= this.createUrl(`${API_CONFIG.GEO}/reverse`,{
            lat: lat.toString(),
            lon: lon.toString(),
            limit:1
        })

        return this.fetchDate<GeocodingResponse[]>(url);
    }

    async searchLocation(query:string):Promise<GeocodingResponse[]>{
        const url= this.createUrl(`${API_CONFIG.GEO}/direct`,{
            q: query,
            limit:5
        })

        return this.fetchDate<GeocodingResponse[]>(url);
    }
}

export const weatherAPI=new WeatherAPI();