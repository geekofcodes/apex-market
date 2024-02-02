// ProductList.js
import React, { useState, useEffect } from 'react';
import { Col, Row, } from 'antd';
import ProductDetail from './ProductDetail';
import productService from '../../services/productService';

const ProductList = ({ userId, setCartCount }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log(userId)
        productService.getProducts()
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, [userId]);

    return (
        <div>
            <Row gutter={[16, 16]}>
                {products.map(product => (
                    <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                        <ProductDetail product={product} userId={userId} setCartCount={setCartCount} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductList;

