const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true }, // New field
    size: { type: String, required: true },        // New field
    images: { type: [String], required: true }     // New field (array of image URLs)
    // ...existing code...
});

module.exports = mongoose.model('Product', productSchema);
