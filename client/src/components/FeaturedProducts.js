import React from 'react';
import { Card, Button } from 'antd';

const FeaturedProducts = ({ products }) => {
    return (
        <div className="featured-products-container">
            {products.map((product) => (
                <Card 
                    key={product.id} 
                    className="featured-product-card" 
                    hoverable 
                    cover={<img alt={product.name} src={product.imageUrl} />}
                >
                    <Card.Meta title={product.name} description={product.description} />
                    <p>₹{product.price}</p>
                    <Button type="primary">Add to Cart</Button>
                </Card>
            ))}
        </div>
    );
};

export default FeaturedProducts;
