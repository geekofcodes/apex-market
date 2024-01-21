import React from 'react';
import { Card, Button, Row, Col } from 'antd';

const FeaturedProducts = ({ products }) => {
    return (
        <div className="featured-products-container">
            <Row gutter={[16, 16]}>
                {products.map((product) => (
                    <Col key={product._id.$oid} xs={24} sm={12} md={8} lg={6} xl={4}>
                        <Card className="featured-product-card" hoverable cover={<img alt={product.name} src={product.image} />}>
                            <Card.Meta title={product.name} description={product.description} />
                            <p>₹{product.price}</p>
                            <Button type="primary">Add to Cart</Button>
                        </Card>
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default FeaturedProducts;
