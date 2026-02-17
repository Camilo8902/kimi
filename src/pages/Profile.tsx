import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Camera, 
  Save, 
  ArrowLeft,
  ShoppingBag,
  Heart,
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Footer } from '@/components/layout/Footer';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

export function Profile() {
  const navigate = useNavigate();
  const { user, updateProfile, signOut } = useAuthStore();
  const { addToast } = useUIStore();
  
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
    city: user?.city || '',
    country: user?.country || '',
  });

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleSave = async () => {
    setIsLoading(true);
    const { error } = await updateProfile({
      first_name: formData.first_name,
      last_name: formData.last_name,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      country: formData.country,
    });

    if (error) {
      addToast({
        type: 'error',
        title: 'Error',
        message: 'No se pudo actualizar el perfil',
      });
    } else {
      addToast({
        type: 'success',
        title: 'Perfil actualizado',
        message: 'Tus cambios han sido guardados',
      });
      setIsEditing(false);
    }
    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const menuItems = [
    { icon: ShoppingBag, label: 'Mis Pedidos', href: '/orders', count: 12 },
    { icon: Heart, label: 'Lista de Deseos', href: '/wishlist', count: 5 },
    { icon: Settings, label: 'Configuración', href: '/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-violet-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </button>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  {/* Profile Header */}
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <Avatar className="w-24 h-24 mx-auto">
                        <AvatarImage src={user?.avatar_url} />
                        <AvatarFallback className="bg-gradient-to-br from-violet-500 to-violet-700 text-white text-2xl">
                          {user?.first_name?.[0]}{user?.last_name?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <button className="absolute bottom-0 right-0 w-8 h-8 bg-violet-600 text-white rounded-full flex items-center justify-center hover:bg-violet-700 transition-colors">
                        <Camera className="w-4 h-4" />
                      </button>
                    </div>
                    <h2 className="mt-4 font-bold text-lg">{user?.first_name} {user?.last_name}</h2>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                  </div>

                  <Separator className="my-4" />

                  {/* Menu */}
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.href}
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </div>
                        {item.count && (
                          <span className="bg-violet-100 text-violet-600 text-xs font-medium px-2 py-0.5 rounded-full">
                            {item.count}
                          </span>
                        )}
                      </Link>
                    ))}
                    <button
                      onClick={handleSignOut}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Cerrar Sesión</span>
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              <Tabs defaultValue="profile" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile">Información Personal</TabsTrigger>
                  <TabsTrigger value="addresses">Direcciones</TabsTrigger>
                  <TabsTrigger value="security">Seguridad</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Información Personal</CardTitle>
                      <Button
                        variant={isEditing ? 'default' : 'outline'}
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        ) : (
                          <>{isEditing ? <Save className="w-4 h-4 mr-2" /> : null}</>
                        )}
                        {isEditing ? 'Guardar' : 'Editar'}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="first_name">Nombre</Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="first_name"
                              value={formData.first_name}
                              onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                              disabled={!isEditing}
                              className="pl-10"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="last_name">Apellido</Label>
                          <Input
                            id="last_name"
                            value={formData.last_name}
                            onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                            disabled={!isEditing}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              disabled
                              className="pl-10 bg-gray-50"
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Teléfono</Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="phone"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              disabled={!isEditing}
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="addresses">
                  <Card className="border-0 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle>Direcciones de Envío</CardTitle>
                      <Button className="bg-violet-600 hover:bg-violet-700">
                        Agregar Dirección
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="border-2 border-violet-500 rounded-xl p-4 relative">
                          <span className="absolute top-2 right-2 bg-violet-100 text-violet-600 text-xs font-medium px-2 py-1 rounded">
                            Principal
                          </span>
                          <div className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-violet-600 mt-0.5" />
                            <div>
                              <p className="font-medium">Casa</p>
                              <p className="text-gray-600 text-sm">Calle Principal 123</p>
                              <p className="text-gray-600 text-sm">Ciudad de México, 01000</p>
                              <p className="text-gray-600 text-sm">México</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="security">
                  <Card className="border-0 shadow-sm">
                    <CardHeader>
                      <CardTitle>Cambiar Contraseña</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current_password">Contraseña Actual</Label>
                        <Input id="current_password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="new_password">Nueva Contraseña</Label>
                        <Input id="new_password" type="password" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="confirm_password">Confirmar Contraseña</Label>
                        <Input id="confirm_password" type="password" />
                      </div>
                      <Button className="bg-violet-600 hover:bg-violet-700">
                        Actualizar Contraseña
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

// Import Navigate for the redirect
import { Navigate } from 'react-router-dom';
