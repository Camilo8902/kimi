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
  Building,
  CreditCard,
  Truck,
  Shield,
  Bell,
  Save,
  Plus,
  Trash2,
  Edit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

const sidebarLinks = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/admin/dashboard' },
  { icon: ShoppingBag, label: 'Pedidos', href: '/admin/orders' },
  { icon: Package, label: 'Productos', href: '/admin/products' },
  { icon: Store, label: 'Empresas', href: '/admin/companies' },
  { icon: Users, label: 'Usuarios', href: '/admin/users' },
  { icon: BarChart3, label: 'Reportes', href: '/admin/reports' },
  { icon: Settings, label: 'Configuración', href: '/admin/settings', active: true },
];

const shippingMethods = [
  { id: 1, name: 'Envío Estándar', price: 5.99, days: '5-7 días', active: true },
  { id: 2, name: 'Envío Express', price: 12.99, days: '2-3 días', active: true },
  { id: 3, name: 'Envío Prioritario', price: 24.99, days: '1 día', active: false },
];

export function AdminSettings() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  
  const [generalSettings, setGeneralSettings] = useState({
    siteName: 'MarketHub',
    siteEmail: 'contacto@markethub.com',
    sitePhone: '+1 234 567 8900',
    siteAddress: '123 Commerce Street, Business City, BC 12345',
    supportEmail: 'soporte@markethub.com',
    timezone: 'America/New_York',
    currency: 'USD',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNewOrder: true,
    emailNewUser: true,
    emailLowStock: true,
    emailWeeklyReport: false,
  });

  const [commissionRate, setCommissionRate] = useState('10');
  const [minimumPayout, setMinimumPayout] = useState('100');

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

  const handleSave = () => {
    addToast({
      type: 'success',
      title: 'Configuración guardada',
      message: 'Los cambios se han guardado correctamente',
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
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

      <main className="flex-1 lg:ml-64">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
          <div className="flex items-center justify-between px-4 sm:px-8 py-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="w-5 h-5" />
              </button>
              <h1 className="text-xl font-bold text-gray-900">Configuración</h1>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/" className="text-sm text-violet-600 hover:underline">
                Ver tienda →
              </Link>
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-8">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Building className="w-4 h-4" />
                General
              </TabsTrigger>
              <TabsTrigger value="payments" className="flex items-center gap-2">
                <CreditCard className="w-4 h-4" />
                Pagos
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                Envíos
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2">
                <Bell className="w-4 h-4" />
                Notificaciones
              </TabsTrigger>
              <TabsTrigger value="policies" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Políticas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Información de la Plataforma</CardTitle>
                  <CardDescription>Configura la información básica de tu plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="siteName">Nombre del Sitio</Label>
                      <Input id="siteName" value={generalSettings.siteName} onChange={(e) => setGeneralSettings({...generalSettings, siteName: e.target.value})} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="siteEmail">Email de Contacto</Label>
                      <Input id="siteEmail" type="email" value={generalSettings.siteEmail} onChange={(e) => setGeneralSettings({...generalSettings, siteEmail: e.target.value})} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="sitePhone">Teléfono</Label>
                      <Input id="sitePhone" value={generalSettings.sitePhone} onChange={(e) => setGeneralSettings({...generalSettings, sitePhone: e.target.value})} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="supportEmail">Email de Soporte</Label>
                      <Input id="supportEmail" type="email" value={generalSettings.supportEmail} onChange={(e) => setGeneralSettings({...generalSettings, supportEmail: e.target.value})} className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="timezone">Zona Horaria</Label>
                      <Select value={generalSettings.timezone} onValueChange={(v) => setGeneralSettings({...generalSettings, timezone: v})}>
                        <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="America/New_York">Nueva York (EST)</SelectItem>
                          <SelectItem value="America/Los_Angeles">Los Ángeles (PST)</SelectItem>
                          <SelectItem value="Europe/Madrid">Madrid (CET)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="currency">Moneda</Label>
                      <Select value={generalSettings.currency} onValueChange={(v) => setGeneralSettings({...generalSettings, currency: v})}>
                        <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - Dólar estadounidense</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="MXN">MXN - Peso mexicano</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="siteAddress">Dirección</Label>
                    <Textarea id="siteAddress" value={generalSettings.siteAddress} onChange={(e) => setGeneralSettings({...generalSettings, siteAddress: e.target.value})} className="mt-1" />
                  </div>
                  <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />Guardar Cambios</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Configuración de Pagos</CardTitle>
                  <CardDescription>Configura las opciones de pago de la plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="commissionRate">Tasa de Comisión (%)</Label>
                      <Input id="commissionRate" type="number" value={commissionRate} onChange={(e) => setCommissionRate(e.target.value)} className="mt-1" />
                      <p className="text-sm text-gray-500 mt-1">Comisión aplicada a cada venta</p>
                    </div>
                    <div>
                      <Label htmlFor="minimumPayout">Monto Mínimo para Retiro ($)</Label>
                      <Input id="minimumPayout" type="number" value={minimumPayout} onChange={(e) => setMinimumPayout(e.target.value)} className="mt-1" />
                    </div>
                  </div>
                  <div className="border-t pt-6">
                    <h3 className="font-semibold mb-4">Métodos de Pago Aceptados</h3>
                    <div className="space-y-3">
                      {['Tarjetas de Crédito/Débito', 'PayPal', 'Transferencia Bancaria', 'Stripe'].map((method) => (
                        <div key={method} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-gray-500" />
                            <span>{method}</span>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />Guardar Cambios</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="shipping" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Métodos de Envío</CardTitle>
                  <CardDescription>Configura los métodos de envío disponibles</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Método</TableHead>
                        <TableHead>Precio</TableHead>
                        <TableHead>Tiempo de Entrega</TableHead>
                        <TableHead>Estado</TableHead>
                        <TableHead className="text-right">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {shippingMethods.map((method) => (
                        <TableRow key={method.id}>
                          <TableCell className="font-medium">{method.name}</TableCell>
                          <TableCell>${method.price.toFixed(2)}</TableCell>
                          <TableCell>{method.days}</TableCell>
                          <TableCell><Switch defaultChecked={method.active} /></TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                              <Button variant="ghost" size="sm" className="text-red-600"><Trash2 className="w-4 h-4" /></Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  <Button variant="outline"><Plus className="w-4 h-4 mr-2" />Agregar Método de Envío</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Configuración de Notificaciones</CardTitle>
                  <CardDescription>Configura qué notificaciones recibir</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium">Nuevo Pedido</p>
                        <p className="text-sm text-gray-500">Recibir email cuando se realice un nuevo pedido</p>
                      </div>
                      <Switch checked={notificationSettings.emailNewOrder} onCheckedChange={(v) => setNotificationSettings({...notificationSettings, emailNewOrder: v})} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium">Nuevo Usuario</p>
                        <p className="text-sm text-gray-500">Recibir email cuando se registre un nuevo usuario</p>
                      </div>
                      <Switch checked={notificationSettings.emailNewUser} onCheckedChange={(v) => setNotificationSettings({...notificationSettings, emailNewUser: v})} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium">Stock Bajo</p>
                        <p className="text-sm text-gray-500">Recibir email cuando un producto tenga stock bajo</p>
                      </div>
                      <Switch checked={notificationSettings.emailLowStock} onCheckedChange={(v) => setNotificationSettings({...notificationSettings, emailLowStock: v})} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div>
                        <p className="font-medium">Reporte Semanal</p>
                        <p className="text-sm text-gray-500">Recibir reporte semanal de estadísticas</p>
                      </div>
                      <Switch checked={notificationSettings.emailWeeklyReport} onCheckedChange={(v) => setNotificationSettings({...notificationSettings, emailWeeklyReport: v})} />
                    </div>
                  </div>
                  <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />Guardar Cambios</Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="policies" className="space-y-6">
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle>Políticas de la Plataforma</CardTitle>
                  <CardDescription>Configura las políticas y términos legales</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Política de Privacidad</Label>
                    <Textarea className="mt-1 h-32" defaultValue="Esta política de privacidad describe cómo recopilamos, usamos y protectemos tu información personal..." />
                  </div>
                  <div>
                    <Label>Términos y Condiciones</Label>
                    <Textarea className="mt-1 h-32" defaultValue="Al usar MarketHub, aceptas nuestros términos y condiciones de uso..." />
                  </div>
                  <div>
                    <Label>Política de Devoluciones</Label>
                    <Textarea className="mt-1 h-32" defaultValue="Aceptamos devoluciones dentro de los 30 días siguientes a la compra..." />
                  </div>
                  <Button onClick={handleSave}><Save className="w-4 h-4 mr-2" />Guardar Cambios</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}
