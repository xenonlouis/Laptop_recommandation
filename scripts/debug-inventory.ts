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
  
  console.log('Headers:', headers)
  
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

async function debugInventory() {
  console.log('🔍 Debugging inventory data...')
  
  const csvPath = path.join(__dirname, '../Inventory_layout/Inventaire Informatique 21c87d32997c80b2b4d6c05543ac679a_all.csv')
  const inventoryData = await parseCSV(csvPath)
  
  console.log(`📊 Total items: ${inventoryData.length}`)
  
  // Show first few items
  console.log('\n📋 First 5 items:')
  inventoryData.slice(0, 5).forEach((item, index) => {
    console.log(`\nItem ${index + 1}:`)
    console.log(`  Equipment Name: "${item['Nom de l\'équipement']}"`)
    console.log(`  Collaborator: "${item['Nom du collaborateur']}"`)
    console.log(`  Equipment Type: "${item['Équipement']}"`)
    console.log(`  Brand/Model: "${item['Marque / Modèle']}"`)
    console.log(`  Status: "${item['Statut']}"`)
    console.log(`  Location: "${item['Localisation']}"`)
  })
  
  // Analyze people
  const people = new Set<string>()
  const pcItems = []
  
  for (const item of inventoryData) {
    if (item['Nom du collaborateur'] && item['Nom du collaborateur'].trim()) {
      const cleanName = await extractPersonName(item['Nom du collaborateur'])
      if (cleanName) {
        people.add(cleanName)
      }
    }
    
    if (item['Équipement'] === 'PC' && item['Nom du collaborateur']) {
      pcItems.push(item)
    }
  }
  
  console.log(`\n👥 Unique people found: ${people.size}`)
  console.log('People:')
  Array.from(people).sort().forEach(name => {
    console.log(`  - ${name}`)
  })
  
  console.log(`\n💻 PC items with collaborators: ${pcItems.length}`)
  for (const item of pcItems) {
    const name = await extractPersonName(item['Nom du collaborateur'])
    console.log(`  ${name} -> ${item['Marque / Modèle']} (${item['Statut']})`)
  }
}

debugInventory().then(() => {
  process.exit(0)
}).catch(error => {
  console.error('Error:', error)
  process.exit(1)
}) 