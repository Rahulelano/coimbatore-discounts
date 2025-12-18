import { useOffers } from '@/context/OffersContext';
import { useCategories } from '@/hooks/useCategories';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag, Calendar, Star, Layers, Users, Store, CheckCircle, Trash2, ShieldCheck, XCircle } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export const AdminDashboard = () => {
    const { offers, refreshOffers } = useOffers();
    const { categories } = useCategories();
    const [users, setUsers] = useState<any[]>([]);
    const [pendingShops, setPendingShops] = useState<any[]>([]);
    const [pendingOffers, setPendingOffers] = useState<any[]>([]);
    const [approvedShops, setApprovedShops] = useState<any[]>([]);
    const [approvedOffers, setApprovedOffers] = useState<any[]>([]);

    const fetchAllData = async () => {
        const token = localStorage.getItem('token');
        try {
            const [pShops, pOffers, aShops, aOffers, allUsers] = await Promise.all([
                fetch('/api/auth/pending-shops', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('/api/offers/pending', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('/api/auth/approved-shops', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('/api/offers/approved', { headers: { 'Authorization': `Bearer ${token}` } }),
                fetch('/api/auth/users', { headers: { 'Authorization': `Bearer ${token}` } })
            ]);

            if (pShops.ok) setPendingShops(await pShops.json());
            if (pOffers.ok) setPendingOffers(await pOffers.json());
            if (aShops.ok) setApprovedShops(await aShops.json());
            if (aOffers.ok) setApprovedOffers(await aOffers.json());
            if (allUsers.ok) setUsers(await allUsers.json());
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchAllData();
    }, []);

    const approveShop = async (id: string) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/auth/approve-shop/${id}`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Shop Approved');
                fetchAllData();
            }
        } catch (e) { toast.error('Failed to approve'); }
    };

    const deleteUser = async (id: string) => {
        if (!confirm("Are you sure you want to delete this user? This cannot be undone.")) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/auth/users/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('User Deleted');
                fetchAllData();
            }
        } catch (e) { toast.error('Failed to delete'); }
    };

    const approveOffer = async (id: string) => {
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/offers/${id}/approve`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Offer Approved');
                fetchAllData();
                refreshOffers();
            }
        } catch (e) { toast.error('Failed to approve'); }
    };


    const deleteOffer = async (id: string) => {
        if (!confirm("Delete this offer?")) return;
        const token = localStorage.getItem('token');
        try {
            const res = await fetch(`/api/offers/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                toast.success('Offer Deleted');
                fetchAllData();
                refreshOffers();
            } else if (res.status === 404) {
                toast.error('Offer was already deleted');
                fetchAllData();
                refreshOffers();
            } else {
                toast.error('Failed to delete');
            }
        } catch (e) { toast.error('Error deleting offer'); }
    };


    const stats = [
        { title: "Total Users", value: users.length, icon: Users, color: "text-purple-500" },
        { title: "Verified Shops", value: approvedShops.length, icon: ShieldCheck, color: "text-green-500" },
        { title: "Pending Requests", value: pendingShops.length + pendingOffers.length, icon: Store, color: "text-orange-500" },
        { title: "Total Offers", value: offers.length, icon: Tag, color: "text-blue-500" }
    ];

    return (
        <div className="space-y-6 animate-fade-in pb-10">
            <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent><div className="text-2xl font-bold">{stat.value}</div></CardContent>
                    </Card>
                ))}
            </div>

            <Tabs defaultValue="users" className="w-full">
                <TabsList className="mb-4">
                    <TabsTrigger value="users">From All Users ({users.length})</TabsTrigger>
                    <TabsTrigger value="pending-shops">Pending Shops ({pendingShops.length})</TabsTrigger>
                    <TabsTrigger value="pending-offers">Pending Offers ({pendingOffers.length})</TabsTrigger>
                    <TabsTrigger value="approved-shops" className="text-green-600">Approved Shops ({approvedShops.length})</TabsTrigger>
                    <TabsTrigger value="approved-offers" className="text-blue-600">Approved Offers ({approvedOffers.length})</TabsTrigger>
                </TabsList>

                {/* USER MANAGEMENT */}
                <TabsContent value="users" className="space-y-4">
                    <div className="grid gap-4">
                        {users.map((user) => (
                            <Card key={user._id} className="p-4 flex justify-between items-center bg-zinc-50/50">
                                <div>
                                    <h3 className="font-bold text-lg flex items-center gap-2">
                                        {user.username}
                                        {user.isAdmin && <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded border border-purple-200">Admin</span>}
                                        {user.isShopOwner && <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">Shop Owner</span>}
                                    </h3>
                                    <p className="text-sm text-gray-600">{user.email}</p>
                                    <p className="text-xs text-gray-400 mt-1">Joined: {new Date(user.createdAt).toLocaleDateString()}</p>
                                </div>
                                <div className="flex gap-2">
                                    {!user.isAdmin && (
                                        <Button onClick={() => deleteUser(user._id)} size="sm" variant="destructive">
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete User
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                {/* PENDING SHOPS */}
                <TabsContent value="pending-shops" className="space-y-4">
                    {pendingShops.length === 0 ? <p className="text-muted-foreground">No pending shop approvals.</p> : (
                        <div className="grid gap-4">
                            {pendingShops.map((user) => (
                                <Card key={user._id} className="p-4 flex justify-between items-center border-l-4 border-l-yellow-400">
                                    <div>
                                        <h3 className="font-bold text-lg">{user.username}</h3>
                                        <p className="text-sm text-gray-600">{user.email}</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded border border-yellow-200">Pending Approval</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={() => approveShop(user._id)} size="sm" className="bg-green-600 hover:bg-green-700">
                                            <CheckCircle className="w-4 h-4 mr-2" /> Approve
                                        </Button>
                                        <Button onClick={() => deleteUser(user._id)} size="sm" variant="destructive">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* PENDING OFFERS */}
                <TabsContent value="pending-offers" className="space-y-4">
                    {pendingOffers.length === 0 ? <p className="text-muted-foreground">No pending offers.</p> : (
                        <div className="grid gap-4">
                            {pendingOffers.map((offer) => (
                                <Card key={offer.id} className="p-4 flex justify-between items-center border-l-4 border-l-orange-400">
                                    <div className="flex gap-4 items-center">
                                        {offer.shopImage && <img src={offer.shopImage} className="w-16 h-16 object-cover rounded shadow-sm" />}
                                        <div>
                                            <h3 className="font-bold text-lg">{offer.shopName}</h3>
                                            <p className="text-sm font-medium">{offer.discountValue} - {offer.description}</p>
                                            <p className="text-xs text-muted-foreground mt-1">By: {offer.createdBy?.email || 'Unknown'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={() => approveOffer(offer.id)} size="sm" className="bg-green-600 hover:bg-green-700">
                                            <CheckCircle className="w-4 h-4 mr-2" /> Publish
                                        </Button>
                                        <Button onClick={() => deleteOffer(offer.id)} size="sm" variant="destructive">
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* APPROVED SHOPS */}
                <TabsContent value="approved-shops" className="space-y-4">
                    {approvedShops.length === 0 ? <p className="text-muted-foreground">No approved shops found.</p> : (
                        <div className="grid gap-4">
                            {approvedShops.map((user) => (
                                <Card key={user._id} className="p-4 flex justify-between items-center border-l-4 border-l-green-500">
                                    <div>
                                        <h3 className="font-bold text-lg">{user.username}</h3>
                                        <p className="text-sm text-gray-600">{user.email}</p>
                                        <div className="flex gap-2 mt-2">
                                            <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded border border-green-200 flex items-center gap-1">
                                                <ShieldCheck className="w-3 h-3" /> Verified Shop
                                            </span>
                                            {user.shopDetails?.shopName && <span className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">{user.shopDetails.shopName}</span>}
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={() => deleteUser(user._id)} size="sm" variant="destructive">
                                            <Trash2 className="w-4 h-4 mr-2" /> Remove Shop
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* APPROVED OFFERS */}
                <TabsContent value="approved-offers" className="space-y-4">
                    {approvedOffers.length === 0 ? <p className="text-muted-foreground">No approved offers found.</p> : (
                        <div className="grid gap-4">
                            {approvedOffers.map((offer) => (
                                <Card key={offer.id} className="p-4 flex justify-between items-center border-l-4 border-l-blue-500">
                                    <div className="flex gap-4 items-center">
                                        {offer.shopImage && <img src={offer.shopImage} className="w-16 h-16 object-cover rounded shadow-sm" />}
                                        <div>
                                            <h3 className="font-bold text-lg">{offer.shopName}</h3>
                                            <p className="text-sm font-medium">{offer.discountValue} - {offer.description}</p>
                                            <p className="text-xs text-muted-foreground mt-1">By: {offer.createdBy?.email || 'Unknown'}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button onClick={() => deleteOffer(offer.id)} size="sm" variant="destructive">
                                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </TabsContent>

            </Tabs>
        </div>
    );
};
