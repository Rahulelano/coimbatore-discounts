import express from 'express';
import {
    getOffers,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer,
    notifyMe,
    sendAlert,
    toggleSaveOffer,
    getMyOffers,
    approveOffer,
    getPendingOffers,
    getApprovedOffers
} from '../controllers/offerController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

// 1. Specific Protected Routes (Must be checked BEFORE /:id)
router.get('/user/my-offers', authenticateToken, getMyOffers);
router.get('/pending', authenticateToken, getPendingOffers);
router.get('/approved', authenticateToken, getApprovedOffers);

// 2. Public Routes
router.get('/', getOffers);
router.get('/:id', getOfferById); // Dynamic route catches everything else
router.post('/:id/notify', notifyMe);

// 3. Other Protected Routes
router.post('/', authenticateToken, createOffer);
router.put('/:id', authenticateToken, updateOffer);
router.delete('/:id', authenticateToken, deleteOffer);
router.post('/:id/send-alert', authenticateToken, sendAlert);
router.put('/:id/approve', authenticateToken, approveOffer);
router.post('/:id/save', authenticateToken, toggleSaveOffer);

export default router;
