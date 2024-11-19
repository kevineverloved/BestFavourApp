'use client'

import { useState } from 'react'
import { ArrowLeft, ArrowRight, Upload } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import BottomNav from '@/components/bottom-nav'

const steps = [
  { id: 'personal', title: 'Personal Information' },
  { id: 'business', title: 'Business Details' },
  { id: 'services', title: 'Services Offered' },
  { id: 'documents', title: 'Documents' },
]

const serviceCategories = [
  'Home Services',
  'Personal Care',
  'Professional Services',
  'Education',
  'Health & Wellness',
  'Tech Support',
  'Events & Entertainment',
  'Automotive',
]

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    idNumber: '',
    businessName: '',
    businessType: '',
    category: '',
    experience: '',
    services: [] as string[],
    documents: {
      id: null as File | null,
      proof: null as File | null,
    },
    terms: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFormData(prev => ({
        ...prev,
        documents: { ...prev.documents, [name]: files[0] }
      }))
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log('Form submitted:', formData)
    alert('Application submitted successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <h1 className="text-xl font-semibold">Become a Service Provider</h1>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}>
                  {index + 1}
                </div>
                <span className="text-sm mt-2">{step.title}</span>
              </div>
            ))}
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>{steps[currentStep].title}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              {currentStep === 0 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="idNumber">ID Number</Label>
                    <Input
                      id="idNumber"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              )}

              {currentStep === 1 && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="businessName">Business Name</Label>
                    <Input
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="businessType">Business Type</Label>
                    <Select
                      onValueChange={(value) => setFormData(prev => ({ ...prev, businessType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="company">Registered Company</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}

              {currentStep === 2 && (
                <div className="space-y-4">
                  <div>
                    <Label>Service Category</Label>
                    <Select
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceCategories.map((category) => (
                          <SelectItem key={category} value={category.toLowerCase()}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Years of Experience</Label>
                    <RadioGroup
                      onValueChange={(value) => setFormData(prev => ({ ...prev, experience: value }))}
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="1-2" id="exp-1" />
                        <Label htmlFor="exp-1">1-2 years</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="3-5" id="exp-2" />
                        <Label htmlFor="exp-2">3-5 years</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="5+" id="exp-3" />
                        <Label htmlFor="exp-3">5+ years</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}

              {currentStep === 3 && (
                <div className="space-y-4">
                  <div>
                    <Label>ID Document</Label>
                    <div className="mt-2">
                      <Input
                        type="file"
                        name="id"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Proof of Address</Label>
                    <div className="mt-2">
                      <Input
                        type="file"
                        name="proof"
                        onChange={handleFileChange}
                        accept="image/*,.pdf"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, terms: checked as boolean }))
                      }
                    />
                    <Label htmlFor="terms">
                      I agree to the terms and conditions
                    </Label>
                  </div>
                </div>
              )}

              <div className="mt-6 flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                {currentStep === steps.length - 1 ? (
                  <Button type="submit" disabled={!formData.terms}>
                    Submit Application
                  </Button>
                ) : (
                  <Button type="button" onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </main>

      <BottomNav />
    </div>
  )
}
