import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Category } from '@/data/mockData';

export const useCategories = () => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/categories');
            if (response.ok) {
                const data = await response.json();
                // Ensure data matches Category interface roughly (or exact)
                setCategories(data);
            } else {
                console.error('Failed to fetch categories');
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const addCategory = async (category: Omit<Category, 'offerCount'>) => {
        try {
            const response = await fetch('/api/categories', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(category),
            });

            if (response.ok) {
                const newCategory = await response.json();
                setCategories(prev => [...prev, newCategory]);
                toast.success('Category added successfully');
                return true;
            } else {
                toast.error('Failed to add category');
                return false;
            }
        } catch (error) {
            toast.error('Error adding category');
            return false;
        }
    };

    const deleteCategory = async (id: string) => {
        try {
            const response = await fetch(`/api/categories/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setCategories(prev => prev.filter(c => c.id !== id));
                toast.success('Category deleted');
            } else {
                toast.error('Failed to delete category');
            }
        } catch (error) {
            toast.error('Error deleting category');
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return {
        categories,
        isLoading,
        addCategory,
        deleteCategory,
        refreshCategories: fetchCategories
    };
};
