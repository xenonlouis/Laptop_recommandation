"use client"

import { useState, useEffect } from "react"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Plus, Loader2, Users, Package as PackageIcon, Calculator, UserCheck, Trash2, Edit, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

export default function PackagesPage() {
  const [activeTab, setActiveTab] = useState("catalog")
  const [templates, setTemplates] = useState<PackageTemplate[]>([])
  const [assignments, setAssignments] = useState<PersonAssignment[]>([])
  const [loading, setLoading] = useState(true)
  const [eurToMadRate, setEurToMadRate] = useState<{ rate: number; isLive: boolean }>({ rate: 10.80, isLive: false })
  const { toast } = useToast()

  // Load data
  useEffect(() => {
    loadData()
    loadExchangeRate()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      const [templatesRes, assignmentsRes] = await Promise.all([
        fetch('/api/templates'),
        fetch('/api/assignments')
      ])

      if (templatesRes.ok) {
        const templatesData = await templatesRes.json()
        setTemplates(templatesData)
      }

      if (assignmentsRes.ok) {
        const assignmentsData = await assignmentsRes.json()
        setAssignments(assignmentsData)
      }

    } catch (error) {
      console.error('Failed to load data:', error)
      toast({
        title: "Error",
        description: "Failed to load data",
        variant: "destructive",
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

  const formatCurrency = (amount: number, currency = 'MAD') => {
    return formatCurrencyUtil(amount, currency)
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
    const profileConfig = {
      developer: { label: "Developer", className: "bg-blue-500/10 text-blue-700 border-blue-500/20" },
      consultant: { label: "Consultant", className: "bg-green-500/10 text-green-700 border-green-500/20" },
      general: { label: "General", className: "bg-gray-500/10 text-gray-700 border-gray-500/20" }
    }
    
    const config = profileConfig[profileType as keyof typeof profileConfig] || profileConfig.general
    return <Badge variant="outline" className={config.className}>{config.label}</Badge>
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
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error('Failed to update assignment:', error)
      toast({
        title: "Error",
        description: "Failed to update assignment",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="h-6 border-l border-gray-200" />
            <h1 className="text-2xl font-bold text-gray-900">IT Package Management</h1>
          </div>
          
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="h-6 border-l border-gray-200" />
            <h1 className="text-2xl font-bold text-gray-900">IT Package Management</h1>
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

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <PackageIcon className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Templates</p>
                  <p className="text-2xl font-bold">{templates.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Assignments</p>
                  <p className="text-2xl font-bold">{assignments.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-orange-500/10 rounded-lg">
                  <UserCheck className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Active</p>
                  <p className="text-2xl font-bold">
                    {assignments.filter(a => a.status === 'assigned').length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Calculator className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(
                      assignments.reduce((sum, a) => sum + (a.template?.totalPrice || 0), 0)
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold">Package Catalog</h2>
                  <p className="text-muted-foreground">Manage standardized IT package templates</p>
                </div>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Template
                </Button>
              </div>

              {/* Templates Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{template.name}</CardTitle>
                          <CardDescription className="mt-1">
                            {template.description}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-1 ml-2">
                          {getProfileBadge(template.profileType)}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pb-3">
                      {/* Laptop Info */}
                      <div className="flex items-center gap-3 mb-4">
                        {template.laptop.images[0] && (
                          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={template.laptop.images[0]}
                              alt={`${template.laptop.brand} ${template.laptop.model}`}
                              width={64}
                              height={64}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">
                            {template.laptop.brand} {template.laptop.model}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {template.laptop.processor}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {template.laptop.ram} • {template.laptop.storage}
                          </p>
                        </div>
                      </div>

                      {/* Accessories */}
                      <div className="mb-4">
                        <p className="text-sm font-medium mb-2">
                          Accessories ({template.accessories.length})
                        </p>
                        {template.accessories.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {template.accessories.slice(0, 3).map((accessory) => (
                              <Badge key={accessory.id} variant="outline" className="text-xs">
                                {accessory.name}
                              </Badge>
                            ))}
                            {template.accessories.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{template.accessories.length - 3} more
                              </Badge>
                            )}
                          </div>  
                        ) : (
                          <p className="text-xs text-muted-foreground">No accessories</p>
                        )}
                      </div>

                      {/* Assignment Info */}
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {template.assignmentCount} assigned
                          </span>
                        </div>
                        <div className="font-semibold">
                          {formatCurrency(template.totalPrice)}
                        </div>
                      </div>
                    </CardContent>

                    <CardFooter className="pt-3 gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" disabled={template.assignmentCount > 0}>
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>

              {templates.length === 0 && (
                <div className="text-center py-12">
                  <PackageIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No templates found</h3>
                  <p className="text-muted-foreground mb-4">
                    Create your first package template to get started
                  </p>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Template
                  </Button>
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
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Assignment
                </Button>
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

              <Card>
                <CardContent className="p-6">
                  <div className="text-center py-8">
                    <Calculator className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium">Cost Simulator</h3>
                    <p className="text-muted-foreground">
                      Coming soon - Template-based cost calculations
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}