"use client"

import type React from "react"

import { useState, createContext, useContext } from "react"
import type { Laptop } from "@/types"

interface CompareContextType {
  laptopsToCompare: Laptop[]
  addToCompare: (laptop: Laptop) => void
  removeFromCompare: (id: string) => void
  clearCompare: () => void
  isInCompare: (id: string) => boolean
}

const CompareContext = createContext<CompareContextType | undefined>(undefined)

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [laptopsToCompare, setLaptopsToCompare] = useState<Laptop[]>([])

  const addToCompare = (laptop: Laptop) => {
    setLaptopsToCompare((prev) => {
      // Limit to 3 laptops for comparison
      if (prev.length >= 3) {
        return prev
      }
      // Don't add if already in the list
      if (prev.some((item) => item.id === laptop.id)) {
        return prev
      }
      return [...prev, laptop]
    })
  }

  const removeFromCompare = (id: string) => {
    setLaptopsToCompare((prev) => prev.filter((laptop) => laptop.id !== id))
  }

  const clearCompare = () => {
    setLaptopsToCompare([])
  }

  const isInCompare = (id: string) => {
    return laptopsToCompare.some((laptop) => laptop.id === id)
  }

  return (
    <CompareContext.Provider
      value={{
        laptopsToCompare,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isInCompare,
      }}
    >
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  const context = useContext(CompareContext)
  if (context === undefined) {
    throw new Error("useCompare must be used within a CompareProvider")
  }
  return context
}

