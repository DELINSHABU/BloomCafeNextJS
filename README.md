# Bloom Garden Cafe - Online Ordering System

A responsive web application for cafe ordering with QR code table ordering and waiter management system.

## Features

### 🍽️ Customer Features
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Dual Ordering Options**:
  - **Delivery**: Order from home with customer details and address
  - **Dine-in**: Scan QR code at table for instant ordering
- **Interactive Menu**: Browse categories and add items to cart
- **Real-time Cart**: View and modify orders before checkout
- **Order Tracking**: Get estimated delivery/preparation times

### 📱 QR Code Ordering
- Customers scan QR codes placed on restaurant tables
- Automatic table number detection
- Seamless dine-in ordering experience
- No app download required

### 👨‍🍳 Staff Features
- **Waiter Dashboard**: Comprehensive order management system
- **Order Status Tracking**: 
  - Pending → Preparing → Ready → Delivered
- **Real-time Updates**: Live order status changes
- **QR Code Generator**: Create printable QR codes for tables
- **Order Details**: View customer info, table numbers, and order contents
- **Admin Menu Panel**: Complete menu management system
  - Toggle item availability (available/unavailable)
  - Update prices in real-time
  - Add new menu items to categories
  - Search and filter menu items
  - View availability statistics
- **Staff-Assisted Ordering**: Help customers place orders
  - Select table and staff member
  - Real-time menu browsing with availability
  - Cart management and order placement
  - Immediate order tracking integration

## How to Use

### For Customers

#### Home Delivery
1. Visit the website
2. Select "Delivery" option
3. Browse menu and add items to cart
4. Fill in delivery details (name, phone, address)
5. Place order and get confirmation

#### Dine-in (QR Code)
1. Scan QR code on your table
2. Website opens with table number pre-filled
3. Browse menu and add items to cart
4. Add your name (optional) and place order
5. Wait for staff to serve your order

### For Staff

#### Managing Orders
1. Click "Staff Login" on homepage
2. View order dashboard with status tabs:
   - **Pending**: New orders waiting to be prepared
   - **Preparing**: Orders currently being made
   - **Ready**: Orders ready for pickup/delivery
   - **Delivered**: Completed orders
3. Click "Mark as [next status]" to update order progress
4. **Real-time Updates**: Orders placed by customers or staff appear instantly

#### Staff-Assisted Ordering
1. Go to Waiter Dashboard
2. Click "Assist Order" button
3. **Select Details**: Choose table number and staff member name
4. **Add Customer Name**: Optional customer identification
5. **Browse Menu**: Search and filter available items
6. **Build Order**: Add items to cart with quantities
7. **Place Order**: Submit order which appears in dashboard immediately

#### Generating QR Codes
1. Go to Waiter Dashboard
2. Click "QR Codes" button
3. Enter table number
4. Generate and download QR code
5. Print and place on table

#### Managing Menu Items
1. Go to Waiter Dashboard
2. Click "Menu Admin" button
3. **Toggle Availability**: Use switches to make items available/unavailable
4. **Update Prices**: Click edit icon next to price, modify, and save
5. **Add New Items**: Click "Add Item", select category, enter details
6. **Search Items**: Use search bar to find specific items
7. **Filter by Category**: Select category to view specific items
8. **View Stats**: See total available/unavailable items at the top

## Technical Features

- **Next.js 15** with React 19
- **TypeScript** for type safety
- **Tailwind CSS** for responsive styling
- **Radix UI** components for accessibility
- **Mobile-first** responsive design
- **Real-time state management**
- **QR code integration**
- **URL-based routing** with page state persistence
- **Cross-device order synchronization**
- **Browser navigation support** (back/forward buttons)

## Getting Started

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Run development server:
```bash
npm run dev
# or
pnpm dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with responsive meta tags
│   ├── page.tsx            # Main app with routing logic
│   └── globals.css         # Global styles and responsive utilities
├── components/
│   ├── home-page.tsx       # Homepage with menu preview
│   ├── menu-page.tsx       # Full menu display
│   ├── cart-modal.tsx      # Shopping cart overlay
│   ├── order-list-page.tsx # Order review and customer info
│   ├── order-success-page.tsx # Order confirmation
│   ├── waiter-dashboard.tsx # Staff order management
│   ├── qr-generator.tsx    # QR code creation tool
│   ├── admin-menu-panel.tsx # Menu management system
│   └── ui/                 # Reusable UI components
├── lib/
│   └── menu-data.ts        # Menu data utilities and availability system
└── public/                 # Static assets
```

## Responsive Breakpoints

- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md)
- **Desktop**: > 1024px (lg)

## Order Flow

### Customer Self-Service
1. **Customer Places Order** → Order created with "pending" status
2. **Staff Sees Order** → Waiter dashboard shows new order instantly
3. **Kitchen Starts** → Status updated to "preparing"
4. **Food Ready** → Status updated to "ready"
5. **Order Delivered** → Status updated to "delivered"

### Staff-Assisted Service
1. **Staff Helps Customer** → Staff member uses assist order page
2. **Order Details** → Table number, staff name, and customer info recorded
3. **Menu Selection** → Staff browses available items and builds order
4. **Order Placement** → Order appears immediately in dashboard
5. **Same Workflow** → Follows same status progression as self-service orders

### Cross-Device Real-time Updates
- **Multi-Device Sync**: Orders placed on any device (phone, tablet, laptop) appear instantly on all other devices
- **API-Based Storage**: Orders are stored server-side and synchronized across all connected devices
- **Automatic Sync**: Every 3 seconds, all devices check for new orders and updates
- **Manual Sync**: Staff can manually refresh orders using the "Sync Orders" button
- **Optimistic Updates**: UI updates immediately while syncing with server in background
- **Error Handling**: Failed syncs are automatically retried, with local state rollback on failure

### Real-time Sync Features
- **QR Code Orders**: Customer scans QR on phone → Order appears on staff laptop dashboard instantly
- **Status Updates**: Staff updates order status → All devices see the change immediately  
- **Staff Orders**: Staff-assisted orders sync across all staff devices
- **Menu Changes**: Admin menu updates affect all customer and staff interfaces
- **Visual Indicators**: Green pulse indicator shows active sync status

## URL-Based Navigation

### QR Code URLs
QR codes generate URLs in the format:
```
https://yoursite.com?table=1
```

This automatically:
- Sets order type to "dine-in"
- Pre-fills table number
- Skips delivery information form
- **Maintains state on page reload**

### Page URLs
Each page has a persistent URL:
```
https://yoursite.com?page=waiter-dashboard
https://yoursite.com?page=admin-menu
https://yoursite.com?page=staff-order
https://yoursite.com?table=5&page=menu
```

### Navigation Features
- **Page State Persistence**: Reload any page and stay exactly where you were
- **Browser Navigation**: Back/forward buttons work correctly
- **Bookmarkable URLs**: Staff can bookmark dashboard, admin panel, etc.
- **Deep Linking**: Direct links to specific pages work perfectly
- **QR Code + Page**: Combine table numbers with specific pages

## Menu Management

### Real-time Menu Control
- **Availability System**: Staff can instantly toggle items as available/unavailable
- **Dynamic Pricing**: Update prices without code changes
- **New Item Addition**: Add items to existing categories through the admin panel
- **Customer Impact**: Unavailable items are automatically hidden from customer menus
- **Search & Filter**: Easily find and manage specific items

### Menu Data Structure
The menu is loaded from `menu.json` with the following structure:
```json
{
  "menu": [
    {
      "category": "Category Name",
      "products": [
        {
          "itemNo": "001",
          "name": "Item Name",
          "rate": "100"
        }
      ]
    }
  ]
}
```

## Customization

### Adding Menu Categories
Edit the `menu.json` file to add new categories and items

### Styling
Modify colors and styling in:
- `app/globals.css` for global styles
- Individual component files for specific styling
- `tailwind.config.ts` for theme customization

### Order Statuses
Customize order workflow in `components/waiter-dashboard.tsx`:
- Add new statuses to `OrderStatus` type
- Update status progression logic
- Modify status colors and icons

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is for educational and commercial use.