'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export interface CartItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
}

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered'

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: OrderStatus
  tableNumber?: string
  customerName?: string
  orderType: 'dine-in' | 'delivery'
  timestamp: Date
  staffMember?: string
}

interface OrderContextType {
  orders: Order[]
  addOrder: (order: Order) => void
  updateOrderStatus: (orderId: string, status: OrderStatus) => void
  syncOrders: () => void
}

const OrderContext = createContext<OrderContextType | undefined>(undefined)

export function OrderProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([])

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('bloom_cafe_orders')
    if (savedOrders) {
      try {
        const parsedOrders = JSON.parse(savedOrders).map((order: any) => ({
          ...order,
          timestamp: new Date(order.timestamp)
        }))
        setOrders(parsedOrders)
      } catch (error) {
        console.error('Error loading orders:', error)
      }
    }
  }, [])

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    localStorage.setItem('bloom_cafe_orders', JSON.stringify(orders))
  }, [orders])

  const addOrder = (order: Order) => {
    setOrders(prev => [...prev, order])
    
    // Also save to API
    fetch('/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    }).catch(error => {
      console.error('Error saving order to API:', error)
    })
  }

  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ))
    
    // Also update in API
    fetch('/api/orders', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ orderId, status }),
    }).catch(error => {
      console.error('Error updating order status in API:', error)
    })
  }

  const syncOrders = () => {
    // Sync with API
    fetch('/api/orders')
      .then(response => response.json())
      .then(data => {
        if (data.orders) {
          const syncedOrders = data.orders.map((order: any) => ({
            ...order,
            timestamp: new Date(order.timestamp)
          }))
          setOrders(syncedOrders)
        }
      })
      .catch(error => {
        console.error('Error syncing orders:', error)
      })
  }

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      syncOrders
    }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider')
  }
  return context
}