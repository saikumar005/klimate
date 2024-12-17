import React from 'react'
import { Skeleton } from './ui/skeleton'

const WeatherSkeleton = () => {
  return (
    <div className='space-y-4'>
        <div className='grid gap-6'>
            <div className='grid gap-4 grid-cols-1 md:grid-cols-4'>
                <Skeleton className="w-full h-[300px] rounded-lg" />
                <Skeleton className="w-full h-[300px] rounded-lg" />
                <Skeleton className="w-full h-[300px] rounded-lg" />
                <Skeleton className="w-full h-[300px] rounded-lg" />
            </div>
            <Skeleton className="w-full h-[300px] rounded-lg" />
            <Skeleton className="w-full h-[300px] rounded-lg" />
            <div className='grid md:grid-cols-2 gap-6'>
                <Skeleton className=" h-[300px] rounded-lg" />
                <Skeleton className=" h-[300px] rounded-lg" />
            </div>
        </div>
    </div>
  )
}

export default WeatherSkeleton