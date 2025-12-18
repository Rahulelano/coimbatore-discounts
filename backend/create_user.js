import mongoose from 'mongoose';
import User from './models/User.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Load env vars
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://dicount:CvLhi7Jz-9E.6-Z@cluster0.l9ukpqg.mongodb.net/coimbatore?retryWrites=true&w=majority&appName=Cluster0";

const promoteUser = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');

        const email = process.argv[2];
        const role = process.argv[3]; // 'admin' or 'shop-owner'

        if (!email || !role) {
            console.log('Usage: node create_user.js <email> <role>');
            console.log('Example: node create_user.js test@example.com admin');
            process.exit(1);
        }

        let user = await User.findOne({ email });

        if (!user) {
            console.log(`User ${email} not found. Creating new user...`);
            const bcrypt = await import('bcryptjs');
            const hashedPassword = await bcrypt.default.hash('password123', 10);

            user = new User({
                username: email.split('@')[0],
                email,
                password: hashedPassword
            });
            console.log(`Created new user with password: password123`);
        }

        if (role === 'admin') {
            user.isAdmin = true;
            console.log(`Promoting ${email} to Admin...`);
        } else if (role === 'shop-owner') {
            user.isShopOwner = true;
            // Initialize shop details if empty
            if (!user.shopDetails) {
                user.shopDetails = {
                    shopName: user.username + "'s Shop",
                };
            }
            console.log(`Promoting ${email} to Shop Owner...`);
        } else {
            console.log('Invalid role. Use "admin" or "shop-owner"');
            process.exit(1);
        }

        await user.save();
        console.log('Success! User updated.');
        process.exit(0);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

promoteUser();
