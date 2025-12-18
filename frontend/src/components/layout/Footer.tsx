import { Link } from 'react-router-dom';
import { Percent, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      {/* Main Footer Removed as per user request */}

      <div className="container mx-auto px-4 py-8 border-b border-background/10">
        <div className="flex flex-col items-center justify-center">
          <span className="text-2xl font-bold text-background leading-tight font-display">
            coimbatore<span className="text-primary">.discount</span>
          </span>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} coimbatore.discount. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link to="/privacy-policy" className="text-background/50 hover:text-primary transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link to="/contact" className="text-background/50 hover:text-primary transition-colors text-sm">
                Contact Us
              </Link>
              <Link to="/terms" className="text-background/50 hover:text-primary transition-colors text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
