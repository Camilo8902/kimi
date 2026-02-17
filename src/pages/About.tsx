import { Link } from 'react-router-dom';
import { 
  ShoppingBag, 
  Users, 
  Store, 
  Shield, 
  Truck, 
  Heart,
  Target,
  Eye,
  Award
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const stats = [
  { value: '1M+', label: 'Clientes Satisfechos', icon: Users },
  { value: '10K+', label: 'Vendedores', icon: Store },
  { value: '50K+', label: 'Productos', icon: ShoppingBag },
  { value: '99.9%', label: 'Satisfacción', icon: Heart },
];

const values = [
  {
    icon: Shield,
    title: 'Confianza',
    description: 'Todos nuestros vendedores son verificados y cada transacción está protegida.',
  },
  {
    icon: Target,
    title: 'Calidad',
    description: 'Seleccionamos cuidadosamente cada producto para garantizar la mejor calidad.',
  },
  {
    icon: Truck,
    title: 'Rapidez',
    description: 'Envíos rápidos y seguros a cualquier parte del país.',
  },
  {
    icon: Award,
    title: 'Excelencia',
    description: 'Nos esforzamos por ofrecer la mejor experiencia de compra online.',
  },
];

const team = [
  { name: 'Carlos Rodríguez', role: 'CEO & Fundador', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop' },
  { name: 'Ana Martínez', role: 'Directora de Operaciones', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop' },
  { name: 'Miguel Sánchez', role: 'CTO', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop' },
  { name: 'Laura Gómez', role: 'Directora de Marketing', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop' },
];

export function About() {
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
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Sobre MarketHub
            </h1>
            <p className="text-xl text-violet-100 max-w-2xl mx-auto">
              Conectamos compradores con los mejores vendedores para crear 
              experiencias de compra excepcionales.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="border-0 shadow-sm text-center">
                  <CardContent className="p-6">
                    <stat.icon className="w-10 h-10 text-violet-600 mx-auto mb-4" />
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Target className="w-8 h-8 text-violet-600" />
                  <h2 className="text-3xl font-bold">Nuestra Misión</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Democratizar el comercio electrónico creando un marketplace inclusivo 
                  donde cualquier persona pueda comprar y vender productos de calidad 
                  de manera segura, rápida y confiable.
                </p>
                
                <div className="flex items-center gap-3 mb-4">
                  <Eye className="w-8 h-8 text-violet-600" />
                  <h2 className="text-3xl font-bold">Nuestra Visión</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed">
                  Ser el marketplace líder en Latinoamérica, reconocido por nuestra 
                  innovación, confiabilidad y compromiso con la satisfacción del cliente 
                  y el éxito de nuestros vendedores.
                </p>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop"
                  alt="Nuestro equipo"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Los principios que guían cada decisión que tomamos
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-violet-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-gray-600 text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nuestro Equipo</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Las personas detrás de MarketHub
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-bold">{member.name}</h3>
                  <p className="text-gray-600">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-violet-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Quieres ser parte de MarketHub?</h2>
            <p className="text-violet-100 mb-8">
              Únete a miles de vendedores que ya confían en nosotros para hacer crecer su negocio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-violet-600 hover:bg-gray-100">
                <Link to="/seller/register">Vender en MarketHub</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link to="/contact">Contactar Ventas</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
