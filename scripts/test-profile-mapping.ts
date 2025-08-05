// Test the profile mapping logic
const testProfiles = ["Developer", "Consultant", "developer", "consultant"];

console.log('Testing profile mapping logic:');
console.log('Before fix: profile === "developer" ? "Developer" : "Consultant"');
console.log('After fix: profile.toLowerCase() === "developer" ? "Developer" : "Consultant"');
console.log('');

testProfiles.forEach(profile => {
  const oldMapping = profile === "developer" ? "Developer" : "Consultant";
  const newMapping = profile.toLowerCase() === "developer" ? "Developer" : "Consultant";
  
  console.log(`Profile: "${profile}"`);
  console.log(`  Old mapping: "${oldMapping}"`);
  console.log(`  New mapping: "${newMapping}"`);
  console.log('');
});

console.log('Expected behavior:');
console.log('- "Developer" should map to "Developer"');
console.log('- "Consultant" should map to "Consultant"');
console.log('- "developer" should map to "Developer"');
console.log('- "consultant" should map to "Consultant"'); 