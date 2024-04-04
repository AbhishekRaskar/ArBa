const express = require('express');
const { auth } = require('../Middlewares/authMiddleware');
const { productModel } = require('../Models/productModel');
const { categoryModel } = require('../Models/categoryModel');

const productRouter = express.Router();
productRouter.use(auth);

// Create Product
productRouter.post('/add', async (req, res) => {
    try {
        const { title, description, price, category, image } = req.body;

        // Check if category exists
        const categoryExists = await categoryModel.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ error: 'Category not found' });
        }

        // Construct product object
        const product = new productModel({
            title,
            description,
            price,
            category,
            image,
            owner: req.user.userID
        });

        // Save product to database
        await product.save();
        res.status(201).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Update Product
productRouter.patch('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, price, category, image } = req.body;

        // Check if product exists
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Check if category exists
        const categoryExists = await categoryModel.findById(category);
        if (!categoryExists) {
            return res.status(400).json({ error: 'Category not found' });
        }

        // Update product fields
        product.title = title;
        product.description = description;
        product.price = price;
        product.category = category;
        product.image = image;

        // Save updated product to database
        await product.save();
        res.status(200).json(product);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// Read Products
productRouter.get('/', async (req, res) => {
    try {
        const { title, sortBy, category } = req.query;
        let products;

        // Search by title if provided
        if (title) {
            products = await productModel.find({ title: { $regex: title, $options: 'i' } });
        } else {
            products = await productModel.find({ owner: req.user.userID });
        }

        // Sort by price if requested
        if (sortBy === 'price') {
            products.sort((a, b) => a.price - b.price);
        }

        // Filter by category if provided
        if (category) {
            products = products.filter(product => product.category === category);
        }

        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Read Single Product
productRouter.get('/:id', async (req, res) => {
    try {
        const product = await productModel.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete Product
productRouter.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Check if product exists
        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Delete product from database
        await productModel.findByIdAndDelete(id);
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = {
    productRouter
};
