import type { MenuItem, Table } from "@/types"

export const menuItems: MenuItem[] = [
  {
    id: "1",
    name: "Fresh Juices",
    description: "Large | Cheese",
    price: 70,
    image: "/placeholder.svg?height=200&width=200",
    category: "drinks",
  },
  {
    id: "2",
    name: "Lime Juices",
    description: "Large | Cheese",
    price: 40,
    image: "/placeholder.svg?height=200&width=200",
    category: "drinks",
  },
  {
    id: "3",
    name: "Mint Lime",
    description: "Large | Cheese",
    price: 30,
    image: "/placeholder.svg?height=200&width=200",
    category: "drinks",
  },
  {
    id: "4",
    name: "Mojito",
    description: "Large | Fresh",
    price: 90,
    image: "/placeholder.svg?height=200&width=200",
    category: "drinks",
  },
  {
    id: "5",
    name: "Croissant",
    description: "Fresh baked",
    price: 25,
    image: "/placeholder.svg?height=200&width=200",
    category: "bakeries",
  },
  {
    id: "6",
    name: "Muffin",
    description: "Blueberry",
    price: 35,
    image: "/placeholder.svg?height=200&width=200",
    category: "bakeries",
  },
]

export const tables: Table[] = [
  { id: 1, isAvailable: true, capacity: 2 },
  { id: 2, isAvailable: false, capacity: 4 },
  { id: 3, isAvailable: true, capacity: 4 },
  { id: 4, isAvailable: true, capacity: 6 },
  { id: 5, isAvailable: false, capacity: 2 },
  { id: 6, isAvailable: true, capacity: 8 },
  { id: 7, isAvailable: true, capacity: 4 },
  { id: 8, isAvailable: true, capacity: 2 },
]
