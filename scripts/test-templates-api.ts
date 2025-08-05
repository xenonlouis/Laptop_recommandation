async function testTemplatesAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/templates')
    const templates = await response.json()
    
    console.log('📦 Templates API Response:')
    console.log(`Found ${templates.length} templates:`)
    
    templates.forEach((template: any, index: number) => {
      console.log(`\n${index + 1}. ${template.name}`)
      console.log(`   Profile: ${template.profileType}`)
      console.log(`   Laptop: ${template.laptop.brand} ${template.laptop.model}`)
      console.log(`   Assignments: ${template.assignmentCount}`)
      console.log(`   Price: ${template.totalPrice} MAD`)
    })
    
    // Group by profile
    const byProfile = templates.reduce((acc: any, template: any) => {
      const profile = template.profileType
      if (!acc[profile]) acc[profile] = []
      acc[profile].push(template)
      return acc
    }, {})
    
    console.log('\n📊 Grouped by Profile:')
    Object.entries(byProfile).forEach(([profile, templates]: [string, any]) => {
      console.log(`\n${profile} (${templates.length} templates):`)
      templates.forEach((template: any) => {
        console.log(`  - ${template.name} (${template.assignmentCount} assignments)`)
      })
    })
    
  } catch (error) {
    console.error('Error testing API:', error)
  }
}

testTemplatesAPI() 