const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middlewares/auth');

// Public routes
router.get('/', productController.getProducts);
router.get('/categories', productController.getCategories);
router.get('/:id', productController.getProductById);

// Admin protected routes
router.post('/', authMiddleware, productController.createProduct);
router.put('/:id', authMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);
router.patch('/:id/visibility', authMiddleware, productController.toggleProductVisibility);

// Category admin routes
router.post('/categories', authMiddleware, productController.createCategory);
router.put('/categories/:id', authMiddleware, productController.updateCategory);
router.delete('/categories/:id', authMiddleware, productController.deleteCategory);

module.exports = router;

