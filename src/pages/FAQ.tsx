import { useState } from 'react';
import { Search, ChevronDown, HelpCircle, ShoppingBag, Truck, CreditCard, User, Store } from 'lucide-react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Input } from '@/components/ui/input';

const categories = [
  { id: 'general', name: 'General', icon: HelpCircle },
  { id: 'shopping', name: 'Compras', icon: ShoppingBag },
  { id: 'shipping', name: 'Envíos', icon: Truck },
  { id: 'payment', name: 'Pagos', icon: CreditCard },
  { id: 'account', name: 'Cuenta', icon: User },
  { id: 'seller', name: 'Vendedores', icon: Store },
];

const faqs = [
  {
    category: 'general',
    question: '¿Qué es MarketHub?',
    answer: 'MarketHub es un marketplace que conecta compradores con vendedores verificados, ofreciendo una experiencia de compra segura y confiable.',
  },
  {
    category: 'general',
    question: '¿Cómo me registro?',
    answer: 'Haz clic en "Registrarse" en la parte superior derecha, completa tus datos y verifica tu email. El proceso toma menos de 2 minutos.',
  },
  {
    category: 'shopping',
    question: '¿Cómo hago una compra?',
    answer: 'Busca el producto que deseas, agrégalo al carrito, procede al checkout y selecciona tu método de pago preferido.',
  },
  {
    category: 'shopping',
    question: '¿Puedo cancelar un pedido?',
    answer: 'Sí, puedes cancelar un pedido si aún no ha sido procesado. Ve a "Mis Pedidos" y selecciona la opción de cancelar.',
  },
  {
    category: 'shipping',
    question: '¿Cuánto tarda el envío?',
    answer: 'El tiempo de envío varía según tu ubicación y el vendedor. Generalmente de 3-7 días hábiles para envíos nacionales.',
  },
  {
    category: 'shipping',
    question: '¿El envío es gratis?',
    answer: 'Sí, ofrecemos envío gratis en compras mayores a $50. Algunos vendedores también ofrecen envío gratis en productos seleccionados.',
  },
  {
    category: 'payment',
    question: '¿Qué métodos de pago aceptan?',
    answer: 'Aceptamos tarjetas de crédito/débito (Visa, Mastercard, Amex), PayPal y transferencia bancaria.',
  },
  {
    category: 'payment',
    question: '¿Es seguro pagar en MarketHub?',
    answer: 'Sí, utilizamos encriptación SSL de 256 bits y cumplimos con los estándares PCI DSS para proteger tus datos de pago.',
  },
  {
    category: 'account',
    question: '¿Cómo cambio mi contraseña?',
    answer: 'Ve a tu perfil, selecciona "Seguridad" y sigue los pasos para cambiar tu contraseña.',
  },
  {
    category: 'account',
    question: '¿Puedo eliminar mi cuenta?',
    answer: 'Sí, puedes solicitar la eliminación de tu cuenta desde la configuración de tu perfil. Ten en cuenta que esta acción es irreversible.',
  },
  {
    category: 'seller',
    question: '¿Cómo me convierto en vendedor?',
    answer: 'Regístrate, completa el formulario de registro de empresa con tus documentos y espera la verificación de nuestro equipo.',
  },
  {
    category: 'seller',
    question: '¿Cuáles son las comisiones?',
    answer: 'Las comisiones varían según tu plan: Basic (12%), Premium (8%), Enterprise (5%). Sin cargos ocultos.',
  },
];

export function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-20 pb-20">
        <section className="bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Centro de Ayuda</h1>
            <p className="text-violet-100 mb-8">Encuentra respuestas a tus preguntas</p>
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Buscar preguntas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 text-gray-900"
              />
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex flex-wrap gap-2 mb-8 justify-center">
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  activeCategory === 'all' ? 'bg-violet-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
              >
                Todas
              </button>
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                    activeCategory === cat.id ? 'bg-violet-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <cat.icon className="w-4 h-4" />
                  {cat.name}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredFaqs.map((faq, index) => (
                <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <button
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-50"
                  >
                    <span className="font-medium">{faq.question}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
                  </button>
                  {openIndex === index && (
                    <div className="px-6 pb-4 text-gray-600">{faq.answer}</div>
                  )}
                </div>
              ))}
            </div>

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No encontramos preguntas relacionadas</p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
