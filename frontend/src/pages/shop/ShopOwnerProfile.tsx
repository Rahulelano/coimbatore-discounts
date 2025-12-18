import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { ImageUpload } from '@/components/ui/image-upload';
import { toast } from 'sonner';

const profileSchema = z.object({
    username: z.string().min(2, "Name must be at least 2 characters"),
    shopName: z.string().min(2, "Shop Name is required"),
    shopLogo: z.string().optional(),
    shopImage: z.string().optional(),
    address: z.string().min(5, "Address must be at least 5 characters"),
    phone: z.string().min(10, "Phone number is required"),
    whatsapp: z.string().min(10, "WhatsApp number is required"),
    mapUrl: z.string().optional().or(z.literal('')),
    category: z.string().optional(),
    area: z.string().optional(),
});

export const ShopOwnerProfile = () => {
    const { user, setUser } = useAuth(); // Assuming AuthContext provides setUser to update local state

    const form = useForm<z.infer<typeof profileSchema>>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            username: "",
            shopName: "",
            shopLogo: "",
            shopImage: "",
            address: "",
            phone: "",
            whatsapp: "",
            mapUrl: "",
            category: "",
            area: "",
        },
    });

    useEffect(() => {
        if (user) {
            form.reset({
                username: user.username,
                shopName: user.shopDetails?.shopName || "",
                shopLogo: user.shopDetails?.shopLogo || "",
                shopImage: user.shopDetails?.shopImage || "",
                address: user.shopDetails?.address || "",
                phone: user.shopDetails?.phone || "",
                whatsapp: user.shopDetails?.whatsapp || "",
                mapUrl: user.shopDetails?.mapUrl || "",
                category: user.shopDetails?.category || "",
                area: user.shopDetails?.area || "",
            });
        }
    }, [user, form]);

    const onSubmit = async (values: z.infer<typeof profileSchema>) => {
        const token = localStorage.getItem('token');
        try {
            const updatePayload = {
                username: values.username,
                shopDetails: {
                    shopName: values.shopName,
                    shopLogo: values.shopLogo,
                    shopImage: values.shopImage,
                    address: values.address,
                    phone: values.phone,
                    whatsapp: values.whatsapp,
                    mapUrl: values.mapUrl,
                    category: values.category,
                    area: values.area
                }
            };

            const response = await fetch('/api/auth/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updatePayload)
            });

            if (response.ok) {
                const updatedUser = await response.json();
                // Update local context
                // Ensure we merge properly if setUser expects full user object
                // Usually AuthContext handles refetching 'me', but simplified here:
                window.location.reload(); // Simple refresh to sync everything
                toast.success('Profile updated successfully');
            } else {
                toast.error('Failed to update profile');
            }
        } catch (error) {
            toast.error('Error updating profile');
        }
    };

    return (
        <div className="space-y-6 max-w-2xl mx-auto pb-10">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Shop Profile</h2>
                <p className="text-muted-foreground">
                    Manage your business details. These will be automatically used when you create new offers.
                </p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                    <div className="bg-slate-50 p-4 rounded-lg border mb-6">
                        <h3 className="font-semibold mb-4 text-slate-800">Basic Info</h3>
                        <div className="grid gap-4">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Your Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="John Doe" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="shopName"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Shop / Business Name</FormLabel>
                                        <FormControl>
                                            <Input placeholder="My Awasome Shop" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border mb-6">
                        <h3 className="font-semibold mb-4 text-slate-800">Branding</h3>
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
                                                label="Default Banner Image"
                                                value={field.value}
                                                onChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormDescription>Used if you don't provide a specific image for an offer</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border mb-6">
                        <h3 className="font-semibold mb-4 text-slate-800">Contact & Location</h3>

                        <FormField
                            control={form.control}
                            name="address"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Address</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="123 Main St, Coimbatore..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="grid grid-cols-2 gap-4 mt-4">
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

                        <div className="grid grid-cols-2 gap-4 mt-4">
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
                            <FormField
                                control={form.control}
                                name="category"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input placeholder="e.g. Fashion" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormField
                            control={form.control}
                            name="mapUrl"
                            render={({ field }) => (
                                <FormItem className="mt-4">
                                    <FormLabel>Google Maps Link</FormLabel>
                                    <FormControl>
                                        <Input placeholder="https://maps.google.com/..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button type="submit" className="w-full" size="lg">
                        Save Profile
                    </Button>
                </form>
            </Form>
        </div>
    );
};
