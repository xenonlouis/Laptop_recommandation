"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Laptop, UserProfile, OperatingSystem } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, Plus, Pencil, Trash2, MoreVertical, Search, Loader2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { fetchLaptops, createLaptop, updateLaptop, deleteLaptop as apiDeleteLaptop } from "@/lib/api-client"

export default function ManageLaptops() {
  const [laptops, setLaptops] = useState<Laptop[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentLaptop, setCurrentLaptop] = useState<Laptop | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newLaptop, setNewLaptop] = useState<Partial<Laptop>>({
    brand: "",
    model: "",
    price: 999,
    priceType: "HT",
    processor: "",
    ram: "",
    storage: "",
    batteryLife: 8,
    performanceScore: 7,
    notes: "",
    images: ["/placeholder.svg?height=400&width=600"],
    supportedProfiles: [],
    supportedOS: [],
  })
  const [newImageUrl, setNewImageUrl] = useState("")
  const [editImageUrl, setEditImageUrl] = useState("")

  const { toast } = useToast()

  // Fetch laptops data
  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await fetchLaptops()
      setLaptops(data)
      setError(null)
    } catch (err) {
      console.error("Error fetching laptops:", err)
      setError("Failed to load laptops. Please try again later.")
      toast({
        title: "Error",
        description: "Failed to load laptops. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredLaptops = laptops.filter(
    (laptop) =>
      laptop.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      laptop.processor.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddLaptop = async () => {
    try {
      setIsSubmitting(true)

      // Validate required fields
      if (!newLaptop.brand || !newLaptop.model) {
        toast({
          title: "Validation Error",
          description: "Brand and model are required fields.",
          variant: "destructive",
        })
        return
      }

      // Prepare laptop data
      const laptopData: Omit<Laptop, "id"> = {
        brand: newLaptop.brand || "",
        model: newLaptop.model || "",
        price: newLaptop.price || 0,
        priceType: newLaptop.priceType || "HT",
        processor: newLaptop.processor || "",
        ram: newLaptop.ram || "",
        storage: newLaptop.storage || "",
        batteryLife: newLaptop.batteryLife || 0,
        performanceScore: newLaptop.performanceScore || 0,
        notes: newLaptop.notes || "",
        images: newLaptop.images || ["/placeholder.svg?height=400&width=600"],
        supportedProfiles: newLaptop.supportedProfiles || [],
        supportedOS: newLaptop.supportedOS || [],
      }

      await createLaptop(laptopData)

      // Refresh the laptop list
      await fetchData()

      setIsAddDialogOpen(false)
      setNewLaptop({
        brand: "",
        model: "",
        price: 999,
        priceType: "HT",
        processor: "",
        ram: "",
        storage: "",
        batteryLife: 8,
        performanceScore: 7,
        notes: "",
        images: ["/placeholder.svg?height=400&width=600"],
        supportedProfiles: [],
        supportedOS: [],
      })
      setNewImageUrl("")

      toast({
        title: "Laptop Added",
        description: `${laptopData.brand} ${laptopData.model} has been added to the database.`,
      })
    } catch (err) {
      console.error("Error adding laptop:", err)
      toast({
        title: "Error",
        description: "Failed to add laptop. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditLaptop = async () => {
    if (!currentLaptop) return

    try {
      setIsSubmitting(true)

      await updateLaptop(currentLaptop)

      // Refresh the laptop list
      await fetchData()

      setIsEditDialogOpen(false)
      setCurrentLaptop(null)
      setEditImageUrl("")

      toast({
        title: "Laptop Updated",
        description: `${currentLaptop.brand} ${currentLaptop.model} has been updated.`,
      })
    } catch (err) {
      console.error("Error updating laptop:", err)
      toast({
        title: "Error",
        description: "Failed to update laptop. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteLaptop = async () => {
    if (!currentLaptop) return

    try {
      setIsSubmitting(true)

      await apiDeleteLaptop(currentLaptop.id)

      // Refresh the laptop list
      await fetchData()

      setIsDeleteDialogOpen(false)

      toast({
        title: "Laptop Deleted",
        description: `${currentLaptop.brand} ${currentLaptop.model} has been removed.`,
      })

      setCurrentLaptop(null)
    } catch (err) {
      console.error("Error deleting laptop:", err)
      toast({
        title: "Error",
        description: "Failed to delete laptop. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleProfileToggle = (profile: UserProfile, isAdd = true) => {
    if (isAdd) {
      // Adding to a new laptop
      setNewLaptop((prev) => ({
        ...prev,
        supportedProfiles: prev.supportedProfiles?.includes(profile)
          ? prev.supportedProfiles.filter((p) => p !== profile)
          : [...(prev.supportedProfiles || []), profile],
      }))
    } else {
      // Editing an existing laptop
      if (!currentLaptop) return

      setCurrentLaptop((prev) => ({
        ...prev,
        supportedProfiles: prev.supportedProfiles.includes(profile)
          ? prev.supportedProfiles.filter((p) => p !== profile)
          : [...prev.supportedProfiles, profile],
      }))
    }
  }

  const handleOSToggle = (os: OperatingSystem, isAdd = true) => {
    if (isAdd) {
      // Adding to a new laptop
      setNewLaptop((prev) => ({
        ...prev,
        supportedOS: prev.supportedOS?.includes(os)
          ? prev.supportedOS.filter((o) => o !== os)
          : [...(prev.supportedOS || []), os],
      }))
    } else {
      // Editing an existing laptop
      if (!currentLaptop) return

      setCurrentLaptop((prev) => ({
        ...prev,
        supportedOS: prev.supportedOS.includes(os)
          ? prev.supportedOS.filter((o) => o !== os)
          : [...prev.supportedOS, os],
      }))
    }
  }

  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return

    setNewLaptop((prev) => ({
      ...prev,
      images: [...(prev.images || []), newImageUrl],
    }))

    setNewImageUrl("")
  }

  const handleEditImageUrl = () => {
    if (!editImageUrl.trim() || !currentLaptop) return

    setCurrentLaptop((prev) => ({
      ...prev,
      images: [...(prev.images || []), editImageUrl],
    }))

    setEditImageUrl("")
  }

  const handleRemoveImage = (index: number, isAdd = true) => {
    if (isAdd) {
      setNewLaptop((prev) => ({
        ...prev,
        images: prev.images?.filter((_, i) => i !== index),
      }))
    } else {
      if (!currentLaptop) return

      setCurrentLaptop((prev) => ({
        ...prev,
        images: prev.images?.filter((_, i) => i !== index),
      }))
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to home</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Manage Laptops</h1>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Laptop
          </Button>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search laptops..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2">
            <Tabs defaultValue="all" className="w-[400px]">
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="consultant">Consultant</TabsTrigger>
                <TabsTrigger value="developer">Developer</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Laptop Database</CardTitle>
            <CardDescription>Manage your laptop recommendations for different user profiles</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading laptops...</span>
              </div>
            ) : error ? (
              <div className="text-center py-8 text-destructive">
                <p>{error}</p>
                <Button variant="outline" className="mt-4" onClick={fetchData}>
                  Try Again
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Laptop</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Specs</TableHead>
                    <TableHead>Profiles</TableHead>
                    <TableHead>OS</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLaptops.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                        No laptops found. Try adjusting your search or add a new laptop.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredLaptops.map((laptop) => (
                      <TableRow key={laptop.id}>
                        <TableCell className="font-medium">
                          {laptop.brand} {laptop.model}
                        </TableCell>
                        <TableCell>{laptop.price.toLocaleString()} MAD ({laptop.priceType})</TableCell>
                        <TableCell className="max-w-[200px] truncate">
                          {laptop.processor}, {laptop.ram}, {laptop.storage}
                        </TableCell>
                        <TableCell>
                          {laptop.supportedProfiles.map((profile) => {
                            const label = profile === "developer" ? "Developer" : "Consultant"

                            return (
                              <span
                                key={profile}
                                className="inline-block px-2 py-1 text-xs rounded-full mr-1 mb-1 bg-primary/10"
                              >
                                {label}
                              </span>
                            )
                          })}
                        </TableCell>
                        <TableCell>
                          {laptop.supportedOS.map((os) => {
                            const label = os === "macos" ? "macOS" : os.charAt(0).toUpperCase() + os.slice(1)

                            return (
                              <span
                                key={os}
                                className="inline-block px-2 py-1 text-xs rounded-full mr-1 mb-1 bg-secondary/10"
                              >
                                {label}
                              </span>
                            )
                          })}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                                <span className="sr-only">Open menu</span>
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentLaptop(laptop)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentLaptop(laptop)
                                  setIsDeleteDialogOpen(true)
                                }}
                                className="text-destructive focus:text-destructive"
                              >
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </main>

      {/* Add Laptop Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Laptop</DialogTitle>
            <DialogDescription>Enter the details for the new laptop recommendation</DialogDescription>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={newLaptop.brand}
                  onChange={(e) => setNewLaptop({ ...newLaptop, brand: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="model">Model</Label>
                <Input
                  id="model"
                  value={newLaptop.model}
                  onChange={(e) => setNewLaptop({ ...newLaptop, model: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price (MAD)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={newLaptop.price || ""}
                  onChange={(e) => setNewLaptop({ ...newLaptop, price: Number(e.target.value) })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Price Type</Label>
                <div className="flex space-x-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="priceTypeHT-add"
                      checked={newLaptop.priceType === "HT"}
                      onChange={() => setNewLaptop({ ...newLaptop, priceType: "HT" })}
                    />
                    <Label htmlFor="priceTypeHT-add">HT</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="priceTypeTTC-add"
                      checked={newLaptop.priceType === "TTC"}
                      onChange={() => setNewLaptop({ ...newLaptop, priceType: "TTC" })}
                    />
                    <Label htmlFor="priceTypeTTC-add">TTC</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="batteryLife">Battery Life (hours)</Label>
                <Input
                  id="batteryLife"
                  type="number"
                  value={newLaptop.batteryLife}
                  onChange={(e) => setNewLaptop({ ...newLaptop, batteryLife: Number(e.target.value) })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="performanceScore">Performance (0-10)</Label>
                <div className="pt-2">
                  <Slider
                    id="performanceScore"
                    min={0}
                    max={10}
                    step={0.1}
                    value={[newLaptop.performanceScore || 7]}
                    onValueChange={(value) => setNewLaptop({ ...newLaptop, performanceScore: value[0] })}
                  />
                </div>
                <div className="text-right text-sm text-muted-foreground">{newLaptop.performanceScore?.toFixed(1)}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="processor">Processor</Label>
                <Input
                  id="processor"
                  value={newLaptop.processor}
                  onChange={(e) => setNewLaptop({ ...newLaptop, processor: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ram">RAM</Label>
                <Input
                  id="ram"
                  value={newLaptop.ram}
                  onChange={(e) => setNewLaptop({ ...newLaptop, ram: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="storage">Storage</Label>
                <Input
                  id="storage"
                  value={newLaptop.storage}
                  onChange={(e) => setNewLaptop({ ...newLaptop, storage: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={newLaptop.notes}
                onChange={(e) => setNewLaptop({ ...newLaptop, notes: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Supported User Profiles</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="consultant"
                      checked={newLaptop.supportedProfiles?.includes("consultant")}
                      onCheckedChange={() => handleProfileToggle("consultant")}
                    />
                    <Label htmlFor="consultant" className="font-normal">
                      Consultant
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="developer"
                      checked={newLaptop.supportedProfiles?.includes("developer")}
                      onCheckedChange={() => handleProfileToggle("developer")}
                    />
                    <Label htmlFor="developer" className="font-normal">
                      Developer
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Supported Operating Systems</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="windows"
                      checked={newLaptop.supportedOS?.includes("windows")}
                      onCheckedChange={() => handleOSToggle("windows")}
                    />
                    <Label htmlFor="windows" className="font-normal">
                      Windows
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="macos"
                      checked={newLaptop.supportedOS?.includes("macos")}
                      onCheckedChange={() => handleOSToggle("macos")}
                    />
                    <Label htmlFor="macos" className="font-normal">
                      macOS
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="linux"
                      checked={newLaptop.supportedOS?.includes("linux")}
                      onCheckedChange={() => handleOSToggle("linux")}
                    />
                    <Label htmlFor="linux" className="font-normal">
                      Linux
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Laptop Images</Label>
              <div className="space-y-3">
                {/* Image URL Input */}
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter image URL"
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                  <Button type="button" onClick={handleAddImageUrl} className="shrink-0">
                    <Plus className="h-4 w-4 mr-1" />
                    Add
                  </Button>
                </div>

                {/* Image Preview */}
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {newLaptop.images?.map((image, index) => (
                    <div key={index} className="relative group">
                      <div className="relative h-20 bg-muted rounded-md overflow-hidden">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Preview ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 truncate">{image}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleAddLaptop} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Laptop
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Laptop Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Laptop</DialogTitle>
            <DialogDescription>Update the details for this laptop recommendation</DialogDescription>
          </DialogHeader>

          {currentLaptop && (
            <div className="grid gap-6 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-brand">Brand</Label>
                  <Input
                    id="edit-brand"
                    value={currentLaptop.brand}
                    onChange={(e) => setCurrentLaptop({ ...currentLaptop, brand: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-model">Model</Label>
                  <Input
                    id="edit-model"
                    value={currentLaptop.model}
                    onChange={(e) => setCurrentLaptop({ ...currentLaptop, model: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price (MAD)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    min="0"
                    value={currentLaptop?.price || ""}
                    onChange={(e) =>
                      setCurrentLaptop(
                        currentLaptop ? { ...currentLaptop, price: Number(e.target.value) } : null
                      )
                    }
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Price Type</Label>
                  <div className="flex space-x-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="priceTypeHT-edit"
                        checked={currentLaptop?.priceType === "HT"}
                        onChange={() =>
                          setCurrentLaptop(currentLaptop ? { ...currentLaptop, priceType: "HT" } : null)
                        }
                      />
                      <Label htmlFor="priceTypeHT-edit">HT</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="priceTypeTTC-edit"
                        checked={currentLaptop?.priceType === "TTC"}
                        onChange={() =>
                          setCurrentLaptop(currentLaptop ? { ...currentLaptop, priceType: "TTC" } : null)
                        }
                      />
                      <Label htmlFor="priceTypeTTC-edit">TTC</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-batteryLife">Battery Life (hours)</Label>
                  <Input
                    id="edit-batteryLife"
                    type="number"
                    value={currentLaptop.batteryLife}
                    onChange={(e) => setCurrentLaptop({ ...currentLaptop, batteryLife: Number(e.target.value) })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-performanceScore">Performance (0-10)</Label>
                  <div className="pt-2">
                    <Slider
                      id="edit-performanceScore"
                      min={0}
                      max={10}
                      step={0.1}
                      value={[currentLaptop.performanceScore]}
                      onValueChange={(value) => setCurrentLaptop({ ...currentLaptop, performanceScore: value[0] })}
                    />
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    {currentLaptop.performanceScore.toFixed(1)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-processor">Processor</Label>
                  <Input
                    id="edit-processor"
                    value={currentLaptop.processor}
                    onChange={(e) => setCurrentLaptop({ ...currentLaptop, processor: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-ram">RAM</Label>
                  <Input
                    id="edit-ram"
                    value={currentLaptop.ram}
                    onChange={(e) => setCurrentLaptop({ ...currentLaptop, ram: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-storage">Storage</Label>
                  <Input
                    id="edit-storage"
                    value={currentLaptop.storage}
                    onChange={(e) => setCurrentLaptop({ ...currentLaptop, storage: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Textarea
                  id="edit-notes"
                  value={currentLaptop.notes}
                  onChange={(e) => setCurrentLaptop({ ...currentLaptop, notes: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Supported User Profiles</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="edit-consultant"
                        checked={currentLaptop.supportedProfiles?.includes("consultant")}
                        onCheckedChange={() => handleProfileToggle("consultant", false)}
                      />
                      <Label htmlFor="edit-consultant" className="font-normal">
                        Consultant
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="edit-developer"
                        checked={currentLaptop.supportedProfiles?.includes("developer")}
                        onCheckedChange={() => handleProfileToggle("developer", false)}
                      />
                      <Label htmlFor="edit-developer" className="font-normal">
                        Developer
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Supported Operating Systems</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="edit-windows"
                        checked={currentLaptop.supportedOS.includes("windows")}
                        onCheckedChange={() => handleOSToggle("windows", false)}
                      />
                      <Label htmlFor="edit-windows" className="font-normal">
                        Windows
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="edit-macos"
                        checked={currentLaptop.supportedOS.includes("macos")}
                        onCheckedChange={() => handleOSToggle("macos", false)}
                      />
                      <Label htmlFor="edit-macos" className="font-normal">
                        macOS
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="edit-linux"
                        checked={currentLaptop.supportedOS.includes("linux")}
                        onCheckedChange={() => handleOSToggle("linux", false)}
                      />
                      <Label htmlFor="edit-linux" className="font-normal">
                        Linux
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Laptop Images</Label>
                <div className="space-y-3">
                  {/* Image URL Input */}
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter image URL"
                      value={editImageUrl}
                      onChange={(e) => setEditImageUrl(e.target.value)}
                    />
                    <Button type="button" onClick={handleEditImageUrl} className="shrink-0">
                      <Plus className="h-4 w-4 mr-1" />
                      Add
                    </Button>
                  </div>

                  {/* Image Preview */}
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {currentLaptop.images?.map((image, index) => (
                      <div key={index} className="relative group">
                        <div className="relative h-20 bg-muted rounded-md overflow-hidden">
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`Preview ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                            onClick={() => handleRemoveImage(index, false)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 truncate">{image}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleEditLaptop} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this laptop? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {currentLaptop && (
            <div className="py-4">
              <p className="font-medium">
                {currentLaptop.brand} {currentLaptop.model}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {currentLaptop.processor}, {currentLaptop.ram}, {currentLaptop.storage}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteLaptop} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

