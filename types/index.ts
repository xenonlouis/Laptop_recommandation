export type UserProfile = "consultant" | "webDeveloper" | "intensiveDeployment"

export type OperatingSystem = "windows" | "macos" | "linux"

export type SortingCriteria = "price" | "performance" | "batteryLife"

export interface Laptop {
  id: string
  brand: string
  model: string
  price: number
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

export interface RecommendationNode {
  id: string
  label: string
  children?: RecommendationNode[]
  laptops?: Laptop[]
}

