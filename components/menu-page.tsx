"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Grid3X3, ArrowLeft } from "lucide-react"
import { getMenuDataWithAvailability, getMenuCategories, formatPrice, getCategoryIcon } from "@/lib/menu-data"
import type { Page, CartItem } from "@/app/page"

interface MenuPageProps {
  onNavigate: (page: Page) => void
  onAddToCart: (item: Omit<CartItem, "quantity">) => void
  cartItemCount: number
}

export default function MenuPage({ onNavigate, onAddToCart, cartItemCount }: MenuPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const categories = getMenuCategories()
  const menuData = getMenuDataWithAvailability()

  const handleAddToCart = (itemNo: string, name: string, rate: string) => {
    const price = formatPrice(rate)
    if (price === 0 && (rate === 'APS' || rate === 'none')) {
      alert('Price available on request. Please contact staff.')
      return
    }
    
    onAddToCart({
      id: `${itemNo}-${Math.random().toString(36).substr(2, 9)}`,
      name,
      description: `Item #${itemNo}`,
      price,
    })
  }

  const getDisplayItems = () => {
    if (selectedCategory === "All") {
      // Filter out categories with no available items
      return menuData.map(category => ({
        ...category,
        products: category.products.filter(item => item.available)
      })).filter(category => category.products.length > 0)
    }
    const categoryData = menuData.find(cat => cat.category === selectedCategory)
    if (categoryData) {
      const availableProducts = categoryData.products.filter(item => item.available)
      return availableProducts.length > 0 ? [{
        ...categoryData,
        products: availableProducts
      }] : []
    }
    return []
  }

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-emerald-700 px-4 sm:px-6 pt-6 sm:pt-8 pb-4">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-emerald-800 p-2"
            onClick={() => onNavigate("home")}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-yellow-300 text-xl sm:text-2xl font-bold">Full Menu</h1>
        </div>

        {/* Category Navigation */}
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          <Button
            variant={selectedCategory === "All" ? "secondary" : "outline"}
            size="sm"
            className={selectedCategory === "All" 
              ? "bg-emerald-800 text-white hover:bg-emerald-900 flex items-center gap-1 px-3 py-2 h-9 whitespace-nowrap"
              : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 flex items-center gap-1 px-3 py-2 h-9 whitespace-nowrap"
            }
            onClick={() => setSelectedCategory("All")}
          >
            <Grid3X3 className="w-4 h-4" />
            All
          </Button>
          
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "secondary" : "outline"}
              size="sm"
              className={selectedCategory === category
                ? "bg-emerald-800 text-white hover:bg-emerald-900 flex items-center gap-1 px-3 py-2 h-9 whitespace-nowrap"
                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 flex items-center gap-1 px-3 py-2 h-9 whitespace-nowrap"
              }
              onClick={() => setSelectedCategory(category)}
            >
              {getCategoryIcon(category)} {category.length > 10 ? category.substring(0, 10) + '...' : category}
            </Button>
          ))}
        </div>
      </div>

      {/* Menu Content */}
      <div className="bg-white px-4 sm:px-6 pb-8">
        {getDisplayItems().map((categoryData) => (
          <div key={categoryData.category} className="mb-8">
            <div className="flex items-center gap-2 mb-4 sticky top-0 bg-white py-2 z-10">
              <span className="text-2xl">{getCategoryIcon(categoryData.category)}</span>
              <h3 className="text-xl font-bold text-gray-900">{categoryData.category}</h3>
              <div className="flex-1 h-px bg-gray-200"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryData.products.map((item) => {
                const price = formatPrice(item.rate)
                const priceDisplay = item.rate === 'APS' ? 'APS' : item.rate === 'none' ? 'N/A' : `₹${price}`
                
                return (
                  <div key={item.itemNo} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow relative">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 text-sm mb-1">{item.name}</h4>
                        <p className="text-xs text-gray-500">Item #{item.itemNo}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-emerald-600 text-sm">{priceDisplay}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-xs text-green-600">Available</span>
                      </div>
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1 h-8 text-xs"
                        onClick={() => handleAddToCart(item.itemNo, item.name, item.rate)}
                        disabled={item.rate === 'none'}
                      >
                        <ShoppingCart className="w-3 h-3 mr-1" />
                        Add
                      </Button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
        
        {getDisplayItems().length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No items found in this category
          </div>
        )}
      </div>

      {/* Cart Button */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => onNavigate("order-list")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-12 h-12 sm:w-14 sm:h-14 relative shadow-lg"
          >
            <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
              {cartItemCount}
            </span>
          </Button>
        </div>
      )}
    </div>
  )
}
