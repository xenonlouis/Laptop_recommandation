"use client"

import { useState, useEffect } from "react"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Plus, Loader2, Users, Package as PackageIcon, Calculator, UserCheck, Trash2, Edit, Eye, X, Layout, List, Grid3X3, Filter, BarChart3, Database, DollarSign, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { getEurToMadRate, formatCurrency as formatCurrencyUtil } from "@/lib/exchange-rates"
import { useToast } from "@/hooks/use-toast"

// Types for new architecture
interface PackageTemplate {
  id: string
  name: string
  description?: string
  profileType: string
  priceType: 'HT' | 'TTC'
  isActive: boolean
  notes?: string
  createdAt: string
  updatedAt: string
  laptop: {
    id: string
    brand: string
    model: string
    price: number
    processor: string
    ram: string
    storage: string
    batteryLife: number
    performanceScore: number
    images: string[]
    supportedProfiles: { profile: string }[]
    supportedOS: { os: string }[]
  }
  accessories: {
    id: string
    name: string
    type: string
    brand: string
    price: number
    image?: string
  }[]
  assignments: PersonAssignment[]
  assignmentCount: number
  totalPrice: number
}

interface PersonAssignment {
  id: string
  status: 'assigned' | 'delivered' | 'returned'
  pcReference?: string
  assignedAt: string
  deliveredAt?: string
  notes?: string
  person: {
    id: string
    name: string
    email?: string
    department?: string
    position?: string
  }
  template?: PackageTemplate
}

interface Person {
  id: string
  name: string
  email?: string
  department?: string
  position?: string
}

export default function PackagesPage() {
  const [activeTab, setActiveTab] = useState("catalog")
  const [templates, setTemplates] = useState<PackageTemplate[]>([])
  const [assignments, setAssignments] = useState<PersonAssignment[]>([])
  const [people, setPeople] = useState<Person[]>([])
  const [laptops, setLaptops] = useState<any[]>([])
  const [accessories, setAccessories] = useState<any[]>([])
  const [profiles, setProfiles] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [eurToMadRate, setEurToMadRate] = useState<{ rate: number; isLive: boolean }>({ rate: 10.80, isLive: false })
  
  // Dialog states
  const [isCreateTemplateOpen, setIsCreateTemplateOpen] = useState(false)
  const [isEditTemplateOpen, setIsEditTemplateOpen] = useState(false)
  const [isViewTemplateOpen, setIsViewTemplateOpen] = useState(false)
  const [isCreateAssignmentOpen, setIsCreateAssignmentOpen] = useState(false)
  const [isEditAssignmentOpen, setIsEditAssignmentOpen] = useState(false)
  const [isBatchAssignmentOpen, setIsBatchAssignmentOpen] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<PackageTemplate | null>(null)
  const [selectedAssignment, setSelectedAssignment] = useState<PersonAssignment | null>(null)
  
  // Form states
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    profileType: 'General',
    laptopId: '',
    priceType: 'HT',
    accessoryIds: [] as string[],
    notes: ''
  })
  
  const [assignmentForm, setAssignmentForm] = useState({
    personId: '',
    templateId: '',
    status: 'assigned',
    pcReference: '',
    notes: ''
  })

  const [batchAssignmentForm, setBatchAssignmentForm] = useState({
    selectedPersonIds: [] as string[],
    templateId: '',
    status: 'assigned' as 'assigned' | 'delivered' | 'returned',
    pcReference: '',
    notes: ''
  })

  // Cost Simulator state
  const [teamConfig, setTeamConfig] = useState<Record<string, number>>({})
  const [simulatorPriceType, setSimulatorPriceType] = useState<'HT' | 'TTC'>('TTC')

  // View and Filter states
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'grid'>('kanban')
  const [filters, setFilters] = useState({
    os: 'all',
    brand: 'all',
    priceRange: [5000, 25000] as [number, number]
  })

  const { toast } = useToast()

  // Utility function to normalize profile names
  const normalizeProfileName = (profileName: string): string => {
    return profileName.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())
  }

  // Load data
  useEffect(() => {
    loadData()
    loadExchangeRate()
  }, [])

  const loadData = async () => {
      try {
        setLoading(true)
      const [templatesRes, assignmentsRes, peopleRes, laptopsRes, accessoriesRes, profilesRes] = await Promise.all([
        fetch('/api/templates'),
        fetch('/api/assignments'),
        fetch('/api/people'),
        fetch('/api/laptops'),
        fetch('/api/accessories'),
        fetch('/api/profiles')
      ])

      if (templatesRes.ok) {
        const templatesData = await templatesRes.json()
        setTemplates(templatesData)
      }

      if (assignmentsRes.ok) {
        const assignmentsData = await assignmentsRes.json()
        console.log('🔗 Loaded assignments:', assignmentsData.length, assignmentsData)
        setAssignments(assignmentsData)
      } else {
        console.error('❌ Assignments API failed:', assignmentsRes.status)
      }

      if (peopleRes.ok) {
        const peopleData = await peopleRes.json()
        setPeople(peopleData)
      }

      if (laptopsRes.ok) {
        const laptopsData = await laptopsRes.json()
        console.log('📱 Loaded laptops:', laptopsData.length)
        setLaptops(laptopsData)
      } else {
        console.error('❌ Laptops API failed:', laptopsRes.status)
      }

      if (accessoriesRes.ok) {
        const accessoriesData = await accessoriesRes.json()
        console.log('🔌 Loaded accessories:', accessoriesData.length)
        setAccessories(accessoriesData)
      } else {
        console.error('❌ Accessories API failed:', accessoriesRes.status)
      }

      if (profilesRes.ok) {
        const profilesData = await profilesRes.json()
        console.log('👥 Loaded profiles:', profilesData.profiles.length)
        setProfiles(profilesData.profiles)
      } else {
        console.error('❌ Profiles API failed:', profilesRes.status)
      }

    } catch (error) {
      console.error('Failed to load data:', error)
      toast({
        title: "Error",
        description: "Failed to load data",

      })
    } finally {
      setLoading(false)
    }
  }

  const loadExchangeRate = async () => {
    try {
      const rate = await getEurToMadRate()
      setEurToMadRate(rate)
    } catch (error) {
      console.error('Failed to load exchange rate:', error)
    }
  }

  const formatCurrency = (amount: number) => {
    return formatCurrencyUtil(amount, 'MAD')
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      assigned: { label: "Assigned", className: "bg-blue-500/10 text-blue-700 border-blue-500/20" },
      delivered: { label: "Delivered", className: "bg-green-500/10 text-green-700 border-green-500/20" },
      returned: { label: "Returned", className: "bg-gray-500/10 text-gray-700 border-gray-500/20" }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.assigned
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>
  }

  const getProfileBadge = (profileType: string) => {
    // Generate dynamic profile config based on available profiles
    const profileConfig: Record<string, { label: string; className: string }> = {}
    
    profiles.forEach(profile => {
      // Generate colors based on profile name
      const colors = [
        "bg-blue-500/10 text-blue-700 border-blue-500/20",
        "bg-green-500/10 text-green-700 border-green-500/20", 
        "bg-purple-500/10 text-purple-700 border-purple-500/20",
        "bg-orange-500/10 text-orange-700 border-orange-500/20",
        "bg-pink-500/10 text-pink-700 border-pink-500/20",
        "bg-indigo-500/10 text-indigo-700 border-indigo-500/20",
        "bg-teal-500/10 text-teal-700 border-teal-500/20",
        "bg-gray-500/10 text-gray-700 border-gray-500/20"
      ]
      
      const colorIndex = profiles.indexOf(profile) % colors.length
      profileConfig[profile] = {
        label: profile,
        className: colors[colorIndex]
      }
    })
    
    const config = profileConfig[profileType] || profileConfig['General'] || { label: profileType, className: "bg-gray-500/10 text-gray-700 border-gray-500/20" }
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>
  }

  // Price conversion utilities
  const VAT_RATE = 0.20 // 20% VAT rate in Morocco
  
  const convertPrice = (price: number, fromType: 'HT' | 'TTC', toType: 'HT' | 'TTC'): number => {
    if (fromType === toType) return price
    
    if (fromType === 'HT' && toType === 'TTC') {
      return price * (1 + VAT_RATE) // Add VAT
    } else if (fromType === 'TTC' && toType === 'HT') {
      return price / (1 + VAT_RATE) // Remove VAT
    }
    
    return price
  }

  const normalizeTemplatePrice = (template: PackageTemplate): number => {
    return convertPrice(template.totalPrice, template.priceType, simulatorPriceType)
  }

  // Cost Simulator calculation functions
  const getDataSourceAnalysis = () => {
    const windowsPackages = templates.filter(t => 
      t.laptop.supportedOS?.some(os => os.os.toLowerCase().includes('windows'))
    )
    const macPackages = templates.filter(t => 
      t.laptop.supportedOS?.some(os => os.os.toLowerCase().includes('mac'))
    )

    const windowsAvg = windowsPackages.length > 0 
      ? windowsPackages.reduce((sum, t) => sum + normalizeTemplatePrice(t), 0) / windowsPackages.length 
      : 0

    const macAvg = macPackages.length > 0 
      ? macPackages.reduce((sum, t) => sum + normalizeTemplatePrice(t), 0) / macPackages.length 
      : 0

    return {
      windows: { count: windowsPackages.length, average: windowsAvg },
      mac: { count: macPackages.length, average: macAvg }
    }
  }

  const getBasePrices = () => {
    const analysis = getDataSourceAnalysis()
    return {
      windows: {
        price: analysis.windows.average,
        eur: analysis.windows.average / eurToMadRate.rate
      },
      mac: {
        price: analysis.mac.average,
        eur: analysis.mac.average / eurToMadRate.rate
      }
    }
  }

  const getProfilePricing = () => {
    return profiles.map(profile => {
      const normalizedProfile = normalizeProfileName(profile)
      const profileTemplates = templates.filter(t => {
        const normalizedTemplateProfile = normalizeProfileName(t.profileType)
        return normalizedTemplateProfile === normalizedProfile || 
          (profile === 'General' && !profiles.filter(p => p !== 'General').some(p => {
            const normalizedP = normalizeProfileName(p)
            return normalizedP === normalizedTemplateProfile
          }))
      })

      const windowsTemplates = profileTemplates.filter(t => 
        t.laptop.supportedOS?.some(os => os.os.toLowerCase().includes('windows'))
      )
      const macTemplates = profileTemplates.filter(t => 
        t.laptop.supportedOS?.some(os => os.os.toLowerCase().includes('mac'))
      )

      const windowsPrice = windowsTemplates.length > 0 
        ? windowsTemplates.reduce((sum, t) => sum + normalizeTemplatePrice(t), 0) / windowsTemplates.length 
        : 0

      const macPrice = macTemplates.length > 0 
        ? macTemplates.reduce((sum, t) => sum + normalizeTemplatePrice(t), 0) / macTemplates.length 
        : 0

      const totalPackages = profileTemplates.length
      const windowsCount = windowsTemplates.length
      const macCount = macTemplates.length

      return {
        profile,
        windowsPrice,
        macPrice,
        windowsEur: windowsPrice / eurToMadRate.rate,
        macEur: macPrice / eurToMadRate.rate,
        windowsCount,
        macCount,
        totalPackages,
        reasoning: `Based on ${totalPackages} real packages (${windowsCount} Windows + ${macCount} Mac)`
      }
    })
  }

  const calculateTotalCost = () => {
    const profilePricing = getProfilePricing()
    let total = 0

    Object.entries(teamConfig).forEach(([profile, quantity]) => {
      if (quantity > 0) {
        const profileData = profilePricing.find(p => p.profile === profile)
        if (profileData) {
          // Use weighted average of Windows and Mac prices based on available packages
          const totalPackages = profileData.windowsCount + profileData.macCount
          if (totalPackages > 0) {
            const weightedPrice = (
              (profileData.windowsPrice * profileData.windowsCount) + 
              (profileData.macPrice * profileData.macCount)
            ) / totalPackages
            total += weightedPrice * quantity
          }
        }
      }
    })

    return total
  }

  // Template Management Functions
  const handleCreateTemplate = async () => {
    try {
      const response = await fetch('/api/templates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateForm),
      })

      if (response.ok) {
        const newTemplate = await response.json()
        setTemplates([...templates, newTemplate])
        setIsCreateTemplateOpen(false)
        resetTemplateForm()
      toast({
          title: "Success",
          description: "Template created successfully",
        })
      } else {
        const error = await response.json()
      toast({
        title: "Error",
          description: error.error || "Failed to create template",
  
        })
      }
    } catch (error) {
      console.error('Failed to create template:', error)
      toast({
        title: "Error",
        description: "Failed to create template",

      })
    }
  }

  const handleEditTemplate = async () => {
    if (!selectedTemplate) return

    try {
      const response = await fetch(`/api/templates/${selectedTemplate.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(templateForm),
      })

      if (response.ok) {
        const updatedTemplate = await response.json()
        setTemplates(templates.map(t => t.id === selectedTemplate.id ? updatedTemplate : t))
        setIsEditTemplateOpen(false)
        resetTemplateForm()
        toast({
          title: "Success",
          description: "Template updated successfully",
      })
      } else {
        const error = await response.json()
      toast({
        title: "Error",
          description: error.error || "Failed to update template",
  
        })
      }
    } catch (error) {
      console.error('Failed to update template:', error)
        toast({
          title: "Error",
        description: "Failed to update template",

      })
    }
  }

  const handleViewTemplate = (template: PackageTemplate) => {
    setSelectedTemplate(template)
    setIsViewTemplateOpen(true)
  }

  const handleEditTemplateClick = (template: PackageTemplate) => {
    setSelectedTemplate(template)
    setTemplateForm({
      name: template.name,
      description: template.description || '',
      profileType: template.profileType,
      laptopId: template.laptop.id,
      priceType: template.priceType,
      accessoryIds: template.accessories.map(a => a.id),
      notes: template.notes || ''
    })
    setIsEditTemplateOpen(true)
  }

  const handleAssignPeople = (template: PackageTemplate) => {
    setSelectedTemplate(template)
    setAssignmentForm({
      personId: '',
      templateId: template.id,
      status: 'assigned',
      pcReference: '',
      notes: ''
    })
    setIsCreateAssignmentOpen(true)
  }

    const handleCreateAssignment = async () => {
    try {
      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignmentForm),
      })

      if (response.ok) {
        const newAssignment = await response.json()
        setAssignments([...assignments, newAssignment])
        
        // Update the template's assignment count
        setTemplates(templates.map(t => 
          t.id === assignmentForm.templateId 
            ? { ...t, assignmentCount: t.assignmentCount + 1, assignments: [...t.assignments, newAssignment] }
            : t
        ))
        
        setIsCreateAssignmentOpen(false)
        setAssignmentForm({
          personId: '',
          templateId: '',
          status: 'assigned',
          pcReference: '',
          notes: ''
        })

      toast({
          title: "Success",
          description: "Person assigned to template successfully",
      })
      } else {
        const error = await response.json()
      toast({
        title: "Error",
          description: error.error || "Failed to create assignment",
  
        })
      }
    } catch (error) {
      console.error('Failed to create assignment:', error)
      toast({
        title: "Error",
        description: "Failed to create assignment",
  
      })
    }
  }

  const handleCreateBatchAssignment = async () => {
    try {
      // Create assignments for all selected people
      const assignmentPromises = batchAssignmentForm.selectedPersonIds.map(personId =>
        fetch('/api/assignments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personId,
            templateId: batchAssignmentForm.templateId,
            status: batchAssignmentForm.status,
            pcReference: batchAssignmentForm.pcReference,
            notes: batchAssignmentForm.notes
          }),
        })
      )

      const responses = await Promise.all(assignmentPromises)
      const newAssignments = await Promise.all(
        responses.map(response => response.json())
      )

      // Check if all assignments were successful
      const successfulAssignments = newAssignments.filter((_, index) => responses[index].ok)
      
      if (successfulAssignments.length > 0) {
        // Update assignments state
        setAssignments([...assignments, ...successfulAssignments])
        
        // Update the template's assignment count and assignments
        setTemplates(templates.map(t => 
          t.id === batchAssignmentForm.templateId 
            ? { 
                ...t, 
                assignmentCount: t.assignmentCount + successfulAssignments.length,
                assignments: [...t.assignments, ...successfulAssignments]
              }
            : t
        ))
        
        setIsBatchAssignmentOpen(false)
        setBatchAssignmentForm({
          selectedPersonIds: [],
          templateId: '',
          status: 'assigned',
          pcReference: '',
          notes: ''
        })
        
        toast({
          title: "Success",
          description: `${successfulAssignments.length} people assigned to template successfully`,
        })
      }

      // Handle any failures
      const failedCount = newAssignments.length - successfulAssignments.length
      if (failedCount > 0) {
        toast({
          title: "Partial Success",
          description: `${successfulAssignments.length} assigned successfully, ${failedCount} failed`,
        })
      }
    } catch (error) {
      console.error('Failed to create batch assignments:', error)
        toast({
          title: "Error",
        description: "Failed to create batch assignments",
      })
    }
  }

  const togglePersonSelection = (personId: string) => {
    setBatchAssignmentForm(prev => ({
      ...prev,
      selectedPersonIds: prev.selectedPersonIds.includes(personId)
        ? prev.selectedPersonIds.filter(id => id !== personId)
        : [...prev.selectedPersonIds, personId]
    }))
  }

  const resetTemplateForm = () => {
    setTemplateForm({
      name: '',
      description: '',
      profileType: profiles.length > 0 ? profiles[0] : 'General',
      laptopId: '',
      priceType: 'HT',
      accessoryIds: [],
      notes: ''
    })
    setSelectedTemplate(null)
  }

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Are you sure you want to delete this template? This action cannot be undone.')) {
      return
    }

    try {
      const response = await fetch(`/api/templates/${templateId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setTemplates(templates.filter(t => t.id !== templateId))
        toast({
          title: "Success",
          description: "Template deleted successfully",
        })
      } else {
        const error = await response.json()
        toast({
          title: "Error",
          description: error.error || "Failed to delete template",
        })
      }
    } catch (error) {
      console.error('Failed to delete template:', error)
        toast({
          title: "Error",
        description: "Failed to delete template",
      })
    }
  }

  const refreshData = async () => {
    console.log('🔄 Manually refreshing data...')
    await loadData()
  }

  // Filter and grouping functions
  const getFilteredTemplates = () => {
    return templates.filter(template => {
      // OS filter
      if (filters.os !== 'all') {
        const hasOS = template.laptop.supportedOS?.some(os => 
          os.os.toLowerCase() === filters.os.toLowerCase()
        )
        if (!hasOS) return false
      }

      // Brand filter
      if (filters.brand !== 'all') {
        if (template.laptop.brand.toLowerCase() !== filters.brand.toLowerCase()) return false
      }

      // Price range filter
      const price = template.totalPrice
      if (price < filters.priceRange[0] || price > filters.priceRange[1]) return false

      return true
    })
  }

  const getTemplatesByProfile = () => {
    const filteredTemplates = getFilteredTemplates()
    const grouped: Record<string, PackageTemplate[]> = {}
    
    profiles.forEach(profile => {
      // Normalize profile name for case-insensitive matching
      const normalizedProfile = normalizeProfileName(profile)
      grouped[profile] = filteredTemplates.filter(t => {
        const normalizedTemplateProfile = normalizeProfileName(t.profileType)
        return normalizedTemplateProfile === normalizedProfile
      })
    })
    
    // Add unassigned templates (those that don't match any normalized profile)
    grouped['unassigned'] = filteredTemplates.filter(t => {
      const normalizedTemplateProfile = normalizeProfileName(t.profileType)
      return !profiles.some(profile => {
        const normalizedProfile = normalizeProfileName(profile)
        return normalizedProfile === normalizedTemplateProfile
      })
    })
    
    return grouped
  }

  const clearFilters = () => {
    setFilters({
      os: 'all',
      brand: 'all',
      priceRange: [5000, 25000]
    })
  }

  // Get unique values for filter options
  const getUniqueOS = () => {
    const osSet = new Set<string>()
    templates.forEach(template => {
      template.laptop.supportedOS?.forEach(os => osSet.add(os.os))
    })
    return Array.from(osSet).sort()
  }

  const getUniqueBrands = () => {
    const brandSet = new Set<string>()
    templates.forEach(template => {
      brandSet.add(template.laptop.brand)
    })
    return Array.from(brandSet).sort()
  }

  // Assignment Management Functions
  const handleUpdateAssignmentStatus = async (assignmentId: string, status: string) => {
    try {
      const response = await fetch(`/api/assignments/${assignmentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        const updatedAssignment = await response.json()
        setAssignments(assignments.map(a => 
          a.id === assignmentId ? updatedAssignment : a
        ))
      toast({
          title: "Success",
          description: "Assignment updated successfully",
      })
      } else {
        const error = await response.json()
      toast({
        title: "Error",
          description: error.error || "Failed to update assignment",
  
        })
      }
    } catch (error) {
      console.error('Failed to update assignment:', error)
      toast({
        title: "Error",
        description: "Failed to update assignment",

      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto py-6">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="h-6 border-l border-border" />
            <h1 className="text-2xl font-bold">IT Package Management</h1>
          </div>
          
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="h-6 border-l border-border" />
            <h1 className="text-2xl font-bold">IT Package Management</h1>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Exchange Rate:</span>  
            <span className="font-medium">1 EUR = {eurToMadRate.rate} MAD</span>
            {eurToMadRate.isLive ? (
              <Badge variant="outline" className="bg-green-500/10 text-green-700 border-green-500/20">Live</Badge>
            ) : (
              <Badge variant="outline" className="bg-orange-500/10 text-orange-700 border-orange-500/20">Fallback</Badge>
            )}
        </div>
        </div>



        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="catalog" className="flex items-center gap-2">
              <PackageIcon className="w-4 h-4" />
              Package Catalog
              <Badge variant="secondary" className="ml-1">{templates.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="assignments" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Assignment Dashboard  
              <Badge variant="secondary" className="ml-1">{assignments.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="simulator" className="flex items-center gap-2">
              <Calculator className="w-4 h-4" />
              Cost Simulator
            </TabsTrigger>
          </TabsList>

                    {/* Package Catalog Tab */}
          <TabsContent value="catalog">
            <div className="space-y-6">
              {/* Header with View Controls */}
              <div className="flex items-center justify-between">
          <div>
                  <h2 className="text-xl font-semibold">Package Catalog</h2>
                  <p className="text-muted-foreground">Browse and manage IT packages organized by profile types.</p>
          </div>
                <div className="flex items-center gap-2">
                  {/* View Toggle Buttons */}
                  <div className="flex items-center border rounded-lg p-1">
                    <Button
                      variant={viewMode === 'kanban' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('kanban')}
                      className="h-8 px-3"
                    >
                      <Layout className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('list')}
                      className="h-8 px-3"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                      size="sm"
                      onClick={() => setViewMode('grid')}
                      className="h-8 px-3"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button onClick={() => setIsCreateTemplateOpen(true)}>
                    <Plus className="w-4 h-4 mr-2" />
            Add Package
          </Button>
                </div>
        </div>

              {/* Filters Section */}
              <div className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
              </div>
                
                <Select value={filters.os} onValueChange={(value) => setFilters({...filters, os: value})}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All OS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All OS</SelectItem>
                    {getUniqueOS().map(os => (
                      <SelectItem key={os} value={os}>{os}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={filters.brand} onValueChange={(value) => setFilters({...filters, brand: value})}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="All Brands" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    {getUniqueBrands().map(brand => (
                      <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center gap-2">
                  <span className="text-sm">Price:</span>
                  <span className="text-xs text-muted-foreground min-w-[120px]">
                    {formatCurrency(filters.priceRange[0])} - {formatCurrency(filters.priceRange[1])}
                  </span>
                  <Slider
                    value={filters.priceRange}
                    onValueChange={(value) => setFilters({...filters, priceRange: value as [number, number]})}
                    max={30000}
                    min={3000}
                    step={1000}
                    className="w-32"
                  />
                </div>

                <Button variant="outline" size="sm" onClick={clearFilters}>
                  Clear
                </Button>
              </div>

              {/* Kanban View */}
              {viewMode === 'kanban' && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {Object.entries(getTemplatesByProfile()).map(([profileKey, profileTemplates]) => {
                    // Generate dynamic profile config
                    const colors = [
                      'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300',
                      'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300',
                      'bg-purple-500/10 border-purple-500/20 text-purple-700 dark:text-purple-300',
                      'bg-orange-500/10 border-orange-500/20 text-orange-700 dark:text-orange-300',
                      'bg-pink-500/10 border-pink-500/20 text-pink-700 dark:text-pink-300',
                      'bg-indigo-500/10 border-indigo-500/20 text-indigo-700 dark:text-indigo-300',
                      'bg-teal-500/10 border-teal-500/20 text-teal-700 dark:text-teal-300',
                      'bg-gray-500/10 border-gray-500/20 text-gray-700 dark:text-gray-300'
                    ]
                    
                    const icons = ['💻', '🎯', '⚡', '🔧', '📊', '🎨', '🚀', '📦']
                    
                    const colorIndex = Object.keys(getTemplatesByProfile()).indexOf(profileKey) % colors.length
                    const iconIndex = Object.keys(getTemplatesByProfile()).indexOf(profileKey) % icons.length
                    
                    const config = {
                      title: profileKey === 'unassigned' ? 'Unassigned' : profileKey,
                      description: profileKey === 'unassigned' 
                        ? 'Packages without specific profile assignment'
                        : `Packages for ${profileKey} profile`,
                      icon: icons[iconIndex],
                      className: colors[colorIndex]
                    }
                    const totalAssigned = profileTemplates.reduce((sum, t) => sum + t.assignmentCount, 0)

                    return (
                      <div key={profileKey} className={`rounded-lg border-2 p-4 ${config.className}`}>
                        {/* Column Header */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{config.icon}</span>
                            <div>
                              <h3 className="font-semibold">{config.title}</h3>
                              <p className="text-xs opacity-80">{config.description}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="bg-background/50">
                              {profileTemplates.length} configs
                            </Badge>
                            <Badge variant="outline" className="bg-background/50">
                              {totalAssigned} assigned
                            </Badge>
                          </div>
                        </div>

                        {/* Template Cards */}
                        <div className="space-y-3">
                          {profileTemplates.map((template) => (
                            <Card key={template.id} className="bg-background/80 hover:bg-background transition-colors">
                              <CardContent className="p-4">
                                {/* Template Name & Assignment Count */}
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex-1">
                                    <h4 className="font-medium text-sm">{template.name}</h4>
                                    <p className="text-xs text-muted-foreground mt-1">
                                      {template.assignmentCount} people assigned
                                    </p>
                                  </div>
                                </div>

                                {/* Laptop Info */}
                                <div className="flex items-center gap-3 mb-3">
                                  {template.laptop.images[0] && (
                                    <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                                      <Image
                                        src={template.laptop.images[0]}
                                        alt={`${template.laptop.brand} ${template.laptop.model}`}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover"
                                      />
                                    </div>
                                  )}
                                  <div className="flex-1 min-w-0">
                                    <h5 className="font-medium text-xs truncate">
                                      {template.laptop.brand} {template.laptop.model}
                                    </h5>
                                    <p className="text-xs text-muted-foreground truncate">
                                      {template.laptop.processor}
                                    </p>
                                  </div>
                                </div>

                                {/* Accessories */}
                                <div className="mb-3 min-h-[20px]">
                                  {template.accessories.length > 0 ? (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <span>🔌</span>
                                      <span>{template.accessories.length} accessories</span>
          </div>
        ) : (
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                      <span>📦</span>
                                      <span>No accessories</span>
                                    </div>
                                  )}
                                </div>

                                {/* Assigned People Avatars */}
                                {template.assignments.length > 0 && (
                                  <div className="flex items-center gap-2 mb-3">
                                    <span className="text-xs text-muted-foreground">Assigned to:</span>
                                    <div className="flex items-center -space-x-1">
                                      <TooltipProvider>
                                        {template.assignments.slice(0, 3).map((assignment, index) => (
                                          <Tooltip key={assignment.id}>
                                            <TooltipTrigger asChild>
                                              <div className="w-7 h-7 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300 ring-2 ring-background">
                                                <span className="leading-none block transform translate-y-[0.5px]">
                                                  {assignment.person.name?.charAt(0).toUpperCase() || '?'}
                                                </span>
                                              </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <p>{assignment.person.name}</p>
                                            </TooltipContent>
                                          </Tooltip>
                                        ))}
                                        {template.assignments.length > 3 && (
                                          <Tooltip>
                                            <TooltipTrigger asChild>
                                              <div className="w-7 h-7 bg-muted border border-border rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground ring-2 ring-background">
                                                <span className="leading-none block transform translate-y-[0.5px]">
                                                  +{template.assignments.length - 3}
                                                </span>
                                              </div>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                              <div className="space-y-1">
                                                {template.assignments.slice(3).map((assignment) => (
                                                  <p key={assignment.id}>{assignment.person.name}</p>
                                                ))}
                                              </div>
                                            </TooltipContent>
                                          </Tooltip>
                                        )}
                                      </TooltipProvider>
                                    </div>
                                  </div>
                                )}

                                {/* Price & Actions */}
                                <div className="flex items-center justify-between">
                                  <div className="text-sm font-semibold">
                                    {formatCurrency(template.totalPrice)}
                                    <span className="text-xs text-muted-foreground ml-1">
                                      {template.priceType}
                                    </span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 px-2 text-xs"
                                      onClick={() => handleAssignPeople(template)}
                                    >
                                      <Users className="w-3 h-3 mr-1" />
                                      Assign
                                    </Button>

                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0"
                                      onClick={() => handleViewTemplate(template)}
                                    >
                                      <Eye className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0"
                                      onClick={() => handleEditTemplateClick(template)}
                                    >
                                      <Edit className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                      onClick={() => handleDeleteTemplate(template.id)}
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}

                          {profileTemplates.length === 0 && (
                            <div className="text-center py-8 text-muted-foreground">
                              <PackageIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
                              <p className="text-xs">No templates in this category</p>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* List View */}
              {viewMode === 'list' && (
                <Card>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Package</TableHead>
                        <TableHead>Laptop</TableHead>
                        <TableHead>Profile</TableHead>
                        <TableHead>Accessories</TableHead>
                        <TableHead>Assigned</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {getFilteredTemplates().map((template) => (
                        <TableRow key={template.id}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{template.name}</p>
                              <p className="text-sm text-muted-foreground">{template.description}</p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {template.laptop.images[0] && (
                                <div className="w-8 h-8 bg-muted rounded overflow-hidden">
                                  <Image
                                    src={template.laptop.images[0]}
                                    alt={template.laptop.brand}
                                    width={32}
                                    height={32}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                              <div>
                                <p className="font-medium text-sm">{template.laptop.brand} {template.laptop.model}</p>
                                <p className="text-xs text-muted-foreground">{template.laptop.processor}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            {getProfileBadge(template.profileType)}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {template.accessories.slice(0, 2).map((acc) => (
                                <Badge key={acc.id} variant="outline" className="text-xs">
                                  {acc.name}
                                </Badge>
                              ))}
                              {template.accessories.length > 2 && (
                                <Badge variant="outline" className="text-xs">
                                  +{template.accessories.length - 2}
                                </Badge>
                              )}
                    </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {template.assignments.slice(0, 3).map((assignment, index) => (
                                <div key={assignment.id} className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center text-xs font-medium">
                                  {assignment.person.name?.charAt(0).toUpperCase()}
                                </div>
                              ))}
                              {template.assignments.length > 3 && (
                                <Badge variant="secondary" className="text-xs">
                                  +{template.assignments.length - 3}
                                </Badge>
                              )}
            </div>
                          </TableCell>
                          <TableCell className="font-semibold">
                            {formatCurrency(template.totalPrice)}
                            <span className="text-xs text-muted-foreground ml-1 font-normal">
                              {template.priceType}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm" onClick={() => handleAssignPeople(template)}>
                                <Users className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleViewTemplate(template)}>
                                <Eye className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm" onClick={() => handleEditTemplateClick(template)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                onClick={() => handleDeleteTemplate(template.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              )}

              {/* Grid View */}
              {viewMode === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {getFilteredTemplates().map((template) => (
                    <Card key={template.id} className="overflow-hidden">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm truncate">{template.name}</h4>
                            {getProfileBadge(template.profileType)}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 mb-3">
                          {template.laptop.images[0] && (
                            <div className="w-12 h-12 bg-muted rounded-lg overflow-hidden">
                              <Image
                                src={template.laptop.images[0]}
                                alt={template.laptop.brand}
                                width={48}
                                height={48}
                                className="w-full h-full object-cover"
                  />
                </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-xs truncate">
                              {template.laptop.brand} {template.laptop.model}
                            </p>
                            <p className="text-xs text-muted-foreground truncate">
                              {template.laptop.processor}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm mb-3">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">{template.assignmentCount}</span>
                          </div>
                          <div className="font-semibold">
                            {formatCurrency(template.totalPrice)}
                            <span className="text-xs text-muted-foreground ml-1 font-normal">
                              {template.priceType}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-1 pt-2 border-t">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 px-2 text-xs flex-1"
                            onClick={() => handleAssignPeople(template)}
                          >
                            <Users className="w-3 h-3 mr-1" />
                            Assign
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => handleViewTemplate(template)}
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0"
                            onClick={() => handleEditTemplateClick(template)}
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 w-7 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => handleDeleteTemplate(template.id)}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {getFilteredTemplates().length === 0 && (
                <div className="text-center py-12">
                  <PackageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No templates found</h3>
                  <p className="text-muted-foreground mb-4">
                    {templates.length === 0 ? "Create your first package template to get started" : "Try adjusting your filters"}
                  </p>
                  {templates.length === 0 ? (
                    <Button onClick={() => setIsCreateTemplateOpen(true)}>
                      <Plus className="w-4 h-4 mr-2" />
                      Create Template
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={clearFilters}>
                      Clear Filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </TabsContent>

          {/* Assignment Dashboard Tab */}
          <TabsContent value="assignments">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Assignment Dashboard</h2>
                  <p className="text-muted-foreground">Track who has which package templates</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline"
                    onClick={() => {
                      setSelectedTemplate(null)
                      setBatchAssignmentForm({
                        selectedPersonIds: [],
                        templateId: '',
                        status: 'assigned',
                        pcReference: '',
                        notes: ''
                      })
                      setIsBatchAssignmentOpen(true)
                    }}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Batch Assignment
                  </Button>
                  <Button onClick={() => {
                    setSelectedTemplate(null)
                    setAssignmentForm({
                      personId: '',
                      templateId: '',
                      status: 'assigned',
                      pcReference: '',
                      notes: ''
                    })
                    setIsCreateAssignmentOpen(true)
                  }}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Assignment
                  </Button>
                </div>
              </div>

              {/* Assignments Table */}
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Person</TableHead>
                      <TableHead>Template</TableHead>
                      <TableHead>Profile</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Assigned Date</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{assignment.person.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {assignment.person.department}
                            </p>
              </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{assignment.template?.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {assignment.template?.laptop.brand} {assignment.template?.laptop.model}
                            </p>
              </div>
                        </TableCell>
                        <TableCell>
                          {assignment.template && getProfileBadge(assignment.template.profileType)}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(assignment.status)}
                        </TableCell>
                        <TableCell>
                          {new Date(assignment.assignedAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {assignment.template && formatCurrency(assignment.template.totalPrice)}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                  <Select
                              value={assignment.status}
                              onValueChange={(status) => handleUpdateAssignmentStatus(assignment.id, status)}
                  >
                              <SelectTrigger className="w-32">
                                <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                                <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                                <SelectItem value="returned">Returned</SelectItem>
                    </SelectContent>
                  </Select>
                            <Button variant="ghost" size="sm">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Card>

              {assignments.length === 0 && (
                <div className="text-center py-12">
                  <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No assignments found</h3>
                  <p className="text-muted-foreground mb-4">
                    Assign templates to people to get started
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assignment
                  </Button>
                </div>
              )}
              </div>
          </TabsContent>

          {/* Cost Simulator Tab */}
          <TabsContent value="simulator">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Cost Simulator</h2>
                <p className="text-muted-foreground">
                  Calculate costs based on template quantities and team profiles
                </p>
              </div>

              {/* Team Configuration */}
              <Card>
                <div className="p-6 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Team Configuration</h3>
                      <p className="text-sm text-muted-foreground">
                        Specify how many people you need for each profile type
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Label htmlFor="priceTypeSelector" className="text-sm font-medium">
                        Price Type:
                      </Label>
                      <Select 
                        value={simulatorPriceType} 
                        onValueChange={(value: 'HT' | 'TTC') => setSimulatorPriceType(value)}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="HT">HT</SelectItem>
                          <SelectItem value="TTC">TTC</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {profiles.map((profile) => (
                      <div key={profile} className="space-y-2">
                        <Label htmlFor={profile} className="text-sm font-medium">
                          {profile}
                        </Label>
                        <Input
                          id={profile}
                          type="number"
                          min="0"
                          value={teamConfig[profile] || 0}
                          onChange={(e) => setTeamConfig({
                            ...teamConfig,
                            [profile]: parseInt(e.target.value) || 0
                          })}
                          placeholder="0"
                          className="w-full"
                        />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 bg-muted/20 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">Total Team Size</h4>
                        <p className="text-sm text-muted-foreground">
                          {Object.values(teamConfig).reduce((sum, qty) => sum + qty, 0)} people
                        </p>
                      </div>
                      <div className="text-right">
                        <h4 className="font-medium">Estimated Total Cost ({simulatorPriceType})</h4>
                        <p className="text-lg font-bold text-primary">
                          {formatCurrency(calculateTotalCost())}
                        </p>
                        {simulatorPriceType === 'HT' && (
                          <p className="text-xs text-muted-foreground">
                            +20% VAT = {formatCurrency(calculateTotalCost() * 1.20)} TTC
                          </p>
                        )}
                        {simulatorPriceType === 'TTC' && (
                          <p className="text-xs text-muted-foreground">
                            -20% VAT = {formatCurrency(calculateTotalCost() / 1.20)} HT
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Calculation Details */}
              <Card>
                <div className="p-6 border-b">
                  <div className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5" />
                    <h3 className="text-lg font-semibold">Pricing Calculation Details</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Transparent breakdown of how unit prices are calculated from your actual package data.
                    All prices below are normalized to <strong>{simulatorPriceType}</strong> using 20% VAT conversion.
                  </p>
                </div>
                
                <CardContent className="p-6 space-y-6">
                  {/* Data Source Analysis */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Database className="w-4 h-4" />
                      <h4 className="font-medium">Data Source Analysis</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      How we identify and categorize your packages. Note: Your templates may have mixed price types (HT/TTC).
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-2">Windows Packages</h5>
                        <p className="text-sm text-muted-foreground mb-2">
                          Packages with non-Apple laptops
                        </p>
                        <div className="text-2xl font-bold text-blue-600">
                          {getDataSourceAnalysis().windows.count}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Average: {formatCurrency(getDataSourceAnalysis().windows.average)} {simulatorPriceType}
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-2">Mac Packages</h5>
                        <p className="text-sm text-muted-foreground mb-2">
                          Packages with Apple laptops
                        </p>
                        <div className="text-2xl font-bold text-green-600">
                          {getDataSourceAnalysis().mac.count}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Average: {formatCurrency(getDataSourceAnalysis().mac.average)} {simulatorPriceType}
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-2">Price Types</h5>
                        <p className="text-sm text-muted-foreground mb-2">
                          Template price distribution
                        </p>
                        <div className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>HT Templates:</span>
                            <span className="font-medium">{templates.filter(t => t.priceType === 'HT').length}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>TTC Templates:</span>
                            <span className="font-medium">{templates.filter(t => t.priceType === 'TTC').length}</span>
                          </div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          All converted to {simulatorPriceType}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Base Prices */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <DollarSign className="w-4 h-4" />
                      <h4 className="font-medium">Base Prices (Before Profile Adjustments)</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Foundation prices calculated from your package data
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-2">Windows Base Price</h5>
                        <div className="text-2xl font-bold text-blue-600">
                          {formatCurrency(getBasePrices().windows.price)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getBasePrices().windows.eur.toFixed(0)} EUR • {simulatorPriceType}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Calculated from your data
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <h5 className="font-medium mb-2">Mac Base Price</h5>
                        <div className="text-2xl font-bold text-green-600">
                          {formatCurrency(getBasePrices().mac.price)}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {getBasePrices().mac.eur.toFixed(0)} EUR • {simulatorPriceType}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Calculated from your data
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Real Profile-Based Pricing */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <Users className="w-4 h-4" />
                      <h4 className="font-medium">Real Profile-Based Pricing</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Actual average prices calculated from packages assigned to each profile (no artificial multipliers).
                      All prices are shown in <strong>{simulatorPriceType}</strong> format with automatic VAT conversion (20%).
                    </p>
                    
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-3 font-medium">Profile</th>
                            <th className="text-left p-3 font-medium">Windows Price ({simulatorPriceType})</th>
                            <th className="text-left p-3 font-medium">Mac Price ({simulatorPriceType})</th>
                            <th className="text-left p-3 font-medium">Reasoning</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getProfilePricing().map((profile) => (
                            <tr key={profile.profile} className="border-b hover:bg-muted/20">
                              <td className="p-3 font-medium">{profile.profile}</td>
                              <td className="p-3">
                                <div className="font-semibold">
                                  {formatCurrency(profile.windowsPrice)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {profile.windowsEur.toFixed(0)} EUR
                                </div>
                                <div className="text-xs text-blue-600">
                                  {profile.windowsCount} packages
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="font-semibold">
                                  {formatCurrency(profile.macPrice)}
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  {profile.macEur.toFixed(0)} EUR
                                </div>
                                <div className="text-xs text-green-600">
                                  {profile.macCount} packages
                                </div>
                              </td>
                              <td className="p-3">
                                <div className="text-sm text-muted-foreground">
                                  {profile.reasoning}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Currency Conversion & VAT */}
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <RefreshCw className="w-4 h-4" />
                      <h4 className="font-medium">Currency Conversion & VAT</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Exchange rate used for EUR calculations and VAT conversion details
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 border rounded-lg bg-muted/20">
                        <h5 className="font-medium mb-2">Exchange Rate</h5>
                        <div className="text-lg font-bold">
                          1 EUR = {eurToMadRate.rate.toFixed(2)} MAD
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {eurToMadRate.isLive ? 'Updated from live exchange rate API' : 'Using fallback rate'}
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          {eurToMadRate.isLive ? (
                            <Badge className="bg-green-500/10 text-green-700 border-green-500/20">
                              Live Rate
                            </Badge>
                          ) : (
                            <Badge className="bg-yellow-500/10 text-yellow-700 border-yellow-500/20">
                              Fallback Rate
                            </Badge>
                          )}
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={loadExchangeRate}
                          >
                            <RefreshCw className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="p-4 border rounded-lg bg-muted/20">
                        <h5 className="font-medium mb-2">VAT Conversion</h5>
                        <div className="text-lg font-bold">
                          20% VAT Rate (Morocco)
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          Used for HT ↔ TTC conversion
                        </div>
                        <div className="space-y-1 text-sm">
                          <div>TTC = HT × 1.20</div>
                          <div>HT = TTC ÷ 1.20</div>
                        </div>
                        <div className="text-xs text-muted-foreground mt-2">
                          Templates with mixed price types are automatically converted
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Create Template Dialog */}
        <Dialog open={isCreateTemplateOpen} onOpenChange={setIsCreateTemplateOpen}>
          <DialogContent className="max-w-2xl">
          <DialogHeader>
              <DialogTitle>Create New Template</DialogTitle>
              <DialogDescription>
                Create a new package template for your IT catalog
              </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Template Name</Label>
              <Input
                    id="name"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                    placeholder="Developer Workstation"
              />
            </div>
                <div>
                  <Label htmlFor="profileType">Profile Type</Label>
              <Select
                    value={templateForm.profileType} 
                    onValueChange={(value) => setTemplateForm({...templateForm, profileType: value})}
              >
                <SelectTrigger>
                      <SelectValue />
                </SelectTrigger>
                <SelectContent>
                      {profiles.map((profile) => (
                        <SelectItem key={profile} value={profile}>
                          {profile}
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
                </div>
            </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={templateForm.description}
                  onChange={(e) => setTemplateForm({...templateForm, description: e.target.value})}
                  placeholder="High-performance setup for developers"
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                                <div>
                  <Label htmlFor="laptop">Laptop ({laptops.length} available)</Label>
              <Select
                    value={templateForm.laptopId} 
                    onValueChange={(value) => setTemplateForm({...templateForm, laptopId: value})}
              >
                <SelectTrigger>
                      <SelectValue placeholder={laptops.length > 0 ? "Select laptop" : "Loading laptops..."} />
                </SelectTrigger>
                <SelectContent>
                      {laptops.length > 0 ? (
                        laptops.map((laptop) => (
                    <SelectItem key={laptop.id} value={laptop.id}>
                            {laptop.brand} {laptop.model}
                    </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-laptops" disabled>
                          No laptops available
                        </SelectItem>
                      )}
                </SelectContent>
              </Select>
                </div>
                <div>
                  <Label htmlFor="priceType">Price Type</Label>
                <Select
                    value={templateForm.priceType} 
                    onValueChange={(value) => setTemplateForm({...templateForm, priceType: value})}
                >
                  <SelectTrigger>
                      <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem value="HT">HT (Excluding Tax)</SelectItem>
                      <SelectItem value="TTC">TTC (Including Tax)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

                            <div>
                <Label>Accessories ({accessories.length} available)</Label>
                <div className="max-h-32 overflow-y-auto border rounded p-2 space-y-2">
                  {accessories.length > 0 ? (
                    accessories.map((accessory) => (
                      <div key={accessory.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={accessory.id}
                          checked={templateForm.accessoryIds.includes(accessory.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setTemplateForm({
                                ...templateForm,
                                accessoryIds: [...templateForm.accessoryIds, accessory.id]
                              })
                            } else {
                              setTemplateForm({
                                ...templateForm,
                                accessoryIds: templateForm.accessoryIds.filter(id => id !== accessory.id)
                              })
                            }
                          }}
                        />
                        <Label htmlFor={accessory.id} className="text-sm">
                          {accessory.name} - {formatCurrency(accessory.price)}
                        </Label>
                      </div>
                    ))
                  ) : (
                    <p className="text-sm text-muted-foreground py-4 text-center">
                      {loading ? "Loading accessories..." : "No accessories available"}
                    </p>
                  )}
                </div>
              </div>
            </div>

                      <DialogFooter>
              <Button variant="outline" onClick={refreshData}>
                🔄 Refresh Data
              </Button>
              <Button variant="outline" onClick={() => setIsCreateTemplateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTemplate}>
                Create Template
              </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

        {/* Edit Template Dialog */}
        <Dialog open={isEditTemplateOpen} onOpenChange={setIsEditTemplateOpen}>
          <DialogContent className="max-w-2xl">
              <DialogHeader>
              <DialogTitle>Edit Template</DialogTitle>
                <DialogDescription>
                Update the package template details
                </DialogDescription>
              </DialogHeader>

            <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-name">Template Name</Label>
                <Input
                    id="edit-name"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm({...templateForm, name: e.target.value})}
                />
              </div>
                <div>
                  <Label htmlFor="edit-profileType">Profile Type</Label>
                <Select
                    value={templateForm.profileType} 
                    onValueChange={(value) => setTemplateForm({...templateForm, profileType: value})}
                >
                  <SelectTrigger>
                      <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                      {profiles.map((profile) => (
                        <SelectItem key={profile} value={profile}>
                          {profile}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={templateForm.description}
                  onChange={(e) => setTemplateForm({...templateForm, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-laptop">Laptop</Label>
                <Select
                    value={templateForm.laptopId} 
                    onValueChange={(value) => setTemplateForm({...templateForm, laptopId: value})}
                >
                  <SelectTrigger>
                      <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                      {laptops.map((laptop) => (
                        <SelectItem key={laptop.id} value={laptop.id}>
                          {laptop.brand} {laptop.model}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="edit-priceType">Price Type</Label>
                  <Select
                    value={templateForm.priceType} 
                    onValueChange={(value) => setTemplateForm({...templateForm, priceType: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HT">HT (Excluding Tax)</SelectItem>
                      <SelectItem value="TTC">TTC (Including Tax)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

              <div>
                <Label>Accessories</Label>
                <div className="max-h-32 overflow-y-auto border rounded p-2 space-y-2">
                  {accessories.map((accessory) => (
                    <div key={accessory.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`edit-${accessory.id}`}
                        checked={templateForm.accessoryIds.includes(accessory.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setTemplateForm({
                              ...templateForm,
                              accessoryIds: [...templateForm.accessoryIds, accessory.id]
                            })
                          } else {
                            setTemplateForm({
                              ...templateForm,
                              accessoryIds: templateForm.accessoryIds.filter(id => id !== accessory.id)
                            })
                          }
                        }}
                      />
                      <Label htmlFor={`edit-${accessory.id}`} className="text-sm">
                        {accessory.name} - {formatCurrency(accessory.price)}
                      </Label>
              </div>
                  ))}
            </div>
            </div>
          </div>

          <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditTemplateOpen(false)}>
              Cancel
            </Button>
              <Button onClick={handleEditTemplate}>
                Update Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

        {/* View Template Dialog */}
        <Dialog open={isViewTemplateOpen} onOpenChange={setIsViewTemplateOpen}>
          <DialogContent className="max-w-2xl">
              <DialogHeader>
              <DialogTitle>{selectedTemplate?.name}</DialogTitle>
                <DialogDescription>
                {selectedTemplate?.description}
                </DialogDescription>
              </DialogHeader>

            {selectedTemplate && (
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  {selectedTemplate.laptop.images[0] && (
                    <div className="w-20 h-20 bg-muted rounded-lg overflow-hidden">
                        <Image
                        src={selectedTemplate.laptop.images[0]}
                        alt={`${selectedTemplate.laptop.brand} ${selectedTemplate.laptop.model}`}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                        />
                      </div>
                  )}
                      <div>
                    <h3 className="font-semibold">
                      {selectedTemplate.laptop.brand} {selectedTemplate.laptop.model}
                    </h3>
                        <p className="text-sm text-muted-foreground">
                      {selectedTemplate.laptop.processor}
                        </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedTemplate.laptop.ram} • {selectedTemplate.laptop.storage}
                        </p>
                    <div className="flex items-center gap-2 mt-2">
                      {getProfileBadge(selectedTemplate.profileType)}
                      <Badge variant="outline">
                        {selectedTemplate.priceType}
                      </Badge>
                      </div>
                    </div>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Accessories ({selectedTemplate.accessories.length})</h4>
                  {selectedTemplate.accessories.length > 0 ? (
                    <div className="space-y-2">
                      {selectedTemplate.accessories.map((accessory) => (
                        <div key={accessory.id} className="flex items-center justify-between text-sm">
                          <span>{accessory.name}</span>
                          <span>{formatCurrency(accessory.price)}</span>
                              </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No accessories included</p>
                            )}
                          </div>

                <div className="flex items-center justify-between font-semibold">
                  <span>Total Price:</span>
                  <span>{formatCurrency(selectedTemplate.totalPrice)}</span>
                            </div>

                <div>
                  <h4 className="font-medium mb-2">Assignments ({selectedTemplate.assignmentCount})</h4>
                  {selectedTemplate.assignments.length > 0 ? (
                    <div className="space-y-2">
                      {selectedTemplate.assignments.map((assignment) => (
                        <div key={assignment.id} className="flex items-center justify-between text-sm">
                          <span>{assignment.person.name}</span>
                          {getStatusBadge(assignment.status)}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">No current assignments</p>
                  )}
                  </div>
                  </div>
          )}

                      <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewTemplateOpen(false)}>
                    Close
                  </Button>
              </DialogFooter>
        </DialogContent>
      </Dialog>

        {/* Create Assignment Dialog */}
        <Dialog open={isCreateAssignmentOpen} onOpenChange={setIsCreateAssignmentOpen}>
          <DialogContent className="max-w-md">
          <DialogHeader>
              <DialogTitle>
                {selectedTemplate ? 'Assign Person to Template' : 'Create New Assignment'}
              </DialogTitle>
              <DialogDescription>
                {selectedTemplate 
                  ? `Assign a person to ${selectedTemplate.name}`
                  : 'Assign a person to a package template'
                }
              </DialogDescription>
          </DialogHeader>

            <div className="grid gap-4 py-4">
              {!selectedTemplate && (
                <div>
                  <Label htmlFor="template">Template</Label>
                <Select
                    value={assignmentForm.templateId} 
                    onValueChange={(value) => setAssignmentForm({...assignmentForm, templateId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select template" />
                  </SelectTrigger>
                  <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name} - {formatCurrency(template.totalPrice)} {template.priceType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                    </div>
                  )}

              <div>
                <Label htmlFor="person">Person</Label>
                  <Select
                  value={assignmentForm.personId} 
                  onValueChange={(value) => setAssignmentForm({...assignmentForm, personId: value})}
                  >
                    <SelectTrigger>
                    <SelectValue placeholder="Select person" />
                    </SelectTrigger>
                    <SelectContent>
                    {people.map((person) => (
                      <SelectItem key={person.id} value={person.id}>
                        {person.name} {person.email && `(${person.email})`}
                      </SelectItem>
                    ))}
                    </SelectContent>
                  </Select>
                </div>

              <div>
                <Label htmlFor="status">Status</Label>
                  <Select
                  value={assignmentForm.status} 
                  onValueChange={(value) => setAssignmentForm({...assignmentForm, status: value})}
                  >
                    <SelectTrigger>
                    <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                    <SelectItem value="assigned">Assigned</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                    </SelectContent>
                  </Select>
              </div>

              <div>
                <Label htmlFor="pcReference">PC Reference (Optional)</Label>
                  <Input
                  id="pcReference"
                  value={assignmentForm.pcReference}
                  onChange={(e) => setAssignmentForm({...assignmentForm, pcReference: e.target.value})}
                  placeholder="PC-001, LAP-123, etc."
                />
              </div>

              <div>
                <Label htmlFor="assignmentNotes">Notes (Optional)</Label>
                <Textarea
                  id="assignmentNotes"
                  value={assignmentForm.notes}
                  onChange={(e) => setAssignmentForm({...assignmentForm, notes: e.target.value})}
                  placeholder="Additional notes about this assignment..."
                  className="h-20"
                />
              </div>
            </div>

          <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateAssignmentOpen(false)}>
              Cancel
            </Button>
                            <Button 
                onClick={handleCreateAssignment} 
                disabled={!assignmentForm.personId || (!selectedTemplate && !assignmentForm.templateId)}
              >
                Assign Person
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

        {/* Batch Assignment Dialog */}
        <Dialog open={isBatchAssignmentOpen} onOpenChange={setIsBatchAssignmentOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
              <DialogTitle>
                {selectedTemplate ? 'Batch Assign People to Template' : 'Batch Assignment'}
              </DialogTitle>
            <DialogDescription>
                {selectedTemplate 
                  ? `Assign multiple people to ${selectedTemplate.name} at once`
                  : 'Select a template and assign multiple people to it at once'
                }
            </DialogDescription>
          </DialogHeader>

            <div className="grid gap-4 py-4">
              {/* Template Selection (when no template pre-selected) */}
              {!selectedTemplate && (
                <div>
                  <Label htmlFor="batchTemplate">Template <span className="text-red-500">*</span></Label>
                  <Select 
                    value={batchAssignmentForm.templateId} 
                    onValueChange={(value) => setBatchAssignmentForm({...batchAssignmentForm, templateId: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a template to assign people to" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.id} value={template.id}>
                          {template.name} - {formatCurrency(template.totalPrice)} {template.priceType}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
            </div>
          )}

              {/* People Selection */}
              <div>
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">Select People ({batchAssignmentForm.selectedPersonIds.length} selected)</Label>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setBatchAssignmentForm(prev => ({
                        ...prev,
                        selectedPersonIds: people.map(p => p.id)
                      }))}
                    >
                      Select All
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setBatchAssignmentForm(prev => ({
                        ...prev,
                        selectedPersonIds: []
                      }))}
                    >
                      Clear All
                    </Button>
            </div>
                </div>
                <div className="mt-2 max-h-60 overflow-y-auto border rounded-lg">
                  {people.length > 0 ? (
                    <div className="p-2 space-y-2">
                      {people.map((person) => (
                        <div
                          key={person.id}
                          className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            batchAssignmentForm.selectedPersonIds.includes(person.id)
                              ? 'bg-blue-500/10 border-blue-500/30'
                              : 'hover:bg-muted/50'
                          }`}
                          onClick={() => togglePersonSelection(person.id)}
                        >
                          <input
                            type="checkbox"
                            checked={batchAssignmentForm.selectedPersonIds.includes(person.id)}
                            onChange={() => togglePersonSelection(person.id)}
                            className="w-4 h-4"
                          />
                          <div className="flex-1">
                            <div className="font-medium">{person.name}</div>
                            {person.email && (
                              <div className="text-sm text-muted-foreground">{person.email}</div>
                            )}
                            {person.department && (
                              <div className="text-xs text-muted-foreground">{person.department}</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-muted-foreground">
                      No people available
            </div>
          )}
                </div>
              </div>

              {/* Status Selection */}
              <div>
                <Label htmlFor="batchStatus">Status</Label>
                <Select 
                  value={batchAssignmentForm.status} 
                  onValueChange={(value) => setBatchAssignmentForm({...batchAssignmentForm, status: value as 'assigned' | 'delivered' | 'returned'})}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="assigned">Assigned</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="returned">Returned</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* PC Reference */}
              <div>
                <Label htmlFor="batchPcReference">PC Reference (Optional)</Label>
                <Input
                  id="batchPcReference"
                  value={batchAssignmentForm.pcReference}
                  onChange={(e) => setBatchAssignmentForm({...batchAssignmentForm, pcReference: e.target.value})}
                  placeholder="PC-001, LAP-123, etc. (will be used for all assignments)"
                />
              </div>

              {/* Notes */}
              <div>
                <Label htmlFor="batchNotes">Notes (Optional)</Label>
                <Textarea
                  id="batchNotes"
                  value={batchAssignmentForm.notes}
                  onChange={(e) => setBatchAssignmentForm({...batchAssignmentForm, notes: e.target.value})}
                  placeholder="Additional notes for all assignments..."
                  className="h-20"
                />
              </div>
            </div>

          <DialogFooter>
              <Button variant="outline" onClick={() => setIsBatchAssignmentOpen(false)}>
              Cancel
            </Button>
                            <Button 
                onClick={handleCreateBatchAssignment} 
                disabled={
                  batchAssignmentForm.selectedPersonIds.length === 0 || 
                  (!selectedTemplate && !batchAssignmentForm.templateId)
                }
              >
                Assign {batchAssignmentForm.selectedPersonIds.length} People
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
            </div>
    </div>
  )
} 