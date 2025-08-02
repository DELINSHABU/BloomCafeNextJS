"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Minus, Plus, X } from "lucide-react"
import type { CartItem } from "@/types"
import { tables } from "@/lib/data"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
  totalPrice: number
  onPlaceOrder: (orderData: any) => void
}

export function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  totalPrice,
  onPlaceOrder,
}: CartDrawerProps) {
  const [orderType, setOrderType] = useState<"dine-in" | "delivery">("dine-in")
  const [selectedTable, setSelectedTable] = useState<string>("")
  const [customerName, setCustomerName] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const availableTables = tables.filter((table) => table.isAvailable)

  const handlePlaceOrder = () => {
    const orderData = {
      items: cart,
      total: totalPrice,
      orderType,
      tableNumber: orderType === "dine-in" ? Number.parseInt(selectedTable) : undefined,
      address: orderType === "delivery" ? address : undefined,
      customerName,
      phone,
    }
    onPlaceOrder(orderData)
  }

  const isFormValid = () => {
    if (!customerName || !phone || cart.length === 0) return false
    if (orderType === "dine-in" && !selectedTable) return false
    if (orderType === "delivery" && !address) return false
    return true
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
      <div className="bg-white w-full max-h-[90vh] rounded-t-3xl overflow-hidden">
        <div className="bg-emerald-600 text-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Order List</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-white">
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[calc(90vh-200px)]">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 py-8">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-3 mb-6">
                {cart.map((item) => (
                  <div key={item.id} className="bg-emerald-600 text-white rounded-2xl p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm opacity-90">{item.description}</p>
                        <p className="font-bold">${item.price}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(item.id)}
                        className="text-white hover:bg-emerald-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex items-center justify-end gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 p-0 bg-white text-emerald-600"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                      <span className="font-bold min-w-[2rem] text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 p-0 bg-white text-emerald-600"
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <Label>Order Type</Label>
                  <RadioGroup value={orderType} onValueChange={(value: "dine-in" | "delivery") => setOrderType(value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dine-in" id="dine-in" />
                      <Label htmlFor="dine-in">Dine In</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery">Delivery</Label>
                    </div>
                  </RadioGroup>
                </div>

                {orderType === "dine-in" && (
                  <div>
                    <Label>Select Table</Label>
                    <Select value={selectedTable} onValueChange={setSelectedTable}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a table" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableTables.map((table) => (
                          <SelectItem key={table.id} value={table.id.toString()}>
                            Table {table.id} (Capacity: {table.capacity})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {orderType === "delivery" && (
                  <div>
                    <Label htmlFor="address">Delivery Address</Label>
                    <Textarea
                      id="address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      placeholder="Enter your full address"
                      rows={3}
                    />
                  </div>
                )}
              </div>

              <div className="border-t pt-4 mb-4">
                <div className="flex justify-between items-center text-lg font-bold">
                  <span>Total:</span>
                  <span>₹{totalPrice}</span>
                </div>
              </div>
            </>
          )}
        </div>

        {cart.length > 0 && (
          <div className="p-4 border-t">
            <Button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl"
              onClick={handlePlaceOrder}
              disabled={!isFormValid()}
            >
              Place Order
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
