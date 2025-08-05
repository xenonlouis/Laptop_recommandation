import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function checkThinkPadPrice() {
  console.log('🔍 Checking ThinkPad template price...')
  
  const thinkpadTemplate = await prisma.packageTemplate.findFirst({
    where: {
      name: {
        contains: 'ThinkPad'
      }
    },
    include: {
      laptop: true,
      accessories: {
        include: {
          accessory: true
        }
      }
    }
  })
  
  if (thinkpadTemplate) {
    console.log(`📦 Template: ${thinkpadTemplate.name}`)
    console.log(`💻 Laptop: ${thinkpadTemplate.laptop.brand} ${thinkpadTemplate.laptop.model}`)
    console.log(`💰 Laptop Price: ${thinkpadTemplate.laptop.price} MAD`)
    
    const accessoryTotal = thinkpadTemplate.accessories.reduce((sum, ta) => sum + Number(ta.accessory.price), 0)
    console.log(`🔌 Accessories Total: ${accessoryTotal} MAD`)
    
    const totalPrice = Number(thinkpadTemplate.laptop.price) + accessoryTotal
    console.log(`💵 Total Price: ${totalPrice} MAD`)
    
    console.log(`\n🎯 Price Analysis:`)
    console.log(`- Default filter range: [5000, 25000]`)
    console.log(`- ThinkPad total price: ${totalPrice}`)
    console.log(`- Is ThinkPad filtered out? ${totalPrice < 5000 ? 'YES! ❌' : 'NO ✅'}`)
    
  } else {
    console.log('❌ ThinkPad template not found')
  }
}

checkThinkPadPrice().then(() => {
  process.exit(0)
}).catch(error => {
  console.error('Error:', error)
  process.exit(1)
}) 