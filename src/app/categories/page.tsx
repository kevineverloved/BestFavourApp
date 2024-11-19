"use client"

import { useState } from 'react'
import Link from 'next/link'
import { 
  Home, 
  Paintbrush, 
  Wrench, 
  Car, 
  Laptop, 
  Book, 
  Heart, 
  ShoppingBag, 
  Utensils, 
  Dog, 
  Camera, 
  Music,
  Search,
  Sun,
  Moon
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const serviceCategories = [
  {
    id: 'home-services',
    title: 'Home Services',
    icon: Home,
    description: 'Cleaning, repairs, moving, and other household services',
    subcategories: ['Cleaning', 'Plumbing', 'Electrical', 'Moving', 'Gardening'],
    color: 'bg-blue-500'
  },
  {
    id: 'maintenance',
    title: 'Home Maintenance',
    icon: Wrench,
    description: 'Home repairs, renovations, and improvements',
    subcategories: ['Repairs', 'Painting', 'Carpentry', 'HVAC', 'Roofing'],
    color: 'bg-orange-500'
  },
  {
    id: 'beauty',
    title: 'Beauty & Wellness',
    icon: Paintbrush,
    description: 'Beauty treatments, spa services, and personal care',
    subcategories: ['Hair Styling', 'Makeup', 'Massage', 'Nail Care', 'Spa'],
    color: 'bg-pink-500'
  },
  {
    id: 'automotive',
    title: 'Automotive',
    icon: Car,
    description: 'Car maintenance, repairs, and detailing services',
    subcategories: ['Repairs', 'Maintenance', 'Detailing', 'Towing', 'Inspection'],
    color: 'bg-red-500'
  },
  {
    id: 'tech',
    title: 'Tech Support',
    icon: Laptop,
    description: 'Computer repairs, IT support, and digital services',
    subcategories: ['Computer Repair', 'IT Support', 'Phone Repair', 'Network Setup', 'Data Recovery'],
    color: 'bg-purple-500'
  },
  {
    id: 'education',
    title: 'Education & Tutoring',
    icon: Book,
    description: 'Private tutoring, lessons, and educational support',
    subcategories: ['Academic', 'Languages', 'Music', 'Art', 'Test Prep'],
    color: 'bg-green-500'
  },
  {
    id: 'health',
    title: 'Health & Fitness',
    icon: Heart,
    description: 'Personal training, fitness classes, and health services',
    subcategories: ['Personal Training', 'Yoga', 'Nutrition', 'Physical Therapy', 'Mental Health'],
    color: 'bg-teal-500'
  },
  {
    id: 'shopping',
    title: 'Personal Shopping',
    icon: ShoppingBag,
    description: 'Personal shopping, styling, and delivery services',
    subcategories: ['Grocery', 'Fashion', 'Gift Shopping', 'Errands', 'Delivery'],
    color: 'bg-indigo-500'
  },
  {
    id: 'food',
    title: 'Food & Catering',
    icon: Utensils,
    description: 'Personal chefs, catering, and meal preparation',
    subcategories: ['Personal Chef', 'Catering', 'Meal Prep', 'Baking', 'Event Planning'],
    color: 'bg-yellow-500'
  },
  {
    id: 'pets',
    title: 'Pet Services',
    icon: Dog,
    description: 'Pet sitting, grooming, and animal care services',
    subcategories: ['Pet Sitting', 'Dog Walking', 'Grooming', 'Training', 'Veterinary'],
    color: 'bg-cyan-500'
  },
  {
    id: 'events',
    title: 'Event Services',
    icon: Camera,
    description: 'Photography, entertainment, and event planning',
    subcategories: ['Photography', 'Videography', 'DJ Services', 'Planning', 'Decoration'],
    color: 'bg-rose-500'
  },
  {
    id: 'arts',
    title: 'Arts & Music',
    icon: Music,
    description: 'Music lessons, art classes, and creative services',
    subcategories: ['Music Lessons', 'Art Classes', 'Dance', 'Acting', 'Creative Writing'],
    color: 'bg-violet-500'
  }
]

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [darkMode, setDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  const filteredCategories = serviceCategories.filter(category =>
    category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category.subcategories.some(sub => sub.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100">
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/75 dark:bg-black/75 shadow-sm">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="font-bold text-xl">BestFavour</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">Login</Link>
            <Link href="/settings" className="text-sm hover:text-blue-600 dark:hover:text-blue-400">Settings</Link>
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
          <h1 className="text-3xl font-bold mb-4">Service Categories</h1>
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <Input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group block"
            >
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${category.color} bg-opacity-10 dark:bg-opacity-20`}>
                    <category.icon className={`h-6 w-6 ${category.color.replace('bg-', 'text-')}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {category.subcategories.map((subcategory) => (
                        <span
                          key={subcategory}
                          className="inline-block px-2 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded"
                        >
                          {subcategory}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="bg-white dark:bg-black border-t dark:border-gray-800 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        © 2024 BestFavour. All rights reserved.
      </footer>
    </div>
  )
}
