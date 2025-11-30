const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// ...existing code...

router.post('/add', async (req, res) => {
    try {
        const { name, price, description, size, images } = req.body;
        if (!name || !price || !description || !size || !images) {
            console.error('Validation Error: Missing required fields', req.body);
            return res.status(400).json({ message: 'All fields are required' });
        }
        const product = new Product({ name, price, description, size, images });
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        console.error('Error adding product:', error.message, error.stack);
        res.status(500).json({ message: 'An error occurred. Please try again.', error: error.message });
    }
});

// ...existing code...

module.exports = router;
