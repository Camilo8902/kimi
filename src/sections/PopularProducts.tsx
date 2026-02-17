import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LazyImage } from '@/components/ui/LazyImage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { products } from '@/data/products';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

export function PopularProducts() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const { addItem } = useCartStore();
  const { addToast } = useUIStore();

  const popularProducts = products
    .filter(p => p.sales_count > 500)
    .sort((a, b) => b.sales_count - a.sales_count)
    .slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Product cards animation
      const cards = gridRef.current?.querySelectorAll('.popular-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
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

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    addToast({
      type: 'success',
      title: 'Producto agregado',
      message: `${product.name} se agregó al carrito`,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp className="w-5 h-5 text-violet-600" />
              <span className="text-sm font-medium text-violet-600 uppercase tracking-wider">
                Tendencias
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Productos Populares
            </h2>
            <p className="text-gray-600 text-lg">
              Los más vendidos esta semana
            </p>
          </div>
          <Link
            to="/products?sort=popular"
            className="inline-flex items-center gap-2 text-violet-600 font-medium hover:text-violet-700 transition-colors group"
          >
            Ver todos
            <TrendingUp className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Products Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {popularProducts.map((product, index) => (
            <div
              key={product.id}
              className="popular-card group relative bg-white rounded-2xl border border-gray-100 overflow-hidden hover:border-violet-300 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Rank Badge */}
              <div className="absolute top-3 left-3 z-10">
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                  #{index + 1} Más Vendido
                </Badge>
              </div>

              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <Link to={`/product/${product.slug}`}>
                  <LazyImage
                    src={product.images?.[0]?.url || '/placeholder-product.png'}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </Link>

                {/* Quick Add */}
                <button
                  onClick={() => handleAddToCart(product)}
                  className="absolute bottom-3 right-3 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center text-violet-600 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-violet-600 hover:text-white"
                >
                  <ShoppingCart className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-4">
                {/* Brand */}
                <p className="text-xs font-medium text-violet-600 uppercase tracking-wider mb-1">
                  {product.company?.name}
                </p>

                {/* Name */}
                <Link to={`/product/${product.slug}`}>
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-violet-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating_average)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    ({product.rating_count.toLocaleString()})
                  </span>
                </div>

                {/* Price & Sales */}
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-violet-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {product.sales_count.toLocaleString()} vendidos
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
