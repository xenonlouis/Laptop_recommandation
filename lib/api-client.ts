import type { Laptop } from "@/types"

// Base URL for API requests
const API_BASE_URL = "/api/laptops"

// Fetch all laptops
export async function fetchLaptops(): Promise<Laptop[]> {
  try {
    const response = await fetch(API_BASE_URL)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch laptops:", error)
    throw error
  }
}

// Fetch a single laptop by ID
export async function fetchLaptopById(id: string): Promise<Laptop> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch laptop with ID ${id}:`, error)
    throw error
  }
}

// Create a new laptop
export async function createLaptop(laptop: Omit<Laptop, "id">): Promise<{ message: string }> {
  try {
    const response = await fetch(API_BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(laptop),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to create laptop:", error)
    throw error
  }
}

// Update an existing laptop
export async function updateLaptop(laptop: Laptop): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/${laptop.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(laptop),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to update laptop with ID ${laptop.id}:`, error)
    throw error
  }
}

// Delete a laptop
export async function deleteLaptop(id: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to delete laptop with ID ${id}:`, error)
    throw error
  }
}

