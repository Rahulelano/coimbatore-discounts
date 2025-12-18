import express from 'express';
import {
    register,
    login,
    googleLogin,
    getMe,
    updateProfile,
    sendOTP,
    verifyOTP,
    checkAvailability,
    approveShop,
    getPendingShops,
    getApprovedShops,
    deleteUser,
    getAllUsers
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = express.Router();

console.log('✅ Auth Routes Loaded. Profile PUT route is being registered...');

router.post('/register', register);
router.post('/login', login);
router.post('/google', googleLogin);
router.get('/me', authenticateToken, getMe);
router.put('/profile', authenticateToken, updateProfile); // New route
router.get('/profile-test', (req, res) => res.send('Profile Route Loaded'));

// OTP Routes
router.post('/otp/send', sendOTP);
router.post('/otp/verify', verifyOTP);
// CRUD for Admin
router.put('/approve-shop/:id', authenticateToken, approveShop);
router.get('/pending-shops', authenticateToken, getPendingShops);
router.get('/approved-shops', authenticateToken, getApprovedShops);
router.get('/users', authenticateToken, getAllUsers);
router.delete('/users/:id', authenticateToken, deleteUser);

// Availability Check
router.get('/check', checkAvailability);

export default router;
