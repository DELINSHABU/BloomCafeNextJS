"use client"

import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"
import type { CartItem } from "@/app/page"

interface CartModalProps {
  items: CartItem[]
  onClose: () => void
  onUpdateQuantity: (id: string, quantity: number) => void
  onConfirm: () => void
}

export default function CartModal({ items, onClose, onUpdateQuantity, onConfirm }: CartModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 m-4 w-full max-w-sm">
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <p className="font-bold text-gray-900">${item.price}</p>
              </div>
              <div className="flex items-center bg-emerald-600 rounded-full">
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-emerald-700 w-8 h-8 p-0 rounded-full"
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-white px-3 font-medium">{item.quantity}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-white hover:bg-emerald-700 w-8 h-8 p-0 rounded-full"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={onConfirm}
          className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl"
        >
          Confirm
        </Button>
      </div>
    </div>
  )
}
