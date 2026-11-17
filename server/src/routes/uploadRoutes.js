const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const upload = require('../middlewares/upload');
const authMiddleware = require('../middlewares/auth');

router.post('/single', authMiddleware, upload.single('image'), uploadController.uploadSingle);
router.post('/multiple', authMiddleware, upload.array('images', 10), uploadController.uploadMultiple);

module.exports = router;

