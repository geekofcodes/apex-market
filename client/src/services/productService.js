const productService = {
    getProducts: async () => {
        try {
            const response = await fetch('/api/products');
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error; // Rethrow the error for the calling component to handle
        }
    },

    // Add more methods for fetching other types of products or handling CRUD operations
};

export default productService;
