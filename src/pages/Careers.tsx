import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Briefcase, Users, Heart, Zap, Globe, Coffee, GraduationCap, ArrowRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const benefits = [
  {
    icon: Heart,
    title: 'Salud y Bienestar',
    description: 'Seguro médico premium, dental y de visión para ti y tu familia.'
  },
  {
    icon: Coffee,
    title: 'Balance Vida-Trabajo',
    description: 'Horario flexible, trabajo remoto y vacaciones ilimitadas.'
  },
  {
    icon: GraduationCap,
    title: 'Desarrollo Profesional',
    description: 'Presupuesto anual para capacitación, conferencias y cursos.'
  },
  {
    icon: Zap,
    title: 'Equipo de Última Generación',
    description: 'Te proporcionamos el mejor equipo tecnológico para tu trabajo.'
  },
  {
    icon: Globe,
    title: 'Ambiente Global',
    description: 'Trabaja con equipos diversos de todo el mundo.'
  },
  {
    icon: Users,
    title: 'Cultura Inclusiva',
    description: 'Un ambiente de trabajo donde todos son bienvenidos y valorados.'
  }
];

const openings = [
  {
    title: 'Senior Frontend Developer',
    department: 'Ingeniería',
    location: 'Remoto',
    type: 'Tiempo completo'
  },
  {
    title: 'Product Manager',
    department: 'Producto',
    location: 'Ciudad de México',
    type: 'Tiempo completo'
  },
  {
    title: 'UX/UI Designer',
    department: 'Diseño',
    location: 'Remoto',
    type: 'Tiempo completo'
  },
  {
    title: 'Data Analyst',
    department: 'Análisis',
    location: 'Remoto',
    type: 'Tiempo completo'
  },
  {
    title: 'Customer Success Manager',
    department: 'Soporte',
    location: 'Ciudad de México',
    type: 'Tiempo completo'
  },
  {
    title: 'Marketing Specialist',
    department: 'Marketing',
    location: 'Remoto',
    type: 'Tiempo completo'
  }
];

const values = [
  {
    title: 'Innovación',
    description: 'Buscamos constantemente nuevas formas de mejorar y crecer.'
  },
  {
    title: 'Colaboración',
    description: 'Trabajamos juntos para lograr objetivos comunes.'
  },
  {
    title: 'Excelencia',
    description: 'Nos esforzamos por ofrecer lo mejor en todo lo que hacemos.'
  },
  {
    title: 'Integridad',
    description: 'Actuamos con honestidad y transparencia en todo momento.'
  }
];

export function Careers() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        {/* Hero */}
        <section className="relative py-20 bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-purple-400 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Briefcase className="w-16 h-16 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Únete a Nuestro Equipo
            </h1>
            <p className="text-xl text-violet-100 max-w-2xl mx-auto mb-8">
              Ayúdanos a construir el futuro del comercio electrónico en Latinoamérica. 
              Buscamos personas apasionadas que quieran hacer la diferencia.
            </p>
            <Button asChild size="lg" className="bg-white text-violet-600 hover:bg-gray-100">
              <a href="#openings">Ver Vacantes</a>
            </Button>
          </div>
        </section>

        {/* Benefits */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Beneficios</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Ofrecemos un paquete de beneficios competitivo para apoyar tu bienestar y desarrollo
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-7 h-7 text-violet-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{benefit.title}</h3>
                    <p className="text-gray-600 text-sm">{benefit.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Los principios que guían nuestra cultura y forma de trabajo
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Job Openings */}
        <section id="openings" className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Vacantes Abiertas</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Explora las oportunidades disponibles y encuentra tu próximo rol
              </p>
            </div>
            <div className="space-y-4">
              {openings.map((job, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h3 className="font-bold text-lg mb-1">{job.title}</h3>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="secondary">{job.department}</Badge>
                          <Badge variant="outline">{job.location}</Badge>
                          <Badge variant="outline">{job.type}</Badge>
                        </div>
                      </div>
                      <Button variant="outline" className="shrink-0">
                        Aplicar
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-violet-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">¿No encuentras la vacante perfecta?</h2>
            <p className="text-violet-100 mb-8">
              Estamos siempre buscando talento excepcional. Envíanos tu CV y te contactaremos 
              cuando haya una oportunidad adecuada.
            </p>
            <Button asChild size="lg" className="bg-white text-violet-600 hover:bg-gray-100">
              <a href="mailto:careers@markethub.com">Enviar CV Espontáneo</a>
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
