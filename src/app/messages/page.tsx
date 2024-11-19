'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import BottomNav from '@/components/bottom-nav'

const conversations = [
  {
    id: 1,
    name: 'John Doe',
    avatar: '/placeholder.svg?height=32&width=32',
    lastMessage: 'Hello! I saw your request for a plumber.',
    time: '10:00 AM',
    unread: true,
  },
  // Add more conversations as needed
]

const messages = [
  { id: 1, sender: 'John Doe', content: 'Hello! I saw your request for a plumber.', timestamp: '10:00 AM', isSent: false },
  { id: 2, sender: 'You', content: 'Hi John! Yes, I have a leaky faucet that needs fixing.', timestamp: '10:05 AM', isSent: true },
  { id: 3, sender: 'John Doe', content: 'I can help with that. When would be a good time for me to come take a look?', timestamp: '10:10 AM', isSent: false },
  { id: 4, sender: 'You', content: 'How about tomorrow afternoon, around 2 PM?', timestamp: '10:15 AM', isSent: true },
  { id: 5, sender: 'John Doe', content: "Sure, I can do that. I will be there at 2 PM tomorrow.", timestamp: '10:20 AM', isSent: false },
  { id: 6, sender: 'You', content: 'Great, thank you! See you then.', timestamp: '10:25 AM', isSent: true },
  { id: 7, sender: 'John Doe', content: "You are welcome. See you tomorrow!", timestamp: '10:30 AM', isSent: false },
]

export default function MessagesPage() {
  const [newMessage, setNewMessage] = useState('')

  const handleSend = () => {
    if (newMessage.trim()) {
      // Add message sending logic here
      setNewMessage('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <main className="flex-1 container mx-auto max-w-4xl p-4">
        <div className="bg-white rounded-lg shadow-sm h-[calc(100vh-8rem)] flex">
          {/* Conversations List */}
          <div className="w-1/3 border-r">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Messages</h2>
            </div>
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer flex items-center space-x-4"
                >
                  <Avatar>
                    <AvatarImage src={conversation.avatar} alt={conversation.name} />
                    <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline">
                      <h3 className="font-medium truncate">{conversation.name}</h3>
                      <span className="text-xs text-gray-500">{conversation.time}</span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread && (
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            <div className="p-4 border-b">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=32&width=32" alt="John Doe" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <h2 className="font-semibold">John Doe</h2>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isSent ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.isSent
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p>{message.content}</p>
                    <span
                      className={`text-xs mt-1 block ${
                        message.isSent ? 'text-blue-100' : 'text-gray-500'
                      }`}
                    >
                      {message.timestamp}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t">
              <div className="flex space-x-4">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button onClick={handleSend} size="icon">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
