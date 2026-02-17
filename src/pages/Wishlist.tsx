import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Heart, 
  ShoppingCart, 
  Trash2, 
  Share2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Footer } from '@/components/layout/Footer';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';
import { products } from '@/data/products';
import type { Product } from '@/types';

// Mock wishlist data
const mockWishlist: Product[] = [
  products[0], // Zapatillas
  products[2], // Smartwatch
  products[4], // Auriculares
  products[6], // Camiseta
];

export function Wishlist() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { addItem } = useCartStore();
  const { addToast } = useUIStore();
  
  const [wishlistItems, setWishlistItems] = useState<Product[]>(mockWishlist);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlistItems(prev => prev.filter(item => item.id !== productId));
    addToast({
      type: 'info',
      title: 'Eliminado de favoritos',
      message: 'El producto ha sido eliminado de tu lista de deseos',
    });
  };

  const handleAddToCart = (product: Product) => {
    addItem(product, 1);
    addToast({
      type: 'success',
      title: 'Agregado al carrito',
      message: `${product.name} se agregó a tu carrito`,
    });
  };

  const handleShare = (product: Product) => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Mira este producto: ${product.name}`,
        url: window.location.origin + '/product/' + product.slug,
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + '/product/' + product.slug);
      addToast({
        type: 'success',
        title: 'Enlace copiado',
        message: 'El enlace del producto ha sido copiado',
      });
    }
  };

  const getDiscount = (product: Product) => {
    if (product.compare_at_price && product.compare_at_price > product.price) {
      return Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);
    }
    return 0;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900">Mi Lista de Deseos</h1>
              <p className="text-gray-600">{wishlistItems.length} {wishlistItems.length === 1 ? 'producto' : 'productos'} guardados</p>
            </div>
            {wishlistItems.length > 0 && (
              <Button
                variant="outline"
                onClick={() => {
                  wishlistItems.forEach(item => addItem(item, 1));
                  addToast({
                    type: 'success',
                    title: 'Productos agregados',
                    message: 'Todos los productos fueron agregados al carrito',
                  });
                }}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Agregar todo al carrito
              </Button>
            )}
          </div>

          {wishlistItems.length === 0 ? (
            <Card className="border-0 shadow-sm">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-violet-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Tu lista de deseos está vacía</h3>
                <p className="text-gray-500 mb-6">Guarda tus productos favoritos para verlos aquí</p>
                <Button 
                  onClick={() => navigate('/products')}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  Explorar Productos
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistItems.map((product) => {
                const discount = getDiscount(product);
                
                return (
                  <Card 
                    key={product.id}
                    className="group border-0 shadow-sm overflow-hidden hover:shadow-lg transition-all"
                  >
                    {/* Image */}
                    <div className="relative aspect-square overflow-hidden bg-gray-100">
                      <Link to={`/product/${product.slug}`}>
                        <img
                          src={product.images?.[0]?.url || '/placeholder-product.png'}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </Link>

                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex flex-col gap-2">
                        {discount > 0 && (
                          <Badge className="bg-red-500 text-white border-0">
                            -{discount}%
                          </Badge>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="absolute top-3 right-3 flex flex-col gap-2">
                        <button
                          onClick={() => handleRemoveFromWishlist(product.id)}
                          className="w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleShare(product)}
                          className="w-9 h-9 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-violet-600 hover:bg-violet-50 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-4">
                      <p className="text-xs font-medium text-violet-600 uppercase tracking-wider mb-1">
                        {product.company?.name}
                      </p>
                      <Link to={`/product/${product.slug}`}>
                        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-violet-600 transition-colors">
                          {product.name}
                        </h3>
                      </Link>

                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-lg font-bold text-violet-600">
                          ${product.price.toFixed(2)}
                        </span>
                        {product.compare_at_price && (
                          <span className="text-sm text-gray-400 line-through">
                            ${product.compare_at_price.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-violet-600 hover:bg-violet-700"
                        size="sm"
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Agregar al Carrito
                      </Button>
                    </CardContent>
                  </Card>
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

import { Navigate } from 'react-router-dom';
