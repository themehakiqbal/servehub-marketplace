const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/User');
const Service = require('../models/Service');
const ProviderProfile = require('../models/ProviderProfile');
const bcrypt = require('bcryptjs');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('✅ MongoDB Connected');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};

// ✅ ONLY ALLOWED VALUES - match Service model enum
const ALLOWED_DELIVERY = ['1 day', '2 days', '3 days', '5 days', '7 days', '14 days', '30 days'];

const servicesData = [
    // Web Development (10)
    { title: 'Full Stack Web Development', category: 'Web Development', price: 1500, deliveryTime: '14 days' },
    { title: 'React.js Website Development', category: 'Web Development', price: 1200, deliveryTime: '7 days' },
    { title: 'Node.js API Development', category: 'Web Development', price: 800, deliveryTime: '7 days' },
    { title: 'E-commerce Website Development', category: 'Web Development', price: 2000, deliveryTime: '14 days' },
    { title: 'Portfolio Website Design', category: 'Web Development', price: 500, deliveryTime: '5 days' },
    { title: 'Custom CMS Development', category: 'Web Development', price: 1000, deliveryTime: '7 days' },
    { title: 'WordPress Theme Development', category: 'Web Development', price: 700, deliveryTime: '5 days' },
    { title: 'Next.js Web Application', category: 'Web Development', price: 1300, deliveryTime: '7 days' },
    { title: 'Vue.js Single Page Application', category: 'Web Development', price: 1100, deliveryTime: '7 days' },
    { title: 'Angular Web Application', category: 'Web Development', price: 1400, deliveryTime: '14 days' },
    // Graphic Design (8)
    { title: 'Professional Logo Design', category: 'Graphic Design', price: 300, deliveryTime: '3 days' },
    { title: 'Brand Identity Package', category: 'Graphic Design', price: 600, deliveryTime: '7 days' },
    { title: 'Social Media Graphics', category: 'Graphic Design', price: 200, deliveryTime: '2 days' },
    { title: 'Business Card Design', category: 'Graphic Design', price: 150, deliveryTime: '2 days' },
    { title: 'Flyer & Poster Design', category: 'Graphic Design', price: 250, deliveryTime: '3 days' },
    { title: 'Packaging Design', category: 'Graphic Design', price: 400, deliveryTime: '5 days' },
    { title: 'Infographic Design', category: 'Graphic Design', price: 350, deliveryTime: '3 days' },
    { title: 'UI/UX Design for Apps', category: 'Graphic Design', price: 800, deliveryTime: '7 days' },
    // Content Writing (8)
    { title: 'SEO Blog Posts', category: 'Content Writing', price: 100, deliveryTime: '2 days' },
    { title: 'Website Content Writing', category: 'Content Writing', price: 200, deliveryTime: '3 days' },
    { title: 'Technical Documentation', category: 'Content Writing', price: 300, deliveryTime: '3 days' },
    { title: 'Product Descriptions', category: 'Content Writing', price: 150, deliveryTime: '2 days' },
    { title: 'Ghostwriting Services', category: 'Content Writing', price: 400, deliveryTime: '7 days' },
    { title: 'Press Release Writing', category: 'Content Writing', price: 250, deliveryTime: '3 days' },
    { title: 'Email Newsletter Writing', category: 'Content Writing', price: 180, deliveryTime: '2 days' },
    { title: 'White Paper Writing', category: 'Content Writing', price: 500, deliveryTime: '7 days' },
    // Digital Marketing (6)
    { title: 'Complete SEO Strategy', category: 'Digital Marketing', price: 800, deliveryTime: '14 days' },
    { title: 'Social Media Management', category: 'Digital Marketing', price: 500, deliveryTime: '7 days' },
    { title: 'Email Marketing Campaign', category: 'Digital Marketing', price: 400, deliveryTime: '5 days' },
    { title: 'PPC Advertising Management', category: 'Digital Marketing', price: 600, deliveryTime: '7 days' },
    { title: 'Content Marketing Strategy', category: 'Digital Marketing', price: 700, deliveryTime: '7 days' },
    { title: 'Influencer Marketing', category: 'Digital Marketing', price: 900, deliveryTime: '14 days' },
    // Video Editing (4)
    { title: 'YouTube Video Editing', category: 'Video Editing', price: 200, deliveryTime: '2 days' },
    { title: 'Corporate Video Production', category: 'Video Editing', price: 800, deliveryTime: '7 days' },
    { title: 'Social Media Video Editing', category: 'Video Editing', price: 150, deliveryTime: '1 day' },
    { title: 'Motion Graphics Animation', category: 'Video Editing', price: 600, deliveryTime: '5 days' },
    // App Development (4)
    { title: 'React Native Mobile App', category: 'App Development', price: 1800, deliveryTime: '14 days' },
    { title: 'Flutter App Development', category: 'App Development', price: 1600, deliveryTime: '14 days' },
    { title: 'iOS App Development', category: 'App Development', price: 2000, deliveryTime: '14 days' },
    { title: 'Android App Development', category: 'App Development', price: 1800, deliveryTime: '14 days' },
    // SEO & Social Media (4)
    { title: 'Local SEO Services', category: 'SEO Services', price: 500, deliveryTime: '7 days' },
    { title: 'E-commerce SEO', category: 'SEO Services', price: 700, deliveryTime: '7 days' },
    { title: 'Social Media Ads Management', category: 'Social Media Management', price: 400, deliveryTime: '5 days' },
    { title: 'Community Management', category: 'Social Media Management', price: 350, deliveryTime: '5 days' }
];

const descriptions = {
    'Full Stack Web Development': 'Complete web application development using React, Node.js, and MongoDB.',
    'React.js Website Development': 'Modern, fast, and responsive websites built with React.js.',
    'Node.js API Development': 'Scalable RESTful APIs and microservices built with Node.js.',
    'E-commerce Website Development': 'Complete online store with shopping cart and payment gateway.',
    'Portfolio Website Design': 'Stunning portfolio websites to showcase your work.',
    'Custom CMS Development': 'Tailored content management systems for your needs.',
    'WordPress Theme Development': 'Custom WordPress themes with modern design.',
    'Next.js Web Application': 'Server-side rendered React applications with Next.js.',
    'Vue.js Single Page Application': 'Fast and interactive single-page applications with Vue.js.',
    'Angular Web Application': 'Enterprise-grade web applications built with Angular.',
    'Professional Logo Design': 'Unique and memorable logos for your brand identity.',
    'Brand Identity Package': 'Complete brand identity including logo and guidelines.',
    'Social Media Graphics': 'Eye-catching graphics for social media platforms.',
    'Business Card Design': 'Professional business card designs that impress.',
    'Flyer & Poster Design': 'Attention-grabbing flyers and posters for events.',
    'Packaging Design': 'Creative and functional packaging designs.',
    'Infographic Design': 'Visual representations of data and information.',
    'UI/UX Design for Apps': 'User-centered design for mobile and web applications.',
    'SEO Blog Posts': 'SEO-optimized blog posts that rank well in search engines.',
    'Website Content Writing': 'Compelling content for websites that converts.',
    'Technical Documentation': 'Clear and comprehensive documentation for products.',
    'Product Descriptions': 'Persuasive product descriptions that sell.',
    'Ghostwriting Services': 'Professional ghostwriting for articles and books.',
    'Press Release Writing': 'Newsworthy press releases that get attention.',
    'Email Newsletter Writing': 'Engaging email newsletters that build relationships.',
    'White Paper Writing': 'In-depth white papers that establish thought leadership.',
    'Complete SEO Strategy': 'Comprehensive SEO strategy for better rankings.',
    'Social Media Management': 'Full social media management and analytics.',
    'Email Marketing Campaign': 'Strategic email marketing campaigns.',
    'PPC Advertising Management': 'Optimized PPC campaigns across platforms.',
    'Content Marketing Strategy': 'Strategic content marketing plans.',
    'Influencer Marketing': 'Influencer marketing campaigns for brand awareness.',
    'YouTube Video Editing': 'Professional video editing for YouTube content.',
    'Corporate Video Production': 'High-quality corporate videos for branding.',
    'Social Media Video Editing': 'Short-form video content for social media.',
    'Motion Graphics Animation': 'Animated graphics and motion design.',
    'React Native Mobile App': 'Cross-platform mobile apps with React Native.',
    'Flutter App Development': 'Beautiful mobile apps built with Flutter.',
    'iOS App Development': 'Native iOS applications with Swift.',
    'Android App Development': 'Native Android applications with Kotlin.',
    'Local SEO Services': 'Local search optimization for businesses.',
    'E-commerce SEO': 'SEO strategies for e-commerce websites.',
    'Social Media Ads Management': 'Strategic social media advertising campaigns.',
    'Community Management': 'Building and managing online communities.'
};

const providerNames = [
    { name: 'John Developer', email: 'john@dev.com' },
    { name: 'Sarah Designer', email: 'sarah@design.com' },
    { name: 'Mike Writer', email: 'mike@writer.com' },
    { name: 'Emma Marketer', email: 'emma@market.com' },
    { name: 'David Tech', email: 'david@tech.com' },
    { name: 'Rachel SEO', email: 'rachel@seo.com' },
    { name: 'Ali Creative', email: 'ali@creative.com' },
    { name: 'Zara Digital', email: 'zara@digital.com' }
];

const seedDatabase = async () => {
    try {
        console.log('🔄 Starting database seeding...');

        // Clear existing data
        await User.deleteMany({});
        await Service.deleteMany({});
        await ProviderProfile.deleteMany({});
        console.log('🗑️ Cleared existing data');

        // Create provider users
        console.log('🔄 Creating provider users...');
        const providers = [];
        for (const p of providerNames) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('password123', salt);
            const user = await User.create({
                name: p.name,
                email: p.email,
                password: hashedPassword,
                role: 'provider'
            });
            providers.push(user);
            console.log(`✅ Created provider: ${user.name}`);
        }

        // Create provider profiles
        console.log('🔄 Creating provider profiles...');
        const skillsList = [
            ['JavaScript', 'React', 'Node.js', 'MongoDB'],
            ['UI/UX', 'Figma', 'Adobe XD', 'Photoshop'],
            ['Content Strategy', 'SEO', 'Copywriting', 'Blogging'],
            ['Digital Marketing', 'SEO', 'PPC', 'Social Media'],
            ['Python', 'Django', 'Flask', 'PostgreSQL'],
            ['SEO', 'Analytics', 'Content Strategy', 'Link Building'],
            ['Graphic Design', 'Illustrator', 'Photoshop', 'Branding'],
            ['Social Media', 'Content Creation', 'Analytics', 'Community']
        ];

        for (let i = 0; i < providers.length; i++) {
            await ProviderProfile.create({
                userId: providers[i]._id,
                skills: skillsList[i % skillsList.length],
                pricing: {
                    hourly: 40 + Math.floor(Math.random() * 80),
                    fixed: 300 + Math.floor(Math.random() * 1500)
                },
                averageRating: 3.5 + Math.random() * 1.5,
                totalReviews: 5 + Math.floor(Math.random() * 25)
            });
            console.log(`✅ Created profile for: ${providers[i].name}`);
        }

        // Create services
        console.log('🔄 Creating services...');
        const createdServices = [];
        for (let i = 0; i < servicesData.length; i++) {
            const serviceData = servicesData[i];
            const provider = providers[i % providers.length];
            
            const service = await Service.create({
                providerId: provider._id,
                title: serviceData.title,
                description: descriptions[serviceData.title] || `Professional ${serviceData.title} service.`,
                category: serviceData.category,
                price: serviceData.price,
                deliveryTime: serviceData.deliveryTime,
                isActive: true
            });
            createdServices.push(service);
            if (i % 5 === 0) console.log(`✅ Created ${i + 1} services...`);
        }
        console.log(`✅ Created ${createdServices.length} services!`);

        console.log('🎉 Database seeded successfully!');
        console.log(`📊 Created: ${providers.length} providers, ${createdServices.length} services`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

// Run the seed
connectDB().then(() => seedDatabase());