import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  Shield, 
  RefreshCw,
  Minus,
  Plus,
  ChevronLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Navbar } from '@/components/layout/Navbar';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { Footer } from '@/components/layout/Footer';
import { LazyImage } from '@/components/ui/LazyImage';
import { ReviewSystem } from '@/components/ui/ReviewSystem';
import { products } from '@/data/products';
import { useCartStore } from '@/stores/cartStore';
import { useUIStore } from '@/stores/uiStore';

// Mock reviews data
const mockReviews = [
  {
    id: '1',
    userId: 'u1',
    userName: 'María García',
    rating: 5,
    title: 'Excelente producto',
    content: 'Me encantó este producto. La calidad es increíble y llegó muy rápido. Definitivamente lo recomendaría a todos.',
    date: '2024-01-10',
    helpful: 24,
    verified: true,
  },
  {
    id: '2',
    userId: 'u2',
    userName: 'Juan Pérez',
    rating: 4,
    title: 'Muy bueno',
    content: 'El producto cumple con lo prometido. Solo le doy 4 estrellas porque el empaque llegó un poco dañado, pero el producto está perfecto.',
    date: '2024-01-08',
    helpful: 12,
    verified: true,
  },
  {
    id: '3',
    userId: 'u3',
    userName: 'Ana Martínez',
    rating: 5,
    title: 'Superó mis expectativas',
    content: 'No esperaba tanta calidad por este precio. Definitivamente volveré a comprar. El envío fue rapidísimo.',
    date: '2024-01-05',
    helpful: 8,
    verified: true,
  },
];

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  
  const { addItem } = useCartStore();
  const { addToast } = useUIStore();

  const product = products.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Producto no encontrado
          </h1>
          <Button onClick={() => navigate('/products')}>
            Ver todos los productos
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = product.compare_at_price 
    ? Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100)
    : 0;

  const handleAddToCart = () => {
    addItem(product, quantity);
    addToast({
      type: 'success',
      title: 'Producto agregado',
      message: `${product.name} (${quantity}x) se agregó al carrito`,
    });
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    navigate('/checkout');
  };

  const handleShare = async () => {
    const url = window.location.origin + '/product/' + product.slug;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.short_description || product.description,
          url: url,
        });
      } catch (err) {
        // User cancelled share
      }
    } else {
      navigator.clipboard.writeText(url);
      addToast({
        type: 'success',
        title: 'Enlace copiado',
        message: 'El enlace del producto ha sido copiado al portapapeles',
      });
    }
  };

  const relatedProducts = products
    .filter((p) => p.category_id === product.category_id && p.id !== product.id)
    .slice(0, 4);

  const handleSubmitReview = (_review: any) => {
    addToast({
      type: 'success',
      title: 'Reseña enviada',
      message: 'Tu reseña ha sido enviada y está pendiente de aprobación',
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <CartDrawer />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-500 hover:text-violet-600 mb-6 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver
          </button>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square bg-gray-100 rounded-2xl overflow-hidden">
                <LazyImage
                  src={product.images?.[selectedImage]?.url || '/placeholder-product.png'}
                  alt={product.name}
                  className="w-full h-full"
                />
              </div>

              {/* Thumbnails */}
              {product.images && product.images.length > 1 && (
                <div className="flex gap-3">
                  {product.images.map((image, index) => (
                    <button
                      key={image.id}
                      onClick={() => setSelectedImage(index)}
                      className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === index
                          ? 'border-violet-600 ring-2 ring-violet-200'
                          : 'border-transparent hover:border-gray-300'
                      }`}
                    >
                      <LazyImage
                        src={image.url}
                        alt={image.alt || product.name}
                        className="w-full h-full"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand & Badges */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-violet-600 uppercase tracking-wider">
                  {product.company?.name}
                </span>
                {discount > 0 && (
                  <Badge className="bg-red-500 text-white">
                    -{discount}%
                  </Badge>
                )}
                {product.featured && (
                  <Badge className="bg-violet-600 text-white">
                    Destacado
                  </Badge>
                )}
              </div>

              {/* Name */}
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating_average)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating_average} ({product.rating_count.toLocaleString()} reseñas)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-violet-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.compare_at_price && (
                  <span className="text-xl text-gray-400 line-through">
                    ${product.compare_at_price.toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>

              {/* Quantity */}
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Cantidad:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:border-violet-500 hover:text-violet-600 transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center border border-gray-200 rounded-lg hover:border-violet-500 hover:text-violet-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  size="lg"
                  className="flex-1 bg-violet-600 hover:bg-violet-700 h-14"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Agregar al Carrito
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="flex-1 h-14 border-2 border-violet-600 text-violet-600 hover:bg-violet-50"
                  onClick={handleBuyNow}
                >
                  Comprar Ahora
                </Button>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all ${
                    isWishlisted
                      ? 'border-red-200 bg-red-50 text-red-600'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                  {isWishlisted ? 'En lista de deseos' : 'Agregar a deseos'}
                </button>
                <button 
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                >
                  <Share2 className="w-5 h-5" />
                  Compartir
                </button>
              </div>

              <Separator />

              {/* Features */}
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Envío Gratis</p>
                    <p className="text-xs text-gray-500">En compras +$50</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Pago Seguro</p>
                    <p className="text-xs text-gray-500">100% protegido</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                    <RefreshCw className="w-5 h-5 text-violet-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Garantía</p>
                    <p className="text-xs text-gray-500">30 días</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b rounded-none h-auto p-0 bg-transparent">
                <TabsTrigger 
                  value="description" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-violet-600 data-[state=active]:bg-transparent py-4"
                >
                  Descripción
                </TabsTrigger>
                <TabsTrigger 
                  value="specs"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-violet-600 data-[state=active]:bg-transparent py-4"
                >
                  Especificaciones
                </TabsTrigger>
                <TabsTrigger 
                  value="reviews"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-violet-600 data-[state=active]:bg-transparent py-4"
                >
                  Reseñas ({product.rating_count})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <div className="prose max-w-none">
                  <p className="text-gray-600 leading-relaxed">
                    {product.description}
                  </p>
                  <p className="text-gray-600 leading-relaxed mt-4">
                    Este producto ha sido cuidadosamente seleccionado para ofrecerte la mejor calidad 
                    y experiencia de uso. Todos nuestros productos pasan por un riguroso control de 
                    calidad antes de ser enviados.
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="specs" className="mt-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <dt className="text-sm text-gray-500">SKU</dt>
                      <dd className="font-medium">{product.sku}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Marca</dt>
                      <dd className="font-medium">{product.company?.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Categoría</dt>
                      <dd className="font-medium">{product.category?.name}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-gray-500">Stock</dt>
                      <dd className="font-medium">{product.quantity} unidades</dd>
                    </div>
                  </dl>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <ReviewSystem
                  reviews={mockReviews}
                  averageRating={product.rating_average}
                  totalReviews={product.rating_count}
                  onSubmitReview={handleSubmitReview}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Productos Relacionados
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((related) => (
                  <div
                    key={related.id}
                    className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all"
                  >
                    <Link to={`/product/${related.slug}`}>
                      <div className="aspect-square bg-gray-100 overflow-hidden">
                        <LazyImage
                          src={related.images?.[0]?.url || '/placeholder-product.png'}
                          alt={related.name}
                          className="w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        <p className="text-xs text-violet-600 font-medium mb-1">
                          {related.company?.name}
                        </p>
                        <h3 className="font-medium text-gray-900 line-clamp-2 mb-2">
                          {related.name}
                        </h3>
                        <p className="font-bold text-violet-600">
                          ${related.price.toFixed(2)}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
