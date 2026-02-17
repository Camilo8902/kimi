import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ChevronLeft,
  Search,
  Package,
  Truck,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Eye,
  Printer,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  customer: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: { name: string; quantity: number; price: number }[];
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    customer: 'Juan Pérez',
    status: 'pending',
    total: 249.99,
    items: [{ name: 'Zapatillas Running Pro', quantity: 1, price: 249.99 }],
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-14',
    customer: 'María García',
    status: 'processing',
    total: 149.99,
    items: [{ name: 'Mancuernas Ajustables', quantity: 1, price: 149.99 }],
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-13',
    customer: 'Carlos López',
    status: 'shipped',
    total: 199.99,
    items: [{ name: 'Smartwatch Sport', quantity: 1, price: 199.99 }],
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    date: '2024-01-12',
    customer: 'Ana Martínez',
    status: 'delivered',
    total: 89.99,
    items: [{ name: 'Zapatillas Running Pro', quantity: 1, price: 89.99 }],
  },
];

const statusConfig = {
  pending: { label: 'Pendiente', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
  processing: { label: 'Procesando', icon: Package, color: 'bg-blue-100 text-blue-700' },
  shipped: { label: 'Enviado', icon: Truck, color: 'bg-violet-100 text-violet-700' },
  delivered: { label: 'Entregado', icon: CheckCircle, color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelado', icon: Clock, color: 'bg-red-100 text-red-700' },
};

export function SellerOrders() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getCounts = () => ({
    all: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    processing: mockOrders.filter(o => o.status === 'processing').length,
    shipped: mockOrders.filter(o => o.status === 'shipped').length,
    delivered: mockOrders.filter(o => o.status === 'delivered').length,
  });

  const counts = getCounts();

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    // In real app, update via API
    console.log(`Updating order ${orderId} to ${newStatus}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="flex items-center justify-between px-4 sm:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link to="/seller/dashboard" className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-xl font-bold text-gray-900">Pedidos</h1>
          </div>
        </div>
      </header>

      <main className="p-4 sm:p-8">
        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'Todos', value: counts.all, color: 'bg-gray-100' },
            { label: 'Pendientes', value: counts.pending, color: 'bg-yellow-100 text-yellow-700' },
            { label: 'Procesando', value: counts.processing, color: 'bg-blue-100 text-blue-700' },
            { label: 'Enviados', value: counts.shipped, color: 'bg-violet-100 text-violet-700' },
            { label: 'Entregados', value: counts.delivered, color: 'bg-green-100 text-green-700' },
          ].map((stat) => (
            <Card key={stat.label} className="border-0 shadow-sm">
              <CardContent className={`p-4 ${stat.color}`}>
                <p className="text-xs opacity-70">{stat.label}</p>
                <p className="text-2xl font-bold">{stat.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-sm mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar por número de pedido o cliente..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Orders Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="pending">Pendientes</TabsTrigger>
            <TabsTrigger value="processing">Procesando</TabsTrigger>
            <TabsTrigger value="shipped">Enviados</TabsTrigger>
            <TabsTrigger value="delivered">Entregados</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab}>
            <Card className="border-0 shadow-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Pedido</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Cliente</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Fecha</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Total</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Estado</th>
                        <th className="text-right py-3 px-4 text-sm font-medium text-gray-500">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredOrders.map((order) => {
                        const status = statusConfig[order.status];
                        const StatusIcon = status.icon;

                        return (
                          <tr key={order.id} className="border-b hover:bg-gray-50">
                            <td className="py-3 px-4">
                              <p className="font-medium">{order.orderNumber}</p>
                              <p className="text-xs text-gray-500">{order.items.length} productos</p>
                            </td>
                            <td className="py-3 px-4">{order.customer}</td>
                            <td className="py-3 px-4 text-sm text-gray-600">
                              {new Date(order.date).toLocaleDateString('es-ES')}
                            </td>
                            <td className="py-3 px-4 font-medium">${order.total.toFixed(2)}</td>
                            <td className="py-3 px-4">
                              <Badge className={status.color}>
                                <StatusIcon className="w-3 h-3 mr-1" />
                                {status.label}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => setSelectedOrder(order)}
                                >
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="w-4 h-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem onClick={() => setSelectedOrder(order)}>
                                      <Eye className="w-4 h-4 mr-2" />
                                      Ver detalles
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Printer className="w-4 h-4 mr-2" />
                                      Imprimir
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <FileText className="w-4 h-4 mr-2" />
                                      Factura
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {filteredOrders.length === 0 && (
                  <div className="p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos</h3>
                    <p className="text-gray-500">No se encontraron pedidos con los filtros seleccionados</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center justify-between">
                  <span>Pedido {selectedOrder.orderNumber}</span>
                  <Badge className={statusConfig[selectedOrder.status].color}>
                    {statusConfig[selectedOrder.status].label}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Customer Info */}
                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium mb-2">Información del Cliente</h4>
                  <p className="text-gray-600">{selectedOrder.customer}</p>
                </div>

                {/* Items */}
                <div>
                  <h4 className="font-medium mb-3">Productos</h4>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-medium">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total</span>
                    <span className="text-2xl font-bold text-violet-600">${selectedOrder.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  {selectedOrder.status === 'pending' && (
                    <Button 
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      onClick={() => updateOrderStatus(selectedOrder.id, 'processing')}
                    >
                      <Package className="w-4 h-4 mr-2" />
                      Procesar Pedido
                    </Button>
                  )}
                  {selectedOrder.status === 'processing' && (
                    <Button 
                      className="flex-1 bg-violet-600 hover:bg-violet-700"
                      onClick={() => updateOrderStatus(selectedOrder.id, 'shipped')}
                    >
                      <Truck className="w-4 h-4 mr-2" />
                      Marcar como Enviado
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1">
                    <Printer className="w-4 h-4 mr-2" />
                    Imprimir
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
