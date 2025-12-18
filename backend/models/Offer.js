import mongoose from 'mongoose';

const offerSchema = new mongoose.Schema({
    shopName: { type: String, required: true },
    shopLogo: String,
    shopImage: String,
    discountValue: { type: String, required: true },
    discountType: { type: String, required: true },
    description: { type: String, required: true },
    area: { type: String, required: true },
    category: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    whatsapp: { type: String, required: true },
    validTill: { type: String, required: true },
    startsOn: String,
    mapUrl: String,
    terms: [String],
    isFeatured: { type: Boolean, default: false },
    isUpcoming: { type: Boolean, default: false },
    priority: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    // Price Comparison Fields
    marketPrice: Number, // General market price for savings calculation
    competitorLinks: [{ site: String, url: String, price: Number }], // Specific competitor links
    interestedEmails: [String], // Users who want to be notified
    // Ownership
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isApproved: { type: Boolean, default: false } // Requires Admin Approval
});

// Configure toJSON to include id from _id
offerSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
});

const Offer = mongoose.model('Offer', offerSchema);
export default Offer;
