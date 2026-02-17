import { useNavigate } from 'react-router-dom';
import { Plus, Minus, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';

export function CartDrawer() {
  const navigate = useNavigate();
  const { items, subtotal, tax, shipping, total, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();
  const { addToast } = useUIStore();

  const handleCheckout = () => {
    if (items.length === 0) {
      addToast({
        type: 'error',
        title: 'Carrito vacío',
        message: 'Agrega productos antes de continuar',
      });
      return;
    }
    closeCart();
    navigate('/checkout');
  };

  return (
    <Sheet open={isOpen} onOpenChange={closeCart}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader className="space-y-2.5 pb-4">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingBag className="w-5 h-5 text-violet-600" />
            Tu Carrito
            <span className="text-sm font-normal text-gray-500">
              ({items.length} {items.length === 1 ? 'producto' : 'productos'})
            </span>
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <div className="w-24 h-24 bg-violet-100 rounded-full flex items-center justify-center mb-4">
              <ShoppingBag className="w-12 h-12 text-violet-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Tu carrito está vacío
            </h3>
            <p className="text-gray-500 mb-6 max-w-xs">
              Explora nuestros productos y encuentra algo que te guste
            </p>
            <Button
              onClick={() => {
                closeCart();
                navigate('/products');
              }}
              className="bg-violet-600 hover:bg-violet-700"
            >
              Explorar Productos
            </Button>
          </div>
        ) : (
          <>
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-gray-50 rounded-xl group hover:bg-violet-50 transition-colors"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-white rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product.images?.[0]?.url || '/placeholder-product.png'}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium text-gray-900 truncate">
                          {item.product.name}
                        </p>
                        {item.variant && (
                          <p className="text-sm text-gray-500">
                            {item.variant.name}
                          </p>
                        )}
                        <p className="text-sm text-gray-500">
                          {item.product.company?.name}
                        </p>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-md hover:border-violet-500 hover:text-violet-600 transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center font-medium text-sm">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white border border-gray-200 rounded-md hover:border-violet-500 hover:text-violet-600 transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <p className="font-semibold text-violet-600">
                        ${((item.variant?.price || item.product.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="border-t border-gray-200 pt-4 space-y-3">
              <div className="space-y-2 text-sm">
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
                  <p className="text-xs text-green-600">
                    ¡Envío gratis en compras mayores a $50!
                  </p>
                )}
              </div>

              <Separator />

              <div className="flex justify-between items-center">
                <span className="font-semibold text-lg">Total</span>
                <span className="font-bold text-2xl text-violet-600">
                  ${total.toFixed(2)}
                </span>
              </div>

              <Button
                onClick={handleCheckout}
                className="w-full bg-violet-600 hover:bg-violet-700 h-12 text-base"
              >
                Proceder al Pago
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>

              <Button
                variant="outline"
                onClick={() => {
                  closeCart();
                  navigate('/cart');
                }}
                className="w-full"
              >
                Ver Carrito Completo
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
