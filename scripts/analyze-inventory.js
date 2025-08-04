const fs = require('fs')
const path = require('path')

function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8')
  const lines = content.split('\n').filter(line => line.trim())
  const headers = lines[0].split(',').map(h => h.replace(/"/g, '').trim())
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.replace(/"/g, '').trim())
    const item = {}
    headers.forEach((header, index) => {
      item[header] = values[index] || ''
    })
    return item
  })
}

function extractPersonName(fullName) {
  return fullName.replace(/\(https:\/\/www\.notion\.so\/[^)]+\)/g, '').trim()
}

function analyzeInventory() {
  console.log('🔍 Analyzing inventory data...')
  
  const csvPath = path.join(__dirname, '../Inventory_layout/Inventaire Informatique 21c87d32997c80b2b4d6c05543ac679a_all.csv')
  const inventoryData = parseCSV(csvPath)
  
  console.log(`📊 Total items: ${inventoryData.length}`)
  
  // Analyze equipment types
  const equipmentTypes = {}
  const brands = {}
  const people = new Set()
  const locations = new Set()
  const statuses = new Set()
  
  inventoryData.forEach(item => {
    // Equipment types
    const type = item['Équipement'] || 'Unknown'
    equipmentTypes[type] = (equipmentTypes[type] || 0) + 1
    
    // Brands/Models
    const brandModel = item['Marque / Modèle'] || 'Unknown'
    brands[brandModel] = (brands[brandModel] || 0) + 1
    
    // People
    if (item['Nom du collaborateur']) {
      const cleanName = extractPersonName(item['Nom du collaborateur'])
      if (cleanName) people.add(cleanName)
    }
    
    // Locations
    if (item['Localisation']) {
      locations.add(item['Localisation'])
    }
    
    // Statuses
    if (item['Statut']) {
      statuses.add(item['Statut'])
    }
  })
  
  console.log('\n📋 Equipment Types:')
  Object.entries(equipmentTypes).forEach(([type, count]) => {
    console.log(`  ${type}: ${count}`)
  })
  
  console.log('\n🏷️ Brands/Models:')
  Object.entries(brands).forEach(([brand, count]) => {
    console.log(`  ${brand}: ${count}`)
  })
  
  console.log('\n👥 Unique People:')
  console.log(`  Total: ${people.size}`)
  Array.from(people).sort().forEach(name => {
    console.log(`  - ${name}`)
  })
  
  console.log('\n🌍 Locations:')
  Array.from(locations).forEach(location => {
    console.log(`  - ${location}`)
  })
  
  console.log('\n📊 Statuses:')
  Array.from(statuses).forEach(status => {
    console.log(`  - ${status}`)
  })
  
  // Analyze PC assignments specifically
  const pcAssignments = inventoryData.filter(item => 
    item['Équipement'] === 'PC' && item['Nom du collaborateur']
  )
  
  console.log('\n💻 PC Assignments:')
  pcAssignments.forEach(item => {
    const name = extractPersonName(item['Nom du collaborateur'])
    const brand = item['Marque / Modèle']
    const date = item['Date d\'attribution']
    const status = item['Statut']
    const location = item['Localisation']
    
    console.log(`  ${name} -> ${brand} (${date}) [${status}] [${location}]`)
  })
  
  // Analyze accessories
  const accessories = inventoryData.filter(item => 
    item['Équipement'] === 'Souris'
  )
  
  console.log('\n🖱️ Accessories:')
  accessories.forEach(item => {
    const name = extractPersonName(item['Nom du collaborateur'])
    const accessory = item['Nom de l\'équipement']
    const date = item['Date d\'attribution']
    
    console.log(`  ${name} -> ${accessory} (${date})`)
  })
}

analyzeInventory() 