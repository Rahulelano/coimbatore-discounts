import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate, useParams } from 'react-router-dom';
import { useOffers } from '@/context/OffersContext';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Offer } from '@/data/mockData';
import { ArrowLeft } from 'lucide-react';
import { ImageUpload } from '@/components/ui/image-upload';

const formSchema = z.object({
    shopName: z.string().min(2, "Shop name must be at least 2 characters"),
    shopLogo: z.string().optional(),
    shopImage: z.string().optional(),
    discountValue: z.string().min(1, "Discount value is required"),
    discountType: z.string().min(1, "Discount type is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    area: z.string().min(2, "Area is required"),
    category: z.string().min(1, "Category is required"),
    validTill: z.string().min(1, "Valid till date is required"),
    startsOn: z.string().optional(),
    isFeatured: z.boolean().default(false),
    isUpcoming: z.boolean().default(false),
    priority: z.coerce.number().min(0).default(0),
    address: z.string().min(5, "Address is required"),
    phone: z.string().min(10, "Phone number is required"),
    whatsapp: z.string().min(10, "WhatsApp number is required"),
    mapUrl: z.string().url("Must be a valid URL").optional().or(z.literal('')),
});

export const AdminOfferForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addOffer, updateOffer, getOfferById } = useOffers();

    const isEditing = !!id;

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            shopName: "",
            shopLogo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
            shopImage: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
            discountValue: "",
            discountType: "percentage",
            description: "",
            area: "",
            category: "",
            validTill: "",
            startsOn: "",
            isFeatured: false,
            isUpcoming: false,
            priority: 0,
            address: "",
            phone: "",
            whatsapp: "",
            mapUrl: "",
        },
    });

    useEffect(() => {
        if (isEditing && id) {
            const offer = getOfferById(id);
            if (offer) {
                // @ts-ignore
                form.reset(offer);
            } else {
                // If ID invalid, redirect back
                navigate('/admin/offers');
            }
        }
    }, [id, isEditing, getOfferById, navigate, form]);

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        const submissionData: Omit<Offer, 'id'> = {
            shopName: values.shopName,
            shopLogo: values.shopLogo || "",
            shopImage: values.shopImage || "",
            discountValue: values.discountValue,
            discountType: values.discountType,
            description: values.description,
            area: values.area,
            category: values.category,
            validTill: values.validTill,
            startsOn: values.startsOn || undefined,
            isFeatured: values.isFeatured,
            isUpcoming: values.isUpcoming,
            priority: values.priority,
            terms: ['Standard T&C Apply'],
            address: values.address,
            phone: values.phone,
            whatsapp: values.whatsapp,
            mapUrl: values.mapUrl || "",
        };

        if (isEditing && id) {
            updateOffer(id, submissionData);
        } else {
            addOffer(submissionData);
        }
        navigate('/admin/offers');
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto pb-10">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" onClick={() => navigate('/admin/offers')}>
                    <ArrowLeft className="w-5 h-5" />
                </Button>
                <h2 className="text-3xl font-bold tracking-tight">
                    {isEditing ? 'Edit Offer' : 'Create New Offer'}
                </h2>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                        control={form.control}
                        name="shopName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Shop Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Enter shop name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                            control={form.control}
                            name="shopLogo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <ImageUpload
                                            label="Shop Logo"
                                            value={field.value}
                                            onChange={field.onChange}
                                        />
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
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Category</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter category (e.g. fashion)" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="area"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Area</FormLabel>
                                    <FormControl>
                                        <Input placeholder="e.g. RS Puram" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

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
                                    <Textarea placeholder="Offer details..." {...field} />
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
                            name="priority"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Priority Order</FormLabel>
                                    <FormControl>
                                        <Input type="number" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="flex gap-6 p-4 border rounded-lg bg-gray-50 dark:bg-gray-800">
                        <FormField
                            control={form.control}
                            name="isFeatured"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg gap-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Featured</FormLabel>
                                        <FormDescription>
                                            Show on home page slider
                                        </FormDescription>
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

                        <FormField
                            control={form.control}
                            name="isUpcoming"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg gap-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">Upcoming</FormLabel>
                                        <FormDescription>
                                            Mark as coming soon
                                        </FormDescription>
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

                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Full address" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+91..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="whatsapp"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>WhatsApp</FormLabel>
                                    <FormControl>
                                        <Input placeholder="+91..." {...field} />
                                    </FormControl>
                                    <FormMessage />
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
