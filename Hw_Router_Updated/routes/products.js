
const express = require('express');
const router = express.Router();
const data = require('../data');

// GET /api/products
router.get('/', (req, res) => {
    res.json({ products: data.products });
});

// GET /api/products/:id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = data.products.find(item => item.id === parseInt(id));
    if (product) res.json(product);
    else res.status(404).json({ message: `Product with ID: ${id} not found` });
});

// POST /api/products
router.post('/', (req, res) => {
    const productData = req.body;
    const existingProduct = data.products.find(item => item.id === productData.id);
    if (existingProduct) {
        return res.status(400).json({ message: 'Product ID already exists.' });
    }

    if (!productData.name || productData.price === undefined) {
        return res.status(400).json({ message: 'Product name and price are required.' });
    }

    if (productData.price <= 0 || (productData.stock !== undefined && productData.stock < 0)) {
        return res.status(400).json({ message: 'Price must be greater than 0 and stock must be non-negative.' });
    }

    data.products.push(productData);
    res.json({ message: 'Product added', products: data.products });
});

// PUT /api/products/:id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const productData = req.body;
    const productIndex = data.products.findIndex(item => item.id === parseInt(id));

    if (productIndex === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }

    data.products[productIndex] = { ...data.products[productIndex], ...productData };
    res.json({ message: `Product with ID: ${id} updated`, products: data.products });
});

// DELETE /api/products/:id
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const productIndex = data.products.findIndex(item => item.id === parseInt(id));

    if (productIndex !== -1) {
        data.products.splice(productIndex, 1);
        res.json({ message: `Product with ID: ${id} deleted`, products: data.products });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

module.exports = router;
