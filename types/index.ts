export type UserProfile = "consultant" | "developer"

export type OperatingSystem = "windows" | "macos" | "linux"

export type SortingCriteria = "price" | "performance" | "batteryLife"

export type SortingDirection = "asc" | "desc"

export type PriceType = "HT" | "TTC"

export type PackageStatus = "proposed" | "approved" | "rejected" | "delivered"

export type ToolkitCategory = 
  | "development" 
  | "connectivity" 
  | "communication" 
  | "specialized" 
  | "database" 
  | "testing" 
  | "project_management"
  | "design"
  | "productivity";

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolkitCategory;
  downloadUrl?: string;
  installationNotes?: string;
  isRequired: boolean;
  alternatives?: string[];
  icon?: string; // URL to the tool's logo/icon
  popularity?: number; // 0-10 scale based on usage
  usageCount?: number; // How many times the tool has been used
  createdAt?: string; // ISO date string
  updatedAt?: string; // ISO date string
}

export interface ToolkitItem {
  id: string;
  name: string;
  description: string;
  category: ToolkitCategory;
  downloadUrl?: string;
  installationNotes?: string;
  isRequired: boolean;
  alternatives?: string[];
  icon?: string; // URL to the tool's logo/icon
}

export interface Toolkit {
  id: string;
  profileName: string;
  description: string;
  operatingSystem: OperatingSystem;
  tools?: ToolkitItem[];
  toolIds: string[];
  icon?: string; // URL to the toolkit's logo/icon
}

export interface Person {
  id: string
  name: string
  email: string
  department: string
  position: string
  pcReference?: string  // Reference/serial number of the person's PC
  createdAt: string
  updatedAt: string
}

export interface Accessory {
  id: string
  name: string
  type: "mouse" | "keyboard" | "headphone" | "dock" | "other"
  brand: string
  price: number
  priceType: PriceType
  image?: string
  notes?: string
}

export interface Laptop {
  id: string
  brand: string
  model: string
  price: number
  priceType: PriceType
  processor: string
  ram: string
  storage: string
  batteryLife: number // in hours
  performanceScore: number // 0-10
  notes: string
  images?: string[]
  supportedProfiles: UserProfile[]
  supportedOS: OperatingSystem[]
}

export interface Package {
  id: string
  name: string
  laptop: Laptop
  accessories: Accessory[]
  status: PackageStatus
  priceType: PriceType
  assignedTo?: string
  createdAt: string
  updatedAt: string
  notes?: string
}

export interface RecommendationNode {
  id: string
  label: string
  children?: RecommendationNode[]
  laptops?: Laptop[]
}

