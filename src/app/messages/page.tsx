'use client'

import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Send, Search, MoreVertical, Phone, Video, ArrowLeft, Menu, Home, User } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import BottomNav from '@/components/bottom-nav'

// Mock data for conversations
const conversations = [
  { id: 1, name: 'John Doe', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'Sure, I can help with that.', timestamp: '10:30 AM', unread: 2 },
  { id: 2, name: 'Jane Smith', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'What time works for you?', timestamp: 'Yesterday', unread: 0 },
  { id: 3, name: 'Mike Johnson', avatar: '/placeholder.svg?height=40&width=40', lastMessage: 'The job is completed.', timestamp: 'Mon', unread: 1 },
]

// Mock data for messages in a conversation
const messages = [
  { id: 1, sender: 'John Doe', content: 'Hello! I saw your request for plumbing services.', timestamp: '10:00 AM', isSent: false },
  { id: 2, sender: 'You', content: 'Hi John! Yes, I have a leaky faucet that needs fixing.', timestamp: '10:05 AM', isSent: true },
  { id: 3, sender: 'John Doe', content: 'I can help with that. When would be a good time for me to come take a look?', timestamp: '10:10 AM', isSent: false },
  { id: 4, sender: 'You', content: 'How about tomorrow afternoon, around 2 PM?', timestamp: '10:15 AM', isSent: true },
  { id: 5, sender: 'John Doe', content: 'Sure, I can do that. I'll be there at 2 PM tomorrow.', timestamp: '10:20 AM', isSent: false },
  { id: 6, sender: 'You', content: 'Great, thank you! See you then.', timestamp: '10:25 AM', isSent: true },
  { id: 7, sender: 'John Doe', content: 'You're welcome. See you tomorrow!', timestamp: '10:30 AM', isSent: false },
]

export default function MessagingPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [newMessage, setNewMessage] = useState('')
  const [isMobileViewActive, setIsMobileViewActive] = useState(false)
  const [chatMessages, setChatMessages] = useState(messages)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [chatMessages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMessage.trim()) {
      const newMsg = {
        id: chatMessages.length + 1,
        sender: 'You',
        content: newMessage.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSent: true
      }
      setChatMessages([...chatMessages, newMsg])
      setNewMessage('')
    }
  }

  const handleConversationSelect = (conversation: any) => {
    setSelectedConversation(conversation)
    setIsMobileViewActive(true)
    // In a real app, you would fetch messages for this conversation here
    setChatMessages(messages)
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/" aria-label="Go back">
              <ArrowLeft className="h-6 w-6" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">Messages</h1>
          <div className="w-6"></div>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar with conversation list */}
        <div className={`w-full md:w-1/3 bg-white border-r border-gray-200 ${isMobileViewActive ? 'hidden' : 'block'} md:block`}>
          <div className="p-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search conversations" className="pl-8" />
            </div>
          </div>
          <ScrollArea className="h-[calc(100vh-8rem)]">
            {conversations.map((conversation) => (
              <div
                key={conversation.id}
                className={`flex items-center p-4 cursor-pointer hover:bg-gray-100 ${
                  selectedConversation.id === conversation.id ? 'bg-blue-50' : ''
                }`}
                onClick={() => handleConversationSelect(conversation)}
              >
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={conversation.avatar} alt={conversation.name} />
                  <AvatarFallback>{conversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex justify-between items-baseline">
                    <h2 className="font-semibold">{conversation.name}</h2>
                    <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                </div>
                {conversation.unread > 0 && (
                  <Badge variant="destructive" className="ml-2">
                    {conversation.unread}
                  </Badge>
                )}
              </div>
            ))}
          </ScrollArea>
        </div>

        {/* Main chat area */}
        <div className={`flex-1 flex flex-col ${isMobileViewActive ? 'block' : 'hidden'} md:block`}>
          {/* Chat header */}
          <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
            <div className="flex items-center">
              <Button variant="ghost" size="icon" className="mr-2 md:hidden" onClick={() => setIsMobileViewActive(false)}>
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <Avatar className="h-10 w-10 mr-3">
                <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                <AvatarFallback>{selectedConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="font-semibold">{selectedConversation.name}</h2>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <Phone className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:inline-flex">
                <Video className="h-4 w-4" />
              </Button>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="space-y-4 mt-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Video className="mr-2 h-4 w-4" />
                      Video Call
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      View Profile
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Block User
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Clear Chat
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 p-4" ref={scrollRef}>
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isSent ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message.isSent ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  <p>{message.content}</p>
                  <span className="text-xs mt-1 block text-right">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
          </ScrollArea>

          {/* Message input */}
          <div className="bg-white border-t border-gray-200 p-4">
            <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1"
              />
              <Button type="submit">
                <Send className="h-4 w-4 mr-2" />
                Send
              </Button>
            </form>
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
