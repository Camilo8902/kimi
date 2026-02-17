import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { RotateCcw, CheckCircle, XCircle, Clock, Package, Truck, CreditCard, HelpCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const steps = [
  {
    icon: Package,
    title: '1. Inicia la Devolución',
    description: 'Ve a tu historial de pedidos y selecciona el pedido que deseas devolver.'
  },
  {
    icon: CheckCircle,
    title: '2. Selecciona Productos',
    description: 'Elige los productos que deseas devolver y el motivo de la devolución.'
  },
  {
    icon: Truck,
    title: '3. Envía el Paquete',
    description: 'Empaqueta los productos e imprime la etiqueta de envío proporcionada.'
  },
  {
    icon: CreditCard,
    title: '4. Recibe tu Reembolso',
    description: 'Una vez recibido y verificado, procesaremos tu reembolso en 5-10 días hábiles.'
  }
];

const conditions = [
  {
    icon: CheckCircle,
    title: 'Aceptamos devoluciones de:',
    items: [
      'Productos en su estado original',
      'Con todas las etiquetas y empaques',
      'Dentro de los 30 días de la entrega',
      'Productos defectuosos o dañados',
      'Productos incorrectos recibidos'
    ]
  },
  {
    icon: XCircle,
    title: 'No aceptamos devoluciones de:',
    items: [
      'Productos personalizados o hechos a medida',
      'Productos de higiene personal usados',
      'Productos perecederos',
      'Tarjetas de regalo',
      'Productos sin empaque original'
    ]
  }
];

const faqs = [
  {
    question: '¿Cuánto tiempo tengo para devolver un producto?',
    answer: 'Tienes 30 días desde la fecha de entrega para iniciar una devolución.'
  },
  {
    question: '¿Quién paga el envío de la devolución?',
    answer: 'Si el producto es defectuoso o incorrecto, nosotros cubrimos el envío. Para devoluciones por cambio de opinión, el costo es responsabilidad del cliente.'
  },
  {
    question: '¿Cuándo recibiré mi reembolso?',
    answer: 'Los reembolsos se procesan dentro de 5-10 días hábiles después de recibir y verificar el producto devuelto.'
  },
  {
    question: '¿Puedo cambiar un producto por otro?',
    answer: 'Actualmente no ofrecemos cambios directos. Debes devolver el producto y realizar una nueva compra.'
  }
];

export function Returns() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <RotateCcw className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Devoluciones
            </h1>
            <p className="text-violet-100 text-lg mb-8">
              Devoluciones fáciles y sin complicaciones
            </p>
            <Button asChild className="bg-white text-violet-600 hover:bg-gray-100">
              <Link to="/orders">Iniciar una Devolución</Link>
            </Button>
          </div>
        </section>

        {/* Policy Highlights */}
        <section className="py-12 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-3 gap-6">
              <Card className="border-0 shadow-sm text-center">
                <CardContent className="p-6">
                  <Clock className="w-10 h-10 text-violet-600 mx-auto mb-3" />
                  <p className="font-bold text-2xl mb-1">30 Días</p>
                  <p className="text-gray-600 text-sm">Para devolver</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm text-center">
                <CardContent className="p-6">
                  <Truck className="w-10 h-10 text-violet-600 mx-auto mb-3" />
                  <p className="font-bold text-2xl mb-1">Gratis</p>
                  <p className="text-gray-600 text-sm">Envío de devolución*</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-sm text-center">
                <CardContent className="p-6">
                  <CreditCard className="w-10 h-10 text-violet-600 mx-auto mb-3" />
                  <p className="font-bold text-2xl mb-1">5-10 Días</p>
                  <p className="text-gray-600 text-sm">Para reembolso</p>
                </CardContent>
              </Card>
            </div>
            <p className="text-center text-sm text-gray-500 mt-4">
              *Envío gratis en productos defectuosos o incorrectos
            </p>
          </div>
        </section>

        {/* How to Return */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Cómo Devolver un Producto</h2>
              <p className="text-gray-600">
                Sigue estos simples pasos para realizar tu devolución
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, index) => (
                <Card key={index} className="border-0 shadow-sm text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <step.icon className="w-7 h-7 text-violet-600" />
                    </div>
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Conditions */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Condiciones de Devolución</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {conditions.map((condition, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <condition.icon className={`w-6 h-6 ${index === 0 ? 'text-green-500' : 'text-red-500'}`} />
                      <h3 className="font-bold text-lg">{condition.title}</h3>
                    </div>
                    <ul className="space-y-2">
                      {condition.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-600">
                          <span className="mt-1.5 w-1.5 h-1.5 bg-gray-400 rounded-full flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Preguntas Frecuentes</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <h3 className="font-bold text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-violet-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h2 className="text-3xl font-bold mb-4">¿Tienes más preguntas?</h2>
            <p className="text-violet-100 mb-8">
              Nuestro equipo de soporte está disponible para ayudarte con tu devolución
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
