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
  ChevronRight,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Truck,
  PackageCheck,
  MoreVertical,
  Download
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: ShoppingBag, label: 'Pedidos', href: '/admin/orders', active: true },
  { icon: Package, label: 'Productos', href: '/admin/products' },
  { icon: Store, label: 'Empresas', href: '/admin/companies' },
  { icon: Users, label: 'Usuarios', href: '/admin/users' },
  { icon: BarChart3, label: 'Reportes', href: '/admin/reports' },
  { icon: Settings, label: 'Configuración', href: '/admin/settings' },
];

const orders = [
  {
    id: 'ORD-2024-001',
    customer: 'Juan Pérez',
    email: 'juan.perez@email.com',
    items: 3,
    total: 459.99,
    status: 'completed',
    payment: 'paid',
    date: '2024-01-15',
    company: 'TechStore'
  },
  {
    id: 'ORD-2024-002',
    customer: 'María García',
    email: 'maria.garcia@email.com',
    items: 1,
    total: 189.50,
    status: 'processing',
    payment: 'paid',
    date: '2024-01-15',
    company: 'FashionHub'
  },
  {
    id: 'ORD-2024-003',
    customer: 'Carlos López',
    email: 'carlos.lopez@email.com',
    items: 5,
    total: 567.00,
    status: 'pending',
    payment: 'pending',
    date: '2024-01-14',
    company: 'HomeDecor'
  },
  {
    id: 'ORD-2024-004',
    customer: 'Ana Martínez',
    email: 'ana.martinez@email.com',
    items: 2,
    total: 99.99,
    status: 'shipped',
    payment: 'paid',
    date: '2024-01-14',
    company: 'TechStore'
  },
  {
    id: 'ORD-2024-005',
    customer: 'Pedro Sánchez',
    email: 'pedro.sanchez@email.com',
    items: 8,
    total: 1234.00,
    status: 'delivered',
    payment: 'paid',
    date: '2024-01-13',
    company: 'SportZone'
  },
  {
    id: 'ORD-2024-006',
    customer: 'Laura Gómez',
    email: 'laura.gomez@email.com',
    items: 1,
    total: 75.00,
    status: 'cancelled',
    payment: 'refunded',
    date: '2024-01-13',
    company: 'BeautyCare'
  },
  {
    id: 'ORD-2024-007',
    customer: 'Miguel Torres',
    email: 'miguel.torres@email.com',
    items: 4,
    total: 345.50,
    status: 'processing',
    payment: 'paid',
    date: '2024-01-12',
    company: 'HomeDecor'
  },
];

const statusConfig: Record<string, { label: string; color: string; icon: any }> = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700', icon: Clock },
  processing: { label: 'Procesando', color: 'bg-blue-100 text-blue-700', icon: Package },
  shipped: { label: 'Enviado', color: 'bg-violet-100 text-violet-700', icon: Truck },
  delivered: { label: 'Entregado', color: 'bg-green-100 text-green-700', icon: PackageCheck },
  completed: { label: 'Completado', color: 'bg-green-100 text-green-700', icon: CheckCircle },
  cancelled: { label: 'Cancelado', color: 'bg-red-100 text-red-700', icon: XCircle },
};

const paymentConfig: Record<string, { label: string; color: string }> = {
  pending: { label: 'Pendiente', color: 'bg-yellow-100 text-yellow-700' },
  paid: { label: 'Pagado', color: 'bg-green-100 text-green-700' },
  refunded: { label: 'Reembolsado', color: 'bg-gray-100 text-gray-700' },
};

export function AdminOrders() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
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

  const handleStatusChange = (orderId: string, newStatus: string) => {
    addToast({
      type: 'success',
      title: 'Estado actualizado',
      message: `El pedido ${orderId} ahora está en: ${statusConfig[newStatus as keyof typeof statusConfig]?.label || newStatus}`,
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total Pedidos', value: '1,429', icon: ShoppingBag, color: 'from-violet-500 to-purple-600' },
    { label: 'Pendientes', value: '23', icon: Clock, color: 'from-yellow-500 to-orange-600' },
    { label: 'Procesando', value: '45', icon: Package, color: 'from-blue-500 to-indigo-600' },
    { label: 'Cancelados', value: '12', icon: XCircle, color: 'from-red-500 to-pink-600' },
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
              <h1 className="text-xl font-bold text-gray-900">Gestión de Pedidos</h1>
            </div>
            <div className="flex items-center gap-4">
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
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Filters */}
          <Card className="border-0 shadow-sm mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por ID, cliente o email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filtrar por estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos los estados</SelectItem>
                    <SelectItem value="pending">Pendiente</SelectItem>
                    <SelectItem value="processing">Procesando</SelectItem>
                    <SelectItem value="shipped">Enviado</SelectItem>
                    <SelectItem value="delivered">Entregado</SelectItem>
                    <SelectItem value="completed">Completado</SelectItem>
                    <SelectItem value="cancelled">Cancelado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Orders Table */}
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle>Lista de Pedidos</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Pedido</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Empresa</TableHead>
                    <TableHead>Fecha</TableHead>
                    <TableHead>Total</TableHead>
                    <TableHead>Estado</TableHead>
                    <TableHead>Pago</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => {
                    const status = statusConfig[order.status];
                    const payment = paymentConfig[order.payment];
                    const StatusIcon = status?.icon || Clock;
                    return (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <p className="text-sm text-gray-500">{order.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{order.company}</TableCell>
                        <TableCell className="text-gray-500">{order.date}</TableCell>
                        <TableCell className="font-semibold">${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                          <Select
                            value={order.status}
                            onValueChange={(value) => handleStatusChange(order.id, value)}
                          >
                            <SelectTrigger className={`w-36 ${status?.color || ''}`}>
                              <div className="flex items-center gap-2">
                                <StatusIcon className="w-4 h-4" />
                                <SelectValue />
                              </div>
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pendiente</SelectItem>
                              <SelectItem value="processing">Procesando</SelectItem>
                              <SelectItem value="shipped">Enviado</SelectItem>
                              <SelectItem value="delivered">Entregado</SelectItem>
                              <SelectItem value="completed">Completado</SelectItem>
                              <SelectItem value="cancelled">Cancelado</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <Badge className={payment?.color}>
                            {payment?.label || order.payment}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedOrder(order)}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Detalles del Pedido {selectedOrder?.id}</DialogTitle>
                                <DialogDescription>
                                  Información completa del pedido
                                </DialogDescription>
                              </DialogHeader>
                              {selectedOrder && (
                                <div className="space-y-6 mt-4">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div>
                                      <p className="text-sm text-gray-500">Cliente</p>
                                      <p className="font-medium">{selectedOrder.customer}</p>
                                      <p className="text-sm text-gray-500">{selectedOrder.email}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Empresa</p>
                                      <p className="font-medium">{selectedOrder.company}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Fecha</p>
                                      <p className="font-medium">{selectedOrder.date}</p>
                                    </div>
                                    <div>
                                      <p className="text-sm text-gray-500">Items</p>
                                      <p className="font-medium">{selectedOrder.items} productos</p>
                                    </div>
                                  </div>
                                  <div className="border-t pt-4">
                                    <div className="flex justify-between items-center">
                                      <p className="text-lg font-semibold">Total</p>
                                      <p className="text-2xl font-bold text-violet-600">${selectedOrder.total.toFixed(2)}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-3">
                                    <Button className="flex-1">
                                      <PackageCheck className="w-4 h-4 mr-2" />
                                      Actualizar Estado
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                      <Download className="w-4 h-4 mr-2" />
                                      Descargar Factura
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
              {filteredOrders.length === 0 && (
                <div className="text-center py-12 text-gray-500">
                  No se encontraron pedidos con los filtros seleccionados
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
