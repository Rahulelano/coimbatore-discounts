import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useOffers } from '@/context/OffersContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Offer } from '@/data/mockData'; // Ensure createdBy is in Offer interface
import { ArrowLeft } from 'lucide-react';
import { ImageUpload } from '@/components/ui/image-upload';
import { Switch } from '@/components/ui/switch';

const formSchema = z.object({
    discountValue: z.string().min(1, "Discount value is required"),
    discountType: z.string().min(1, "Discount type is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    validTill: z.string().min(1, "Valid till date is required"),
    startsOn: z.string().optional(),
    isUpcoming: z.boolean().default(false),
    // Optional overrides for shop details
    shopImage: z.string().optional(),
});

export const ShopOwnerOfferForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addOffer, updateOffer, getOfferById, isLoading } = useOffers();
    const { user, isLoading: authLoading } = useAuth();

    const isEditing = !!id;

    // Default shop details from user profile 
    // In a real app, we might fetch "Shop Profile" here
    const shopDetails = user?.shopDetails || {};

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            discountValue: "",
            discountType: "percentage",
            description: "",
            validTill: "",
            startsOn: "",
            isUpcoming: false,
            shopImage: shopDetails.shopImage || "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
        },
    });

    useEffect(() => {
        if (isLoading || authLoading) return; // Wait for initial context load
        if (!user) {
            // If not logged in, should have been handled by ProtectedRoute, but double check
            return;
        }

        const fetchDirectly = async (offerId: string) => {
            const token = localStorage.getItem('token');
            try {
                const res = await fetch(`/api/offers/${offerId}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();

                    // Allow if User is the creator OR User is Admin
                    // Note: API should probably already secure this, but frontend check:
                    // data.createdBy might be an object if populated, or string if not.
                    const creatorId = typeof data.createdBy === 'object' ? data.createdBy._id : data.createdBy;

                    if (creatorId !== user.id && !user.isAdmin) {
                        console.log("Ownership mismatch", creatorId, user.id);
                        navigate('/shop-owner/offers');
                        return;
                    }

                    form.reset({
                        discountValue: data.discountValue,
                        discountType: data.discountType,
                        description: data.description,
                        validTill: data.validTill,
                        startsOn: data.startsOn,
                        isUpcoming: data.isUpcoming,
                        shopImage: data.shopImage
                    });
                } else {
                    console.error("Failed to fetch offer direct");
                    navigate('/shop-owner/offers');
                }
            } catch (e) {
                console.error("Fetch error", e);
                navigate('/shop-owner/offers');
            }
        };

        if (isEditing && id) {
            const offer = getOfferById(id);
            if (offer) {
                // If found in Context (Public offers)
                const creatorId = typeof offer.createdBy === 'object' ? (offer.createdBy as any)._id || (offer.createdBy as any).id : offer.createdBy;
                if (creatorId !== user.id && !user.isAdmin) {
                    navigate('/shop-owner/offers');
                    return;
                }
                form.reset({
                    discountValue: offer.discountValue,
                    discountType: offer.discountType,
                    description: offer.description,
                    validTill: offer.validTill,
                    startsOn: offer.startsOn,
                    isUpcoming: offer.isUpcoming,
                    shopImage: offer.shopImage
                });
            } else {
                // Not found in Context (likely Pending/Unapproved), so fetch directly
                fetchDirectly(id);
            }
        }
    }, [id, isEditing, getOfferById, navigate, form, user, isLoading, authLoading]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        // Construct the full offer object merging Shop Profile + Form Values
        const submissionData: Omit<Offer, 'id'> = {
            shopName: shopDetails.shopName || user?.username || "My Shop",
            shopLogo: shopDetails.shopLogo || "https://placehold.co/100",
            category: shopDetails.category || "General",
            area: shopDetails.area || "Coimbatore",
            address: shopDetails.address || "",
            phone: shopDetails.phone || "",
            whatsapp: shopDetails.whatsapp || "",
            mapUrl: shopDetails.mapUrl || "",
            isFeatured: false, // Shop owners can't self-feature
            priority: 0,
            terms: ['Standard Shop T&C Apply'],

            // From Form
            shopImage: values.shopImage || shopDetails.shopImage || "",
            discountValue: values.discountValue,
            discountType: values.discountType,
            description: values.description,
            validTill: values.validTill,
            startsOn: values.startsOn || undefined,
            isUpcoming: values.isUpcoming,
        };

        if (isEditing && id) {
            updateOffer(id, submissionData);
        } else {
            addOffer(submissionData);
        }
        navigate('/shop-owner/offers');
    };

    if (!user) return null;

    return (
        <div className="space-y-6 max-w-2xl mx-auto pb-10">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/shop-owner/offers')}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">
                    {isEditing ? 'Edit Offer' : 'Create New Offer'}
                </h2>
            </div>

            {!shopDetails.shopName && (
                <div className="bg-yellow-50 text-yellow-800 p-4 rounded-md border border-yellow-200">
                    <strong>Warning:</strong> Your shop profile is incomplete.
                    <Button variant="link" className="px-1 h-auto font-bold text-yellow-900" onClick={() => navigate('/shop-owner/profile')}>
                        Update Profile
                    </Button>
                    to ensure your shop details (Name, Address, Logo) appear correctly on offers.
                </div>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="discountValue"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Discount Value</FormLabel>
                                    <FormControl>
                                        <Input placeholder="50% or ₹100 OFF" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="discountType"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Discount Type</FormLabel>
                                    <FormControl>
                                        <Input placeholder="percentage, flat, bogo..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Describe your offer..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="shopImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Offer Banner Image</FormLabel>
                                <FormControl>
                                    <ImageUpload
                                        label="Banner Image"
                                        value={field.value}
                                        onChange={field.onChange}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="validTill"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Valid Till</FormLabel>
                                    <FormControl>
                                        <Input type="date" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="isUpcoming"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm mt-8">
                                    <div className="space-y-0.5">
                                        <FormLabel>Coming Soon</FormLabel>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full">
                        {isEditing ? 'Update Offer' : 'Create Offer'}
                    </Button>
                </form>
            </Form>
        </div>
    );
};
