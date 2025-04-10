"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import type { Accessory } from "@/types"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Plus, Pencil, Trash2, MoreVertical, Search, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { fetchAccessories, createAccessory, updateAccessory, deleteAccessory } from "@/lib/api-client"

export default function ManageAccessories() {
  const [accessories, setAccessories] = useState<Accessory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [currentAccessory, setCurrentAccessory] = useState<Accessory | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [newAccessory, setNewAccessory] = useState<Partial<Accessory>>({
    name: "",
    type: "mouse",
    brand: "",
    price: 0,
    priceType: "HT",
    image: "",
    notes: "",
  })

  const { toast } = useToast()

  // Fetch accessories data
  const fetchData = async () => {
    try {
      setLoading(true)
      const data = await fetchAccessories()
      setAccessories(data)
      setError(null)
    } catch (err) {
      console.error("Error fetching accessories:", err)
      setError("Failed to load accessories. Please try again later.")
      toast({
        title: "Error",
        description: "Failed to load accessories. Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const filteredAccessories = accessories.filter(
    (accessory) =>
      accessory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accessory.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      accessory.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleAddAccessory = async () => {
    try {
      setIsSubmitting(true)

      // Validate required fields
      if (!newAccessory.name || !newAccessory.brand || !newAccessory.type) {
        toast({
          title: "Validation Error",
          description: "Name, brand, and type are required fields.",
          variant: "destructive",
        })
        return
      }

      // Prepare accessory data
      const accessoryData: Omit<Accessory, "id"> = {
        name: newAccessory.name,
        type: newAccessory.type as "mouse" | "keyboard" | "headphone" | "dock" | "other",
        brand: newAccessory.brand,
        price: newAccessory.price || 0,
        priceType: newAccessory.priceType as "HT" | "TTC",
        image: newAccessory.image || undefined,
        notes: newAccessory.notes || undefined,
      }

      await createAccessory(accessoryData)

      // Refresh the accessory list
      await fetchData()

      setIsAddDialogOpen(false)
      setNewAccessory({
        name: "",
        type: "mouse",
        brand: "",
        price: 0,
        priceType: "HT",
        image: "",
        notes: "",
      })

      toast({
        title: "Accessory Added",
        description: `${accessoryData.name} has been added to the database.`,
      })
    } catch (err) {
      console.error("Error adding accessory:", err)
      toast({
        title: "Error",
        description: "Failed to add accessory. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleEditAccessory = async () => {
    if (!currentAccessory) return

    try {
      setIsSubmitting(true)

      await updateAccessory(currentAccessory)

      // Refresh the accessory list
      await fetchData()

      setIsEditDialogOpen(false)
      setCurrentAccessory(null)

      toast({
        title: "Accessory Updated",
        description: `${currentAccessory.name} has been updated.`,
      })
    } catch (err) {
      console.error("Error updating accessory:", err)
      toast({
        title: "Error",
        description: "Failed to update accessory. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAccessory = async () => {
    if (!currentAccessory) return

    try {
      setIsSubmitting(true)

      await deleteAccessory(currentAccessory.id)

      // Refresh the accessory list
      await fetchData()

      setIsDeleteDialogOpen(false)

      toast({
        title: "Accessory Deleted",
        description: `${currentAccessory.name} has been removed.`,
      })

      setCurrentAccessory(null)
    } catch (err) {
      console.error("Error deleting accessory:", err)
      toast({
        title: "Error",
        description: "Failed to delete accessory. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const formatPrice = (price: number, priceType: "HT" | "TTC") => {
    return `${price.toLocaleString()} MAD (${priceType})`
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/manage">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to manage</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Manage Accessories</h1>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Accessory
          </Button>
        </div>
      </header>

      <main className="container py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search accessories..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Accessories Database</CardTitle>
            <CardDescription>Manage accessories for laptop packages</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading accessories...</span>
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
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccessories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                        No accessories found. Try adjusting your search or add a new accessory.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAccessories.map((accessory) => (
                      <TableRow key={accessory.id}>
                        <TableCell className="font-medium">{accessory.name}</TableCell>
                        <TableCell className="capitalize">{accessory.type}</TableCell>
                        <TableCell>{accessory.brand}</TableCell>
                        <TableCell>{formatPrice(accessory.price, accessory.priceType)}</TableCell>
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
                                  setCurrentAccessory(accessory)
                                  setIsEditDialogOpen(true)
                                }}
                              >
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => {
                                  setCurrentAccessory(accessory)
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

      {/* Add Accessory Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Accessory</DialogTitle>
            <DialogDescription>Enter the details for the new accessory</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={newAccessory.name}
                  onChange={(e) => setNewAccessory({ ...newAccessory, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={newAccessory.type} 
                  onValueChange={(value) => setNewAccessory({ ...newAccessory, type: value as any })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select accessory type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mouse">Mouse</SelectItem>
                    <SelectItem value="keyboard">Keyboard</SelectItem>
                    <SelectItem value="headphone">Headphone</SelectItem>
                    <SelectItem value="dock">Dock</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="brand">Brand</Label>
                <Input
                  id="brand"
                  value={newAccessory.brand}
                  onChange={(e) => setNewAccessory({ ...newAccessory, brand: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (MAD)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  value={newAccessory.price || ""}
                  onChange={(e) => setNewAccessory({ ...newAccessory, price: Number(e.target.value) })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Price Type</Label>
                <div className="flex space-x-4 pt-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="priceTypeHT-add"
                      checked={newAccessory.priceType === "HT"}
                      onChange={() => setNewAccessory({ ...newAccessory, priceType: "HT" })}
                    />
                    <Label htmlFor="priceTypeHT-add">HT</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="radio"
                      id="priceTypeTTC-add"
                      checked={newAccessory.priceType === "TTC"}
                      onChange={() => setNewAccessory({ ...newAccessory, priceType: "TTC" })}
                    />
                    <Label htmlFor="priceTypeTTC-add">TTC</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Image URL (optional)</Label>
                <Input
                  id="image"
                  value={newAccessory.image || ""}
                  onChange={(e) => setNewAccessory({ ...newAccessory, image: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes (optional)</Label>
                <Input
                  id="notes"
                  value={newAccessory.notes || ""}
                  onChange={(e) => setNewAccessory({ ...newAccessory, notes: e.target.value })}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleAddAccessory} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Accessory
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Accessory Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Accessory</DialogTitle>
            <DialogDescription>Update the details for this accessory</DialogDescription>
          </DialogHeader>

          {currentAccessory && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name">Name</Label>
                  <Input
                    id="edit-name"
                    value={currentAccessory.name}
                    onChange={(e) => setCurrentAccessory({ ...currentAccessory, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-type">Type</Label>
                  <Select 
                    value={currentAccessory.type}
                    onValueChange={(value) => setCurrentAccessory({ ...currentAccessory, type: value as any })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select accessory type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mouse">Mouse</SelectItem>
                      <SelectItem value="keyboard">Keyboard</SelectItem>
                      <SelectItem value="headphone">Headphone</SelectItem>
                      <SelectItem value="dock">Dock</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-brand">Brand</Label>
                  <Input
                    id="edit-brand"
                    value={currentAccessory.brand}
                    onChange={(e) => setCurrentAccessory({ ...currentAccessory, brand: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-price">Price (MAD)</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    min="0"
                    value={currentAccessory.price || ""}
                    onChange={(e) => setCurrentAccessory({ ...currentAccessory, price: Number(e.target.value) })}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Price Type</Label>
                  <div className="flex space-x-4 pt-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="priceTypeHT-edit"
                        checked={currentAccessory.priceType === "HT"}
                        onChange={() => setCurrentAccessory({ ...currentAccessory, priceType: "HT" })}
                      />
                      <Label htmlFor="priceTypeHT-edit">HT</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="radio"
                        id="priceTypeTTC-edit"
                        checked={currentAccessory.priceType === "TTC"}
                        onChange={() => setCurrentAccessory({ ...currentAccessory, priceType: "TTC" })}
                      />
                      <Label htmlFor="priceTypeTTC-edit">TTC</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-image">Image URL (optional)</Label>
                  <Input
                    id="edit-image"
                    value={currentAccessory.image || ""}
                    onChange={(e) => setCurrentAccessory({ ...currentAccessory, image: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-notes">Notes (optional)</Label>
                  <Input
                    id="edit-notes"
                    value={currentAccessory.notes || ""}
                    onChange={(e) => setCurrentAccessory({ ...currentAccessory, notes: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleEditAccessory} disabled={isSubmitting}>
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
              Are you sure you want to delete this accessory? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {currentAccessory && (
            <div className="py-4">
              <p className="font-medium">{currentAccessory.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {currentAccessory.brand}, {currentAccessory.type}
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeleteAccessory} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 