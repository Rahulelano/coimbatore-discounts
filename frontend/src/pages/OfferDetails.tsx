import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { categories } from '@/data/mockData';
import { useOffers } from '@/context/OffersContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Calendar,
  Phone,
  Share2,
  ArrowLeft,
  Clock,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';
import { toast } from 'sonner';

const OfferDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { getOfferById } = useOffers();
  const offer = id ? getOfferById(id) : undefined;

  if (!offer) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Discount not found</h1>
          <Button asChild>
            <Link to="/discounts">Browse All Discounts</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const category = categories.find(c => c.id === offer.category);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  const handleShare = async () => {
    try {
      await navigator.share({
        title: `${offer.discountValue} OFF at ${offer.shopName}`,
        text: offer.description,
        url: window.location.href,
      });
    } catch {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  const handleCall = () => {
    window.open(`tel:${offer.phone}`, '_self');
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi! I'm interested in your discount: ${offer.discountValue} OFF - ${offer.description}`);
    window.open(`https://wa.me/${offer.whatsapp.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  return (
    <Layout>
      {/* Back Button */}
      <div className="bg-background border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/discounts" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to discounts
          </Link>
        </div>
      </div>

      {/* Hero Banner */}
      <section className="relative">
        <div className="relative h-64 md:h-96 overflow-hidden">
          <img
            src={offer.shopImage}
            alt={offer.shopName}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/50 to-transparent" />

          {/* Offer Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-6 left-6"
          >
            <div className="bg-primary text-primary-foreground px-6 py-3 rounded-2xl font-bold text-2xl md:text-3xl shadow-lg">
              {offer.discountValue}
              {offer.discountType === 'percentage' && ' OFF'}
            </div>
          </motion.div>

          {/* Share Button */}
          <button
            onClick={handleShare}
            className="absolute top-6 right-6 w-12 h-12 bg-background/90 rounded-full flex items-center justify-center hover:bg-background transition-colors shadow-lg"
          >
            <Share2 className="w-5 h-5 text-foreground" />
          </button>

          {/* Shop Info */}
          <div className="absolute bottom-6 left-6 right-6">
            <div className="flex items-center gap-4">
              <img
                src={offer.shopLogo}
                alt={offer.shopName}
                className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border-4 border-background shadow-lg"
              />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-background mb-1">
                  {offer.shopName}
                </h1>
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="flex items-center gap-1.5 text-background/80">
                    <MapPin className="w-4 h-4" />
                    {offer.area}, Coimbatore
                  </div>
                  {category && (
                    <Badge variant="secondary" className="bg-background/20 text-background border-0">
                      {category.icon} {category.name}
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card rounded-2xl p-6 shadow-soft"
              >
                <h2 className="text-xl font-bold text-foreground mb-4">About This Discount</h2>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  {offer.description}
                </p>

                <div className="mt-6 flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-5 h-5" />
                  <span>Valid till <strong className="text-foreground">{formatDate(offer.validTill)}</strong></span>
                </div>
              </motion.div>

              {/* Terms & Conditions */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-soft"
              >
                <h2 className="text-xl font-bold text-foreground mb-4">Terms & Conditions</h2>
                <ul className="space-y-3">
                  {offer.terms.map((term, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{term}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Location */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-card rounded-2xl p-6 shadow-soft"
              >
                <h2 className="text-xl font-bold text-foreground mb-4">Location</h2>
                <div className="flex items-start gap-3 mb-4">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">{offer.address}</span>
                </div>

                {/* Map Embed Placeholder */}
                <div className="relative h-64 bg-secondary rounded-xl overflow-hidden">
                  <iframe
                    title="Shop Location"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(offer.address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    className="w-full h-full border-0"
                    allowFullScreen
                    loading="lazy"
                  />
                </div>

                <a
                  href={offer.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                >
                  Get Directions
                  <ExternalLink className="w-4 h-4" />
                </a>
              </motion.div>

              {/* Price Comparison */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-6 shadow-soft"
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-foreground">Price Comparison</h2>
                  <Badge variant="outline" className="text-xs">Save Big</Badge>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Our Discount Price</p>
                      <p className="text-2xl font-bold text-primary">{offer.discountValue}</p>
                    </div>
                    <CheckCircle2 className="w-8 h-8 text-primary opacity-20" />
                  </div>

                  <div className="text-sm text-muted-foreground text-center">
                    Compare this discount with online prices to see your savings.
                  </div>

                  <Button
                    variant="outline"
                    className="w-full gap-2 h-12 text-base"
                    onClick={() => window.open(`https://www.google.com/search?tbm=shop&q=${encodeURIComponent(offer.description + ' ' + offer.shopName)}`, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4" />
                    Check Online Prices
                  </Button>
                </div>

                {/* Internal Similar Offers Link */}
                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold mb-3">Compare with other local shops</h3>
                  <Button
                    variant="secondary"
                    className="w-full justify-between h-12"
                    asChild
                  >
                    <Link to={`/categories/${offer.category}`}>
                      <span>View all <strong>{category?.name || 'Similar'}</strong> deals</span>
                      <ArrowLeft className="w-4 h-4 rotate-180" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* CTA Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-card rounded-2xl p-6 shadow-soft sticky top-24"
              >
                <div className="text-center mb-6">
                  <div className="inline-block bg-accent px-4 py-2 rounded-full mb-3">
                    <Clock className="w-5 h-5 text-primary inline mr-2" />
                    <span className="text-sm font-medium text-accent-foreground">
                      Discount ends {formatDate(offer.validTill)}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {offer.isUpcoming ? 'Coming Soon' : 'Get This Discount Now!'}
                  </h3>
                </div>

                <div className="space-y-3">
                  {offer.isUpcoming ? (
                    <div className="space-y-3">
                      <p className="text-sm text-muted-foreground text-center">
                        Enter your email to get notified when this deal goes live!
                      </p>
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        const form = e.target as HTMLFormElement;
                        const email = (form.elements.namedItem('notify-email') as HTMLInputElement).value;

                        if (!email) return toast.error("Please enter email");

                        try {
                          const res = await fetch(`/api/offers/${offer.id}/notify`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ email })
                          });
                          if (!res.ok) throw new Error();
                          toast.success("Subscribed!", { description: "We will email you when this offer is live." });
                          form.reset();
                        } catch {
                          toast.error("Subscription failed");
                        }
                      }}>
                        <div className="flex gap-2">
                          <input
                            name="notify-email"
                            type="email"
                            placeholder="Enter your email"
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                          />
                          <Button type="submit" size="sm">Notify</Button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <>
                      <Button
                        onClick={handleCall}
                        variant="call"
                        size="lg"
                        className="w-full"
                      >
                        <Phone className="w-5 h-5" />
                        Call Now
                      </Button>

                      <Button
                        onClick={handleWhatsApp}
                        variant="whatsapp"
                        size="lg"
                        className="w-full"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        WhatsApp
                      </Button>
                    </>
                  )}

                  <Button
                    onClick={handleShare}
                    variant="outline"
                    size="lg"
                    className="w-full"
                  >
                    <Share2 className="w-5 h-5" />
                    Share Discount
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-4">
                  Mention "coimbatore.discount" to avail this discount
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default OfferDetails;
