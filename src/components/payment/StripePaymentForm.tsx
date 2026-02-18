/**
 * Stripe Payment Form Component
 * Handles card payment processing with Stripe Elements
 */

import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import type { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  CreditCard, 
  Lock, 
  Shield, 
  AlertCircle, 
  Loader2, 
  CheckCircle2,
  Info
} from 'lucide-react';
import { formatCurrency } from '@/services/paymentService';

interface StripePaymentFormProps {
  amount: number;
  currency?: string;
  orderId: string;
  clientSecret?: string;
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
  onCancel: () => void;
}

// Stripe public key (should be in environment variables)
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || 'pk_test_mock_key';

export function StripePaymentForm({
  amount,
  currency = 'mxn',
  orderId,
  clientSecret: _clientSecret,
  onPaymentSuccess,
  onPaymentError,
  onCancel,
}: StripePaymentFormProps) {
  // Stripe state - kept for future Stripe Elements integration
  const [_stripe] = useState<Stripe | null>(null);
  const [_elements] = useState<StripeElements | null>(null);
  const [_cardElement] = useState<StripeCardElement | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Card completion state - kept for future Stripe Elements integration
  const [_cardComplete] = useState(false);
  
  // Card details state (for mock implementation)
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  
  // Load Stripe
  useEffect(() => {
    const loadStripeLibrary = async () => {
      try {
        const stripeInstance = await loadStripe(STRIPE_PUBLIC_KEY);
        // Store stripe instance for future use
        void stripeInstance;
      } catch (err) {
        console.error('Failed to load Stripe:', err);
        // Continue with mock implementation
      }
    };
    
    loadStripeLibrary();
  }, []);
  
  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    return parts.length ? parts.join(' ') : v;
  };
  
  // Format expiry date (MM/YY)
  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };
  
  // Validate card details
  const validateCardDetails = (): boolean => {
    if (!cardholderName.trim()) {
      setError('Por favor ingresa el nombre del titular');
      return false;
    }
    
    const cardNum = cardNumber.replace(/\s/g, '');
    if (cardNum.length < 13 || cardNum.length > 19) {
      setError('Número de tarjeta inválido');
      return false;
    }
    
    const expiryParts = expiry.split('/');
    if (expiryParts.length !== 2) {
      setError('Fecha de expiración inválida');
      return false;
    }
    
    const month = parseInt(expiryParts[0], 10);
    // Note: year is intentionally unused in this mock validation
    
    if (month < 1 || month > 12) {
      setError('Mes de expiración inválido');
      return false;
    }
    
    if (cvc.length < 3 || cvc.length > 4) {
      setError('CVC inválido');
      return false;
    }
    
    return true;
  };
  
  // Handle payment submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!validateCardDetails()) {
      return;
    }
    
    setLoading(true);
    
    try {
      // In production, this would use Stripe.js to confirm the payment
      // const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      //   payment_method: {
      //     card: cardElement,
      //     billing_details: { name: cardholderName }
      //   }
      // });
      
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate success (in production, check paymentIntent.status)
      const mockPaymentIntentId = `pi_${Math.random().toString(36).substring(2, 15)}`;
      
      // 90% success rate for testing
      if (Math.random() > 0.1) {
        onPaymentSuccess(mockPaymentIntentId);
      } else {
        throw new Error('Tu tarjeta fue rechazada. Intenta con otra tarjeta.');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error al procesar el pago';
      setError(errorMessage);
      onPaymentError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  // Get card type from number
  const getCardType = (number: string): string => {
    const cardNum = number.replace(/\s/g, '');
    if (/^4/.test(cardNum)) return 'visa';
    if (/^5[1-5]/.test(cardNum)) return 'mastercard';
    if (/^3[47]/.test(cardNum)) return 'amex';
    return 'unknown';
  };
  
  const cardType = getCardType(cardNumber);
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Información de Pago
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Lock className="h-3 w-3 mr-1" />
              Seguro
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Order Summary */}
          <div className="bg-muted/50 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Total a pagar:</span>
              <span className="text-2xl font-bold text-primary">
                {formatCurrency(amount, currency.toUpperCase())}
              </span>
            </div>
            <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
              <Info className="h-3 w-3" />
              <span>Pedido #{orderId.substring(0, 8)}</span>
            </div>
          </div>
          
          {/* Accepted Cards */}
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs text-muted-foreground">Aceptamos:</span>
            <div className="flex gap-2">
              <div className={`w-10 h-6 rounded border flex items-center justify-center text-xs font-bold ${cardType === 'visa' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                VISA
              </div>
              <div className={`w-10 h-6 rounded border flex items-center justify-center text-xs font-bold ${cardType === 'mastercard' ? 'bg-red-50 border-red-300 text-red-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                MC
              </div>
              <div className={`w-10 h-6 rounded border flex items-center justify-center text-xs font-bold ${cardType === 'amex' ? 'bg-blue-50 border-blue-300 text-blue-600' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                AMEX
              </div>
            </div>
          </div>
          
          {/* Cardholder Name */}
          <div className="space-y-2">
            <Label htmlFor="cardholder-name">Nombre del titular</Label>
            <Input
              id="cardholder-name"
              placeholder="Como aparece en la tarjeta"
              value={cardholderName}
              onChange={(e) => setCardholderName(e.target.value)}
              disabled={loading}
            />
          </div>
          
          {/* Card Number */}
          <div className="space-y-2">
            <Label htmlFor="card-number">Número de tarjeta</Label>
            <div className="relative">
              <Input
                id="card-number"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                maxLength={19}
                disabled={loading}
                className="pr-10"
              />
              {cardType !== 'unknown' && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                </div>
              )}
            </div>
          </div>
          
          {/* Expiry and CVC */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="expiry">Fecha de expiración</Label>
              <Input
                id="expiry"
                placeholder="MM/YY"
                value={expiry}
                onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                maxLength={5}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="cvc">CVC</Label>
              <Input
                id="cvc"
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value.replace(/\D/g, '').substring(0, 4))}
                maxLength={4}
                disabled={loading}
              />
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}
          
          <Separator className="my-4" />
          
          {/* Security Info */}
          <div className="flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <Shield className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-700">
              <p className="font-medium">Tu información está protegida</p>
              <p className="text-blue-600 mt-1">
                Utilizamos encriptación SSL y cumplimos con los estándares PCI-DSS.
                No almacenamos los datos de tu tarjeta.
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={loading}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Procesando...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Pagar {formatCurrency(amount, currency.toUpperCase())}
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default StripePaymentForm;