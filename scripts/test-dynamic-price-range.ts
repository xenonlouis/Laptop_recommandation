import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function testDynamicPriceRange() {
  console.log('💰 Testing dynamic price range calculation...')
  
  const templates = await prisma.packageTemplate.findMany({
    include: {
      laptop: true,
      accessories: {
        include: {
          accessory: true
        }
      }
    }
  })
  
  console.log(`\n📦 Found ${templates.length} templates:`)
  
  const templatePrices = templates.map(template => {
    const laptopPrice = Number(template.laptop.price)
    const accessoryTotal = template.accessories.reduce((sum, ta) => sum + Number(ta.accessory.price), 0)
    const totalPrice = laptopPrice + accessoryTotal
    
    console.log(`- ${template.name}: ${totalPrice} MAD`)
    
    return {
      name: template.name,
      totalPrice
    }
  })
  
  const prices = templatePrices.map(t => t.totalPrice)
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  
  // Add some padding to the range (10% on each side)
  const padding = (maxPrice - minPrice) * 0.1
  const newMinPrice = Math.max(0, Math.floor(minPrice - padding))
  const newMaxPrice = Math.ceil(maxPrice + padding)
  
  console.log(`\n🎯 Price Analysis:`)
  console.log(`- Minimum price: ${minPrice} MAD`)
  console.log(`- Maximum price: ${maxPrice} MAD`)
  console.log(`- Price range: ${maxPrice - minPrice} MAD`)
  console.log(`- Padding (10%): ${padding} MAD`)
  console.log(`\n📊 Dynamic Price Range:`)
  console.log(`- New minimum: ${newMinPrice} MAD`)
  console.log(`- New maximum: ${newMaxPrice} MAD`)
  console.log(`- Range: [${newMinPrice}, ${newMaxPrice}] MAD`)
  
  console.log(`\n✅ Benefits:`)
  console.log(`- All templates will be visible by default`)
  console.log(`- No templates filtered out due to price`)
  console.log(`- Range adapts to actual data`)
}

testDynamicPriceRange().then(() => {
  process.exit(0)
}).catch(error => {
  console.error('Error:', error)
  process.exit(1)
}) 