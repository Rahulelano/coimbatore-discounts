import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Slug-like ID (e.g., 'fashion')
    name: { type: String, required: true },
    icon: String,
    color: String
});

const Category = mongoose.model('Category', categorySchema);
export default Category;
