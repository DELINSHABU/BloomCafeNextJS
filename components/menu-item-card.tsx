"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import type { MenuItem } from "@/types"

interface MenuItemCardProps {
  item: MenuItem
  onAddToCart: (item: MenuItem) => void
}

export function MenuItemCard({ item, onAddToCart }: MenuItemCardProps) {
  return (
    <div className="bg-gradient-to-br from-pink-200 to-orange-200 rounded-2xl p-4 relative overflow-hidden">
      <div className="relative z-10">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          width={120}
          height={120}
          className="w-full h-32 object-cover rounded-lg mb-3"
        />
        <h3 className="font-semibold text-white text-sm mb-1">{item.name}</h3>
        <p className="text-white text-xs opacity-90 mb-2">{item.description}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-white">₹{item.price}</span>
          <Button
            size="sm"
            onClick={() => onAddToCart(item)}
            className="bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
