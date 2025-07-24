"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  CheckCircle,
  Truck,
  ChefHat,
  UserPlus,
  RefreshCw,
  LogOut,
  User,
} from "lucide-react";
import { useOrders } from "@/lib/order-context";
import type { OrderStatus } from "@/app/page";

interface WaiterDashboardProps {
  onNavigate?: (page: any) => void;
  currentUser?: { username: string; role: string; name: string };
  onLogout?: () => void;
}

export default function WaiterDashboard({
  onNavigate,
  currentUser,
  onLogout,
}: WaiterDashboardProps) {
  const { orders, updateOrderStatus, syncOrders } = useOrders();
  const [isSyncing, setIsSyncing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleManualSync = async () => {
    setIsSyncing(true);
    try {
      await syncOrders();
    } finally {
      setIsSyncing(false);
    }
  };
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500";
      case "preparing":
        return "bg-blue-500";
      case "ready":
        return "bg-green-500";
      case "delivered":
        return "bg-gray-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "preparing":
        return <ChefHat className="w-4 h-4" />;
      case "ready":
        return <CheckCircle className="w-4 h-4" />;
      case "delivered":
        return <Truck className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    switch (currentStatus) {
      case "pending":
        return "preparing";
      case "preparing":
        return "ready";
      case "ready":
        return "delivered";
      default:
        return null;
    }
  };

  const filterOrdersByStatus = (status: OrderStatus) => {
    return orders.filter((order) => order.status === status);
  };

  const formatTime = (date: Date) => {
    // Use a consistent format that works on both server and client
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const displayHours = hours % 12 || 12;
    const displayMinutes = minutes.toString().padStart(2, "0");
    return `${displayHours}:${displayMinutes} ${ampm}`;
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-emerald-700 text-white p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">Waiter Dashboard</h1>
            <p className="text-emerald-100 text-sm sm:text-base">
              Bloom Garden Cafe
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center gap-2 text-emerald-100 mr-4">
              <User className="w-4 h-4" />
              <span className="text-sm">
                Welcome, {currentUser?.name || "Waiter User"}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-emerald-700 hover:bg-gray-50"
              onClick={handleManualSync}
              disabled={isSyncing}
            >
              <RefreshCw
                className={`w-4 h-4 mr-2 ${isSyncing ? "animate-spin" : ""}`}
              />
              {isSyncing ? "Syncing..." : "Sync Orders"}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-emerald-700 hover:bg-gray-50"
              onClick={() => onNavigate && onNavigate("orders")}
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Assist Order
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-emerald-700 hover:bg-gray-50"
              onClick={onLogout || (() => window.location.reload())}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Sync Status Indicator */}
        {orders.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
            <div className="flex items-center gap-2 text-green-700">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm">
                Real-time sync active • {orders.length} total orders
              </span>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {filterOrdersByStatus("pending").length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {filterOrdersByStatus("preparing").length}
                </div>
                <div className="text-sm text-gray-600">Preparing</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {filterOrdersByStatus("ready").length}
                </div>
                <div className="text-sm text-gray-600">Ready</div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-600">
                  {filterOrdersByStatus("delivered").length}
                </div>
                <div className="text-sm text-gray-600">Delivered</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Orders Tabs */}
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="preparing">Preparing</TabsTrigger>
            <TabsTrigger value="ready">Ready</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
          </TabsList>

          {(
            ["pending", "preparing", "ready", "delivered"] as OrderStatus[]
          ).map((status) => (
            <TabsContent key={status} value={status} className="mt-6">
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filterOrdersByStatus(status).map((order) => (
                  <Card key={order.id} className="relative">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">
                          Order #{order.id.slice(-6)}
                        </CardTitle>
                        <Badge
                          className={`${getStatusColor(status)} text-white`}
                        >
                          <div className="flex items-center gap-1">
                            {getStatusIcon(status)}
                            {status}
                          </div>
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <div>{formatTime(order.timestamp)}</div>
                        {order.orderType === "dine-in" && order.tableNumber && (
                          <div>Table {order.tableNumber}</div>
                        )}
                        {order.orderType === "delivery" &&
                          order.customerName && <div>{order.customerName}</div>}
                        {order.staffMember && (
                          <div className="text-blue-600">
                            Staff: {order.staffMember}
                          </div>
                        )}
                        <div className="capitalize">{order.orderType}</div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 mb-4">
                        {order.items.map((item, index) => (
                          <div
                            key={index}
                            className="flex justify-between text-sm"
                          >
                            <span>
                              {item.quantity}x {item.name}
                            </span>
                            <span>
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t">
                        <div className="font-bold">
                          Total: ₹{order.total.toFixed(2)}
                        </div>
                        {getNextStatus(status) && (
                          <Button
                            size="sm"
                            onClick={() =>
                              updateOrderStatus(
                                order.id,
                                getNextStatus(status)!
                              )
                            }
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            Mark as {getNextStatus(status)}
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              {filterOrdersByStatus(status).length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No {status} orders
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}
