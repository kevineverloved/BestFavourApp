"use client"

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Sun, 
  Moon, 
  Search, 
  SlidersHorizontal,
  Star,
  MapPin,
  Clock,
  DollarSign,
  ChevronDown,
  X
} from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

// Mock data for services
const mockServices = [
  {
    id: 1,
    title: "Professional House Cleaning",
    provider: "Clean & Shine Services",
    rating: 4.8,
    reviews: 156,
    price: 80,
    priceUnit: "per session",
    location: "New York, NY",
    distance: 2.5,
    availability: "Available Today",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    tags: ["Deep Cleaning", "Residential", "Commercial"],
    description: "Professional cleaning service with eco-friendly products and experienced staff."
  },
  {
    id: 2,
    title: "Expert Plumbing Services",
    provider: "Quick Fix Plumbing",
    rating: 4.9,
    reviews: 203,
    price: 95,
    priceUnit: "per hour",
    location: "Brooklyn, NY",
    distance: 3.8,
    availability: "Next Day Available",
    image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    tags: ["Emergency", "Repairs", "Installation"],
    description: "24/7 emergency plumbing services with licensed and insured professionals."
  },
  // Add more mock services as needed
]

const sortOptions = [
  { value: "relevance", label: "Most Relevant" },
  { value: "rating", label: "Highest Rated" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "distance", label: "Distance" },
  { value: "availability", label: "Availability" }
]

// Valid categories for validation
const validCategories = [
  'house-cleaning',
  'plumbing',
  'electrical',
  'landscaping',
  'moving',
  'handyman',
  'painting',
  'pest-control'
]

export default function ServiceListPage() {
  const params = useParams()
  const [darkMode, setDarkMode] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSort, setSelectedSort] = useState("relevance")
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200])
  const [availableNow, setAvailableNow] = useState(false)
  const [services, setServices] = useState(mockServices)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Initialize dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true'
    setDarkMode(savedDarkMode)
    if (savedDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode
    setDarkMode(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // Validate category and load services
  useEffect(() => {
    const category = params.category?.toString().toLowerCase()
    
    if (!category) {
      setError('Category is required')
      setIsLoading(false)
      return
    }

    if (!validCategories.includes(category)) {
      setError('Invalid category')
      setIsLoading(false)
      return
    }

    // Simulate API call to load services
    const loadServices = async () => {
      try {
        setIsLoading(true)
        setError(null)
        // In a real app, you would fetch services from an API
        await new Promise(resolve => setTimeout(resolve, 1000))
        setServices(mockServices)
      } catch (err) {
        setError('Failed to load services')
      } finally {
        setIsLoading(false)
      }
    }

    loadServices()
  }, [params.category])

  // Filter and sort services
  useEffect(() => {
    let filtered = [...mockServices]

    try {
      // Apply search filter
      if (searchQuery) {
        filtered = filtered.filter(service =>
          service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      }

      // Apply price range filter
      filtered = filtered.filter(service =>
        service.price >= priceRange[0] && service.price <= priceRange[1]
      )

      // Apply availability filter
      if (availableNow) {
        filtered = filtered.filter(service =>
          service.availability.includes("Available Today")
        )
      }

      // Apply sorting
      filtered.sort((a, b) => {
        switch (selectedSort) {
          case "rating":
            return b.rating - a.rating
          case "price-low":
            return a.price - b.price
          case "price-high":
            return b.price - a.price
          case "distance":
            return a.distance - b.distance
          default:
            return 0
        }
      })

      setServices(filtered)
    } catch (err) {
      console.error('Error filtering services:', err)
      setError('Failed to filter services')
    }
  }, [searchQuery, selectedSort, priceRange, availableNow, mockServices])

  return (
    <div className={`min-h-screen flex flex-col bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100`}>
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
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* Filters Section - Desktop */}
          <div className="hidden md:block w-64 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-4">Price Range</h3>
                <Slider
                  defaultValue={priceRange}
                  min={0}
                  max={200}
                  step={10}
                  onValueChange={(value) => setPriceRange(value as [number, number])}
                  className="mb-2"
                />
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Availability</h3>
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={availableNow}
                    onCheckedChange={setAvailableNow}
                  />
                  <Label>Available Today</Label>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4">Sort By</h3>
                <Select value={selectedSort} onValueChange={setSelectedSort}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-4">
                {params.category?.toString().split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </h1>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search services..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                
                {/* Mobile Filter Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="outline" className="md:hidden">
                      <SlidersHorizontal className="h-4 w-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                    </SheetHeader>
                    <div className="space-y-6 mt-6">
                      <div>
                        <h3 className="font-semibold mb-4">Price Range</h3>
                        <Slider
                          defaultValue={priceRange}
                          min={0}
                          max={200}
                          step={10}
                          onValueChange={(value) => setPriceRange(value as [number, number])}
                          className="mb-2"
                        />
                        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4">Availability</h3>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={availableNow}
                            onCheckedChange={setAvailableNow}
                          />
                          <Label>Available Today</Label>
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-4">Sort By</h3>
                        <Select value={selectedSort} onValueChange={setSelectedSort}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {sortOptions.map(option => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Error State */}
            {error && (
              <div className="p-4 mb-6 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
                {error}
              </div>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((n) => (
                  <div key={n} className="animate-pulse">
                    <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                  </div>
                ))}
              </div>
            ) : (
              /* Service Cards */
              <div className="space-y-4">
                {services.map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    className="block"
                  >
                    <Card className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex flex-col sm:flex-row gap-6">
                        <div className="sm:w-48 h-48 relative rounded-lg overflow-hidden">
                          <Image
                            src={service.image}
                            alt={service.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 192px"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h2 className="text-xl font-semibold mb-2">{service.title}</h2>
                              <p className="text-gray-600 dark:text-gray-400 mb-2">{service.provider}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-xl font-bold">${service.price}</div>
                              <div className="text-sm text-gray-600 dark:text-gray-400">{service.priceUnit}</div>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 dark:text-gray-400 mb-4">{service.description}</p>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            {service.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-sm"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          
                          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-400 mr-1" />
                              <span>{service.rating} ({service.reviews} reviews)</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 mr-1" />
                              <span>{service.distance} miles</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              <span>{service.availability}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
                
                {services.length === 0 && !error && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    No services found matching your criteria
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-white dark:bg-black border-t dark:border-gray-800 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        2024 BestFavour. All rights reserved.
      </footer>
    </div>
  )
}
