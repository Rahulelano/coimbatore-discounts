import { useState } from 'react';
import { motion } from 'framer-motion';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useCategories } from '@/hooks/useCategories';
import {
  Store,
  Upload,
  Calendar,
  Percent,
  MapPin,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { toast } from 'sonner';

const SubmitOffer = () => {
  const { categories } = useCategories();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    shopName: '',
    category: '',
    discountType: 'percentage',
    discountValue: '',
    description: '',
    terms: '',
    validTill: '',
    address: '',
    area: '',
    phone: '',
    email: '',
    whatsapp: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Construct WhatsApp Message
    const whatsappMessage = `*New Shop Discount Submission*

*Shop Name:* ${formData.shopName}
*Category:* ${formData.category}
*Discount:* ${formData.discountValue} (${formData.discountType})
*Valid Till:* ${formData.validTill}
*Description:* ${formData.description}
*Terms:* ${formData.terms}
*Area:* ${formData.area}
*Address:* ${formData.address}

*Contact Details:*
*Phone:* ${formData.phone}
*Email:* ${formData.email}
*WhatsApp:* ${formData.whatsapp}`;

    const whatsappUrl = `https://wa.me/918608177777?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');

    toast.success('Redirecting to WhatsApp to complete submission...');
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const benefits = [
    'Reach thousands of local customers',
    'Free listing for your discounts',
    'Dedicated support team',
    'Real-time discount management',
  ];

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-accent via-background to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Store className="w-8 h-8 text-primary-foreground" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Submit Your <span className="text-primary">Discount</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Have a great deal for Coimbatore shoppers? List your discount for free and
                reach thousands of potential customers.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-10 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="lg:col-span-2"
              >
                <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-6 md:p-8 shadow-soft space-y-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">Shop Details</h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="shopName">Shop Name *</Label>
                      <Input
                        id="shopName"
                        name="shopName"
                        placeholder="Your shop name"
                        value={formData.shopName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full h-10 px-3 rounded-lg bg-background border border-input text-sm"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h2 className="text-xl font-bold text-foreground mb-6">Discount Details</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="discountType">Discount Type *</Label>
                        <select
                          id="discountType"
                          name="discountType"
                          value={formData.discountType}
                          onChange={handleChange}
                          className="w-full h-10 px-3 rounded-lg bg-background border border-input text-sm"
                        >
                          <option value="percentage">Percentage Off</option>
                          <option value="flat">Flat Amount Off</option>
                          <option value="bogo">Buy X Get Y</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="discountValue">Discount Value *</Label>
                        <Input
                          id="discountValue"
                          name="discountValue"
                          placeholder={formData.discountType === 'percentage' ? '50%' : '₹500'}
                          value={formData.discountValue}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="validTill">Valid Till *</Label>
                        <Input
                          id="validTill"
                          name="validTill"
                          type="date"
                          value={formData.validTill}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      <Label htmlFor="description">Discount Description *</Label>
                      <Textarea
                        id="description"
                        name="description"
                        placeholder="Describe your offer in detail..."
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="terms">Terms & Conditions</Label>
                      <Textarea
                        id="terms"
                        name="terms"
                        placeholder="Enter each term on a new line..."
                        value={formData.terms}
                        onChange={handleChange}
                        rows={3}
                      />
                    </div>
                  </div>

                  <div className="border-t border-border pt-6">
                    <h2 className="text-xl font-bold text-foreground mb-6">Contact Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="address">Shop Address *</Label>
                        <Input
                          id="address"
                          name="address"
                          placeholder="Full address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="area">Area in Coimbatore *</Label>
                        <Input
                          id="area"
                          name="area"
                          placeholder="e.g., RS Puram, Gandhipuram"
                          value={formData.area}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="whatsapp">WhatsApp Number</Label>
                        <Input
                          id="whatsapp"
                          name="whatsapp"
                          type="tel"
                          placeholder="+91 98765 43210"
                          value={formData.whatsapp}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="your@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    variant="hero"
                    size="xl"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      'Submitting...'
                    ) : (
                      <>
                        Submit Discount
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-accent rounded-2xl p-6 sticky top-24">
                  <h3 className="text-lg font-bold text-foreground mb-4">Why List With Us?</h3>
                  <ul className="space-y-4">
                    {benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-sm text-muted-foreground mb-4">
                      Need help? Contact our team
                    </p>
                    <div className="space-y-2">
                      <a href="tel:+918608177777" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                        <Phone className="w-4 h-4" />
                        +91 86081 77777
                      </a>
                      <a href="mailto:partners@coimbatore.discount" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                        <Mail className="w-4 h-4" />
                        partners@coimbatore.discount
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SubmitOffer;
