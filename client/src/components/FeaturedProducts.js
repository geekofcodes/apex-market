import React from 'react';

const FeaturedProducts = ({ products }) => {
    return (
        <div className="featured-products-container">
            {products.map((product) => (
                <div key={product.id} className="featured-product-card">
                    <img src={product.imageUrl} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>
                    <span>${product.price}</span>
                    <button>Add to Cart</button>
                </div>
            ))}
        </div>
    );
};

export default FeaturedProducts;
