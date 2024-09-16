const ProductService = require('../services/productService');

module.exports = {
    getAllProducts: async (req, res) => {
        try {
            const products = await ProductService.getAllProducts();
            res.json(products);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    getProductById: async (req, res) => {
        const productId = req.params.id;

        try {
            const product = await ProductService.getProductById(productId);
            if (product) {
                res.json(product);
            } else {
                res.status(404).json({ message: 'Product not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    createProduct: async (req, res) => {
        const { name, price } = req.body;

        try {
            const newProduct = await ProductService.createProduct({ name, price });
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },
    // Add other controller methods as needed
};
