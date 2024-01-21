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
    // Add other controller methods as needed
};
