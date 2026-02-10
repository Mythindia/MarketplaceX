const database = require('../config/database');
const Product = require('../models/Product');

const products = [
    {
        name: 'Wireless Headphones',
        description: 'Premium noise-cancelling wireless headphones with 30-hour battery life.',
        price: 5999.00,
        category: 'Electronics',
        image_url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
        stock: 50
    },
    {
        name: 'Smart Watch Series 5',
        description: 'Advanced health monitoring, GPS, and water resistance.',
        price: 24999.00,
        category: 'Electronics',
        image_url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
        stock: 30
    },
    {
        name: 'Professional Camera Kit',
        description: 'DSLR camera with 18-55mm lens and accessory bundle.',
        price: 45999.00,
        category: 'Electronics',
        image_url: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
        stock: 15
    },
    {
        name: 'Designer Denim Jacket',
        description: 'Classic vintage wash denim jacket with modern fit.',
        price: 2499.00,
        category: 'Fashion',
        image_url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=500&q=80',
        stock: 100
    },
    {
        name: 'Running Sneakers',
        description: 'High-performance running shoes with cushioned sole.',
        price: 3499.00,
        category: 'Fashion',
        image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80',
        stock: 45
    },
    {
        name: 'Leather Messenger Bag',
        description: 'Handcrafted genuine leather bag for laptops up to 15 inches.',
        price: 4999.00,
        category: 'Fashion',
        image_url: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
        stock: 25
    },
    {
        name: 'Modern Coffee Table',
        description: 'Minimalist wooden coffee table with metal legs.',
        price: 8999.00,
        category: 'Home & Living',
        image_url: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?w=500&q=80',
        stock: 20
    },
    {
        name: 'Ceramic Plant Pot Set',
        description: 'Set of 3 geometric ceramic pots for indoor plants.',
        price: 1299.00,
        category: 'Home & Living',
        image_url: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=500&q=80',
        stock: 60
    },
    {
        name: 'Smart LED Bulb',
        description: 'WiFi enabled RGB bulb compatible with voice assistants.',
        price: 899.00,
        category: 'Home & Living',
        image_url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&q=80',
        stock: 100
    },
    {
        name: 'Organic Face Serum',
        description: 'Vitamin C enriched serum for glowing skin.',
        price: 1499.00,
        category: 'Beauty',
        image_url: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&q=80',
        stock: 80
    },
    {
        name: 'Yoga Mat Premium',
        description: 'Extra thick non-slip yoga mat with carrying strap.',
        price: 1999.00,
        category: 'Sports',
        image_url: 'https://images.unsplash.com/photo-1592432678010-c59121463715?w=500&q=80',
        stock: 40
    },
    {
        name: 'Stainless Steel Water Bottle',
        description: 'Vacuum insulated bottle keeps drinks cold for 24 hours.',
        price: 999.00,
        category: 'Sports',
        image_url: 'https://images.unsplash.com/photo-1602143407151-011141959309?w=500&q=80',
        stock: 75
    }
];

async function seedDatabase() {
    try {
        await database.connect();
        console.log('Seeding database...');

        // Check if products already exist
        const existingProducts = await Product.findAll();
        if (existingProducts.length > 0) {
            console.log(`Database already has ${existingProducts.length} products. Skipping seed.`);
            await database.close();
            return;
        }

        // Insert sample products
        for (const product of sampleProducts) {
            await Product.create(product);
        }

        console.log(`Successfully seeded ${sampleProducts.length} products!`);
        await database.close();
    } catch (error) {
        console.error('Seeding error:', error);
        await database.close();
        process.exit(1);
    }
}

seedDatabase();
