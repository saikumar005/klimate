export interface Coordinates{
    lat:string;
    lon:string;
}

export interface Weather{
        id: number;
        main: string;
        description: string;
        icon: string;
}

export interface WeatherData{
    coord:Coordinates;
    weather:Weather[];
    base:string;
    main:{
        temp:number;
        feels_like:number;
        temp_min:number;
        temp_max:number;
        pressure:number;
        humidity:number;
        sea_level:number;
        grnd_level:number;
    };
    visibility:string;
    wind:{
        speed:number;
        deg:number;
        gust:number;
    }
    sys:{
        type:number;
        id:number;
        country:string;
        sunrise:number;
        sunset:number;
    }
    name:string;
    dt:number;
}


export interface ForecastData{
    cod:Coordinates;
    message:number;
    cnt:number;
    list:Array<{
        dt:number;
        main:WeatherData["main"];
        weather:WeatherData["weather"];
        wind:WeatherData["wind"];
        dt_txt:number;
    }>;
    city:{
        id:number;
        name:string;
        coord:Coordinates;
        country:string;
        population:number;
        timezone:number;
        sunrise:number;
        sunset:number;
    };
}

export interface GeocodingResponse{
     name:string;
     local_names:Record<string,string>;
     lat:number;
     lon:number;
     country:string;
     state:string;
}