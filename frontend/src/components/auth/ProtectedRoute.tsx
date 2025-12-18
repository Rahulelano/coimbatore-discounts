import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
    children?: React.ReactNode;
    requireAdmin?: boolean;
    requireShopOwner?: boolean;
}

export const ProtectedRoute = ({ children, requireAdmin = false, requireShopOwner = false }: ProtectedRouteProps) => {
    const { user, isLoading, isAuthenticated } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!isAuthenticated) {
        // Redirect to login but save the attempted location
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (requireAdmin && !user?.isAdmin) {
        return <Navigate to="/" replace />;
    }

    if (requireShopOwner && !user?.isShopOwner) {
        return <Navigate to="/" replace />;
    }

    return children ? <>{children}</> : <Outlet />;
};
