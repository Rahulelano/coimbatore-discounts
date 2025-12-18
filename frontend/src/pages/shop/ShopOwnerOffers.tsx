import { useOffers } from '@/context/OffersContext';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useEffect, useState } from 'react';

export const ShopOwnerOffers = () => {
    const { deleteOffer } = useOffers(); // Keep delete from context or reimplement
    const { user } = useAuth();
    const [myOffers, setMyOffers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchMyOffers = async () => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch('/api/offers/user/my-offers', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setMyOffers(data);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMyOffers();
    }, []);

    // Also reload after delete
    const handleDelete = async (id: string) => {
        await deleteOffer(id);
        fetchMyOffers();
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">My Offers</h2>
                <Button asChild>
                    <Link to="/shop-owner/offers/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Create New Offer
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-white dark:bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Details</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {myOffers.map((offer) => (
                            <TableRow key={offer.id}>
                                <TableCell>
                                    <div className="w-16 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                        <img
                                            src={(offer.shopImage || offer.shopLogo)?.replace('5000', '5001')}
                                            alt={offer.shopName}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/100?text=No+Img';
                                            }}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{offer.shopName}</div>
                                    <div className="text-xs text-muted-foreground">{offer.category} • {offer.area}</div>
                                </TableCell>
                                <TableCell>{offer.discountValue} <span className="text-xs text-muted-foreground">({offer.discountType})</span></TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        {!offer.isApproved ? (
                                            <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
                                        ) : offer.isUpcoming ? (
                                            <Badge variant="outline">Upcoming</Badge>
                                        ) : (
                                            <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">Live</Badge>
                                        )}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link to={`/shop-owner/offers/edit/${offer.id}`}>
                                                <Pencil className="w-4 h-4" />
                                            </Link>
                                        </Button>

                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Delete this offer?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This will permanently remove the offer from the app.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(offer.id)} className="bg-red-600 hover:bg-red-700">
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {myOffers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                    You haven't posted any offers yet.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
