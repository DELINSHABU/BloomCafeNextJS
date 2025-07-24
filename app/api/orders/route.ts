import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const ORDERS_FILE_PATH = path.join(process.cwd(), 'orders.json')

// Initialize orders file if it doesn't exist
function initializeOrdersFile() {
  if (!fs.existsSync(ORDERS_FILE_PATH)) {
    fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify({ orders: [] }, null, 2))
  }
}

export async function GET() {
  try {
    initializeOrdersFile()
    const fileContents = fs.readFileSync(ORDERS_FILE_PATH, 'utf8')
    const ordersData = JSON.parse(fileContents)
    return NextResponse.json(ordersData)
  } catch (error) {
    console.error('Error reading orders file:', error)
    return NextResponse.json({ error: 'Failed to read orders data' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    initializeOrdersFile()
    const newOrder = await request.json()
    
    // Read existing orders
    const fileContents = fs.readFileSync(ORDERS_FILE_PATH, 'utf8')
    const ordersData = JSON.parse(fileContents)
    
    // Add new order
    ordersData.orders.push(newOrder)
    
    // Write back to file
    fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify(ordersData, null, 2))
    
    return NextResponse.json({ success: true, message: 'Order added successfully' })
  } catch (error) {
    console.error('Error adding order:', error)
    return NextResponse.json({ error: 'Failed to add order' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    initializeOrdersFile()
    const { orderId, status } = await request.json()
    
    // Read existing orders
    const fileContents = fs.readFileSync(ORDERS_FILE_PATH, 'utf8')
    const ordersData = JSON.parse(fileContents)
    
    // Update order status
    const orderIndex = ordersData.orders.findIndex((order: any) => order.id === orderId)
    if (orderIndex !== -1) {
      ordersData.orders[orderIndex].status = status
      
      // Write back to file
      fs.writeFileSync(ORDERS_FILE_PATH, JSON.stringify(ordersData, null, 2))
      
      return NextResponse.json({ success: true, message: 'Order status updated successfully' })
    } else {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }
  } catch (error) {
    console.error('Error updating order status:', error)
    return NextResponse.json({ error: 'Failed to update order status' }, { status: 500 })
  }
}