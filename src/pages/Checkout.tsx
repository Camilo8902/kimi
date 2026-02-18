import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  Check, 
  ChevronRight,
  Lock,
  Package,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Footer } from '@/components/layout/Footer';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { createOrder, type Order } from '@/services/orderService';

const steps = [
  { id: 'shipping', label: 'Envío', icon: MapPin },
  { id: 'payment', label: 'Pago', icon: CreditCard },
  { id: 'review', label: 'Confirmar', icon: Check },
];

export function Checkout() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('shipping');
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [createdOrder, setCreatedOrder] = useState<Order | null>(null);
  const [orderError, setOrderError] = useState<string | null>(null);
  
  const { items, subtotal, tax, shipping, total, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { addToast } = useUIStore();

  const [shippingData, setShippingData] = useState({
    firstName: user?.first_name || '',
    lastName: user?.last_name || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'México',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');

  if (items.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError(null);
    setCurrentStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError(null);
    setCurrentStep('review');
    window.scrollTo(0, 0);
  };

  const handlePlaceOrder = async () => {
    if (!user?.id) {
      setOrderError('Debes iniciar sesión para realizar un pedido');
      return;
    }

    setIsProcessing(true);
    setOrderError(null);
    
    try {
      const result = await createOrder({
        user_id: user.id,
        items: items,
        shipping_address: shippingData,
        payment_method: paymentMethod,
        subtotal: subtotal,
        tax_amount: tax,
        shipping_cost: shipping,
        discount_amount: 0,
        total_amount: total,
      });

      if (result.success && result.order) {
        setCreatedOrder(result.order);
        setOrderComplete(true);
        clearCart();
        
        addToast({
          type: 'success',
          title: '¡Pedido realizado!',
          message: 'Tu pedido ha sido procesado exitosamente',
        });
      } else {
        setOrderError(result.error || 'Error al procesar el pedido');
        addToast({
          type: 'error',
          title: 'Error',
          message: result.error || 'No se pudo completar el pedido',
        });
      }
    } catch (error) {
      console.error('Order error:', error);
      setOrderError('Error inesperado al procesar el pedido');
      addToast({
        type: 'error',
        title: 'Error',
        message: 'Ocurrió un error inesperado',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        
        <main className="pt-24 pb-20">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              ¡Pedido Confirmado!
            </h1>
            <p className="text-gray-600 mb-8">
              Gracias por tu compra. Hemos enviado un correo de confirmación a {shippingData.email}
            </p>
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <p className="text-sm text-gray-500 mb-2">Número de pedido</p>
              <p className="text-2xl font-bold text-violet-600">#{createdOrder?.order_number || 'Procesando...'}</p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button
                onClick={() => navigate('/orders')}
                className="bg-violet-600 hover:bg-violet-700"
              >
                Ver Mis Pedidos
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/products')}
              >
                Seguir Comprando
              </Button>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    );
  }

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CartDrawer />
      
      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Finalizar Compra
          </h1>

          {/* Progress Steps */}
          <div className="flex items-center justify-center mb-12">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    index <= currentStepIndex
                      ? 'bg-violet-600 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  <step.icon className="w-4 h-4" />
                  <span className="text-sm font-medium hidden sm:inline">{step.label}</span>
                </div>
                {index < steps.length - 1 && (
                  <ChevronRight className="w-5 h-5 text-gray-400 mx-2" />
                )}
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Shipping Step */}
              {currentStep === 'shipping' && (
                <form onSubmit={handleShippingSubmit} className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-violet-600" />
                      Dirección de Envío
                    </h2>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Nombre *</Label>
                        <Input
                          id="firstName"
                          value={shippingData.firstName}
                          onChange={(e) => setShippingData({ ...shippingData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Apellido *</Label>
                        <Input
                          id="lastName"
                          value={shippingData.lastName}
                          onChange={(e) => setShippingData({ ...shippingData, lastName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={shippingData.email}
                          onChange={(e) => setShippingData({ ...shippingData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Teléfono *</Label>
                        <Input
                          id="phone"
                          value={shippingData.phone}
                          onChange={(e) => setShippingData({ ...shippingData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="sm:col-span-2 space-y-2">
                        <Label htmlFor="address">Dirección *</Label>
                        <Input
                          id="address"
                          value={shippingData.address}
                          onChange={(e) => setShippingData({ ...shippingData, address: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="city">Ciudad *</Label>
                        <Input
                          id="city"
                          value={shippingData.city}
                          onChange={(e) => setShippingData({ ...shippingData, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">Estado *</Label>
                        <Input
                          id="state"
                          value={shippingData.state}
                          onChange={(e) => setShippingData({ ...shippingData, state: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Código Postal *</Label>
                        <Input
                          id="postalCode"
                          value={shippingData.postalCode}
                          onChange={(e) => setShippingData({ ...shippingData, postalCode: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">País *</Label>
                        <Input
                          id="country"
                          value={shippingData.country}
                          onChange={(e) => setShippingData({ ...shippingData, country: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-violet-600 hover:bg-violet-700 h-12"
                  >
                    Continuar al Pago
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>
              )}

              {/* Payment Step */}
              {currentStep === 'payment' && (
                <form onSubmit={handlePaymentSubmit} className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-violet-600" />
                      Método de Pago
                    </h2>

                    <RadioGroup
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="space-y-3"
                    >
                      <div className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${
                        paymentMethod === 'card' ? 'border-violet-600 bg-violet-50' : 'border-gray-200'
                      }`}>
                        <RadioGroupItem value="card" id="card" />
                        <Label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                              <CreditCard className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">Tarjeta de Crédito/Débito</p>
                              <p className="text-sm text-gray-500">Visa, Mastercard, Amex</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${
                        paymentMethod === 'paypal' ? 'border-violet-600 bg-violet-50' : 'border-gray-200'
                      }`}>
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                              <span className="text-white font-bold text-sm">Pay</span>
                            </div>
                            <div>
                              <p className="font-medium">PayPal</p>
                              <p className="text-sm text-gray-500">Pago seguro con PayPal</p>
                            </div>
                          </div>
                        </Label>
                      </div>

                      <div className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-colors ${
                        paymentMethod === 'transfer' ? 'border-violet-600 bg-violet-50' : 'border-gray-200'
                      }`}>
                        <RadioGroupItem value="transfer" id="transfer" />
                        <Label htmlFor="transfer" className="flex-1 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                              <Truck className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium">Transferencia Bancaria</p>
                              <p className="text-sm text-gray-500">Depósito o transferencia</p>
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>

                    {paymentMethod === 'card' && (
                      <div className="mt-6 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="cardNumber">Número de Tarjeta *</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            required
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="expiry">Fecha de Expiración *</Label>
                            <Input
                              id="expiry"
                              placeholder="MM/AA"
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cvv">CVV *</Label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cardName">Nombre en la Tarjeta *</Label>
                          <Input
                            id="cardName"
                            placeholder="JUAN PÉREZ"
                            required
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-12"
                      onClick={() => setCurrentStep('shipping')}
                    >
                      Atrás
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-violet-600 hover:bg-violet-700 h-12"
                    >
                      Revisar Pedido
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </Button>
                  </div>
                </form>
              )}

              {/* Review Step */}
              {currentStep === 'review' && (
                <div className="space-y-6">
                  {/* Error Alert */}
                  {orderError && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>{orderError}</AlertDescription>
                    </Alert>
                  )}
                  
                  <div className="bg-white border border-gray-200 rounded-xl p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-4">
                      Revisar Pedido
                    </h2>

                    {/* Shipping Info */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-700">Dirección de Envío</h3>
                        <button
                          onClick={() => setCurrentStep('shipping')}
                          className="text-sm text-violet-600 hover:underline"
                        >
                          Editar
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-sm">
                        <p className="font-medium">{shippingData.firstName} {shippingData.lastName}</p>
                        <p>{shippingData.address}</p>
                        <p>{shippingData.city}, {shippingData.state} {shippingData.postalCode}</p>
                        <p>{shippingData.country}</p>
                        <p className="mt-2">{shippingData.email}</p>
                        <p>{shippingData.phone}</p>
                      </div>
                    </div>

                    {/* Payment Method */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-700">Método de Pago</h3>
                        <button
                          onClick={() => setCurrentStep('payment')}
                          className="text-sm text-violet-600 hover:underline"
                        >
                          Editar
                        </button>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-4 text-sm">
                        {paymentMethod === 'card' && (
                          <div className="flex items-center gap-3">
                            <CreditCard className="w-5 h-5 text-violet-600" />
                            <span>Tarjeta de Crédito/Débito terminada en ****</span>
                          </div>
                        )}
                        {paymentMethod === 'paypal' && (
                          <div className="flex items-center gap-3">
                            <span className="font-bold text-blue-600">Pay</span>
                            <span>PayPal</span>
                          </div>
                        )}
                        {paymentMethod === 'transfer' && (
                          <div className="flex items-center gap-3">
                            <Truck className="w-5 h-5 text-green-600" />
                            <span>Transferencia Bancaria</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Items */}
                    <div>
                      <h3 className="font-medium text-gray-700 mb-2">Productos</h3>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="flex gap-3 bg-gray-50 rounded-lg p-3">
                            <img
                              src={item.product.images?.[0]?.url || '/placeholder-product.png'}
                              alt={item.product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.product.name}</p>
                              <p className="text-xs text-gray-500">{item.product.company?.name}</p>
                              <p className="text-xs text-gray-500">Cantidad: {item.quantity}</p>
                            </div>
                            <p className="font-medium text-violet-600">
                              ${((item.variant?.price || item.product.price) * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      className="flex-1 h-12"
                      onClick={() => setCurrentStep('payment')}
                    >
                      Atrás
                    </Button>
                    <Button
                      onClick={handlePlaceOrder}
                      className="flex-1 bg-violet-600 hover:bg-violet-700 h-12"
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <Lock className="w-4 h-4 mr-2" />
                          Confirmar Pedido
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5 text-violet-600" />
                  Resumen
                </h2>

                <div className="space-y-3 text-sm mb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal ({items.reduce((sum, i) => sum + i.quantity, 0)} items)</span>
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
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl text-violet-600">
                    ${total.toFixed(2)}
                  </span>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                  <Lock className="w-4 h-4" />
                  <span>Pago seguro y encriptado</span>
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
