import React, { useState, useEffect } from 'react';
import cartService from '../../services/cartService';
import { Card, Button, InputNumber, Typography, Row, Col } from 'antd';

const { Text, Title } = Typography;

const CartItem = ({ userId }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const fetchCartItems = async () => {
    try {
      // Fetch cart items for the user
      const cartData = await cartService.getCartByUserId(userId);

      // Extract cart items and calculate total price
      const items = cartData.products.map((item) => {
        return {
          name: item.productId.name,
          quantity: item.quantity,
          price: item.productId.price,
          image: item.productId.image,
        };
      });

      const total = items.reduce((total, item) => {
        return total + item.price * item.quantity;
      }, 0);

      setCartItems(items);
      setTotalPrice(total);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userId]);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    console.log(productId)
    try {
      // Update quantity in the cart
      await cartService.updateCartItemQuantity(userId, productId, newQuantity);

      // Refresh cart items and total price
      fetchCartItems();
    } catch (error) {
      console.error('Error updating cart item quantity:', error);
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      // Remove item from the cart
      await cartService.removeFromCart(userId, productId);

      // Refresh cart items and total price
      fetchCartItems();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  return (
    <div className='m-10'>
      <Title level={2}>Shopping Cart</Title>
      <Row gutter={[16, 16]}>
        {cartItems.map((item) => (
          <Col key={item.productId} xs={24} sm={12} md={8} lg={6}>
            <Card
              hoverable
              style={{ marginBottom: '16px' }}
              cover={<img alt={item.name} src={item.image} />}
            >
              <Card.Meta
                title={item.name}
                description={
                  <>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <label>Quantity:</label>
                    <InputNumber
                      min={1}
                      value={item.quantity}
                      onChange={(value) => handleUpdateQuantity(item.productId, value)}
                    />
                    <Button type="danger" onClick={() => handleRemoveFromCart(item.productId)}>
                      Remove
                    </Button>
                  </>
                }
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Text strong>Total Price: ${totalPrice.toFixed(2)}</Text>
    </div>
  );
};

export default CartItem;
