import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Building,
  User,
  Mail,
  Phone,
  MapPin,
  Globe,
  FileText,
  Upload,
  CheckCircle,
  Store,
  Shield,
  DollarSign,
  Truck,
  Package,
  Star,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { useUIStore } from '@/stores/uiStore';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  rfc: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  website: string;
  description: string;
  category: string;
  agreeTerms: boolean;
}

const businessCategories = [
  'Electrónica y Tecnología',
  'Moda y Accesorios',
  'Hogar y Decoración',
  'Belleza y Cuidado Personal',
  'Deportes y Fitness',
  'Alimentos y Bebidas',
  'Juguetes y Juegos',
  'Libros y Música',
  'Automotriz',
  'Otro'
];

const benefits = [
  { icon: DollarSign, title: 'Comisiones Competitivas', description: 'Solo pagás cuando vendés' },
  { icon: Package, title: 'Gestión de Inventario', description: 'Administrá tus productos fácil' },
  { icon: Truck, title: 'Envíos Integrados', description: 'Acuerdos con paqueterías' },
  { icon: Shield, title: 'Pagos Seguros', description: 'Protección contra fraudes' },
  { icon: Star, title: 'Soporte 24/7', description: 'Equipo siempre disponible' },
];

export function SellerRegister() {
  const navigate = useNavigate();
  const { addToast } = useUIStore();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    rfc: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'México',
    website: '',
    description: '',
    category: '',
    agreeTerms: false
  });

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addToast({
      type: 'success',
      title: 'Solicitud Enviada',
      message: 'Tu solicitud para ser vendedor ha sido enviada. Te contactaremos en 24-48 horas.',
    });
    
    setIsSubmitting(false);
    setStep(3);
  };

  const canProceed = () => {
    if (step === 1) {
      return formData.firstName && formData.lastName && formData.email && formData.phone;
    }
    if (step === 2) {
      return formData.companyName && formData.rfc && formData.address && formData.category;
    }
    if (step === 3) {
      return formData.agreeTerms;
    }
    return true;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-violet-800 rounded-xl flex items-center justify-center">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">MarketHub</span>
          </Link>
          <Link to="/login" className="text-sm text-gray-600 hover:text-violet-600">
            ¿Ya tienes cuenta? Iniciar sesión
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress */}
        {step < 3 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Paso {step} de 3</span>
              <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}%</span>
            </div>
            <Progress value={(step / 3) * 100} className="h-2" />
          </div>
        )}

        {step === 1 && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Información Personal
              </CardTitle>
              <CardDescription>Ingresa tus datos personales</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Nombre(s)</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => updateFormData('firstName', e.target.value)}
                    placeholder="Juan"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Apellido(s)</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => updateFormData('lastName', e.target.value)}
                    placeholder="Pérez"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="juan@empresa.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="+52 55 1234 5678"
                    className="mt-1"
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4">
                <Button onClick={() => setStep(2)} disabled={!canProceed()} className="bg-violet-600 hover:bg-violet-700">
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                Información de la Empresa
              </CardTitle>
              <CardDescription>Detalles de tu negocio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="companyName">Nombre de la Empresa</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => updateFormData('companyName', e.target.value)}
                    placeholder="Mi Tienda S.A. de C.V."
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="rfc">RFC</Label>
                  <Input
                    id="rfc"
                    value={formData.rfc}
                    onChange={(e) => updateFormData('rfc', e.target.value.toUpperCase())}
                    placeholder="XAXX010101000"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="category">Categoría del Negocio</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => updateFormData('category', e.target.value)}
                  className="mt-1 w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500"
                >
                  <option value="">Selecciona una categoría</option>
                  {businessCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="address">Dirección Fiscal</Label>
                <Input
                  id="address"
                  value={formData.address}
                  onChange={(e) => updateFormData('address', e.target.value)}
                  placeholder="Calle, Número, Colonia"
                  className="mt-1"
                />
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">Ciudad</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => updateFormData('city', e.target.value)}
                    placeholder="Ciudad de México"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="state">Estado</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => updateFormData('state', e.target.value)}
                    placeholder="CDMX"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode">Código Postal</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => updateFormData('zipCode', e.target.value)}
                    placeholder="01000"
                    className="mt-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="website">Sitio Web (opcional)</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => updateFormData('website', e.target.value)}
                  placeholder="https://mitienda.com"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="description">Descripción del Negocio</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => updateFormData('description', e.target.value)}
                  placeholder="Cuéntanos sobre tu negocio y los productos que vendrás..."
                  className="mt-1"
                  rows={4}
                />
              </div>
              <div className="flex justify-between pt-4">
                <Button variant="outline" onClick={() => setStep(1)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Anterior
                </Button>
                <Button onClick={() => setStep(3)} disabled={!canProceed()} className="bg-violet-600 hover:bg-violet-700">
                  Siguiente
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <div className="space-y-6">
            {formData.companyName && formData.firstName ? (
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    Solicitud Enviada
                  </CardTitle>
                  <CardDescription>Resumen de tu solicitud</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-green-800 mb-2">¡Solicitud Enviada!</h3>
                    <p className="text-green-700">
                      Gracias {formData.firstName}, tu solicitud para convertirte en vendedor ha sido enviada exitosamente.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Nombre</p>
                      <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{formData.email}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">Empresa</p>
                      <p className="font-medium">{formData.companyName}</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm text-gray-500">RFC</p>
                      <p className="font-medium">{formData.rfc}</p>
                    </div>
                  </div>

                  <div className="border-t pt-6">
                    <h4 className="font-semibold mb-4">Próximos Pasos</h4>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 text-sm font-bold">1</div>
                        <p className="text-gray-600">Revisaremos tu solicitud en 24-48 horas hábiles</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 text-sm font-bold">2</div>
                        <p className="text-gray-600">Te enviaremos un email con los resultados</p>
                      </li>
                      <li className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-violet-100 rounded-full flex items-center justify-center text-violet-600 text-sm font-bold">3</div>
                        <p className="text-gray-600">Una aprobado, podrás comenzar a publicar productos</p>
                      </li>
                    </ul>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => navigate('/')} className="flex-1">
                      Volver al Inicio
                    </Button>
                    <Button onClick={() => navigate('/login')} className="flex-1 bg-violet-600 hover:bg-violet-700">
                      Ir a Mi Cuenta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-0 shadow-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Términos y Condiciones
                  </CardTitle>
                  <CardDescription>Lee y acepta los términos para continuar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                    <h4 className="font-semibold mb-2">Términos y Condiciones para Vendedores</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Al registrarte como vendedor en MarketHub, aceptas los siguientes términos:
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2 list-disc pl-4">
                      <li>Proveer productos legales y auténticos</li>
                      <li>Mantener inventario suficiente para tus productos</li>
                      <li>Procesar pedidos dentro de 48 horas</li>
                      <li>Aceptar devoluciones según la política de MarketHub</li>
                      <li>Pagar las comisiones acordadas por cada venta</li>
                      <li>Mantener información de contacto actualizada</li>
                      <li>No realizar actividades fraudulentas</li>
                    </ul>
                  </div>

                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="agreeTerms"
                      checked={formData.agreeTerms}
                      onCheckedChange={(checked) => updateFormData('agreeTerms', checked as boolean)}
                    />
                    <Label htmlFor="agreeTerms" className="text-sm cursor-pointer">
                      Acepto los términos y condiciones y la política de privacidad
                    </Label>
                  </div>

                  <div className="flex justify-between pt-4">
                    <Button variant="outline" onClick={() => setStep(2)}>
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Anterior
                    </Button>
                    <Button 
                      onClick={handleSubmit} 
                      disabled={!canProceed() || isSubmitting}
                      className="bg-violet-600 hover:bg-violet-700"
                    >
                      {isSubmitting ? 'Enviando...' : 'Enviar Solicitud'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {step < 3 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">¿Por qué vender en MarketHub?</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                  <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center mb-3">
                    <benefit.icon className="w-5 h-5 text-violet-600" />
                  </div>
                  <h4 className="font-medium text-gray-900">{benefit.title}</h4>
                  <p className="text-sm text-gray-500">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
