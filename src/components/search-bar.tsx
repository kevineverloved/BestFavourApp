'use client'

import { Search } from 'lucide-react'
import { Input } from "@/components/ui/input"

interface SearchBarProps {
  className?: string
}

export function SearchBar({ className = '' }: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
      <Input
        type="text"
        placeholder="Search for services..."
        className="pl-10 w-full"
      />
    </div>
  )
}
