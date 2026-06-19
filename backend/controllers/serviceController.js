const Service = require('../models/Service');
const ProviderProfile = require('../models/ProviderProfile');

// @desc    Create a new service
// @route   POST /api/services
// @access  Private (only providers)
exports.createService = async (req, res) => {
    try {
        const userId = req.user._id;

        // Check if user is a provider
        if (req.user.role !== 'provider') {
            return res.status(403).json({
                success: false,
                message: 'Only providers can create services'
            });
        }

        // Check if provider has a profile
        const profile = await ProviderProfile.findOne({ userId });
        if (!profile) {
            return res.status(400).json({
                success: false,
                message: 'Please create a provider profile first'
            });
        }

        // Create service
        const service = await Service.create({
            providerId: userId,
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            deliveryTime: req.body.deliveryTime,
            images: req.body.images || [],
        });

        res.status(201).json({
            success: true,
            data: service,
        });

    } catch (error) {
        console.error('Create Service Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get all services
// @route   GET /api/services
// @access  Public
exports.getAllServices = async (req, res) => {
    try {
        // Build query
        let query = { isActive: true };

        // Filter by category
        if (req.query.category) {
            query.category = req.query.category;
        }

        // Search by title
        if (req.query.search) {
            query.title = { $regex: req.query.search, $options: 'i' };
        }

        const services = await Service.find(query)
            .populate('providerId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: services.length,
            data: services,
        });

    } catch (error) {
        console.error('Get All Services Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get single service
// @route   GET /api/services/:id
// @access  Public
exports.getService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id)
            .populate('providerId', 'name email');

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        res.status(200).json({
            success: true,
            data: service,
        });

    } catch (error) {
        console.error('Get Service Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update service
// @route   PUT /api/services/:id
// @access  Private (only the provider who created it)
exports.updateService = async (req, res) => {
    try {
        let service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        // Check if user is the provider who created this service
        if (service.providerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this service'
            });
        }

        // Update service
        service = await Service.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );

        res.status(200).json({
            success: true,
            data: service,
        });

    } catch (error) {
        console.error('Update Service Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Delete service
// @route   DELETE /api/services/:id
// @access  Private (only the provider who created it)
exports.deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        // Check if user is the provider who created this service
        if (service.providerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to delete this service'
            });
        }

        // Soft delete (set inactive) or hard delete
        await service.deleteOne();

        res.status(200).json({
            success: true,
            message: 'Service deleted successfully',
        });

    } catch (error) {
        console.error('Delete Service Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get services by category
// @route   GET /api/services/category/:category
// @access  Public
exports.getServicesByCategory = async (req, res) => {
    try {
        const services = await Service.find({
            category: req.params.category,
            isActive: true,
        }).populate('providerId', 'name email');

        res.status(200).json({
            success: true,
            count: services.length,
            data: services,
        });

    } catch (error) {
        console.error('Get Services By Category Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get services by provider
// @route   GET /api/services/provider/:providerId
// @access  Public
exports.getServicesByProvider = async (req, res) => {
    try {
        const services = await Service.find({
            providerId: req.params.providerId,
            isActive: true,
        }).populate('providerId', 'name email');

        res.status(200).json({
            success: true,
            count: services.length,
            data: services,
        });

    } catch (error) {
        console.error('Get Services By Provider Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};