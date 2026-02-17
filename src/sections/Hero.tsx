import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Store, Package, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import gsap from 'gsap';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation - word by word
      const words = titleRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { 
            clipPath: 'inset(0 100% 0 0)',
            opacity: 0 
          },
          {
            clipPath: 'inset(0 0% 0 0)',
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      // Subtitle animation
      gsap.fromTo(
        subtitleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.8 }
      );

      // CTA buttons animation
      gsap.fromTo(
        ctaRef.current?.children || [],
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'back.out(1.7)',
          delay: 1,
        }
      );

      // Stats cards animation
      const statCards = statsRef.current?.querySelectorAll('.stat-card');
      if (statCards) {
        gsap.fromTo(
          statCards,
          { y: 100, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 1.3,
          }
        );
      }

      // Floating animation for stats cards
      statCards?.forEach((card, index) => {
        gsap.to(card, {
          y: '+=10',
          duration: 2 + index * 0.3,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      // Particles animation
      const particles = particlesRef.current?.querySelectorAll('.particle');
      particles?.forEach((particle, index) => {
        gsap.to(particle, {
          y: `+=${30 + Math.random() * 40}`,
          x: `+=${-20 + Math.random() * 40}`,
          duration: 3 + Math.random() * 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: index * 0.1,
        });
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { icon: Package, value: '50K+', label: 'Productos' },
    { icon: Store, value: '10K+', label: 'Vendedores' },
    { icon: Users, value: '1M+', label: 'Clientes' },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-violet-50 via-white to-violet-50 pt-20"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-violet-300/30 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-200/20 rounded-full blur-3xl" />

        {/* Floating Particles */}
        <div ref={particlesRef} className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle absolute w-2 h-2 bg-violet-400/30 rounded-full"
              style={{
                left: `${5 + Math.random() * 90}%`,
                top: `${5 + Math.random() * 90}%`,
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #7c3aed 1px, transparent 1px),
              linear-gradient(to bottom, #7c3aed 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text */}
          <div className="text-center lg:text-left">
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6"
            >
              <span className="word inline-block">Todo</span>{' '}
              <span className="word inline-block">lo</span>{' '}
              <span className="word inline-block">que</span>{' '}
              <span className="word inline-block">necesitas,</span>
              <br />
              <span className="word inline-block text-violet-600">en</span>{' '}
              <span className="word inline-block text-violet-600">un</span>{' '}
              <span className="word inline-block text-violet-600">solo</span>{' '}
              <span className="word inline-block text-violet-600">lugar</span>
            </h1>

            <p
              ref={subtitleRef}
              className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0"
            >
              Descubre millones de productos de las mejores tiendas. 
              Compra con confianza, recibe con rapidez.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-violet-600/25 hover:shadow-violet-600/40 transition-all duration-300 hover:-translate-y-1"
              >
                <Link to="/products">
                  Explorar Productos
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-2 border-violet-600 text-violet-600 hover:bg-violet-50 px-8 py-6 text-lg rounded-xl transition-all duration-300 hover:-translate-y-1"
              >
                <Link to="/seller/register">
                  <Store className="w-5 h-5 mr-2" />
                  Vender en MarketHub
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="hidden lg:block relative">
            <div className="relative w-full aspect-square max-w-lg mx-auto">
              {/* Main Circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full opacity-10 animate-pulse" />
              
              {/* Product Images Orbit */}
              <div className="absolute inset-4">
                <img
                  src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600&h=600&fit=crop"
                  alt="Shopping"
                  className="w-full h-full object-cover rounded-full shadow-2xl"
                />
                
                {/* Floating Product Cards */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-2xl shadow-xl p-2 animate-bounce" style={{ animationDuration: '3s' }}>
                  <img
                    src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&h=100&fit=crop"
                    alt="Product"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                
                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-white rounded-2xl shadow-xl p-2 animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
                  <img
                    src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=100&h=100&fit=crop"
                    alt="Product"
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                
                <div className="absolute top-1/2 -right-8 w-16 h-16 bg-white rounded-xl shadow-xl p-2 animate-bounce" style={{ animationDuration: '2s', animationDelay: '1s' }}>
                  <img
                    src="https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&h=100&fit=crop"
                    alt="Product"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 max-w-2xl mx-auto lg:mx-0"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card bg-white/80 backdrop-blur-sm rounded-2xl p-4 sm:p-6 text-center shadow-lg shadow-violet-100/50 border border-violet-100"
            >
              <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-violet-600 mx-auto mb-2" />
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs sm:text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
