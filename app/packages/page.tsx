"use client"

import { useState, useEffect } from "react"
import React from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Plus, Loader2, MoveHorizontal, CheckCircle2, XCircle, Package as PackageIcon, MousePointer2, Keyboard, Headphones, Plug, Info, Pencil, Trash2, PlusCircle, Layout, List, Grid3X3, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { fetchPackages, fetchLaptops, fetchAccessories, createPackage, updatePackage, deletePackage } from "@/lib/api-client"
import { getEurToMadRate, formatCurrency as formatCurrencyUtil, madToEur } from "@/lib/exchange-rates"
import { useToast } from "@/hooks/use-toast"
import type { Package, Accessory, Laptop, PackageStatus, PriceType } from "@/types"
// Import dnd-kit components
import { 
  DndContext, 
  DragOverlay, 
  closestCorners, 
  KeyboardSensor, 
  PointerSensor, 
  useSensor, 
  useSensors, 
  useDroppable,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent 
} from "@dnd-kit/core"
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { Skeleton } from "@/components/ui/skeleton"

// Define a type for our droppable areas (status columns)
type StatusColumn = "proposed" | "approved" | "rejected" | "delivered";

// Sortable Package Card component
function SortablePackageCard({ pkg, formatPrice, getTotalPrice, getAccessoryIcon, getStatusBadge, onClick }: { 
  pkg: Package, 
  formatPrice: (price: number, priceType: "HT" | "TTC") => string,
  getTotalPrice: (pkg: Package) => string,
  getAccessoryIcon: (type: string) => React.ReactElement,
  getStatusBadge: (status: string) => React.ReactElement,
  onClick: () => void
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({
    id: pkg.id,
    data: {
      type: 'package',
      package: pkg
    }
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 999 : 1,
  };

  const statusColors = {
    proposed: 'hover:border-blue-200',
    approved: 'hover:border-green-200',
    rejected: 'hover:border-red-200 opacity-80',
    delivered: 'hover:border-purple-200'
  };
  
  return (
    <Card 
      ref={setNodeRef}
      style={style}
      className={`cursor-pointer hover:shadow-md transition-shadow border-2 border-transparent ${statusColors[pkg.status]}`}
      onClick={onClick}
      {...attributes} 
      {...listeners}
    >
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm">{pkg.name}</CardTitle>
        <CardDescription className="text-xs truncate">
          For: {pkg.assignedTo}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-0">
        <div className="flex items-center mt-1 mb-2">
          <div className="relative h-9 w-12 mr-2 bg-gray-100 rounded">
            <Image
              src={pkg.laptop.images?.[0] || "/placeholder.svg"}
              alt={pkg.laptop.model}
              fill
              className="object-contain"
            />
          </div>
          <div className="text-xs">
            <p className="font-medium">{pkg.laptop.brand} {pkg.laptop.model}</p>
            <p className="text-muted-foreground">{formatPrice(pkg.laptop.price, pkg.laptop.priceType)}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-1 mb-2">
          {pkg.accessories.map((acc: Accessory) => (
            <Badge key={acc.id} variant="outline" className="flex items-center text-xs gap-1">
              {getAccessoryIcon(acc.type)}
              {acc.name.split(' ')[0]}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-2">
        <div className="text-xs font-medium">
          {getTotalPrice(pkg)}
        </div>
        {getStatusBadge(pkg.status)}
      </CardFooter>
    </Card>
  );
}

// Package Card for the drag overlay
function PackageCard({ pkg, formatPrice, getTotalPrice, getAccessoryIcon, getStatusBadge }: { 
  pkg: Package, 
  formatPrice: (price: number, priceType: "HT" | "TTC") => string,
  getTotalPrice: (pkg: Package) => string,
  getAccessoryIcon: (type: string) => React.ReactElement,
  getStatusBadge: (status: string) => React.ReactElement,
}) {
  return (
    <Card className="cursor-grabbing shadow-md border-2 border-primary w-[280px]">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-sm">{pkg.name}</CardTitle>
        <CardDescription className="text-xs truncate">
          For: {pkg.assignedTo}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0 pb-0">
        <div className="flex items-center mt-1 mb-2">
          <div className="relative h-9 w-12 mr-2 bg-gray-100 rounded">
            <Image
              src={pkg.laptop.images?.[0] || "/placeholder.svg"}
              alt={pkg.laptop.model}
              fill
              className="object-contain"
            />
          </div>
          <div className="text-xs">
            <p className="font-medium">{pkg.laptop.brand} {pkg.laptop.model}</p>
            <p className="text-muted-foreground">{formatPrice(pkg.laptop.price, pkg.laptop.priceType)}</p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between p-4 pt-2">
        <div className="text-xs font-medium">
          {getTotalPrice(pkg)}
        </div>
        {getStatusBadge(pkg.status)}
      </CardFooter>
    </Card>
  );
}

// Droppable container for each status column
function StatusColumn({ 
  children, 
  title, 
  icon, 
  count, 
  status, 
  color 
}: { 
  children: React.ReactNode, 
  title: string, 
  icon: React.ReactElement, 
  count: number, 
  status: StatusColumn,
  color: string
}) {
  const { setNodeRef, isOver } = useDroppable({ id: status });
  
  const dropStyles = {
    backgroundColor: isOver ? `${color}50` : '',
    borderColor: isOver ? color : '',
    transition: 'background-color 0.2s, border-color 0.2s',
  };
  
  return (
    <div className="flex flex-col h-full min-h-[500px]">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-muted-foreground">{icon}</span>
        <span className="font-medium">{title}</span>
        <Badge variant="secondary" className="ml-auto">
          {count}
        </Badge>
      </div>
      <div 
        ref={setNodeRef}
        className="flex-1 p-2 bg-muted/30 rounded-lg border-2 border-dashed overflow-y-auto" 
        style={dropStyles}
      >
        {children}
      </div>
    </div>
  );
}

// Pricing Breakdown Component  
function PricingBreakdown({ packages }: { packages: Package[] }) {
  const [eurToMadRate, setEurToMadRate] = useState(10.8);
  const [isLiveRate, setIsLiveRate] = useState(false);
  const [rateLoading, setRateLoading] = useState(false);

  // Fetch live exchange rate on component mount
  useEffect(() => {
    const fetchRate = async () => {
      setRateLoading(true);
      try {
        const { rate, isLive } = await getEurToMadRate();
        setEurToMadRate(rate);
        setIsLiveRate(isLive);
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
      } finally {
        setRateLoading(false);
      }
    };

    fetchRate();
  }, []);
  // Separate packages by laptop OS/brand to determine Windows vs Mac
  const windowsPackages = packages.filter(pkg => 
    pkg.laptop.brand?.toLowerCase() !== 'apple' && 
    pkg.laptop.model?.toLowerCase().includes('windows') === false
  );
  const macPackages = packages.filter(pkg => 
    pkg.laptop.brand?.toLowerCase() === 'apple' || 
    pkg.laptop.model?.toLowerCase().includes('mac')
  );
  
  // Calculate average prices for each category
  const calculateAveragePrice = (packageList: Package[]): number => {
    if (packageList.length === 0) return 0;
    const totalPrice = packageList.reduce((sum, pkg) => {
      const laptopPrice = pkg.laptop.price;
      const accessoriesPrice = pkg.accessories.reduce((accSum, acc) => accSum + acc.price, 0);
      return sum + laptopPrice + accessoriesPrice;
    }, 0);
    return Math.round(totalPrice / packageList.length);
  };
  
  const avgWindowsPrice = calculateAveragePrice(windowsPackages);
  const avgMacPrice = calculateAveragePrice(macPackages);
  const defaultWindows = avgWindowsPrice || 10680;
  const defaultMac = avgMacPrice || 14490;

  
  // Get real profile pricing from Cost Simulator logic
  const getRealProfilePricing = () => {
    // Group packages by their laptop's supported profiles (same logic as in CostSimulator)
    const packagesByProfile: { [key: string]: Package[] } = {};
    
    packages.forEach(pkg => {
      const profiles = pkg.laptop.supportedProfiles || [];
      profiles.forEach((profileObj: any) => {
        const profile = profileObj.profile;
        if (!packagesByProfile[profile]) {
          packagesByProfile[profile] = [];
        }
        packagesByProfile[profile].push(pkg);
      });
    });

    // Calculate real averages
    const getProfileStats = (profileKey: string, displayName: string) => {
      const profilePackages = packagesByProfile[profileKey] || [];
      
      if (profilePackages.length === 0) {
        return {
          name: displayName,
          windowsPrice: 0,
          macPrice: 0,
          windowsCount: 0,
          macCount: 0,
          reason: 'No packages found for this profile'
        };
      }

      const calculatePackagePrice = (pkg: Package): number => {
        const laptopPrice = pkg.laptop.price;
        const accessoriesPrice = pkg.accessories.reduce((sum, acc) => sum + acc.price, 0);
        return laptopPrice + accessoriesPrice;
      };

      const windowsPackages = profilePackages.filter(pkg => pkg.laptop.brand?.toLowerCase() !== 'apple');
      const macPackages = profilePackages.filter(pkg => pkg.laptop.brand?.toLowerCase() === 'apple');

      const windowsPrice = windowsPackages.length > 0 
        ? Math.round(windowsPackages.reduce((sum, pkg) => sum + calculatePackagePrice(pkg), 0) / windowsPackages.length)
        : 0;
        
      const macPrice = macPackages.length > 0 
        ? Math.round(macPackages.reduce((sum, pkg) => sum + calculatePackagePrice(pkg), 0) / macPackages.length)
        : 0;

      return {
        name: displayName,
        windowsPrice,
        macPrice,
        windowsCount: windowsPackages.length,
        macCount: macPackages.length,
        reason: `Based on ${profilePackages.length} real packages (${windowsPackages.length} Windows + ${macPackages.length} Mac)`
      };
    };

    return [
      getProfileStats('developer', 'Full-Stack Developer'),
      getProfileStats('consultant', 'Salesforce Consultant'),
      getProfileStats('developer', 'MuleSoft Developer'), // Uses developer profile as base
      getProfileStats('developer', 'Salesforce Developer') // Uses developer profile as base
    ];
  };

  const profiles = getRealProfilePricing();
  
  return (
    <div className="space-y-6">
      {/* Data Source Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>📊 Data Source Analysis</CardTitle>
          <CardDescription>How we identify and categorize your packages</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium">Windows Packages</h4>
              <p className="text-sm text-muted-foreground">Packages with non-Apple laptops</p>
              <div className="text-2xl font-bold text-blue-600">{windowsPackages.length}</div>
              <p className="text-xs text-muted-foreground">
                Average: {avgWindowsPrice ? `${avgWindowsPrice.toLocaleString()} MAD` : 'No data - using fallback'}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Mac Packages</h4>
              <p className="text-sm text-muted-foreground">Packages with Apple laptops</p>
              <div className="text-2xl font-bold text-gray-600">{macPackages.length}</div>
              <p className="text-xs text-muted-foreground">
                Average: {avgMacPrice ? `${avgMacPrice.toLocaleString()} MAD` : 'No data - using fallback'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Base Prices */}
      <Card>
        <CardHeader>
          <CardTitle>💰 Base Prices (Before Profile Adjustments)</CardTitle>
          <CardDescription>Foundation prices calculated from your package data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-muted/30 border rounded-lg">
              <h4 className="font-medium">Windows Base Price</h4>
              <div className="text-2xl font-bold text-primary">{defaultWindows.toLocaleString()} MAD</div>
              <div className="text-sm text-muted-foreground">{Math.round(defaultWindows / eurToMadRate).toLocaleString()} EUR</div>
              <p className="text-xs text-muted-foreground mt-1">
                {avgWindowsPrice ? 'Calculated from your data' : 'Fallback value (no Windows packages found)'}
              </p>
            </div>
            <div className="p-4 bg-muted/30 border rounded-lg">
              <h4 className="font-medium">Mac Base Price</h4>
              <div className="text-2xl font-bold text-primary">{defaultMac.toLocaleString()} MAD</div>
              <div className="text-sm text-muted-foreground">{Math.round(defaultMac / eurToMadRate).toLocaleString()} EUR</div>
              <p className="text-xs text-muted-foreground mt-1">
                {avgMacPrice ? 'Calculated from your data' : 'Fallback value (no Mac packages found)'}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile-Based Pricing */}
      <Card>
        <CardHeader>
          <CardTitle>🎯 Real Profile-Based Pricing</CardTitle>
          <CardDescription>Actual average prices calculated from packages assigned to each profile (no artificial multipliers)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Profile</th>
                  <th className="text-center py-2 font-medium">Windows Price</th>
                  <th className="text-center py-2 font-medium">Mac Price</th>
                  <th className="text-left py-2 font-medium">Reasoning</th>
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile.name} className="border-b">
                    <td className="py-3 font-medium">{profile.name}</td>
                    <td className="text-center py-3">
                      <div className="space-y-1">
                        {profile.windowsPrice > 0 ? (
                          <>
                            <div className="font-medium">
                              {profile.windowsPrice.toLocaleString()} MAD
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {Math.round(profile.windowsPrice / eurToMadRate).toLocaleString()} EUR
                            </div>
                            <div className="text-xs text-blue-600">
                              {profile.windowsCount} packages
                            </div>
                          </>
                        ) : (
                          <div className="text-sm text-muted-foreground">No data</div>
                        )}
                      </div>
                    </td>
                    <td className="text-center py-3">
                      <div className="space-y-1">
                        {profile.macPrice > 0 ? (
                          <>
                            <div className="font-medium">
                              {profile.macPrice.toLocaleString()} MAD
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {Math.round(profile.macPrice / eurToMadRate).toLocaleString()} EUR
                            </div>
                            <div className="text-xs text-blue-600">
                              {profile.macCount} packages
                            </div>
                          </>
                        ) : (
                          <div className="text-sm text-muted-foreground">No data</div>
                        )}
                      </div>
                    </td>
                    <td className="py-3 text-sm text-muted-foreground">{profile.reason}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Currency Info */}
      <Card>
        <CardHeader>
          <CardTitle>💱 Currency Conversion</CardTitle>
          <CardDescription>Exchange rate used for EUR calculations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="flex items-center justify-center space-x-3">
              <div className="text-lg font-medium">1 EUR = {eurToMadRate.toFixed(2)} MAD</div>
              {rateLoading ? (
                <div className="text-sm text-muted-foreground">Updating...</div>
              ) : (
                <div className={`text-xs px-2 py-1 rounded ${isLiveRate ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {isLiveRate ? 'Live Rate' : 'Fallback Rate'}
                </div>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={async () => {
                  setRateLoading(true);
                  try {
                    const { rate, isLive } = await getEurToMadRate();
                    setEurToMadRate(rate);
                    setIsLiveRate(isLive);
                  } catch (error) {
                    console.error('Failed to refresh rate:', error);
                  } finally {
                    setRateLoading(false);
                  }
                }}
                disabled={rateLoading}
                className="h-6 px-2 text-xs"
              >
                {rateLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : '🔄'}
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {isLiveRate ? 'Updated from live exchange rate API' : 'Using fallback rate (API unavailable)'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Cost Simulator Component
interface TeamMember {
  id: string;
  profileType: 'Salesforce Consultant' | 'MuleSoft Developer' | 'Full-Stack Developer' | 'Salesforce Developer';
  packagePreference: 'Windows Package' | 'Mac Package' | 'Mixed (Average)';
  quantity: number;
}

interface PackagePrice {
  'Salesforce Consultant': { windows: number; mac: number };
  'MuleSoft Developer': { windows: number; mac: number };
  'Full-Stack Developer': { windows: number; mac: number };
  'Salesforce Developer': { windows: number; mac: number };
}

function CostSimulator({ packages }: { packages: Package[] }) {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: '1', profileType: 'Full-Stack Developer', packagePreference: 'Windows Package', quantity: 2 },
    { id: '2', profileType: 'Salesforce Consultant', packagePreference: 'Mac Package', quantity: 1 }
  ]);
  const [eurToMadRate, setEurToMadRate] = useState(10.8);
  const [isLiveRate, setIsLiveRate] = useState(false);
  const [rateLoading, setRateLoading] = useState(false);

  // Fetch live exchange rate on component mount
  useEffect(() => {
    const fetchRate = async () => {
      setRateLoading(true);
      try {
        const { rate, isLive } = await getEurToMadRate();
        setEurToMadRate(rate);
        setIsLiveRate(isLive);
      } catch (error) {
        console.error('Failed to fetch exchange rate:', error);
      } finally {
        setRateLoading(false);
      }
    };

    fetchRate();
  }, []);

  // Calculate package prices from actual profile data (NO MORE FAKE MULTIPLIERS!)
  const getPackagePrices = (): PackagePrice => {
    console.log('📊 Calculating REAL profile-based prices from', packages.length, 'packages');
    
    // Group packages by their laptop's supported profiles
    const packagesByProfile: { [key: string]: Package[] } = {};
    
    packages.forEach(pkg => {
      // Get supported profiles for this laptop
      const profiles = pkg.laptop.supportedProfiles || [];
      
      profiles.forEach((profileObj: any) => {
        const profile = profileObj.profile;
        if (!packagesByProfile[profile]) {
          packagesByProfile[profile] = [];
        }
        packagesByProfile[profile].push(pkg);
      });
    });
    
    console.log('📊 REAL packages grouped by profile:', Object.keys(packagesByProfile).map(profile => ({
      profile,
      count: packagesByProfile[profile].length,
      avgPrice: packagesByProfile[profile].length > 0 
        ? Math.round(packagesByProfile[profile].reduce((sum, pkg) => {
            const laptopPrice = pkg.laptop.price;
            const accessoriesPrice = pkg.accessories.reduce((accSum, acc) => accSum + acc.price, 0);
            return sum + laptopPrice + accessoriesPrice;
          }, 0) / packagesByProfile[profile].length)
        : 0
    })));
    
    // Calculate real average prices per profile
    const getProfileAverage = (profileKey: string, fallback: number): { windows: number; mac: number } => {
      const profilePackages = packagesByProfile[profileKey] || [];
      
      if (profilePackages.length === 0) {
        console.log(`⚠️ No packages found for profile '${profileKey}', using fallback: ${fallback} MAD`);
        return { windows: fallback, mac: Math.round(fallback * 1.35) }; // Mac typically 35% more expensive
      }
      
      // Calculate total package cost (laptop + accessories)
      const calculatePackagePrice = (pkg: Package): number => {
        const laptopPrice = pkg.laptop.price;
        const accessoriesPrice = pkg.accessories.reduce((sum, acc) => sum + acc.price, 0);
        return laptopPrice + accessoriesPrice;
      };
      
      // Separate by OS
      const windowsPackages = profilePackages.filter(pkg => 
        pkg.laptop.brand?.toLowerCase() !== 'apple'
      );
      const macPackages = profilePackages.filter(pkg => 
        pkg.laptop.brand?.toLowerCase() === 'apple'
      );
      
      const avgWindows = windowsPackages.length > 0 
        ? Math.round(windowsPackages.reduce((sum, pkg) => sum + calculatePackagePrice(pkg), 0) / windowsPackages.length)
        : Math.round(profilePackages.reduce((sum, pkg) => sum + calculatePackagePrice(pkg), 0) / profilePackages.length);
        
      const avgMac = macPackages.length > 0 
        ? Math.round(macPackages.reduce((sum, pkg) => sum + calculatePackagePrice(pkg), 0) / macPackages.length)
        : Math.round(avgWindows * 1.35); // Estimate Mac price as 35% higher if no Mac data
      
      console.log(`💰 Profile '${profileKey}': Windows=${avgWindows} MAD, Mac=${avgMac} MAD (${windowsPackages.length}W + ${macPackages.length}M packages)`);
      
      return {
        windows: avgWindows,
        mac: avgMac
      };
    };
    
    // Use REAL profile-based pricing (no more fake multipliers!)
    const profiles = {
      'Full-Stack Developer': getProfileAverage('developer', 13000), // Based on our data analysis
      'Salesforce Consultant': getProfileAverage('consultant', 9300), // Based on our data analysis  
      'MuleSoft Developer': getProfileAverage('developer', 13000), // Use developer as base
      'Salesforce Developer': getProfileAverage('developer', 13000) // Use developer as base
    };
    
    console.log('✅ REAL Profile Pricing Applied:', profiles);
    return profiles;
  };

  const packagePrices = getPackagePrices();

  const addTeamMember = () => {
    const newId = (teamMembers.length + 1).toString();
    setTeamMembers([...teamMembers, {
      id: newId,
      profileType: 'Full-Stack Developer',
      packagePreference: 'Windows Package',
      quantity: 1
    }]);
  };

  const updateTeamMember = (id: string, field: keyof TeamMember, value: any) => {
    setTeamMembers(teamMembers.map(member => 
      member.id === id ? { ...member, [field]: value } : member
    ));
  };

  const removeTeamMember = (id: string) => {
    setTeamMembers(teamMembers.filter(member => member.id !== id));
  };

  const calculateMemberCost = (member: TeamMember): number => {
    const prices = packagePrices[member.profileType];
    let unitPrice = 0;

    switch (member.packagePreference) {
      case 'Windows Package':
        unitPrice = prices.windows;
        break;
      case 'Mac Package':
        unitPrice = prices.mac;
        break;
      case 'Mixed (Average)':
        unitPrice = (prices.windows + prices.mac) / 2;
        break;
    }

    return unitPrice * member.quantity;
  };

  const getTotalCostMAD = (): number => {
    return teamMembers.reduce((sum, member) => sum + calculateMemberCost(member), 0);
  };

  const getTotalCostEUR = (): number => {
    return getTotalCostMAD() / eurToMadRate;
  };

  const formatCurrency = (amount: number, currency: 'MAD' | 'EUR'): string => {
    return formatCurrencyUtil(amount, currency);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Cost Simulator</h2>
        <p className="text-muted-foreground">
          Calculate total costs for different team compositions based on actual package pricing.
        </p>
      </div>

      {/* Team Composition Input */}
      <Card>
        <CardHeader>
          <CardTitle>Team Composition</CardTitle>
          <CardDescription>Define your team structure and package preferences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {teamMembers.map((member) => (
            <div key={member.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
              <div className="space-y-2">
                <Label>Profile Type</Label>
                <Select
                  value={member.profileType}
                  onValueChange={(value: any) => updateTeamMember(member.id, 'profileType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Full-Stack Developer">Full-Stack Developer</SelectItem>
                    <SelectItem value="Salesforce Consultant">Salesforce Consultant</SelectItem>
                    <SelectItem value="MuleSoft Developer">MuleSoft Developer</SelectItem>
                    <SelectItem value="Salesforce Developer">Salesforce Developer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Package Preference</Label>
                <Select
                  value={member.packagePreference}
                  onValueChange={(value: any) => updateTeamMember(member.id, 'packagePreference', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Windows Package">Windows Package</SelectItem>
                    <SelectItem value="Mac Package">Mac Package</SelectItem>
                    <SelectItem value="Mixed (Average)">Mixed (Average)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input
                  type="number"
                  min="1"
                  value={member.quantity}
                  onChange={(e) => updateTeamMember(member.id, 'quantity', parseInt(e.target.value) || 1)}
                />
              </div>

              <div className="flex items-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => removeTeamMember(member.id)}
                  disabled={teamMembers.length === 1}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}

          <Button onClick={addTeamMember} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add Team Member
          </Button>
        </CardContent>
      </Card>

      {/* Cost Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Cost Breakdown</CardTitle>
          <CardDescription>Detailed cost analysis for your team configuration</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead>Package</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit Price (MAD HT)</TableHead>
                <TableHead>Unit Price (EUR HT)</TableHead>
                <TableHead>Total (MAD HT)</TableHead>
                <TableHead>Total (EUR HT)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => {
                const totalMAD = calculateMemberCost(member);
                const unitPriceMAD = totalMAD / member.quantity;
                const unitPriceEUR = unitPriceMAD / eurToMadRate;
                const totalEUR = totalMAD / eurToMadRate;

                return (
                  <TableRow key={member.id}>
                    <TableCell className="font-medium">{member.profileType}</TableCell>
                    <TableCell>{member.packagePreference}</TableCell>
                    <TableCell>{member.quantity}</TableCell>
                    <TableCell>{formatCurrency(unitPriceMAD, 'MAD')}</TableCell>
                    <TableCell>{formatCurrency(unitPriceEUR, 'EUR')}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(totalMAD, 'MAD')}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(totalEUR, 'EUR')}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Total Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Project Total</CardTitle>
          <CardDescription>Complete cost estimation for your project</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h4 className="font-medium text-lg">Total Cost (HT)</h4>
                <p className="text-2xl font-bold text-primary">{formatCurrency(getTotalCostMAD(), 'MAD')}</p>
                <p className="text-lg text-muted-foreground">{formatCurrency(getTotalCostEUR(), 'EUR')}</p>
              </div>
              
              <div>
                <h4 className="font-medium text-lg">Total Cost (TTC)</h4>
                <p className="text-2xl font-bold">{formatCurrency(getTotalCostMAD() * 1.2, 'MAD')}</p>
                <p className="text-lg text-muted-foreground">{formatCurrency(getTotalCostEUR() * 1.2, 'EUR')}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Currency Rate</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={async () => {
                      setRateLoading(true);
                      try {
                        const { rate, isLive } = await getEurToMadRate();
                        setEurToMadRate(rate);
                        setIsLiveRate(isLive);
                      } catch (error) {
                        console.error('Failed to refresh rate:', error);
                      } finally {
                        setRateLoading(false);
                      }
                    }}
                    disabled={rateLoading}
                    className="h-6 px-2 text-xs"
                  >
                    {rateLoading ? <Loader2 className="h-3 w-3 animate-spin" /> : '🔄'}
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <p className="text-sm text-muted-foreground">
                    1 EUR = {eurToMadRate.toFixed(2)} MAD
                  </p>
                  {rateLoading ? (
                    <div className="text-xs text-muted-foreground">Updating...</div>
                  ) : (
                    <div className={`text-xs px-2 py-1 rounded ${isLiveRate ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                      {isLiveRate ? 'Live' : 'Fallback'}
                    </div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium">Team Summary</h4>
                <p className="text-sm text-muted-foreground">
                  {teamMembers.reduce((sum, member) => sum + member.quantity, 0)} team members across {teamMembers.length} different configurations
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PackagesPage() {
  const [packages, setPackages] = useState<Package[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null)
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [laptops, setLaptops] = useState<Laptop[]>([])
  const [accessories, setAccessories] = useState<Accessory[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activePackage, setActivePackage] = useState<Package | null>(null)

  const [newPackage, setNewPackage] = useState<Partial<Package>>({
    name: "",
    status: "proposed",
    priceType: "HT",
    accessories: [],
    assignedTo: "",
    notes: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  })
  const [selectedLaptopId, setSelectedLaptopId] = useState<string>("")
  const [selectedAccessoryIds, setSelectedAccessoryIds] = useState<string[]>([])

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [editPackage, setEditPackage] = useState<Package | null>(null)
  const [editSelectedLaptopId, setEditSelectedLaptopId] = useState<string>("")
  const [editSelectedAccessoryIds, setEditSelectedAccessoryIds] = useState<string[]>([])

  // New state for package catalog redesign
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'grid'>('kanban')
  const [filters, setFilters] = useState({
    os: 'all',
    brand: 'all',
    priceRange: [5000, 25000] as [number, number]
  })

  const { toast } = useToast()

  // Configure dnd-kit sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Minimum drag distance for activation (prevents accidental drags)
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Define columns configuration
  const columns: { id: StatusColumn; title: string; icon: React.ReactElement; color: string }[] = [
    { 
      id: 'proposed', 
      title: 'Proposed', 
      icon: <MoveHorizontal className="h-5 w-5 mr-2 text-blue-500" />,
      color: 'bg-blue-100 text-blue-800 hover:bg-blue-200'
    },
    { 
      id: 'approved', 
      title: 'Approved', 
      icon: <CheckCircle2 className="h-5 w-5 mr-2 text-green-500" />,
      color: 'bg-green-100 text-green-800 hover:bg-green-200'
    },
    { 
      id: 'rejected', 
      title: 'Rejected', 
      icon: <XCircle className="h-5 w-5 mr-2 text-red-500" />,
      color: 'bg-red-100 text-red-800 hover:bg-red-200'
    },
    { 
      id: 'delivered', 
      title: 'Delivered', 
      icon: <PackageIcon className="h-5 w-5 mr-2 text-purple-500" />,
      color: 'bg-purple-100 text-purple-800 hover:bg-purple-200'
    }
  ];

  // Get packages for a specific status (legacy - for old kanban view)
  const getPackagesByStatus = (status: StatusColumn) => {
    return packages.filter(pkg => pkg.status === status);
  };

  // Filter packages based on current filters
  const getFilteredPackages = () => {
    return packages.filter(pkg => {
      // OS Filter
      if (filters.os !== 'all') {
        if (filters.os === 'Windows' && pkg.laptop.brand?.toLowerCase() === 'apple') return false;
        if (filters.os === 'macOS' && pkg.laptop.brand?.toLowerCase() !== 'apple') return false;
      }
      
      // Brand Filter
      if (filters.brand !== 'all' && pkg.laptop.brand !== filters.brand) return false;
      
      // Price Range Filter
      const totalPrice = pkg.laptop.price + pkg.accessories.reduce((sum, acc) => sum + acc.price, 0);
      if (totalPrice < filters.priceRange[0] || totalPrice > filters.priceRange[1]) return false;
      
      return true;
    });
  };

  // Group packages by profile and create templates (for new profile-based kanban)
  const getPackageTemplatesByProfile = () => {
    const filteredPackages = getFilteredPackages();
    const templatesByProfile: { [key: string]: Array<{ template: Package; assignments: Package[]; configId: string }> } = {};
    
    // Initialize profile groups
    const profileTypes = ['developer', 'consultant'];
    profileTypes.forEach(profile => {
      templatesByProfile[profile] = [];
    });
    
    // Group packages by their laptop's supported profiles first
    const packagesByProfile: { [key: string]: Package[] } = {};
    profileTypes.forEach(profile => {
      packagesByProfile[profile] = [];
    });
    
    filteredPackages.forEach(pkg => {
      const profiles = pkg.laptop.supportedProfiles || [];
      if (profiles.length === 0) {
        if (!packagesByProfile['unassigned']) packagesByProfile['unassigned'] = [];
        packagesByProfile['unassigned'].push(pkg);
      } else {
        profiles.forEach((profileObj: any) => {
          const profile = profileObj.profile;
          if (!packagesByProfile[profile]) packagesByProfile[profile] = [];
          packagesByProfile[profile].push(pkg);
        });
      }
    });
    
    // Now group by configuration within each profile
    Object.keys(packagesByProfile).forEach(profile => {
      const packages = packagesByProfile[profile];
      const configGroups: { [key: string]: Package[] } = {};
      
      packages.forEach(pkg => {
        // Create a configuration ID based on laptop + accessories
        const configId = pkg.laptop.id + '|' + pkg.accessories.map(a => a.id).sort().join(',');
        if (!configGroups[configId]) {
          configGroups[configId] = [];
        }
        configGroups[configId].push(pkg);
      });
      
      // Convert config groups to templates
      templatesByProfile[profile] = Object.entries(configGroups).map(([configId, assignments]) => ({
        template: assignments[0], // Use first package as template
        assignments,
        configId
      }));
    });
    
    return templatesByProfile;
  };

  // Profile configuration for display
  const profileColumns = [
    {
      id: 'developer',
      title: 'Full-Stack Developer',
      icon: <Keyboard className="h-4 w-4 mr-2" />,
      color: 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-300',
      description: 'High-performance laptops for development work'
    },
    {
      id: 'consultant',
      title: 'Salesforce Consultant', 
      icon: <MousePointer2 className="h-4 w-4 mr-2" />,
      color: 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-300',
      description: 'Business-focused laptops for consulting tasks'
    },
    {
      id: 'unassigned',
      title: 'Unassigned',
      icon: <PackageIcon className="h-4 w-4 mr-2" />,
      color: 'bg-gray-500/10 border-gray-500/20 text-gray-700 dark:text-gray-300',
      description: 'Packages without specific profile assignment'
    }
  ];

  // Fetch packages data
  useEffect(() => {
    const getPackages = async () => {
      try {
        setLoading(true)
        const data = await fetchPackages()
        setPackages(data)
        setError(null)
      } catch (err) {
        console.error("Error fetching packages:", err)
        setError("Failed to load packages. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    getPackages()
  }, [])

  // Fetch laptops and accessories for the add package dialog
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [laptopsData, accessoriesData] = await Promise.all([
          fetchLaptops(),
          fetchAccessories()
        ])
        setLaptops(laptopsData)
        setAccessories(accessoriesData)
      } catch (err) {
        console.error("Error fetching options:", err)
      }
    }

    if (isAddDialogOpen || isEditDialogOpen) {
      fetchOptions()
    }
  }, [isAddDialogOpen, isEditDialogOpen])

  // Initialize edit form when a package is selected for editing
  useEffect(() => {
    if (editPackage) {
      setEditSelectedLaptopId(editPackage.laptop.id)
      setEditSelectedAccessoryIds(editPackage.accessories.map(acc => acc.id))
    }
  }, [editPackage])

  // Add support for URL parameter to open package detail
  useEffect(() => {
    const handleUrlParams = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const detailId = searchParams.get('detail');
      
      if (detailId && packages.length > 0) {
        const packageToOpen = packages.find(pkg => pkg.id === detailId);
        if (packageToOpen) {
          setSelectedPackage(packageToOpen);
          setIsDetailDialogOpen(true);
        }
      }
    };

    if (packages.length > 0) {
      handleUrlParams();
    }
  }, [packages]);

  // Group packages by status
  const proposedPackages = packages.filter((pkg) => pkg.status === "proposed")
  const approvedPackages = packages.filter((pkg) => pkg.status === "approved")
  const rejectedPackages = packages.filter((pkg) => pkg.status === "rejected")
  const deliveredPackages = packages.filter((pkg) => pkg.status === "delivered")

  const formatPrice = (price: number, priceType: "HT" | "TTC") => {
    return `${price.toLocaleString()} MAD (${priceType})`
  }

  const getTotalPrice = (pkg: Package) => {
    // Prices are now properly converted to numbers in the API layer
    const laptopPrice = pkg.laptop.price
    const accessoriesPrice = pkg.accessories.reduce((sum: number, acc: Accessory) => sum + acc.price, 0)
    const totalPrice = laptopPrice + accessoriesPrice
    return `${totalPrice.toLocaleString()} MAD (${pkg.priceType})`
  }

  const getAccessoryIcon = (type: string) => {
    switch (type) {
      case "mouse":
        return <MousePointer2 className="h-4 w-4" />
      case "keyboard":
        return <Keyboard className="h-4 w-4" />
      case "headphone":
        return <Headphones className="h-4 w-4" />
      case "dock":
        return <Plug className="h-4 w-4" />
      default:
        return <Info className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "proposed":
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Proposed</Badge>
      case "approved":
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Approved</Badge>
      case "rejected":
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Rejected</Badge>
      case "delivered":
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">Delivered</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const handlePackageClick = (pkg: Package) => {
    setSelectedPackage(pkg)
    setIsDetailDialogOpen(true)
  }

  // Handle drag start event
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const pkg = packages.find(p => p.id === active.id);
    if (pkg) {
      setActivePackage(pkg);
    }
  }

  // Handle drag over event (not needed for our basic implementation)
  const handleDragOver = (event: DragOverEvent) => {
    // Optional: implement logic for sorting within a container
    return;
  }

  // Handle drag end event
  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    
    // Reset active package
    setActivePackage(null);
    
    // If no over target, do nothing
    if (!over) {
      return;
    }
    
    const packageId = active.id.toString();
    const newStatus = over.id.toString() as PackageStatus;
    
    // Find the package being dragged
    const pkg = packages.find(p => p.id === packageId);
    
    // If package not found or status didn't change, do nothing
    if (!pkg || pkg.status === newStatus) {
      return;
    }
    
    try {
      // Optimistically update the local state first
      const updatedPackage: Package = {
        ...pkg,
        status: newStatus,
        updatedAt: new Date().toISOString()
      };
      
      // Update local state immediately to prevent UI flicker
      setPackages(prev => prev.map(p => 
        p.id === updatedPackage.id ? updatedPackage : p
      ));
      
      // Then update the backend
      await updatePackage(updatedPackage);
      
      toast({
        title: "Status Updated",
        description: `${updatedPackage.name} moved to ${newStatus.charAt(0).toUpperCase() + newStatus.slice(1)}`,
      });
    } catch (err) {
      console.error("Error updating package status:", err);
      
      // Revert to previous state if update fails
      setPackages(prev => [...prev]);
      
      toast({
        title: "Error",
        description: "Failed to update package status. Please try again."
      });
    }
  }

  const handleAddPackage = async () => {
    try {
      setIsSubmitting(true)

      // Validate required fields
      if (!newPackage.name || !selectedLaptopId) {
        toast({
          title: "Validation Error",
          description: "Package name and laptop selection are required.",
        })
        return
      }

      // Find the selected laptop
      const selectedLaptop = laptops.find(laptop => laptop.id === selectedLaptopId)
      if (!selectedLaptop) {
        toast({
          title: "Error",
          description: "Selected laptop not found.",
        })
        return
      }

      // Find the selected accessories
      const selectedAccessories = accessories.filter(acc => selectedAccessoryIds.includes(acc.id))

      // Prepare package data
      const packageData: Omit<Package, "id"> = {
        name: newPackage.name,
        laptop: selectedLaptop,
        accessories: selectedAccessories,
        status: newPackage.status as PackageStatus,
        priceType: newPackage.priceType as PriceType,
        assignedTo: newPackage.assignedTo || undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notes: newPackage.notes || undefined
      }

      // Submit the new package
      const response = await createPackage(packageData)

      // Refresh the package list
      const updatedPackages = await fetchPackages()
      setPackages(updatedPackages)

      // Reset form and close dialog
      setNewPackage({
        name: "",
        status: "proposed",
        priceType: "HT",
        accessories: [],
        assignedTo: "",
        notes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      })
      setSelectedLaptopId("")
      setSelectedAccessoryIds([])
      setIsAddDialogOpen(false)

      toast({
        title: "Package Added",
        description: `${packageData.name} has been added successfully.`,
      })
    } catch (err) {
      console.error("Error adding package:", err)
      toast({
        title: "Error",
        description: "Failed to add package. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleAccessoryToggle = (accessoryId: string) => {
    setSelectedAccessoryIds(prev => 
      prev.includes(accessoryId)
        ? prev.filter(id => id !== accessoryId)
        : [...prev, accessoryId]
    )
  }

  const handleEditClick = async (pkg: Package) => {
    setEditPackage(pkg)
    
    // Set the laptop ID directly from the package
    const laptopId = pkg.laptop.id
    console.log("Setting laptop ID:", laptopId)
    setEditSelectedLaptopId(laptopId)
    
    // Set the accessory IDs
    setEditSelectedAccessoryIds(pkg.accessories.map(acc => acc.id))
    
    // Make sure we have both laptops and accessories data
    if (laptops.length === 0 || accessories.length === 0) {
      try {
        const [laptopsData, accessoriesData] = await Promise.all([
          fetchLaptops(),
          fetchAccessories()
        ])
        setLaptops(laptopsData)
        setAccessories(accessoriesData)
      } catch (err) {
        console.error("Error fetching options for edit:", err)
      }
    }
    
    setIsEditDialogOpen(true)
    setIsDetailDialogOpen(false)
  }

  const handleDeleteClick = (pkg: Package) => {
    setSelectedPackage(pkg)
    setIsDeleteDialogOpen(true)
    setIsDetailDialogOpen(false)
  }

  const handleEditAccessoryToggle = (accessoryId: string) => {
    setEditSelectedAccessoryIds(prev => 
      prev.includes(accessoryId)
        ? prev.filter(id => id !== accessoryId)
        : [...prev, accessoryId]
    )
  }

  const handleEditPackage = async () => {
    if (!editPackage) return
    
    try {
      setIsSubmitting(true)

      // Validate required fields
      if (!editPackage.name || !editSelectedLaptopId) {
        toast({
          title: "Validation Error",
          description: "Package name and laptop selection are required.",
        })
        return
      }

      // Find the selected laptop
      const selectedLaptop = laptops.find(laptop => laptop.id === editSelectedLaptopId)
      if (!selectedLaptop) {
        toast({
          title: "Error",
          description: "Selected laptop not found.",
        })
        return
      }

      // Find the selected accessories
      const selectedAccessories = accessories.filter(acc => editSelectedAccessoryIds.includes(acc.id))

      // Prepare updated package data
      const updatedPackage: Package = {
        ...editPackage,
        laptop: selectedLaptop,
        accessories: selectedAccessories,
        updatedAt: new Date().toISOString()
      }

      // Submit the updated package
      await updatePackage(updatedPackage)

      // Refresh the package list
      const updatedPackages = await fetchPackages()
      setPackages(updatedPackages)

      // Reset form and close dialog
      setEditPackage(null)
      setEditSelectedLaptopId("")
      setEditSelectedAccessoryIds([])
      setIsEditDialogOpen(false)

      toast({
        title: "Package Updated",
        description: `${updatedPackage.name} has been updated successfully.`,
      })
    } catch (err) {
      console.error("Error updating package:", err)
      toast({
        title: "Error",
        description: "Failed to update package. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeletePackage = async () => {
    if (!selectedPackage) return

    try {
      setIsSubmitting(true)

      // Delete the package
      await deletePackage(selectedPackage.id)

      // Refresh the package list
      const updatedPackages = await fetchPackages()
      setPackages(updatedPackages)

      setIsDeleteDialogOpen(false)
      setSelectedPackage(null)

      toast({
        title: "Package Deleted",
        description: `${selectedPackage.name} has been deleted.`,
      })
    } catch (err) {
      console.error("Error deleting package:", err)
      toast({
        title: "Error",
        description: "Failed to delete package. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Debug selected laptop
  useEffect(() => {
    if (isEditDialogOpen && editPackage && editPackage.laptop) {
      // Always force set the laptop ID when the dialog opens
      const laptopId = editPackage.laptop.id;
      console.log("Setting laptop ID from edit useEffect:", laptopId);
      setEditSelectedLaptopId(laptopId);
    }
  }, [isEditDialogOpen, editPackage]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading packages...</p>
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
            <h1 className="text-2xl font-bold tracking-tight">Laptop Packages</h1>
          </div>
        </div>
      </header>

      <main className="container py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight mb-2">Packages & Cost Simulator</h1>
            <p className="text-muted-foreground">
              Manage laptop packages and calculate team costs for project planning.
            </p>
          </div>
        </div>

        <Tabs defaultValue="management" className="w-full">
          {/* Left-Aligned Pill Style */}
          <div className="mb-6">
            <TabsList className="inline-flex bg-muted/50 rounded-full p-1">
              <TabsTrigger value="management" className="rounded-full">📦 Package Management</TabsTrigger>
              <TabsTrigger value="simulator" className="rounded-full">🧮 Cost Simulator</TabsTrigger>
              <TabsTrigger value="pricing" className="rounded-full">📊 Pricing Details</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="management" className="mt-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Package Catalog</h2>
                <p className="text-muted-foreground">
                  Browse and manage IT packages organized by profile types.
                </p>
              </div>
              <div className="flex items-center gap-4">
                {/* View Toggle */}
                <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
                  <Button
                    variant={viewMode === 'kanban' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('kanban')}
                    className="h-8 px-3"
                    title="Kanban View"
                  >
                    <Layout className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className="h-8 px-3"
                    title="List View"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className="h-8 px-3"
                    title="Grid View"
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                </div>
                
                <Button 
                  onClick={() => setIsAddDialogOpen(true)}
                  className="bg-primary hover:bg-primary/90"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
            Add Package
          </Button>
              </div>
            </div>
            
            {/* Smart Filters */}
            <div className="mb-6 p-4 bg-muted/30 rounded-lg border">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                
                {/* OS Filter */}
                <Select value={filters.os} onValueChange={(value) => setFilters(prev => ({ ...prev, os: value }))}>
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue placeholder="OS" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All OS</SelectItem>
                    <SelectItem value="Windows">Windows</SelectItem>
                    <SelectItem value="macOS">macOS</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Brand Filter */}
                <Select value={filters.brand} onValueChange={(value) => setFilters(prev => ({ ...prev, brand: value }))}>
                  <SelectTrigger className="w-32 h-8">
                    <SelectValue placeholder="Brand" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Brands</SelectItem>
                    <SelectItem value="Apple">Apple</SelectItem>
                    <SelectItem value="HP">HP</SelectItem>
                    <SelectItem value="Lenovo">Lenovo</SelectItem>
                    <SelectItem value="Dell">Dell</SelectItem>
                  </SelectContent>
                </Select>
                
                {/* Price Range Filter */}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Price:</span>
                  <span className="text-sm font-medium">{filters.priceRange[0].toLocaleString()} - {filters.priceRange[1].toLocaleString()} MAD</span>
                  <div className="w-32">
                    <Slider
                      value={filters.priceRange}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, priceRange: value as [number, number] }))}
                      max={25000}
                      min={5000}
                      step={1000}
                      className="w-full"
                    />
                  </div>
                </div>
                
                {/* Clear Filters */}
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setFilters({ os: 'all', brand: 'all', priceRange: [5000, 25000] })}
                  className="h-8"
                >
                  Clear
                </Button>
              </div>
        </div>

        {loading ? (
              <div className="grid grid-cols-3 gap-6">
                {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="space-y-3">
                    <Skeleton className="h-6 w-32" />
                <Skeleton className="h-[500px] w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
              <>
                {viewMode === 'kanban' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {profileColumns.map((column) => {
                      const templates = getPackageTemplatesByProfile()[column.id] || [];
                      const totalAssignments = templates.reduce((sum, t) => sum + t.assignments.length, 0);
                      
                      return (
                        <div key={column.id} className="space-y-4">
                          {/* Profile Column Header */}
                          <div className={`rounded-lg p-4 ${column.color} border`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center">
                                {column.icon}
                                <h3 className="font-semibold">{column.title}</h3>
                              </div>
                              <div className="flex gap-2">
                                <Badge variant="outline" className="bg-background/50">
                                  {templates.length} configs
                                </Badge>
                                <Badge variant="outline" className="bg-background/50">
                                  {totalAssignments} assigned
                                </Badge>
                              </div>
                            </div>
                            <p className="text-xs mt-1 opacity-90">{column.description}</p>
                          </div>

                          {/* Package Template Cards */}
                    <div className="space-y-3">
                            {templates.map((template) => (
                              <Card key={template.configId} className="p-4 hover:shadow-md transition-shadow cursor-pointer relative" onClick={() => handlePackageClick(template.template)}>
                                <div className="space-y-3">
                                  {/* Template Header with Assignment Count */}
                                  <div className="flex justify-between items-start">
                                    <div className="flex-1 min-w-0">
                                      <h4 className="font-medium line-clamp-1">
                                        {template.template.laptop.brand} {template.template.laptop.model} Configuration
                                      </h4>
                                      <p className="text-xs text-muted-foreground">
                                        {template.assignments.length} {template.assignments.length === 1 ? 'person assigned' : 'people assigned'}
                                      </p>
                                    </div>
                                    <Badge variant="outline" className="ml-2 bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-500/20">
                                      {template.assignments.length}
                                    </Badge>
                                  </div>

                                  {/* Laptop Info */}
                                  <div className="flex items-center gap-3">
                                    {template.template.laptop.images && template.template.laptop.images.length > 0 && (
                                      <div className="relative w-12 h-12 rounded-md overflow-hidden bg-muted">
                                        <Image
                                          src={template.template.laptop.images[0]}
                                          alt={`${template.template.laptop.brand} ${template.template.laptop.model}`}
                                          fill
                                          className="object-cover"
                                          onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                          }}
                                        />
                                      </div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                      <p className="font-medium text-sm line-clamp-1">
                                        {template.template.laptop.brand} {template.template.laptop.model}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {template.template.laptop.processor}
                                      </p>
                                    </div>
                                  </div>

                                  {/* Accessories - Always show this section for consistent card height */}
                                  <div className="flex items-center gap-2 min-h-[20px]">
                                    {template.template.accessories.length > 0 ? (
                                      <>
                                        <div className="flex gap-1">
                                          {template.template.accessories.slice(0, 3).map((accessory, index) => (
                                            <div key={index} className="w-5 h-5 text-muted-foreground">
                                              {getAccessoryIcon(accessory.type)}
                                            </div>
                      ))}
                    </div>
                                        <span className="text-xs text-muted-foreground">
                                          {template.template.accessories.length} accessories
                                        </span>
                                      </>
                                    ) : (
                                      <span className="text-xs text-muted-foreground">No accessories</span>
                                    )}
                                  </div>

                                  {/* Assigned People Preview with Tooltip */}
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-muted-foreground">Assigned to:</span>
                                    <TooltipProvider>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <div className="flex -space-x-1 cursor-pointer hover:scale-105 transition-transform">
                                            {template.assignments.slice(0, 3).map((assignment, index) => (
                                              <div key={index} className="w-7 h-7 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300 ring-2 ring-background">
                                                <span className="leading-none block transform translate-y-[0.5px]" style={{ fontFamily: 'ui-monospace, monospace' }}>
                                                  {assignment.name?.charAt(0).toUpperCase() || '?'}
                                                </span>
                                              </div>
                                            ))}
                                            {template.assignments.length > 3 && (
                                              <div className="w-7 h-7 bg-muted border border-border rounded-full flex items-center justify-center text-xs font-bold text-muted-foreground ring-2 ring-background">
                                                <span className="leading-none block transform translate-y-[0.5px]" style={{ fontFamily: 'ui-monospace, monospace' }}>
                                                  +{template.assignments.length - 3}
                                                </span>
                                              </div>
                                            )}
                                          </div>
                                        </TooltipTrigger>
                                        <TooltipContent side="top" className="max-w-xs">
                                          <div className="space-y-1">
                                            <p className="font-medium text-sm">Assigned People:</p>
                                            <div className="space-y-1">
                                              {template.assignments.map((assignment, index) => (
                                                <div key={index} className="text-xs flex items-center gap-2">
                                                  <div className="w-5 h-5 bg-blue-500/20 border border-blue-500/30 rounded-full flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300">
                                                    <span className="leading-none block transform translate-y-[0.5px]" style={{ fontFamily: 'ui-monospace, monospace' }}>
                                                      {assignment.name?.charAt(0).toUpperCase() || '?'}
                                                    </span>
                                                  </div>
                                                  <span className="font-medium">{assignment.name || 'Unknown'}</span>
                                                </div>
                                              ))}
                                            </div>
                                          </div>
                                        </TooltipContent>
                                      </Tooltip>
                                    </TooltipProvider>
            </div>

                                  {/* Price */}
                                  <div className="flex justify-between items-center pt-2 border-t">
                                    <span className="text-xs text-muted-foreground">Unit Price</span>
                                    <span className="font-semibold text-sm">{getTotalPrice(template.template)}</span>
                                  </div>
                                </div>
                              </Card>
                            ))}

                            {templates.length === 0 && (
                              <div className="text-center py-8 text-muted-foreground">
                                <PackageIcon className="h-12 w-12 mx-auto mb-2 opacity-50" />
                                <p className="text-sm">No package templates in this category</p>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {viewMode === 'list' && (
                  <div className="border rounded-lg">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Package</TableHead>
                          <TableHead>Laptop</TableHead>
                          <TableHead>Profile</TableHead>
                          <TableHead>Accessories</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getFilteredPackages().map((pkg) => (
                          <TableRow key={pkg.id} className="cursor-pointer hover:bg-muted/50" onClick={() => handlePackageClick(pkg)}>
                            <TableCell className="font-medium">{pkg.name}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                {pkg.laptop.images && pkg.laptop.images.length > 0 && (
                                  <div className="relative w-8 h-8 rounded overflow-hidden bg-muted">
                                    <Image
                                      src={pkg.laptop.images[0]}
                                      alt={`${pkg.laptop.brand} ${pkg.laptop.model}`}
                                      fill
                                      className="object-cover"
                  />
                </div>
                                )}
                                <div>
                                  <p className="font-medium text-sm">{pkg.laptop.brand} {pkg.laptop.model}</p>
                                  <p className="text-xs text-muted-foreground">{pkg.laptop.processor}</p>
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex gap-1">
                                {(pkg.laptop.supportedProfiles || []).map((profile: any, index: number) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {profile.profile === 'developer' ? 'Dev' : 'Consultant'}
                                  </Badge>
                                ))}
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {pkg.accessories.slice(0, 3).map((accessory, index) => (
                                  <div key={index} className="w-4 h-4 text-muted-foreground">
                                    {getAccessoryIcon(accessory.type)}
                                  </div>
                                ))}
                                {pkg.accessories.length > 3 && (
                                  <span className="text-xs text-muted-foreground">+{pkg.accessories.length - 3}</span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>{getStatusBadge(pkg.status)}</TableCell>
                            <TableCell className="text-right font-semibold">{getTotalPrice(pkg)}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}

                {viewMode === 'grid' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {getFilteredPackages().map((pkg) => (
                      <Card key={pkg.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={() => handlePackageClick(pkg)}>
                        <div className="space-y-3">
                          {/* Package Header */}
                          <div className="flex justify-between items-start">
                            <h4 className="font-medium line-clamp-2">{pkg.name}</h4>
                            {getStatusBadge(pkg.status)}
                          </div>

                          {/* Laptop Image & Info */}
                          <div className="space-y-2">
                            {pkg.laptop.images && pkg.laptop.images.length > 0 && (
                              <div className="relative w-full h-32 rounded-md overflow-hidden bg-muted">
                                <Image
                                  src={pkg.laptop.images[0]}
                                  alt={`${pkg.laptop.brand} ${pkg.laptop.model}`}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <p className="font-medium text-sm line-clamp-1">
                                {pkg.laptop.brand} {pkg.laptop.model}
                              </p>
                              <p className="text-xs text-muted-foreground line-clamp-1">
                                {pkg.laptop.processor}
                              </p>
                            </div>
                          </div>

                          {/* Profile Tags */}
                          <div className="flex flex-wrap gap-1">
                            {(pkg.laptop.supportedProfiles || []).map((profile: any, index: number) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {profile.profile === 'developer' ? 'Developer' : 'Consultant'}
                              </Badge>
                            ))}
                          </div>

                          {/* Accessories */}
                          {pkg.accessories.length > 0 && (
                            <div className="flex items-center gap-2">
                              <div className="flex gap-1">
                                {pkg.accessories.slice(0, 3).map((accessory, index) => (
                                  <div key={index} className="w-4 h-4 text-muted-foreground">
                                    {getAccessoryIcon(accessory.type)}
                                  </div>
                                ))}
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {pkg.accessories.length} accessories
                              </span>
                            </div>
                          )}

                          {/* Price */}
                          <div className="flex justify-between items-center pt-2 border-t">
                            <span className="text-xs text-muted-foreground">Total Price</span>
                            <span className="font-semibold">{getTotalPrice(pkg)}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}
          </TabsContent>

          <TabsContent value="simulator" className="mt-6">
            <CostSimulator packages={packages} />
          </TabsContent>

          <TabsContent value="pricing" className="mt-6">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-2">Pricing Calculation Details</h2>
                <p className="text-muted-foreground">
                  Transparent breakdown of how unit prices are calculated from your actual package data.
                </p>
              </div>
              
              <PricingBreakdown packages={packages} />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Add Package Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Create New Package</DialogTitle>
            <DialogDescription>Configure a new laptop package with accessories</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="package-name">Package Name</Label>
              <Input
                id="package-name"
                value={newPackage.name}
                onChange={(e) => setNewPackage({ ...newPackage, name: e.target.value })}
                placeholder="Enter package name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="laptop">Select Laptop</Label>
              <Select
                value={selectedLaptopId}
                onValueChange={setSelectedLaptopId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a laptop" />
                </SelectTrigger>
                <SelectContent>
                  {laptops.map((laptop) => (
                    <SelectItem key={laptop.id} value={laptop.id}>
                      {laptop.brand} {laptop.model} - {formatPrice(laptop.price, laptop.priceType)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Select Accessories</Label>
              <div className="border rounded-md p-4 h-48 overflow-auto">
                {accessories.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No accessories available</p>
                ) : (
                  <div className="space-y-2">
                    {accessories.map((accessory) => (
                      <div key={accessory.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={`accessory-${accessory.id}`}
                          checked={selectedAccessoryIds.includes(accessory.id)}
                          onChange={() => handleAccessoryToggle(accessory.id)}
                          className="h-4 w-4 rounded border-gray-300"
                        />
                        <Label htmlFor={`accessory-${accessory.id}`} className="flex items-center gap-2 text-sm font-normal cursor-pointer">
                          {getAccessoryIcon(accessory.type)}
                          <span>{accessory.name} ({accessory.brand}) - {formatPrice(accessory.price, accessory.priceType)}</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={newPackage.status as string}
                  onValueChange={(value) => setNewPackage({ ...newPackage, status: value as PackageStatus })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="proposed">Proposed</SelectItem>
                    <SelectItem value="approved">Approved</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price-type">Price Type</Label>
                <Select
                  value={newPackage.priceType as string}
                  onValueChange={(value) => setNewPackage({ ...newPackage, priceType: value as PriceType })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select price type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HT">HT (Ex. Tax)</SelectItem>
                    <SelectItem value="TTC">TTC (Inc. Tax)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="assigned-to">Assigned To</Label>
                <Input
                  id="assigned-to"
                  value={newPackage.assignedTo || ""}
                  onChange={(e) => setNewPackage({ ...newPackage, assignedTo: e.target.value })}
                  placeholder="User name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Input
                id="notes"
                value={newPackage.notes || ""}
                onChange={(e) => setNewPackage({ ...newPackage, notes: e.target.value })}
                placeholder="Additional information (optional)"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleAddPackage} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Package
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Package Details Dialog */}
      <Dialog open={isDetailDialogOpen} onOpenChange={setIsDetailDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedPackage && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>{selectedPackage.name}</span>
                  {getStatusBadge(selectedPackage.status)}
                </DialogTitle>
                <DialogDescription>
                  Assigned to {selectedPackage.assignedTo} • Created on {new Date(selectedPackage.createdAt).toLocaleDateString()}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4 space-y-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Laptop</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center">
                      <div className="relative h-16 w-20 mr-4 bg-gray-100 rounded">
                        <Image
                          src={selectedPackage.laptop.images?.[0] || "/placeholder.svg"}
                          alt={selectedPackage.laptop.model}
                          fill
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">{selectedPackage.laptop.brand} {selectedPackage.laptop.model}</h3>
                        <p className="text-sm text-muted-foreground">
                          {selectedPackage.laptop.processor} • {selectedPackage.laptop.ram}GB RAM • {selectedPackage.laptop.storage}GB
                        </p>
                        <p className="text-sm font-medium mt-1">
                          {formatPrice(selectedPackage.laptop.price, selectedPackage.laptop.priceType)}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">Accessories ({selectedPackage.accessories.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {selectedPackage.accessories.map((accessory) => (
                        <div key={accessory.id} className="flex items-center">
                          <div className="relative h-12 w-12 mr-3 bg-gray-100 rounded p-1">
                            {accessory.image ? (
                              <Image
                                src={accessory.image}
                                alt={accessory.name}
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <div className="flex items-center justify-center h-full">
                                {getAccessoryIcon(accessory.type)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center">
                              <h3 className="font-medium">{accessory.name}</h3>
                              <Badge className="ml-2" variant="outline">{accessory.type}</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{accessory.brand}</p>
                          </div>
                          <div className="text-sm font-medium">
                            {formatPrice(accessory.price, accessory.priceType)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {selectedPackage.notes && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">Notes</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm">{selectedPackage.notes}</p>
                    </CardContent>
                  </Card>
                )}

                <div className="flex justify-between items-center pt-2">
                  <div className="text-sm text-muted-foreground">
                    Last updated: {new Date(selectedPackage.updatedAt).toLocaleDateString()}
                  </div>
                  <div className="text-lg font-semibold">
                    Total: {getTotalPrice(selectedPackage)}
                  </div>
                </div>
              </div>

              <DialogFooter className="flex justify-between">
                <div>
                  <Button variant="destructive" onClick={() => handleDeleteClick(selectedPackage)}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </Button>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsDetailDialogOpen(false)}>
                    Close
                  </Button>
                  <Button onClick={() => handleEditClick(selectedPackage)}>
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Package
                  </Button>
                </div>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Package</DialogTitle>
            <DialogDescription>Update the laptop package configuration</DialogDescription>
          </DialogHeader>

          {editPackage && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-package-name">Package Name</Label>
                <Input
                  id="edit-package-name"
                  value={editPackage.name}
                  onChange={(e) => setEditPackage({ ...editPackage, name: e.target.value })}
                  placeholder="Enter package name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-laptop">Select Laptop</Label>
                <Select
                  value={editSelectedLaptopId || ""}
                  onValueChange={(value) => {
                    console.log("Laptop selected:", value);
                    setEditSelectedLaptopId(value);
                  }}
                >
                  <SelectTrigger id="edit-laptop">
                    <SelectValue placeholder="Select a laptop">
                      {editSelectedLaptopId && laptops.length > 0 ? 
                        (() => {
                          const laptop = laptops.find(l => l.id === editSelectedLaptopId);
                          return laptop ? `${laptop.brand} ${laptop.model}` : "Select a laptop";
                        })() : 
                        "Select a laptop"
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {laptops.map((laptop) => (
                      <SelectItem key={laptop.id} value={laptop.id}>
                        {laptop.brand} {laptop.model} - {formatPrice(laptop.price, laptop.priceType)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Select Accessories</Label>
                <div className="border rounded-md p-4 h-48 overflow-auto">
                  {accessories.length === 0 ? (
                    <p className="text-muted-foreground text-sm">No accessories available</p>
                  ) : (
                    <div className="space-y-2">
                      {accessories.map((accessory) => (
                        <div key={accessory.id} className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id={`edit-accessory-${accessory.id}`}
                            checked={editSelectedAccessoryIds.includes(accessory.id)}
                            onChange={() => handleEditAccessoryToggle(accessory.id)}
                            className="h-4 w-4 rounded border-gray-300"
                          />
                          <Label htmlFor={`edit-accessory-${accessory.id}`} className="flex items-center gap-2 text-sm font-normal cursor-pointer">
                            {getAccessoryIcon(accessory.type)}
                            <span>{accessory.name} ({accessory.brand}) - {formatPrice(accessory.price, accessory.priceType)}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select
                    value={editPackage.status}
                    onValueChange={(value) => setEditPackage({ ...editPackage, status: value as PackageStatus })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="proposed">Proposed</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-price-type">Price Type</Label>
                  <Select
                    value={editPackage.priceType}
                    onValueChange={(value) => setEditPackage({ ...editPackage, priceType: value as PriceType })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select price type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HT">HT (Ex. Tax)</SelectItem>
                      <SelectItem value="TTC">TTC (Inc. Tax)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-assigned-to">Assigned To</Label>
                  <Input
                    id="edit-assigned-to"
                    value={editPackage.assignedTo || ""}
                    onChange={(e) => setEditPackage({ ...editPackage, assignedTo: e.target.value })}
                    placeholder="User name"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-notes">Notes</Label>
                <Input
                  id="edit-notes"
                  value={editPackage.notes || ""}
                  onChange={(e) => setEditPackage({ ...editPackage, notes: e.target.value })}
                  placeholder="Additional information (optional)"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleEditPackage} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Package
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this package? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedPackage && (
            <div className="py-4">
              <p className="font-medium">{selectedPackage.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                {selectedPackage.laptop.brand} {selectedPackage.laptop.model} with {selectedPackage.accessories.length} accessories
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleDeletePackage} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 