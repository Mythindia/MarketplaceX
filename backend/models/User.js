const database = require('../config/database');

class User {
    static async create(name, email, hashedPassword) {
        const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
        try {
            const result = await database.run(sql, [name, email, hashedPassword]);
            return result.id;
        } catch (error) {
            throw error;
        }
    }

    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        try {
            const user = await database.get(sql, [email]);
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async findById(id) {
        const sql = 'SELECT id, name, email, created_at FROM users WHERE id = ?';
        try {
            const user = await database.get(sql, [id]);
            return user;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;
