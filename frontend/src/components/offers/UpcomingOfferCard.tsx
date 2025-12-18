import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Bell } from 'lucide-react';
import { motion } from 'framer-motion';
import { Offer } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface UpcomingOfferCardProps {
  offer: Offer;
  index?: number;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const UpcomingOfferCard = ({ offer, index = 0 }: UpcomingOfferCardProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isNotified, setIsNotified] = useState(false);

  const handleNotify = () => {
    setIsNotified(!isNotified);
    if (!isNotified) {
      toast.success(`You will be notified when ${offer.shopName}'s discount starts!`);
    } else {
      toast.info(`Notifications disabled for ${offer.shopName}`);
    }
  };

  useEffect(() => {
    const calculateTimeLeft = () => {
      const startDate = offer.startsOn ? new Date(offer.startsOn) : new Date();
      const difference = startDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [offer.startsOn]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      <div className="relative bg-card rounded-xl overflow-hidden shadow-card">
        {/* Overlay for upcoming */}
        <div className="absolute inset-0 bg-foreground/5 backdrop-blur-[1px] z-10 pointer-events-none" />

        {/* Image */}
        <div className="relative h-44 overflow-hidden grayscale-[30%]">
          <img
            src={offer.shopImage}
            alt={offer.shopName}
            className="w-full h-full object-cover"
          />
          {/* Discount Badge */}
          <div className="absolute top-3 left-3 z-20">
            <div className="bg-muted text-muted-foreground px-3 py-1.5 rounded-lg font-bold text-lg">
              {offer.discountValue}
              {offer.discountType === 'percentage' && ' OFF'}
            </div>
          </div>
          {/* Coming Soon Badge */}
          <div className="absolute top-3 right-3 z-20">
            <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide flex items-center gap-1.5 animate-pulse-red">
              <Clock className="w-3 h-3" />
              Coming Soon
            </div>
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
          {/* Shop Info Overlay */}
          <div className="absolute bottom-3 left-3 right-3 z-20">
            <div className="flex items-center gap-3">
              <img
                src={offer.shopLogo}
                alt={offer.shopName}
                className="w-10 h-10 rounded-lg object-cover border-2 border-background grayscale-[50%]"
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
        <div className="relative p-4 z-20">
          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
            {offer.description}
          </p>

          {/* Countdown Timer */}
          <div className="mb-4">
            <p className="text-xs text-muted-foreground mb-2">
              Starts on {offer.startsOn && formatDate(offer.startsOn)}
            </p>
            <div className="grid grid-cols-4 gap-2">
              {[
                { value: timeLeft.days, label: 'Days' },
                { value: timeLeft.hours, label: 'Hrs' },
                { value: timeLeft.minutes, label: 'Min' },
                { value: timeLeft.seconds, label: 'Sec' },
              ].map((item) => (
                <div key={item.label} className="bg-secondary rounded-lg p-2 text-center">
                  <div className="text-lg font-bold text-foreground">
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notify Button */}
          <Button
            variant={isNotified ? "secondary" : "outline"}
            className="w-full"
            size="sm"
            onClick={handleNotify}
          >
            <Bell className={`w-4 h-4 ${isNotified ? 'fill-current' : ''}`} />
            {isNotified ? 'Notified' : 'Notify Me'}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
