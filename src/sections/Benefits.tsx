import { useEffect, useRef } from 'react';
import { Truck, Shield, RefreshCw, Headphones } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  {
    icon: Truck,
    title: 'Envío Gratis',
    description: 'En compras mayores a $50. Entrega rápida a todo el país.',
    color: 'from-green-500 to-emerald-600',
  },
  {
    icon: Shield,
    title: 'Pago Seguro',
    description: 'Múltiples métodos de pago protegidos con encriptación.',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    icon: RefreshCw,
    title: 'Garantía',
    description: '30 días de garantía en todos los productos.',
    color: 'from-violet-500 to-purple-600',
  },
  {
    icon: Headphones,
    title: 'Soporte 24/7',
    description: 'Atención al cliente disponible todos los días.',
    color: 'from-orange-500 to-red-600',
  },
];

export function Benefits() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.benefit-card');
      
      cards?.forEach((card, index) => {
        const icon = card.querySelector('.benefit-icon');
        const text = card.querySelector('.benefit-text');

        // Icon draw animation (simulated with scale and opacity)
        gsap.fromTo(
          icon,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.6,
            ease: 'back.out(1.7)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            delay: 0.2 + index * 0.15,
          }
        );

        // Text fade up
        gsap.fromTo(
          text,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
            delay: 0.4 + index * 0.15,
          }
        );
      });

      // Subtle pulse animation for icons
      cards?.forEach((card) => {
        const icon = card.querySelector('.benefit-icon');
        gsap.to(icon, {
          scale: 1.05,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card group bg-white rounded-2xl p-6 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className={`benefit-icon w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${benefit.color} flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:rotate-6 transition-all duration-300`}
              >
                <benefit.icon className="w-8 h-8 text-white" />
              </div>

              {/* Text */}
              <div className="benefit-text">
                <h3 className="font-bold text-gray-900 mb-2 group-hover:text-violet-600 transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
