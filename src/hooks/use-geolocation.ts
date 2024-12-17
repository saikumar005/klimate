import { Coordinates } from "@/api/types"
import { useEffect, useState } from "react";

interface GeoLocation{
    coordinates:Coordinates | null;
    error:string | null;
    isLoading:boolean;
}
export const useGeolocation=()=>{
    const [locationData,setLocationData]=useState<GeoLocation>({
        coordinates:null,
        error:null,
        isLoading:true
    })

    const getLocation=()=>{
        setLocationData((prev)=>({...prev,isLoading:true,error:null}))

        if(!navigator.geolocation){
            setLocationData({coordinates:null,isLoading:false,error:'Geo location is not supported by your browser'})
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position)=>{
                setLocationData({
                    coordinates:{
                        lat:position.coords.latitude.toLocaleString(),
                        lon:position.coords.longitude.toLocaleString()
                    },
                    error:null,
                    isLoading:false
                })
            },
            (error)=>{
                let errorMessage:string;
                switch (error.code){
                    case error.PERMISSION_DENIED:
                        errorMessage= "premission denied. please enable location permission";
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage= "Location data unavailabel";
                        break;
                    case error.TIMEOUT:
                        errorMessage="Location request timed out";
                        break;
                    default:
                        errorMessage= "Unkown error occured"
                }
                setLocationData(
                    {
                        coordinates:null,
                        error:errorMessage,
                        isLoading:false
                    }
                )
            },
            {
                enableHighAccuracy:true,
                timeout:5000,
                maximumAge:0
            })
    }

    useEffect(()=>{
        getLocation()
    },[])

    return {...locationData,getLocation}
}