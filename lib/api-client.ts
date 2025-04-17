import type { Laptop, Package, Accessory, Person, Toolkit } from "@/types"

// Base URL for API requests
const LAPTOPS_API_URL = "/api/laptops"
const PACKAGES_API_URL = "/api/packages"
const ACCESSORIES_API_URL = "/api/accessories"
const PEOPLE_API_URL = "/api/people"

// Fetch all laptops
export async function fetchLaptops(): Promise<Laptop[]> {
  try {
    const response = await fetch(LAPTOPS_API_URL)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch laptops:", error)
    throw error
  }
}

// Fetch all packages
export async function fetchPackages(): Promise<Package[]> {
  try {
    const response = await fetch(PACKAGES_API_URL)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch packages:", error)
    throw error
  }
}

// Fetch all accessories
export async function fetchAccessories(): Promise<Accessory[]> {
  try {
    const response = await fetch(ACCESSORIES_API_URL)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch accessories:", error)
    throw error
  }
}

// Fetch all people
export async function fetchPeople(): Promise<Person[]> {
  try {
    const response = await fetch(PEOPLE_API_URL)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to fetch people:", error)
    throw error
  }
}

// Fetch a single laptop by ID
export async function fetchLaptopById(id: string): Promise<Laptop> {
  try {
    const response = await fetch(`${LAPTOPS_API_URL}/${id}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch laptop with ID ${id}:`, error)
    throw error
  }
}

// Fetch a single package by ID
export async function fetchPackageById(id: string): Promise<Package> {
  try {
    const response = await fetch(`${PACKAGES_API_URL}/${id}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch package with ID ${id}:`, error)
    throw error
  }
}

// Fetch a single accessory by ID
export async function fetchAccessoryById(id: string): Promise<Accessory> {
  try {
    const response = await fetch(`${ACCESSORIES_API_URL}/${id}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch accessory with ID ${id}:`, error)
    throw error
  }
}

// Fetch a single person by ID
export async function fetchPersonById(id: string): Promise<Person> {
  try {
    const response = await fetch(`${PEOPLE_API_URL}/${id}`)

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch person with ID ${id}:`, error)
    throw error
  }
}

// Create a new laptop
export async function createLaptop(laptop: Omit<Laptop, "id">): Promise<{ message: string }> {
  try {
    const response = await fetch(LAPTOPS_API_URL, {
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

// Create a new package
export async function createPackage(pkg: Omit<Package, "id">): Promise<{ message: string }> {
  try {
    const response = await fetch(PACKAGES_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pkg),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to create package:", error)
    throw error
  }
}

// Create a new accessory
export async function createAccessory(accessory: Omit<Accessory, "id">): Promise<{ message: string, accessory: Accessory }> {
  try {
    const response = await fetch(ACCESSORIES_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accessory),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to create accessory:", error)
    throw error
  }
}

// Create a new person
export async function createPerson(person: Omit<Person, "id" | "createdAt" | "updatedAt">): Promise<Person> {
  try {
    const response = await fetch(PEOPLE_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Failed to create person:", error)
    throw error
  }
}

// Update an existing laptop
export async function updateLaptop(laptop: Laptop): Promise<{ message: string }> {
  try {
    const response = await fetch(`${LAPTOPS_API_URL}/${laptop.id}`, {
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

// Update an existing package
export async function updatePackage(pkg: Package): Promise<{ message: string }> {
  try {
    const response = await fetch(`${PACKAGES_API_URL}/${pkg.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pkg),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to update package with ID ${pkg.id}:`, error)
    throw error
  }
}

// Update an existing accessory
export async function updateAccessory(accessory: Accessory): Promise<{ message: string }> {
  try {
    const response = await fetch(`${ACCESSORIES_API_URL}/${accessory.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accessory),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to update accessory with ID ${accessory.id}:`, error)
    throw error
  }
}

// Update an existing person
export async function updatePerson(person: Person): Promise<Person> {
  try {
    const response = await fetch(PEOPLE_API_URL, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to update person with ID ${person.id}:`, error)
    throw error
  }
}

// Delete a laptop
export async function deleteLaptop(id: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`${LAPTOPS_API_URL}/${id}`, {
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

// Delete a package
export async function deletePackage(id: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`${PACKAGES_API_URL}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to delete package with ID ${id}:`, error)
    throw error
  }
}

// Delete an accessory
export async function deleteAccessory(id: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`${ACCESSORIES_API_URL}/${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to delete accessory with ID ${id}:`, error)
    throw error
  }
}

// Delete a person
export async function deletePerson(id: string): Promise<{ success: boolean; message: string }> {
  try {
    const response = await fetch(`${PEOPLE_API_URL}?id=${id}`, {
      method: "DELETE",
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Error: ${response.status}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to delete person with ID ${id}:`, error)
    throw error
  }
}

export async function assignPackage(packageId: string, assignedTo: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`/api/packages/${packageId}/assign`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ assignedTo }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to assign package: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error assigning package:", error);
    throw error;
  }
}

// Toolkit API functions

export async function fetchToolkits(): Promise<Toolkit[]> {
  try {
    const response = await fetch('/api/toolkits')
    
    if (!response.ok) {
      throw new Error(`Failed to fetch toolkits: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching toolkits:', error)
    throw error
  }
}

export async function fetchToolkitById(id: string): Promise<Toolkit> {
  try {
    const response = await fetch(`/api/toolkits/${id}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch toolkit: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching toolkit:', error)
    throw error
  }
}

export async function fetchToolkitsByProfile(profileName: string): Promise<Toolkit[]> {
  try {
    const response = await fetch(`/api/toolkits/profile/${encodeURIComponent(profileName)}`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch toolkits by profile: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error fetching toolkits by profile:', error)
    throw error
  }
}

export async function createToolkit(toolkit: Omit<Toolkit, "id">): Promise<{ message: string; toolkit: Toolkit }> {
  try {
    const response = await fetch('/api/toolkits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toolkit),
    })
    
    if (!response.ok) {
      throw new Error(`Failed to create toolkit: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error creating toolkit:', error)
    throw error
  }
}

// Alias for createToolkit to maintain backward compatibility
export const addToolkit = createToolkit;

export async function updateToolkit(toolkit: Toolkit): Promise<{ message: string }> {
  try {
    const response = await fetch(`/api/toolkits/${toolkit.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(toolkit),
    })
    
    if (!response.ok) {
      throw new Error(`Failed to update toolkit: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error updating toolkit:', error)
    throw error
  }
}

export async function deleteToolkit(id: string): Promise<{ message: string }> {
  try {
    const response = await fetch(`/api/toolkits/${id}`, {
      method: 'DELETE',
    })
    
    if (!response.ok) {
      throw new Error(`Failed to delete toolkit: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error deleting toolkit:', error)
    throw error
  }
}

