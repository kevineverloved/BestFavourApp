'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Search, MessageSquare, User, Menu } from 'lucide-react'

export default function BottomNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path ? 'text-primary' : 'text-gray-500'
  }

  return (
    <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <Link href="/" className={`flex-1 flex flex-col items-center justify-center ${isActive('/')} hover:text-primary`}>
            <Home className="h-6 w-6" />
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link href="/search" className={`flex-1 flex flex-col items-center justify-center ${isActive('/search')} hover:text-primary`}>
            <Search className="h-6 w-6" />
            <span className="text-xs mt-1">Search</span>
          </Link>
          <Link href="/messages" className={`flex-1 flex flex-col items-center justify-center ${isActive('/messages')} hover:text-primary`}>
            <MessageSquare className="h-6 w-6" />
            <span className="text-xs mt-1">Messages</span>
          </Link>
          <Link href="/profile" className={`flex-1 flex flex-col items-center justify-center ${isActive('/profile')} hover:text-primary`}>
            <User className="h-6 w-6" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
          <Link href="/menu" className={`flex-1 flex flex-col items-center justify-center ${isActive('/menu')} hover:text-primary`}>
            <Menu className="h-6 w-6" />
            <span className="text-xs mt-1">Menu</span>
          </Link>
        </div>
      </div>
    </nav>
  )
}
