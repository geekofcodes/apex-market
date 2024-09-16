const Product = require('../models/Product');

module.exports = {
    getAllProducts: async () => {
        return await Product.find();
    },
    getProductById: async (productId) => {
        return await Product.findById(productId);
    },
    createProduct: async (productData) => {
        const { name, price } = productData;

        const newProduct = new Product({
            name,
            price
        });

        return await newProduct.save();
    }
};
