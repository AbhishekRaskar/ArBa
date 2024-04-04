const express = require('express');
const { auth } = require('../Middlewares/authMiddleware');
const { categoryModel } = require('../Models/categoryModel');
const slugify = require('slugify');

const categoryRouter = express.Router();
categoryRouter.use(auth);

// Create Category
categoryRouter.post('/add', async (req, res) => {
    try {
        const { name } = req.body;
        const slug = slugify(name, { lower: true }); // Generate slug from category name

        const category = new categoryModel({ ...req.body, name, slug, owner: req.user.userID });
        await category.save();
        res.status(201).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// Read Categories
categoryRouter.get('/', async (req, res) => {
    try {
        const categories = await categoryModel.find({ owner: req.user.userID });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Read Single Category
categoryRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Update Category
categoryRouter.patch('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        // Generate new slug from updated name
        const slug = slugify(name, { lower: true });

        // Find and update category
        const category = await categoryModel.findByIdAndUpdate(id, { ...req.body, slug }, { new: true });

        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(category);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});


// Delete Category
categoryRouter.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModel.findByIdAndDelete(id);
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = {
    categoryRouter
};
