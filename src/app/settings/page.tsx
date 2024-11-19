"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, Search, UserCircle2, Calendar, MessageCircle, Settings2, HelpCircle, Bell, Lock, CreditCard, Globe, ChevronRight, Home, Moon, Sun, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"

const navigationItems = [
  { title: 'Services', href: '/services', icon: Search, description: 'Browse available services' },
  { title: 'Find Help', href: '/find-help', icon: Search, description: 'Find help near you' },
  { title: 'Become a Provider', href: '/become-provider', icon: UserCircle2, description: 'Offer your services' },
  { title: 'My Bookings', href: '/bookings', icon: Calendar, description: 'View your bookings' },
  { title: 'Messages', href: '/messages', icon: MessageCircle, description: 'Check your messages' },
  { title: 'Profile', href: '/profile', icon: UserCircle2, description: 'Manage your profile' },
  { title: 'Help & Support', href: '/help', icon: HelpCircle, description: 'Get help and support' }
]

const settingsItems = [
  { title: 'Personal Information', icon: UserCircle2, href: '/settings/personal-information' },
  { title: 'Notifications', icon: Bell, href: '/settings/notifications' },
  { title: 'Privacy', icon: Lock, href: '/settings/privacy' },
  { title: 'Security', icon: Lock, href: '/settings/security' },
  { title: 'Payment Methods', icon: CreditCard, href: '/settings/payment-methods' },
  { title: 'Language', icon: Globe, href: '/settings/language' },
  { title: 'Help & Support', icon: HelpCircle, href: '/settings/help-support' }
]

const mobileNavItems = [
  { title: 'Home', href: '/', icon: Home },
  { title: 'Services', href: '/services', icon: Search },
  { title: 'Bookings', href: '/bookings', icon: Calendar },
  { title: 'Messages', href: '/messages', icon: MessageCircle },
  { title: 'Profile', href: '/profile', icon: UserCircle2 }
]

export default function SettingsPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/75 dark:bg-black/75 shadow-sm">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <button
            className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
            aria-label="Settings"
          >
            <Settings className="h-6 w-6" />
          </button>
          <div className="flex-1" />
          <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-bold text-xl">
            BestFavour
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-700/50"
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 mb-16 md:mb-0">
        <h1 className="text-2xl font-bold mb-6">Settings</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          {settingsItems.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-700 ${
                index !== settingsItems.length - 1 ? 'border-b border-gray-200 dark:border-gray-700' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <span className="text-lg">{item.title}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            </Link>
          ))}
        </div>
      </main>

      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="fixed inset-y-0 right-0 w-[300px] bg-white dark:bg-black p-6 overflow-y-auto">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"
              aria-label="Close menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <nav className="flex flex-col space-y-1 mt-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                  <div className="flex flex-col">
                    <span className="text-lg font-medium text-gray-900 dark:text-white">{item.title}</span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{item.description}</span>
                  </div>
                </Link>
              ))}
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors w-full text-left"
              >
                {darkMode ? (
                  <Sun className="h-6 w-6 text-yellow-500" />
                ) : (
                  <Moon className="h-6 w-6 text-gray-500" />
                )}
                <span className="text-lg font-medium text-gray-900 dark:text-white">
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </span>
              </button>
            </nav>
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 backdrop-blur-md bg-white/75 dark:bg-black/75 border-t dark:border-gray-700 md:hidden">
        <div className="flex justify-around">
          {mobileNavItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex flex-col items-center p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.title}</span>
            </Link>
          ))}
        </div>
      </nav>

      <footer className="bg-white dark:bg-black border-t dark:border-gray-800 py-4 text-center text-sm text-gray-500 dark:text-gray-400 hidden md:block">
        © 2024 BestFavour. All rights reserved.
      </footer>
    </div>
  )
}
