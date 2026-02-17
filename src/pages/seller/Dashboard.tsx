import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Store,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  AlertTriangle,
  ChevronRight,
  Eye
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { products } from '@/data/products';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/seller/dashboard', active: true },
  { icon: ShoppingBag, label: 'Pedidos', href: '/seller/orders' },
  { icon: Package, label: 'Productos', href: '/seller/products' },
  { icon: BarChart3, label: 'Analíticas', href: '/seller/analytics' },
  { icon: Store, label: 'Mi Tienda', href: '/seller/store' },
  { icon: Settings, label: 'Configuración', href: '/seller/settings' },
];

const stats = [
  {
    title: 'Ventas del Mes',
    value: '$12,450',
    change: '+18.2%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Pedidos',
    value: '156',
    change: '+12.5%',
    trend: 'up',
    icon: ShoppingBag,
    color: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Productos',
    value: '42',
    change: '+3',
    trend: 'up',
    icon: Package,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Visitas',
    value: '3,429',
    change: '-2.1%',
    trend: 'down',
    icon: Eye,
    color: 'from-orange-500 to-red-600',
  },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'Juan Pérez', amount: 249.99, status: 'completed', date: '2024-01-15' },
  { id: '#ORD-002', customer: 'María García', amount: 189.50, status: 'processing', date: '2024-01-15' },
  { id: '#ORD-003', customer: 'Carlos López', amount: 567.00, status: 'pending', date: '2024-01-14' },
  { id: '#ORD-004', customer: 'Ana Martínez', amount: 99.99, status: 'completed', date: '2024-01-14' },
];

const lowStockProducts = products.filter(p => p.quantity < 100).slice(0, 3);

export function SellerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-violet-800 rounded-xl flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl">MarketHub</span>
              <p className="text-xs text-gray-500">Panel de Vendedor</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 space-y-1">
          {sidebarLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                link.active
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
                  <Store className="w-4 h-4 text-white" />
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
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button asChild className="bg-violet-600 hover:bg-violet-700">
                <Link to="/seller/products/new">
                  <Plus className="w-4 h-4 mr-2" />
                  Nuevo Producto
                </Link>
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-8">
          {/* Welcome */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900">¡Bienvenido de vuelta!</h2>
            <p className="text-gray-600">Aquí está el resumen de tu tienda hoy</p>
          </div>

          {/* Stats Grid */}
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
                        {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                        <span>{stat.change} este mes</span>
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

          {/* Charts & Tables */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Orders */}
            <Card className="lg:col-span-2 border-0 shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Pedidos Recientes</CardTitle>
                <Link to="/seller/orders" className="text-sm text-violet-600 hover:underline flex items-center gap-1">
                  Ver todos
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100">
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Pedido</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Cliente</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Fecha</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Monto</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentOrders.map((order) => (
                        <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                          <td className="py-3 px-4 font-medium">{order.id}</td>
                          <td className="py-3 px-4">{order.customer}</td>
                          <td className="py-3 px-4 text-gray-500">{order.date}</td>
                          <td className="py-3 px-4 font-medium">${order.amount.toFixed(2)}</td>
                          <td className="py-3 px-4">
                            <Badge className={
                              order.status === 'completed' ? 'bg-green-100 text-green-700' :
                              order.status === 'processing' ? 'bg-blue-100 text-blue-700' :
                              'bg-yellow-100 text-yellow-700'
                            }>
                              {order.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-600">
                  <AlertTriangle className="w-5 h-5" />
                  Stock Bajo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <img
                        src={product.images?.[0]?.url || '/placeholder-product.png'}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Progress value={(product.quantity / 150) * 100} className="h-2 w-20" />
                          <span className="text-xs text-gray-500">{product.quantity} left</span>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        Reponer
                      </Button>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4" asChild>
                  <Link to="/seller/products">Ver Inventario</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Commission Info */}
          <Card className="mt-8 border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Comisión del Mes</h3>
                  <p className="text-gray-600">Tu plan actual: Premium (8% comisión)</p>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-violet-600">$996.00</p>
                  <p className="text-sm text-gray-500">Comisión acumulada</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-violet-50 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-violet-900">Próximo pago</p>
                    <p className="text-sm text-violet-700">Se procesará el 1 de febrero</p>
                  </div>
                  <Button variant="outline" className="border-violet-300 text-violet-700 hover:bg-violet-100">
                    Ver Detalles
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
