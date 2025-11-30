const port = 4000;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");
require("dotenv").config();

// Check if JWT_SECRET is defined
if (!process.env.JWT_SECRET) {
    console.warn("Warning: JWT_SECRET is not defined in the environment variables. Please set it in the .env file.");
}

app.use(express.json());
app.use(cors());

// Ensure upload directory exists
const uploadDir = "./upload/images";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Database Connection
mongoose.connect("mongodb+srv://<mongodbpassword>@cluster0.ky378.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Image Storage Engine
const storage = multer.diskStorage({
    destination: uploadDir,
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

// Upload images route (Supports multiple images)
app.post("/upload", upload.array("product", 3), (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            console.error("No files uploaded");
            return res.status(400).json({ success: 0, message: "No images uploaded" });
        }

        const imageUrls = req.files.map(file => `http://localhost:${port}/images/${file.filename}`);
        console.log("Uploaded Image URLs:", imageUrls);

        res.json({ success: 1, image_urls: imageUrls });
    } catch (error) {
        console.error("Upload Error:", error.message, error.stack);
        res.status(500).json({ success: 0, message: "Server Error", error: error.message });
    }
});

// Serve uploaded images
app.use('/images', express.static(uploadDir)); // Ensure this serves the correct directory

// Middleware to fetch user from database
const fetchuser = async (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) {
        return res.status(401).send({ errors: "Please authenticate using a valid token" });
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ errors: "Invalid authentication token" });
    }
};

// User Schema
const Users = mongoose.model("Users", {
    name: String,
    email: { type: String, unique: true },
    password: String,
    cartData: Object,
    date: { type: Date, default: Date.now },
});

// Product Schema
const Product = mongoose.model("Product", {
    id: { type: Number, required: true },
    name: { type: String, required: true },
    images: { type: [String], validate: [arrayLimit, '{PATH} exceeds the limit of 3'], required: true },
    category: { type: String, required: true },
    new_price: Number,
    old_price: Number,
    description: { type: String, required: true },
    size: { type: [String], required: true },
    date: { type: Date, default: Date.now },
    available: { type: Boolean, default: true },
});

// Order Schema
const Order = mongoose.model("Order", {
    userId: { type: String, required: true },
    items: [{ product: String, price: Number, quantity: Number }],
    totalAmount: { type: Number, required: true },
    address: { type: String, required: true },
    date: { type: Date, default: Date.now },
});

// Limit images to max 3
function arrayLimit(val) {
    return val.length <= 3;
}

app.get("/", (req, res) => res.send("Root"));

// Login Endpoint
app.post('/login', async (req, res) => {
    try {
        // Log incoming request for debugging
        console.log("Login request received:", req.body);

        const user = await Users.findOne({ email: req.body.email });
        if (!user) {
            console.error("User not found with email:", req.body.email);
            return res.status(400).json({ success: false, errors: "Invalid credentials" });
        }

        if (req.body.password !== user.password) {
            console.error("Invalid password for user:", req.body.email);
            return res.status(400).json({ success: false, errors: "Invalid credentials" });
        }

        // Ensure JWT_SECRET is defined
        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not defined in environment variables");
            return res.status(500).json({ success: false, errors: "Server configuration error" });
        }

        const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
        res.json({ success: true, token });
    } catch (error) {
        console.error("Login Error:", error.message, error.stack);
        res.status(500).json({ success: false, errors: "Server error. Please try again later." });
    }
});

// Signup Endpoint
app.post('/signup', async (req, res) => {
    let check = await Users.findOne({ email: req.body.email });
    if (check) return res.status(400).json({ success: false, errors: "User already exists" });

    let cart = {};
    for (let i = 0; i < 300; i++) cart[i] = 0;

    const user = new Users({
        name: req.body.username,
        email: req.body.email,
        password: req.body.password,
        cartData: cart,
    });
    await user.save();
    const token = jwt.sign({ user: { id: user.id } }, process.env.JWT_SECRET);
    res.json({ success: true, token });
});

// Get all products (with category filtering)
app.get("/allproducts", async (req, res) => {
    try {
        const { category } = req.query;
        let products;

        if (category) {
            products = await Product.find({ category });
        } else {
            products = await Product.find({});
        }

        console.log("Products fetched for category:", category || "all", products);
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error.message);
        res.status(500).json({ success: false, message: "Failed to fetch products" });
    }
});

// Add product endpoint
app.post("/addproduct", async (req, res) => {
    try {
        console.log("Incoming product data:", req.body);

        let products = await Product.find({});
        let id = products.length ? products.slice(-1)[0].id + 1 : 1;

        const { name, images, category, new_price, old_price, description, size } = req.body;

        // Validate required fields
        if (!name || !images || !category || !new_price || !old_price || !description || !size || images.length === 0) {
            console.error("Validation Error: Missing required fields", req.body);
            return res.status(400).json({ success: false, message: "All fields are required, including images" });
        }

        // Validate category
        const validCategories = ["featured", "our-products", "producers-corners"];
        if (!validCategories.includes(category)) {
            console.error("Validation Error: Invalid category", category);
            return res.status(400).json({ success: false, message: `Invalid category. Allowed categories are: ${validCategories.join(", ")}` });
        }

        const product = new Product({ id, name, images, category, new_price, old_price, description, size });
        console.log("Product to be saved:", product);
        await product.save();

        console.log("Product saved successfully:", product);
        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        console.error("Error adding product:", error.message, error.stack);
        res.status(500).json({ success: false, message: "An error occurred", error: error.message });
    }
});

// Remove product endpoint
app.post("/removeproduct", async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ id: req.body.id });
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }
        console.log("Product removed successfully:", product);
        res.json({ success: true, message: "Product removed successfully" });
    } catch (error) {
        console.error("Error removing product:", error.message, error.stack);
        res.status(500).json({ success: false, message: "An error occurred", error: error.message });
    }
});

// Place Order Endpoint
app.post("/api/orders/checkout", fetchuser, async (req, res) => {
    try {
        const { items, totalAmount, address } = req.body;

        if (!items || !totalAmount || !address) {
            return res.status(400).json({ success: false, error: "Missing required fields" });
        }

        const order = new Order({
            userId: req.user.id,
            items,
            totalAmount,
            address,
        });

        await order.save();
        res.json({ success: true, orderId: order._id });
    } catch (error) {
        console.error("Error placing order:", error.message);
        res.status(500).json({ success: false, error: "Server error. Please try again later." });
    }
});

// Start server
app.listen(port, () => console.log("Server Running on port " + port));
