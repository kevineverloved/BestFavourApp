"use client"

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Sun, Moon, Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useAuth } from '@/context/auth-context'
import { useSession } from 'next-auth/react'
import { useToast } from "@/components/ui/use-toast"
import { Sparkles } from 'lucide-react'

export default function AuthPage() {
  const router = useRouter()
  const { login } = useAuth()
  const { data: session } = useSession()
  const { toast } = useToast()
  const [darkMode, setDarkMode] = useState(false)
  const [showLoginPassword, setShowLoginPassword] = useState(false)
  const [showRegisterPassword, setShowRegisterPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  
  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  })
  const [registerForm, setRegisterForm] = useState({
    email: '',
    password: ''
  })

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    if (darkMode) {
      document.documentElement.classList.remove('dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      await login(loginForm.email, loginForm.password)
      router.push('/')
    } catch (err) {
      setError('Failed to login. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    
    try {
      // TODO: Implement your registration logic here
      console.log('Register form submitted:', registerForm)
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      router.push('/')
    } catch (err) {
      setError('Failed to create account. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (session) {
    router.push('/')
    return null
  }

  return (
    <div className={`min-h-screen flex flex-col bg-gray-100 dark:bg-black text-gray-900 dark:text-gray-100 ${darkMode ? 'dark' : ''}`}>
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-white/75 dark:bg-black/75 shadow-sm">
        <div className="container mx-auto flex h-14 items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl">BestFavour</span>
          </Link>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-500" />
            )}
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 mb-16 md:mb-0">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle>Welcome to BestFavour</CardTitle>
            <CardDescription>Sign in or create an account to get started</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form onSubmit={handleLoginSubmit}>
                  <div className="space-y-4">
                    {error && (
                      <div className="p-3 text-sm text-red-500 bg-red-100 dark:bg-red-900/20 rounded-md">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        <Input 
                          id="email" 
                          type="email" 
                          placeholder="Enter your email" 
                          className="pl-10"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        <Input 
                          id="password" 
                          type={showLoginPassword ? "text" : "password"} 
                          placeholder="Enter your password" 
                          className="pl-10 pr-10"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          required
                          minLength={6}
                        />
                        <button 
                          type="button"
                          onClick={() => setShowLoginPassword(!showLoginPassword)} 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showLoginPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Signing in...' : 'Sign In'}
                    </Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form onSubmit={handleRegisterSubmit}>
                  <div className="space-y-4">
                    {error && (
                      <div className="p-3 text-sm text-red-500 bg-red-100 dark:bg-red-900/20 rounded-md">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        <Input 
                          id="register-email" 
                          type="email" 
                          placeholder="Enter your email" 
                          className="pl-10"
                          value={registerForm.email}
                          onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
                        <Input 
                          id="register-password" 
                          type={showRegisterPassword ? "text" : "password"} 
                          placeholder="Create a password" 
                          className="pl-10 pr-10"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                          required
                          minLength={6}
                        />
                        <button 
                          type="button"
                          onClick={() => setShowRegisterPassword(!showRegisterPassword)} 
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showRegisterPassword ? (
                            <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          ) : (
                            <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
            <div className="mt-4 text-center">
              <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline dark:text-blue-400">
                Forgot your password?
              </Link>
            </div>
            <Separator className="my-4" />
            <div className="space-y-4">
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Continue with Google
              </Button>
              <Button variant="outline" className="w-full">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.94 5.19A4.38 4.38 0 0 0 16.31 3a4.38 4.38 0 0 0-3.25 1.94 4.7 4.7 0 0 0-1.375 3.25c0 .313.031.625.094.938a4.412 4.412 0 0 0 3.156-1.688zm-1.844 2.38c-1.75 0-3.813 1.688-3.813 4.5 0 3.188 2.438 6.688 4.188 6.688.625 0 1.625-.5 2.625-.5 1.063 0 1.875.438 2.688.438 2.063 0 4.438-4.313 4.438-6.938v-.875c0-.063-.031-.125-.031-.188-.875-.25-2.75-1.25-2.75-3.75 0-2.438 2-3.5 2.125-3.563-.125-.375-1.188-2.25-3.375-2.25-1.5 0-2.875.875-3.563.875-.75 0-1.875-.75-3.125-.75-.125 0-.25.031-.375.031l-.032.032z" />
                </svg>
                Continue with Apple
              </Button>
              <Button
                variant="outline"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                onClick={() => router.push('/apply')}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Become a Service Provider
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>

      <footer className="bg-white dark:bg-black border-t dark:border-gray-800 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
        2024 BestFavour. All rights reserved.
      </footer>
    </div>
  )
}
