"use client"

import { useState } from "react"
import { CafeHeader } from "@/components/cafe-header"
import { CategoryTabs } from "@/components/category-tabs"
import { MenuItemCard } from "@/components/menu-item-card"
import { CartDrawer } from "@/components/cart-drawer"
import { OrderSuccess } from "@/components/order-success"
import { AdminPanel } from "@/components/admin-panel"
import { useCart } from "@/hooks/use-cart"
import { menuItems } from "@/lib/data"
import type { MenuItem, Order } from "@/types"
import { Button } from "@/components/ui/button"

export default function CafeApp() {
  const [activeCategory, setActiveCategory] = useState("all")
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [currentView, setCurrentView] = useState<"menu" | "order-success" | "admin">("menu")
  const [orders, setOrders] = useState<Order[]>([])
  const [currentOrder, setCurrentOrder] = useState<any>(null)

  const { cart, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems } = useCart()

  const filteredItems =
    activeCategory === "all" ? menuItems : menuItems.filter((item) => item.category === activeCategory)

  const handleAddToCart = (item: MenuItem) => {
    addToCart(item)
  }

  const handlePlaceOrder = (orderData: any) => {
    const newOrder: Order = {
      id: Date.now().toString(),
      items: orderData.items,
      total: orderData.total,
      orderType: orderData.orderType,
      tableNumber: orderData.tableNumber,
      address: orderData.address,
      customerName: orderData.customerName,
      phone: orderData.phone,
      status: "pending",
      timestamp: new Date(),
    }

    setOrders((prev) => [...prev, newOrder])
    setCurrentOrder(newOrder)
    clearCart()
    setIsCartOpen(false)
    setCurrentView("order-success")
  }

  const handleUpdateOrderStatus = (orderId: string, status: Order["status"]) => {
    setOrders((prev) => prev.map((order) => (order.id === orderId ? { ...order, status } : order)))
  }

  const handleBackToHome = () => {
    setCurrentView("menu")
    setCurrentOrder(null)
  }

  if (currentView === "admin") {
    return (
      <div>
        <AdminPanel orders={orders} onUpdateOrderStatus={handleUpdateOrderStatus} />
        <div className="fixed bottom-4 right-4">
          <Button onClick={() => setCurrentView("menu")}>Back to Menu</Button>
        </div>
      </div>
    )
  }

  if (currentView === "order-success" && currentOrder) {
    return <OrderSuccess orderData={currentOrder} onBackToHome={handleBackToHome} />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-md mx-auto bg-white min-h-screen relative">
        <CafeHeader cartItemCount={getTotalItems()} onCartClick={() => setIsCartOpen(true)} />

        <div className="p-4">
          {/* Promotional Banner */}
          <div className="bg-gradient-to-r from-yellow-400 to-red-500 rounded-2xl p-4 mb-6 text-white relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-1">20%</h2>
                <h2 className="text-2xl font-bold mb-2">OFF</h2>
                <Button size="sm" className="bg-white/20 hover:bg-white/30 text-white">
                  Shop now ▶
                </Button>
              </div>
              <div className="text-right">
                <div className="w-20 h-20 bg-white/20 rounded-full mb-2"></div>
                <p className="font-bold">Al Faham Mandi</p>
              </div>
            </div>
          </div>

          <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />

          <h2 className="text-xl font-bold text-white mb-4">Popular</h2>

          <div className="grid grid-cols-2 gap-4 mb-20">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </div>

        {/* Cart notification */}
        {getTotalItems() > 0 && !isCartOpen && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-40">
            <div className="bg-white rounded-full px-4 py-2 shadow-lg flex items-center gap-2">
              <span className="text-sm font-medium">{getTotalItems()} Item added</span>
              <Button
                size="sm"
                onClick={() => setIsCartOpen(true)}
                className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full"
              >
                View Cart ▶
              </Button>
            </div>
          </div>
        )}

        <CartDrawer
          isOpen={isCartOpen}
          onClose={() => setIsCartOpen(false)}
          cart={cart}
          onUpdateQuantity={updateQuantity}
          onRemoveItem={removeFromCart}
          totalPrice={getTotalPrice()}
          onPlaceOrder={handlePlaceOrder}
        />

        {/* Admin Panel Access */}
        <div className="fixed top-4 left-4">
          <Button size="sm" variant="outline" onClick={() => setCurrentView("admin")} className="bg-white/90">
            Admin
          </Button>
        </div>
      </div>
    </div>
  )
}
