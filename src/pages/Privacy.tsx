import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Shield, Eye, Database, Share2, Lock, Cookie, UserX, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const sections = [
  {
    icon: Eye,
    title: 'Información que Recopilamos',
    content: `Recopilamos información personal que nos proporcionas directamente, incluyendo: nombre, dirección de correo electrónico, dirección postal, número de teléfono, información de pago y detalles de pedidos. También recopilamos información automáticamente sobre tu uso de la plataforma, como dirección IP, tipo de navegador y páginas visitadas.`
  },
  {
    icon: Database,
    title: 'Uso de la Información',
    content: `Utilizamos tu información personal para: procesar pedidos y pagos, proporcionar soporte al cliente, enviar actualizaciones y promociones (con tu consentimiento), mejorar nuestros servicios, prevenir fraudes y cumplir con obligaciones legales. No vendemos tu información personal a terceros.`
  },
  {
    icon: Share2,
    title: 'Compartir Información',
    content: `Podemos compartir tu información con: proveedores de servicios que nos ayudan a operar la plataforma, vendedores cuando realizas una compra, autoridades legales cuando sea requerido por ley, y socios de marketing (solo con tu consentimiento explícito). Todos los terceros están obligados a proteger tu información.`
  },
  {
    icon: Lock,
    title: 'Seguridad de Datos',
    content: `Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal, incluyendo encriptación SSL, firewalls, controles de acceso y auditorías regulares. Sin embargo, ningún sistema es completamente seguro y no podemos garantizar la seguridad absoluta de tus datos.`
  },
  {
    icon: Cookie,
    title: 'Cookies y Tecnologías Similares',
    content: `Utilizamos cookies y tecnologías similares para mejorar tu experiencia, recordar tus preferencias, analizar el uso de la plataforma y personalizar contenido. Puedes controlar las cookies a través de la configuración de tu navegador, pero algunas funciones pueden no funcionar correctamente si las desactivas.`
  },
  {
    icon: UserX,
    title: 'Tus Derechos',
    content: `Tienes derecho a: acceder a tu información personal, corregir datos inexactos, solicitar la eliminación de tus datos, oponerte al procesamiento, solicitar la portabilidad de datos y retirar tu consentimiento. Para ejercer estos derechos, contacta a nuestro equipo de privacidad.`
  }
];

export function Privacy() {
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
            <Shield className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Política de Privacidad
            </h1>
            <p className="text-violet-100 text-lg">
              Tu privacidad es importante para nosotros
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                En MarketHub, nos tomamos muy en serio la protección de tu información personal. 
                Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y 
                protegemos tu información cuando utilizas nuestra plataforma.
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
                            {section.title}
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

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-violet-600" />
                    Contacto de Privacidad
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Para preguntas sobre privacidad o para ejercer tus derechos:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li>Email: privacy@markethub.com</li>
                    <li>Teléfono: +1 (555) 123-4567 ext. 2</li>
                  </ul>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    Retención de Datos
                  </h3>
                  <p className="text-gray-600">
                    Conservamos tu información personal solo durante el tiempo necesario 
                    para cumplir con los propósitos descritos en esta política, a menos 
                    que se requiera o permita un período de retención más largo por ley.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-sm text-gray-500">
                <p>
                  Esta política puede actualizarse periódicamente. Te notificaremos de 
                  cambios significativos a través de nuestro sitio web o por correo electrónico.
                </p>
                <p className="mt-2">
                  Última actualización: Enero 2025
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
