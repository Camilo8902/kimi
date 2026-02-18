import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Store,
  Package,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  TrendingUp,
  TrendingDown,
  DollarSign,
  ShoppingCart,
  Users as UsersIcon,
  Package as PackageIcon,
  Download,
  Calendar,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: ShoppingBag, label: 'Pedidos', href: '/admin/orders' },
  { icon: Package, label: 'Productos', href: '/admin/products' },
  { icon: Store, label: 'Empresas', href: '/admin/companies' },
  { icon: Users, label: 'Usuarios', href: '/admin/users' },
  { icon: BarChart3, label: 'Reportes', href: '/admin/reports', active: true },
  { icon: Settings, label: 'Configuración', href: '/admin/settings' },
];

const salesData = [
  { name: 'Ene', sales: 42000, orders: 280 },
  { name: 'Feb', sales: 38000, orders: 240 },
  { name: 'Mar', sales: 51000, orders: 340 },
  { name: 'Abr', sales: 47000, orders: 310 },
  { name: 'May', sales: 56000, orders: 380 },
  { name: 'Jun', sales: 62000, orders: 420 },
  { name: 'Jul', sales: 58000, orders: 390 },
  { name: 'Ago', sales: 72000, orders: 480 },
  { name: 'Sep', sales: 68000, orders: 450 },
  { name: 'Oct', sales: 75000, orders: 520 },
  { name: 'Nov', sales: 89000, orders: 610 },
  { name: 'Dic', sales: 95000, orders: 680 },
];

const categoryData = [
  { name: 'Electrónica', value: 35, color: '#8b5cf6' },
  { name: 'Moda', value: 25, color: '#06b6d4' },
  { name: 'Hogar', value: 20, color: '#10b981' },
  { name: 'Belleza', value: 12, color: '#f59e0b' },
  { name: 'Deportes', value: 8, color: '#ef4444' },
];

const topProducts = [
  { name: 'iPhone 15 Pro Max', sales: 124500, units: 249 },
  { name: 'MacBook Air M3', sales: 98500, units: 197 },
  { name: 'Samsung Galaxy S24', sales: 87600, units: 292 },
  { name: 'AirPods Pro 2', sales: 65400, units: 436 },
  { name: 'Sony WH-1000XM5', sales: 54300, units: 181 },
];

const topSellers = [
  { name: 'TechStore', sales: 245000, orders: 1245, rating: 4.8 },
  { name: 'FashionHub', sales: 198000, orders: 2156, rating: 4.6 },
  { name: 'HomeDecor', sales: 156000, orders: 892, rating: 4.9 },
  { name: 'BeautyCare', sales: 124000, orders: 1845, rating: 4.7 },
  { name: 'SportZone', sales: 98000, orders: 654, rating: 4.5 },
];

const usersData = [
  { name: 'Ene', users: 1200 },
  { name: 'Feb', users: 1450 },
  { name: 'Mar', users: 1680 },
  { name: 'Abr', users: 1920 },
  { name: 'May', users: 2340 },
  { name: 'Jun', users: 2680 },
  { name: 'Jul', users: 2890 },
  { name: 'Ago', users: 3120 },
  { name: 'Sep', users: 3450 },
  { name: 'Oct', users: 3780 },
  { name: 'Nov', users: 4120 },
  { name: 'Dic', users: 4560 },
];

export function AdminReports() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [period, setPeriod] = useState('year');
  const location = useLocation();

  const isActive = (href: string) => location.pathname === href;
  const { signOut } = useAuthStore();
  const { addToast } = useUIStore();

  const handleSignOut = async () => {
    await signOut();
    addToast({
      type: 'success',
      title: 'Sesión cerrada',
      message: 'Has cerrado sesión exitosamente',
    });
  };

  const stats = [
    {
      title: 'Ventas Totales',
      value: '$756,000',
      change: '+23.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
    },
    {
      title: 'Pedidos',
      value: '5,100',
      change: '+18.2%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'from-violet-500 to-purple-600',
    },
    {
      title: 'Clientes',
      value: '4,560',
      change: '+12.8%',
      trend: 'up',
      icon: UsersIcon,
      color: 'from-blue-500 to-indigo-600',
    },
    {
      title: 'Ingreso Promedio',
      value: '$148.24',
      change: '+5.3%',
      trend: 'up',
      icon: TrendingUp,
      color: 'from-orange-500 to-red-600',
    },
  ];

  const commissionData = [
    { month: 'Ene', commission: 4200 },
    { month: 'Feb', commission: 3800 },
    { month: 'Mar', commission: 5100 },
    { month: 'Abr', commission: 4700 },
    { month: 'May', commission: 5600 },
    { month: 'Jun', commission: 6200 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-violet-800 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">MarketHub</span>
          </Link>
          <p className="text-xs text-gray-500 mt-1 ml-12">Panel de Administración</p>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive(link.href)
                  ? 'bg-violet-50 text-violet-600'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <link.icon className="w-5 h-5" />
              <span className="font-medium">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleSignOut}
            className="flex items-center gap-3 px-4 py-3 w-full text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Cerrar Sesión</span>
          </button>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white">
            <div className="p-4 flex items-center justify-between border-b">
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-violet-800 rounded-lg flex items-center justify-center">
                  <ShoppingBag className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold">MarketHub</span>
              </Link>
              <button onClick={() => setSidebarOpen(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {sidebarLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-50"
                  onClick={() => setSidebarOpen(false)}
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 lg:ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 sm:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Reportes y Análisis</h1>
            </div>
            <div className="flex items-center gap-4">
              <Select value={period} onValueChange={setPeriod}>
                <SelectTrigger className="w-40">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Esta semana</SelectItem>
                  <SelectItem value="month">Este mes</SelectItem>
                  <SelectItem value="quarter">Este trimestre</SelectItem>
                  <SelectItem value="year">Este año</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
              <Link to="/" className="text-sm text-violet-600 hover:underline">
                Ver tienda →
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-8">
          {/* Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      <div className={`flex items-center gap-1 mt-2 text-sm ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend === 'up' ? (
                          <ArrowUpRight className="w-4 h-4" />
                        ) : (
                          <ArrowDownRight className="w-4 h-4" />
                        )}
                        <span>{stat.change}</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs */}
          <Tabs defaultValue="sales" className="space-y-6">
            <TabsList>
              <TabsTrigger value="sales">Ventas</TabsTrigger>
              <TabsTrigger value="products">Productos</TabsTrigger>
              <TabsTrigger value="sellers">Vendedores</TabsTrigger>
              <TabsTrigger value="users">Usuarios</TabsTrigger>
              <TabsTrigger value="financial">Financiero</TabsTrigger>
            </TabsList>

            {/* Sales Tab */}
            <TabsContent value="sales" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Ventas por Período</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={salesData}>
                        <defs>
                          <linearGradient id="salesGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="sales"
                          stroke="#8b5cf6"
                          strokeWidth={2}
                          fill="url(#salesGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <div className="grid lg:grid-cols-2 gap-6">
                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Distribución por Categoría</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                            dataKey="value"
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {categoryData.map((cat) => (
                        <div key={cat.name} className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
                          <span className="text-sm text-gray-600">{cat.name}</span>
                          <span className="text-sm font-medium ml-auto">{cat.value}%</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-sm">
                  <CardHeader>
                    <CardTitle>Pedidos por Período</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={salesData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="name" stroke="#6b7280" />
                          <YAxis stroke="#6b7280" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: '#fff',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="orders" fill="#06b6d4" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Products Tab */}
            <TabsContent value="products" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Productos Más Vendidos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topProducts.map((product, index) => (
                      <div key={product.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{product.name}</p>
                          <p className="text-sm text-gray-500">{product.units} unidades vendidas</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-violet-600">${product.sales.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Sellers Tab */}
            <TabsContent value="sellers" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Mejores Vendedores</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topSellers.map((seller, index) => (
                      <div key={seller.name} className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center text-green-600 font-bold">
                          {index + 1}
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{seller.name}</p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>{seller.orders} pedidos</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3" />
                              {seller.rating}
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">${seller.sales.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Crecimiento de Usuarios</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={usersData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="name" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="users"
                          stroke="#10b981"
                          strokeWidth={2}
                          dot={{ fill: '#10b981', strokeWidth: 2 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Financial Tab */}
            <TabsContent value="financial" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-500 mb-1">Ingresos Totales</p>
                    <p className="text-3xl font-bold text-gray-900">$756,000</p>
                    <p className="text-sm text-green-600 mt-2">+23.5% vs período anterior</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-500 mb-1">Comisiones Ganadas</p>
                    <p className="text-3xl font-bold text-gray-900">$37,800</p>
                    <p className="text-sm text-green-600 mt-2">+15.2% vs período anterior</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <p className="text-sm text-gray-500 mb-1">Reembolsos</p>
                    <p className="text-3xl font-bold text-gray-900">$12,450</p>
                    <p className="text-sm text-red-600 mt-2">-2.3% vs período anterior</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Comisiones por Mes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={commissionData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                        <XAxis dataKey="month" stroke="#6b7280" />
                        <YAxis stroke="#6b7280" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#fff',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px'
                          }}
                          formatter={(value) => [`$${value}`, 'Comisión']}
                        />
                        <Bar dataKey="commission" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
