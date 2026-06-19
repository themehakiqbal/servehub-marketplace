const mongoose = require('mongoose');

const ProviderProfileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true,
        },
        profilePicture: {
            type: String,
            default: '',
        },
        skills: {
            type: [String],
            default: [],
        },
        experience: [
            {
                title: { type: String, required: true },
                company: { type: String, required: true },
                startDate: { type: Date, required: true },
                endDate: { type: Date },
                isCurrent: { type: Boolean, default: false },
                description: { type: String },
            }
        ],
        pricing: {
            hourly: { type: Number, default: 0 },
            fixed: { type: Number, default: 0 },
        },
        portfolio: [
            {
                title: { type: String, required: true },
                description: { type: String },
                imageUrl: { type: String },
                link: { type: String },
            }
        ],
        averageRating: {
            type: Number,
            default: 0,
            min: 0,
            max: 5,
        },
        totalReviews: {
            type: Number,
            default: 0,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('ProviderProfile', ProviderProfileSchema);