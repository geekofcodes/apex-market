// // ProductList.js
// import React, { useState, useEffect } from 'react';
// import { Card, Col, Row } from 'antd';

// const ProductList = () => {
//     const [products, setProducts] = useState([]);

//     useEffect(() => {
//         fetch('/api/products')
//             .then(response => response.json())
//             .then(data => setProducts(data))
//             .catch(error => console.error('Error fetching products:', error));
//     }, []);

//     return (
//         <div>
//             <h1>Product List</h1>
//             <Row gutter={[16, 16]}>
//                 {products.map(product => (
//                     <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
//                         <Card
//                             hoverable
//                             cover={<img alt={product.name} src={product.image} />}
//                         >
//                             <Card.Meta
//                                 title={product.name}
//                                 description={
//                                     <>
//                                         <p>{product.description}</p>
//                                         <p>Price: ${product.price}</p>
//                                     </>
//                                 }
//                             />
//                         </Card>
//                     </Col>
//                 ))}
//             </Row>
//         </div>
//     );
// };

// export default ProductList;

// ProductList.js
import React, { useState, useEffect } from 'react';
import { Col, Row, } from 'antd';
import ProductDetail from './ProductDetail';
import productService from '../../services/productService';

const ProductList = ({ userId }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        console.log(userId)
        productService.getProducts()
            .then(data => setProducts(data))
            .catch(error => console.error('Error fetching products:', error));
    }, [userId]);

    return (
        <div>
            <h1>Product List</h1>
            <Row gutter={[16, 16]}>
                {products.map(product => (
                    <Col key={product._id} xs={24} sm={12} md={8} lg={6}>
                        <ProductDetail product={product} userId={userId} />
                    </Col>
                ))}
            </Row>
        </div>
    );
};

export default ProductList;

