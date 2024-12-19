import { ForecastData } from "@/api/types"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {format} from 'date-fns';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts'
interface HourlyWeatherForecastProp{
    data:ForecastData
}

const HourlyWeatherForecast = ({data}:HourlyWeatherForecastProp) => {
  const chartData=data.list.slice(0,8).map((_)=>({
    time: format( new Date(_.dt * 1000), "ha"),
    temp: Math.round(_.main.temp),
    feels_like:Math.round(_.main.feels_like)
  }))
  return (
    <Card className="flex-1">
        <CardHeader>
            <CardTitle>Hourly forecast data</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width={"100%"} height={"100%"}>
              <LineChart data={chartData}>
                <XAxis 
                dataKey="time"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                />
                <YAxis 
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value)=>`${value}°`}
                />
                <Tooltip 
                content={({active,payload})=>{
                  if(active && payload){
                    return(
                      <div className="bg-background rounded-lg shadow-md p-2">
                        <div className="flex gap-2">
                          <p>Temperature</p>
                          <p>{payload[0].value}°</p>
                        </div>
                        <div className="flex gap-2">
                          <p>Feels Like</p>
                          <p>{payload[1].value}°</p>
                        </div>
                      </div>
                    )
                  }
                }}
                />
                <Line type="monotone" strokeWidth={2} dot={true} dataKey={"temp"} stroke="#2563be" />
                <Line type="monotone" strokeWidth={2} dot={true} dataKey={"feels_like"} stroke="#696f78" strokeDasharray={"5 5"} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
    </Card>

  )
}

export default HourlyWeatherForecast