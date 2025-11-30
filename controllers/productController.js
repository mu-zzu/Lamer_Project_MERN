const Product = require('../models/product');

// ...existing code...

exports.addProduct = async (req, res) => {
    try {
        const { name, price, description, size, images } = req.body; // Include new fields
        if (!name || !price || !description || !size || !images) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const product = new Product({ name, price, description, size, images });
        await product.save();
        res.status(201).json({ message: 'Product added successfully', product });
    } catch (error) {
        console.error('Error adding product:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.', error });
    }
};

// ...existing code...
