import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { ArrowRight, Grid, ArrowLeft } from 'lucide-react';
import { useOffers } from '@/context/OffersContext';
import { OfferCard } from '@/components/offers/OfferCard';
import { Button } from '@/components/ui/button';
import { useCategories } from '@/hooks/useCategories';

const Categories = () => {
  const { id } = useParams();
  const { offers } = useOffers();
  const { categories } = useCategories();

  if (id) {
    const category = categories.find(c => c.id === id);
    const categoryName = category ? category.name : id.charAt(0).toUpperCase() + id.slice(1);

    // offer.category stores the ID (e.g., 'food', 'fashion')
    // id param is also the ID
    const categoryOffers = offers.filter(
      offer => offer.category === id && !offer.isUpcoming
    );

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
                <Link to="/categories" className="flex items-center gap-2">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Categories
                </Link>
              </Button>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <span className="text-2xl">{category?.icon || <Grid className="w-6 h-6 text-primary-foreground" />}</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  {categoryName} <span className="text-primary">Discounts</span>
                </h1>
              </div>
              <p className="text-muted-foreground text-lg">
                Found {categoryOffers.length} discounts in {categoryName}
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-10 bg-background">
          <div className="container mx-auto px-4">
            {categoryOffers.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryOffers.map((offer, index) => (
                  <OfferCard key={offer.id} offer={offer} index={index} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No active discounts found in this category.</p>
                <Button asChild variant="hero" className="mt-6">
                  <Link to="/categories">Browse other Categories</Link>
                </Button>
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
                <Grid className="w-6 h-6 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Browse <span className="text-primary">Categories</span>
              </h1>
            </div>
            <p className="text-muted-foreground text-lg">
              Find discounts in your favorite category
            </p>
          </motion.div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {categories.map((category, index) => {
              // Calculate real offer count dynamically by matching IDs
              const realCount = offers.filter(
                offer => offer.category === category.id && !offer.isUpcoming
              ).length;

              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <Link
                    to={`/categories/${category.id}`}
                    className="group block bg-card rounded-2xl p-6 shadow-soft hover:shadow-red transition-all duration-300 border-2 border-transparent hover:border-primary/20"
                  >
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-16 h-16 bg-accent rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                        {category.icon}
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {realCount} active discounts
                    </p>
                  </Link>
                </motion.div>
              );
            })}

            {categories.length === 0 && (
              <div className="col-span-full text-center py-10 text-muted-foreground">
                No categories found.
              </div>
            )}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Categories;
