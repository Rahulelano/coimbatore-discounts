import { useAuth } from '@/context/AuthContext';
import { OfferCard } from '@/components/offers/OfferCard';
import { Loader2, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const SavedOffers = () => {
    const { user, isLoading } = useAuth();
    // In a real app, you might want to fetch saved offers freshly from an endpoint 
    // to populate them fully if 'user.savedOffers' only contains IDs or partial data.
    // However, our getMe controller populates them, so user.savedOffers should be full objects.

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    const savedOffers = user?.savedOffers || [];

    return (
        <div className="min-h-screen flex flex-col bg-slate-50">
            <Navbar />

            <main className="container mx-auto px-4 py-8 flex-grow">
                <div className="flex items-center gap-3 mb-8">
                    <div className="bg-red-100 p-3 rounded-full">
                        <Heart className="w-6 h-6 text-red-600 fill-current" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">My Saved Offers</h1>
                        <p className="text-muted-foreground">Manage your favorite deals and discounts</p>
                    </div>
                </div>

                {savedOffers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {savedOffers.map((offer: any) => (
                            <OfferCard key={offer._id || offer.id} offer={{ ...offer, id: offer._id || offer.id }} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <Heart className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No saved offers yet</h3>
                        <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                            Start exploring deal and save the ones you love to access them quickly here.
                        </p>
                        <Button asChild size="lg">
                            <Link to="/discounts">Browse Offers</Link>
                        </Button>
                    </div>
                )}
            </main>

            <Footer />
        </div>
    );
};

export default SavedOffers;
