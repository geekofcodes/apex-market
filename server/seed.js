const mongoose = require('mongoose');
const Product = require('./models/Product');
const dotenv = require('dotenv');
const path = require('path'); // Import path module to handle file paths

// Load environment variables from .env file
dotenv.config();

// Use the MONGODB_URI from the environment variables
const mongoURI = process.env.MONGODB_URI;

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Define the base path for images
const basePath = '../../assets/images/products';

const products = [
    {
        name: 'Ultra HD Smart TV',
        price: 89999, // Price in rupees
        description: '70-inch 4K Ultra HD Smart LED TV with built-in streaming services.',
        image: path.join(basePath, 'tv.jpg'),
    },
    {
        name: 'Wireless Noise-Canceling Headphones',
        price: 14999, // Price in rupees
        description: 'Over-ear wireless headphones with active noise cancellation technology.',
        image: path.join(basePath, 'headphones.jpg'),
    },
    {
        name: 'Smartwatch Fitness Tracker',
        price: 7999, // Price in rupees
        description: 'Fitness tracker smartwatch with heart rate monitoring and sleep tracking.',
        image: path.join(basePath, 'smartwatch.jpg'),
    },
    {
        name: 'High-Performance Gaming Laptop',
        price: 169999, // Price in rupees
        description: '15.6-inch gaming laptop with NVIDIA GeForce RTX graphics and Intel Core i7 processor.',
        image: path.join(basePath, 'laptop.jpg'),
    },
    {
        name: 'Professional DSLR Camera',
        price: 129999, // Price in rupees
        description: 'Full-frame DSLR camera with high-resolution sensor and 4K video recording.',
        image: path.join(basePath, 'camera.jpg'),
    },
    {
        name: 'Bluetooth Portable Speaker',
        price: 4999, // Price in rupees
        description: 'Portable Bluetooth speaker with 360-degree sound and water-resistant design.',
        image: path.join(basePath, 'speaker.jpg'),
    },
    {
        name: 'Electric Stand Mixer',
        price: 19999, // Price in rupees
        description: '5-quart electric stand mixer for baking and cooking enthusiasts.',
        image: path.join(basePath, 'mixer.jpg'),
    },
    {
        name: 'Memory Foam Mattress',
        price: 59999, // Price in rupees
        description: '12-inch memory foam mattress with cooling gel technology for a comfortable sleep.',
        image: path.join(basePath, 'mattress.jpg'),
    },
    {
        name: 'Robot Vacuum Cleaner',
        price: 29999, // Price in rupees
        description: 'Smart robot vacuum with mapping technology and voice control.',
        image: path.join(basePath, 'vaccum.jpg'),
    },
    {
        name: 'Smart Thermostat',
        price: 12999, // Price in rupees
        description: 'Wi-Fi-enabled smart thermostat for efficient home temperature control.',
        image: path.join(basePath, 'thermostat.jpg'),
    },
    {
        name: 'Outdoor Camping Tent',
        price: 14999, // Price in rupees
        description: 'Spacious camping tent with weather-resistant materials for outdoor adventures.',
        image: path.join(basePath, 'tent.jpg'),
    },
    {
        name: 'Noise Isolating In-Ear Earphones',
        price: 4999, // Price in rupees
        description: 'High-quality in-ear earphones with noise isolation technology for immersive audio.',
        image: path.join(basePath, 'earphones.jpg'),
    },
    {
        name: 'Electric Coffee Grinder',
        price: 3999, // Price in rupees
        description: 'Electric coffee grinder for freshly ground coffee beans.',
        image: path.join(basePath, 'coffee_grinder.jpg'),
    },
    {
        name: 'Air Fryer',
        price: 7999, // Price in rupees
        description: 'Digital air fryer for healthier cooking with less oil.',
        image: path.join(basePath, 'air_fryer.jpg'),
    },
    {
        name: 'Wireless Gaming Mouse',
        price: 5999, // Price in rupees
        description: 'Wireless gaming mouse with customizable RGB lighting and precision tracking.',
        image: path.join(basePath, 'gaming_mouse.jpg'),
    },
    {
        name: 'Smart Home Security Camera',
        price: 12999, // Price in rupees
        description: 'Wireless smart home security camera with motion detection and night vision.',
        image: path.join(basePath, 'security_camera.jpg'),
    },
    {
        name: 'Electric Toothbrush',
        price: 4999, // Price in rupees
        description: 'Electric toothbrush with multiple brushing modes and timer for effective oral care.',
        image: path.join(basePath, 'electric_toothbrush.jpg'),
    },
    {
        name: 'Cordless Drill Kit',
        price: 12999, // Price in rupees
        description: 'Cordless drill kit with various drill bits for DIY projects and home repairs.',
        image: path.join(basePath, 'drill_kit.jpg'),
    },
    {
        name: 'Indoor Plant Set',
        price: 3999, // Price in rupees
        description: 'Set of indoor plants with decorative pots for home or office.',
        image: path.join(basePath, 'plant_set.jpg'),
    },
    {
        name: 'Digital Drawing Tablet',
        price: 19999, // Price in rupees
        description: 'Graphic drawing tablet for digital artists and creative professionals.',
        image: path.join(basePath, 'tablet.jpg'),
    },
    {
        name: 'Stainless Steel Cookware Set',
        price: 14999, // Price in rupees
        description: 'Durable stainless steel cookware set for versatile cooking in the kitchen.',
        image: path.join(basePath, 'cookware_set.jpg'),
    },
    {
        name: 'Wireless Gaming Keyboard',
        price: 8999, // Price in rupees
        description: 'Wireless gaming keyboard with customizable RGB backlighting for immersive gaming.',
        image: path.join(basePath, 'keyboard.jpg'),
    },
    {
        name: 'Home Espresso Machine',
        price: 29999, // Price in rupees
        description: 'Professional-grade home espresso machine for coffee enthusiasts.',
        image: path.join(basePath, 'espresso_machine.jpg'),
    },
    {
        name: 'Gaming Console Bundle',
        price: 39999, // Price in rupees
        description: 'Gaming console bundle with multiple games and accessories.',
        image: path.join(basePath, 'gaming_console.jpg'),
    },
    {
        name: `Professional Chef's Knife`,
        price: 7999, // Price in rupees
        description: 'High-quality professional chef\'s knife for precision cutting in the kitchen.',
        image: path.join(basePath, 'knife.jpg'),
    },
    {
        name: 'Home Office Desk',
        price: 24999, // Price in rupees
        description: 'Stylish home office desk with ample storage space and ergonomic design.',
        image: path.join(basePath, 'desk.jpg'),
    },
    // Add more products as needed
];

Product.insertMany(products)
    .then(() => {
        console.log('Products seeded successfully');
        mongoose.connection.close();
    })
    .catch(error => {
        console.error('Error seeding products:', error);
        mongoose.connection.close();
    });
