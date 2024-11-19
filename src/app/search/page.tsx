'use client'

import Link from 'next/link'
import { Card, CardContent } from "@/components/ui/card"
import BottomNav from '@/components/bottom-nav'
import { SearchBar } from '@/components/search-bar'
import { Home, Wrench, Scissors, Laptop, Car, Briefcase } from 'lucide-react'

const categories = [
  { name: 'Home Services', icon: Home, color: 'text-blue-500' },
  { name: 'Maintenance', icon: Wrench, color: 'text-green-500' },
  { name: 'Beauty & Wellness', icon: Scissors, color: 'text-pink-500' },
  { name: 'Tech Support', icon: Laptop, color: 'text-purple-500' },
  { name: 'Automotive', icon: Car, color: 'text-red-500' },
  { name: 'Business Services', icon: Briefcase, color: 'text-yellow-500' },
]

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Search Services</h1>
          <SearchBar className="mb-8" />
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                href={`/categories/${category.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <Card className="hover:shadow-lg transition-shadow duration-200 hover:-translate-y-1">
                  <CardContent className="p-6 flex flex-col items-center text-center">
                    <category.icon className={`h-8 w-8 ${category.color} mb-2`} />
                    <h3 className="font-medium">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* You can add popular searches or trending services here */}
      </div>
      <BottomNav />
    </main>
  )
}
