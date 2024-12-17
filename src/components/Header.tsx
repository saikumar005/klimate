
import { useTheme } from '@/context/theme-provider'
import { Moon, Sun } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = ():React.ReactNode => {
    const {theme,setTheme}=useTheme()
    const isDark= theme==="dark";
  return (
    <div className='sticky top-0 z-50 py-2 w-full border-b backdrop-blur supports-[backdrop-blur]:background/60'>
        <div className='mx-auto container flex justify-between items-center px-4'>
            <Link to={'/'}>
                <img 
                alt='klimate logo'
                className='h-14'
                src={isDark? '/logo.png': '/logo2.png'}
                />
            </Link>
            <div className='flex justify-center items-center gap-4'>
                <p>Search bar....</p>
                <div className={`cursor-pointer transition-transform duration-500 ${isDark? 'rotate-180':'rotate-0'} `} onClick={()=>setTheme(isDark? "light":"dark")}>
                    {
                        isDark?
                        <Sun className='w-6 h-6 text-yellow-500 rotate-0 transition-all' />
                        :
                        <Moon className='w-6 h-6 text-blue-500 rotate-0 transition-all'/>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header