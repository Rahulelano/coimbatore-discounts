import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://dicount:CvLhi7Jz-9E.6-Z@cluster0.l9ukpqg.mongodb.net/coimbatore?retryWrites=true&w=majority&appName=Cluster0";
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB successfully');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    }
};

export default connectDB;
