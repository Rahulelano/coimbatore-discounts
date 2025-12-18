export interface Offer {
  id: string;
  shopName: string;
  shopLogo: string;
  shopImage: string;
  discountValue: string;
  discountType: string;
  description: string;
  area: string;
  category: string;
  validTill: string;
  startsOn?: string;
  isFeatured: boolean;
  isUpcoming: boolean;
  priority: number;
  terms: string[];
  address: string;
  phone: string;
  whatsapp: string;
  mapUrl: string;
  createdBy?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  offerCount: number;
  color: string;
}

export const categories: Category[] = [
  { id: 'fashion', name: 'Fashion', icon: '👗', offerCount: 24, color: 'from-pink-500 to-rose-500' },
  { id: 'food', name: 'Food & Restaurants', icon: '🍽️', offerCount: 38, color: 'from-orange-500 to-amber-500' },
  { id: 'electronics', name: 'Electronics', icon: '📱', offerCount: 15, color: 'from-blue-500 to-cyan-500' },
  { id: 'furniture', name: 'Furniture', icon: '🛋️', offerCount: 12, color: 'from-emerald-500 to-teal-500' },
  { id: 'health', name: 'Health & Fitness', icon: '💪', offerCount: 19, color: 'from-green-500 to-lime-500' },
  { id: 'education', name: 'Education', icon: '📚', offerCount: 8, color: 'from-purple-500 to-violet-500' },
  { id: 'services', name: 'Services', icon: '🔧', offerCount: 22, color: 'from-gray-500 to-slate-500' },
];

export const offers: Offer[] = [
  {
    id: '1',
    shopName: 'Trends Fashion Store',
    shopLogo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop',
    shopImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
    discountValue: '50%',
    discountType: 'percentage',
    description: 'Flat 50% OFF on all winter collection! Grab the best deals on jackets, sweaters, and more.',
    area: 'RS Puram',
    category: 'fashion',
    validTill: '2025-01-15',
    isFeatured: true,
    isUpcoming: false,
    priority: 1,
    terms: ['Valid on selected items only', 'Cannot be combined with other offers', 'In-store only'],
    address: '123, Sathy Road, RS Puram, Coimbatore - 641002',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    mapUrl: 'https://maps.google.com/?q=11.0168,76.9558',
  },
  {
    id: '2',
    shopName: 'Sree Annapoorna',
    shopLogo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100&h=100&fit=crop',
    shopImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    discountValue: '₹100 OFF',
    discountType: 'flat',
    description: 'Get ₹100 OFF on orders above ₹500. Valid for dine-in and takeaway.',
    area: 'Gandhipuram',
    category: 'food',
    validTill: '2025-01-20',
    isFeatured: true,
    isUpcoming: false,
    priority: 2,
    terms: ['Minimum order ₹500', 'Valid on all days', 'One coupon per customer'],
    address: '456, Cross Cut Road, Gandhipuram, Coimbatore - 641012',
    phone: '+91 98765 43211',
    whatsapp: '+91 98765 43211',
    mapUrl: 'https://maps.google.com/?q=11.0168,76.9558',
  },
  {
    id: '3',
    shopName: 'Tech World Electronics',
    shopLogo: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&h=100&fit=crop',
    shopImage: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&h=600&fit=crop',
    discountValue: 'Buy 1 Get 1',
    discountType: 'bogo',
    description: 'Buy any smartphone and get a free accessory kit worth ₹2000!',
    area: 'Peelamedu',
    category: 'electronics',
    validTill: '2025-01-25',
    isFeatured: true,
    isUpcoming: false,
    priority: 3,
    terms: ['Valid on selected smartphones', 'Accessory kit includes case, charger, and earphones', 'Limited stock'],
    address: '789, Avinashi Road, Peelamedu, Coimbatore - 641004',
    phone: '+91 98765 43212',
    whatsapp: '+91 98765 43212',
    mapUrl: 'https://maps.google.com/?q=11.0168,76.9558',
  },
  {
    id: '4',
    shopName: 'Furniture Palace',
    shopLogo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop',
    shopImage: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop',
    discountValue: '30%',
    discountType: 'percentage',
    description: 'Mega furniture sale! 30% OFF on all sofa sets and dining tables.',
    area: 'Saibaba Colony',
    category: 'furniture',
    validTill: '2025-02-01',
    isFeatured: false,
    isUpcoming: false,
    priority: 4,
    terms: ['Valid on MRP', 'Free delivery within city', 'EMI options available'],
    address: '321, Mettupalayam Road, Saibaba Colony, Coimbatore - 641011',
    phone: '+91 98765 43213',
    whatsapp: '+91 98765 43213',
    mapUrl: 'https://maps.google.com/?q=11.0168,76.9558',
  },
  {
    id: '5',
    shopName: 'FitZone Gym',
    shopLogo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=100&h=100&fit=crop',
    shopImage: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    discountValue: '40%',
    discountType: 'percentage',
    description: 'New Year Special! 40% OFF on annual membership. Start your fitness journey today!',
    area: 'Race Course',
    category: 'health',
    validTill: '2025-01-31',
    isFeatured: true,
    isUpcoming: false,
    priority: 5,
    terms: ['New members only', 'Personal training extra', 'Valid for 1 year membership'],
    address: '555, Race Course Road, Coimbatore - 641018',
    phone: '+91 98765 43214',
    whatsapp: '+91 98765 43214',
    mapUrl: 'https://maps.google.com/?q=11.0168,76.9558',
  },
  {
    id: '6',
    shopName: 'Learn Hub Academy',
    shopLogo: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=100&h=100&fit=crop',
    shopImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&h=600&fit=crop',
    discountValue: '₹5000 OFF',
    discountType: 'flat',
    description: 'Enroll in any professional course and get ₹5000 OFF on course fee!',
    area: 'Townhall',
    category: 'education',
    validTill: '2025-02-15',
    startsOn: '2025-01-01',
    isFeatured: false,
    isUpcoming: true,
    priority: 6,
    terms: ['Valid on courses above ₹20000', 'Cannot be combined', 'Registration required'],
    address: '777, Town Hall Road, Coimbatore - 641001',
    phone: '+91 98765 43215',
    whatsapp: '+91 98765 43215',
    mapUrl: 'https://maps.google.com/?q=11.0168,76.9558',
  },
  {
    id: '7',
    shopName: 'Quick Service Center',
    shopLogo: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=100&h=100&fit=crop',
    shopImage: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop',
    discountValue: '25%',
    discountType: 'percentage',
    description: 'Get 25% OFF on all AC service and repair. Beat the summer heat!',
    area: 'Singanallur',
    category: 'services',
    validTill: '2025-03-01',
    startsOn: '2025-01-15',
    isFeatured: false,
    isUpcoming: true,
    priority: 7,
    terms: ['All AC brands', 'Parts extra if needed', 'Doorstep service'],
    address: '999, Trichy Road, Singanallur, Coimbatore - 641005',
    phone: '+91 98765 43216',
    whatsapp: '+91 98765 43216',
    mapUrl: 'https://maps.google.com/?q=11.0168,76.9558',
  },
  {
    id: '8',
    shopName: 'Saravana Stores',
    shopLogo: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=100&h=100&fit=crop',
    shopImage: 'https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&h=600&fit=crop',
    discountValue: 'Buy 2 Get 1',
    discountType: 'bogo',
    description: 'Textile bonanza! Buy 2 sarees and get 1 absolutely FREE!',
    area: 'Ukkadam',
    category: 'fashion',
    validTill: '2025-01-31',
    isFeatured: false,
    isUpcoming: false,
    priority: 8,
    terms: ['On selected sarees', 'Free saree of equal or lesser value', 'In-store only'],
    address: '100, Ukkadam Bus Stand Road, Coimbatore - 641001',
    phone: '+91 98765 43217',
    whatsapp: '+91 98765 43217',
    mapUrl: 'https://maps.google.com/?q=11.0168,76.9558',
  },
];

export const getOfferById = (id: string): Offer | undefined => {
  return offers.find(offer => offer.id === id);
};

export const getFeaturedOffers = (): Offer[] => {
  return offers.filter(offer => offer.isFeatured && !offer.isUpcoming).sort((a, b) => a.priority - b.priority);
};

export const getUpcomingOffers = (): Offer[] => {
  return offers.filter(offer => offer.isUpcoming).sort((a, b) => a.priority - b.priority);
};

export const getOffersByCategory = (categoryId: string): Offer[] => {
  return offers.filter(offer => offer.category === categoryId && !offer.isUpcoming);
};

export const getAllActiveOffers = (): Offer[] => {
  return offers.filter(offer => !offer.isUpcoming).sort((a, b) => a.priority - b.priority);
};
