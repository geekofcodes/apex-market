import React from 'react';
import { Button, Card, CardContent, Container, Grid, Typography } from '@mui/material';

const Home = () => {
  return (
    <div>
      <header
        className="bg-cover bg-center h-screen text-white flex items-center"
        style={{ backgroundImage: `url('https://via.placeholder.com/1920x1080')` }}
      >
        <div className="text-center mx-auto">
          <h1 className="text-5xl font-extrabold mb-4">Discover Unique Products</h1>
          <p className="text-lg mb-8">Shop the latest trends and find exclusive items.</p>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="#featured-products"
          >
            Explore Now
          </Button>
        </div>
      </header>

      <Container maxWidth="lg" className="my-12">
        <Typography variant="h2" className="text-3xl font-bold mb-8">
          Featured Products
        </Typography>
        <Grid container spacing={3}>
          {/* Featured product cards go here */}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <img
                src="https://via.placeholder.com/150"
                alt="Product"
                className="w-full h-48 object-cover"
              />
              <CardContent>
                <Typography variant="h5" component="div" className="mb-2">
                  Product Title
                </Typography>
                <Typography variant="body2" color="text.secondary" className="mb-4">
                  Product description goes here.
                </Typography>
                <Typography variant="h6" className="text-blue-500 font-semibold mb-2">
                  $19.99
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
          {/* Repeat the above card for each featured product */}
        </Grid>
      </Container>

      <section className="bg-gray-100 py-12">
        <Container maxWidth="md" className="text-center">
          <Typography variant="h4" className="text-4xl font-extrabold mb-4">
            Get Exclusive Offers
          </Typography>
          <Typography variant="body1" color="text.secondary" className="text-lg text-gray-600 mb-8">
            Sign up for our newsletter to receive special discounts and updates.
          </Typography>
          <div className="max-w-md mx-auto">
            <form>
              <div className="flex items-center border-b border-b-2 border-gray-500 py-2">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Your Email"
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className="flex-shrink-0 hover:bg-blue-700 text-sm rounded-full transition duration-300"
                >
                  Subscribe
                </Button>
              </div>
            </form>
          </div>
        </Container>
      </section>
    </div>
  );
};

export default Home;
