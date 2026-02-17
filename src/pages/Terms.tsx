import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ScrollText, UserCheck, ShoppingCart, CreditCard, Truck, RotateCcw, Shield, Ban, Scale } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const sections = [
  {
    icon: ScrollText,
    title: 'Aceptación de Términos',
    content: `Al acceder y utilizar MarketHub, aceptas estar legalmente obligado por estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, no podrás utilizar nuestros servicios. Estos términos constituyen un acuerdo legalmente vinculante entre tú y MarketHub.`
  },
  {
    icon: UserCheck,
    title: 'Registro de Cuenta',
    content: `Para utilizar ciertas funciones de MarketHub, debes registrarte y crear una cuenta. Eres responsable de mantener la confidencialidad de tu contraseña y de todas las actividades que ocurran bajo tu cuenta. Debes proporcionar información precisa, actual y completa durante el proceso de registro.`
  },
  {
    icon: ShoppingCart,
    title: 'Compras y Pedidos',
    content: `Al realizar una compra, aceptas proporcionar información válida y precisa. Todos los pedidos están sujetos a disponibilidad y confirmación del precio. Nos reservamos el derecho de rechazar cualquier pedido por cualquier motivo, incluyendo sospechas de fraude o actividad ilegal.`
  },
  {
    icon: CreditCard,
    title: 'Pagos y Facturación',
    content: `Aceptamos diversos métodos de pago incluyendo tarjetas de crédito/débito y pagos electrónicos. Todos los pagos se procesan de forma segura a través de nuestros proveedores de pago certificados. Los precios pueden cambiar sin previo aviso, pero los cambios no afectarán pedidos ya confirmados.`
  },
  {
    icon: Truck,
    title: 'Envíos y Entregas',
    content: `Los tiempos de envío son estimados y pueden variar según la ubicación y disponibilidad del producto. No somos responsables por retrasos causados por circunstancias fuera de nuestro control. El riesgo de pérdida y título de los productos se transfieren al comprador al momento de la entrega.`
  },
  {
    icon: RotateCcw,
    title: 'Devoluciones y Reembolsos',
    content: `Aceptamos devoluciones dentro de los 30 días posteriores a la entrega para la mayoría de los productos. Los productos deben estar en su estado original con todas las etiquetas y empaques. Los reembolsos se procesarán dentro de 5-10 días hábiles después de recibir el producto devuelto.`
  },
  {
    icon: Shield,
    title: 'Propiedad Intelectual',
    content: `Todo el contenido de MarketHub, incluyendo logos, marcas, textos, imágenes y software, está protegido por derechos de autor y otras leyes de propiedad intelectual. No puedes utilizar, reproducir o distribuir ningún contenido sin nuestro permiso expreso por escrito.`
  },
  {
    icon: Ban,
    title: 'Prohibiciones',
    content: `Está prohibido utilizar MarketHub para actividades ilegales, fraudulentas o no autorizadas. No puedes publicar contenido ofensivo, difamatorio o que infrinja derechos de terceros. Nos reservamos el derecho de suspender o terminar cuentas que violen estas prohibiciones.`
  },
  {
    icon: Scale,
    title: 'Limitación de Responsabilidad',
    content: `MarketHub no será responsable por daños indirectos, incidentales, especiales o consecuentes. Nuestra responsabilidad total por cualquier reclamo no excederá el monto pagado por el producto o servicio en cuestión. Algunas jurisdicciones no permiten la exclusión de ciertas garantías.`
  }
];

export function Terms() {
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
            <ScrollText className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Términos y Condiciones
            </h1>
            <p className="text-violet-100 text-lg">
              Última actualización: Enero 2025
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Bienvenido a MarketHub. Estos Términos y Condiciones regulan el uso de nuestra plataforma 
                de comercio electrónico. Te recomendamos leerlos detenidamente antes de utilizar nuestros servicios.
              </p>

              <div className="space-y-8">
                {sections.map((section, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <section.icon className="w-6 h-6 text-violet-600" />
                        </div>
                        <div>
                          <h2 className="text-xl font-bold text-gray-900 mb-3">
                            {index + 1}. {section.title}
                          </h2>
                          <p className="text-gray-600 leading-relaxed">
                            {section.content}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator className="my-12" />

              <div className="bg-gray-50 rounded-2xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Contacto
                </h2>
                <p className="text-gray-600 mb-4">
                  Si tienes alguna pregunta sobre estos Términos y Condiciones, puedes contactarnos:
                </p>
                <ul className="space-y-2 text-gray-600">
                  <li>Email: legal@markethub.com</li>
                  <li>Dirección: Av. Reforma 123, Ciudad de México, México</li>
                  <li>Teléfono: +1 (555) 123-4567</li>
                </ul>
              </div>

              <div className="mt-8 text-sm text-gray-500">
                <p>
                  Estos términos están sujetos a cambios. Te notificaremos de cualquier modificación 
                  material a través de nuestro sitio web o por correo electrónico.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
