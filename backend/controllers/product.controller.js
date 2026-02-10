const Product = require('../models/Product');

class ProductController {
    static async getAllProducts(req, res) {
        try {
            const search = req.query.search || '';
            const products = await Product.findAll(search);
            res.json(products);
        } catch (error) {
            console.error('Get products error:', error);
            res.status(500).json({ error: 'Failed to fetch products' });
        }
    }

    static async getProductById(req, res) {
        try {
            const { id } = req.params;
            const product = await Product.findById(id);

            if (!product) {
                return res.status(404).json({ error: 'Product not found' });
            }

            res.json(product);
        } catch (error) {
            console.error('Get product error:', error);
            res.status(500).json({ error: 'Failed to fetch product' });
        }
    }
}

module.exports = ProductController;
