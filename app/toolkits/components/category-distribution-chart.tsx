"use client"

import { Toolkit, ToolkitItem } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

// Simplified color palette that's more cohesive
const getCategoryColor = (category: string, index: number): string => {
  // Base color with varying shades for better distinction while maintaining cohesion
  const colors = [
    "hsl(221, 83%, 53%)",     // primary blue
    "hsl(221, 83%, 65%)",     // lighter blue
    "hsl(221, 83%, 45%)",     // darker blue
    "hsl(221, 83%, 75%)",     // even lighter blue
    "hsl(221, 83%, 35%)",     // even darker blue
    "hsl(221, 70%, 60%)",     // desaturated blue
    "hsl(221, 70%, 50%)",     // desaturated darker blue
    "hsl(221, 60%, 70%)",     // more desaturated lighter blue
    "hsl(221, 60%, 40%)",     // more desaturated darker blue
  ];
  
  return colors[index % colors.length];
};

interface CategoryDistributionChartProps {
  toolkit: Toolkit;
  size?: number;
}

export function CategoryDistributionChart({ toolkit, size = 220 }: CategoryDistributionChartProps) {
  // Group tools by category
  const toolsByCategory: Record<string, ToolkitItem[]> = {};
  
  toolkit.tools.forEach(tool => {
    if (!toolsByCategory[tool.category]) {
      toolsByCategory[tool.category] = [];
    }
    toolsByCategory[tool.category].push(tool);
  });
  
  // Calculate percentages and prepare segments for the pie chart
  const categoryData = Object.entries(toolsByCategory).map(([category, tools]) => ({
    category,
    count: tools.length,
    percent: (tools.length / toolkit.tools.length) * 100
  }));
  
  // Sort by count descending
  categoryData.sort((a, b) => b.count - a.count);
  
  // Only use top 5 categories to prevent visual clutter, group others
  let chartData = [...categoryData];
  if (chartData.length > 5) {
    const topCategories = chartData.slice(0, 4);
    const otherCategories = chartData.slice(4);
    const otherCount = otherCategories.reduce((sum, cat) => sum + cat.count, 0);
    const otherPercent = otherCategories.reduce((sum, cat) => sum + cat.percent, 0);
    
    chartData = [
      ...topCategories,
      {
        category: "other",
        count: otherCount,
        percent: otherPercent
      }
    ];
  }
  
  // Generate the SVG pie chart
  const radius = size / 2;
  const innerRadius = radius * 0.6; // For donut chart
  
  let startAngle = 0;
  const segments = chartData.map(({ category, percent }, index) => {
    const angle = (percent / 100) * 360;
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    // Calculate coordinates for the path
    const endAngle = startAngle + (angle * Math.PI) / 180;
    
    // Outer arc coordinates
    const outerStartX = radius + radius * Math.cos(startAngle);
    const outerStartY = radius + radius * Math.sin(startAngle);
    const outerEndX = radius + radius * Math.cos(endAngle);
    const outerEndY = radius + radius * Math.sin(endAngle);
    
    // Inner arc coordinates
    const innerStartX = radius + innerRadius * Math.cos(endAngle);
    const innerStartY = radius + innerRadius * Math.sin(endAngle);
    const innerEndX = radius + innerRadius * Math.cos(startAngle);
    const innerEndY = radius + innerRadius * Math.sin(startAngle);
    
    // Create SVG path for donut segment
    const pathData = [
      `M ${outerStartX},${outerStartY}`,
      `A ${radius},${radius} 0 ${largeArcFlag} 1 ${outerEndX},${outerEndY}`,
      `L ${innerStartX},${innerStartY}`,
      `A ${innerRadius},${innerRadius} 0 ${largeArcFlag} 0 ${innerEndX},${innerEndY}`,
      'Z'
    ].join(' ');
    
    const path = {
      d: pathData,
      fill: getCategoryColor(category, index),
      category,
      percent,
      startAngle,
      endAngle,
      midAngle: startAngle + (endAngle - startAngle) / 2
    };
    
    startAngle = endAngle;
    return path;
  });
  
  // Format category name for display
  const formatCategory = (category: string) => {
    if (category === "other") return "Other";
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  return (
    <Card className="bg-card border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Category Distribution</CardTitle>
        <CardDescription>Tools by category</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        <div className="relative" style={{ width: `${size}px`, height: `${size}px` }}>
          <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="transform -rotate-90">
            {segments.map((segment, i) => (
              <path
                key={i}
                d={segment.d}
                fill={segment.fill}
                className="hover:opacity-90 transition-opacity cursor-pointer"
                data-category={segment.category}
                data-percent={segment.percent.toFixed(1)}
                stroke="hsl(var(--card))"
                strokeWidth="1"
              />
            ))}
          </svg>
          
          {/* Center circle with total count */}
          <div 
            className="absolute rounded-full flex flex-col items-center justify-center"
            style={{ 
              width: `${innerRadius * 2}px`, 
              height: `${innerRadius * 2}px`,
              top: `${radius - innerRadius}px`,
              left: `${radius - innerRadius}px`,
              background: 'hsl(var(--card))',
              boxShadow: 'inset 0 0 5px rgba(0,0,0,0.05)'
            }}
          >
            <span className="text-3xl font-bold">{toolkit.tools.length}</span>
            <span className="text-xs text-muted-foreground">Total Tools</span>
          </div>
        </div>
        
        {/* Legend */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-6 w-full">
          {chartData.map(({ category, count, percent }, index) => (
            <div key={category} className="flex items-center text-sm">
              <div
                className="w-3 h-3 rounded-sm mr-2 flex-shrink-0"
                style={{ backgroundColor: getCategoryColor(category, index) }}
              />
              <div className="flex justify-between items-center w-full">
                <span className="truncate">
                  {formatCategory(category)}
                </span>
                <span className="text-muted-foreground whitespace-nowrap ml-1">
                  {count} ({Math.round(percent)}%)
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 