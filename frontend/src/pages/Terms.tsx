import { Layout } from '@/components/layout/Layout';
import {
    ScrollText,
    Globe,
    UserCheck,
    Tag,
    AlertTriangle,
    Copyright,
    ShieldBan,
    ExternalLink,
    Ban,
    Scale,
    RefreshCw,
    MapPin,
    Phone
} from 'lucide-react';
import { motion } from 'framer-motion';

const Terms = () => {
    return (
        <Layout>
            <section className="py-12 md:py-16 bg-background">
                <div className="container mx-auto px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-10 text-center"
                    >
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">Terms & Conditions</h1>
                        <p className="text-muted-foreground text-lg">
                            Welcome to coimbatore.discount. By accessing or using our website, you agree to comply with the following Terms & Conditions.
                        </p>
                    </motion.div>

                    <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">

                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Globe className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold m-0">1. Website Purpose</h2>
                            </div>
                            <p>
                                coimbatore.discount is a discount listing and discovery platform that displays offers from local shops in Coimbatore.
                            </p>
                            <p className="font-medium">We are not a seller, reseller, or marketplace.</p>
                        </div>

                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <UserCheck className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold m-0">2. User Responsibilities</h2>
                            </div>
                            <p>By using this website, you agree:</p>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                <li>Not to misuse the platform</li>
                                <li>Not to submit false or misleading offers</li>
                                <li>Not to attempt unauthorized access</li>
                                <li>To use the website for lawful purposes only</li>
                            </ul>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Tag className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold m-0">3. Discount Listings</h2>
                                </div>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                    <li>All discounts are provided by shop owners</li>
                                    <li>Discount validity, pricing, and terms are controlled by the respective shops</li>
                                    <li>coimbatore.discount reserves the right to modify, remove, or reorder discounts without notice</li>
                                </ul>
                            </div>

                            <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <AlertTriangle className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold m-0">4. No Guarantee of Discounts</h2>
                                </div>
                                <p>We do not guarantee:</p>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                    <li>Availability of any discount</li>
                                    <li>Accuracy of offer details</li>
                                    <li>Continuous availability of the website</li>
                                </ul>
                                <p className="mt-2 font-medium bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-2 rounded text-sm">
                                    Users must verify discounts directly with the shop before purchase.
                                </p>
                            </div>
                        </div>

                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Copyright className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold m-0">5. Intellectual Property</h2>
                            </div>
                            <p>All website content including:</p>
                            <ul className="grid grid-cols-2 gap-2 text-muted-foreground mb-4">
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Design</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Text</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Logo</li>
                                <li className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary" /> Graphics</li>
                            </ul>
                            <p>is the property of coimbatore.discount and may not be copied or reused without permission.</p>
                        </div>

                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <ShieldBan className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold m-0">6. Limitation of Liability</h2>
                            </div>
                            <p>coimbatore.discount is not liable for:</p>
                            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                <li>Any loss or damage arising from discount usage</li>
                                <li>Disputes between customers and shops</li>
                                <li>Website downtime or errors</li>
                            </ul>
                            <p className="mt-4 font-bold">Use the website at your own risk.</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <ExternalLink className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold m-0">7. Third-Party Services</h2>
                                </div>
                                <p>We may integrate third-party tools such as:</p>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground mb-2">
                                    <li>WhatsApp</li>
                                    <li>Google Maps</li>
                                    <li>Analytics tools</li>
                                </ul>
                                <p>We are not responsible for third-party service behavior or policies.</p>
                            </div>

                            <div className="bg-card p-6 rounded-2xl shadow-sm border border-border">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <Ban className="w-5 h-5 text-primary" />
                                    </div>
                                    <h2 className="text-xl font-bold m-0">8. Termination of Access</h2>
                                </div>
                                <p>We reserve the right to:</p>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                    <li>Suspend or block users or shops</li>
                                    <li>Remove discounts that violate our policies</li>
                                    <li>Take action without prior notice</li>
                                </ul>
                            </div>
                        </div>

                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Scale className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold m-0">9. Governing Law</h2>
                            </div>
                            <p>These Terms & Conditions are governed by the laws of India.</p>
                            <p className="text-muted-foreground">Any disputes shall be subject to the jurisdiction of Coimbatore, Tamil Nadu.</p>
                        </div>

                        <div className="bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <RefreshCw className="w-5 h-5 text-primary" />
                                </div>
                                <h2 className="text-2xl font-bold m-0">10. Changes to Terms</h2>
                            </div>
                            <p>We may update these Terms & Conditions at any time.</p>
                            <p className="text-muted-foreground">Continued use of the website implies acceptance of changes.</p>
                        </div>

                        <div className="bg-primary/5 p-6 md:p-8 rounded-2xl border border-primary/20">
                            <h2 className="text-2xl font-bold mb-4">11. Contact Information</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-lg font-medium text-foreground">
                                    <Phone className="w-5 h-5 text-primary" />
                                    +91 86081 77777
                                </div>
                                <div className="flex items-center gap-3 text-lg font-medium text-foreground">
                                    <MapPin className="w-5 h-5 text-primary" />
                                    Coimbatore, Tamil Nadu, India
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </Layout>
    );
};

export default Terms;
