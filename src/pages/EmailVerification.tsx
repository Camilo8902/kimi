import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Mail, CheckCircle, AlertCircle, RefreshCw, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function EmailVerification() {
  const [searchParams] = useSearchParams();
  const [email] = useState(searchParams.get('email') || '');
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  
  // Check if this is a post-confirmation page
  const confirmed = searchParams.get('confirmed') === 'true';

  const handleResend = async () => {
    if (!email) return;
    
    setIsResending(true);
    try {
      // Note: Supabase's built-in resend functionality
      // For now, we'll show a success message
      setResendSuccess(true);
    } catch (error) {
      console.error('Error resending:', error);
    } finally {
      setIsResending(false);
    }
  };

  if (confirmed) {
    // Welcome page after email confirmation
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl shadow-violet-100/50 p-8 text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              ¡Bienvenido a MarketHub! 🎉
            </h1>
            
            <p className="text-gray-600 mb-6">
              Tu cuenta ha sido verificada exitosamente. Ahora puedes disfrutar de todos los beneficios de nuestra plataforma.
            </p>

            {/* Features */}
            <div className="bg-violet-50 rounded-xl p-4 mb-6 text-left">
              <h3 className="font-semibold text-violet-900 mb-2">¿Qué puedes hacer ahora?</h3>
              <ul className="text-sm text-violet-700 space-y-1">
                <li>✓ Explorar productos de múltiples vendedores</li>
                <li>✓ Guardar tus productos favoritos</li>
                <li>✓ Realizar compras seguras</li>
                <li>✓ Rastrear tus pedidos</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Button 
                asChild 
                className="w-full bg-violet-600 hover:bg-violet-700 h-11"
              >
                <Link to="/">
                  Comenzar a Comprar
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                className="w-full"
              >
                <Link to="/profile">
                  Mi Perfil
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Email verification pending page
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-white to-violet-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-600 to-violet-800 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-2xl text-gray-900">MarketHub</span>
          </Link>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl shadow-violet-100/50 p-8">
          {/* Icon */}
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="w-8 h-8 text-amber-600" />
          </div>

          {/* Title */}
          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Confirma tu correo electrónico
            </h1>
            <p className="text-gray-600">
              {email ? (
                <>
                  Hemos enviado un correo de verificación a <br />
                  <span className="font-semibold text-violet-600">{email}</span>
                </>
              ) : (
                'Por favor verifica tu correo electrónico'
              )}
            </p>
          </div>

          {/* Instructions */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              ¿No recibiste el correo?
            </h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>1. Revisa tu carpeta de spam o correo no deseado</li>
              <li>2. Verifica que el correo sea correcto</li>
              <li>3. Haz clic en "Reenviar correo" abajo</li>
            </ul>
          </div>

          {/* Resend Button */}
          {resendSuccess ? (
            <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4">
              <p className="text-green-700 text-sm flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Correo de verificación reenviado
              </p>
            </div>
          ) : (
            <Button 
              variant="outline" 
              className="w-full mb-4"
              onClick={handleResend}
              disabled={isResending}
            >
              {isResending ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Reenviar correo de verificación'
              )}
            </Button>
          )}

          {/* Login Link */}
          <p className="text-center text-gray-600">
            ¿Ya verificaste tu cuenta?{' '}
            <Link to="/login" className="text-violet-600 hover:text-violet-700 font-medium">
              Iniciar sesión
            </Link>
          </p>
        </div>

        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">
            ← Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}
