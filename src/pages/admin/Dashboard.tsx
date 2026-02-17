import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Store,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Package,
  AlertTriangle,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { products } from '@/data/products';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard', active: true },
  { icon: ShoppingBag, label: 'Pedidos', href: '/admin/orders' },
  { icon: Package, label: 'Productos', href: '/admin/products' },
  { icon: Store, label: 'Empresas', href: '/admin/companies', active: false },
  { icon: Users, label: 'Usuarios', href: '/admin/users' },
  { icon: BarChart3, label: 'Reportes', href: '/admin/reports' },
  { icon: Settings, label: 'Configuración', href: '/admin/settings' },
];

const stats = [
  {
    title: 'Ventas Totales',
    value: '$124,500',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
    color: 'from-green-500 to-emerald-600',
  },
  {
    title: 'Pedidos',
    value: '1,429',
    change: '+8.2%',
    trend: 'up',
    icon: ShoppingBag,
    color: 'from-violet-500 to-purple-600',
  },
  {
    title: 'Clientes',
    value: '8,549',
    change: '+15.3%',
    trend: 'up',
    icon: Users,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    title: 'Empresas',
    value: '156',
    change: '+5.1%',
    trend: 'up',
    icon: Store,
    color: 'from-orange-500 to-red-600',
  },
];

const recentOrders = [
  { id: '#ORD-001', customer: 'Juan Pérez', amount: 249.99, status: 'completed', date: '2024-01-15' },
  { id: '#ORD-002', customer: 'María García', amount: 189.50, status: 'processing', date: '2024-01-15' },
  { id: '#ORD-003', customer: 'Carlos López', amount: 567.00, status: 'pending', date: '2024-01-14' },
  { id: '#ORD-004', customer: 'Ana Martínez', amount: 99.99, status: 'completed', date: '2024-01-14' },
  { id: '#ORD-005', customer: 'Pedro Sánchez', amount: 1234.00, status: 'shipped', date: '2024-01-13' },
];

const topProducts = products.slice(0, 5);

export function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
              <h1 className="text-xl font-bold text-gray-900">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-sm text-violet-600 hover:underline">
                Ver tienda →
              </Link>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="p-4 sm:p-8">
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
                <Link to="/admin/orders" className="text-sm text-violet-600 hover:underline flex items-center gap-1">
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
                              order.status === 'shipped' ? 'bg-violet-100 text-violet-700' :
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

            {/* Top Products */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle>Productos Top</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topProducts.map((product) => (
                    <div key={product.id} className="flex items-center gap-3">
                      <img
                        src={product.images?.[0]?.url || '/placeholder-product.png'}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{product.name}</p>
                        <p className="text-xs text-gray-500">{product.sales_count} vendidos</p>
                      </div>
                      <span className="font-semibold text-violet-600">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alerts */}
          <Card className="mt-8 border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-500" />
                Alertas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-yellow-600" />
                    <div>
                      <p className="font-medium">Stock bajo</p>
                      <p className="text-sm text-gray-600">5 productos tienen stock menor a 10 unidades</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Ver</Button>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <Store className="w-5 h-5 text-blue-600" />
                    <div>
                      <p className="font-medium">Empresas pendientes</p>
                      <p className="text-sm text-gray-600">3 empresas esperan verificación</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Revisar</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
