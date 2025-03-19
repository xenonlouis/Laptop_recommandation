"use client"

import Image from "next/image"
import { useState } from "react"
import type { Laptop } from "@/types"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Cpu, Battery, Info, ChevronLeft, ChevronRight } from "lucide-react"
import { useCompare } from "@/hooks/use-compare"
import { ImageCarousel } from "@/components/image-carousel"

interface LaptopCardProps {
  laptop: Laptop
}

export function LaptopCard({ laptop }: LaptopCardProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { addToCompare, removeFromCompare, isInCompare } = useCompare()
  const isSelected = isInCompare(laptop.id)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const formatPrice = (price: number) => {
    return `${price.toLocaleString()} Dh`
  }

  const getOSBadges = (os: string[]) => {
    return os.map((system) => {
      const label = system === "macos" ? "macOS" : system.charAt(0).toUpperCase() + system.slice(1)
      const colorClass =
        system === "windows"
          ? "bg-primary/10 text-primary-foreground dark:bg-primary/20 dark:text-primary-foreground"
          : system === "macos"
            ? "bg-secondary/80 text-secondary-foreground dark:bg-secondary/30 dark:text-secondary-foreground"
            : "bg-accent/80 text-accent-foreground dark:bg-accent/30 dark:text-accent-foreground"

      return (
        <Badge key={system} variant="outline" className={`${colorClass}`}>
          {label}
        </Badge>
      )
    })
  }

  const handleCompareToggle = () => {
    if (isSelected) {
      removeFromCompare(laptop.id)
    } else {
      addToCompare(laptop)
    }
  }

  const handlePrevImage = () => {
    if (!laptop.images || laptop.images.length <= 1) return
    setCurrentImageIndex((prev) => (prev === 0 ? laptop.images!.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    if (!laptop.images || laptop.images.length <= 1) return
    setCurrentImageIndex((prev) => (prev === laptop.images!.length - 1 ? 0 : prev + 1))
  }

  const hasMultipleImages = laptop.images && laptop.images.length > 1

  return (
    <>
      <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-40 bg-muted">
          <Image
            src={laptop.images?.[currentImageIndex] || "/placeholder.svg?height=200&width=300"}
            alt={`${laptop.brand} ${laptop.model}`}
            fill
            className="object-contain"
          />

          {hasMultipleImages && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full h-8 w-8"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Previous image</span>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-background/80 hover:bg-background/90 rounded-full h-8 w-8"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Next image</span>
              </Button>

              <div className="absolute bottom-1 left-0 right-0 flex justify-center space-x-1">
                {laptop.images.map((_, index) => (
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
        <CardContent className="p-4 flex-grow">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-lg truncate">
                {laptop.brand} {laptop.model}
              </h3>
              <div className="flex items-center">
                <Checkbox
                  id={`compare-${laptop.id}`}
                  checked={isSelected}
                  onCheckedChange={handleCompareToggle}
                  className="mr-2"
                />
                <label htmlFor={`compare-${laptop.id}`} className="text-xs text-muted-foreground cursor-pointer">
                  Compare
                </label>
              </div>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <span className="font-medium">{formatPrice(laptop.price)}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Cpu className="h-4 w-4" />
              <span className="truncate">{laptop.processor}</span>
            </div>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Battery className="h-4 w-4" />
              <span>{laptop.batteryLife} hours</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-2">{getOSBadges(laptop.supportedOS)}</div>
          </div>
        </CardContent>
        <CardFooter className="p-4 pt-0">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="w-full">
                <Info className="h-4 w-4 mr-2" />
                Details
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>
                  {laptop.brand} {laptop.model}
                </DialogTitle>
                <DialogDescription>Detailed specifications and information</DialogDescription>
              </DialogHeader>
              <div className="grid gap-6 py-4">
                <ImageCarousel images={laptop.images || ["/placeholder.svg?height=300&width=500"]} />

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="font-medium">Price:</div>
                  <div>{formatPrice(laptop.price)}</div>

                  <div className="font-medium">Processor:</div>
                  <div>{laptop.processor}</div>

                  <div className="font-medium">RAM:</div>
                  <div>{laptop.ram}</div>

                  <div className="font-medium">Storage:</div>
                  <div>{laptop.storage}</div>

                  <div className="font-medium">Battery Life:</div>
                  <div>{laptop.batteryLife} hours</div>

                  <div className="font-medium">Performance Score:</div>
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                      <div
                        className="bg-primary h-2.5 rounded-full"
                        style={{ width: `${laptop.performanceScore * 10}%` }}
                      ></div>
                    </div>
                    <span>{laptop.performanceScore}/10</span>
                  </div>

                  <div className="font-medium">Operating Systems:</div>
                  <div className="flex flex-wrap gap-1">{getOSBadges(laptop.supportedOS)}</div>

                  <div className="font-medium col-span-2 mt-2">Notes:</div>
                  <div className="col-span-2 text-muted-foreground">{laptop.notes}</div>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant={isSelected ? "destructive" : "outline"}
                    onClick={handleCompareToggle}
                    className="mt-2"
                  >
                    {isSelected ? "Remove from Compare" : "Add to Compare"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </>
  )
}

