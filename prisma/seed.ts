import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create initial categories
  const categories = [
    {
      name: 'Home Services',
      description: 'Professional home maintenance and improvement services',
      icon: 'Home',
      color: 'text-blue-500',
    },
    {
      name: 'Maintenance',
      description: 'General maintenance and repair services',
      icon: 'Wrench',
      color: 'text-green-500',
    },
    {
      name: 'Beauty & Wellness',
      description: 'Personal care and wellness services',
      icon: 'Scissors',
      color: 'text-pink-500',
    },
    {
      name: 'Tech Support',
      description: 'Technical support and IT services',
      icon: 'Laptop',
      color: 'text-purple-500',
    },
    {
      name: 'Automotive',
      description: 'Vehicle maintenance and repair services',
      icon: 'Car',
      color: 'text-red-500',
    },
    {
      name: 'Business Services',
      description: 'Professional business support services',
      icon: 'Briefcase',
      color: 'text-yellow-500',
    },
  ]

  // Create categories first
  const createdCategories = await Promise.all(
    categories.map(async (category) => {
      return await prisma.category.upsert({
        where: { name: category.name },
        update: {},
        create: category,
      })
    })
  )

  // Get the Home Services category ID
  const homeServicesCategory = createdCategories.find(
    (cat) => cat.name === 'Home Services'
  )

  if (!homeServicesCategory) {
    throw new Error('Home Services category not found')
  }

  // Create a demo user
  const demoUser = await prisma.user.upsert({
    where: { email: 'demo@bestfavour.com' },
    update: {},
    create: {
      email: 'demo@bestfavour.com',
      name: 'Demo User',
      password: await hash('demo123', 12),
      role: 'user',
    },
  })

  // Create a demo provider
  const demoProvider = await prisma.user.upsert({
    where: { email: 'provider@bestfavour.com' },
    update: {},
    create: {
      email: 'provider@bestfavour.com',
      name: 'John Smith',
      password: await hash('provider123', 12),
      role: 'provider',
      provider: {
        create: {
          businessName: 'John\'s Home Services',
          description: 'Professional home maintenance and repair services',
          location: 'Cape Town',
          categories: ['Home Services', 'Maintenance'],
          rating: 4.8,
          reviewCount: 24,
          services: {
            create: [
              {
                title: 'Basic Home Repair',
                description: 'General home repair and maintenance',
                price: 500,
                duration: 120,
                categoryId: homeServicesCategory.id,
              },
              {
                title: 'Plumbing Service',
                description: 'Professional plumbing repairs and installation',
                price: 750,
                duration: 180,
                categoryId: homeServicesCategory.id,
              },
            ],
          },
        },
      },
    },
  })

  console.log({ demoUser, demoProvider })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
