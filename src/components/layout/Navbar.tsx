import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingBag, 
  Search, 
  User, 
  ShoppingCart, 
  Menu, 
  X, 
  ChevronDown,
  LogOut,
  Store,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/stores/authStore';
import { useCartStore } from '@/stores/cartStore';
import { categories } from '@/data/categories';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  
  const { user, signOut, hasRole } = useAuthStore();
  const { getTotalItems, toggleCart } = useCartStore();
  const cartItemCount = getTotalItems();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl shadow-lg py-2'
          : 'bg-white py-4'
      }`}
    >
      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2 group"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-violet-600 to-violet-800 rounded-xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <span className={`font-bold text-xl text-gray-900 transition-all duration-300 ${isScrolled ? 'hidden lg:block' : ''}`}>
              MarketHub
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-violet-600 transition-colors" />
              <Input
                type="search"
                placeholder="Buscar productos, marcas y más..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-gray-100 border-0 rounded-xl focus:bg-white focus:ring-2 focus:ring-violet-500/20 transition-all duration-300"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 bg-violet-600 text-white rounded-lg opacity-0 group-focus-within:opacity-100 transition-opacity hover:bg-violet-700"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            {/* Cart Button */}
            <button
              onClick={toggleCart}
              className="relative p-2.5 text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-xl transition-all duration-300"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-violet-600 text-white text-xs font-medium rounded-full flex items-center justify-center animate-bounce">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-2 p-1.5 pr-3 rounded-xl hover:bg-gray-100 transition-colors">
                    <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-violet-700 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user.first_name?.[0]}{user.last_name?.[0]}
                      </span>
                    </div>
                    <span className="hidden sm:block text-sm font-medium text-gray-700">
                      {user.first_name}
                    </span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium">{user.first_name} {user.last_name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate('/profile')}>
                    <User className="w-4 h-4 mr-2" />
                    Mi Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate('/orders')}>
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Mis Pedidos
                  </DropdownMenuItem>
                  {hasRole(['company_admin', 'product_manager', 'inventory_manager']) && (
                    <DropdownMenuItem onClick={() => navigate('/seller/dashboard')}>
                      <Store className="w-4 h-4 mr-2" />
                      Panel de Vendedor
                    </DropdownMenuItem>
                  )}
                  {hasRole(['super_admin']) && (
                    <DropdownMenuItem onClick={() => navigate('/admin/dashboard')}>
                      <LayoutDashboard className="w-4 h-4 mr-2" />
                      Admin Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => navigate('/login')}
                  className="hidden sm:flex"
                >
                  Iniciar Sesión
                </Button>
                <Button
                  onClick={() => navigate('/register')}
                  className="bg-violet-600 hover:bg-violet-700"
                >
                  Registrarse
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2.5 text-gray-700 hover:bg-gray-100 rounded-xl transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Navigation - Desktop */}
      <nav className="hidden lg:block border-t border-gray-100 mt-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-2 overflow-x-auto scrollbar-hide">
            <Link
              to="/products"
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all duration-200 whitespace-nowrap"
            >
              Todos
            </Link>
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/category/${category.slug}`}
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-violet-600 hover:bg-violet-50 rounded-lg transition-all duration-200 whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          {/* Mobile Search */}
          <div className="p-4">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10"
                />
              </div>
            </form>
          </div>

          {/* Mobile Categories */}
          <div className="px-4 pb-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Categorías
            </p>
            <div className="space-y-1">
              <Link
                to="/products"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-lg"
              >
                Todos los Productos
              </Link>
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-2 text-gray-700 hover:bg-violet-50 hover:text-violet-600 rounded-lg"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
