const database = require('../config/database');

class Product {
    static async findAll(search = '') {
        let sql = 'SELECT * FROM products';
        let params = [];

        if (search) {
            sql += ' WHERE name LIKE ? OR description LIKE ? OR category LIKE ?';
            const searchPattern = `%${search}%`;
            params = [searchPattern, searchPattern, searchPattern];
        }

        sql += ' ORDER BY created_at DESC';

        try {
            const products = await database.all(sql, params);
            return products;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        const sql = 'SELECT * FROM products WHERE id = ?';
        try {
            const product = await database.get(sql, [id]);
            return product;
        } catch (error) {
            throw error;
        }
    }

    static async create(productData) {
        const { name, description, price, category, image_url, stock } = productData;
        const sql = `INSERT INTO products (name, description, price, category, image_url, stock) 
                 VALUES (?, ?, ?, ?, ?, ?)`;
        try {
            const result = await database.run(sql, [name, description, price, category, image_url, stock]);
            return result.id;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Product;
