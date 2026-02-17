import { useState } from 'react';
import { Star, ThumbsUp, Flag, CheckCircle } from 'lucide-react';
import { Button } from './button';
import { Textarea } from './textarea';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './dialog';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  helpful: number;
  verified: boolean;
  images?: string[];
}

interface ReviewSystemProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  onSubmitReview?: (review: Omit<Review, 'id' | 'date' | 'helpful'>) => void;
  onMarkHelpful?: (reviewId: string) => void;
}

export function ReviewSystem({
  reviews,
  averageRating,
  totalReviews,
  onSubmitReview,
  onMarkHelpful,
}: ReviewSystemProps) {
  const { user, isAuthenticated } = useAuthStore();
  const { addToast } = useUIStore();
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 0,
    title: '',
    content: '',
  });
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleSubmit = () => {
    if (!isAuthenticated()) {
      addToast({
        type: 'error',
        title: 'Inicia sesión',
        message: 'Debes iniciar sesión para escribir una reseña',
      });
      return;
    }

    if (newReview.rating === 0) {
      addToast({
        type: 'error',
        title: 'Calificación requerida',
        message: 'Por selecciona una calificación',
      });
      return;
    }

    if (newReview.content.length < 10) {
      addToast({
        type: 'error',
        title: 'Reseña muy corta',
        message: 'La reseña debe tener al menos 10 caracteres',
      });
      return;
    }

    onSubmitReview?.({
      userId: user?.id || '',
      userName: `${user?.first_name} ${user?.last_name}`,
      userAvatar: user?.avatar_url,
      rating: newReview.rating,
      title: newReview.title,
      content: newReview.content,
      verified: true,
    });

    setNewReview({ rating: 0, title: '', content: '' });
    setShowWriteReview(false);

    addToast({
      type: 'success',
      title: 'Reseña enviada',
      message: 'Tu reseña ha sido enviada exitosamente',
    });
  };

  const handleHelpful = (reviewId: string) => {
    onMarkHelpful?.(reviewId);
    addToast({
      type: 'success',
      title: 'Gracias',
      message: 'Tu opinión ha sido registrada',
    });
  };

  // Calculate rating distribution
  const ratingCounts = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((r) => r.rating === rating).length,
    percentage: totalReviews > 0 
      ? Math.round((reviews.filter((r) => r.rating === rating).length / totalReviews) * 100) 
      : 0,
  }));

  return (
    <div className="space-y-8">
      {/* Rating Summary */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-4">
              <span className="text-5xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
              <div>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= Math.round(averageRating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-1">Basado en {totalReviews} reseñas</p>
              </div>
            </div>
            <Button
              className="mt-4 bg-violet-600 hover:bg-violet-700"
              onClick={() => setShowWriteReview(true)}
            >
              Escribir Reseña
            </Button>
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingCounts.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-3">
                <span className="text-sm w-3">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-yellow-400 rounded-full transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-500 w-10 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="text-lg font-semibold">Reseñas de Clientes</h3>
        
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">Aún no hay reseñas. ¡Sé el primero en opinar!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-0">
                {/* Review Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={review.userAvatar} />
                      <AvatarFallback className="bg-violet-100 text-violet-600">
                        {review.userName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{review.userName}</p>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-0.5">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        {review.verified && (
                          <span className="text-xs text-green-600 flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Compra verificada
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString('es-ES')}
                  </span>
                </div>

                {/* Review Content */}
                <div className="ml-13 pl-13">
                  {review.title && (
                    <h4 className="font-semibold mb-2">{review.title}</h4>
                  )}
                  <p className="text-gray-600 mb-4">{review.content}</p>

                  {/* Review Images */}
                  {review.images && review.images.length > 0 && (
                    <div className="flex gap-2 mb-4">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}

                  {/* Review Actions */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleHelpful(review.id)}
                      className="flex items-center gap-2 text-sm text-gray-500 hover:text-violet-600 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4" />
                      Útil ({review.helpful})
                    </button>
                    <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-600 transition-colors">
                      <Flag className="w-4 h-4" />
                      Reportar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Write Review Dialog */}
      <Dialog open={showWriteReview} onOpenChange={setShowWriteReview}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Escribir Reseña</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            {/* Rating */}
            <div>
              <label className="block text-sm font-medium mb-2">Calificación</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1"
                  >
                    <Star
                      className={`w-8 h-8 transition-colors ${
                        star <= (hoveredRating || newReview.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium mb-2">Título (opcional)</label>
              <input
                type="text"
                value={newReview.title}
                onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                placeholder="Resume tu experiencia"
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium mb-2">Tu reseña</label>
              <Textarea
                value={newReview.content}
                onChange={(e) => setNewReview({ ...newReview, content: e.target.value })}
                placeholder="¿Qué te pareció el producto?"
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setShowWriteReview(false)}
              >
                Cancelar
              </Button>
              <Button
                className="flex-1 bg-violet-600 hover:bg-violet-700"
                onClick={handleSubmit}
              >
                Enviar Reseña
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
