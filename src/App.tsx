import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { Home } from '@/pages/Home';
import { Login } from '@/pages/Login';
import { Register } from '@/pages/Register';
import { ProductDetail } from '@/pages/ProductDetail';
import { Products } from '@/pages/Products';
import { Cart } from '@/pages/Cart';
import { Checkout } from '@/pages/Checkout';
import { Profile } from '@/pages/Profile';
import { Orders } from '@/pages/Orders';
import { Wishlist } from '@/pages/Wishlist';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { FAQ } from '@/pages/FAQ';
import { Terms } from '@/pages/Terms';
import { Privacy } from '@/pages/Privacy';
import { Cookies } from '@/pages/Cookies';
import { Security } from '@/pages/Security';
import { Careers } from '@/pages/Careers';
import { Press } from '@/pages/Press';
import { Help } from '@/pages/Help';
import { Returns } from '@/pages/Returns';
import { Shipping } from '@/pages/Shipping';
import { NotFound } from '@/pages/NotFound';
import { AdminDashboard } from '@/pages/admin/Dashboard';
import { SellerDashboard } from '@/pages/seller/Dashboard';
import { EmailVerification } from '@/pages/EmailVerification';
import { AdminCompanies } from '@/pages/admin/Companies';
import { AdminUsers } from '@/pages/admin/Users';
import { AdminOrders } from '@/pages/admin/Orders';
import { AdminProducts } from '@/pages/admin/Products';
import { AdminReports } from '@/pages/admin/Reports';
import { AdminSettings } from '@/pages/admin/Settings';
import { SellerRegister } from '@/pages/SellerRegister';
import { useAuthStore } from '@/stores/authStore';
import { Spinner } from '@/components/ui/spinner';

// Lazy load components for code splitting
const SellerProducts = lazy(() => import('@/pages/seller/Products').then(m => ({ default: m.SellerProducts })));
const SellerOrders = lazy(() => import('@/pages/seller/Orders').then(m => ({ default: m.SellerOrders })));

// Loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner className="w-10 h-10 text-violet-600" />
    </div>
  );
}

// Protected Route Component
function ProtectedRoute({ 
  children, 
  requiredRoles 
}: { 
  children: React.ReactNode; 
  requiredRoles?: string[];
}) {
  const { isAuthenticated, hasRole } = useAuthStore();

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRoles && !hasRole(requiredRoles as any)) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

// Public Route - redirects to home if already logged in
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated()) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/category/:slug" element={<Products />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/search" element={<Products />} />
        
        {/* Info Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/security" element={<Security />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/press" element={<Press />} />
        <Route path="/help" element={<Help />} />
        <Route path="/returns" element={<Returns />} />
        <Route path="/shipping" element={<Shipping />} />

        {/* Auth Routes */}
        <Route 
          path="/login" 
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } 
        />
        <Route 
          path="/register" 
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          } 
        />
        <Route 
          path="/verification" 
          element={
            <PublicRoute>
              <EmailVerification />
            </PublicRoute>
          } 
        />

        {/* Cart & Checkout */}
        <Route path="/cart" element={<Cart />} />
        <Route 
          path="/checkout" 
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } 
        />

        {/* User Routes */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/orders" 
          element={
            <ProtectedRoute>
              <Orders />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/wishlist" 
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          } 
        />

        {/* Admin Routes */}
        <Route 
          path="/admin/dashboard" 
          element={
            <ProtectedRoute requiredRoles={['super_admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/orders" 
          element={
            <ProtectedRoute requiredRoles={['super_admin']}>
              <AdminOrders />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/products" 
          element={
            <ProtectedRoute requiredRoles={['super_admin']}>
              <AdminProducts />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/companies" 
          element={
            <ProtectedRoute requiredRoles={['super_admin']}>
              <AdminCompanies />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/users" 
          element={
            <ProtectedRoute requiredRoles={['super_admin']}>
              <AdminUsers />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/reports" 
          element={
            <ProtectedRoute requiredRoles={['super_admin']}>
              <AdminReports />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/admin/settings" 
          element={
            <ProtectedRoute requiredRoles={['super_admin']}>
              <AdminSettings />
            </ProtectedRoute>
          } 
        />

        {/* Seller Routes */}
        <Route 
          path="/seller/dashboard" 
          element={
            <ProtectedRoute requiredRoles={['company_admin', 'product_manager', 'inventory_manager']}>
              <SellerDashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/seller/products" 
          element={
            <ProtectedRoute requiredRoles={['company_admin', 'product_manager', 'inventory_manager']}>
              <Suspense fallback={<PageLoader />}>
                <SellerProducts />
              </Suspense>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/seller/orders" 
          element={
            <ProtectedRoute requiredRoles={['company_admin', 'product_manager', 'inventory_manager']}>
              <Suspense fallback={<PageLoader />}>
                <SellerOrders />
              </Suspense>
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/seller/register" 
          element={<SellerRegister />}
        />

        {/* 404 Page */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
