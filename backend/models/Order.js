const database = require('../config/database');

class Order {
  static async create(userId, items, totalAmount) {
    try {
      // Insert order
      const orderSql = 'INSERT INTO orders (user_id, total_amount) VALUES (?, ?)';
      const orderResult = await database.run(orderSql, [userId, totalAmount]);
      const orderId = orderResult.id;

      // Insert order items
      const itemSql = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)';

      for (const item of items) {
        await database.run(itemSql, [orderId, item.productId, item.quantity, item.price]);
      }

      return orderId;
    } catch (error) {
      throw error;
    }
  }

  static async findByUserId(userId) {
    try {
      const orders = await database.all('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC', [userId]);

      for (const order of orders) {
        const items = await database.all(`
                    SELECT oi.id, oi.product_id, oi.quantity, oi.price, p.name as product_name
                    FROM order_items oi
                    LEFT JOIN products p ON oi.product_id = p.id
                    WHERE oi.order_id = ?
                `, [order.id]);
        order.items = items;
      }
      return orders;
    } catch (error) {
      throw error;
    }
  }

  static async findById(orderId) {
    try {
      const order = await database.get('SELECT * FROM orders WHERE id = ?', [orderId]);
      if (order) {
        const items = await database.all(`
                    SELECT oi.id, oi.product_id, oi.quantity, oi.price, p.name as product_name
                    FROM order_items oi
                    LEFT JOIN products p ON oi.product_id = p.id
                    WHERE oi.order_id = ?
                `, [orderId]);
        order.items = items;
      }
      return order;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Order;
