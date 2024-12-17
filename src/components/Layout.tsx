
import type { PropsWithChildren } from 'react'
import Header from './Header'
const Layout = ({children}:PropsWithChildren) => {
  return (
    <div className='bg-gradient-to-br from-background to-muted'>
        <Header/>
        <main className='container mx-auto px-4 py-8 min-h-screen'>
            {children}
        </main>
        <footer className='border-t backdrop-blur py-12 supports-[backdrop-blur]:background/60'>
            <div className='container mx-auto px-4 text-gray-400 text-center font-bold text-xl'>Footer | Sai Kumar Thokamuri 2024</div>
        </footer>
    </div>
  )
}

export default Layout