import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Category } from '@/data/mockData';

interface CategoryCardProps {
  category: Category;
  index?: number;
}

export const CategoryCard = ({ category, index = 0 }: CategoryCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
    >
      <Link
        to={`/categories/${category.id}`}
        className="block group"
      >
        <div className="bg-card rounded-xl p-6 text-center shadow-soft hover:shadow-red transition-all duration-300 border-2 border-transparent hover:border-primary/20 group-hover:-translate-y-1">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-4 bg-accent rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
            {category.icon}
          </div>

          {/* Name */}
          <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
            {category.name}
          </h3>

          {/* Offer Count */}
          <p className="text-sm text-muted-foreground mb-3">
            {category.offerCount} discounts
          </p>

          {/* Arrow */}
          <div className="flex items-center justify-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-all duration-300">
            Explore
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};
