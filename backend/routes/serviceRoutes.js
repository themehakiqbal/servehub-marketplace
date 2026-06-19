const express = require('express');
const router = express.Router();
const {
    createService,
    getAllServices,
    getService,
    updateService,
    deleteService,
    getServicesByCategory,
    getServicesByProvider,
} = require('../controllers/serviceController');
const { protect } = require('../middleware/auth');

// Public routes
router.get('/', getAllServices);
router.get('/:id', getService);
router.get('/category/:category', getServicesByCategory);
router.get('/provider/:providerId', getServicesByProvider);

// Protected routes (need authentication)
router.post('/', protect, createService);
router.put('/:id', protect, updateService);
router.delete('/:id', protect, deleteService);

module.exports = router;