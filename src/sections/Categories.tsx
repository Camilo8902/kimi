import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Laptop, 
  Smartphone, 
  Shirt, 
  Home, 
  Dumbbell, 
  BookOpen, 
  Sparkles, 
  Gamepad2,
  ArrowRight
} from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { categories } from '@/data/categories';

gsap.registerPlugin(ScrollTrigger);

const iconMap: Record<string, React.ElementType> = {
  Laptop,
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  BookOpen,
  Sparkles,
  Gamepad2,
};

export function Categories() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
        {
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Cards 3D flip animation
      const cards = cardsRef.current?.querySelectorAll('.category-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { rotateY: -90, opacity: 0 },
          {
            rotateY: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
            delay: 0.2 + index * 0.1,
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, cardElement: HTMLDivElement) => {
    const rect = cardElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;

    gsap.to(cardElement, {
      rotateX: -rotateX,
      rotateY: rotateY,
      duration: 0.15,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (cardElement: HTMLDivElement) => {
    gsap.to(cardElement, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Explora por Categoría
            </h2>
            <p className="text-gray-600 text-lg">
              Encuentra lo que buscas en nuestras categorías principales
            </p>
          </div>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 text-violet-600 font-medium hover:text-violet-700 transition-colors group"
          >
            Ver todas
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
          style={{ perspective: '1000px' }}
        >
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || Laptop;
            
            return (
              <div
                key={category.id}
                className="category-card group relative"
                style={{ transformStyle: 'preserve-3d' }}
                onMouseMove={(e) => handleMouseMove(e, e.currentTarget)}
                onMouseLeave={(e) => handleMouseLeave(e.currentTarget)}
              >
                <Link to={`/category/${category.slug}`}>
                  <div
                    className="relative h-40 sm:h-48 rounded-2xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl"
                    style={{
                      background: `linear-gradient(135deg, ${category.gradient_from}, ${category.gradient_to})`,
                    }}
                  >
                    {/* Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

                    {/* Content */}
                    <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      
                      <div>
                        <h3 className="text-white font-bold text-lg sm:text-xl mb-1">
                          {category.name}
                        </h3>
                        <p className="text-white/80 text-sm">
                          {category.product_count.toLocaleString()}+ productos
                        </p>
                      </div>
                    </div>

                    {/* Decorative Circle */}
                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-500" />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
