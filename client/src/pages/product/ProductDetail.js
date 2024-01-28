// ProductDetail.js
import React, { useState } from 'react';
import { Card, Button, InputNumber } from 'antd';
import cartService from '../services/cartService';

const ProductDetail = ({ product, userId }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
      await cartService.addToCart(userId, product._id, quantity);
      // You may want to update the cart count in your state or trigger a refresh
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <Card
      hoverable
      cover={<img alt={product.name} src={product.image} />}
    >
      <Card.Meta
        title={product.name}
        description={
          <>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <label>Quantity:</label>
            <InputNumber
              min={1}
              value={quantity}
              onChange={(value) => setQuantity(value)}
            />
            <Button type="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </>
        }
      />
    </Card>
  );
};

export default ProductDetail;
