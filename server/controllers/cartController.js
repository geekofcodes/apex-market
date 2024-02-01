// cartController.js
const Cart = require('../models/Cart');

module.exports = {
    getCartByUserId: async (req, res) => {
        const userId = req.params.userId;

        try {
            const cart = await Cart.findOne({ userId }).populate('products.productId');
            if (cart) {
                res.json(cart);
            } else {
                res.status(404).json({ message: 'Cart not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    addToCart: async (req, res) => {
        const userId = req.params.userId;
        const { productId, quantity } = req.body;

        try {
            let cart = await Cart.findOne({ userId });

            if (!cart) {
                cart = await Cart.create({ userId, products: [] });
            }

            // Check if the product is already in the cart
            const existingProduct = cart.products.find(
                (product) => product.productId.toString() === productId
            );

            if (existingProduct) {
                // If the product exists, update the quantity
                existingProduct.quantity += quantity;
            } else {
                // If the product is not in the cart, add it
                cart.products.push({ productId, quantity });
            }

            await cart.save();

            res.json(cart);
        } catch (error) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    getCartCount: async (req, res) => {
        const userId = req.params.userId;
    
        try {
          const cart = await Cart.findOne({ userId });
    
          if (cart) {
            // Calculate the total quantity of products in the cart
            const cartCount = cart.products.reduce((total, product) => total + product.quantity, 0);
            res.json({ message: 'Items found in cart', count: cartCount });
          } else {
            res.status(404).json({ message: 'Cart not found' });
          }
        } catch (error) {
          res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
      },
    // Add other controller methods as needed
};
