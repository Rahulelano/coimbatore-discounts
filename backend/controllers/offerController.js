import Offer from '../models/Offer.js';
import User from '../models/User.js';
import nodemailer from 'nodemailer';

// Mailing Service
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

export const getOffers = async (req, res) => {
    try {
        const offers = await Offer.find({ isApproved: true }).sort({ priority: -1, createdAt: -1 });
        res.json(offers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch offers' });
    }
};

export const getMyOffers = async (req, res) => {
    try {
        const offers = await Offer.find({ createdBy: req.user.id }).sort({ createdAt: -1 });
        res.json(offers);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch your offers' });
    }
};

export const getOfferById = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) return res.status(404).json({ error: 'Offer not found' });
        res.json(offer);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch offer' });
    }
};

export const createOffer = async (req, res) => {
    try {
        console.log("Creating offer for user:", req.user.id, "IsAdmin:", req.user.isAdmin);
        console.log("Request Body:", req.body);

        // Assign the logged-in user as the creator
        const newOffer = new Offer({
            ...req.body,
            createdBy: req.user.id,
            // Force false explicitly to prevent any frontend 'isApproved: true' from slipping in
            isApproved: false,
        });

        await newOffer.save();
        console.log("Offer created:", newOffer._id, "Approved:", newOffer.isApproved);

        res.json(newOffer);
    } catch (err) {
        console.error("Create Offer Error:", err);
        res.status(500).json({ error: 'Failed to create offer' });
    }
};

export const updateOffer = async (req, res) => {
    try {
        console.log("Updating offer:", req.params.id, "User:", req.user.id);
        const offer = await Offer.findById(req.params.id);
        if (!offer) return res.status(404).json({ error: 'Offer not found' });

        // Check ownership (Admin or Owner)
        // createdBy might be undefined for legacy offers, so they are Admin-only
        if ((!offer.createdBy || offer.createdBy.toString() !== req.user.id) && !req.user.isAdmin) {
            return res.status(403).json({ error: 'Not authorized to update this offer' });
        }

        const updatedData = { ...req.body };

        // If not admin, any update requires re-approval
        if (!req.user.isAdmin) {
            updatedData.isApproved = false;
        }

        const updatedOffer = await Offer.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.json(updatedOffer);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update offer' });
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

export const deleteOffer = async (req, res) => {
    try {
        console.log("Deleting offer:", req.params.id, "User:", req.user.id);
        const offer = await Offer.findById(req.params.id);
        if (!offer) return res.status(404).json({ error: 'Offer not found' });

        // Check ownership
        if ((!offer.createdBy || offer.createdBy.toString() !== req.user.id) && !req.user.isAdmin) {
            return res.status(403).json({ error: 'Not authorized to delete this offer' });
        }

        await Offer.findByIdAndDelete(req.params.id);
        res.json({ message: 'Offer deleted' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete offer' });
    }
};

export const notifyMe = async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ error: 'Email is required' });

        const offer = await Offer.findById(req.params.id);
        if (!offer) return res.status(404).json({ error: 'Offer not found' });

        if (!offer.interestedEmails.includes(email)) {
            offer.interestedEmails.push(email);
            await offer.save();
        }

        res.json({ message: 'Subscribed successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to subscribe' });
    }
};

// Admin: Approve Offer
export const approveOffer = async (req, res) => {
    try {
        if (!req.user.isAdmin) {
            return res.status(403).json({ error: 'Only admins can approve offers' });
        }
        const offer = await Offer.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
        res.json(offer);
    } catch (err) {
        res.status(500).json({ error: 'Failed to approve offer' });
    }
};

export const getPendingOffers = async (req, res) => {
    try {
        if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin only' });
        const offers = await Offer.find({ isApproved: false }).sort({ createdAt: -1 }).populate('createdBy', 'shopDetails.shopName email');
        res.json(offers);
    } catch (err) {
        console.error('Error fetching pending offers:', err);
        res.status(500).json({ error: 'Failed to fetch pending offers' });
    }
};

export const getApprovedOffers = async (req, res) => {
    try {
        if (!req.user.isAdmin) return res.status(403).json({ error: 'Admin only' });
        const offers = await Offer.find({ isApproved: true }).sort({ createdAt: -1 }).populate('createdBy', 'shopDetails.shopName email');
        res.json(offers);
    } catch (err) {
        console.error('Error fetching approved offers:', err);
        res.status(500).json({ error: 'Failed to fetch approved offers' });
    }
};

export const sendAlert = async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) return res.status(404).json({ error: 'Offer not found' });

        const emails = offer.interestedEmails;
        if (emails.length === 0) return res.json({ message: 'No subscribers to notify' });

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            for (const email of emails) {
                try {
                    await transporter.sendMail({
                        from: `"Coimbatore Deals" <${process.env.EMAIL_USER}>`,
                        to: email,
                        subject: `🚀 IT'S LIVE: ${offer.shopName} Offer!`,
                        html: `
                             <div style="font-family: sans-serif; padding: 20px;">
                                 <h2>Great News!</h2>
                                 <p>The offer you were interested in is now <strong>LIVE</strong>!</p>
                                 <div style="border: 1px solid #eee; padding: 15px; border-radius: 8px; margin: 20px 0;">
                                     <h3 style="margin: 0; color: #4F46E5;">${offer.discountValue} @ ${offer.shopName}</h3>
                                     <p>${offer.description}</p>
                                 </div>
                                 <a href="http://localhost:5173/offer/${offer._id}" style="background: #4F46E5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Grab Deal Now</a>
                             </div>
                         `
                    });
                    console.log(`Alert sent to ${email}`);
                } catch (e) {
                    console.error(`Failed to email ${email}`, e);
                }
            }
        } else {
            console.log('Skipping email send (no creds). Mocking success.');
        }

        res.json({ message: `Alert sent to ${emails.length} subscribers` });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to send alerts' });
    }
};
