import { useEffect, useRef, useState } from 'react';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useUIStore } from '@/stores/uiStore';

gsap.registerPlugin(ScrollTrigger);

export function Newsletter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { addToast } = useUIStore();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background fade
      gsap.fromTo(
        sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Content animations
      const items = contentRef.current?.querySelectorAll('.animate-item');
      items?.forEach((item, index) => {
        gsap.fromTo(
          item,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            delay: 0.2 + index * 0.1,
          }
        );
      });

      // Floating particles
      const particles = sectionRef.current?.querySelectorAll('.particle');
      particles?.forEach((particle, index) => {
        gsap.to(particle, {
          y: `+=${20 + Math.random() * 30}`,
          x: `+=${-15 + Math.random() * 30}`,
          duration: 4 + Math.random() * 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: index * 0.2,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      addToast({
        type: 'error',
        title: 'Email inválido',
        message: 'Por favor ingresa un email válido',
      });
      return;
    }

    setIsSubmitted(true);
    addToast({
      type: 'success',
      title: '¡Suscripción exitosa!',
      message: 'Gracias por suscribirte a nuestro newsletter',
    });
    setEmail('');
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800">
        {/* Particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${5 + Math.random() * 90}%`,
                top: `${5 + Math.random() * 90}%`,
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="text-center text-white">
          {/* Icon */}
          <div className="animate-item inline-flex items-center justify-center w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl mb-6">
            <Mail className="w-8 h-8" />
          </div>

          <h2 className="animate-item text-3xl sm:text-4xl font-bold mb-4">
            Únete a Nuestra Comunidad
          </h2>

          <p className="animate-item text-lg text-violet-100 mb-8 max-w-xl mx-auto">
            Recibe ofertas exclusivas, lanzamientos y consejos directamente en tu inbox.
          </p>

          {/* Form */}
          {!isSubmitted ? (
            <form
              onSubmit={handleSubmit}
              className="animate-item flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="email"
                  placeholder="Ingresa tu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-6 bg-white text-gray-900 border-0 rounded-xl focus:ring-4 focus:ring-white/30 transition-all"
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 rounded-xl transition-all hover:shadow-lg hover:shadow-gray-900/30"
              >
                Suscribirse
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </form>
          ) : (
            <div className="animate-item flex items-center justify-center gap-3 text-green-400 bg-green-400/20 backdrop-blur-sm rounded-xl py-4 px-6 max-w-md mx-auto">
              <CheckCircle className="w-6 h-6" />
              <span className="font-medium">¡Gracias por suscribirte!</span>
            </div>
          )}

          <p className="animate-item text-sm text-violet-200 mt-4">
            Al suscribirte, aceptas nuestra política de privacidad.
          </p>
        </div>
      </div>
    </section>
  );
}
