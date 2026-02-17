import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Newspaper, Download, ExternalLink, Calendar, User, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const pressReleases = [
  {
    title: 'MarketHub Alcanza el Millón de Usuarios Activos',
    date: '15 de Enero, 2025',
    excerpt: 'La plataforma de comercio electrónico celebra un hito importante en su crecimiento...',
    category: 'Empresa'
  },
  {
    title: 'Lanzamiento de Nuevas Herramientas para Vendedores',
    date: '10 de Enero, 2025',
    excerpt: 'MarketHub introduce nuevas funcionalidades para ayudar a los vendedores a gestionar sus negocios...',
    category: 'Producto'
  },
  {
    title: 'Expansión a Nuevos Mercados Latinoamericanos',
    date: '5 de Enero, 2025',
    excerpt: 'La empresa anuncia planes de expansión a Colombia y Chile durante el próximo trimestre...',
    category: 'Expansión'
  },
  {
    title: 'Alianza Estratégica con Proveedores Logísticos',
    date: '20 de Diciembre, 2024',
    excerpt: 'Nueva colaboración para mejorar los tiempos de entrega en todo el país...',
    category: 'Alianza'
  }
];

const mediaCoverage = [
  {
    outlet: 'TechCrunch',
    title: 'MarketHub: El Marketplace que Revoluciona el E-commerce en LATAM',
    date: '12 de Enero, 2025',
    link: '#'
  },
  {
    outlet: 'Forbes México',
    title: 'Los 10 Startups Mexicanos más Prometedores de 2025',
    date: '8 de Enero, 2025',
    link: '#'
  },
  {
    outlet: 'El Economista',
    title: 'E-commerce en México: Tendencias y Oportunidades',
    date: '3 de Enero, 2025',
    link: '#'
  }
];

const resources = [
  {
    title: 'Kit de Prensa',
    description: 'Logos, imágenes de marca y recursos visuales oficiales.',
    icon: Download
  },
  {
    title: 'Fact Sheet',
    description: 'Información clave sobre la empresa, métricas y datos.',
    icon: ExternalLink
  },
  {
    title: 'Biografías del Equipo',
    description: 'Perfiles de los fundadores y equipo directivo.',
    icon: User
  }
];

export function Press() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Newspaper className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Sala de Prensa
            </h1>
            <p className="text-xl text-violet-100 max-w-2xl mx-auto">
              Noticias, comunicados de prensa y recursos para medios de comunicación.
            </p>
          </div>
        </section>

        {/* Press Releases */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold">Comunicados de Prensa</h2>
              <Button variant="outline">Ver Todos</Button>
            </div>
            <div className="space-y-6">
              {pressReleases.map((release, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge>{release.category}</Badge>
                      <span className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        {release.date}
                      </span>
                    </div>
                    <h3 className="font-bold text-xl mb-2">{release.title}</h3>
                    <p className="text-gray-600 mb-4">{release.excerpt}</p>
                    <Button variant="link" className="p-0 h-auto">
                      Leer más
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Media Coverage */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">MarketHub en los Medios</h2>
            <div className="space-y-4">
              {mediaCoverage.map((article, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <p className="text-sm text-violet-600 font-medium mb-1">{article.outlet}</p>
                        <h3 className="font-bold text-lg">{article.title}</h3>
                        <p className="text-sm text-gray-500">{article.date}</p>
                      </div>
                      <Button variant="outline" size="sm" className="shrink-0">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Leer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8 text-center">Recursos para Medios</h2>
            <div className="grid sm:grid-cols-3 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="border-0 shadow-sm text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <resource.icon className="w-7 h-7 text-violet-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <Button variant="outline" size="sm">Descargar</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-20 bg-violet-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Contacto para Prensa</h2>
            <p className="text-violet-100 mb-8">
              Para consultas de medios, entrevistas o solicitudes de información, 
              contacta a nuestro equipo de relaciones públicas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-violet-600 hover:bg-gray-100">
                <a href="mailto:press@markethub.com">press@markethub.com</a>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="tel:+15551234567">+1 (555) 123-4567 ext. 3</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
