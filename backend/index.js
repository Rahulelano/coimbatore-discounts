import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';
import cors from 'cors';

// 1. Load Env (Must be before other local imports)
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, '.env') });

// 2. Import Modules that rely on Env
const { default: connectDB } = await import('./config/db.js');
const { default: authRoutes } = await import('./routes/authRoutes.js');
const { default: offerRoutes } = await import('./routes/offerRoutes.js');
const { default: categoryRoutes } = await import('./routes/categoryRoutes.js');
const { default: imageRoutes } = await import('./routes/imageRoutes.js');

const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors());

// Database Connection
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/offers', offerRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api', imageRoutes);

// Health Check
app.get('/', (req, res) => {
    res.send('Coimbatore Deals Backend is Running!');
});

const PORT = process.env.PORT || 5015;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
