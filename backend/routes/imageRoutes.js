import express from 'express';
import multer from 'multer';
import {
    uploadImage,
    getImageById,
    getImages
} from '../controllers/imageController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// Multer Config (Memory Storage)
const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

// Protected: Only logged in users can upload
router.post('/upload', authenticateToken, upload.single('image'), uploadImage);

// Public: Viewing is fine
router.get('/image/:id', getImageById);
router.get('/images', getImages);

export default router;
