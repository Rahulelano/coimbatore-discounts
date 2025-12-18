import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Tag, User, LogOut, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'All Discounts', href: '/discounts' },
  { name: 'Upcoming', href: '/upcoming' },
  { name: 'Categories', href: '/categories' },
  { name: 'Shops', href: '/shops' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  const isActive = (href: string) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-foreground leading-tight font-display">
                coimbatore<span className="text-primary">.discount</span>
              </span>
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                Local Discounts
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.href)
                  ? 'bg-accent text-primary'
                  : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                  }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button & Auth */}
          <div className="hidden md:flex items-center gap-3">
            <Button asChild variant="hero" size="default">
              <Link to="/submit-offer">
                <Tag className="w-4 h-4" />
                Submit Discount
              </Link>
            </Button>

            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuLabel className="font-normal text-xs text-muted-foreground">
                    {user?.email}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/saved-offers">
                      <Heart className="w-4 h-4 mr-2" />
                      Saved Offers
                    </Link>
                  </DropdownMenuItem>
                  {user?.isAdmin && (
                    <DropdownMenuItem asChild>
                      <Link to="/admin">Admin Dashboard</Link>
                    </DropdownMenuItem>
                  )}
                  {user?.isShopOwner && (
                    <DropdownMenuItem asChild>
                      <Link to="/shop-owner">Shop Portal</Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="ghost" size="sm">
                <Link to="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-accent transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-4 space-y-1 border-t border-border">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(link.href)
                      ? 'bg-accent text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                      }`}
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-4 px-4 space-y-3">
                  {isAuthenticated ? (
                    <>
                      <div className="flex items-center gap-3 px-2 py-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <User className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{user?.username}</span>
                          <span className="text-xs text-muted-foreground">{user?.email}</span>
                        </div>
                      </div>
                      {user?.isAdmin && (
                        <Link
                          to="/admin"
                          onClick={() => setIsOpen(false)}
                          className="block w-full text-center py-2 text-sm font-medium border rounded-md"
                        >
                          Admin Dashboard
                        </Link>
                      )}
                      {user?.isShopOwner && (
                        <Link
                          to="/shop-owner"
                          onClick={() => setIsOpen(false)}
                          className="block w-full text-center py-2 text-sm font-medium border rounded-md"
                        >
                          Shop Portal
                        </Link>
                      )}
                      <Button
                        variant="destructive"
                        className="w-full justify-start"
                        onClick={() => {
                          logout();
                          setIsOpen(false);
                        }}
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button asChild variant="outline" className="w-full">
                      <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
                    </Button>
                  )}

                  <Button asChild variant="hero" className="w-full">
                    <Link to="/submit-offer" onClick={() => setIsOpen(false)}>
                      <Tag className="w-4 h-4" />
                      Submit Your Discount
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
