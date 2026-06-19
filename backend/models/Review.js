const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
    {
        requestId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ServiceRequest',
            required: true,
            unique: true, // One review per request
        },
        reviewerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        providerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        rating: {
            type: Number,
            required: [true, 'Please provide a rating'],
            min: [1, 'Rating must be at least 1'],
            max: [5, 'Rating cannot exceed 5'],
        },
        feedback: {
            type: String,
            required: [true, 'Please provide feedback'],
            maxlength: [500, 'Feedback cannot exceed 500 characters'],
        },
    },
    {
        timestamps: true,
    }
);

// Prevent duplicate reviews for same request

module.exports = mongoose.model('Review', ReviewSchema);