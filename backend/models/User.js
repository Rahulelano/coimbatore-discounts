import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },
    // Shop Owner Fields
    isShopOwner: { type: Boolean, default: false },
    shopDetails: {
        shopName: String,
        shopLogo: String,
        shopImage: String,
        address: String,
        phone: String,
        whatsapp: String,
        mapUrl: String,
        category: String,
        area: String
    },
    isAccountApproved: { type: Boolean, default: true }, // Block login if false
    isShopVerified: { type: Boolean, default: false }, // Requires Admin Approval
    savedOffers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Offer' }],
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
export default User;
