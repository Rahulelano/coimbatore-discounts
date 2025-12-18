import Category from '../models/Category.js';

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch categories' });
    }
};

export const createCategory = async (req, res) => {
    try {
        const { id, name, icon, color } = req.body;
        if (!id || !name) {
            return res.status(400).json({ error: 'ID and Name are required' });
        }
        const newCategory = new Category({ id, name, icon, color });
        await newCategory.save();
        res.json(newCategory);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create category' });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        await Category.findOneAndDelete({ id: req.params.id });
        res.json({ message: 'Category deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete category' });
    }
};
