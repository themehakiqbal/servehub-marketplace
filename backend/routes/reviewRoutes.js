const express = require('express');
const router = express.Router();
const {
    createReview,
    getProviderReviews,
    getMyReviews,
    deleteReview,
} = require('../controllers/reviewController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/provider/:providerId', getProviderReviews);

// Protected routes
router.post('/', protect, createReview);
router.get('/customer', protect, getMyReviews);
router.delete('/:id', protect, deleteReview);

module.exports = router;