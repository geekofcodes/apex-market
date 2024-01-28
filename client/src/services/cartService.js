// cartService.js
const API_URL = '/api/cart';

const cartService = {
  getCartByUserId: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`);
      if (!response.ok) {
        throw new Error(`Error fetching cart: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  },

  addToCart: async (userId, productId, quantity) => {
    try {
      const response = await fetch(`${API_URL}/${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          quantity,
        }),
      });

      if (!response.ok) {
        throw new Error(`Error adding to cart: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding to cart:', error);
      throw error;
    }
  },

  getCartCount: async (userId) => {
    try {
      const response = await fetch(`${API_URL}/count/${userId}`);
      if (!response.ok) {
        throw new Error(`Error fetching cart count: ${response.status} - ${response.statusText}`);
      }

      const data = await response.json();
      return data.count;
    } catch (error) {
      console.error('Error fetching cart count:', error);
      throw error;
    }
  },

  
};

export default cartService;
