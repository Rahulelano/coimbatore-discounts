import { Link } from 'react-router-dom';
import { MapPin, Calendar, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { Offer } from '@/data/mockData';

interface FeaturedOfferCardProps {
  offer: Offer;
  index?: number;
}

export const FeaturedOfferCard = ({ offer, index = 0 }: FeaturedOfferCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="min-w-[300px] md:min-w-[350px] flex-shrink-0"
    >
      <Link to={`/offer/${offer.id}`} className="block group">
        <div className="relative bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-red transition-all duration-300 group-hover:-translate-y-2 border-2 border-transparent hover:border-primary/20">
          {/* Image Container */}
          <div className="relative h-52 overflow-hidden">
            <img
              src={offer.shopImage}
              alt={offer.shopName}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />

            {/* Featured Star */}
            <div className="absolute top-4 right-4 w-10 h-10 bg-warning rounded-full flex items-center justify-center shadow-lg animate-bounce-subtle">
              <Star className="w-5 h-5 text-warning-foreground fill-current" />
            </div>

            {/* Discount Badge */}
            <div className="absolute top-4 left-4">
              <div className="bg-primary text-primary-foreground px-4 py-2 rounded-xl font-bold text-xl shadow-lg">
                {offer.discountValue}
                {offer.discountType === 'percentage' && ' OFF'}
              </div>
            </div>

            {/* Shop Info */}
            <div className="absolute bottom-4 left-4 right-4">
              <div className="flex items-center gap-3 mb-2">
                <img
                  src={offer.shopLogo}
                  alt={offer.shopName}
                  className="w-12 h-12 rounded-xl object-cover border-2 border-background shadow-md"
                />
                <div>
                  <h3 className="text-background font-bold text-lg line-clamp-1">
                    {offer.shopName}
                  </h3>
                  <div className="flex items-center gap-1.5 text-background/80 text-sm">
                    <MapPin className="w-4 h-4" />
                    {offer.area}, Coimbatore
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <p className="text-muted-foreground text-sm line-clamp-2 mb-4 leading-relaxed">
              {offer.description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Calendar className="w-4 h-4" />
                <span>Till {formatDate(offer.validTill)}</span>
              </div>
              <div className="flex items-center gap-1.5 text-primary font-semibold group-hover:gap-2.5 transition-all">
                Get Discount
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
