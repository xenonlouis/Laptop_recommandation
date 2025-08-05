import fetch from 'node-fetch';

async function checkProfilesAPI() {
  try {
    const response = await fetch('http://localhost:3000/api/profiles');
    const data = await response.json();
    
    console.log('Profiles API Response:');
    console.log(JSON.stringify(data, null, 2));
    
    // Check for duplicates with different casing
    const profiles = data.profiles || [];
    const normalizedProfiles = profiles.map((p: string) => p.toLowerCase());
    const uniqueProfiles = [...new Set(normalizedProfiles)];
    
    console.log('\n--- Analysis ---');
    console.log('Total profiles:', profiles.length);
    console.log('Unique profiles (case-insensitive):', uniqueProfiles.length);
    
    if (profiles.length !== uniqueProfiles.length) {
      console.log('\nDuplicate profiles found:');
      const duplicates = profiles.filter((profile: string, index: number) => 
        profiles.indexOf(profile) !== index
      );
      console.log(duplicates);
    }
    
    // Check for "consultant" variations
    const consultantVariations = profiles.filter((p: string) => 
      p.toLowerCase().includes('consultant')
    );
    console.log('\nConsultant variations:', consultantVariations);
    
  } catch (error) {
    console.error('Error:', error);
  }
}

checkProfilesAPI(); 