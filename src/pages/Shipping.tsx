import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Truck, Clock, MapPin, Package, Globe, Calculator, CheckCircle, AlertCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const shippingOptions = [
  {
    name: 'Estándar',
    time: '5-7 días hábiles',
    cost: 'Gratis en compras +$50',
    icon: Package
  },
  {
    name: 'Express',
    time: '2-3 días hábiles',
    cost: '$9.99',
    icon: Truck
  },
  {
    name: 'Same Day',
    time: 'Mismo día',
    cost: '$19.99',
    icon: Clock
  }
];

const coverage = [
  { region: 'Ciudad de México', standard: '2-3 días', express: '1 día' },
  { region: 'Área Metropolitana', standard: '3-4 días', express: '1-2 días' },
  { region: 'Centro del País', standard: '4-5 días', express: '2-3 días' },
  { region: 'Norte del País', standard: '5-7 días', express: '2-3 días' },
  { region: 'Sur del País', standard: '5-7 días', express: '2-3 días' },
  { region: 'Internacional', standard: '10-15 días', express: '5-7 días' }
];

const features = [
  {
    icon: MapPin,
    title: 'Seguimiento en Tiempo Real',
    description: 'Rastrea tu pedido en cada etapa del envío'
  },
  {
    icon: CheckCircle,
    title: 'Entrega Garantizada',
    description: 'Compromiso de entrega o te devolvemos el envío'
  },
  {
    icon: Globe,
    title: 'Cobertura Nacional',
    description: 'Enviamos a cualquier parte del país'
  },
  {
    icon: Package,
    title: 'Empaque Seguro',
    description: 'Todos los productos protegidos durante el envío'
  }
];

export function Shipping() {
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
            <Truck className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Envíos
            </h1>
            <p className="text-violet-100 text-lg mb-8">
              Opciones de envío flexibles para tus necesidades
            </p>
            <Button asChild className="bg-white text-violet-600 hover:bg-gray-100">
              <Link to="/products">Seguir Comprando</Link>
            </Button>
          </div>
        </section>

        {/* Shipping Options */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Opciones de Envío</h2>
              <p className="text-gray-600">
                Elige la opción que mejor se adapte a tus necesidades
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {shippingOptions.map((option, index) => (
                <Card key={index} className="border-0 shadow-sm text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <option.icon className="w-7 h-7 text-violet-600" />
                    </div>
                    <h3 className="font-bold text-xl mb-2">{option.name}</h3>
                    <p className="text-violet-600 font-medium mb-1">{option.time}</p>
                    <p className="text-gray-600 text-sm">{option.cost}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Coverage */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Cobertura y Tiempos</h2>
            <Card className="border-0 shadow-sm overflow-hidden">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-violet-50">
                      <tr>
                        <th className="text-left p-4 font-bold text-gray-900">Región</th>
                        <th className="text-center p-4 font-bold text-gray-900">Envío Estándar</th>
                        <th className="text-center p-4 font-bold text-gray-900">Envío Express</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coverage.map((item, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-4">{item.region}</td>
                          <td className="p-4 text-center text-gray-600">{item.standard}</td>
                          <td className="p-4 text-center text-gray-600">{item.express}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Features */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Características de Envío</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="border-0 shadow-sm text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-7 h-7 text-violet-600" />
                    </div>
                    <h3 className="font-bold mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Info */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Calculator className="w-6 h-6 text-violet-600" />
                    <h3 className="font-bold text-lg">Cálculo de Envío</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    El costo de envío se calcula automáticamente al finalizar la compra 
                    según tu ubicación y el peso de los productos.
                  </p>
                  <p className="text-gray-600">
                    Envío gratis en compras mayores a $50 con opción estándar.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <AlertCircle className="w-6 h-6 text-violet-600" />
                    <h3 className="font-bold text-lg">Información Importante</h3>
                  </div>
                  <ul className="space-y-2 text-gray-600">
                    <li>• Los tiempos son estimados y pueden variar</li>
                    <li>• No incluyen días festivos ni fines de semana</li>
                    <li>• Requiere firma de recepción</li>
                    <li>• Se notificará antes de la entrega</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-violet-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Preguntas sobre envíos?</h2>
            <p className="text-violet-100 mb-8">
              Consulta nuestro centro de ayuda o contacta a nuestro equipo de soporte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-white text-violet-600 hover:bg-gray-100">
                <Link to="/help">Centro de Ayuda</Link>
              </Button>
              <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">Contactar Soporte</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
