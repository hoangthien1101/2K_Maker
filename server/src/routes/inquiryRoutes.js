const express = require('express');
const router = express.Router();
const inquiryController = require('../controllers/inquiryController');
const authMiddleware = require('../middlewares/auth');

// Public route for customers
router.post('/', inquiryController.submitInquiry);

// Admin routes
router.get('/', authMiddleware, inquiryController.getInquiries);
router.put('/:id', authMiddleware, inquiryController.updateInquiry);
router.delete('/:id', authMiddleware, inquiryController.deleteInquiry);

module.exports = router;

