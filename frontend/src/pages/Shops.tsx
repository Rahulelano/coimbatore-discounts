import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Link, useParams } from 'react-router-dom';
import { MapPin, ArrowRight, Store, ArrowLeft } from 'lucide-react';
import { useOffers } from '@/context/OffersContext';
import { OfferCard } from '@/components/offers/OfferCard';
import { Button } from '@/components/ui/button';

const Shops = () => {
  const { offers } = useOffers();
  const { id } = useParams();

  // Get unique shops from offers
  const uniqueShops = offers.reduce((acc, offer) => {
    // Check if shop already exists in accumulator
    const existingShopIndex = acc.findIndex(shop => shop.name === offer.shopName);

    if (existingShopIndex === -1) {
      // Add new shop
      acc.push({
        id: offer.shopName, // Using shopName as ID since we don't have a dedicated shop ID
        name: offer.shopName,
        logo: offer.shopLogo,
        image: offer.shopImage,
        area: offer.area,
        category: offer.category,
        offerCount: 1,
      });
    } else {
      // Increment offer count for existing shop
      acc[existingShopIndex].offerCount += 1;
    }
    return acc;
  }, [] as { id: string; name: string; logo: string; image: string; area: string; category: string; offerCount: number }[]);

  // If a specific shop is selected
  if (id) {
    const shopName = decodeURIComponent(id);
    const shopOffers = offers.filter(offer => offer.shopName === shopName);
    const shopInfo = uniqueShops.find(s => s.name === shopName);

    return (
      <Layout>
        <section className="bg-gradient-to-br from-accent via-background to-background py-12 md:py-16">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <Button asChild variant="ghost" className="mb-6 pl-0 hover:bg-transparent hover:text-primary">
                <Link to="/shops" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Shops
                </Link>
              </Button>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-background rounded-2xl p-1 shadow-sm border border-border">
                  <img
                    src={shopInfo?.logo || "https://placehold.co/100"}
                    alt={shopName}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div>
                  <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">
                    {shopName}
                  </h1>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    {shopInfo?.area || "Coimbatore"}
                  </div>
                </div>
              </div>
              <p className="text-muted-foreground text-lg">
                Found {shopOffers.length} active offers from {shopName}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-10 bg-background">
          <div className="container mx-auto px-4">
            {shopOffers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {shopOffers.map((offer, index) => (
                  <OfferCard key={offer.id} offer={offer} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <Store className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No active offers</h3>
                <p className="text-muted-foreground">This shop doesn't have any active offers at the moment.</p>
              </div>
            )}
          </div>
        </section>
      </Layout>
    );
  }

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
                <Store className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Shops & <span className="text-primary">Brands</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Discover local businesses offering exclusive deals in Coimbatore
            </p>
          </motion.div>
        </div>
      </section>

      {/* Shops Grid */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {uniqueShops.map((shop, index) => (
              <motion.div
                key={shop.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Link
                  to={`/shops/${encodeURIComponent(shop.name)}`}
                  className="group block bg-card rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={shop.image}
                      alt={shop.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3">
                      <img
                        src={shop.logo}
                        alt={shop.name}
                        className="w-12 h-12 rounded-xl object-cover border-2 border-background shadow-md"
                      />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-1">
                      {shop.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-muted-foreground text-sm mb-3">
                      <MapPin className="w-4 h-4" />
                      {shop.area}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-primary font-medium">
                        {shop.offerCount} offer{shop.offerCount > 1 ? 's' : ''}
                      </span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Shops;
