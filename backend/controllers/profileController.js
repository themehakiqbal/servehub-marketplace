const ProviderProfile = require('../models/ProviderProfile');
const User = require('../models/User');

// @desc    Create or update provider profile
// @route   PUT /api/profile
// @access  Private (only providers)
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.user._id;
        
        // Check if user is a provider
        if (req.user.role !== 'provider') {
            return res.status(403).json({
                success: false,
                message: 'Only providers can have profiles'
            });
        }

        // Prepare profile data
        const profileData = {
            userId: userId,
            skills: req.body.skills || [],
            experience: req.body.experience || [],
            pricing: {
                hourly: req.body.hourlyRate || 0,
                fixed: req.body.fixedRate || 0,
            },
            portfolio: req.body.portfolio || [],
        };

        // If profile picture uploaded, add it
        if (req.file) {
            profileData.profilePicture = req.file.path;
        }

        // Parse experience if it's a string
        if (typeof req.body.experience === 'string') {
            profileData.experience = JSON.parse(req.body.experience);
        }

        // Parse portfolio if it's a string
        if (typeof req.body.portfolio === 'string') {
            profileData.portfolio = JSON.parse(req.body.portfolio);
        }

        // Find and update, or create new
        const profile = await ProviderProfile.findOneAndUpdate(
            { userId: userId },
            profileData,
            { 
                new: true,
                upsert: true,
                runValidators: true
            }
        );

        res.status(200).json({
            success: true,
            data: profile,
        });

    } catch (error) {
        console.error('Update Profile Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get provider profile by user ID
// @route   GET /api/profile/:userId
// @access  Public
exports.getProfile = async (req, res) => {
    try {
        const { userId } = req.params;

        const profile = await ProviderProfile.findOne({ userId })
            .populate('userId', 'name email');

        if (!profile) {
            return res.status(404).json({
                success: false,
                message: 'Profile not found'
            });
        }

        res.status(200).json({
            success: true,
            data: profile,
        });

    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get all provider profiles
// @route   GET /api/profile
// @access  Public
exports.getAllProfiles = async (req, res) => {
    try {
        const profiles = await ProviderProfile.find()
            .populate('userId', 'name email');

        res.status(200).json({
            success: true,
            count: profiles.length,
            data: profiles,
        });

    } catch (error) {
        console.error('Get All Profiles Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};