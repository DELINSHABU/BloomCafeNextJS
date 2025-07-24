'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Settings, Users, ShoppingCart, LogOut, User, Crown } from 'lucide-react'
import WaiterDashboard from '@/components/waiter-dashboard'
import AdminMenuPanel from '@/components/admin-menu-panel'

interface SuperAdminDashboardProps {
  onNavigate?: (page: any) => void
  currentUser?: { username: string; role: string; name: string }
  onLogout?: () => void
}

export default function SuperAdminDashboard({ onNavigate, currentUser, onLogout }: SuperAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white p-4 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Crown className="w-8 h-8 text-yellow-300" />
              <h1 className="text-xl sm:text-2xl font-bold">Super Admin Dashboard</h1>
            </div>
            <p className="text-purple-100 text-sm sm:text-base">
              Complete system management & oversight
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-purple-100">
              <User className="w-4 h-4" />
              <span className="text-sm">Welcome, {currentUser?.name || 'Super Admin'}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="bg-white text-purple-700 hover:bg-gray-50"
              onClick={onLogout || (() => window.location.reload())}
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">System Access</p>
                  <p className="text-2xl font-bold text-purple-600">Full Control</p>
                </div>
                <Crown className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Waiter Functions</p>
                  <p className="text-2xl font-bold text-blue-600">Available</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-l-4 border-l-emerald-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Admin Functions</p>
                  <p className="text-2xl font-bold text-emerald-600">Available</p>
                </div>
                <Settings className="w-8 h-8 text-emerald-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Navigation Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="waiter">Waiter View</TabsTrigger>
            <TabsTrigger value="admin">Admin View</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-600" />
                    Waiter Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Access all waiter functions including order tracking, status updates, and customer service tools.
                  </p>
                  <Button 
                    onClick={() => setActiveTab('waiter')}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    View Waiter Dashboard
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="w-5 h-5 text-emerald-600" />
                    Admin Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Full administrative control including menu management, item availability, and system settings.
                  </p>
                  <Button 
                    onClick={() => setActiveTab('admin')}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                  >
                    View Admin Dashboard
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-orange-600" />
                    Order Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">
                    Staff-assisted ordering system for helping customers place orders at tables.
                  </p>
                  <Button 
                    onClick={() => setActiveTab('orders')}
                    className="w-full bg-orange-600 hover:bg-orange-700"
                  >
                    Assist Customer Orders
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="w-5 h-5 text-purple-600" />
                    Super Admin Privileges
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        ✓ Full System Access
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        ✓ Waiter Functions
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        ✓ Admin Functions
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-orange-100 text-orange-700">
                        ✓ Order Management
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="waiter" className="mt-6">
            <div className="bg-white rounded-lg border">
              <WaiterDashboard 
                onNavigate={onNavigate} 
                currentUser={currentUser} 
                onLogout={onLogout}
              />
            </div>
          </TabsContent>

          <TabsContent value="admin" className="mt-6">
            <div className="bg-white rounded-lg border">
              <AdminMenuPanel 
                onNavigate={onNavigate} 
                currentUser={currentUser} 
                onLogout={onLogout}
              />
            </div>
          </TabsContent>

          <TabsContent value="orders" className="mt-6">
            <div className="bg-white rounded-lg border">
              <div className="p-6">
                <Button 
                  onClick={() => onNavigate && onNavigate('orders')}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 h-16"
                >
                  <ShoppingCart className="w-6 h-6 mr-3" />
                  <div className="text-left">
                    <div className="font-semibold">Staff Assisted Ordering</div>
                    <div className="text-sm opacity-90">Help customers place their orders</div>
                  </div>
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}