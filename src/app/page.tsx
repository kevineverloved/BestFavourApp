"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '@/context/auth-context'
import { 
  Menu, 
  Search, 
  Star, 
  MapPin, 
  Home, 
  Moon, 
  Sun, 
  Wrench, 
  Scissors, 
  Laptop, 
  Car, 
  Briefcase, 
  User
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import BottomNav from '@/components/bottom-nav'
import { SearchBar } from '@/components/search-bar'
import { RecentServices } from '@/components/recent-services'
import { PopularServices } from '@/components/popular-services'

const featuredProviders = [
  { name: 'John Smith', avatar: '/placeholder.svg?height=50&width=50', category: 'Electrician', rating: 4.8, location: 'Cape Town' },
  { name: 'Sarah Johnson', avatar: '/placeholder.svg?height=50&width=50', category: 'House Cleaner', rating: 4.7, location: 'Johannesburg' },
  { name: 'Lerato Molefe', avatar: '/placeholder.svg?height=50&width=50', category: 'Plumber', rating: 4.6, location: 'Pretoria' },
  { name: 'Sipho Ndlovu', avatar: '/placeholder.svg?height=50&width=50', category: 'Carpenter', rating: 4.9, location: 'Durban' },
]

export default function HomePage() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', String(newDarkMode))
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/75 dark:bg-black/75 shadow-sm">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64">
                <nav className="flex flex-col space-y-4">
                  <Link href="/categories" className="flex items-center space-x-2 text-lg font-medium">
                    <span>Categories</span>
                  </Link>
                  <Link href="/bookings" className="flex items-center space-x-2 text-lg font-medium">
                    <span>My Bookings</span>
                  </Link>
                  <Link href="/messages" className="flex items-center space-x-2 text-lg font-medium">
                    <span>Messages</span>
                  </Link>
                  <Link href="/profile" className="flex items-center space-x-2 text-lg font-medium">
                    <span>Profile</span>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href="/" className="font-bold text-xl">BestFavour</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/categories" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">Categories</Link>
            {user ? (
              <>
                <Link href="/settings" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">Settings</Link>
                <Button
                  variant="ghost"
                  size="sm"
                  className="flex items-center space-x-2"
                  onClick={logout}
                >
                  <User className="h-4 w-4" />
                  <span>Logout</span>
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button variant="default" size="sm" className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Login</span>
                </Button>
              </Link>
            )}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <Sun className="h-5 w-5 text-yellow-500" />
              ) : (
                <Moon className="h-5 w-5 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Find Local Services</h1>
          <p className="text-gray-600 dark:text-gray-400">Discover trusted service providers in your area</p>
        </div>

        <SearchBar className="mb-8" />

        <RecentServices className="mb-8" />
        
        <PopularServices className="mb-8" />
      </main>

      <BottomNav />
      <footer className="bg-white dark:bg-black border-t dark:border-gray-800 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        &copy; 2024 BestFavour. All rights reserved.
      </footer>
    </div>
  )
}
