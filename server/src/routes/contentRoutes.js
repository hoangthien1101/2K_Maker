const express = require('express');
const router = express.Router();
const contentController = require('../controllers/contentController');
const authMiddleware = require('../middlewares/auth');

// Public Landing Page routes
router.get('/published', contentController.getPublishedContent);

// Admin CMS routes
router.get('/draft', authMiddleware, contentController.getDraftContent);
router.post('/publish', authMiddleware, contentController.publishWebsite);
router.get('/stats', authMiddleware, contentController.getOverviewStats);

// Hero
router.get('/hero', contentController.getHero);
router.put('/hero', authMiddleware, contentController.updateHero);

// About
router.get('/about', contentController.getAbout);
router.put('/about', authMiddleware, contentController.updateAbout);

// Core Values
router.get('/core-values', contentController.getCoreValues);
router.post('/core-values', authMiddleware, contentController.createCoreValue);
router.put('/core-values/:id', authMiddleware, contentController.updateCoreValue);
router.delete('/core-values/:id', authMiddleware, contentController.deleteCoreValue);

// Why Choose Us
router.get('/why-choose-us', contentController.getWhyChooseUs);
router.post('/why-choose-us', authMiddleware, contentController.createWhyChooseUs);
router.put('/why-choose-us/:id', authMiddleware, contentController.updateWhyChooseUs);
router.delete('/why-choose-us/:id', authMiddleware, contentController.deleteWhyChooseUs);

// Contact Info
router.get('/contact', contentController.getContact);
router.put('/contact', authMiddleware, contentController.updateContact);

// Section Settings
router.get('/sections', contentController.getSections);
router.put('/sections', authMiddleware, contentController.updateSections);

module.exports = router;

