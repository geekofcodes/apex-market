import React, { useEffect, useState } from 'react';
import productService from '../services/productService';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductList from './product/ProductList';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const Home = ({ userId, setCartCount }) => {
    const [featuredProducts, setFeaturedProducts] = useState([]);

    useEffect(() => {
        // Fetch products from the server
        // console.log(userId)
        productService.getProducts()
            .then((data) => setFeaturedProducts(data))
            .catch((error) => console.error('Error fetching products:', error));
    }, []);

    return (
        <div className="container mx-auto m-6">
            <section className="text-center">
                <Title level={1}>Welcome to Our E-Commerce Store</Title>
                <Paragraph>
                    Discover the latest and greatest products right here.
                </Paragraph>
            </section>

            <section className="m-8">
                <Title level={2}>Featured Products</Title>
                <FeaturedProducts products={featuredProducts} />
            </section>

            <section className="m-8">
                <Title level={2}>All Products</Title>
                <ProductList userId={userId} setCartCount={setCartCount} />
            </section>

            <section className="m-8">
                <Title level={2}>Special Offers</Title>
                <Paragraph>
                    Check out our special offers and save big on your favorite items.
                </Paragraph>
            </section>

            <section className="m-8">
                <Title level={2}>Popular Categories</Title>
                <Paragraph>
                    Explore our popular categories to find what you're looking for.
                </Paragraph>
            </section>
        </div>
    );
};

export default Home;
