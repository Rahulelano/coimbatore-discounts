import { useOffers } from '@/context/OffersContext';
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

export const AdminOffers = () => {
    const { offers, deleteOffer } = useOffers();

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Offers Management</h2>
                <Button asChild>
                    <Link to="/admin/offers/new">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New Offer
                    </Link>
                </Button>
            </div>

            <div className="rounded-md border bg-white dark:bg-card">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Image</TableHead>
                            <TableHead>Shop Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Discount</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {offers.map((offer) => (
                            <TableRow key={offer.id}>
                                <TableCell>
                                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                                        <img
                                            src={offer.shopLogo}
                                            alt={offer.shopName}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                                (e.target as HTMLImageElement).src = 'https://placehold.co/100?text=No+Img';
                                            }}
                                        />
                                    </div>
                                </TableCell>
                                <TableCell className="font-medium">{offer.shopName}</TableCell>
                                <TableCell className="capitalize">{offer.category}</TableCell>
                                <TableCell>{offer.discountValue} <span className="text-xs text-muted-foreground">({offer.discountType})</span></TableCell>
                                <TableCell>
                                    <div className="flex gap-2">
                                        {offer.isFeatured && <Badge variant="secondary">Featured</Badge>}
                                        {offer.isUpcoming && <Badge variant="outline">Upcoming</Badge>}
                                        {!offer.isFeatured && !offer.isUpcoming && <Badge variant="secondary" className="bg-gray-100 text-gray-500">Standard</Badge>}
                                    </div>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link to={`/admin/offers/edit/${offer.id}`}>
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
                                                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will permanently delete the offer
                                                        from <strong>{offer.shopName}</strong>.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => deleteOffer(offer.id)} className="bg-red-600 hover:bg-red-700">
                                                        Delete
                                                    </AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                        {offers.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                                    No offers found. Create your first offer!
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};
