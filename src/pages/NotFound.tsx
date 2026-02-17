import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { SearchX, Home, ArrowLeft, Package, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const suggestions = [
  {
    icon: Package,
    title: 'Explorar Productos',
    description: 'Descubre nuestra amplia selección de productos',
    link: '/products',
    action: 'Ver Productos'
  },
  {
    icon: HelpCircle,
    title: 'Centro de Ayuda',
    description: 'Encuentra respuestas a tus preguntas',
    link: '/help',
    action: 'Obtener Ayuda'
  }
];

export function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="pt-20">
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              {/* 404 Illustration */}
              <div className="relative mb-8">
                <div className="w-40 h-40 bg-violet-100 rounded-full flex items-center justify-center mx-auto">
                  <SearchX className="w-20 h-20 text-violet-600" />
                </div>
                <div className="absolute -top-2 -right-2 w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-purple-600">404</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                Página No Encontrada
              </h1>
              <p className="text-xl text-gray-600 max-w-lg mx-auto mb-8">
                Lo sentimos, la página que estás buscando no existe o ha sido movida.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="bg-violet-600 hover:bg-violet-700">
                  <Link to="/">
                    <Home className="w-5 h-5 mr-2" />
                    Ir al Inicio
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <button onClick={() => window.history.back()}>
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Volver Atrás
                  </button>
                </Button>
              </div>
            </div>

            {/* Suggestions */}
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {suggestions.map((suggestion, index) => (
                <Card key={index} className="border-0 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="w-14 h-14 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <suggestion.icon className="w-7 h-7 text-violet-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{suggestion.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{suggestion.description}</p>
                    <Button asChild variant="outline" size="sm">
                      <Link to={suggestion.link}>{suggestion.action}</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Search Tip */}
            <div className="mt-12 text-center">
              <p className="text-gray-500">
                ¿Buscas algo específico?{' '}
                <Link to="/products" className="text-violet-600 hover:underline">
                  Explora nuestro catálogo
                </Link>{' '}
                o{' '}
                <Link to="/contact" className="text-violet-600 hover:underline">
                  contáctanos
                </Link>{' '}
                para obtener ayuda.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
