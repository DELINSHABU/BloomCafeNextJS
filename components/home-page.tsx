"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ShoppingCart, Grid3X3 } from "lucide-react"
import Image from "next/image"
import { getMenuCategories, getPopularAvailableItems, formatPrice, getCategoryIcon } from "@/lib/menu-data"
import type { Page, CartItem } from "@/app/page"

interface HomePageProps {
  onNavigate: (page: Page) => void
  onAddToCart: (item: Omit<CartItem, "quantity">) => void
  onShowCart: () => void
  cartItemCount: number
  orderType: "dine-in" | "delivery"
  tableNumber: string
  onOrderTypeChange: (type: "dine-in" | "delivery") => void
}

export default function HomePage({ onNavigate, onAddToCart, onShowCart, cartItemCount, orderType, tableNumber, onOrderTypeChange }: HomePageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const categories = getMenuCategories()
  const popularItems = getPopularAvailableItems()

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

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Header */}
      <div className="bg-emerald-700 px-4 sm:px-6 pt-6 sm:pt-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-yellow-300 text-xl sm:text-2xl font-bold">Bloom Garden Cafe</h1>
          <Button
            variant="outline"
            size="sm"
            className="bg-white text-emerald-700 hover:bg-gray-50 text-xs sm:text-sm"
            onClick={() => window.location.href = '/staff'}
          >
            Staff Login
          </Button>
        </div>

        {/* Order Type Selection */}
        {!tableNumber && (
          <div className="bg-white/10 rounded-lg p-3 mb-4">
            <p className="text-white text-sm mb-2">Order Type:</p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={orderType === "delivery" ? "default" : "outline"}
                className={orderType === "delivery" ? "bg-white text-emerald-700" : "bg-transparent text-white border-white hover:bg-white/10"}
                onClick={() => onOrderTypeChange("delivery")}
              >
                🚚 Delivery
              </Button>
              <Button
                size="sm"
                variant={orderType === "dine-in" ? "default" : "outline"}
                className={orderType === "dine-in" ? "bg-white text-emerald-700" : "bg-transparent text-white border-white hover:bg-white/10"}
                onClick={() => onOrderTypeChange("dine-in")}
              >
                🍽️ Dine In
              </Button>
            </div>
          </div>
        )}

        {/* Table Info for QR Code Orders */}
        {tableNumber && (
          <div className="bg-white/10 rounded-lg p-3 mb-4">
            <p className="text-white text-sm">
              🍽️ Dine-in • Table {tableNumber}
            </p>
          </div>
        )}

        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-400 rounded-2xl p-4 mb-6 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <div className="bg-yellow-100 rounded-lg p-3 w-fit mb-3">
                <div className="text-2xl font-bold text-gray-800">20%</div>
                <div className="text-lg font-bold text-gray-800">OFF</div>
              </div>
              <Button size="sm" className="bg-white text-gray-700 hover:bg-gray-50 text-xs px-3 py-1 h-7">
                Shop now ▶
              </Button>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden mb-2">
                <Image
                  src="/placeholder.svg?height=80&width=80"
                  alt="Al Faham Mandi"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-white font-bold text-sm text-center">Al Faham Mandi</div>
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center mt-4 space-x-1">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          </div>
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
          
          {categories.slice(0, 4).map((category) => (
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
              {getCategoryIcon(category)} {category.length > 8 ? category.substring(0, 8) + '...' : category}
            </Button>
          ))}
          
          <Button
            variant="outline"
            size="sm"
            className="bg-white text-gray-600 border-gray-200 hover:bg-gray-50 flex items-center gap-1 px-3 py-2 h-9 whitespace-nowrap"
            onClick={() => onNavigate("menu")}
          >
            🍴 View All
          </Button>
        </div>

        {/* Popular Section Header */}
        <h2 className="text-white text-xl font-bold mb-4">Popular</h2>
      </div>

      {/* Popular Items Grid */}
      <div className="bg-emerald-700 px-4 sm:px-6 pb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {popularItems.map((item, index) => {
            const gradients = [
              "from-pink-200 to-pink-400",
              "from-orange-200 to-orange-400", 
              "from-blue-200 to-blue-400",
              "from-green-200 to-green-400",
              "from-purple-200 to-purple-400",
              "from-yellow-200 to-yellow-400",
              "from-red-200 to-red-400",
              "from-indigo-200 to-indigo-400"
            ]
            
            const price = formatPrice(item.rate)
            const priceDisplay = item.rate === 'APS' ? 'APS' : item.rate === 'none' ? 'N/A' : `₹${price}`
            
            return (
              <div key={`${item.itemNo}-${index}`} className={`bg-gradient-to-br ${gradients[index % gradients.length]} rounded-2xl p-4 relative menu-card`}>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-2xl sm:text-3xl">🍴</span>
                  </div>
                  <div className="text-white font-medium text-xs sm:text-sm mb-1 text-center line-clamp-2">
                    {item.name.toLowerCase()}
                  </div>
                  <div className="text-white font-bold text-sm sm:text-lg mb-2">{priceDisplay}</div>
                  <Button
                    size="sm"
                    className="bg-orange-400 hover:bg-orange-500 text-white w-8 h-8 p-0 rounded-lg"
                    onClick={() => handleAddToCart(item.itemNo, item.name, item.rate)}
                    disabled={item.rate === 'none'}
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Cart Button */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={onShowCart}
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
