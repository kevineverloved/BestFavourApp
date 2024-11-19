"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

interface User {
  id: string
  name: string
  email: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth token
    const checkAuth = async () => {
      const token = localStorage.getItem('auth_token')
      if (token) {
        // In a real app, validate token with backend
        // For now, we'll use mock data
        setUser({
          id: '1',
          name: 'John Doe',
          email: 'john@example.com'
        })
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string) => {
    // In a real app, make API call to login
    // For now, just mock the login
    setUser({
      id: '1',
      name: 'John Doe',
      email: email
    })
    localStorage.setItem('auth_token', 'mock_token')
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_token')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
