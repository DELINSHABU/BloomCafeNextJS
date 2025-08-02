export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: "drinks" | "bakeries" | "snacks" | "all"
}

export interface CartItem extends MenuItem {
  quantity: number
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  orderType: "dine-in" | "delivery"
  tableNumber?: number
  address?: string
  customerName: string
  phone: string
  status: "pending" | "confirmed" | "preparing" | "ready" | "delivered"
  timestamp: Date
}

export interface Table {
  id: number
  isAvailable: boolean
  capacity: number
}
