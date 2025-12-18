import { Layout } from '@/components/layout/Layout';
import { Shield, Lock, Eye, FileText, Globe, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

const PrivacyPolicy = () => {
    return (
        <Layout>
            <section className="py-12 md:py-16 bg-background">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 text-center"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
                        <p className="text-muted-foreground text-lg">
                            At coimbatore.discount, we respect your privacy and are committed to protecting the personal information you share with us.
                        </p>
                    </motion.div>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Eye className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold m-0">1. Information We Collect</h2>
                            </div>
                            <p>We may collect the following types of information:</p>
                            <div className="grid md:grid-cols-2 gap-6 mt-4">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">a) Personal Information</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                        <li>Name</li>
                                        <li>Email address</li>
                                        <li>Phone number</li>
                                        <li>Business details (for shop owners submitting offers)</li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">b) Non-Personal Information</h3>
                                    <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                        <li>Browser type</li>
                                        <li>Device information</li>
                                        <li>IP address</li>
                                        <li>Pages visited and time spent on the site</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <FileText className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold m-0">2. How We Use Your Information</h2>
                            </div>
                            <p>We use collected information to:</p>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                <li>Display and manage discount offers</li>
                                <li>Respond to enquiries and submissions</li>
                                <li>Improve website functionality and user experience</li>
                                <li>Communicate important updates</li>
                                <li>Prevent misuse or fraud</li>
                            </ul>
                            <p className="mt-4 font-medium">We do not sell or rent your personal data to third parties.</p>
                        </div>

                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold m-0">3. Cookies</h2>
                            </div>
                            <p>Our website may use cookies to:</p>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                <li>Improve site performance</li>
                                <li>Understand user behavior</li>
                                <li>Remember user preferences</li>
                            </ul>
                            <p className="mt-2 text-sm text-muted-foreground">You can disable cookies through your browser settings.</p>
                        </div>

                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Lock className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold m-0">Other Important Policies</h2>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">4. Third-Party Links</h3>
                                    <p className="text-muted-foreground">
                                        coimbatore.discount may contain links to third-party websites such as shop pages, WhatsApp, or Google Maps.
                                        We are not responsible for the privacy practices of these external sites.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-2">5. Data Security</h3>
                                    <p className="text-muted-foreground">
                                        We implement reasonable security measures to protect your data. However, no online transmission is 100% secure, and we cannot guarantee absolute security.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-2">6. Offer Accuracy Disclaimer</h3>
                                    <p className="text-muted-foreground">
                                        All discounts and offers are provided by individual shops.
                                        coimbatore.discount does not guarantee the accuracy, availability, or pricing of any offer.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-2">7. Your Consent</h3>
                                    <p className="text-muted-foreground">
                                        By using our website, you consent to this Privacy Policy.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-2">8. Changes to This Policy</h3>
                                    <p className="text-muted-foreground">
                                        We may update this Privacy Policy at any time.
                                        Changes will be posted on this page.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-primary/5 p-6 md:p-8 rounded-2xl border border-primary/20">
                            <h2 className="text-2xl font-bold mb-4">9. Contact Us</h2>
                            <p className="mb-4 text-lg">For any privacy-related concerns, contact us at:</p>
                            <div className="flex items-center gap-2 text-xl font-bold text-primary">
                                Phone: +91 86081 77777
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default PrivacyPolicy;
