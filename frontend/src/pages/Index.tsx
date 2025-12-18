import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Search, MapPin, TrendingUp, Users, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { FeaturedOfferCard } from '@/components/offers/FeaturedOfferCard';
import { OfferCard } from '@/components/offers/OfferCard';
import { UpcomingOfferCard } from '@/components/offers/UpcomingOfferCard';
import { CategoryCard } from '@/components/offers/CategoryCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useOffers } from '@/context/OffersContext';
import { useCategories } from '@/hooks/useCategories';

const Index = () => {
  const { offers } = useOffers();
  const { categories } = useCategories();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('All Areas');

  const featuredOffers = offers.filter(offer => offer.isFeatured && !offer.isUpcoming).sort((a, b) => a.priority - b.priority);
  const upcomingOffers = offers.filter(offer => offer.isUpcoming).sort((a, b) => a.priority - b.priority);
  const allOffers = offers.filter(offer => !offer.isUpcoming).sort((a, b) => a.priority - b.priority).slice(0, 6);

  const handleSearch = () => {
    navigate(`/discounts?search=${encodeURIComponent(searchQuery)}&area=${encodeURIComponent(selectedArea)}`);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-accent via-background to-background overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                #1 Local Discounts Platform in Coimbatore
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight"
            >
              Discover Amazing{' '}
              <span className="text-primary">Discounts</span>
              <br className="hidden md:block" />
              in Coimbatore
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto"
            >
              Your trusted platform for the best local discounts. Save more, support local businesses,
              and never miss an offer again.
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="max-w-2xl mx-auto mb-8"
            >
              <div className="flex flex-col sm:flex-row gap-3 bg-card p-3 rounded-2xl shadow-lg border border-border">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search for discounts, shops, or categories..."
                    className="pl-12 h-12 border-0 bg-transparent focus-visible:ring-0 text-base"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="relative flex-1 sm:flex-none">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <select
                      className="h-12 pl-9 pr-4 rounded-xl bg-secondary border-0 text-sm font-medium appearance-none cursor-pointer w-full sm:w-auto"
                      value={selectedArea}
                      onChange={(e) => setSelectedArea(e.target.value)}
                    >
                      <option>All Areas</option>
                      <option>RS Puram</option>
                      <option>Gandhipuram</option>
                      <option>Peelamedu</option>
                      <option>Saibaba Colony</option>
                    </select>
                  </div>
                  <Button variant="hero" size="lg" className="h-12 px-6" onClick={handleSearch}>
                    Search
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-8 md:gap-12"
            >
              {[
                { icon: ShoppingBag, value: '500+', label: 'Active Discounts' },
                { icon: Users, value: '10K+', label: 'Happy Users' },
                { icon: MapPin, value: '200+', label: 'Local Shops' },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div className="text-left">
                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Offers Slider */}
      <section className="py-16 md:py-20 bg-background overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Featured Discounts
              </h2>
              <p className="text-muted-foreground">
                Handpicked deals you shouldn't miss
              </p>
            </div>
            <Link to="/discounts" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              View All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Horizontal Scroll */}
          <div className="flex gap-6 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-hide">
            {featuredOffers.map((offer, index) => (
              <FeaturedOfferCard key={offer.id} offer={offer} index={index} />
            ))}
          </div>

          <div className="mt-6 text-center md:hidden">
            <Button asChild variant="outline">
              <Link to="/discounts">
                View All Discounts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              Browse by Category
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Find the perfect deal in your favorite category
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-4">
            {categories.map((category, index) => {
              const realCount = offers.filter(o => o.category === category.id && !o.isUpcoming).length;
              return (
                <CategoryCard
                  key={category.id}
                  category={{ ...category, offerCount: realCount }}
                  index={index}
                />
              );
            })}

            {categories.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground">
                No categories found. Check back later!
              </div>
            )}
          </div>
        </div>
      </section>

      {/* All Offers Grid */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                Latest Discounts
              </h2>
              <p className="text-muted-foreground">
                Fresh deals added daily
              </p>
            </div>
            <Link to="/discounts" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              See All
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allOffers.map((offer, index) => (
              <OfferCard key={offer.id} offer={offer} index={index} />
            ))}
          </div>

          <div className="mt-10 text-center">
            <Button asChild variant="hero" size="lg">
              <Link to="/discounts">
                Explore All Discounts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Upcoming Offers */}
      {upcomingOffers.length > 0 && (
        <section className="py-16 md:py-20 bg-accent/50">
          <div className="container mx-auto px-4">
            <div className="flex items-end justify-between mb-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Upcoming Discounts
                </h2>
                <p className="text-muted-foreground">
                  Get notified when these deals go live
                </p>
              </div>
              <Link to="/upcoming" className="hidden md:flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
                View All
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingOffers.map((offer, index) => (
                <UpcomingOfferCard key={offer.id} offer={offer} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-foreground text-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Have a Shop in Coimbatore?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-background/70 mb-8"
            >
              Reach thousands of local customers by listing your offers on coimbatore.discount.
              It's free and easy to get started!
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button asChild variant="hero" size="xl">
                <Link to="/submit-offer">
                  Submit Your Discount
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild variant="hero-outline" size="xl" className="border-background/30 text-background hover:bg-background hover:text-foreground">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
