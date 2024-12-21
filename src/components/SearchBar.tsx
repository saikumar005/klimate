import React, { useState } from 'react'
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from './ui/command'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useLocationSearch } from '@/hooks/use-weather'
import { useNavigate } from 'react-router-dom'

const SearchBar = () => {
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [query,setQuery]=useState('')
    const {data,isLoading}=useLocationSearch(query)
    const handleSelection=(value:string)=>{
        const [lat,lon,name,country]=value.split('|')
        setOpen(false)
        navigate(`/weather/${name}?lat=${lat}&lon=${lon}`)
    }
  return (
    <>
        <Button onClick={()=>setOpen(true)} 
        className='text-sm text-muted-foreground w-52 flex justify-start items-center gap-2'
        variant={"outline"}
        >
            <Search className='h-4 w-4'/>
            <span>Search City..</span>
        </Button>
     <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
        value={query}
        onValueChange={setQuery}
        placeholder="Type a command or search..." />
        <CommandList>
          {(query.length>2 && !isLoading) && (<CommandEmpty>No Cities found.</CommandEmpty>)}
          <CommandGroup heading="Favorites">
            <CommandItem>
              <span>Calendar</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Recents">
            <CommandItem>
              <span>Calendar</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          
          <CommandGroup heading="Suggestions">
          {
            !isLoading && data?.map((location)=>(
            <CommandItem
            className='cursor-pointer'
            key={`${location?.lat}-${location?.lon}`}
            value={`${location?.lat}|${location?.lon}|${location?.name}|${location?.country}`}
            onSelect={handleSelection}
            >
              <span>{location?.name}, </span>
              {
                location.state && <span>{location?.state}, </span>
              }
              {
                location.country && <span>{location?.country}</span>
              }
            </CommandItem>
            ))
          }
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}

export default SearchBar