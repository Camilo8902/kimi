import { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send
} from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { useUIStore } from '@/stores/uiStore';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email',
    value: 'contacto@markethub.com',
    description: 'Respondemos en 24 horas',
  },
  {
    icon: Phone,
    title: 'Teléfono',
    value: '+1 (555) 123-4567',
    description: 'Lun-Vie de 9am a 6pm',
  },
  {
    icon: MapPin,
    title: 'Oficina',
    value: 'Ciudad de México, México',
    description: 'Av. Reforma 123, Piso 5',
  },
  {
    icon: Clock,
    title: 'Horario',
    value: '24/7 Online',
    description: 'Soporte siempre disponible',
  },
];

const faqs = [
  {
    question: '¿Cómo puedo vender en MarketHub?',
    answer: 'Regístrate como vendedor, completa tu perfil de empresa y comienza a publicar tus productos.',
  },
  {
    question: '¿Cuáles son las comisiones?',
    answer: 'Las comisiones varían según tu plan: Basic (12%), Premium (8%), y Enterprise (5%).',
  },
  {
    question: '¿Cómo funciona el envío?',
    answer: 'Puedes usar nuestras tarifas preferenciales con transportistas o gestionar tus propios envíos.',
  },
  {
    question: '¿Cuándo recibo mis pagos?',
    answer: 'Los pagos se procesan automáticamente cada semana para el plan Basic.',
  },
];

export function Contact() {
  const { addToast } = useUIStore();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    addToast({ type: 'success', title: 'Mensaje enviado', message: 'Te responderemos lo antes posible' });
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="pt-20">
        <section className="relative py-20 bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 text-white">
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6">Contáctanos</h1>
            <p className="text-xl text-violet-100 max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Escríbenos y te responderemos en menos de 24 horas.
            </p>
          </div>
        </section>

        <section className="py-16 -mt-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((item, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-violet-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-6 h-6 text-violet-600" />
                    </div>
                    <h3 className="font-semibold mb-1">{item.title}</h3>
                    <p className="text-violet-600 font-medium">{item.value}</p>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6">Envíanos un mensaje</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Nombre</label>
                      <Input 
                        value={formData.name} 
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <Input 
                        type="email"
                        value={formData.email} 
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        required 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Asunto</label>
                    <Input 
                      value={formData.subject} 
                      onChange={e => setFormData({...formData, subject: e.target.value})}
                      required 
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Mensaje</label>
                    <Textarea 
                      rows={5}
                      value={formData.message} 
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      required 
                    />
                  </div>
                  <Button type="submit" className="w-full bg-violet-600 hover:bg-violet-700" disabled={isSubmitting}>
                    {isSubmitting ? 'Enviando...' : <><Send className="w-4 h-4 mr-2" /> Enviar Mensaje</>}
                  </Button>
                </form>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6">Preguntas Frecuentes</h2>
                <div className="space-y-4">
                  {faqs.map((faq, index) => (
                    <Card key={index} className="border-0 shadow-sm">
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{faq.question}</h3>
                        <p className="text-gray-600 text-sm">{faq.answer}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
