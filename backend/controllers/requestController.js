const ServiceRequest = require('../models/ServiceRequest');
const Service = require('../models/Service');
const User = require('../models/User');

// @desc    Submit a service request
// @route   POST /api/requests
// @access  Private (only customers)
exports.submitRequest = async (req, res) => {
    try {
        const { serviceId, requirements, budget, deadline, message } = req.body;
        const customerId = req.user._id;

        // Check if user is a customer
        if (req.user.role !== 'customer') {
            return res.status(403).json({
                success: false,
                message: 'Only customers can submit requests'
            });
        }

        // Check if service exists
        const service = await Service.findById(serviceId);
        if (!service) {
            return res.status(404).json({
                success: false,
                message: 'Service not found'
            });
        }

        // Check if service is active
        if (!service.isActive) {
            return res.status(400).json({
                success: false,
                message: 'This service is not available'
            });
        }

        // Create request
        const request = await ServiceRequest.create({
            customerId,
            serviceId,
            providerId: service.providerId,
            requirements,
            budget: budget || service.price,
            deadline: new Date(deadline),
            message: message || '',
        });

        res.status(201).json({
            success: true,
            data: request,
        });

    } catch (error) {
        console.error('Submit Request Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get all requests for customer
// @route   GET /api/requests/customer
// @access  Private (customer)
exports.getCustomerRequests = async (req, res) => {
    try {
        const requests = await ServiceRequest.find({ customerId: req.user._id })
            .populate('serviceId', 'title price category')
            .populate('providerId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests,
        });

    } catch (error) {
        console.error('Get Customer Requests Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get all requests for provider
// @route   GET /api/requests/provider
// @access  Private (provider)
exports.getProviderRequests = async (req, res) => {
    try {
        // Check if user is a provider
        if (req.user.role !== 'provider') {
            return res.status(403).json({
                success: false,
                message: 'Only providers can view provider requests'
            });
        }

        const requests = await ServiceRequest.find({ providerId: req.user._id })
            .populate('serviceId', 'title price category')
            .populate('customerId', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: requests.length,
            data: requests,
        });

    } catch (error) {
        console.error('Get Provider Requests Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get single request
// @route   GET /api/requests/:id
// @access  Private (customer or provider involved)
exports.getRequest = async (req, res) => {
    try {
        const request = await ServiceRequest.findById(req.params.id)
            .populate('serviceId', 'title price category description')
            .populate('customerId', 'name email')
            .populate('providerId', 'name email');

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        // Check if user is authorized (customer or provider)
        const isCustomer = request.customerId._id.toString() === req.user._id.toString();
        const isProvider = request.providerId._id.toString() === req.user._id.toString();

        if (!isCustomer && !isProvider) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to view this request'
            });
        }

        res.status(200).json({
            success: true,
            data: request,
        });

    } catch (error) {
        console.error('Get Request Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Update request status
// @route   PUT /api/requests/:id/status
// @access  Private (provider or customer)
exports.updateStatus = async (req, res) => {
    try {
        const { status, message } = req.body;
        const request = await ServiceRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: 'Request not found'
            });
        }

        // Check authorization
        const isCustomer = request.customerId.toString() === req.user._id.toString();
        const isProvider = request.providerId.toString() === req.user._id.toString();

        if (!isCustomer && !isProvider) {
            return res.status(403).json({
                success: false,
                message: 'Not authorized to update this request'
            });
        }

        // Status transition validation
        const validTransitions = {
            'pending': ['accepted', 'cancelled'],
            'accepted': ['in-progress', 'cancelled'],
            'in-progress': ['completed', 'cancelled'],
            'completed': ['delivered'],
            'delivered': [],
            'cancelled': [],
        };

        // Check if transition is valid
        if (!validTransitions[request.status].includes(status)) {
            return res.status(400).json({
                success: false,
                message: `Cannot transition from ${request.status} to ${status}`,
            });
        }

        // Update request
        request.status = status;
        if (message) {
            request.message = message;
        }
        await request.save();

        res.status(200).json({
            success: true,
            data: request,
        });

    } catch (error) {
        console.error('Update Status Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};

// @desc    Get request statistics for dashboard
// @route   GET /api/requests/stats
// @access  Private
exports.getRequestStats = async (req, res) => {
    try {
        const userId = req.user._id;
        const role = req.user.role;

        let filter = {};
        if (role === 'customer') {
            filter.customerId = userId;
        } else if (role === 'provider') {
            filter.providerId = userId;
        }

        const stats = await ServiceRequest.aggregate([
            { $match: filter },
            {
                $group: {
                    _id: '$status',
                    count: { $sum: 1 },
                },
            },
        ]);

        // Get total count
        const total = stats.reduce((sum, item) => sum + item.count, 0);

        res.status(200).json({
            success: true,
            total,
            stats,
        });

    } catch (error) {
        console.error('Get Request Stats Error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error',
            error: error.message
        });
    }
};