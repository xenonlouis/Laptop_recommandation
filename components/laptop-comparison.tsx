"use client"

import { useCompare } from "@/hooks/use-compare"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState } from "react"

export function LaptopComparison() {
  const { laptopsToCompare, removeFromCompare, clearCompare } = useCompare()
  const [activeImageIndex, setActiveImageIndex] = useState<Record<string, number>>({})

  if (laptopsToCompare.length === 0) {
    return null
  }

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} Dh`
  }

  const getOSLabel = (os: string) => {
    return os === "macos" ? "macOS" : os.charAt(0).toUpperCase() + os.slice(1)
  }

  // Calculate the highest values for normalization
  const maxValues = laptopsToCompare.reduce(
    (acc, laptop) => {
      return {
        price: Math.max(acc.price, laptop.price),
        performance: Math.max(acc.performance, laptop.performanceScore),
        battery: Math.max(acc.battery, laptop.batteryLife),
      }
    },
    { price: 0, performance: 0, battery: 0 },
  )

  // Calculate normalized values (0-100)
  const getNormalizedValue = (value: number, max: number) => {
    return Math.round((value / max) * 100)
  }

  // Get inverse normalized value for price (lower is better)
  const getInverseNormalizedValue = (value: number, max: number) => {
    return Math.round(100 - (value / max) * 100) + 20 // Add 20 to ensure even low values have some visibility
  }

  const handlePrevImage = (laptopId: string, imagesLength: number) => {
    setActiveImageIndex((prev) => {
      const currentIndex = prev[laptopId] || 0
      return {
        ...prev,
        [laptopId]: currentIndex === 0 ? imagesLength - 1 : currentIndex - 1,
      }
    })
  }

  const handleNextImage = (laptopId: string, imagesLength: number) => {
    setActiveImageIndex((prev) => {
      const currentIndex = prev[laptopId] || 0
      return {
        ...prev,
        [laptopId]: currentIndex === imagesLength - 1 ? 0 : currentIndex + 1,
      }
    })
  }

  return (
    <Card className="mt-8 mb-4">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Laptop Comparison</CardTitle>
          <Button variant="ghost" size="sm" onClick={clearCompare}>
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {laptopsToCompare.map((laptop) => {
            const currentImageIndex = activeImageIndex[laptop.id] || 0
            const images = laptop.images || ["/placeholder.svg?height=300&width=400"]
            const hasMultipleImages = images.length > 1

            return (
              <div key={laptop.id} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -right-2 -top-2 z-10 bg-background rounded-full border shadow-sm"
                  onClick={() => removeFromCompare(laptop.id)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove from comparison</span>
                </Button>

                <div className="border rounded-lg overflow-hidden">
                  {/* Image Carousel */}
                  <div className="relative h-48 bg-muted">
                    <div className="relative h-full w-full">
                      <Image
                        src={images[currentImageIndex] || "/placeholder.svg"}
                        alt={`${laptop.brand} ${laptop.model}`}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {hasMultipleImages && (
                      <>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full h-8 w-8"
                          onClick={() => handlePrevImage(laptop.id, images.length)}
                        >
                          <ChevronLeft className="h-4 w-4" />
                          <span className="sr-only">Previous image</span>
                        </Button>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full h-8 w-8"
                          onClick={() => handleNextImage(laptop.id, images.length)}
                        >
                          <ChevronRight className="h-4 w-4" />
                          <span className="sr-only">Next image</span>
                        </Button>

                        <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-1">
                          {images.map((_, index) => (
                            <div
                              key={index}
                              className={`w-1.5 h-1.5 rounded-full ${
                                index === currentImageIndex ? "bg-primary" : "bg-background/60"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2">
                      {laptop.brand} {laptop.model}
                    </h3>

                    {/* FIFA-style Metrics */}
                    <div className="flex justify-between mb-6">
                      {/* Performance Metric */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-16 h-16 mb-1">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="hsl(var(--primary))"
                              strokeWidth="10"
                              strokeDasharray={`${getNormalizedValue(laptop.performanceScore, 10) * 2.83} 283`}
                              strokeDashoffset="0"
                              transform="rotate(-90 50 50)"
                            />
                            <text
                              x="50"
                              y="55"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="text-lg font-bold fill-foreground"
                            >
                              {laptop.performanceScore.toFixed(1)}
                            </text>
                          </svg>
                        </div>
                        <span className="text-xs text-muted-foreground">Performance</span>
                      </div>

                      {/* Price Metric (inverse - lower is better) */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-16 h-16 mb-1">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="hsl(var(--primary))"
                              strokeWidth="10"
                              strokeDasharray={`${getInverseNormalizedValue(laptop.price, maxValues.price) * 2.83} 283`}
                              strokeDashoffset="0"
                              transform="rotate(-90 50 50)"
                            />
                            <text
                              x="50"
                              y="55"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="text-sm font-bold fill-foreground"
                            >
                              ${Math.round(laptop.price / 100)}
                            </text>
                          </svg>
                        </div>
                        <span className="text-xs text-muted-foreground">Price</span>
                      </div>

                      {/* Battery Metric */}
                      <div className="flex flex-col items-center">
                        <div className="relative w-16 h-16 mb-1">
                          <svg viewBox="0 0 100 100" className="w-full h-full">
                            <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--muted))" strokeWidth="10" />
                            <circle
                              cx="50"
                              cy="50"
                              r="45"
                              fill="none"
                              stroke="hsl(var(--primary))"
                              strokeWidth="10"
                              strokeDasharray={`${getNormalizedValue(laptop.batteryLife, maxValues.battery) * 2.83} 283`}
                              strokeDashoffset="0"
                              transform="rotate(-90 50 50)"
                            />
                            <text
                              x="50"
                              y="55"
                              textAnchor="middle"
                              dominantBaseline="middle"
                              className="text-lg font-bold fill-foreground"
                            >
                              {laptop.batteryLife}h
                            </text>
                          </svg>
                        </div>
                        <span className="text-xs text-muted-foreground">Battery</span>
                      </div>
                    </div>

                    {/* Specs */}
                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-muted-foreground">Processor:</span>
                        <span className="font-medium truncate">{laptop.processor}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-muted-foreground">RAM:</span>
                        <span className="font-medium">{laptop.ram}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-muted-foreground">Storage:</span>
                        <span className="font-medium">{laptop.storage}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-1">
                        <span className="text-muted-foreground">OS:</span>
                        <div className="flex flex-wrap gap-1">
                          {laptop.supportedOS.map((os) => (
                            <Badge key={os} variant="secondary" className="text-xs">
                              {getOSLabel(os)}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}

