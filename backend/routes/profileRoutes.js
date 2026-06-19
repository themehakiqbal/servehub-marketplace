const express = require('express');
const router = express.Router();
const {
    updateProfile,
    getProfile,
    getAllProfiles
} = require('../controllers/profileController');
const { protect } = require('../middleware/auth');
const { upload } = require('../config/cloudinary');

// Public routes
router.get('/', getAllProfiles);
router.get('/:userId', getProfile);

// Protected routes (need authentication)
router.put(
    '/',
    protect,
    upload.single('profilePicture'),
    updateProfile
);

module.exports = router;