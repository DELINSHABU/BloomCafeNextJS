"use client"

import { Button } from "@/components/ui/button"
import { Home, Menu, Minus, Plus } from "lucide-react"
import type { CartItem, Page } from "@/app/page"

interface OrderListPageProps {
  items: CartItem[]
  onNavigate: (page: Page) => void
  onUpdateQuantity: (id: string, quantity: number) => void
  onOrderNow: () => void
}

export default function OrderListPage({ items, onNavigate, onUpdateQuantity, onOrderNow }: OrderListPageProps) {
  return (
    <div className="max-w-sm mx-auto bg-emerald-700 min-h-screen">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-yellow-300 text-2xl font-bold text-center mb-8">Bloom Garden Cafe</h1>
        <h2 className="text-white text-2xl font-bold text-center mb-6">Order List</h2>
      </div>

      {/* Order Items */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-2xl p-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-emerald-600 rounded-2xl p-4 text-white">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm opacity-90">{item.description}</p>
                    <p className="font-bold">${item.price}</p>
                  </div>
                  <div className="flex items-center bg-white rounded-full">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-emerald-600 hover:bg-gray-100 w-8 h-8 p-0 rounded-full"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="text-emerald-600 px-3 font-medium">{item.quantity}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-emerald-600 hover:bg-gray-100 w-8 h-8 p-0 rounded-full"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={onOrderNow}
            className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-lg font-medium"
          >
            Order Now!
          </Button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="bg-white rounded-full px-6 py-3 flex items-center space-x-6">
          <Button variant="ghost" size="sm" className="p-2" onClick={() => onNavigate("home")}>
            <Home className="w-6 h-6 text-gray-600" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <Menu className="w-6 h-6 text-orange-500" />
          </Button>
        </div>
      </div>
    </div>
  )
}
