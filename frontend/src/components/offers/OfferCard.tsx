import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { Offer } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface OfferCardProps {
  offer: Offer;
  index?: number;
}

export const OfferCard = ({ offer, index = 0 }: OfferCardProps) => {
  const { user, isAuthenticated } = useAuth();
  // Check if saved. User.savedOffers might be objects (populated) or strings (ids)
  const isInitiallySaved = user?.savedOffers?.some((saved: any) =>
    (typeof saved === 'string' ? saved : saved._id) === offer.id
  ) || false;

  const [isSaved, setIsSaved] = useState(isInitiallySaved);

  useEffect(() => {
    // Update state if user changes or reloads
    const currentlySaved = user?.savedOffers?.some((saved: any) =>
      (typeof saved === 'string' ? saved : saved._id) === offer.id
    ) || false;
    setIsSaved(currentlySaved);
  }, [user, offer.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const handleToggleSave = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent Link navigation
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.error("Please login to save offers");
      return;
    }

    // Optimistic Update
    const newState = !isSaved;
    setIsSaved(newState);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/offers/${offer.id}/save`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (!res.ok) throw new Error('Failed to save');

      const data = await res.json();
      toast.success(data.message);
    } catch (err) {
      setIsSaved(!newState); // Revert on error
      toast.error("Something went wrong");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="relative group"
    >
      <Link to={`/offer/${offer.id}`} className="block h-full">
        {/* Moved container styling inside to allow absolute positioning of button outside if needed, 
          but here we want button inside the card but on top of Link. 
          Actually, putting button inside Link requires e.preventDefault() which we did. 
      */}
        <div className="bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 group-hover:-translate-y-1 h-full flex flex-col">
          {/* Image */}
          <div className="relative h-48 overflow-hidden shrink-0">
            <img
              src={offer.shopImage}
              alt={offer.shopName}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            {/* Discount Badge */}
            <div className="absolute top-3 left-3 z-10">
              <div className="bg-primary text-primary-foreground px-3 py-1.5 rounded-lg font-bold text-lg shadow-lg">
                {offer.discountValue}
                {(offer.discountType?.toLowerCase().includes('percentage') || offer.discountType?.toLowerCase().includes('percent')) && ' OFF'}
              </div>
            </div>

            {/* Save Button (Top Right) */}
            <div className="absolute top-3 right-3 z-20">
              <Button
                variant="secondary"
                size="icon"
                className={`rounded-full shadow-md w-8 h-8 ${isSaved ? 'bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600' : 'bg-background/80 hover:bg-background'}`}
                onClick={handleToggleSave}
              >
                <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
              </Button>
            </div>

            {/* Featured Badge (Below Save Button if both exist, or just positioned) */}
            {offer.isFeatured && (
              <div className="absolute top-12 right-3 z-10">
                <Badge variant="secondary" className="bg-warning text-warning-foreground font-semibold shadow-sm">
                  Featured
                </Badge>
              </div>
            )}

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent pointer-events-none" />

            {/* Shop Info Overlay */}
            <div className="absolute bottom-3 left-3 right-3">
              <div className="flex items-center gap-3">
                <img
                  src={offer.shopLogo}
                  alt={offer.shopName}
                  className="w-10 h-10 rounded-lg object-cover border-2 border-background"
                />
                <div>
                  <h3 className="text-background font-semibold text-sm line-clamp-1">
                    {offer.shopName}
                  </h3>
                  <div className="flex items-center gap-1 text-background/80 text-xs">
                    <MapPin className="w-3 h-3" />
                    {offer.area}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 flex flex-col flex-grow">
            <p className="text-muted-foreground text-sm line-clamp-2 mb-3 flex-grow">
              {offer.description}
            </p>
            <div className="flex items-center justify-between mt-auto">
              <div className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <Calendar className="w-3.5 h-3.5" />
                <span>Valid till {formatDate(offer.validTill)}</span>
              </div>
              <div className="flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                View
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
