import { Link, Outlet, useLocation } from 'react-router-dom';
import { LayoutDashboard, Tag, LogOut, User } from 'lucide-react';

export const ShopOwnerLayout = () => {
    const location = useLocation();

    // Check if the current path matches
    const isActive = (path: string) => {
        if (path === '/shop-owner') {
            return location.pathname === '/shop-owner';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col fixed h-full">
                <div className="p-6">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
                        Shop Portal
                    </h1>
                    <p className="text-xs text-gray-500 mt-1">Manage Your Offers</p>
                </div>

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    <Link
                        to="/shop-owner"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/shop-owner')
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/10'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                    >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                    </Link>
                    <Link
                        to="/shop-owner/offers"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/shop-owner/offers')
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/10'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                    >
                        <Tag className="w-5 h-5" />
                        My Offers
                    </Link>
                    <Link
                        to="/shop-owner/profile"
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive('/shop-owner/profile')
                            ? 'bg-blue-50 text-blue-600 dark:bg-blue-900/10'
                            : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
                            }`}
                    >
                        <User className="w-5 h-5" />
                        Shop Profile
                    </Link>
                </nav>

                <div className="p-4 border-t border-gray-200 dark:border-gray-700 mb-4">
                    <Link to="/" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors">
                        <LogOut className="w-5 h-5" />
                        Back to Site
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 overflow-y-auto min-h-screen">
                <div className="p-4 md:p-8 max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};
