import express from 'express';
import {
    getCategories,
    createCategory,
    deleteCategory
} from '../controllers/categoryController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getCategories);

// Only Admins (or at least logged in users) should manage categories
// For now, requiring login. Controller can check isAdmin if needed.
router.post('/', authenticateToken, createCategory);
router.delete('/:id', authenticateToken, deleteCategory);

export default router;
