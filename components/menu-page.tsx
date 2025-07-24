"use client"

import { Button } from "@/components/ui/button"
import { ShoppingCart, Grid3X3 } from "lucide-react"
import Image from "next/image"
import type { Page, CartItem } from "@/app/page"

interface MenuPageProps {
  onNavigate: (page: Page) => void
  onAddToCart: (item: Omit<CartItem, "quantity">) => void
  cartItemCount: number
}

export default function MenuPage({ onNavigate, onAddToCart, cartItemCount }: MenuPageProps) {
  const handleAddToCart = (name: string, price: number) => {
    onAddToCart({
      id: `${name}-${Date.now()}`,
      name,
      description: "Large | Cheese",
      price,
    })
  }

  return (
    <div className="max-w-sm mx-auto bg-white min-h-screen">
      {/* Header */}
      <div className="bg-emerald-700 px-6 pt-8 pb-4">
        <h1 className="text-yellow-300 text-2xl font-bold text-center mb-6">Bloom Garden Cafe</h1>

        {/* Category Navigation */}
        <div className="flex space-x-2 mb-4">
          <Button
            variant="secondary"
            size="sm"
            className="bg-emerald-800 text-white hover:bg-emerald-900 flex items-center gap-1 px-3 py-2 h-9"
            onClick={() => onNavigate("home")}
          >
            <Grid3X3 className="w-4 h-4" />
            All
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white text-gray-600 border-gray-200 hover:bg-gray-50 flex items-center gap-1 px-3 py-2 h-9"
          >
            🥤 Drinks
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white text-gray-600 border-gray-200 hover:bg-gray-50 flex items-center gap-1 px-3 py-2 h-9"
          >
            🧁 Bakeries
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="bg-white text-gray-600 border-gray-200 hover:bg-gray-50 flex items-center gap-1 px-3 py-2 h-9"
          >
            🍿 Sn...
          </Button>
        </div>

        {/* Popular Section Header */}
        <h2 className="text-white text-xl font-bold mb-4">Popular</h2>
      </div>

      {/* Extended Menu Grid */}
      <div className="bg-emerald-700 px-6 pb-8">
        <div className="grid grid-cols-2 gap-3">
          {/* Row 1 */}
          <div className="bg-gradient-to-br from-pink-200 to-pink-400 rounded-2xl p-4 relative">
            <div className="flex flex-col items-center">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Fresh Juices"
                width={80}
                height={80}
                className="mb-3 rounded-lg"
              />
              <div className="text-white font-medium text-sm mb-1">fresh juices</div>
              <div className="text-white font-bold text-lg mb-2">₹70</div>
              <Button
                size="sm"
                className="bg-orange-400 hover:bg-orange-500 text-white w-8 h-8 p-0 rounded-lg"
                onClick={() => handleAddToCart("fresh juices", 70)}
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-200 to-orange-400 rounded-2xl p-4 relative">
            <div className="flex flex-col items-center">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Lime Juices"
                width={80}
                height={80}
                className="mb-3 rounded-lg"
              />
              <div className="text-white font-medium text-sm mb-1">lime juices</div>
              <div className="text-white font-bold text-lg mb-2">₹30-40</div>
              <Button
                size="sm"
                className="bg-orange-400 hover:bg-orange-500 text-white w-8 h-8 p-0 rounded-lg"
                onClick={() => handleAddToCart("lime juices", 35)}
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Row 2 */}
          <div className="bg-gradient-to-br from-orange-200 to-orange-400 rounded-2xl p-4 relative">
            <div className="flex flex-col items-center">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Lime Juices"
                width={80}
                height={80}
                className="mb-3 rounded-lg"
              />
              <div className="text-white font-medium text-sm mb-1">lime juices</div>
              <div className="text-white font-bold text-lg mb-2">₹30-40</div>
              <Button
                size="sm"
                className="bg-orange-400 hover:bg-orange-500 text-white w-8 h-8 p-0 rounded-lg"
                onClick={() => handleAddToCart("lime juices", 35)}
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-pink-200 to-pink-400 rounded-2xl p-4 relative">
            <div className="flex flex-col items-center">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Fresh Juices"
                width={80}
                height={80}
                className="mb-3 rounded-lg"
              />
              <div className="text-white font-medium text-sm mb-1">fresh juices</div>
              <div className="text-white font-bold text-lg mb-2">₹70</div>
              <Button
                size="sm"
                className="bg-orange-400 hover:bg-orange-500 text-white w-8 h-8 p-0 rounded-lg"
                onClick={() => handleAddToCart("fresh juices", 70)}
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Row 3 */}
          <div className="bg-gradient-to-br from-pink-200 to-pink-400 rounded-2xl p-4 relative">
            <div className="flex flex-col items-center">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Fresh Juices"
                width={80}
                height={80}
                className="mb-3 rounded-lg"
              />
              <div className="text-white font-medium text-sm mb-1">fresh juices</div>
              <div className="text-white font-bold text-lg mb-2">₹70</div>
              <Button
                size="sm"
                className="bg-orange-400 hover:bg-orange-500 text-white w-8 h-8 p-0 rounded-lg"
                onClick={() => handleAddToCart("fresh juices", 70)}
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-200 to-orange-400 rounded-2xl p-4 relative">
            <div className="flex flex-col items-center">
              <Image
                src="/placeholder.svg?height=80&width=80"
                alt="Lime Juices"
                width={80}
                height={80}
                className="mb-3 rounded-lg"
              />
              <div className="text-white font-medium text-sm mb-1">lime juices</div>
              <div className="text-white font-bold text-lg mb-2">₹30-40</div>
              <Button
                size="sm"
                className="bg-orange-400 hover:bg-orange-500 text-white w-8 h-8 p-0 rounded-lg"
                onClick={() => handleAddToCart("lime juices", 35)}
              >
                <ShoppingCart className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Button */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-4 right-4">
          <Button
            onClick={() => onNavigate("order-list")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full w-14 h-14 relative"
          >
            <ShoppingCart className="w-6 h-6" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
              {cartItemCount}
            </span>
          </Button>
        </div>
      )}
    </div>
  )
}
