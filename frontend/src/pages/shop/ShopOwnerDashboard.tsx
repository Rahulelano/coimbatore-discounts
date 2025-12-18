import { useOffers } from '@/context/OffersContext';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag, Calendar, Eye, MousePointerClick } from 'lucide-react';
import { useEffect, useState } from 'react';

export const ShopOwnerDashboard = () => {
    const { offers } = useOffers();
    const { user } = useAuth();
    const [myOffers, setMyOffers] = useState(offers);

    useEffect(() => {
        if (user && offers.length > 0) {
            // Filter offers created by this user
            const filtered = offers.filter(o => o.createdBy === user.id);
            setMyOffers(filtered);
        }
    }, [offers, user]);

    const stats = [
        {
            title: "My Active Offers",
            value: myOffers.filter(o => !o.isUpcoming).length,
            icon: Tag,
            color: "text-blue-500"
        },
        {
            title: "Upcoming Offers",
            value: myOffers.filter(o => o.isUpcoming).length,
            icon: Calendar,
            color: "text-purple-500"
        },
        {
            title: "Total Views",
            value: "0", // Placeholder for simple analytics
            icon: Eye,
            color: "text-green-500"
        },
        {
            title: "Link Clicks",
            value: "0", // Placeholder
            icon: MousePointerClick,
            color: "text-orange-500"
        }
    ];

    return (
        <div className="space-y-6 animate-fade-in">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Welcome back, {user?.username}!</h2>
                <p className="text-muted-foreground mt-1">Here's what's happening with your shop's offers.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, index) => (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                            <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stat.value}</div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/10 p-6 rounded-lg border border-blue-100 dark:border-blue-800">
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2">Grow your business 🚀</h3>
                <p className="text-sm text-blue-600 dark:text-blue-400">
                    Posting regular offers helps you reach more customers. Ensure your shop profile is up to date for better visibility.
                </p>
            </div>
        </div>
    );
};
