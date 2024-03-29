// ProductDetail.js
import React, { useState } from 'react';
import { Card, Button, InputNumber } from 'antd';
import cartService from '../../services/cartService';

const ProductDetail = ({ product, userId, setCartCount }) => {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = async () => {
    try {
        console.log('Adding to cart - userId:', userId);
      await cartService.addToCart(userId, product._id, quantity);
      console.log("clicked")
      // Fetch and log the updated cart count after adding to cart
      const updatedCartCount = await cartService.getCartCount(userId);
      console.log('Updated Cart Count:', updatedCartCount);
      // You may want to update the cart count in your state or trigger a refresh
      setCartCount(updatedCartCount)
      console.log('added to cart');
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
            {/* <p>Price: 55</p> */}
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
