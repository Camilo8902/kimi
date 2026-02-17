import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Plus, 
  Minus, 
  Trash2, 
  ArrowRight, 
  Package,
  Truck,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Footer } from '@/components/layout/Footer';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';

export function Cart() {
  const navigate = useNavigate();
  const { items, subtotal, tax, shipping, total, updateQuantity, removeItem, clearCart } = useCartStore();
  const { addToast } = useUIStore();

  const handleRemoveItem = (itemId: string, productName: string) => {
    removeItem(itemId);
    addToast({
      type: 'info',
      title: 'Producto eliminado',
      message: `${productName} se eliminó del carrito`,
    });
  };

  const handleClearCart = () => {
    if (confirm('¿Estás seguro de que deseas vaciar el carrito?')) {
      clearCart();
      addToast({
        type: 'info',
        title: 'Carrito vaciado',
        message: 'Todos los productos han sido eliminados',
      });
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <CartDrawer />
        
        <main className="pt-24 pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center py-20">
              <div className="w-32 h-32 bg-violet-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingBag className="w-16 h-16 text-violet-400" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Tu carrito está vacío
              </h1>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Explora nuestros productos y encuentra algo que te guste
              </p>
              <Button
                onClick={() => navigate('/products')}
                className="bg-violet-600 hover:bg-violet-700"
              >
                Explorar Productos
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CartDrawer />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Carrito de Compras
          </h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-gray-600">
                  {items.length} {items.length === 1 ? 'producto' : 'productos'}
                </p>
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium flex items-center gap-1"
                >
                  <Trash2 className="w-4 h-4" />
                  Vaciar carrito
                </button>
              </div>

              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  {/* Image */}
                  <Link
                    to={`/product/${item.product.slug}`}
                    className="w-24 h-24 bg-white rounded-lg overflow-hidden flex-shrink-0"
                  >
                    <img
                      src={item.product.images?.[0]?.url || '/placeholder-product.png'}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <Link to={`/product/${item.product.slug}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-violet-600 transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        {item.variant && (
                          <p className="text-sm text-gray-500">
                            {item.variant.name}
                          </p>
                        )}
                        <p className="text-sm text-violet-600 font-medium">
                          {item.product.company?.name}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id, item.product.name)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md hover:border-violet-500 hover:text-violet-600 transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-10 text-center font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white border border-gray-200 rounded-md hover:border-violet-500 hover:text-violet-600 transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-semibold text-violet-600">
                          ${((item.variant?.price || item.product.price) * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-sm text-gray-500">
                          ${(item.variant?.price || item.product.price).toFixed(2)} c/u
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Continue Shopping */}
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-violet-600 hover:text-violet-700 font-medium"
              >
                ← Seguir comprando
              </Link>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4">
                  Resumen del Pedido
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Impuestos (16%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Envío</span>
                    <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <Package className="w-3 h-3" />
                      ¡Envío gratis en compras +$50!
                    </p>
                  )}
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center mb-6">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl text-violet-600">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <Button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-violet-600 hover:bg-violet-700 h-12 text-base"
                >
                  Proceder al Pago
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>

                {/* Trust Badges */}
                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Truck className="w-4 h-4 text-violet-600" />
                    <span>Envío rápido y seguro</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Shield className="w-4 h-4 text-violet-600" />
                    <span>Pago 100% seguro</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
