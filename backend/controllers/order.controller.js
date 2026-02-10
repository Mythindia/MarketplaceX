const Order = require('../models/Order');
const Product = require('../models/Product');

class OrderController {
    static async createOrder(req, res) {
        try {
            const { items } = req.body; // items: [{ productId, quantity }]
            const userId = req.user.userId;

            if (!items || items.length === 0) {
                return res.status(400).json({ error: 'Order must contain at least one item' });
            }

            // Calculate total and prepare order items
            let totalAmount = 0;
            const orderItems = [];

            for (const item of items) {
                const product = await Product.findById(item.productId);

                if (!product) {
                    return res.status(404).json({ error: `Product ${item.productId} not found` });
                }

                const itemTotal = product.price * item.quantity;
                totalAmount += itemTotal;

                orderItems.push({
                    productId: product.id,
                    quantity: item.quantity,
                    price: product.price
                });
            }

            // Create order
            const orderId = await Order.create(userId, orderItems, totalAmount);

            res.status(201).json({
                message: 'Order created successfully',
                orderId,
                totalAmount
            });
        } catch (error) {
            console.error('Create order error:', error);
            res.status(500).json({ error: 'Failed to create order' });
        }
    }

    static async getUserOrders(req, res) {
        try {
            const userId = req.user.userId;
            const orders = await Order.findByUserId(userId);
            res.json(orders);
        } catch (error) {
            console.error('Get orders error:', error);
            res.status(500).json({ error: 'Failed to fetch orders' });
        }
    }
}

module.exports = OrderController;
