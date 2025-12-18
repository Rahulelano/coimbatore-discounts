import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error("FATAL ERROR: JWT_SECRET is not defined.");
    process.exit(1);
}

// OTP Store (In-Memory for now - Use Redis/DB for production)
const otps = new Map(); // email -> { otp, expires }

// Mailing Service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOTPEmail = async (email, otp) => {
    // 1. Log to Console (Always reliable for dev)
    console.log(`==================================================`);
    console.log(`🔐 OTP for ${email}: ${otp}`);
    console.log(`==================================================`);

    // 2. Send Real Email
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
        try {
            await transporter.sendMail({
                from: `"Coimbatore Deals" <${process.env.EMAIL_USER}>`,
                to: email,
                subject: 'Your Login Code',
                html: `
                    <div style="font-family: sans-serif; padding: 20px;">
                        <h2>🔐 Login Verification</h2>
                        <p>Your login code is:</p>
                        <h1 style="color: #4F46E5; letter-spacing: 5px;">${otp}</h1>
                        <p>This code expires in 5 minutes.</p>
                        <p style="color: grey; font-size: 12px;">If you didn't request this, please ignore this email.</p>
                    </div>
                `
            });
            console.log('✅ Email sent successfully to ' + email);
        } catch (e) {
            console.error('❌ Email sending failed:', e.message);
        }
    } else {
        console.log('⚠️ No EMAIL_USER/EMAIL_PASS in .env. Email skipped.');
    }
};

export const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Registration failed' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Invalid password' });
        }

        if (user.isAccountApproved === false) {
            return res.status(403).json({ error: 'Your account is pending Admin Approval.' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                isShopOwner: user.isShopOwner
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                isShopOwner: user.isShopOwner,
                shopDetails: user.shopDetails
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
};

export const googleLogin = async (req, res) => {
    try {
        const { email, name, picture, googleId } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        let user = await User.findOne({ email });

        if (!user) {
            // Auto-register
            const randomPassword = Math.random().toString(36).slice(-10) + Math.random().toString(36).slice(-10);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);

            user = new User({
                username: name || email.split('@')[0],
                email,
                password: hashedPassword,
                // store googleId/picture if we expand schema later
            });
            await user.save();
        }

        if (user.isAccountApproved === false) {
            return res.status(403).json({ error: 'Your account is pending Admin Approval.' });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                isShopOwner: user.isShopOwner
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                isShopOwner: user.isShopOwner,
                shopDetails: user.shopDetails
            }
        });

    } catch (err) {
        console.error("Google Auth Error:", err);
        res.status(500).json({ error: 'Google Login failed' });
    }
};

// Toggle Save/Unsave Offer
export const toggleSaveOffer = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isSaved = user.savedOffers.includes(id);

        if (isSaved) {
            await User.findByIdAndUpdate(userId, { $pull: { savedOffers: id } });
            res.json({ message: 'Offer removed from saved', isSaved: false });
        } else {
            await User.findByIdAndUpdate(userId, { $addToSet: { savedOffers: id } });
            res.json({ message: 'Offer saved successfully', isSaved: true });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to toggle save' });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password').populate('savedOffers');
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch user' });
    }
};

export const updateProfile = async (req, res) => {
    try {
        const updates = req.body;

        // Prevent updating sensitive fields like password/email directly via this route
        delete updates.password;
        delete updates.email;
        delete updates.isAdmin; // Only admins can grant admin rights

        // If updating shopDetails, ensure isShopOwner is true but requires re-verification
        if (updates.shopDetails) {
            updates.isShopOwner = true;
            updates.isShopVerified = false; // Reset verification on update
        }

        const user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: updates },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

export const sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Store with 5 min expiry
        otps.set(email, {
            otp,
            expires: Date.now() + 5 * 60 * 1000
        });

        await sendOTPEmail(email, otp);
        // DEVELOPMENT ONLY: Returning OTP in response to allow testing without email server
        res.json({ message: 'OTP sent successfully', devOtp: otp });
    } catch (err) {
        res.status(500).json({ error: 'Failed to send OTP' });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp, role } = req.body; // Accept role (optional)
        console.log(`VerifyOTP: ${email} - Role: ${role} - OTP: ${otp}`);

        const stored = otps.get(email);

        if (!stored || stored.otp !== otp) {
            return res.status(400).json({ error: 'Invalid OTP' });
        }

        if (Date.now() > stored.expires) {
            otps.delete(email);
            return res.status(400).json({ error: 'OTP expired' });
        }

        otps.delete(email);
        let user = await User.findOne({ email });

        console.log('User found:', user ? `ID: ${user._id}, Shop: ${user.isShopOwner}, Approved: ${user.isAccountApproved}` : 'No User');

        // Registration Logic
        if (!user) {
            const randomPassword = Math.random().toString(36).slice(-10);
            const hashedPassword = await bcrypt.hash(randomPassword, 10);
            const isShopOwner = role === 'shop-owner';

            user = new User({
                username: email.split('@')[0],
                email,
                password: hashedPassword,
                isShopOwner: isShopOwner,
                isAccountApproved: !isShopOwner // Auto-approve regular users, Block Shop Owners
            });
            await user.save();
            console.log('New User Created:', user.isShopOwner, user.isAccountApproved);

            if (isShopOwner) {
                return res.status(200).json({
                    message: 'Account created successfully. Please wait for Admin Approval to login.',
                    pendingApproval: true
                });
            }
        }

        // Handle Upgrade Request for Existing Users
        const upgradeCondition = role === 'shop-owner' && !user.isShopOwner;
        console.log('Upgrade Condition:', upgradeCondition);

        if (upgradeCondition) {
            user.isShopOwner = true;
            user.isAccountApproved = false; // Put them in pending state
            user.isShopVerified = false; // Ensure verification is reset
            await user.save();
            console.log('User Upgraded to Shop Owner (Pending)');

            return res.status(200).json({
                message: 'Account upgraded to Shop Owner. Please wait for Admin Approval to login.',
                pendingApproval: true
            });
        }

        // Login Logic (Existing User or New Regular User)
        if (user.isAccountApproved === false) {
            console.log('Login Blocked: Account not approved');
            return res.status(403).json({
                error: 'Your account is pending Admin Approval.',
                pendingApproval: true
            });
        }

        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                isAdmin: user.isAdmin,
                isShopOwner: user.isShopOwner
            },
            JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                isAdmin: user.isAdmin,
                isShopOwner: user.isShopOwner,
                shopDetails: user.shopDetails
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Verification failed' });
    }
};

export const approveShop = async (req, res) => {
    try {
        if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin only' });

        await User.findByIdAndUpdate(req.params.id, {
            isShopVerified: true,
            isAccountApproved: true // Grant login access
        });
        res.json({ message: 'Shop and Account verified successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to approve shop' });
    }
};

export const checkAvailability = async (req, res) => {
    try {
        const { email, username } = req.query;
        if (email) {
            const existingUser = await User.findOne({ email });
            return res.json({ available: !existingUser });
        }
        if (username) {
            const existingUser = await User.findOne({ username });
            return res.json({ available: !existingUser });
        }
        res.status(400).json({ error: 'Missing field to check' });
    } catch (err) {
        res.status(500).json({ error: 'Check failed' });
    }
};

export const getPendingShops = async (req, res) => {
    try {
        if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin only' });

        const pendingShops = await User.find({
            isShopOwner: true,
            isAccountApproved: false
        }).select('-password');

        res.json(pendingShops);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch pending shops' });
    }
};

export const getApprovedShops = async (req, res) => {
    try {
        if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin only' });

        const approvedShops = await User.find({
            isShopOwner: true,
            isShopVerified: true
        }).select('-password');

        res.json(approvedShops);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch approved shops' });
    }
};

export const deleteUser = async (req, res) => {
    try {
        if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin only' });
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete user' });
    }
};

export const getAllUsers = async (req, res) => {
    try {
        if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin only' });
        const users = await User.find().select('-password').sort({ createdAt: -1 });
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
};
