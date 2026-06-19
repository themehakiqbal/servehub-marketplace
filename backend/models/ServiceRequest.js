const mongoose = require('mongoose');

const ServiceRequestSchema = new mongoose.Schema(
    {
        customerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        serviceId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Service',
            required: true,
        },
        providerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        requirements: {
            type: String,
            required: [true, 'Please provide requirements'],
            maxlength: [1000, 'Requirements cannot exceed 1000 characters'],
        },
        budget: {
            type: Number,
            required: [true, 'Please provide a budget'],
            min: [0, 'Budget must be at least 0'],
        },
        deadline: {
            type: Date,
            required: [true, 'Please provide a deadline'],
        },
        status: {
            type: String,
            enum: ['pending', 'accepted', 'in-progress', 'completed', 'delivered', 'cancelled'],
            default: 'pending',
        },
        message: {
            type: String,
            maxlength: [500, 'Message cannot exceed 500 characters'],
        },
        attachments: {
            type: [String],
            default: [],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('ServiceRequest', ServiceRequestSchema);