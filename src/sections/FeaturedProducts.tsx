import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Heart, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { LazyImage } from '@/components/ui/LazyImage';
import { products } from '@/data/products';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import type { Product } from '@/types';

gsap.registerPlugin(ScrollTrigger);

const tabs = [
  { id: 'featured', label: 'Destacados' },
  { id: 'new', label: 'Nuevos' },
  { id: 'bestsellers', label: 'Más Vendidos' },
];

export function FeaturedProducts() {
  const [activeTab, setActiveTab] = useState('featured');
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  
  const { addItem } = useCartStore();
  const { addToast } = useUIStore();

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'featured') return p.featured;
    if (activeTab === 'new') return true; // In real app, filter by date
    if (activeTab === 'bestsellers') return p.sales_count > 1000;
    return true;
  }).slice(0, 4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
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

      // Tab indicator animation
      gsap.fromTo(
        indicatorRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 0.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
          delay: 0.3,
        }
      );

      // Product cards animation
      const cards = gridRef.current?.querySelectorAll('.product-card');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
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

  const getDiscountPercentage = (product: Product) => {
    if (product.compare_at_price && product.compare_at_price > product.price) {
      return Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
    }
    return 0;
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              Productos Especiales
            </h2>
            <p className="text-gray-600 text-lg">
              Descubre nuestra selección de productos destacados
            </p>
          </div>

          {/* Tabs */}
          <div ref={tabsRef} className="relative">
            <div className="flex gap-1 bg-white p-1 rounded-xl shadow-sm">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'text-violet-600'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute inset-0 bg-violet-100 rounded-lg -z-10" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {filteredProducts.map((product) => {
            const discount = getDiscountPercentage(product);
            
            return (
              <div
                key={product.id}
                className="product-card group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-3"
              >
                {/* Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <Link to={`/product/${product.slug}`}>
                    <LazyImage
                      src={product.images?.[0]?.url || '/placeholder-product.png'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </Link>

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {discount > 0 && (
                      <Badge className="bg-red-500 text-white border-0">
                        -{discount}%
                      </Badge>
                    )}
                    {product.featured && (
                      <Badge className="bg-violet-600 text-white border-0">
                        Destacado
                      </Badge>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-x-2 group-hover:translate-x-0">
                    <button className="w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors">
                      <Heart className="w-4 h-4" />
                    </button>
                    <button className="w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-violet-600 hover:bg-violet-50 transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quick Add Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="absolute bottom-0 left-0 right-0 bg-violet-600 text-white py-3 font-medium translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex items-center justify-center gap-2 hover:bg-violet-700"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Agregar al Carrito
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

                  {/* Price */}
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-violet-600">
                      ${product.price.toFixed(2)}
                    </span>
                    {product.compare_at_price && (
                      <span className="text-sm text-gray-400 line-through">
                        ${product.compare_at_price.toFixed(2)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center mt-10">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-2 border-violet-600 text-violet-600 hover:bg-violet-600 hover:text-white"
          >
            <Link to="/products">
              Ver Todos los Productos
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
