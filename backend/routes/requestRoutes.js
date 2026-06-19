const express = require('express');
const router = express.Router();
const {
    submitRequest,
    getCustomerRequests,
    getProviderRequests,
    getRequest,
    updateStatus,
    getRequestStats,
} = require('../controllers/requestController');
const { protect } = require('../middleware/auth');

// Protected routes (all need authentication)
router.post('/', protect, submitRequest);
router.get('/customer', protect, getCustomerRequests);
router.get('/provider', protect, getProviderRequests);
router.get('/stats', protect, getRequestStats);
router.get('/:id', protect, getRequest);
router.put('/:id/status', protect, updateStatus);

module.exports = router;