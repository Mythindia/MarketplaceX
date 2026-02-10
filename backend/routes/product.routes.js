const express = require('express');
const ProductController = require('../controllers/product.controller');

const router = express.Router();

// GET /api/products - Get all products with optional search
router.get('/', ProductController.getAllProducts);

// GET /api/products/:id - Get product by ID
router.get('/:id', ProductController.getProductById);

module.exports = router;
