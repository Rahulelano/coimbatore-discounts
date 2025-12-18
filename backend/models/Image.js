import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
    name: String,
    data: String, // Storing as Base64 string for easy retrieval/embedding
    contentType: String,
    uploadDate: { type: Date, default: Date.now }
});

const Image = mongoose.model('Image', imageSchema);
export default Image;
