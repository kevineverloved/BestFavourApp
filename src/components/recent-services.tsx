'use client'

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin } from 'lucide-react'

interface RecentServicesProps {
  className?: string
}

const recentServices = [
  { name: 'John Smith', avatar: '/placeholder.svg?height=50&width=50', category: 'Electrician', rating: 4.8, location: 'Cape Town' },
  { name: 'Sarah Johnson', avatar: '/placeholder.svg?height=50&width=50', category: 'House Cleaner', rating: 4.7, location: 'Johannesburg' },
  { name: 'Lerato Molefe', avatar: '/placeholder.svg?height=50&width=50', category: 'Plumber', rating: 4.6, location: 'Pretoria' },
]

export function RecentServices({ className = '' }: RecentServicesProps) {
  return (
    <section className={className}>
      <h2 className="text-2xl font-bold mb-6">Recent Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentServices.map((service) => (
          <Card key={service.name} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={service.avatar} alt={service.name} />
                  <AvatarFallback>{service.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{service.category}</p>
                  <div className="flex items-center mt-1">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="ml-1 text-sm">{service.rating}</span>
                  </div>
                  <div className="flex items-center mt-1 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{service.location}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
