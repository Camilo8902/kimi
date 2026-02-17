import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  XCircle,
  ChevronRight,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Footer } from '@/components/layout/Footer';
import { useAuthStore } from '@/stores/authStore';
import { products } from '@/data/products';

interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    image: string;
  }[];
  trackingNumber?: string;
}

const mockOrders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    date: '2024-01-15',
    status: 'delivered',
    total: 249.99,
    items: [
      { id: '1', name: 'Zapatillas Running Pro', quantity: 1, price: 89.99, image: products[0].images?.[0]?.url || '' },
      { id: '2', name: 'Smartwatch Sport', quantity: 1, price: 199.99, image: products[2].images?.[0]?.url || '' },
    ],
    trackingNumber: 'TRK123456789',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    date: '2024-01-14',
    status: 'shipped',
    total: 149.99,
    items: [
      { id: '3', name: 'Mancuernas Ajustables 20kg', quantity: 1, price: 149.99, image: products[1].images?.[0]?.url || '' },
    ],
    trackingNumber: 'TRK987654321',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    date: '2024-01-12',
    status: 'processing',
    total: 799.99,
    items: [
      { id: '4', name: 'Tablet Pro 11"', quantity: 1, price: 799.99, image: products[3].images?.[0]?.url || '' },
    ],
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-004',
    date: '2024-01-10',
    status: 'pending',
    total: 349.99,
    items: [
      { id: '5', name: 'Auriculares Noise Cancelling', quantity: 1, price: 349.99, image: products[4].images?.[0]?.url || '' },
    ],
  },
  {
    id: '5',
    orderNumber: 'ORD-2023-089',
    date: '2023-12-20',
    status: 'cancelled',
    total: 129.99,
    items: [
      { id: '6', name: 'Teclado Mecánico Pro', quantity: 1, price: 129.99, image: products[7].images?.[0]?.url || '' },
    ],
  },
];

const statusConfig = {
  pending: { label: 'Pendiente', icon: Clock, color: 'bg-yellow-100 text-yellow-700' },
  processing: { label: 'Procesando', icon: Package, color: 'bg-blue-100 text-blue-700' },
  shipped: { label: 'Enviado', icon: Truck, color: 'bg-violet-100 text-violet-700' },
  delivered: { label: 'Entregado', icon: CheckCircle, color: 'bg-green-100 text-green-700' },
  cancelled: { label: 'Cancelado', icon: XCircle, color: 'bg-red-100 text-red-700' },
};

export function Orders() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [activeTab, setActiveTab] = useState('all');

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const filteredOrders = mockOrders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesTab = activeTab === 'all' || order.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const getOrderCounts = () => {
    return {
      all: mockOrders.length,
      pending: mockOrders.filter(o => o.status === 'pending').length,
      processing: mockOrders.filter(o => o.status === 'processing').length,
      shipped: mockOrders.filter(o => o.status === 'shipped').length,
      delivered: mockOrders.filter(o => o.status === 'delivered').length,
    };
  };

  const counts = getOrderCounts();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Mis Pedidos</h1>
              <p className="text-gray-600">Gestiona y realiza seguimiento de tus compras</p>
            </div>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar por número de pedido o producto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full justify-start mb-6 flex-wrap h-auto gap-2">
              <TabsTrigger value="all" className="data-[state=active]:bg-violet-600 data-[state=active]:text-white">
                Todos ({counts.all})
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-white">
                Pendientes ({counts.pending})
              </TabsTrigger>
              <TabsTrigger value="processing" className="data-[state=active]:bg-blue-500 data-[state=active]:text-white">
                Procesando ({counts.processing})
              </TabsTrigger>
              <TabsTrigger value="shipped" className="data-[state=active]:bg-violet-500 data-[state=active]:text-white">
                Enviados ({counts.shipped})
              </TabsTrigger>
              <TabsTrigger value="delivered" className="data-[state=active]:bg-green-500 data-[state=active]:text-white">
                Entregados ({counts.delivered})
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-0">
              {filteredOrders.length === 0 ? (
                <Card className="border-0 shadow-sm">
                  <CardContent className="p-12 text-center">
                    <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No hay pedidos</h3>
                    <p className="text-gray-500 mb-4">No encontramos pedidos con los filtros seleccionados</p>
                    <Button 
                      onClick={() => { setSearchQuery(''); setActiveTab('all'); }}
                      variant="outline"
                    >
                      Limpiar filtros
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => {
                    const status = statusConfig[order.status];
                    const StatusIcon = status.icon;

                    return (
                      <Card 
                        key={order.id} 
                        className="border-0 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => setSelectedOrder(order)}
                      >
                        <CardContent className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                            <div className="flex items-start gap-4">
                              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                                <img
                                  src={order.items[0].image}
                                  alt={order.items[0].name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold">{order.orderNumber}</span>
                                  <Badge className={status.color}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {status.label}
                                  </Badge>
                                </div>
                                <p className="text-sm text-gray-500">
                                  {new Date(order.date).toLocaleDateString('es-ES', { 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                  })}
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                  {order.items.length} {order.items.length === 1 ? 'producto' : 'productos'}
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between sm:justify-end gap-4">
                              <div className="text-right">
                                <p className="font-bold text-lg text-violet-600">${order.total.toFixed(2)}</p>
                              </div>
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Order Detail Dialog */}
      <Dialog open={!!selectedOrder} onOpenChange={() => setSelectedOrder(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedOrder && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  Pedido {selectedOrder.orderNumber}
                  <Badge className={statusConfig[selectedOrder.status].color}>
                    {statusConfig[selectedOrder.status].label}
                  </Badge>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Order Timeline */}
                <div className="relative">
                  <div className="flex items-center justify-between">
                    {['pending', 'processing', 'shipped', 'delivered'].map((step, index) => {
                      const stepOrder = ['pending', 'processing', 'shipped', 'delivered'];
                      const currentIndex = stepOrder.indexOf(selectedOrder.status);
                      const isCompleted = index <= currentIndex;
                      const isCurrent = index === currentIndex;

                      return (
                        <div key={step} className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            isCompleted ? 'bg-violet-600 text-white' : 'bg-gray-200 text-gray-400'
                          } ${isCurrent ? 'ring-4 ring-violet-200' : ''}`}>
                            {isCompleted ? <CheckCircle className="w-4 h-4" /> : <div className="w-2 h-2 bg-current rounded-full" />}
                          </div>
                          <span className="text-xs mt-1 text-gray-500 capitalize">{step}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-200 -z-10">
                    <div 
                      className="h-full bg-violet-600 transition-all"
                      style={{ 
                        width: `${(Math.max(0, ['pending', 'processing', 'shipped', 'delivered'].indexOf(selectedOrder.status)) / 3) * 100}%` 
                      }}
                    />
                  </div>
                </div>

                {/* Tracking */}
                {selectedOrder.trackingNumber && (
                  <div className="bg-violet-50 rounded-lg p-4">
                    <p className="text-sm text-violet-600 font-medium">Número de seguimiento</p>
                    <p className="text-lg font-bold text-violet-900">{selectedOrder.trackingNumber}</p>
                  </div>
                )}

                {/* Items */}
                <div>
                  <h3 className="font-semibold mb-3">Productos</h3>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                        <div className="flex-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-500">Cantidad: {item.quantity}</p>
                        </div>
                        <p className="font-semibold">${item.price.toFixed(2)}</p>
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
                  <Button className="flex-1 bg-violet-600 hover:bg-violet-700">
                    Ver Factura
                  </Button>
                  {selectedOrder.status === 'delivered' && (
                    <Button variant="outline" className="flex-1">
                      Devolver
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}

import { Navigate } from 'react-router-dom';
