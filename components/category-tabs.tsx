"use client"

import { Button } from "@/components/ui/button"
import { Grid3X3, Coffee, Cookie, Sandwich } from "lucide-react"

interface CategoryTabsProps {
  activeCategory: string
  onCategoryChange: (category: string) => void
}

export function CategoryTabs({ activeCategory, onCategoryChange }: CategoryTabsProps) {
  const categories = [
    { id: "all", label: "All", icon: Grid3X3 },
    { id: "drinks", label: "Drinks", icon: Coffee },
    { id: "bakeries", label: "Bakeries", icon: Cookie },
    { id: "snacks", label: "Snacks", icon: Sandwich },
  ]

  return (
    <div className="flex gap-2 mb-6 overflow-x-auto">
      {categories.map((category) => {
        const Icon = category.icon
        return (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center gap-2 whitespace-nowrap ${
              activeCategory === category.id
                ? "bg-emerald-600 text-white"
                : "bg-white text-emerald-600 border-emerald-200"
            }`}
          >
            <Icon className="w-4 h-4" />
            {category.label}
          </Button>
        )
      })}
    </div>
  )
}
