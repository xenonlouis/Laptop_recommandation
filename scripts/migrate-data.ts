import * as fs from 'fs';
import * as path from 'path';
import { PrismaClient } from '../lib/generated/prisma';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Initialize Prisma client
const prisma = new PrismaClient();

// Define interfaces for JSON data
interface Laptop {
  id: string;
  brand: string;
  model: string;
  price: number;
  priceType: string;
  processor: string;
  ram: string;
  storage: string;
  batteryLife: number;
  performanceScore: number;
  notes?: string;
  supportedProfiles?: string[];
  supportedOS?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface Accessory {
  id: string;
  name: string;
  type: string;
  brand: string;
  price: number;
  priceType: string;
  image?: string;
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Person {
  id: string;
  name: string;
  email?: string;
  department?: string;
  position?: string;
  pcReference?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Tool {
  id: string;
  name: string;
  description?: string;
  category: string;
  downloadUrl?: string;
  installationNotes?: string;
  isRequired?: boolean;
  icon?: string;
  popularity?: number;
  usageCount?: number;
  alternatives?: string[];
  createdAt?: string;
  updatedAt?: string;
}

interface Toolkit {
  id: string;
  profileName: string;
  description?: string;
  operatingSystem: string;
  toolIds?: string[];
  icon?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Package {
  id: string;
  name: string;
  laptop: {
    id: string;
    brand: string;
    model: string;
    [key: string]: any;
  };
  accessories: Accessory[];
  status: string;
  priceType: string;
  assignedTo?: string;
  personIds?: string[];
  notes?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface SurveyResponse {
  id: string;
  name: string;
  email: string;
  position: string;
  primaryRole?: string;
  developmentPercentage?: number;
  primaryOS?: string;
  experienceWithOtherOS?: string[];
  preferredOS?: string;
  osPreferenceReason?: string;
  programmingLanguages?: string[];
  otherLanguages?: string;
  developmentType?: string[];
  otherDevelopmentType?: string;
  resourceIntensiveEnvironments?: boolean;
  multipleEnvironments?: boolean;
  terminalImportance?: number;
  clientPresentationFrequency?: string;
  largeDataModels?: boolean;
  specializedSoftware?: boolean;
  specializedSoftwareList?: string;
  batteryLifeImportance?: number;
  remoteWorkFrequency?: string;
  selectedTools?: string[];
  otherTools?: string;
  simultaneousApplications?: string;
  multipleWorkspaces?: boolean;
  typicalBrowserTabs?: string;
  externalDisplays?: string;
  resourceIntensiveApps?: boolean;
  resourceIntensiveAppsList?: string;
  matchedToolkitId?: string;
  matchScore?: number;
  submittedAt?: string;
}

// Define paths to JSON data files
const LAPTOPS_DATA_PATH = path.join(process.cwd(), 'data', 'laptops.json');
const ACCESSORIES_DATA_PATH = path.join(process.cwd(), 'data', 'accessories.json');
const PACKAGES_DATA_PATH = path.join(process.cwd(), 'data', 'packages.json');
const PEOPLE_DATA_PATH = path.join(process.cwd(), 'data', 'people.json');
const TOOLS_DATA_PATH = path.join(process.cwd(), 'data', 'tools.json');
const TOOLKITS_DATA_PATH = path.join(process.cwd(), 'data', 'toolkits.json');
const SURVEY_RESPONSES_PATH = path.join(process.cwd(), 'data', 'survey-responses.json');

// Helper function to read JSON files
function readJsonFile<T>(filePath: string): T[] {
  try {
    if (!fs.existsSync(filePath)) {
      console.warn(`File not found: ${filePath}`);
      return [];
    }
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data) as T[];
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

// Main migration function
async function migrateData() {
  console.log('Starting data migration from JSON to PostgreSQL...');
  
  try {
    // 1. Migrate laptops
    await migrateLaptops();
    
    // 2. Migrate accessories
    await migrateAccessories();
    
    // 3. Migrate people
    await migratePeople();
    
    // 4. Migrate tools
    await migrateTools();
    
    // 5. Migrate toolkits
    await migrateToolkits();
    
    // 6. Migrate packages
    await migratePackages();
    
    // 7. Migrate survey responses if they exist
    if (fs.existsSync(SURVEY_RESPONSES_PATH)) {
      await migrateSurveyResponses();
    } else {
      console.log('Survey responses file not found, skipping this migration step.');
    }
    
    console.log('Data migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Helper function to ensure a laptop exists
async function ensureLaptopExists(laptopId: string): Promise<string> {
  // Check if laptop exists
  const existingLaptop = await prisma.laptop.findUnique({
    where: { id: laptopId }
  });
  
  if (existingLaptop) {
    return existingLaptop.id;
  }
  
  // If laptop doesn't exist, create a placeholder
  console.log(`Creating placeholder for missing laptop with ID: ${laptopId}`);
  const createdLaptop = await prisma.laptop.create({
    data: {
      id: laptopId,
      brand: "Unknown",
      model: "Placeholder",
      price: 0,
      priceType: "Unknown",
      processor: "Unknown",
      ram: "Unknown",
      storage: "Unknown",
      batteryLife: 0,
      performanceScore: 0,
      notes: "Placeholder laptop created during migration",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  });
  
  return createdLaptop.id;
}

// Helper function to ensure a tool exists
async function ensureToolExists(toolId: string): Promise<string> {
  // Check if tool exists
  const existingTool = await prisma.tool.findUnique({
    where: { id: toolId }
  });
  
  if (existingTool) {
    return existingTool.id;
  }
  
  // If tool doesn't exist, create a placeholder
  console.log(`Creating placeholder for missing tool with ID: ${toolId}`);
  const createdTool = await prisma.tool.create({
    data: {
      id: toolId,
      name: "Unknown Tool",
      category: "Unknown",
      isRequired: false,
      usageCount: 0,
      description: "Placeholder tool created during migration",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  });
  
  return createdTool.id;
}

// Helper function to ensure an accessory exists
async function ensureAccessoryExists(accessoryId: string): Promise<string> {
  // Check if accessory exists
  const existingAccessory = await prisma.accessory.findUnique({
    where: { id: accessoryId }
  });
  
  if (existingAccessory) {
    return existingAccessory.id;
  }
  
  // If accessory doesn't exist, create a placeholder
  console.log(`Creating placeholder for missing accessory with ID: ${accessoryId}`);
  const createdAccessory = await prisma.accessory.create({
    data: {
      id: accessoryId,
      name: "Unknown Accessory",
      type: "Unknown",
      brand: "Unknown",
      price: 0,
      priceType: "Unknown",
      createdAt: new Date(),
      updatedAt: new Date(),
    }
  });
  
  return createdAccessory.id;
}

// Migrate laptops data
async function migrateLaptops() {
  console.log('Migrating laptops data...');
  const laptops = readJsonFile<Laptop>(LAPTOPS_DATA_PATH);
  
  for (const laptop of laptops) {
    try {
      // Create the laptop record
      const createdLaptop = await prisma.laptop.create({
        data: {
          id: laptop.id,
          brand: laptop.brand,
          model: laptop.model,
          price: laptop.price,
          priceType: laptop.priceType,
          processor: laptop.processor,
          ram: laptop.ram,
          storage: laptop.storage,
          batteryLife: laptop.batteryLife,
          performanceScore: laptop.performanceScore,
          notes: laptop.notes || null,
          createdAt: laptop.createdAt ? new Date(laptop.createdAt) : new Date(),
          updatedAt: laptop.updatedAt ? new Date(laptop.updatedAt) : new Date(),
        },
      });
      
      // Create supported profiles
      if (laptop.supportedProfiles && Array.isArray(laptop.supportedProfiles)) {
        for (const profile of laptop.supportedProfiles) {
          await prisma.laptopProfile.create({
            data: {
              laptopId: createdLaptop.id,
              profile: profile,
            },
          });
        }
      }
      
      // Create supported OS
      if (laptop.supportedOS && Array.isArray(laptop.supportedOS)) {
        for (const os of laptop.supportedOS) {
          await prisma.laptopOS.create({
            data: {
              laptopId: createdLaptop.id,
              os: os,
            },
          });
        }
      }
      
      console.log(`✓ Migrated laptop: ${laptop.brand} ${laptop.model}`);
    } catch (error) {
      console.error(`Error migrating laptop ${laptop.id}:`, error);
    }
  }
}

// Migrate accessories data
async function migrateAccessories() {
  console.log('Migrating accessories data...');
  const accessories = readJsonFile<Accessory>(ACCESSORIES_DATA_PATH);
  
  for (const accessory of accessories) {
    try {
      await prisma.accessory.create({
        data: {
          id: accessory.id,
          name: accessory.name,
          type: accessory.type,
          brand: accessory.brand,
          price: accessory.price,
          priceType: accessory.priceType,
          image: accessory.image || null,
          notes: accessory.notes || null,
          createdAt: accessory.createdAt ? new Date(accessory.createdAt) : new Date(),
          updatedAt: accessory.updatedAt ? new Date(accessory.updatedAt) : new Date(),
        },
      });
      
      console.log(`✓ Migrated accessory: ${accessory.name}`);
    } catch (error) {
      console.error(`Error migrating accessory ${accessory.id}:`, error);
    }
  }
}

// Migrate people data
async function migratePeople() {
  console.log('Migrating people data...');
  const people = readJsonFile<Person>(PEOPLE_DATA_PATH);
  
  for (const person of people) {
    try {
      await prisma.person.create({
        data: {
          id: person.id,
          name: person.name,
          email: person.email || null,
          department: person.department || null,
          position: person.position || null,
          pcReference: person.pcReference || null,
          createdAt: person.createdAt ? new Date(person.createdAt) : new Date(),
          updatedAt: person.updatedAt ? new Date(person.updatedAt) : new Date(),
        },
      });
      
      console.log(`✓ Migrated person: ${person.name}`);
    } catch (error) {
      console.error(`Error migrating person ${person.id}:`, error);
    }
  }
}

// Migrate tools data
async function migrateTools() {
  console.log('Migrating tools data...');
  const tools = readJsonFile<Tool>(TOOLS_DATA_PATH);
  
  for (const tool of tools) {
    try {
      // Check if tool already exists
      const existingTool = await prisma.tool.findUnique({
        where: { id: tool.id }
      });
      
      if (existingTool) {
        console.log(`Tool ${tool.name} already exists, skipping...`);
        continue;
      }
      
      // Create tool
      const createdTool = await prisma.tool.create({
        data: {
          id: tool.id,
          name: tool.name,
          description: tool.description || null,
          category: tool.category,
          downloadUrl: tool.downloadUrl || null,
          installationNotes: tool.installationNotes || null,
          isRequired: tool.isRequired || false,
          icon: tool.icon || null,
          popularity: tool.popularity || null,
          usageCount: tool.usageCount || 0,
          createdAt: tool.createdAt ? new Date(tool.createdAt) : new Date(),
          updatedAt: tool.updatedAt ? new Date(tool.updatedAt) : new Date(),
        },
      });
      
      // Create tool alternatives
      if (tool.alternatives && Array.isArray(tool.alternatives)) {
        for (const alternative of tool.alternatives) {
          await prisma.toolAlternative.create({
            data: {
              toolId: createdTool.id,
              alternative: alternative,
            },
          });
        }
      }
      
      console.log(`✓ Migrated tool: ${tool.name}`);
    } catch (error) {
      console.error(`Error migrating tool ${tool.id}:`, error);
    }
  }
}

// Migrate toolkits data
async function migrateToolkits() {
  console.log('Migrating toolkits data...');
  const toolkits = readJsonFile<Toolkit>(TOOLKITS_DATA_PATH);
  
  for (const toolkit of toolkits) {
    try {
      // Create toolkit
      const createdToolkit = await prisma.toolkit.create({
        data: {
          id: toolkit.id,
          profileName: toolkit.profileName,
          description: toolkit.description || null,
          operatingSystem: toolkit.operatingSystem,
          icon: toolkit.icon || null,
          createdAt: toolkit.createdAt ? new Date(toolkit.createdAt) : new Date(),
          updatedAt: toolkit.updatedAt ? new Date(toolkit.updatedAt) : new Date(),
        },
      });
      
      // Associate tools with toolkit
      if (toolkit.toolIds && Array.isArray(toolkit.toolIds)) {
        for (const toolId of toolkit.toolIds) {
          try {
            // Ensure the tool exists before creating the association
            const validToolId = await ensureToolExists(toolId);
            
            await prisma.toolkitTool.create({
              data: {
                toolkitId: createdToolkit.id,
                toolId: validToolId,
              },
            });
          } catch (error) {
            console.error(`Error associating tool ${toolId} with toolkit ${toolkit.id}:`, error);
          }
        }
      }
      
      console.log(`✓ Migrated toolkit: ${toolkit.profileName}`);
    } catch (error) {
      console.error(`Error migrating toolkit ${toolkit.id}:`, error);
    }
  }
}

// Migrate packages data
async function migratePackages() {
  console.log('Migrating packages data...');
  const packages = readJsonFile<Package>(PACKAGES_DATA_PATH);
  
  for (const pkg of packages) {
    try {
      // Ensure laptop exists
      const laptopId = await ensureLaptopExists(pkg.laptop.id);
      
      // Create package
      const createdPackage = await prisma.package.create({
        data: {
          id: pkg.id,
          name: pkg.name,
          laptopId: laptopId,
          status: pkg.status,
          priceType: pkg.priceType,
          notes: pkg.notes || null,
          assignedTo: pkg.assignedTo || null, // Legacy field, will be deprecated
          createdAt: pkg.createdAt ? new Date(pkg.createdAt) : new Date(),
          updatedAt: pkg.updatedAt ? new Date(pkg.updatedAt) : new Date(),
        },
      });
      
      // Associate accessories with package
      if (pkg.accessories && Array.isArray(pkg.accessories)) {
        for (const accessory of pkg.accessories) {
          try {
            // Ensure the accessory exists before creating the association
            const accessoryId = await ensureAccessoryExists(accessory.id);
            
            await prisma.packageAccessory.create({
              data: {
                packageId: createdPackage.id,
                accessoryId: accessoryId,
              },
            });
          } catch (error) {
            console.error(`Error associating accessory ${accessory.id} with package ${pkg.id}:`, error);
          }
        }
      }
      
      // Create package assignments based on assignedTo and personIds
      if (pkg.assignedTo || (pkg.personIds && pkg.personIds.length > 0)) {
        if (pkg.personIds && Array.isArray(pkg.personIds)) {
          // Use personIds (new method)
          for (const personId of pkg.personIds) {
            try {
              // Check if person exists
              const person = await prisma.person.findUnique({
                where: { id: personId },
              });
              
              if (person) {
                await prisma.packageAssignment.create({
                  data: {
                    packageId: createdPackage.id,
                    personId: personId,
                    pcReference: person.pcReference,
                    assignedAt: new Date(),
                  },
                });
              } else {
                console.warn(`Person with ID ${personId} not found, skipping assignment`);
              }
            } catch (error) {
              console.error(`Error creating package assignment for person ${personId}:`, error);
            }
          }
        } else if (pkg.assignedTo) {
          // Use assignedTo (legacy method)
          const personName = pkg.assignedTo;
          
          try {
            // Try to find the person by name
            const person = await prisma.person.findFirst({
              where: { name: personName },
            });
            
            if (person) {
              await prisma.packageAssignment.create({
                data: {
                  packageId: createdPackage.id,
                  personId: person.id,
                  pcReference: person.pcReference,
                  assignedAt: new Date(),
                },
              });
            } else {
              console.warn(`Person with name "${personName}" not found, skipping assignment`);
            }
          } catch (error) {
            console.error(`Error creating package assignment for person ${personName}:`, error);
          }
        }
      }
      
      console.log(`✓ Migrated package: ${pkg.name}`);
    } catch (error) {
      console.error(`Error migrating package ${pkg.id}:`, error);
    }
  }
}

// Migrate survey responses
async function migrateSurveyResponses() {
  console.log('Migrating survey responses...');
  const responses = readJsonFile<SurveyResponse>(SURVEY_RESPONSES_PATH);
  
  for (const response of responses) {
    try {
      await prisma.surveyResponse.create({
        data: {
          id: response.id,
          name: response.name,
          email: response.email,
          position: response.position,
          primaryRole: response.primaryRole || null,
          developmentPercentage: response.developmentPercentage || null,
          primaryOS: response.primaryOS || null,
          experienceWithOtherOS: response.experienceWithOtherOS || [],
          preferredOS: response.preferredOS || null,
          osPreferenceReason: response.osPreferenceReason || null,
          programmingLanguages: response.programmingLanguages || [],
          otherLanguages: response.otherLanguages || null,
          developmentType: response.developmentType || [],
          otherDevelopmentType: response.otherDevelopmentType || null,
          resourceIntensiveEnvironments: response.resourceIntensiveEnvironments || null,
          multipleEnvironments: response.multipleEnvironments || null,
          terminalImportance: response.terminalImportance || null,
          clientPresentationFrequency: response.clientPresentationFrequency || null,
          largeDataModels: response.largeDataModels || null,
          specializedSoftware: response.specializedSoftware || null,
          specializedSoftwareList: response.specializedSoftwareList || null,
          batteryLifeImportance: response.batteryLifeImportance || null,
          remoteWorkFrequency: response.remoteWorkFrequency || null,
          selectedTools: response.selectedTools || [],
          otherTools: response.otherTools || null,
          simultaneousApplications: response.simultaneousApplications || null,
          multipleWorkspaces: response.multipleWorkspaces || null,
          typicalBrowserTabs: response.typicalBrowserTabs || null,
          externalDisplays: response.externalDisplays || null,
          resourceIntensiveApps: response.resourceIntensiveApps || null,
          resourceIntensiveAppsList: response.resourceIntensiveAppsList || null,
          matchedToolkitId: response.matchedToolkitId || null,
          matchScore: response.matchScore || null,
          submittedAt: response.submittedAt ? new Date(response.submittedAt) : new Date(),
        },
      });
      
      console.log(`✓ Migrated survey response: ${response.id}`);
    } catch (error) {
      console.error(`Error migrating survey response ${response.id}:`, error);
    }
  }
}

// Run the migration
migrateData()
  .catch((error) => {
    console.error('Unhandled error during migration:', error);
    process.exit(1);
  }); 