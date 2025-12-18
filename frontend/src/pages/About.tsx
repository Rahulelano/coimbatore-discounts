import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import {
  CheckCircle2,
  Store,
  Search,
  Calendar,
  MapPin,
  TrendingUp,
  ShieldCheck,
  Heart,
  Zap,
  ArrowRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <Layout>
      {/* Hero / Intro Section */}
      <section className="bg-gradient-to-br from-accent via-background to-background py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 font-display">
                coimbatore<span className="text-primary">.discount</span>
              </h1>
              <p className="text-xl md:text-2xl font-medium text-foreground mb-6">
                Your Trusted Hub for Local Discounts in Coimbatore
              </p>
              <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed">
                <p className="mb-4">
                  coimbatore.discount is a dedicated platform created to bring all the best local shop discounts in Coimbatore into one simple, easy-to-use website. Our mission is to help shoppers discover genuine offers while supporting local businesses to reach the right customers at the right time.
                </p>
                <p>
                  We believe great deals shouldn’t be hard to find. That’s why we’ve built a centralized space where verified discounts, seasonal offers, and upcoming deals are showcased clearly and transparently.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                  <Search className="w-6 h-6 text-primary-foreground" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">What We Do</h2>
              </div>
              <p className="text-muted-foreground text-lg mb-6">
                We connect Coimbatore shoppers with local stores, brands, and service providers by listing:
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Store, text: "Ongoing shop discounts" },
                  { icon: Zap, text: "Limited-time offers" },
                  { icon: Calendar, text: "Upcoming and future deals" },
                  { icon: Heart, text: "Festival and seasonal sales" },
                  { icon: MapPin, text: "Location-based offers across Coimbatore" }
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-foreground font-medium">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-4 h-4 text-primary" />
                    </div>
                    {item.text}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-muted-foreground italic">
                All offers displayed on our platform are curated and organized by priority, ensuring users always see the most valuable and relevant discounts first.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-accent/30 rounded-3xl p-8 md:p-12 relative overflow-hidden"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground">How Our Platform Works</h2>
              </div>
              <ul className="space-y-6 relative z-10">
                {[
                  "Offers are managed and prioritized by our admin team to ensure accuracy and relevance",
                  "Discounts are displayed based on validity, popularity, and importance",
                  "Upcoming offers are shown in advance so users never miss future deals",
                  "Businesses can submit offers for review and approval"
                ].map((text, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <span className="text-foreground/80 font-medium">{text}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-primary font-semibold">
                This structured approach ensures a trustworthy and clutter-free experience for both shoppers and businesses.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose <span className="text-primary font-display">coimbatore.discount?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
            {[
              "100% focused on Coimbatore local offers",
              "Clean, simple, and user-friendly interface",
              "Verified and organized discount listings",
              "Saves time and money for shoppers",
              "Helps local shops reach genuine customers"
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-sm flex items-start gap-4 hover:shadow-md transition-shadow"
              >
                <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0" />
                <span className="font-medium text-foreground">{item}</span>
              </motion.div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center bg-primary/5 rounded-2xl p-6 border border-primary/10">
            <p className="text-lg text-foreground font-medium">
              We are not a marketplace or reseller — we are a discovery platform designed to highlight the best deals happening around you.
            </p>
          </div>
        </div>
      </section>

      {/* Supporting Local */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-accent text-primary rounded-full text-sm font-semibold mb-4">
                  Community First
                </span>
                <h2 className="text-3xl font-bold text-foreground mb-6">Supporting Local Businesses</h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Local businesses are the backbone of Coimbatore.
                  <span className="font-display text-primary px-1">coimbatore.discount</span>
                  gives shop owners a powerful way to:
                </p>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    "Promote their offers to local customers",
                    "Increase footfall and visibility",
                    "Launch upcoming offers in advance",
                    "Reach shoppers actively looking for discounts"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-primary" />
                      <span className="text-foreground/90">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-border">
                  <p className="text-xl font-semibold text-foreground">
                    Our goal is to create a win-win ecosystem for both customers and businesses.
                  </p>
                </div>
              </div>
              <div className="w-full md:w-1/3">
                <div className="bg-gradient-to-br from-primary to-red-600 rounded-3xl p-8 text-primary-foreground text-center shadow-xl transform md:rotate-3 hover:rotate-0 transition-transform duration-300">
                  <Heart className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
                  <p className="text-white/90">
                    To become Coimbatore’s most trusted local discount discovery platform, helping people shop smarter while empowering local businesses to grow digitally.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-foreground text-background text-center">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Stay Updated. Save More.</h2>
            <p className="text-xl text-background/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              Whether you’re searching for fashion deals, food offers, electronics discounts, or service promotions — coimbatore.discount helps you stay updated, save money, and support local shops.
            </p>

            <h3 className="text-2xl md:text-3xl font-display text-primary mb-10">
              Discover. Save. Shop Local.
            </h3>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="xl" variant="hero" className="font-bold text-lg px-8">
                <Link to="/discounts">
                  Start Discovering Deals
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
