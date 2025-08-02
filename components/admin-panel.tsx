"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Order } from "@/types"

interface AdminPanelProps {
  orders: Order[]
  onUpdateOrderStatus: (orderId: string, status: Order["status"]) => void
}

export function AdminPanel({ orders, onUpdateOrderStatus }: AdminPanelProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "editing">("overview")

  const totalOrders = orders.length
  const totalAmount = orders.reduce((sum, order) => sum + order.total, 0)
  const pendingOrders = orders.filter((order) => order.status === "pending").length

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "confirmed":
        return "bg-blue-500"
      case "preparing":
        return "bg-orange-500"
      case "ready":
        return "bg-green-500"
      case "delivered":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-emerald-600 text-white p-6 rounded-b-3xl">
        <div className="flex justify-between items-center max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-yellow-300">Admin Panel</h1>
          <div className="flex gap-6">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-4 py-2 rounded ${activeTab === "overview" ? "bg-white/20" : "hover:bg-white/10"}`}
            >
              overview
            </button>
            <button
              onClick={() => setActiveTab("orders")}
              className={`px-4 py-2 rounded ${activeTab === "orders" ? "bg-white/20" : "hover:bg-white/10"}`}
            >
              orders
            </button>
            <button
              onClick={() => setActiveTab("editing")}
              className={`px-4 py-2 rounded ${activeTab === "editing" ? "bg-white/20" : "hover:bg-white/10"}`}
            >
              editing
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Total Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{totalOrders}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Total Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">IDR {totalAmount.toLocaleString()}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Pending Orders</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{pendingOrders}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Order Management</h2>
            {orders.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No orders yet</p>
            ) : (
              <div className="grid gap-4">
                {orders.map((order) => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="font-bold">Order #{order.id}</h3>
                          <p className="text-sm text-gray-600">
                            {order.customerName} - {order.phone}
                          </p>
                          <p className="text-sm text-gray-600">
                            {order.orderType === "dine-in"
                              ? `Table ${order.tableNumber}`
                              : `Delivery: ${order.address}`}
                          </p>
                        </div>
                        <div className="text-right">
                          <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                          <p className="font-bold mt-2">IDR {order.total.toLocaleString()}</p>
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-semibold mb-2">Items:</h4>
                        <ul className="text-sm space-y-1">
                          {order.items.map((item, index) => (
                            <li key={index}>
                              {item.quantity}x {item.name} - ₹{item.price * item.quantity}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => onUpdateOrderStatus(order.id, "confirmed")}
                          disabled={order.status !== "pending"}
                        >
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateOrderStatus(order.id, "preparing")}
                          disabled={order.status !== "confirmed"}
                        >
                          Preparing
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateOrderStatus(order.id, "ready")}
                          disabled={order.status !== "preparing"}
                        >
                          Ready
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onUpdateOrderStatus(order.id, "delivered")}
                          disabled={order.status !== "ready"}
                        >
                          Complete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "editing" && (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Menu Management</h2>
            <p className="text-gray-600">Menu editing functionality would go here.</p>
          </div>
        )}
      </div>
    </div>
  )
}
