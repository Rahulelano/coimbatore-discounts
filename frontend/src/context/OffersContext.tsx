import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Offer, offers as initialOffers } from '@/data/mockData';
import { toast } from 'sonner';

interface OffersContextType {
  offers: Offer[];
  isLoading: boolean; // Add this
  addOffer: (offer: Omit<Offer, 'id'>) => Promise<void>;
  updateOffer: (id: string, updates: Partial<Offer>) => Promise<void>;
  deleteOffer: (id: string) => Promise<void>;
  getOfferById: (id: string) => Offer | undefined;
  refreshOffers: () => Promise<void>;
}

const OffersContext = createContext<OffersContextType | undefined>(undefined);

export const OffersProvider = ({ children }: { children: ReactNode }) => {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch offers from backend
  const fetchOffers = async () => {
    try {
      const response = await fetch('/api/offers');
      if (response.ok) {
        const data = await response.json();
        setOffers(data);

        // Seed if empty (one-time migration for "Preserve Content")
        if (data.length === 0) {
          const token = localStorage.getItem('token');
          if (token) {
            seedOffers();
          } else {
            console.log("Skipping automatic seeding: User not logged in.");
          }
        }
      } else {
        console.error('Failed to fetch offers');
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Seed database with mock data
  const seedOffers = async () => {
    console.log('Seeding database with initial offers...');
    const token = localStorage.getItem('token');
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    let seededCount = 0;
    for (const offer of initialOffers) {
      try {
        // Remove ID to let MongoDB generate it
        const { id, ...offerData } = offer;
        await fetch('/api/offers', {
          method: 'POST',
          headers,
          body: JSON.stringify(offerData)
        });
        seededCount++;
      } catch (e) {
        console.error('Failed to seed offer:', offer.shopName);
      }
    }
    if (seededCount > 0) {
      toast.success(`Migrated ${seededCount} offers to database`);
      fetchOffers(); // Refresh to get the new IDs
    }
  };

  // Initial Fetch
  useEffect(() => {
    fetchOffers();
  }, []);

  const addOffer = async (newOfferData: Omit<Offer, 'id'>) => {
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(newOfferData),
      });

      if (response.status === 401 || response.status === 403) {
        toast.error('Please login to create an offer');
        return;
      }

      if (response.ok) {
        const savedOffer = await response.json();
        setOffers(prev => [savedOffer, ...prev]);
        toast.success('Offer created successfully');
      } else {
        toast.error('Failed to create offer');
      }
    } catch (error) {
      toast.error('Error creating offer');
    }
  };

  const updateOffer = async (id: string, updates: Partial<Offer>) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/offers/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify(updates),
      });

      if (response.status === 401 || response.status === 403) {
        toast.error('Not authorized to update this offer');
        return;
      }

      if (response.ok) {
        const updated = await response.json();
        setOffers(prev => prev.map(offer =>
          offer.id === id ? updated : offer
        ));
        toast.success('Offer updated successfully');
      } else {
        toast.error('Failed to update offer');
      }
    } catch (error) {
      toast.error('Error updating offer');
    }
  };

  const deleteOffer = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`/api/offers/${id}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });

      if (response.status === 401 || response.status === 403) {
        toast.error('Not authorized to delete this offer');
        return;
      }

      if (response.ok) {
        setOffers(prev => prev.filter(offer => offer.id !== id));
        toast.success('Offer deleted successfully');
      } else if (response.status === 404) {
        setOffers(prev => prev.filter(offer => offer.id !== id));
        toast.success('Offer already deleted');
      } else {
        toast.error('Failed to delete offer');
      }
    } catch (error) {
      toast.error('Error deleting offer');
    }
  };

  const getOfferById = (id: string) => {
    return offers.find(offer => offer.id === id);
  };

  return (
    <OffersContext.Provider value={{ offers, isLoading, addOffer, updateOffer, deleteOffer, getOfferById, refreshOffers: fetchOffers }}>
      {children}
    </OffersContext.Provider>
  );
};

export const useOffers = () => {
  const context = useContext(OffersContext);
  if (context === undefined) {
    throw new Error('useOffers must be used within an OffersProvider');
  }
  return context;
};
