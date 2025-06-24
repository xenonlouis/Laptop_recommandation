"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CheckCircle, Loader2, User, Users, Laptop, Mouse, Package as PackageIcon, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchPackageById, fetchPeople } from "@/lib/api-client";
import { Package, Person } from "@/types";
import { Separator } from "@/components/ui/separator";

export default function PackageDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [packageData, setPackageData] = useState<Package | null>(null);
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [assignedPeople, setAssignedPeople] = useState<Person[]>([]);
  
  // Fetch both package data and all people
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [pkgData, peopleData] = await Promise.all([
          fetchPackageById(id),
          fetchPeople()
        ]);
        
        setPackageData(pkgData);
        setPeople(peopleData);
        
        // Find assigned people using both methods
        const assigned: Person[] = [];
        
        // First, look for people using personIds (new method)
        if (pkgData.personIds && pkgData.personIds.length > 0) {
          const peopleById = peopleData.filter(person => 
            pkgData.personIds?.includes(person.id)
          );
          assigned.push(...peopleById);
        }
        
        // Then, try using assignedTo for backward compatibility
        if (pkgData.assignedTo && assigned.length === 0) {
          const peopleByName = peopleData.filter(person => 
            person.name === pkgData.assignedTo
          );
          assigned.push(...peopleByName);
        }
        
        setAssignedPeople(assigned);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load package data");
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [id]);
  
  const formatPrice = (price: number, priceType: string) => {
    return `${price.toLocaleString("fr-FR")} € ${priceType}`;
  };
  
  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case "proposed": return "bg-blue-50 text-blue-700 border-blue-300";
      case "approved": return "bg-green-50 text-green-700 border-green-300";
      case "rejected": return "bg-red-50 text-red-700 border-red-300";
      case "delivered": return "bg-purple-50 text-purple-700 border-purple-300";
      default: return "";
    }
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading package data...</span>
      </div>
    );
  }
  
  if (error || !packageData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <p className="text-destructive">{error || "Package not found"}</p>
        <Button onClick={() => router.push("/packages")}>
          Return to packages
        </Button>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Link href="/packages">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
                <span className="sr-only">Back to packages</span>
              </Button>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight">Package Details</h1>
          </div>
        </div>
      </header>
      
      <main className="container py-8 space-y-8">
        {/* Package overview card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-2xl">{packageData.name}</CardTitle>
              <CardDescription>
                <div className="flex items-center gap-2 mt-1">
                  <PackageIcon className="h-4 w-4 text-muted-foreground" />
                  <span>ID: {id}</span>
                </div>
              </CardDescription>
            </div>
            <Badge variant="outline" className={getStatusBadgeClass(packageData.status)}>
              {packageData.status.charAt(0).toUpperCase() + packageData.status.slice(1)}
            </Badge>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Package summary section */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Summary</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-muted-foreground" />
                  <span>Total Price: {formatPrice(
                    packageData.laptop.price + 
                    packageData.accessories.reduce((sum, acc) => sum + acc.price, 0),
                    packageData.priceType
                  )}</span>
                </div>
                {packageData.notes && (
                  <div className="flex items-start gap-2">
                    <span className="text-muted-foreground mt-0.5">Notes:</span>
                    <span>{packageData.notes}</span>
                  </div>
                )}
              </div>
            </div>
            
            <Separator />
            
            {/* Laptop details */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Laptop</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Laptop className="h-5 w-5 text-primary" />
                        <h4 className="font-medium">{packageData.laptop.brand} {packageData.laptop.model}</h4>
                      </div>
                      <div className="text-sm font-medium">
                        {formatPrice(packageData.laptop.price, packageData.laptop.priceType)}
                      </div>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Processor:</span>
                        <span>{packageData.laptop.processor}</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">RAM:</span>
                        <span>{packageData.laptop.ram} GB</span>
                      </div>
                      <div className="grid grid-cols-2">
                        <span className="text-muted-foreground">Storage:</span>
                        <span>{packageData.laptop.storage} GB</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Accessories */}
            {packageData.accessories.length > 0 && (
              <div>
                <h3 className="font-semibold text-lg mb-2">Accessories</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {packageData.accessories.map((accessory) => (
                    <Card key={accessory.id}>
                      <CardContent className="pt-6">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <Mouse className="h-5 w-5 text-primary" />
                            <h4 className="font-medium">{accessory.name}</h4>
                          </div>
                          <div className="text-sm font-medium">
                            {formatPrice(accessory.price, accessory.priceType)}
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {accessory.brand} - {accessory.type}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
            
            <Separator />
            
            {/* Assigned people */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Assigned to ({assignedPeople.length})</h3>
              {assignedPeople.length > 0 ? (
                <div className="space-y-4">
                  {assignedPeople.map(person => (
                    <Link href={`/people?highlight=${person.id}`} key={person.id}>
                      <Card className="hover:bg-accent/20 transition-colors">
                        <CardContent className="pt-6 pb-4">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <User className="h-5 w-5 text-primary" />
                              <div>
                                <h4 className="font-medium">{person.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  {person.position} - {person.department}
                                </p>
                              </div>
                            </div>
                            {person.pcReference && (
                              <Badge variant="secondary">PC Ref: {person.pcReference}</Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <Users className="h-10 w-10 mx-auto mb-2 opacity-50" />
                  <p>No people currently assigned to this package</p>
                </div>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={() => router.push("/packages")}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Packages
            </Button>
          </CardFooter>
        </Card>
      </main>
    </div>
  );
} 