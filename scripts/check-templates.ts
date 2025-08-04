import { PrismaClient } from '../lib/generated/prisma'

const prisma = new PrismaClient()

async function checkTemplates() {
  console.log('📦 Checking templates and assignments...')
  
  const templates = await prisma.packageTemplate.findMany({
    include: {
      _count: {
        select: {
          assignments: true
        }
      },
      laptop: true
    }
  })
  
  console.log(`\n📊 Found ${templates.length} templates:`)
  
  for (const template of templates) {
    console.log(`\n📦 ${template.name}`)
    console.log(`   Profile: ${template.profileType}`)
    console.log(`   Laptop: ${template.laptop.brand} ${template.laptop.model}`)
    console.log(`   Assignments: ${template._count.assignments}`)
  }
  
  // Check assignments by template
  const assignments = await prisma.personAssignment.findMany({
    include: {
      person: true,
      template: true
    }
  })
  
  console.log(`\n🔗 Total assignments: ${assignments.length}`)
  
  // Group by template
  const assignmentsByTemplate = assignments.reduce((acc, assignment) => {
    const templateName = assignment.template.name
    if (!acc[templateName]) {
      acc[templateName] = []
    }
    acc[templateName].push(assignment.person.name)
    return acc
  }, {} as Record<string, string[]>)
  
  console.log('\n📋 Assignments by template:')
  for (const [templateName, people] of Object.entries(assignmentsByTemplate)) {
    console.log(`\n${templateName} (${people.length} people):`)
    people.forEach(person => console.log(`  - ${person}`))
  }
}

checkTemplates().then(() => {
  process.exit(0)
}).catch(error => {
  console.error('Error:', error)
  process.exit(1)
}) 