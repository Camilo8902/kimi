import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  ShoppingCart, 
  Star,
  Heart,
  ChevronDown,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Footer } from '@/components/layout/Footer';
import { products, categories } from '@/data/products';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import type { Product } from '@/types';

const sortOptions = [
  { value: 'featured', label: 'Destacados' },
  { value: 'newest', label: 'Más Nuevos' },
  { value: 'price-asc', label: 'Precio: Menor a Mayor' },
  { value: 'price-desc', label: 'Precio: Mayor a Menor' },
  { value: 'popular', label: 'Más Populares' },
  { value: 'rating', label: 'Mejor Calificados' },
];

export function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  
  const { addItem } = useCartStore();
  const { addToast } = useUIStore();

  const searchQuery = searchParams.get('q') || '';
  const categorySlug = searchParams.get('category') || '';
  const sortBy = searchParams.get('sort') || 'featured';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';

  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          p.company?.name.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (categorySlug) {
      const category = categories.find((c) => c.slug === categorySlug);
      if (category) {
        result = result.filter((p) => p.category_id === category.id);
      }
    }

    // Price filter
    if (minPrice) {
      result = result.filter((p) => p.price >= parseFloat(minPrice));
    }
    if (maxPrice) {
      result = result.filter((p) => p.price <= parseFloat(maxPrice));
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.sales_count - a.sales_count);
        break;
      case 'rating':
        result.sort((a, b) => b.rating_average - a.rating_average);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
        break;
      default:
        // Featured - keep original order
        break;
    }

    return result;
  }, [searchQuery, categorySlug, sortBy, minPrice, maxPrice]);

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    addToast({
      type: 'success',
      title: 'Producto agregado',
      message: `${product.name} se agregó al carrito`,
    });
  };

  const updateFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  const activeFiltersCount = [
    categorySlug,
    minPrice,
    maxPrice,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CartDrawer />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {searchQuery ? `Resultados para "${searchQuery}"` : 'Todos los Productos'}
            </h1>
            <p className="text-gray-600">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'} encontrados
            </p>
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <SlidersHorizontal className="w-4 h-4" />
                Filtros
                {activeFiltersCount > 0 && (
                  <Badge className="ml-1 bg-violet-600">{activeFiltersCount}</Badge>
                )}
              </Button>

              {activeFiltersCount > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-sm text-violet-600 hover:underline flex items-center gap-1"
                >
                  <X className="w-3 h-3" />
                  Limpiar
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Sort Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-2">
                    {sortOptions.find((o) => o.value === sortBy)?.label}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {sortOptions.map((option) => (
                    <DropdownMenuItem
                      key={option.value}
                      onClick={() => updateFilter('sort', option.value)}
                    >
                      {option.label}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>

              {/* View Mode */}
              <div className="flex border rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-violet-100 text-violet-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-violet-100 text-violet-600' : 'text-gray-500 hover:bg-gray-100'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="grid sm:grid-cols-3 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Categorías</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => updateFilter('category', '')}
                      className={`block text-sm ${!categorySlug ? 'text-violet-600 font-medium' : 'text-gray-600 hover:text-violet-600'}`}
                    >
                      Todas las categorías
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => updateFilter('category', cat.slug)}
                        className={`block text-sm ${categorySlug === cat.slug ? 'text-violet-600 font-medium' : 'text-gray-600 hover:text-violet-600'}`}
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Precio</h3>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => updateFilter('minPrice', e.target.value)}
                      className="w-24"
                    />
                    <span className="text-gray-400">-</span>
                    <Input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => updateFilter('maxPrice', e.target.value)}
                      className="w-24"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 mb-4">No se encontraron productos</p>
              <Button onClick={clearFilters} variant="outline">
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <div className={
              viewMode === 'grid'
                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6'
                : 'space-y-4'
            }>
              {filteredProducts.map((product) => {
                const discount = product.compare_at_price
                  ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
                  : 0;

                if (viewMode === 'list') {
                  return (
                    <div
                      key={product.id}
                      className="flex gap-4 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-lg transition-shadow"
                    >
                      <Link to={`/product/${product.slug}`} className="w-32 h-32 flex-shrink-0">
                        <img
                          src={product.images?.[0]?.url || '/placeholder-product.png'}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-lg"
                        />
                      </Link>
                      <div className="flex-1">
                        <p className="text-sm text-violet-600 font-medium">{product.company?.name}</p>
                        <Link to={`/product/${product.slug}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-violet-600 transition-colors">
                            {product.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{product.description}</p>
                        <div className="flex items-center gap-2 mt-2">
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
                          <span className="text-xs text-gray-500">({product.rating_count})</span>
                        </div>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xl font-bold text-violet-600">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.compare_at_price && (
                              <span className="text-sm text-gray-400 line-through">
                                ${product.compare_at_price.toFixed(2)}
                              </span>
                            )}
                          </div>
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product)}
                            className="bg-violet-600 hover:bg-violet-700"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Agregar
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                }

                return (
                  <div
                    key={product.id}
                    className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <Link to={`/product/${product.slug}`}>
                        <img
                          src={product.images?.[0]?.url || '/placeholder-product.png'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </Link>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {discount > 0 && (
                          <Badge className="bg-red-500 text-white border-0">-{discount}%</Badge>
                        )}
                        {product.featured && (
                          <Badge className="bg-violet-600 text-white border-0">Destacado</Badge>
                        )}
                      </div>

                      {/* Quick Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-red-500">
                          <Heart className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Quick Add */}
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="absolute bottom-0 left-0 right-0 bg-violet-600 text-white py-3 font-medium translate-y-full group-hover:translate-y-0 transition-transform flex items-center justify-center gap-2 hover:bg-violet-700"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Agregar al Carrito
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-4">
                      <p className="text-xs font-medium text-violet-600 uppercase tracking-wider mb-1">
                        {product.company?.name}
                      </p>
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-violet-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>
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
                        <span className="text-xs text-gray-500">({product.rating_count.toLocaleString()})</span>
                      </div>
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
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
