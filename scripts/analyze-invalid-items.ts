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

async function analyzeInvalidItems() {
  console.log('🔍 Analyzing invalid items in detail...')
  
  const csvPath = path.join(__dirname, '../Inventory_layout/Inventaire Informatique 21c87d32997c80b2b4d6c05543ac679a_all.csv')
  const inventoryData = await parseCSV(csvPath)
  
  console.log(`📊 Total items: ${inventoryData.length}`)
  
  // Categorize all items
  const validItems = []
  const invalidItems = []
  const accessoryItems = []
  const emptyItems = []
  
  for (let i = 0; i < inventoryData.length; i++) {
    const item = inventoryData[i]
    const lineNumber = i + 2 // +2 because we skip header and arrays are 0-indexed
    
    const hasCollaborator = item['Nom du collaborateur'] && item['Nom du collaborateur'].trim()
    const hasEquipmentType = item['Équipement'] && item['Équipement'].trim()
    const hasBrandModel = item['Marque / Modèle'] && item['Marque / Modèle'].trim()
    const isPC = item['Équipement'] === 'PC'
    const isAccessory = item['Équipement'] === 'Souris'
    
    // Check if it's completely empty
    const isEmpty = !hasCollaborator && !hasEquipmentType && !hasBrandModel
    
    if (hasCollaborator && hasEquipmentType && hasBrandModel && isPC) {
      validItems.push({ item, lineNumber })
    } else if (isAccessory) {
      accessoryItems.push({ item, lineNumber })
    } else if (isEmpty) {
      emptyItems.push({ item, lineNumber })
    } else {
      invalidItems.push({ item, lineNumber })
    }
  }
  
  console.log(`\n📈 Item Analysis:`)
  console.log(`✅ Valid PC items: ${validItems.length}`)
  console.log(`🖱️ Accessory items: ${accessoryItems.length}`)
  console.log(`❌ Invalid items: ${invalidItems.length}`)
  console.log(`📭 Empty items: ${emptyItems.length}`)
  
  // Show valid items
  console.log(`\n✅ Valid PC Items (${validItems.length}):`)
  validItems.forEach(({ item, lineNumber }) => {
    const name = extractPersonName(item['Nom du collaborateur'])
    const brand = item['Marque / Modèle']
    const status = item['Statut']
    console.log(`  Line ${lineNumber}: ${name} -> ${brand} (${status})`)
  })
  
  // Show accessory items
  console.log(`\n🖱️ Accessory Items (${accessoryItems.length}):`)
  accessoryItems.forEach(({ item, lineNumber }) => {
    const name = extractPersonName(item['Nom du collaborateur'])
    const accessory = item['Nom de l\'équipement']
    const brand = item['Marque / Modèle']
    console.log(`  Line ${lineNumber}: ${name} -> ${accessory} (${brand})`)
  })
  
  // Show invalid items in detail
  console.log(`\n❌ Invalid Items (${invalidItems.length}):`)
  invalidItems.forEach(({ item, lineNumber }) => {
    const name = item['Nom du collaborateur'] || 'Unknown'
    const equipment = item['Équipement'] || 'Unknown'
    const brand = item['Marque / Modèle'] || 'Unknown'
    const status = item['Statut'] || 'Unknown'
    
    const reasons = []
    if (!item['Nom du collaborateur']?.trim()) reasons.push('No collaborator')
    if (!item['Équipement']?.trim()) reasons.push('No equipment type')
    if (!item['Marque / Modèle']?.trim()) reasons.push('No brand/model')
    if (item['Équipement'] !== 'PC') reasons.push(`Equipment type: ${equipment}`)
    
    console.log(`  Line ${lineNumber}: ${name} -> ${brand} (${status})`)
    console.log(`    Equipment: "${equipment}" | Reasons: ${reasons.join(', ')}`)
  })
  
  // Show empty items
  console.log(`\n📭 Empty Items (${emptyItems.length}):`)
  emptyItems.forEach(({ lineNumber }) => {
    console.log(`  Line ${lineNumber}: Completely empty row`)
  })
  
  // Summary
  console.log(`\n📊 Summary:`)
  console.log(`Total lines: ${inventoryData.length}`)
  console.log(`Valid PC assignments: ${validItems.length}`)
  console.log(`Accessory assignments: ${accessoryItems.length}`)
  console.log(`Invalid/Incomplete: ${invalidItems.length}`)
  console.log(`Empty rows: ${emptyItems.length}`)
  console.log(`Coverage: ${validItems.length}/${inventoryData.length} (${((validItems.length/inventoryData.length)*100).toFixed(1)}%)`)
}

analyzeInvalidItems().then(() => {
  process.exit(0)
}).catch(error => {
  console.error('Error:', error)
  process.exit(1)
}) 