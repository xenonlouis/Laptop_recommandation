console.log('💰 Testing corrected price range with fixed ThinkPad price...')

// Simulate the corrected prices
const templates = [
  {
    name: 'HP ProBook 440 G8 Consultant Setup',
    totalPrice: 9590 // 9340 + 250 accessory
  },
  {
    name: 'MacBook Air 13" Developer Setup', 
    totalPrice: 12325 // 12075 + 250 accessory
  },
  {
    name: 'Lenovo ThinkPad P14s Developer Setup',
    totalPrice: 15250 // 15000 + 250 accessory (FIXED)
  }
]

console.log(`\n📦 Corrected template prices:`)
templates.forEach(template => {
  console.log(`- ${template.name}: ${template.totalPrice} MAD`)
})

const prices = templates.map(t => t.totalPrice)
const minPrice = Math.min(...prices)
const maxPrice = Math.max(...prices)

// Add some padding to the range (10% on each side)
const padding = (maxPrice - minPrice) * 0.1
const newMinPrice = Math.max(0, Math.floor(minPrice - padding))
const newMaxPrice = Math.ceil(maxPrice + padding)

console.log(`\n🎯 Corrected Price Analysis:`)
console.log(`- Minimum price: ${minPrice} MAD`)
console.log(`- Maximum price: ${maxPrice} MAD`)
console.log(`- Price range: ${maxPrice - minPrice} MAD`)
console.log(`- Padding (10%): ${padding} MAD`)
console.log(`\n📊 Corrected Dynamic Price Range:`)
console.log(`- New minimum: ${newMinPrice} MAD`)
console.log(`- New maximum: ${newMaxPrice} MAD`)
console.log(`- Range: [${newMinPrice}, ${newMaxPrice}] MAD`)

console.log(`\n✅ Benefits of the fix:`)
console.log(`- ThinkPad price is now realistic (15,250 MAD)`)
console.log(`- All templates will be in a reasonable price range`)
console.log(`- Dynamic range will work properly`)
console.log(`- ThinkPad will be visible in Developer section`) 