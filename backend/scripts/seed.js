const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Service = require('../models/Service');
const ServiceRequest = require('../models/ServiceRequest');
const Review = require('../models/Review');
const ProviderProfile = require('../models/ProviderProfile');
const bcrypt = require('bcryptjs');

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const sampleData = {
    users: [
        {
            name: 'John Developer',
            email: 'john@dev.com',
            password: 'password123',
            role: 'provider'
        },
        {
            name: 'Sarah Designer',
            email: 'sarah@design.com',
            password: 'password123',
            role: 'provider'
        },
        {
            name: 'Mike Writer',
            email: 'mike@writer.com',
            password: 'password123',
            role: 'provider'
        },
        {
            name: 'Emma Marketer',
            email: 'emma@market.com',
            password: 'password123',
            role: 'provider'
        },
        {
            name: 'Alex Customer',
            email: 'alex@customer.com',
            password: 'password123',
            role: 'customer'
        },
        {
            name: 'Lisa Customer',
            email: 'lisa@customer.com',
            password: 'password123',
            role: 'customer'
        }
    ],
    services: [
        {
            title: 'Full Stack Web Development',
            description: 'Complete web application development using React, Node.js, and MongoDB. Includes responsive design, authentication, and payment integration.',
            category: 'Web Development',
            price: 1500,
            deliveryTime: '14 days'
        },
        {
            title: 'Modern UI/UX Design',
            description: 'Beautiful, user-friendly designs for websites and mobile apps. Includes wireframes, prototypes, and final designs in Figma.',
            category: 'Graphic Design',
            price: 800,
            deliveryTime: '7 days'
        },
        {
            title: 'Professional Content Writing',
            description: 'High-quality blog posts, articles, website content, and SEO-optimized copywriting for your business.',
            category: 'Content Writing',
            price: 300,
            deliveryTime: '3 days'
        },
        {
            title: 'Digital Marketing Strategy',
            description: 'Comprehensive digital marketing strategy including SEO, social media, email marketing, and PPC campaigns.',
            category: 'Digital Marketing',
            price: 1200,
            deliveryTime: '10 days'
        },
        {
            title: 'Video Editing & Production',
            description: 'Professional video editing, color grading, motion graphics, and video production for YouTube, social media, and commercials.',
            category: 'Video Editing',
            price: 600,
            deliveryTime: '5 days'
        },
        {
            title: 'Mobile App Development',
            description: 'Native and cross-platform mobile app development for iOS and Android using React Native or Flutter.',
            category: 'App Development',
            price: 2000,
            deliveryTime: '21 days'
        },
        {
            title: 'SEO Optimization Services',
            description: 'Complete SEO audit, keyword research, on-page optimization, and link building to improve search rankings.',
            category: 'SEO Services',
            price: 900,
            deliveryTime: '10 days'
        },
        {
            title: 'Social Media Management',
            description: 'Full social media management including content creation, posting, engagement, and analytics for all platforms.',
            category: 'Social Media Management',
            price: 700,
            deliveryTime: '7 days'
        },
        {
            title: 'E-commerce Website Development',
            description: 'Complete e-commerce solution with shopping cart, payment gateway, inventory management, and admin panel.',
            category: 'Web Development',
            price: 2500,
            deliveryTime: '21 days'
        },
        {
            title: 'Logo & Brand Identity Design',
            description: 'Professional logo design and complete brand identity including color palette, typography, and brand guidelines.',
            category: 'Graphic Design',
            price: 500,
            deliveryTime: '5 days'
        },
        {
            title: 'Technical Blog Writing',
            description: 'Technical articles, tutorials, and documentation for software development, AI, and technology topics.',
            category: 'Content Writing',
            price: 400,
            deliveryTime: '4 days'
        },
        {
            title: 'PPC Campaign Management',
            description: 'Google Ads and social media advertising campaign setup, management, and optimization for maximum ROI.',
            category: 'Digital Marketing',
            price: 1000,
            deliveryTime: '7 days'
        }
    ]
};

const seedDatabase = async () => {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Service.deleteMany({});
        await ServiceRequest.deleteMany({});
        await Review.deleteMany({});
        await ProviderProfile.deleteMany({});

        console.log('🔄 Creating users...');
        const createdUsers = [];
        for (const userData of sampleData.users) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(userData.password, salt);
            const user = await User.create({
                ...userData,
                password: hashedPassword
            });
            createdUsers.push(user);
            console.log(`✅ Created user: ${user.name} (${user.role})`);
        }

        const providers = createdUsers.filter(u => u.role === 'provider');
        const customers = createdUsers.filter(u => u.role === 'customer');

        console.log('🔄 Creating provider profiles...');
        for (const provider of providers) {
            await ProviderProfile.create({
                userId: provider._id,
                skills: ['JavaScript', 'React', 'Node.js', 'MongoDB'],
                pricing: {
                    hourly: 50 + Math.floor(Math.random() * 50),
                    fixed: 500 + Math.floor(Math.random() * 1000)
                },
                experience: [
                    {
                        title: 'Senior Developer',
                        company: 'Tech Corp',
                        startDate: new Date('2020-01-01'),
                        isCurrent: true,
                        description: 'Leading development team on enterprise projects'
                    }
                ],
                averageRating: 4.5,
                totalReviews: 10
            });
            console.log(`✅ Created profile for: ${provider.name}`);
        }

        console.log('🔄 Creating services...');
        const createdServices = [];
        for (let i = 0; i < sampleData.services.length; i++) {
            const serviceData = sampleData.services[i];
            const provider = providers[i % providers.length];
            
            const service = await Service.create({
                providerId: provider._id,
                ...serviceData,
                isActive: true
            });
            createdServices.push(service);
            console.log(`✅ Created service: ${service.title}`);
        }

        console.log('🔄 Creating reviews...');
        for (let i = 0; i < 20; i++) {
            const customer = customers[i % customers.length];
            const provider = providers[i % providers.length];
            const service = createdServices[i % createdServices.length];

            await Review.create({
                requestId: new mongoose.Types.ObjectId(),
                reviewerId: customer._id,
                providerId: provider._id,
                rating: 3 + Math.floor(Math.random() * 3),
                feedback: [
                    'Excellent work! Highly recommended.',
                    'Great communication and on-time delivery.',
                    'Professional and knowledgeable.',
                    'Exceeded my expectations!',
                    'Very satisfied with the results.',
                    'Will work again for sure.',
                    'Amazing quality of work.',
                    'Highly professional and skilled.'
                ][i % 8]
            });
            console.log(`✅ Created review #${i + 1}`);
        }

        console.log('🎉 Database seeded successfully!');
        console.log(`📊 Created: ${createdUsers.length} users, ${createdServices.length} services, 20 reviews`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();