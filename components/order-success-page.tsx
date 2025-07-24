"use client"

import { Button } from "@/components/ui/button"
import { Home, Menu, Check } from "lucide-react"
import type { Page } from "@/app/page"

interface OrderSuccessPageProps {
  onNavigate: (page: Page) => void
  totalAmount: number
}

export default function OrderSuccessPage({ onNavigate, totalAmount }: OrderSuccessPageProps) {
  return (
    <div className="max-w-sm mx-auto bg-emerald-700 min-h-screen">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <h1 className="text-yellow-300 text-2xl font-bold text-center mb-8">Bloom Garden Cafe</h1>
        <h2 className="text-white text-2xl font-bold text-center mb-6">Order List</h2>
      </div>

      {/* Success Card */}
      <div className="px-6 pb-6">
        <div className="bg-white rounded-2xl p-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Success Message */}
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Order Success!</h3>

          {/* Order Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Ref Number</span>
              <span className="font-medium text-gray-900">000085752257</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">Order Time</span>
              <span className="font-medium text-gray-900">25-02-2023, 13:22:16</span>
            </div>

            <div className="flex justify-between items-center py-2">
              <span className="text-gray-600">assistant Name</span>
              <span className="font-medium text-gray-900">Antonio Roberto</span>
            </div>

            <div className="border-t pt-4 mt-6">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">Amount</span>
                <span className="text-xl font-bold text-gray-900">IDR {totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
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
