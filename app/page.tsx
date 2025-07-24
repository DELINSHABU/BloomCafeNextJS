"use client"

import { useState } from "react"
import HomePage from "@/components/home-page"
import CartModal from "@/components/cart-modal"
import OrderListPage from "@/components/order-list-page"
import MenuPage from "@/components/menu-page"
import OrderSuccessPage from "@/components/order-success-page"

export type CartItem = {
  id: string
  name: string
  description: string
  price: number
  quantity: number
}

export type Page = "home" | "menu" | "cart" | "order-list" | "order-success"

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home")
  const [showCartModal, setShowCartModal] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id)
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== id))
    } else {
      setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
    }
  }

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  if (currentPage === "home") {
    return (
      <>
        <HomePage
          onNavigate={setCurrentPage}
          onAddToCart={addToCart}
          onShowCart={() => setShowCartModal(true)}
          cartItemCount={getTotalItems()}
        />
        {showCartModal && (
          <CartModal
            items={cartItems}
            onClose={() => setShowCartModal(false)}
            onUpdateQuantity={updateQuantity}
            onConfirm={() => {
              setShowCartModal(false)
              setCurrentPage("order-list")
            }}
          />
        )}
      </>
    )
  }

  if (currentPage === "menu") {
    return <MenuPage onNavigate={setCurrentPage} onAddToCart={addToCart} cartItemCount={getTotalItems()} />
  }

  if (currentPage === "order-list") {
    return (
      <OrderListPage
        items={cartItems}
        onNavigate={setCurrentPage}
        onUpdateQuantity={updateQuantity}
        onOrderNow={() => setCurrentPage("order-success")}
      />
    )
  }

  if (currentPage === "order-success") {
    return (
      <OrderSuccessPage
        onNavigate={setCurrentPage}
        totalAmount={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)}
      />
    )
  }

  return null
}
