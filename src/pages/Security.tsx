import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Shield, Lock, Server, CreditCard, UserCheck, AlertTriangle, CheckCircle, FileCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const securityFeatures = [
  {
    icon: Lock,
    title: 'Encriptación SSL/TLS',
    description: 'Toda la información transmitida entre tu navegador y nuestros servidores está protegida con encriptación de 256 bits.'
  },
  {
    icon: CreditCard,
    title: 'Pagos Seguros',
    description: 'Procesamos todos los pagos a través de proveedores certificados PCI DSS. Nunca almacenamos los datos completos de tu tarjeta.'
  },
  {
    icon: Server,
    title: 'Infraestructura Protegida',
    description: 'Nuestros servidores están protegidos con firewalls de última generación y monitoreo 24/7 contra amenazas.'
  },
  {
    icon: UserCheck,
    title: 'Verificación de Identidad',
    description: 'Implementamos autenticación de dos factores y verificación de identidad para proteger tu cuenta.'
  }
];

const certifications = [
  { name: 'PCI DSS', description: 'Cumplimiento de estándares de seguridad de tarjetas de pago' },
  { name: 'ISO 27001', description: 'Certificación de gestión de seguridad de la información' },
  { name: 'GDPR', description: 'Cumplimiento del Reglamento General de Protección de Datos' },
  { name: 'SSL Certificate', description: 'Certificado de seguridad de capa de sockets' }
];

const tips = [
  'Usa contraseñas fuertes y únicas para tu cuenta',
  'Activa la autenticación de dos factores',
  'Nunca compartas tus credenciales de acceso',
  'Verifica siempre la URL antes de iniciar sesión',
  'Mantén tu navegador y sistema operativo actualizados',
  'Desconfía de correos electrónicos sospechosos'
];

export function Security() {
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
            <Shield className="w-20 h-20 mx-auto mb-6 opacity-80" />
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              Seguridad en MarketHub
            </h1>
            <p className="text-xl text-violet-100 max-w-2xl mx-auto">
              Tu seguridad es nuestra prioridad. Implementamos las mejores prácticas 
              y tecnologías para proteger tu información.
            </p>
          </div>
        </section>

        {/* Security Features */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Medidas de Seguridad</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Protegemos tu información con múltiples capas de seguridad
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {securityFeatures.map((feature, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-16 h-16 bg-violet-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="w-8 h-8 text-violet-600" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Certificaciones</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Cumplimos con los estándares internacionales de seguridad
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {certifications.map((cert, index) => (
                <Card key={index} className="border-0 shadow-sm">
                  <CardContent className="p-6 text-center">
                    <FileCheck className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <h3 className="font-bold text-lg mb-2">{cert.name}</h3>
                    <p className="text-gray-600 text-sm">{cert.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Security Tips */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <AlertTriangle className="w-8 h-8 text-violet-600" />
                  <h2 className="text-3xl font-bold">Consejos de Seguridad</h2>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                  Sigue estas recomendaciones para mantener tu cuenta segura y 
                  proteger tu información personal.
                </p>
                <div className="space-y-4">
                  {tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop"
                  alt="Seguridad digital"
                  className="rounded-2xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Report Issue */}
        <section className="py-20 bg-violet-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">¿Has detectado un problema de seguridad?</h2>
            <p className="text-violet-100 mb-8">
              Si crees que has encontrado una vulnerabilidad de seguridad en nuestra plataforma, 
              por favor repórtala de inmediato. Valoramos tu ayuda para mantener MarketHub seguro.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-violet-600 hover:bg-gray-100">
                <Link to="/contact">Reportar Problema</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <a href="mailto:security@markethub.com">security@markethub.com</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
