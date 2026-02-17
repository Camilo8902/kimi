import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Cookie, Settings, CheckCircle, XCircle, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const cookieTypes = [
  {
    name: 'Cookies Esenciales',
    description: 'Necesarias para el funcionamiento básico del sitio. No pueden desactivarse.',
    examples: ['Sesión de usuario', 'Carrito de compras', 'Preferencias de seguridad'],
    required: true
  },
  {
    name: 'Cookies de Rendimiento',
    description: 'Nos ayudan a entender cómo interactúan los visitantes con el sitio.',
    examples: ['Google Analytics', 'Contadores de visitas', 'Tiempo en página'],
    required: false
  },
  {
    name: 'Cookies de Funcionalidad',
    description: 'Permiten recordar tus preferencias para personalizar tu experiencia.',
    examples: ['Idioma preferido', 'Ubicación', 'Configuración de visualización'],
    required: false
  },
  {
    name: 'Cookies de Publicidad',
    description: 'Utilizadas para mostrar anuncios relevantes y medir su efectividad.',
    examples: ['Google Ads', 'Facebook Pixel', 'Retargeting'],
    required: false
  }
];

export function Cookies() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-16 bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Cookie className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              Política de Cookies
            </h1>
            <p className="text-violet-100 text-lg">
              Cómo utilizamos cookies para mejorar tu experiencia
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                MarketHub utiliza cookies y tecnologías similares para mejorar tu experiencia 
                de navegación, analizar el tráfico del sitio y personalizar el contenido. 
                Esta política explica qué son las cookies, cómo las usamos y cómo puedes 
                gestionar tus preferencias.
              </p>

              <Card className="border-0 shadow-sm mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Info className="w-6 h-6 text-violet-600" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-3">
                        ¿Qué son las Cookies?
                      </h2>
                      <p className="text-gray-600 leading-relaxed">
                        Las cookies son pequeños archivos de texto que se almacenan en tu 
                        dispositivo cuando visitas un sitio web. Nos permiten recordar tus 
                        preferencias, entender cómo usas nuestro sitio y mejorar tu experiencia 
                        de navegación.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Tipos de Cookies que Utilizamos
              </h2>

              <div className="space-y-6 mb-8">
                {cookieTypes.map((type, index) => (
                  <Card key={index} className="border-0 shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <h3 className="text-lg font-bold text-gray-900">{type.name}</h3>
                        {type.required ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                            <CheckCircle className="w-4 h-4" />
                            Obligatorio
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-3 py-1 bg-violet-100 text-violet-600 text-sm rounded-full">
                            <Settings className="w-4 h-4" />
                            Opcional
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 mb-3">{type.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {type.examples.map((example, i) => (
                          <span key={i} className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-lg">
                            {example}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Separator className="my-12" />

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Settings className="w-5 h-5 text-violet-600" />
                    Gestionar Cookies
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Puedes gestionar tus preferencias de cookies en cualquier momento:
                  </p>
                  <ul className="space-y-2 text-gray-600 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      A través del banner de cookies al visitar el sitio
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      En la configuración de tu navegador
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      Contactando a nuestro equipo de soporte
                    </li>
                  </ul>
                  <Button variant="outline" className="w-full">
                    Configurar Preferencias
                  </Button>
                </div>

                <div className="bg-gray-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-violet-600" />
                    Desactivar Cookies
                  </h3>
                  <p className="text-gray-600 mb-4">
                    La mayoría de los navegadores permiten controlar cookies:
                  </p>
                  <ul className="space-y-2 text-gray-600">
                    <li><strong>Chrome:</strong> Configuración → Privacidad y seguridad</li>
                    <li><strong>Firefox:</strong> Opciones → Privacidad y seguridad</li>
                    <li><strong>Safari:</strong> Preferencias → Privacidad</li>
                    <li><strong>Edge:</strong> Configuración → Cookies y permisos</li>
                  </ul>
                  <p className="text-gray-500 text-sm mt-4">
                    Nota: Desactivar cookies puede afectar la funcionalidad del sitio.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-sm text-gray-500">
                <p>
                  Esta política puede actualizarse. Te notificaremos de cambios significativos.
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
