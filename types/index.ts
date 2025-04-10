export type UserProfile = "consultant" | "developer"

export type OperatingSystem = "windows" | "macos" | "linux"

export type SortingCriteria = "price" | "performance" | "batteryLife"

export type SortingDirection = "asc" | "desc"

export type PriceType = "HT" | "TTC"

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

export interface RecommendationNode {
  id: string
  label: string
  children?: RecommendationNode[]
  laptops?: Laptop[]
}

