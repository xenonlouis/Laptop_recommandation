import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function checkLaptopProfiles() {
  try {
    // Get all laptops with their supported profiles
    const laptops = await prisma.laptop.findMany({
      select: {
        id: true,
        brand: true,
        model: true,
        supportedProfiles: true,
      }
    });

    console.log('Laptops with their supported profiles:');
    laptops.forEach(laptop => {
      console.log(`${laptop.brand} ${laptop.model}:`, laptop.supportedProfiles);
    });

    // Get all unique profiles across all laptops
    const allProfiles = laptops.flatMap(laptop => laptop.supportedProfiles);
    const uniqueProfiles = [...new Set(allProfiles)];
    
    console.log('\n--- Profile Analysis ---');
    console.log('All profiles found:', allProfiles);
    console.log('Unique profiles:', uniqueProfiles);
    
    // Check for case variations
    const normalizedProfiles = uniqueProfiles.map(p => p.toLowerCase());
    const uniqueNormalized = [...new Set(normalizedProfiles)];
    
    console.log('Unique profiles (case-insensitive):', uniqueNormalized);
    
    if (uniqueProfiles.length !== uniqueNormalized.length) {
      console.log('\nCase variations found:');
      uniqueProfiles.forEach(profile => {
        const variations = uniqueProfiles.filter(p => p.toLowerCase() === profile.toLowerCase());
        if (variations.length > 1) {
          console.log(`"${profile}" has variations:`, variations);
        }
      });
    }

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

checkLaptopProfiles(); 