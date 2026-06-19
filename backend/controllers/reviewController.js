const mongoose = require('mongoose'); 
const Review = require('../models/Review');
const ServiceRequest = require('../models/ServiceRequest');
const ProviderProfile = require('../models/ProviderProfile');

// @desc    Create a review
// @route   POST /api/reviews
// @access  Private (only customers)
exports.createReview = async (req, res) => {
    try {
        const { requestId, rating, feedback } = req.body;
        const reviewerId = req.user._id;

        // Check if user is a customer
        if (req.user.role !== 'customer') {
            return res.status(403).json({
                success: false,
                message: 'Only customers can leave reviews'
            });
        }

        // Check if request exists and is delivered
        const request = await ServiceRequest.findById(requestId);
        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        // Check if request is delivered
        if (request.status !== 'delivered') {
            return res.status(400).json({
                success: false,
                message: 'Can only review completed requests'
            });
        }

        // Check if user is the customer who made the request
        if (request.customerId.toString() !== reviewerId.toString()) {
            return res.status(403).json({
                success: false,
                message: 'You can only review your own requests'
            });
        }

        // Check if review already exists
        const existingReview = await Review.findOne({ requestId });
        if (existingReview) {
            return res.status(400).json({
                success: false,
                message: 'You already reviewed this request'
            });
        }

        // Create review
        const review = await Review.create({
            requestId,
            reviewerId,
            providerId: request.providerId,
            rating,
            feedback,
        });

        // Update provider's average rating
        await updateProviderRating(request.providerId);

        res.status(201).json({
            success: true,
            data: review,
        });

    } catch (error) {
        console.error('Create Review Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get reviews for a provider
// @route   GET /api/reviews/provider/:providerId
// @access  Public
exports.getProviderReviews = async (req, res) => {
    try {
        const { providerId } = req.params;

        const reviews = await Review.find({ providerId })
            .populate('reviewerId', 'name email')
            .populate('requestId', 'serviceId requirements')
            .sort({ createdAt: -1 });

        // Get average rating
        const stats = await Review.aggregate([
            { $match: { providerId: new mongoose.Types.ObjectId(providerId) } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    totalReviews: { $sum: 1 },
                },
            },
        ]);

        res.status(200).json({
            success: true,
            count: reviews.length,
            average: stats.length > 0 ? stats[0].averageRating : 0,
            data: reviews,
        });

    } catch (error) {
        console.error('Get Provider Reviews Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get all reviews by customer
// @route   GET /api/reviews/customer
// @access  Private (customer)
exports.getMyReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ reviewerId: req.user._id })
            .populate('providerId', 'name email')
            .populate('requestId', 'serviceId requirements')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: reviews.length,
            data: reviews,
        });

    } catch (error) {
        console.error('Get My Reviews Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update provider rating helper function
const updateProviderRating = async (providerId) => {
    try {
        const stats = await Review.aggregate([
            { $match: { providerId: new mongoose.Types.ObjectId(providerId) } },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                    totalReviews: { $sum: 1 },
                },
            },
        ]);

        const average = stats.length > 0 ? Math.round(stats[0].averageRating * 10) / 10 : 0;
        const total = stats.length > 0 ? stats[0].totalReviews : 0;

        await ProviderProfile.findOneAndUpdate(
            { userId: providerId },
            {
                averageRating: average,
                totalReviews: total,
            },
            { new: true }
        );

        return { average, total };
    } catch (error) {
        console.error('Update Provider Rating Error:', error);
        return null;
    }
};

// @desc    Delete review (admin only)
// @route   DELETE /api/reviews/:id
// @access  Private (admin)
exports.deleteReview = async (req, res) => {
    try {
        // Check if user is admin
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Only admins can delete reviews'
            });
        }

        const review = await Review.findById(req.params.id);
        if (!review) {
            return res.status(404).json({
                success: false,
                message: 'Review not found'
            });
        }

        await review.deleteOne();

        // Update provider rating
        await updateProviderRating(review.providerId);

        res.status(200).json({
            success: true,
            message: 'Review deleted successfully',
        });

    } catch (error) {
        console.error('Delete Review Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};