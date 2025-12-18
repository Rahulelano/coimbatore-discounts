import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { UpcomingOfferCard } from '@/components/offers/UpcomingOfferCard';
import { useOffers } from '@/context/OffersContext';
import { Clock, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const UpcomingOffers = () => {
  const { offers } = useOffers();
  const upcomingOffers = offers.filter(offer => offer.isUpcoming).sort((a, b) => a.priority - b.priority);

  const handleEnableNotifications = () => {
    toast.success("Notifications enabled for all upcoming offers!");
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-accent via-background to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Upcoming <span className="text-primary">Discounts</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Be the first to know when these amazing deals go live. Set reminders and never miss out!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Offers Grid */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          {upcomingOffers.length > 0 ? (
            <>
              {/* Notify All Banner */}
              <div className="bg-accent rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                    <Bell className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Get notified for all upcoming discounts</h3>
                    <p className="text-sm text-muted-foreground">Never miss a deal again</p>
                  </div>
                </div>
                <Button variant="hero" onClick={handleEnableNotifications}>
                  <Bell className="w-4 h-4" />
                  Enable Notifications
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingOffers.map((offer, index) => (
                  <UpcomingOfferCard key={offer.id} offer={offer} index={index} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">No upcoming discounts</h3>
              <p className="text-muted-foreground">Check back soon for new deals!</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default UpcomingOffers;
