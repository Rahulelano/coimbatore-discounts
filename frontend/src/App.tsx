import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AllDiscounts from "./pages/AllDiscounts";
import UpcomingOffers from "./pages/UpcomingOffers";
import SavedOffers from "./pages/SavedOffers";
import Categories from "./pages/Categories";
import Shops from "./pages/Shops";
import OfferDetails from "./pages/OfferDetails";
import SubmitOffer from "./pages/SubmitOffer";
import About from "./pages/About";
import Contact from "./pages/Contact";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

import { OffersProvider } from "@/context/OffersContext";
import { AdminLayout } from "@/pages/admin/AdminLayout";
import { AdminDashboard } from "@/pages/admin/AdminDashboard";
import { AdminOffers } from "@/pages/admin/AdminOffers";
import { AdminOfferForm } from "@/pages/admin/AdminOfferForm";
import { AdminGallery } from "@/pages/admin/AdminGallery";
import { AdminCategories } from "@/pages/admin/AdminCategories";

import { AuthProvider } from "@/context/AuthContext";
import Auth from "@/pages/Auth";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { GoogleOAuthProvider } from '@react-oauth/google';

import { ShopOwnerLayout } from "@/pages/shop/ShopOwnerLayout";
import { ShopOwnerDashboard } from "@/pages/shop/ShopOwnerDashboard";
import { ShopOwnerOffers } from "@/pages/shop/ShopOwnerOffers";
import { ShopOwnerOfferForm } from "@/pages/shop/ShopOwnerOfferForm";
import { ShopOwnerProfile } from "@/pages/shop/ShopOwnerProfile";

const App = () => {
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "mock-client-id";

  return (
    <AuthProvider>
      <OffersProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <GoogleOAuthProvider clientId={googleClientId}>
              <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/login" element={<Auth />} />
                  <Route path="/discounts" element={<AllDiscounts />} />
                  <Route path="/upcoming" element={<UpcomingOffers />} />
                  <Route path="/categories" element={<Categories />} />
                  <Route path="/categories/:id" element={<Categories />} />
                  <Route path="/shops" element={<Shops />} />
                  <Route path="/shops/:id" element={<Shops />} />
                  <Route path="/offer/:id" element={<OfferDetails />} />
                  <Route path="/submit-offer" element={<SubmitOffer />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="/terms" element={<Terms />} />
                  <Route path="/saved-offers" element={
                    <ProtectedRoute>
                      <SavedOffers />
                    </ProtectedRoute>
                  } />

                  {/* Shop Owner Routes */}
                  <Route path="/shop-owner" element={
                    <ProtectedRoute requireShopOwner={true}>
                      <ShopOwnerLayout />
                    </ProtectedRoute>
                  }>
                    <Route index element={<ShopOwnerDashboard />} />
                    <Route path="offers" element={<ShopOwnerOffers />} />
                    <Route path="offers/new" element={<ShopOwnerOfferForm />} />
                    <Route path="offers/edit/:id" element={<ShopOwnerOfferForm />} />
                    <Route path="profile" element={<ShopOwnerProfile />} />
                  </Route>

                  {/* Admin Routes */}
                  <Route element={<ProtectedRoute requireAdmin={true} />}>
                    <Route path="/admin" element={<AdminLayout />}>
                      <Route index element={<AdminDashboard />} />
                      <Route path="offers" element={<AdminOffers />} />
                      <Route path="offers/new" element={<AdminOfferForm />} />
                      <Route path="offers/edit/:id" element={<AdminOfferForm />} />
                      <Route path="categories" element={<AdminCategories />} />
                      <Route path="gallery" element={<AdminGallery />} />
                    </Route>
                  </Route>

                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </GoogleOAuthProvider>
          </TooltipProvider>
        </QueryClientProvider>
      </OffersProvider>
    </AuthProvider>
  );
};

export default App;
