const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema(
    {
        providerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        title: {
            type: String,
            required: [true, 'Please add a title'],
            trim: true,
            maxlength: [100, 'Title cannot be more than 100 characters'],
        },
        description: {
            type: String,
            required: [true, 'Please add a description'],
            maxlength: [500, 'Description cannot be more than 500 characters'],
        },
        category: {
            type: String,
            required: [true, 'Please add a category'],
            enum: [
                'Web Development',
                'Graphic Design',
                'Content Writing',
                'Digital Marketing',
                'Video Editing',
                'App Development',
                'SEO Services',
                'Social Media Management',
                'Other'
            ],
        },
        price: {
            type: Number,
            required: [true, 'Please add a price'],
            min: [0, 'Price must be at least 0'],
        },
        deliveryTime: {
            type: String,
            required: [true, 'Please add delivery time'],
            enum: ['1 day', '2 days', '3 days', '5 days', '7 days', '14 days', '30 days'],
        },
        images: {
            type: [String],
            default: [],
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Service', ServiceSchema);