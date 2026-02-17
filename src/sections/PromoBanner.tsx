import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function PromoBanner() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const countdownRef = useRef<HTMLDivElement>(null);

  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 30,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) {
                days--;
              }
            }
          }
        }
        
        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Content animation
      gsap.fromTo(
        contentRef.current?.querySelectorAll('.animate-item') || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { x: 100, y: 50, opacity: 0 },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: 0.4,
        }
      );

      // Countdown animation
      gsap.fromTo(
        countdownRef.current,
        { rotateX: -90, opacity: 0 },
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: 0.9,
        }
      );

      // Floating animation for image
      gsap.to(imageRef.current, {
        y: '+=15',
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const timeBlocks = [
    { value: timeLeft.days, label: 'Días' },
    { value: timeLeft.hours, label: 'Horas' },
    { value: timeLeft.minutes, label: 'Min' },
    { value: timeLeft.seconds, label: 'Seg' },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-violet-600 via-violet-700 to-purple-800 rounded-3xl overflow-hidden">
          {/* Animated Background */}
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            
            {/* Animated Waves */}
            <svg
              className="absolute bottom-0 left-0 right-0"
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="rgba(255,255,255,0.05)"
              />
            </svg>
          </div>

          <div className="relative grid lg:grid-cols-2 gap-8 p-8 sm:p-12 lg:p-16">
            {/* Content */}
            <div ref={contentRef} className="text-white">
              <div className="animate-item inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Oferta por tiempo limitado</span>
              </div>

              <h2 className="animate-item text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Oferta Especial de Verano
              </h2>

              <p className="animate-item text-lg text-violet-100 mb-8 max-w-md">
                Hasta 50% de descuento en productos seleccionados. 
                ¡Solo por tiempo limitado!
              </p>

              {/* Countdown */}
              <div
                ref={countdownRef}
                className="animate-item flex gap-3 sm:gap-4 mb-8"
                style={{ perspective: '500px' }}
              >
                {timeBlocks.map((block, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-2">
                      <span className="text-2xl sm:text-3xl font-bold">
                        {String(block.value).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-xs sm:text-sm text-violet-200">{block.label}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                size="lg"
                className="animate-item bg-white text-violet-600 hover:bg-violet-50 px-8"
              >
                <Link to="/offers">
                  Ver Ofertas
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Image */}
            <div ref={imageRef} className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-white/10 rounded-full absolute inset-0 blur-3xl" />
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=500&h=500&fit=crop"
                  alt="Summer Sale"
                  className="relative w-72 h-72 object-cover rounded-3xl shadow-2xl"
                />
                
                {/* Floating Badge */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                  <div className="text-center">
                    <span className="block text-2xl font-bold text-gray-900">50%</span>
                    <span className="text-xs font-medium text-gray-800">OFF</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
