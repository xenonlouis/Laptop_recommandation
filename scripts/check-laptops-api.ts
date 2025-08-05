import fetch from 'node-fetch';

async function checkLaptopsAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/laptops');
    const data = await response.json();
    
    console.log('Laptops API Response:');
    console.log(JSON.stringify(data, null, 2));
    
    // Check for profile variations
    const allProfiles = data.flatMap((laptop: any) => laptop.supportedProfiles || []);
    const uniqueProfiles = [...new Set(allProfiles)];
    
    console.log('\n--- Profile Analysis ---');
    console.log('All profiles found:', allProfiles);
    console.log('Unique profiles:', uniqueProfiles);
    
    // Check for case variations
    const normalizedProfiles = uniqueProfiles.map((p: string) => p.toLowerCase());
    const uniqueNormalized = [...new Set(normalizedProfiles)];
    
    console.log('Unique profiles (case-insensitive):', uniqueNormalized);
    
    if (uniqueProfiles.length !== uniqueNormalized.length) {
      console.log('\nCase variations found:');
      uniqueProfiles.forEach((profile: string) => {
        const variations = uniqueProfiles.filter((p: string) => p.toLowerCase() === profile.toLowerCase());
        if (variations.length > 1) {
          console.log(`"${profile}" has variations:`, variations);
        }
      });
    }
    
    // Check for "consultant" variations specifically
    const consultantVariations = uniqueProfiles.filter((p: string) => 
      p.toLowerCase().includes('consultant')
    );
    console.log('\nConsultant variations:', consultantVariations);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

checkLaptopsAPI(); 