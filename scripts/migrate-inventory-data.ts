import { PrismaClient } from '../lib/generated/prisma'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface InventoryItem {
  equipmentName: string
  collaboratorName: string
  equipmentType: string
  brandModel: string
  assignmentDate: string
  status: string
  condition: string
  location: string
  eligibleForRenewal: string
  internalReference: string
  purchasePriceHT: string
  maintenanceHistory: string
  currency: string
}

async function parseCSV(filePath: string): Promise<InventoryItem[]> {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n').filter(line => line.trim())
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim())
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.replace(/"/g, '').trim())
    const item: any = {}
    headers.forEach((header, index) => {
      item[header] = values[index] || ''
    })
    return item as InventoryItem
  })
}

async function extractPersonName(fullName: string): Promise<string> {
  // Remove Notion links and extract just the name
  return fullName.replace(/\(https:\/\/www\.notion\.so\/[^)]+\)/g, '').trim()
}

async function createLaptops() {
  console.log('🖥️ Creating laptops from inventory data...')
  
  const laptops = [
    {
      brand: 'HP',
      model: 'ProBook 440 G8',
      price: 9340,
      priceType: 'HT',
      processor: 'Intel Core i5-1135G7',
      ram: '8GB DDR4',
      storage: '256GB SSD',
      batteryLife: 8.5,
      performanceScore: 7.2,
      images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400'],
      notes: 'Standard business laptop',
      supportedProfiles: ['Consultant', 'Developer'],
      supportedOS: ['Windows 10', 'Windows 11']
    },
    {
      brand: 'Apple',
      model: 'MacBook Air 13" M4',
      price: 12075,
      priceType: 'HT',
      processor: 'Apple M4',
      ram: '8GB Unified Memory',
      storage: '256GB SSD',
      batteryLife: 18.0,
      performanceScore: 9.1,
      images: ['https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'],
      notes: 'High-performance MacBook with M4 chip',
      supportedProfiles: ['Developer', 'Consultant'],
      supportedOS: ['macOS']
    },
    {
      brand: 'Lenovo',
      model: 'ThinkPad P14s Gen 5',
      price: 1068,
      priceType: 'HT',
      processor: 'AMD Ryzen 7 Pro 8840HS',
      ram: '16GB DDR5',
      storage: '512GB SSD',
      batteryLife: 9.0,
      performanceScore: 8.5,
      images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400'],
      notes: 'Professional workstation laptop',
      supportedProfiles: ['Developer'],
      supportedOS: ['Windows 11', 'Linux']
    }
  ]

  for (const laptopData of laptops) {
    const laptop = await prisma.laptop.create({
      data: {
        brand: laptopData.brand,
        model: laptopData.model,
        price: laptopData.price,
        priceType: laptopData.priceType,
        processor: laptopData.processor,
        ram: laptopData.ram,
        storage: laptopData.storage,
        batteryLife: laptopData.batteryLife,
        performanceScore: laptopData.performanceScore,
        images: laptopData.images,
        notes: laptopData.notes
      }
    })

    // Create supported profiles
    for (const profile of laptopData.supportedProfiles) {
      await prisma.laptopProfile.create({
        data: {
          laptopId: laptop.id,
          profile: profile
        }
      })
    }

    // Create supported OS
    for (const os of laptopData.supportedOS) {
      await prisma.laptopOS.create({
        data: {
          laptopId: laptop.id,
          os: os
        }
      })
    }

    console.log(`✅ Created laptop: ${laptop.brand} ${laptop.model}`)
  }
}

async function createAccessories() {
  console.log('🖱️ Creating accessories from inventory data...')
  
  const accessories = [
    {
      name: 'Logitech M240 Bluetooth Mouse',
      type: 'Mouse',
      brand: 'Logitech',
      price: 250,
      priceType: 'HT',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      notes: 'Wireless bluetooth mouse'
    },
    {
      name: 'Logitech M171 Wireless Mouse',
      type: 'Mouse',
      brand: 'Logitech',
      price: 180,
      priceType: 'HT',
      image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
      notes: 'Wireless mouse with USB receiver'
    }
  ]

  for (const accessoryData of accessories) {
    await prisma.accessory.create({
      data: accessoryData
    })
    console.log(`✅ Created accessory: ${accessoryData.name}`)
  }
}

async function createPeople(inventoryData: InventoryItem[]) {
  console.log('👥 Creating people from inventory data...')
  
  const uniquePeople = new Map<string, InventoryItem>()
  
  // Extract unique people
  for (const item of inventoryData) {
    if (item.collaboratorName && item.collaboratorName.trim()) {
      const cleanName = await extractPersonName(item.collaboratorName)
      if (cleanName && !uniquePeople.has(cleanName)) {
        uniquePeople.set(cleanName, item)
      }
    }
  }

  for (const [name, item] of uniquePeople) {
    // Determine position based on equipment type and location
    let position = 'General'
    if (item.location === 'France') {
      position = 'Consultant'
    } else if (item.equipmentType === 'PC' && item.brandModel?.includes('MacBook')) {
      position = 'Developer'
    } else if (item.equipmentType === 'PC') {
      position = 'Consultant'
    }

    await prisma.person.create({
      data: {
        name: name,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@company.com`,
        department: item.location === 'France' ? 'International' : 'Local',
        position: position,
        pcReference: item.internalReference || null
      }
    })
    
    console.log(`✅ Created person: ${name} (${position})`)
  }
}

async function createPackageTemplates() {
  console.log('📦 Creating package templates...')
  
  const templates = [
    {
      name: 'HP ProBook 440 G8 Consultant Setup',
      description: 'Standard business laptop setup for consultants',
      profileType: 'Consultant',
      priceType: 'HT',
      notes: 'Includes HP ProBook 440 G8 laptop'
    },
    {
      name: 'MacBook Air 13" Developer Setup',
      description: 'High-performance MacBook setup for developers',
      profileType: 'Developer',
      priceType: 'HT',
      notes: 'Includes MacBook Air 13" with M4 chip'
    },
    {
      name: 'Lenovo ThinkPad P14s Developer Setup',
      description: 'Professional workstation setup for developers',
      profileType: 'Developer',
      priceType: 'HT',
      notes: 'Includes Lenovo ThinkPad P14s Gen 5'
    }
  ]

  const laptops = await prisma.laptop.findMany()
  const accessories = await prisma.accessory.findMany()

  for (const templateData of templates) {
    // Find matching laptop
    let laptopId = ''
    if (templateData.name.includes('HP')) {
      laptopId = laptops.find(l => l.brand === 'HP' && l.model.includes('ProBook'))?.id || ''
    } else if (templateData.name.includes('MacBook')) {
      laptopId = laptops.find(l => l.brand === 'Apple')?.id || ''
    } else if (templateData.name.includes('ThinkPad')) {
      laptopId = laptops.find(l => l.brand === 'Lenovo')?.id || ''
    }

    if (laptopId) {
      const template = await prisma.packageTemplate.create({
        data: {
          name: templateData.name,
          description: templateData.description,
          profileType: templateData.profileType,
          laptopId: laptopId,
          priceType: templateData.priceType,
          notes: templateData.notes
        }
      })

      // Add mouse accessory to templates
      const mouseAccessory = accessories.find(a => a.name.includes('Mouse'))
      if (mouseAccessory) {
        await prisma.templateAccessory.create({
          data: {
            templateId: template.id,
            accessoryId: mouseAccessory.id
          }
        })
      }

      console.log(`✅ Created template: ${template.name}`)
    }
  }
}

async function createAssignments(inventoryData: InventoryItem[]) {
  console.log('🔗 Creating assignments from inventory data...')
  
  const people = await prisma.person.findMany()
  const templates = await prisma.packageTemplate.findMany()

  for (const item of inventoryData) {
    if (!item.collaboratorName || !item.equipmentType || item.equipmentType !== 'PC') {
      continue
    }

    const personName = await extractPersonName(item.collaboratorName)
    const person = people.find(p => p.name === personName)
    
    if (!person) continue

    // Find matching template based on equipment
    let templateId = ''
    if (item.brandModel?.includes('HP 440 G8')) {
      templateId = templates.find(t => t.name.includes('HP ProBook'))?.id || ''
    } else if (item.brandModel?.includes('M4 Air 13')) {
      templateId = templates.find(t => t.name.includes('MacBook'))?.id || ''
    } else if (item.brandModel?.includes('ThinkPad')) {
      templateId = templates.find(t => t.name.includes('ThinkPad'))?.id || ''
    }

    if (templateId) {
      // Parse assignment date
      let assignedAt = new Date()
      if (item.assignmentDate) {
        const dateMatch = item.assignmentDate.match(/(\d{1,2})\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/)
        if (dateMatch) {
          const months = {
            'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
            'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
          }
          const day = parseInt(dateMatch[1])
          const month = months[dateMatch[2] as keyof typeof months]
          const year = parseInt(dateMatch[3])
          assignedAt = new Date(year, month, day)
        }
      }

      // Determine status
      let status = 'assigned'
      if (item.status?.includes('Hors service')) {
        status = 'returned'
      } else if (item.status?.includes('Actif')) {
        status = 'delivered'
      }

      await prisma.personAssignment.create({
        data: {
          personId: person.id,
          templateId: templateId,
          status: status as 'assigned' | 'delivered' | 'returned',
          pcReference: item.internalReference || null,
          assignedAt: assignedAt,
          notes: item.maintenanceHistory || null
        }
      })

      console.log(`✅ Created assignment: ${person.name} -> ${item.brandModel}`)
    }
  }
}

async function main() {
  try {
    console.log('🚀 Starting inventory data migration...')
    
    // Parse CSV data
    const csvPath = path.join(__dirname, '../Inventory_layout/Inventaire Informatique 21c87d32997c80b2b4d6c05543ac679a_all.csv')
    const inventoryData = await parseCSV(csvPath)
    
    console.log(`📊 Found ${inventoryData.length} inventory items`)
    
    // Create data in order
    await createLaptops()
    await createAccessories()
    await createPeople(inventoryData)
    await createPackageTemplates()
    await createAssignments(inventoryData)
    
    console.log('✅ Migration completed successfully!')
    
    // Print summary
    const peopleCount = await prisma.person.count()
    const templatesCount = await prisma.packageTemplate.count()
    const assignmentsCount = await prisma.personAssignment.count()
    const laptopsCount = await prisma.laptop.count()
    const accessoriesCount = await prisma.accessory.count()
    
    console.log('\n📈 Migration Summary:')
    console.log(`👥 People: ${peopleCount}`)
    console.log(`💻 Laptops: ${laptopsCount}`)
    console.log(`🖱️ Accessories: ${accessoriesCount}`)
    console.log(`📦 Templates: ${templatesCount}`)
    console.log(`🔗 Assignments: ${assignmentsCount}`)
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 