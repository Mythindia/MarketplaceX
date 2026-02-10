const express = require('express');
const OrderController = require('../controllers/order.controller');
const authMiddleware = require('../middleware/auth.middleware');

const router = express.Router();

// All order routes require authentication
router.use(authMiddleware);

// POST /api/orders - Create new order
router.post('/', OrderController.createOrder);

// GET /api/orders - Get user's orders
router.get('/', OrderController.getUserOrders);

module.exports = router;
