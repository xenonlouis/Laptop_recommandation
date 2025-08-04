import { PrismaClient } from '../lib/generated/prisma'
import * as fs from 'fs'
import * as path from 'path'

const prisma = new PrismaClient()

interface InventoryItem {
  'Nom de l\'équipement': string
  'Nom du collaborateur': string
  'Équipement': string
  'Marque / Modèle': string
  'Date d\'attribution': string
  'Statut': string
  'État': string
  'Localisation': string
  'Éligible au renouvellement': string
  'Référence interne': string
  'Prix d\'achat HT': string
  'Historique de maintenance': string
  'Devise': string
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
  return fullName.replace(/\(https:\/\/www\.notion\.so\/[^)]+\)/g, '').trim()
}

async function validateInventoryData(inventoryData: InventoryItem[]) {
  console.log('🔍 Validating inventory data...')
  
  const validItems = []
  const invalidItems = []
  const accessoryItems = []
  
  for (const item of inventoryData) {
    const hasCollaborator = item['Nom du collaborateur'] && item['Nom du collaborateur'].trim()
    const hasEquipmentType = item['Équipement'] && item['Équipement'].trim()
    const hasBrandModel = item['Marque / Modèle'] && item['Marque / Modèle'].trim()
    const isPC = item['Équipement'] === 'PC'
    const isAccessory = item['Équipement'] === 'Souris'
    
    if (hasCollaborator && hasEquipmentType && isPC) {
      // Accept PC items even if brand/model is missing (we'll assign default)
      validItems.push(item)
    } else if (hasCollaborator && isAccessory) {
      // Include accessory items
      accessoryItems.push(item)
    } else {
      invalidItems.push({
        item,
        reasons: []
      })
      
      if (!hasCollaborator) invalidItems[invalidItems.length - 1].reasons.push('No collaborator')
      if (!hasEquipmentType) invalidItems[invalidItems.length - 1].reasons.push('No equipment type')
      if (!isPC && !isAccessory) invalidItems[invalidItems.length - 1].reasons.push('Not PC or accessory')
    }
  }
  
  console.log(`✅ Valid PC items: ${validItems.length}`)
  console.log(`🖱️ Accessory items: ${accessoryItems.length}`)
  console.log(`❌ Invalid items: ${invalidItems.length}`)
  
  if (invalidItems.length > 0) {
    console.log('\n📋 Invalid items:')
    invalidItems.forEach((item, index) => {
      const name = item.item['Nom du collaborateur'] || 'Unknown'
      const brand = item.item['Marque / Modèle'] || 'Unknown'
      console.log(`  ${index + 1}. ${name} -> ${brand} (${item.reasons.join(', ')})`)
    })
  }
  
  return { validItems, accessoryItems }
}

async function clearExistingData() {
  console.log('🧹 Clearing existing data...')
  
  // Delete in correct order to respect foreign keys
  await prisma.personAssignment.deleteMany()
  await prisma.templateAccessory.deleteMany()
  await prisma.packageTemplate.deleteMany()
  await prisma.laptopProfile.deleteMany()
  await prisma.laptopOS.deleteMany()
  
  // Handle legacy packages that reference laptops
  await prisma.package.deleteMany()
  await prisma.packageAccessory.deleteMany()
  await prisma.packageAssignment.deleteMany()
  
  await prisma.laptop.deleteMany()
  await prisma.accessory.deleteMany()
  await prisma.person.deleteMany()
  
  console.log('✅ Existing data cleared')
}

async function createLaptops() {
  console.log('🖥️ Creating laptops...')
  
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
             supportedOS: ['Windows']
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
      price: 15000, // Fixed: Should be around 15,000 MAD for a professional workstation
      priceType: 'HT',
      processor: 'AMD Ryzen 7 Pro 8840HS',
      ram: '16GB DDR5',
      storage: '512GB SSD',
      batteryLife: 9.0,
      performanceScore: 8.5,
      images: ['https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400'],
      notes: 'Professional workstation laptop',
      supportedProfiles: ['Developer'],
             supportedOS: ['Windows', 'Linux']
    }
  ]

  const createdLaptops = []
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

    createdLaptops.push(laptop)
    console.log(`✅ Created laptop: ${laptop.brand} ${laptop.model}`)
  }
  
  return createdLaptops
}

async function createAccessories() {
  console.log('🖱️ Creating accessories...')
  
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

  const createdAccessories = []
  for (const accessoryData of accessories) {
    const accessory = await prisma.accessory.create({
      data: accessoryData
    })
    createdAccessories.push(accessory)
    console.log(`✅ Created accessory: ${accessory.name}`)
  }
  
  return createdAccessories
}

async function createPeople(validInventoryData: InventoryItem[]) {
  console.log('👥 Creating people...')
  
  const uniquePeople = new Map<string, InventoryItem>()
  
  // Extract unique people from valid data only
  for (const item of validInventoryData) {
    const cleanName = await extractPersonName(item['Nom du collaborateur'])
    if (cleanName && !uniquePeople.has(cleanName)) {
      uniquePeople.set(cleanName, item)
    }
  }

  const createdPeople = []
  for (const [name, item] of uniquePeople) {
    // Determine position based on equipment type and location
    let position = 'General'
    if (item['Localisation'] === 'France') {
      position = 'Consultant'
    } else if (item['Équipement'] === 'PC' && item['Marque / Modèle']?.includes('MacBook')) {
      position = 'Developer'
    } else if (item['Équipement'] === 'PC') {
      position = 'Consultant'
    }

    const person = await prisma.person.create({
      data: {
        name: name,
        email: `${name.toLowerCase().replace(/\s+/g, '.')}@company.com`,
        department: item['Localisation'] === 'France' ? 'International' : 'Local',
        position: position,
        pcReference: item['Référence interne'] || null
      }
    })
    
    createdPeople.push(person)
    console.log(`✅ Created person: ${name} (${position})`)
  }
  
  return createdPeople
}

async function createPackageTemplates(laptops: any[], accessories: any[]) {
  console.log('📦 Creating package templates...')
  
  const templates = [
    {
      name: 'HP ProBook 440 G8 Consultant Setup',
      description: 'Standard business laptop setup for consultants',
      profileType: 'Consultant',
      priceType: 'HT',
      notes: 'Includes HP ProBook 440 G8 laptop',
      laptopBrand: 'HP',
      laptopModel: 'ProBook 440 G8'
    },
    {
      name: 'MacBook Air 13" Developer Setup',
      description: 'High-performance MacBook setup for developers',
      profileType: 'Developer',
      priceType: 'HT',
      notes: 'Includes MacBook Air 13" with M4 chip',
      laptopBrand: 'Apple',
      laptopModel: 'MacBook Air 13" M4'
    },
    {
      name: 'Lenovo ThinkPad P14s Developer Setup',
      description: 'Professional workstation setup for developers',
      profileType: 'Developer',
      priceType: 'HT',
      notes: 'Includes Lenovo ThinkPad P14s Gen 5',
      laptopBrand: 'Lenovo',
      laptopModel: 'ThinkPad P14s Gen 5'
    }
  ]

  const createdTemplates = []
  for (const templateData of templates) {
    // Find matching laptop
    const laptop = laptops.find(l => 
      l.brand === templateData.laptopBrand && 
      l.model === templateData.laptopModel
    )

    if (laptop) {
      const template = await prisma.packageTemplate.create({
        data: {
          name: templateData.name,
          description: templateData.description,
          profileType: templateData.profileType,
          laptopId: laptop.id,
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

      createdTemplates.push(template)
      console.log(`✅ Created template: ${template.name}`)
    }
  }
  
  return createdTemplates
}

async function createAssignments(validInventoryData: InventoryItem[], people: any[], templates: any[]) {
  console.log('🔗 Creating assignments...')
  
  const createdAssignments = []
  const skippedAssignments = []
  
  for (const item of validInventoryData) {
    const personName = await extractPersonName(item['Nom du collaborateur'])
    const person = people.find(p => p.name === personName)
    
    if (!person) {
      skippedAssignments.push({ item, reason: 'Person not found' })
      continue
    }

    // Find matching template based on equipment
    let template = null
    const brandModel = item['Marque / Modèle']
    
    if (brandModel?.includes('HP 440 G8')) {
      template = templates.find(t => t.name.includes('HP ProBook'))
    } else if (brandModel?.includes('M4 Air 13')) {
      template = templates.find(t => t.name.includes('MacBook'))
    } else if (brandModel?.includes('ThinkPad')) {
      template = templates.find(t => t.name.includes('ThinkPad'))
    } else if (!brandModel || brandModel.trim() === '') {
      // Assign default template for missing brand/model
      template = templates.find(t => t.name.includes('HP ProBook')) // Default to HP
    }

    if (template) {
      // Parse assignment date
      let assignedAt = new Date()
      if (item['Date d\'attribution']) {
        const dateMatch = item['Date d\'attribution'].match(/(\d{1,2})\s+(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre)\s+(\d{4})/)
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
      if (item['Statut']?.includes('Hors service')) {
        status = 'returned'
      } else if (item['Statut']?.includes('Actif')) {
        status = 'delivered'
      }

      const assignment = await prisma.personAssignment.create({
        data: {
          personId: person.id,
          templateId: template.id,
          status: status as 'assigned' | 'delivered' | 'returned',
          pcReference: item['Référence interne'] || null,
          assignedAt: assignedAt,
          notes: item['Historique de maintenance'] || null
        }
      })

      createdAssignments.push(assignment)
      console.log(`✅ Created assignment: ${person.name} -> ${brandModel || 'Default'}`)
    } else {
      skippedAssignments.push({ item, reason: `No template found for: ${brandModel}` })
    }
  }
  
  if (skippedAssignments.length > 0) {
    console.log(`\n⚠️ Skipped ${skippedAssignments.length} assignments:`)
    skippedAssignments.forEach(({ item, reason }) => {
      const name = extractPersonName(item['Nom du collaborateur'])
      const brand = item['Marque / Modèle']
      console.log(`  - ${name} -> ${brand}: ${reason}`)
    })
  }
  
  return createdAssignments
}

async function main() {
  try {
    console.log('🚀 Starting refined inventory data migration...')
    
    // Parse CSV data
    const csvPath = path.join(__dirname, '../Inventory_layout/Inventaire Informatique 21c87d32997c80b2b4d6c05543ac679a_all.csv')
    const inventoryData = await parseCSV(csvPath)
    
    console.log(`📊 Found ${inventoryData.length} total inventory items`)
    
    // Validate and filter data
    const { validItems, accessoryItems } = await validateInventoryData(inventoryData)
    
    if (validItems.length === 0) {
      console.log('❌ No valid inventory items found. Migration aborted.')
      return
    }
    
    // Clear existing data first
    await clearExistingData()
    
    // Create data in order
    const laptops = await createLaptops()
    const accessories = await createAccessories()
    const people = await createPeople(validItems)
    const templates = await createPackageTemplates(laptops, accessories)
    const assignments = await createAssignments(validItems, people, templates)
    
    console.log('✅ Migration completed successfully!')
    
    // Print summary
    console.log('\n📈 Migration Summary:')
    console.log(`👥 People: ${people.length}`)
    console.log(`💻 Laptops: ${laptops.length}`)
    console.log(`🖱️ Accessories: ${accessories.length}`)
    console.log(`📦 Templates: ${templates.length}`)
    console.log(`🔗 Assignments: ${assignments.length}`)
    console.log(`📊 Valid items processed: ${validItems.length}`)
    
  } catch (error) {
    console.error('❌ Migration failed:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main() 