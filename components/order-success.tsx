"use client"

import { Button } from "@/components/ui/button"
import { CheckCircle, Home, Receipt } from "lucide-react"

interface OrderSuccessProps {
  orderData: {
    id: string
    total: number
    customerName: string
    timestamp: Date
  }
  onBackToHome: () => void
}

export function OrderSuccess({ orderData, onBackToHome }: OrderSuccessProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-emerald-600 rounded-3xl p-6 w-full max-w-sm text-white">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-yellow-300 mb-8">Bloom Garden Cafe</h1>
          <h2 className="text-xl font-bold mb-6">Order List</h2>
        </div>

        <div className="bg-white rounded-2xl p-6 text-gray-800 mb-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800">Order Success!</h3>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Ref Number</span>
              <span className="font-semibold">{orderData.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order Time</span>
              <span className="font-semibold">
                {orderData.timestamp.toLocaleDateString()} {orderData.timestamp.toLocaleTimeString()}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Customer Name</span>
              <span className="font-semibold">{orderData.customerName}</span>
            </div>
            <div className="border-t pt-4">
              <div className="flex justify-between text-lg font-bold">
                <span>Amount</span>
                <span>IDR {orderData.total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button
            variant="outline"
            size="lg"
            onClick={onBackToHome}
            className="bg-white text-emerald-600 border-white hover:bg-gray-100 rounded-full px-6"
          >
            <Home className="w-5 h-5 mr-2" />
            Home
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-white text-emerald-600 border-white hover:bg-gray-100 rounded-full px-6"
          >
            <Receipt className="w-5 h-5 mr-2" />
            Receipt
          </Button>
        </div>
      </div>
    </div>
  )
}
