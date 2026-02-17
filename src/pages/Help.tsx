import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HelpCircle, Search, MessageCircle, Phone, Mail, Book, Truck, CreditCard, User, Package, ChevronDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';

const categories = [
  {
    icon: User,
    title: 'Cuenta y Perfil',
    description: 'Gestiona tu cuenta, contraseña y preferencias',
    articles: ['Cómo crear una cuenta', 'Restablecer contraseña', 'Actualizar información', 'Eliminar cuenta']
  },
  {
    icon: Package,
    title: 'Pedidos',
    description: 'Seguimiento, cancelaciones y modificaciones',
    articles: ['Seguir mi pedido', 'Cancelar un pedido', 'Modificar dirección', 'Problemas con pedido']
  },
  {
    icon: Truck,
    title: 'Envíos',
    description: 'Información sobre envíos y entregas',
    articles: ['Tiempos de entrega', 'Costos de envío', 'Envíos internacionales', 'No recibí mi pedido']
  },
  {
    icon: CreditCard,
    title: 'Pagos',
    description: 'Métodos de pago y facturación',
    articles: ['Métodos de pago aceptados', 'Problemas con pago', 'Solicitar factura', 'Reembolsos']
  },
  {
    icon: Package,
    title: 'Devoluciones',
    description: 'Políticas y proceso de devoluciones',
    articles: ['Política de devoluciones', 'Cómo devolver un producto', 'Estado de reembolso', 'Garantías']
  },
  {
    icon: Book,
    title: 'Vendedores',
    description: 'Información para vendedores',
    articles: ['Cómo vender', 'Comisiones y tarifas', 'Gestionar productos', 'Retirar fondos']
  }
];

const popularArticles = [
  { title: '¿Cómo rastreo mi pedido?', category: 'Pedidos' },
  { title: '¿Cuál es la política de devoluciones?', category: 'Devoluciones' },
  { title: '¿Cómo cambio mi dirección de envío?', category: 'Envíos' },
  { title: '¿Qué métodos de pago aceptan?', category: 'Pagos' },
  { title: '¿Cómo contacto a un vendedor?', category: 'Pedidos' },
  { title: '¿Cómo me convierto en vendedor?', category: 'Vendedores' }
];

const contactMethods = [
  {
    icon: MessageCircle,
    title: 'Chat en Vivo',
    description: 'Habla con un agente en tiempo real',
    action: 'Iniciar Chat',
    available: 'Disponible 24/7'
  },
  {
    icon: Mail,
    title: 'Correo Electrónico',
    description: 'Respuesta en 24-48 horas',
    action: 'Enviar Email',
    available: 'soporte@markethub.com'
  },
  {
    icon: Phone,
    title: 'Teléfono',
    description: 'Soporte telefónico personalizado',
    action: 'Llamar',
    available: '+1 (555) 123-4567'
  }
];

export function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HelpCircle className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Centro de Ayuda
            </h1>
            <p className="text-violet-100 text-lg mb-8">
              ¿En qué podemos ayudarte hoy?
            </p>
            <div className="max-w-xl mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar artículos de ayuda..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 bg-white text-gray-900 placeholder:text-gray-400"
              />
            </div>
          </div>
        </section>

        {/* Popular Articles */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl font-bold mb-6">Artículos Populares</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {popularArticles.map((article, index) => (
                <Link key={index} to="#" className="block">
                  <Card className="border-0 shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <p className="text-sm text-violet-600 mb-1">{article.category}</p>
                      <p className="font-medium text-gray-900">{article.title}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">Categorías de Ayuda</h2>
            <div className="space-y-4">
              {categories.map((category, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-0">
                    <button
                      onClick={() => setExpandedCategory(expandedCategory === index ? null : index)}
                      className="w-full p-6 flex items-center justify-between text-left"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center">
                          <category.icon className="w-6 h-6 text-violet-600" />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{category.title}</h3>
                          <p className="text-gray-600 text-sm">{category.description}</p>
                        </div>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expandedCategory === index ? 'rotate-180' : ''}`} />
                    </button>
                    {expandedCategory === index && (
                      <div className="px-6 pb-6">
                        <div className="pl-16 space-y-2">
                          {category.articles.map((article, i) => (
                            <Link
                              key={i}
                              to="#"
                              className="block py-2 text-gray-600 hover:text-violet-600 transition-colors"
                            >
                              {article}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">¿Necesitas más ayuda?</h2>
              <p className="text-gray-600">
                Nuestro equipo de soporte está listo para ayudarte
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {contactMethods.map((method, index) => (
                <Card key={index} className="border-0 shadow-sm text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <method.icon className="w-7 h-7 text-violet-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{method.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{method.description}</p>
                    <p className="text-sm text-violet-600 mb-4">{method.available}</p>
                    <Button variant="outline" size="sm">{method.action}</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
