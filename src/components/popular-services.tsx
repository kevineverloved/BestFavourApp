'use client'

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, MapPin, TrendingUp } from 'lucide-react'

interface PopularServicesProps {
  className?: string
}

const popularServices = [
  { name: 'David Ndlovu', avatar: '/placeholder.svg?height=50&width=50', category: 'Personal Trainer', rating: 4.9, location: 'Cape Town' },
  { name: 'Maria Santos', avatar: '/placeholder.svg?height=50&width=50', category: 'Makeup Artist', rating: 4.8, location: 'Johannesburg' },
  { name: 'James Wilson', avatar: '/placeholder.svg?height=50&width=50', category: 'Web Developer', rating: 4.7, location: 'Durban' },
]

export function PopularServices({ className = '' }: PopularServicesProps) {
  return (
    <section className={className}>
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold">Popular Services</h2>
        <Badge variant="secondary" className="flex items-center gap-1 ml-2">
          <TrendingUp className="h-6 w-6" />
          Trending
        </Badge>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularServices.map((service) => (
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
