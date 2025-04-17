"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Toolkit, ToolkitItem } from "@/types"
import { cn } from "@/lib/utils"

interface ToolkitUsageChartProps {
  toolkit: Toolkit;
}

export function ToolkitUsageChart({ toolkit }: ToolkitUsageChartProps) {
  // Group tools by category and required status
  const toolsByCategory: Record<string, { total: number; required: number }> = {};
  
  toolkit.tools.forEach(tool => {
    if (!toolsByCategory[tool.category]) {
      toolsByCategory[tool.category] = { total: 0, required: 0 };
    }
    toolsByCategory[tool.category].total++;
    if (tool.isRequired) {
      toolsByCategory[tool.category].required++;
    }
  });
  
  // Convert to array and sort by total count
  const categoriesData = Object.entries(toolsByCategory)
    .map(([category, { total, required }]) => ({
      category,
      total,
      required,
      optional: total - required,
      percent: (total / toolkit.tools.length) * 100
    }))
    .sort((a, b) => b.total - a.total);
    
  // Take top 5 categories only for visual clarity
  const topCategories = categoriesData.slice(0, 5);
  
  // Format category name for display
  const formatCategory = (category: string) => {
    return category.split('_').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };
  
  // Find max value for scaling
  const maxValue = Math.max(...topCategories.map(c => c.total));
  
  return (
    <Card className="bg-card border h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Toolkit Composition</CardTitle>
        <CardDescription>Required vs. optional tools by category</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-5">
          {topCategories.map((cat) => (
            <div key={cat.category} className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <div className="font-medium truncate">{formatCategory(cat.category)}</div>
                <div className="text-muted-foreground">
                  {cat.total} ({Math.round(cat.percent)}%)
                </div>
              </div>
              
              <div className="h-2.5 w-full bg-muted/50 rounded-full overflow-hidden">
                {/* Required tools */}
                <div 
                  className="h-full bg-primary transition-all" 
                  style={{ 
                    width: `${(cat.required / maxValue) * 100}%`,
                    borderTopRightRadius: cat.optional === 0 ? '0.25rem' : 0,
                    borderBottomRightRadius: cat.optional === 0 ? '0.25rem' : 0
                  }}
                />
                {/* Optional tools - render on top of required */}
                {cat.optional > 0 && (
                  <div 
                    className="h-full bg-primary/30 transition-all -mt-2.5" 
                    style={{ 
                      width: `${(cat.total / maxValue) * 100}%`,
                      borderTopRightRadius: '0.25rem',
                      borderBottomRightRadius: '0.25rem'
                    }}
                  />
                )}
              </div>
              
              {/* Tool counts with small legend */}
              <div className="flex text-xs items-center gap-4">
                {cat.required > 0 && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-sm bg-primary"></div>
                    <span className="text-muted-foreground">{cat.required} required</span>
                  </div>
                )}
                {cat.optional > 0 && (
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-sm bg-primary/30"></div>
                    <span className="text-muted-foreground">{cat.optional} optional</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Summary section */}
        <div className="mt-6 pt-4 border-t">
          <h4 className="text-sm font-medium mb-2">Toolkit Summary</h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="bg-muted/20 p-3 rounded-lg">
              <div className="text-2xl font-bold">{toolkit.tools.length}</div>
              <div className="text-xs text-muted-foreground">Total Tools</div>
            </div>
            <div className="bg-muted/20 p-3 rounded-lg">
              <div className="text-2xl font-bold">
                {toolkit.tools.filter(t => t.isRequired).length}
              </div>
              <div className="text-xs text-muted-foreground">Required Tools</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 