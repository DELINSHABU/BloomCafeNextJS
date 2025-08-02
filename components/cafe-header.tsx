"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CafeHeaderProps {
  cartItemCount: number
  onCartClick: () => void
}

export function CafeHeader({ cartItemCount, onCartClick }: CafeHeaderProps) {
  return (
    <div className="bg-emerald-600 text-white p-6 rounded-t-3xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-yellow-300">Bloom Garden Cafe</h1>
        <Button variant="ghost" size="sm" onClick={onCartClick} className="text-white hover:bg-emerald-700 relative">
          <ShoppingCart className="w-5 h-5" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </Button>
      </div>

      <div className="text-center mb-6">
        <div className="w-24 h-24 mx-auto mb-4 bg-yellow-400 rounded-full flex items-center justify-center">
          <span className="text-2xl font-bold text-emerald-600">🌸</span>
        </div>
      </div>
    </div>
  )
}
