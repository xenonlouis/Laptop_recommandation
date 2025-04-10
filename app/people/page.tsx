"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Loader2, Plus, Pencil, Trash2, Package, HardDrive, Database, FileDown, CheckSquare, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  fetchPackages, 
  fetchPeople, 
  createPerson, 
  updatePerson, 
  deletePerson,
  updatePackage
} from "@/lib/api-client"
import { Package as PackageType, Person, PackageStatus } from "@/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

// Sample mock data
const MOCK_PEOPLE: Person[] = [
  {
    id: "mock1",
    name: "John Smith",
    email: "john.smith@example.com",
    department: "Engineering",
    position: "Software Developer",
    pcReference: "LT-ENG-001",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "mock2",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    department: "Marketing",
    position: "Marketing Manager",
    pcReference: "LT-MKT-002",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "mock3",
    name: "Michael Chen",
    email: "michael.chen@example.com",
    department: "Engineering",
    position: "Lead Developer",
    pcReference: "LT-ENG-003",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
]

const MOCK_PACKAGES: PackageType[] = [
  {
    id: "mockpkg1",
    name: "Developer Starter Kit",
    laptop: {
      id: "laptop1",
      brand: "Lenovo",
      model: "ThinkPad E14",
      price: 9490,
      priceType: "HT",
      processor: "Intel Core i7",
      ram: "16",
      storage: "512",
      batteryLife: 7,
      performanceScore: 8.5,
      notes: "",
      supportedProfiles: ["developer"],
      supportedOS: ["windows", "linux"]
    },
    accessories: [
      {
        id: "acc1",
        name: "Logitech MX Master 3S",
        type: "mouse",
        brand: "Logitech",
        price: 990,
        priceType: "TTC"
      }
    ],
    status: "delivered",
    assignedTo: "John Smith",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "mockpkg2",
    name: "Marketing Pro Package",
    laptop: {
      id: "laptop2",
      brand: "Apple",
      model: "MacBook Air M2",
      price: 14490,
      priceType: "TTC",
      processor: "M2",
      ram: "16",
      storage: "256",
      batteryLife: 15,
      performanceScore: 9.0,
      notes: "",
      supportedProfiles: ["consultant"],
      supportedOS: ["macos"]
    },
    accessories: [
      {
        id: "acc2",
        name: "Magic Mouse",
        type: "mouse",
        brand: "Apple",
        price: 950,
        priceType: "TTC"
      }
    ],
    status: "approved",
    assignedTo: "Sarah Johnson",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
]

// Add the CSV export function
const exportToCSV = (data: any[], fields: string[], filename: string) => {
  // Create CSV header
  const header = fields.join(',');
  
  // Create CSV rows
  const csvRows = data.map(item => {
    return fields.map(field => {
      // Handle nested fields with dot notation (e.g., "laptop.brand")
      if (field.includes('.')) {
        const [parent, child] = field.split('.');
        return item[parent] && item[parent][child] ? 
          `"${String(item[parent][child]).replace(/"/g, '""')}"` : '""';
      }
      
      // Handle array fields
      if (Array.isArray(item[field])) {
        return `"${item[field].join(', ').replace(/"/g, '""')}"`;
      }
      
      // Handle regular fields, ensuring proper escaping for CSV
      const value = item[field] !== undefined && item[field] !== null ? 
        String(item[field]).replace(/"/g, '""') : '';
      return `"${value}"`;
    }).join(',');
  });
  
  // Combine header and rows
  const csv = [header, ...csvRows].join('\n');
  
  // Create a blob and download
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export default function PeoplePage() {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [people, setPeople] = useState<Person[]>([])
  const [peoplePackages, setPeoplePackages] = useState<Record<string, PackageType[]>>({})
  const [editingPerson, setEditingPerson] = useState<Person | null>(null)
  const [newPerson, setNewPerson] = useState({
    name: "",
    email: "",
    department: "",
    position: "",
    pcReference: "",
  })
  // State for package assignment
  const [allPackages, setAllPackages] = useState<PackageType[]>([])
  const [selectedPackageId, setSelectedPackageId] = useState<string>("")
  const [currentPersonForAssign, setCurrentPersonForAssign] = useState<Person | null>(null)
  const [pcReference, setPcReference] = useState<string>("")
  const [isAssigning, setIsAssigning] = useState<boolean>(false)
  
  // Mock data toggle state
  const [useMockData, setUseMockData] = useState<boolean>(false)

  // Add state for export configuration
  const [showExportDialog, setShowExportDialog] = useState<boolean>(false);
  const [exportFields, setExportFields] = useState<Record<string, boolean>>({
    'name': true,
    'email': true,
    'department': true,
    'position': true,
    'pcReference': true,
    'createdAt': false,
    'updatedAt': false,
    'packageNames': true,
    'packageStatuses': true,
    'laptopBrands': true,
    'laptopModels': true,
  });
  
  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      // Use mock data or fetch from API based on the toggle
      if (useMockData) {
        setPeople(MOCK_PEOPLE)
        setAllPackages(MOCK_PACKAGES)
        
        // Generate mock people-packages mapping
        const mockPackagesByPerson: Record<string, PackageType[]> = {}
        MOCK_PACKAGES.forEach((pkg) => {
          if (pkg.assignedTo) {
            if (!mockPackagesByPerson[pkg.assignedTo]) {
              mockPackagesByPerson[pkg.assignedTo] = []
            }
            mockPackagesByPerson[pkg.assignedTo].push(pkg)
          }
        })
        setPeoplePackages(mockPackagesByPerson)
      } else {
        // Fetch real data from API
        const [peopleData, packagesData] = await Promise.all([
          fetchPeople(),
          fetchPackages()
        ])

        setPeople(peopleData)
        setAllPackages(packagesData)

        // Group packages by assignedTo
        const packagesByPerson: Record<string, PackageType[]> = {}
        packagesData.forEach((pkg: PackageType) => {
          if (pkg.assignedTo) {
            if (!packagesByPerson[pkg.assignedTo]) {
              packagesByPerson[pkg.assignedTo] = []
            }
            packagesByPerson[pkg.assignedTo].push(pkg)
          }
        })
        setPeoplePackages(packagesByPerson)
      }
    } catch (err) {
      console.error("Error fetching data:", err)
      setError("Failed to load data. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  // Fetch data when component mounts or when useMockData changes
  useEffect(() => {
    fetchData()
  }, [useMockData])

  // Function to format price
  const formatPrice = (price: number, currency: string = "€") => {
    return `${price.toLocaleString("fr-FR")} ${currency}`
  }

  // Function to get badge color based on status
  const getStatusBadge = (status: PackageStatus) => {
    const statusConfig = {
      proposed: { variant: "outline", label: "Proposed" },
      approved: { variant: "success", label: "Approved" },
      rejected: { variant: "destructive", label: "Rejected" },
      delivered: { variant: "default", label: "Delivered" },
    }

    const config = statusConfig[status]
    return (
      <Badge variant={config.variant as any}>{config.label}</Badge>
    )
  }

  const handleAddPerson = async () => {
    if (useMockData) {
      // In mock mode, just add to the local state
      const mockPerson: Person = {
        id: `mock${Date.now()}`,
        name: newPerson.name,
        email: newPerson.email,
        department: newPerson.department,
        position: newPerson.position,
        pcReference: newPerson.pcReference,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
      setPeople(prev => [...prev, mockPerson])
      setNewPerson({ name: "", email: "", department: "", position: "", pcReference: "" })
      return
    }
    
    try {
      await createPerson(newPerson)
      setNewPerson({ name: "", email: "", department: "", position: "", pcReference: "" })
      await fetchData()
    } catch (err) {
      console.error("Error adding person:", err)
      setError("Failed to add person. Please try again.")
    }
  }

  const handleUpdatePerson = async () => {
    if (!editingPerson) return
    
    if (useMockData) {
      // In mock mode, update local state
      setPeople(prev => 
        prev.map(p => p.id === editingPerson.id ? editingPerson : p)
      )
      setEditingPerson(null)
      return
    }
    
    try {
      await updatePerson(editingPerson)
      setEditingPerson(null)
      await fetchData()
    } catch (err) {
      console.error("Error updating person:", err)
      setError("Failed to update person. Please try again.")
    }
  }

  const handleDeletePerson = async (id: string) => {
    if (useMockData) {
      // In mock mode, remove from local state
      setPeople(prev => prev.filter(p => p.id !== id))
      return
    }
    
    try {
      await deletePerson(id)
      await fetchData()
    } catch (err) {
      console.error("Error deleting person:", err)
      setError("Failed to delete person. Please try again.")
    }
  }

  // Function to handle assigning a package to a person
  const handleAssignPackage = async () => {
    if (!currentPersonForAssign || !selectedPackageId) return
    
    if (useMockData) {
      // In mock mode, update local state
      const packageToAssign = allPackages.find(pkg => pkg.id === selectedPackageId)
      
      if (packageToAssign) {
        // Update the person with PC reference
        const updatedPerson = {
          ...currentPersonForAssign,
          pcReference: pcReference,
          updatedAt: new Date().toISOString()
        }
        
        // Update the package to associate with this person
        const updatedPackage = {
          ...packageToAssign,
          assignedTo: currentPersonForAssign.name,
          updatedAt: new Date().toISOString()
        }
        
        // Update people state
        setPeople(prev => 
          prev.map(p => p.id === currentPersonForAssign.id ? updatedPerson : p)
        )
        
        // Update packages state
        setAllPackages(prev => 
          prev.map(p => p.id === selectedPackageId ? updatedPackage : p)
        )
        
        // Update the package mapping
        setPeoplePackages(prev => {
          const newMapping = { ...prev }
          if (!newMapping[currentPersonForAssign.name]) {
            newMapping[currentPersonForAssign.name] = []
          }
          
          // Check if the package is already assigned to this person
          const existingIndex = newMapping[currentPersonForAssign.name].findIndex(
            p => p.id === selectedPackageId
          )
          
          if (existingIndex >= 0) {
            // Replace the existing package
            newMapping[currentPersonForAssign.name][existingIndex] = updatedPackage
          } else {
            // Add the package
            newMapping[currentPersonForAssign.name].push(updatedPackage)
          }
          
          return newMapping
        })
        
        // Reset state
        setSelectedPackageId("")
        setCurrentPersonForAssign(null)
        setPcReference("")
      }
      return
    }
    
    setIsAssigning(true)
    try {
      // Find the package to use as a template
      const packageToAssign = allPackages.find(pkg => pkg.id === selectedPackageId)
      
      if (packageToAssign) {
        // Update the person with PC reference
        const updatedPerson = {
          ...currentPersonForAssign,
          pcReference: pcReference,
          updatedAt: new Date().toISOString()
        }
        
        // Update the package to associate with this person
        // Note: This allows the same package to be assigned to multiple people
        // Each person can have their unique PC reference
        const updatedPackage = {
          ...packageToAssign,
          assignedTo: currentPersonForAssign.name,
          updatedAt: new Date().toISOString()
        }
        
        // Save the changes
        await updatePerson(updatedPerson)
        await updatePackage(updatedPackage)
        
        // Reset state
        setSelectedPackageId("")
        setCurrentPersonForAssign(null)
        setPcReference("")
        
        // Refresh data
        await fetchData()
      }
    } catch (err) {
      console.error("Error assigning package:", err)
      setError("Failed to assign package. Please try again.")
    } finally {
      setIsAssigning(false)
    }
  }

  const openAssignDialog = (person: Person) => {
    setCurrentPersonForAssign(person)
    setSelectedPackageId("")
    setPcReference(person.pcReference || "")
  }

  // Handle export checkbox changes
  const handleExportFieldChange = (field: string) => {
    setExportFields(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };
  
  // Handle the export action
  const handleExport = () => {
    // Prepare the fields to export based on user selection
    const fieldsToExport = Object.entries(exportFields)
      .filter(([_, include]) => include)
      .map(([field]) => field);
    
    // Prepare the data to export
    const dataToExport = people.map(person => {
      const personData: Record<string, any> = { ...person };
      
      // Add package-related fields if selected
      if (exportFields.packageNames || exportFields.packageStatuses || 
          exportFields.laptopBrands || exportFields.laptopModels) {
        
        const personPackages = peoplePackages[person.id] || peoplePackages[person.name] || [];
        
        if (exportFields.packageNames) {
          personData.packageNames = personPackages.map(pkg => pkg.name).join('; ');
        }
        
        if (exportFields.packageStatuses) {
          personData.packageStatuses = personPackages.map(pkg => pkg.status).join('; ');
        }
        
        if (exportFields.laptopBrands) {
          personData.laptopBrands = personPackages.map(pkg => pkg.laptop.brand).join('; ');
        }
        
        if (exportFields.laptopModels) {
          personData.laptopModels = personPackages.map(pkg => pkg.laptop.model).join('; ');
        }
      }
      
      return personData;
    });
    
    // Generate filename with date
    const date = new Date().toISOString().split('T')[0];
    const filename = `people-export-${date}.csv`;
    
    // Export the data
    exportToCSV(dataToExport, fieldsToExport, filename);
    setShowExportDialog(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading people data...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <p className="text-destructive">{error}</p>
          <Button onClick={() => window.location.reload()}>Try Again</Button>
        </div>
      </div>
    )
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
            <h1 className="text-2xl font-bold tracking-tight">People</h1>
          </div>
          <div className="flex items-center gap-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center gap-2">
                    <Label htmlFor="mock-data" className="text-sm whitespace-nowrap cursor-pointer">
                      {useMockData ? "Using Mock Data" : "Using Real Data"}
                    </Label>
                    <Switch
                      id="mock-data"
                      checked={useMockData}
                      onCheckedChange={setUseMockData}
                    />
                    <Database className="h-4 w-4 text-muted-foreground" />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle between real and sample data</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <Button 
              variant="outline" 
              size="sm"
              className="flex items-center gap-2"
              onClick={() => setShowExportDialog(true)}
            >
              <FileDown className="h-4 w-4" />
              Export CSV
            </Button>
            
            <Link href="/packages">
              <Button variant="outline">View All Packages</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Add Export Dialog */}
      <Dialog open={showExportDialog} onOpenChange={setShowExportDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Export to CSV</DialogTitle>
            <DialogDescription>
              Select the fields you want to include in your CSV export.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Person Information</h3>
                <div className="space-y-1">
                  {[
                    { id: 'name', label: 'Name' },
                    { id: 'email', label: 'Email' },
                    { id: 'department', label: 'Department' },
                    { id: 'position', label: 'Position' },
                    { id: 'pcReference', label: 'PC Reference' },
                    { id: 'createdAt', label: 'Created Date' },
                    { id: 'updatedAt', label: 'Updated Date' },
                  ].map(field => (
                    <div 
                      key={field.id} 
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleExportFieldChange(field.id)}
                    >
                      {exportFields[field.id] ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                      <span className="text-sm">{field.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Package Information</h3>
                <div className="space-y-1">
                  {[
                    { id: 'packageNames', label: 'Package Names' },
                    { id: 'packageStatuses', label: 'Package Statuses' },
                    { id: 'laptopBrands', label: 'Laptop Brands' },
                    { id: 'laptopModels', label: 'Laptop Models' },
                  ].map(field => (
                    <div 
                      key={field.id} 
                      className="flex items-center space-x-2 cursor-pointer"
                      onClick={() => handleExportFieldChange(field.id)}
                    >
                      {exportFields[field.id] ? (
                        <CheckSquare className="h-4 w-4" />
                      ) : (
                        <Square className="h-4 w-4" />
                      )}
                      <span className="text-sm">{field.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowExportDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleExport}>
              Export CSV
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <main className="container py-6 space-y-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-xl font-bold">People and Their Assigned Packages</h2>
            <p className="text-muted-foreground mt-1">
              Manage people and their assigned packages
            </p>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Person
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Person</DialogTitle>
                <DialogDescription>
                  Create a new person who can be assigned packages.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={newPerson.name}
                    onChange={(e) => setNewPerson({ ...newPerson, name: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="email"
                    value={newPerson.email}
                    onChange={(e) => setNewPerson({ ...newPerson, email: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="department" className="text-right">
                    Department
                  </Label>
                  <Input
                    id="department"
                    value={newPerson.department}
                    onChange={(e) => setNewPerson({ ...newPerson, department: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="position" className="text-right">
                    Position
                  </Label>
                  <Input
                    id="position"
                    value={newPerson.position}
                    onChange={(e) => setNewPerson({ ...newPerson, position: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pcReference" className="text-right">
                    PC Reference
                  </Label>
                  <Input
                    id="pcReference"
                    value={newPerson.pcReference}
                    onChange={(e) => setNewPerson({ ...newPerson, pcReference: e.target.value })}
                    className="col-span-3"
                    placeholder="e.g., Serial number or asset tag"
                  />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleAddPerson}>Save</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {people.length === 0 ? (
          <Card>
            <CardContent className="py-10">
              <div className="text-center">
                <h3 className="text-lg font-medium">No people added yet</h3>
                <p className="text-muted-foreground mt-1">
                  Add a person to get started
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>PC Reference</TableHead>
                <TableHead>Assigned Packages</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {people.map((person) => (
                <TableRow key={person.id}>
                  <TableCell className="font-medium">{person.name}</TableCell>
                  <TableCell>{person.email || "-"}</TableCell>
                  <TableCell>{person.department || "-"}</TableCell>
                  <TableCell>{person.position || "-"}</TableCell>
                  <TableCell>
                    {person.pcReference ? (
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-4 w-4 text-muted-foreground" />
                        <span>{person.pcReference}</span>
                      </div>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    {peoplePackages[person.id] || peoplePackages[person.name] ? (
                      <div className="flex flex-col gap-1">
                        {(peoplePackages[person.id] || peoplePackages[person.name])?.map((pkg) => (
                          <div key={pkg.id} className="flex items-center gap-2">
                            <Link href={`/packages/${pkg.id}`} className="text-blue-500 hover:underline">
                              {pkg.name}
                            </Link>
                            {getStatusBadge(pkg.status)}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted-foreground">No packages</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => openAssignDialog(person)}
                            title="Assign package"
                          >
                            <Package className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Assign Package</DialogTitle>
                            <DialogDescription>
                              Assign a package to {currentPersonForAssign?.name}.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="package" className="text-right">
                                Package
                              </Label>
                              <div className="col-span-3">
                                <Select 
                                  value={selectedPackageId} 
                                  onValueChange={setSelectedPackageId}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a package" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {allPackages.map((pkg) => (
                                      <SelectItem key={pkg.id} value={pkg.id}>
                                        {pkg.name} ({pkg.laptop.brand} {pkg.laptop.model})
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                              <Label htmlFor="pcReference" className="text-right">
                                PC Reference
                              </Label>
                              <div className="col-span-3">
                                <Input
                                  id="pcReference"
                                  value={pcReference}
                                  onChange={(e) => setPcReference(e.target.value)}
                                  placeholder="Serial number, asset tag, or reference ID"
                                />
                                <p className="text-xs text-muted-foreground mt-1">
                                  A unique identifier for this person's specific PC
                                </p>
                              </div>
                            </div>
                          </div>
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button 
                                onClick={handleAssignPackage} 
                                disabled={!selectedPackageId || isAssigning}
                              >
                                {isAssigning && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Assign Package
                              </Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => setEditingPerson(person)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Person</DialogTitle>
                            <DialogDescription>
                              Make changes to the person's information.
                            </DialogDescription>
                          </DialogHeader>
                          {editingPerson && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-name" className="text-right">
                                  Name
                                </Label>
                                <Input
                                  id="edit-name"
                                  value={editingPerson.name}
                                  onChange={(e) =>
                                    setEditingPerson({
                                      ...editingPerson,
                                      name: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-email" className="text-right">
                                  Email
                                </Label>
                                <Input
                                  id="edit-email"
                                  value={editingPerson.email || ""}
                                  onChange={(e) =>
                                    setEditingPerson({
                                      ...editingPerson,
                                      email: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-department" className="text-right">
                                  Department
                                </Label>
                                <Input
                                  id="edit-department"
                                  value={editingPerson.department || ""}
                                  onChange={(e) =>
                                    setEditingPerson({
                                      ...editingPerson,
                                      department: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-position" className="text-right">
                                  Position
                                </Label>
                                <Input
                                  id="edit-position"
                                  value={editingPerson.position || ""}
                                  onChange={(e) =>
                                    setEditingPerson({
                                      ...editingPerson,
                                      position: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-pcReference" className="text-right">
                                  PC Reference
                                </Label>
                                <Input
                                  id="edit-pcReference"
                                  value={editingPerson.pcReference || ""}
                                  onChange={(e) =>
                                    setEditingPerson({
                                      ...editingPerson,
                                      pcReference: e.target.value,
                                    })
                                  }
                                  className="col-span-3"
                                  placeholder="Serial number or asset tag"
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <DialogClose asChild>
                              <Button variant="outline">Cancel</Button>
                            </DialogClose>
                            <DialogClose asChild>
                              <Button onClick={handleUpdatePerson}>Save Changes</Button>
                            </DialogClose>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="destructive" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently delete {person.name} and cannot be undone.
                              {peoplePackages[person.id] && peoplePackages[person.id].length > 0 && (
                                <span className="block mt-2 font-semibold text-destructive">
                                  Warning: This person has {peoplePackages[person.id].length} assigned packages.
                                </span>
                              )}
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDeletePerson(person.id)}
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </main>
    </div>
  )
} 