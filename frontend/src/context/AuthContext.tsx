
import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    id: string;
    username: string;
    email: string;
    isAdmin: boolean;
    isShopOwner?: boolean;
    shopDetails?: {
        shopName?: string;
        shopLogo?: string;
        shopImage?: string;
        address?: string;
        phone?: string;
        whatsapp?: string;
        mapUrl?: string;
        category?: string;
        area?: string;
    };
    savedOffers?: any[]; // Array of populated offers
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    login: (token: string, user: User) => void;
    logout: () => void;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for saved token on load
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            // Here you might ideally validate the token with /api/auth/me
            // For now, we'll try to decode it or just check its presence
            // and fetch the user details if possible.
            // Let's doing a fetch to /api/auth/me to ensure it's valid.
            fetch('/api/auth/me', {
                headers: { Authorization: `Bearer ${savedToken}` }
            })
                .then(res => {
                    if (res.ok) return res.json();
                    throw new Error('Invalid token');
                })
                .then(userData => {
                    setToken(savedToken);
                    setUser(userData);
                })
                .catch(() => {
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
    }, []);

    const login = (newToken: string, newUser: User) => {
        localStorage.setItem('token', newToken);
        setToken(newToken);
        setUser(newUser);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
        window.location.href = '/login';
    };

    return (
        <AuthContext.Provider value={{ user, token, isLoading, login, logout, setUser, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
