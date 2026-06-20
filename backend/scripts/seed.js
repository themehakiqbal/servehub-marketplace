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
        // Providers (8)
        { name: 'John Developer', email: 'john@dev.com', password: 'password123', role: 'provider' },
        { name: 'Sarah Designer', email: 'sarah@design.com', password: 'password123', role: 'provider' },
        { name: 'Mike Writer', email: 'mike@writer.com', password: 'password123', role: 'provider' },
        { name: 'Emma Marketer', email: 'emma@market.com', password: 'password123', role: 'provider' },
        { name: 'David Tech', email: 'david@tech.com', password: 'password123', role: 'provider' },
        { name: 'Rachel SEO', email: 'rachel@seo.com', password: 'password123', role: 'provider' },
        { name: 'Ali Creative', email: 'ali@creative.com', password: 'password123', role: 'provider' },
        { name: 'Zara Digital', email: 'zara@digital.com', password: 'password123', role: 'provider' },
        // Customers (6)
        { name: 'Alex Customer', email: 'alex@customer.com', password: 'password123', role: 'customer' },
        { name: 'Lisa Customer', email: 'lisa@customer.com', password: 'password123', role: 'customer' },
        { name: 'Tom Client', email: 'tom@client.com', password: 'password123', role: 'customer' },
        { name: 'Anna Buyer', email: 'anna@buyer.com', password: 'password123', role: 'customer' },
        { name: 'Mark User', email: 'mark@user.com', password: 'password123', role: 'customer' },
        { name: 'Sophie Client', email: 'sophie@client.com', password: 'password123', role: 'customer' }
    ],
    services: [
        // Web Development (10)
        { title: 'Full Stack Web Development', category: 'Web Development', price: 1500, deliveryTime: '14 days' },
        { title: 'React.js Website Development', category: 'Web Development', price: 1200, deliveryTime: '10 days' },
        { title: 'Node.js API Development', category: 'Web Development', price: 800, deliveryTime: '7 days' },
        { title: 'E-commerce Website Development', category: 'Web Development', price: 2000, deliveryTime: '21 days' },
        { title: 'Portfolio Website Design', category: 'Web Development', price: 500, deliveryTime: '5 days' },
        { title: 'Custom CMS Development', category: 'Web Development', price: 1000, deliveryTime: '10 days' },
        { title: 'WordPress Theme Development', category: 'Web Development', price: 700, deliveryTime: '7 days' },
        { title: 'Next.js Web Application', category: 'Web Development', price: 1300, deliveryTime: '12 days' },
        { title: 'Vue.js Single Page Application', category: 'Web Development', price: 1100, deliveryTime: '10 days' },
        { title: 'Angular Web Application', category: 'Web Development', price: 1400, deliveryTime: '14 days' },
        
        // Graphic Design (8)
        { title: 'Professional Logo Design', category: 'Graphic Design', price: 300, deliveryTime: '3 days' },
        { title: 'Brand Identity Package', category: 'Graphic Design', price: 600, deliveryTime: '7 days' },
        { title: 'Social Media Graphics', category: 'Graphic Design', price: 200, deliveryTime: '2 days' },
        { title: 'Business Card Design', category: 'Graphic Design', price: 150, deliveryTime: '2 days' },
        { title: 'Flyer & Poster Design', category: 'Graphic Design', price: 250, deliveryTime: '3 days' },
        { title: 'Packaging Design', category: 'Graphic Design', price: 400, deliveryTime: '5 days' },
        { title: 'Infographic Design', category: 'Graphic Design', price: 350, deliveryTime: '4 days' },
        { title: 'UI/UX Design for Apps', category: 'Graphic Design', price: 800, deliveryTime: '10 days' },
        
        // Content Writing (8)
        { title: 'SEO Blog Posts', category: 'Content Writing', price: 100, deliveryTime: '2 days' },
        { title: 'Website Content Writing', category: 'Content Writing', price: 200, deliveryTime: '3 days' },
        { title: 'Technical Documentation', category: 'Content Writing', price: 300, deliveryTime: '4 days' },
        { title: 'Product Descriptions', category: 'Content Writing', price: 150, deliveryTime: '2 days' },
        { title: 'Ghostwriting Services', category: 'Content Writing', price: 400, deliveryTime: '7 days' },
        { title: 'Press Release Writing', category: 'Content Writing', price: 250, deliveryTime: '3 days' },
        { title: 'Email Newsletter Writing', category: 'Content Writing', price: 180, deliveryTime: '2 days' },
        { title: 'White Paper Writing', category: 'Content Writing', price: 500, deliveryTime: '10 days' },
        
        // Digital Marketing (6)
        { title: 'Complete SEO Strategy', category: 'Digital Marketing', price: 800, deliveryTime: '14 days' },
        { title: 'Social Media Management', category: 'Digital Marketing', price: 500, deliveryTime: '7 days' },
        { title: 'Email Marketing Campaign', category: 'Digital Marketing', price: 400, deliveryTime: '5 days' },
        { title: 'PPC Advertising Management', category: 'Digital Marketing', price: 600, deliveryTime: '7 days' },
        { title: 'Content Marketing Strategy', category: 'Digital Marketing', price: 700, deliveryTime: '10 days' },
        { title: 'Influencer Marketing', category: 'Digital Marketing', price: 900, deliveryTime: '14 days' },
        
        // Video Editing (4)
        { title: 'YouTube Video Editing', category: 'Video Editing', price: 200, deliveryTime: '2 days' },
        { title: 'Corporate Video Production', category: 'Video Editing', price: 800, deliveryTime: '7 days' },
        { title: 'Social Media Video Editing', category: 'Video Editing', price: 150, deliveryTime: '1 day' },
        { title: 'Motion Graphics Animation', category: 'Video Editing', price: 600, deliveryTime: '5 days' },
        
        // App Development (4)
        { title: 'React Native Mobile App', category: 'App Development', price: 1800, deliveryTime: '21 days' },
        { title: 'Flutter App Development', category: 'App Development', price: 1600, deliveryTime: '18 days' },
        { title: 'iOS App Development', category: 'App Development', price: 2000, deliveryTime: '25 days' },
        { title: 'Android App Development', category: 'App Development', price: 1800, deliveryTime: '22 days' },
        
        // SEO & More (4)
        { title: 'Local SEO Services', category: 'SEO Services', price: 500, deliveryTime: '10 days' },
        { title: 'E-commerce SEO', category: 'SEO Services', price: 700, deliveryTime: '12 days' },
        { title: 'Social Media Ads Management', category: 'Social Media Management', price: 400, deliveryTime: '7 days' },
        { title: 'Community Management', category: 'Social Media Management', price: 350, deliveryTime: '7 days' }
    ]
};

const descriptions = {
    'Full Stack Web Development': 'Complete web application development using React, Node.js, and MongoDB. Includes responsive design, authentication, and payment integration.',
    'React.js Website Development': 'Modern, fast, and responsive websites built with React.js. Includes state management, routing, and API integration.',
    'Node.js API Development': 'Scalable RESTful APIs and microservices built with Node.js and Express. Includes authentication, database integration, and documentation.',
    'E-commerce Website Development': 'Complete online store with shopping cart, payment gateway, inventory management, and admin dashboard.',
    'Portfolio Website Design': 'Stunning portfolio websites to showcase your work and attract clients. Includes responsive design and contact forms.',
    'Custom CMS Development': 'Tailored content management systems built to your specific requirements. User-friendly admin panel and flexible content structures.',
    'WordPress Theme Development': 'Custom WordPress themes with modern design, responsive layout, and optimized performance. Includes custom post types and plugins.',
    'Next.js Web Application': 'Server-side rendered React applications with Next.js. Includes SEO optimization, API routes, and static site generation.',
    'Vue.js Single Page Application': 'Fast and interactive single-page applications built with Vue.js. Includes Vuex state management and Vue Router.',
    'Angular Web Application': 'Enterprise-grade web applications built with Angular. Includes TypeScript, dependency injection, and RxJS.',
    'Professional Logo Design': 'Unique and memorable logos that represent your brand identity. Includes multiple concepts and revisions.',
    'Brand Identity Package': 'Complete brand identity including logo, color palette, typography, and brand guidelines. Perfect for new businesses.',
    'Social Media Graphics': 'Eye-catching graphics for social media platforms. Includes posts, stories, and cover images optimized for each platform.',
    'Business Card Design': 'Professional business card designs that make a lasting impression. Includes print-ready files and multiple variations.',
    'Flyer & Poster Design': 'Attention-grabbing flyers and posters for events, promotions, and marketing campaigns. Includes print and digital formats.',
    'Packaging Design': 'Creative and functional packaging designs that stand out on shelves. Includes 3D mockups and print specifications.',
    'Infographic Design': 'Visual representations of data and information. Includes charts, graphs, and illustrations to communicate complex ideas.',
    'UI/UX Design for Apps': 'User-centered design for mobile and web applications. Includes wireframes, prototypes, and user testing.',
    'SEO Blog Posts': 'SEO-optimized blog posts that rank well in search engines. Includes keyword research and content strategy.',
    'Website Content Writing': 'Compelling content for websites that engages visitors and converts them into customers.',
    'Technical Documentation': 'Clear and comprehensive documentation for software products. Includes user guides, API docs, and technical manuals.',
    'Product Descriptions': 'Persuasive product descriptions that highlight features and benefits. Optimized for conversions and SEO.',
    'Ghostwriting Services': 'Professional ghostwriting for articles, books, and other content. Your ideas, our words.',
    'Press Release Writing': 'Newsworthy press releases that get media attention. Includes distribution and media outreach.',
    'Email Newsletter Writing': 'Engaging email newsletters that build relationships and drive sales. Includes subject lines and CTAs.',
    'White Paper Writing': 'In-depth white papers that establish thought leadership. Includes research, analysis, and recommendations.',
    'Complete SEO Strategy': 'Comprehensive SEO strategy including audit, keyword research, on-page optimization, and link building.',
    'Social Media Management': 'Full social media management including content creation, scheduling, engagement, and analytics.',
    'Email Marketing Campaign': 'Strategic email marketing campaigns from planning to execution. Includes automation and analytics.',
    'PPC Advertising Management': 'Optimized PPC campaigns across Google Ads and social media. Includes keyword research, ad copy, and bid management.',
    'Content Marketing Strategy': 'Strategic content marketing plans that attract and engage your target audience.',
    'Influencer Marketing': 'Influencer marketing campaigns that reach your target audience through trusted voices.',
    'YouTube Video Editing': 'Professional video editing for YouTube content. Includes cutting, transitions, effects, and audio.',
    'Corporate Video Production': 'High-quality corporate videos for branding, training, and marketing.',
    'Social Media Video Editing': 'Short-form video content optimized for social media platforms. Includes captions and effects.',
    'Motion Graphics Animation': 'Animated graphics and motion design for videos, presentations, and advertising.',
    'React Native Mobile App': 'Cross-platform mobile apps built with React Native. Includes native performance and smooth UI.',
    'Flutter App Development': 'Beautiful, natively compiled mobile apps built with Flutter. Single codebase for iOS and Android.',
    'iOS App Development': 'Native iOS applications built with Swift and Objective-C. Includes App Store submission.',
    'Android App Development': 'Native Android applications built with Kotlin and Java. Includes Play Store submission.',
    'Local SEO Services': 'Local search optimization to help businesses rank in local search results. Includes Google My Business optimization.',
    'E-commerce SEO': 'SEO strategies specifically for e-commerce websites. Includes product optimization and category pages.',
    'Social Media Ads Management': 'Strategic social media advertising campaigns across Facebook, Instagram, LinkedIn, and TikTok.',
    'Community Management': 'Building and managing online communities to engage customers and build brand loyalty.'
};

const descriptionsArray = [
    'Complete solution with modern design, responsive layout, and optimized performance.',
    'Professional service with attention to detail and client satisfaction guaranteed.',
    'High-quality work delivered on time with unlimited revisions until satisfaction.',
    'Expert level service with years of experience in the industry.',
    'Custom tailored solution to meet your specific business needs.',
    'Premium quality with professional approach and timely delivery.'
];

const reviews_texts = [
    'Excellent work! Highly recommended.', 'Great communication and on-time delivery.',
    'Professional and knowledgeable.', 'Exceeded my expectations!',
    'Very satisfied with the results.', 'Will work again for sure.',
    'Amazing quality of work.', 'Highly professional and skilled.',
    'Best service I have ever used.', 'Outstanding quality and professionalism.',
    'Quick turnaround and great results.', 'Very responsive and helpful.',
    'Top-notch quality work.', 'Highly satisfied with the outcome.',
    'Perfect for my business needs.', 'Exceptional value for money.',
    'Would recommend to everyone.', 'Truly talented professional.',
    'Exceeded all expectations.', 'Best decision I ever made.'
];

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

const experienceTitles = ['Senior Developer', 'Lead Designer', 'Content Director', 'Marketing Strategist', 'Technical Lead', 'SEO Specialist', 'Creative Director', 'Digital Strategist'];
const companies = ['Tech Corp', 'Design Studio', 'Media House', 'Marketing Agency', 'Software Solutions', 'Digital Agency', 'Creative Agency', 'Digital Marketing Co'];

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
        for (let i = 0; i < providers.length; i++) {
            const provider = providers[i];
            const skills = skillsList[i % skillsList.length];
            const expTitle = experienceTitles[i % experienceTitles.length];
            const company = companies[i % companies.length];
            
            await ProviderProfile.create({
                userId: provider._id,
                skills: skills,
                pricing: {
                    hourly: 40 + Math.floor(Math.random() * 80),
                    fixed: 300 + Math.floor(Math.random() * 1500)
                },
                experience: [
                    {
                        title: expTitle,
                        company: company,
                        startDate: new Date('2018-01-01'),
                        endDate: new Date('2020-12-31'),
                        isCurrent: false,
                        description: `Leading ${expTitle} team on major projects`
                    },
                    {
                        title: `Senior ${expTitle}`,
                        company: `${company} Group`,
                        startDate: new Date('2021-01-01'),
                        isCurrent: true,
                        description: `Managing ${expTitle} initiatives and team leadership`
                    }
                ],
                averageRating: 3.5 + Math.random() * 1.5,
                totalReviews: 5 + Math.floor(Math.random() * 25)
            });
            console.log(`✅ Created profile for: ${provider.name}`);
        }

        console.log('🔄 Creating services...');
        const createdServices = [];
        for (let i = 0; i < sampleData.services.length; i++) {
            const serviceData = sampleData.services[i];
            const provider = providers[i % providers.length];
            
            // Get description from descriptions object or use default
            const description = descriptions[serviceData.title] || 
                               descriptionsArray[i % descriptionsArray.length] + 
                               ` Perfect for ${serviceData.category} projects.`;
            
            const service = await Service.create({
                providerId: provider._id,
                title: serviceData.title,
                description: description,
                category: serviceData.category,
                price: serviceData.price,
                deliveryTime: serviceData.deliveryTime,
                isActive: true
            });
            createdServices.push(service);
            if (i % 5 === 0) console.log(`✅ Created ${i + 1} services...`);
        }
        console.log(`✅ Created ${createdServices.length} services!`);

        console.log('🔄 Creating reviews...');
        for (let i = 0; i < 30; i++) {
            const customer = customers[i % customers.length];
            const provider = providers[i % providers.length];
            const rating = 3 + Math.floor(Math.random() * 3);

            await Review.create({
                requestId: new mongoose.Types.ObjectId(),
                reviewerId: customer._id,
                providerId: provider._id,
                rating: rating,
                feedback: reviews_texts[i % reviews_texts.length]
            });
            if (i % 10 === 0) console.log(`✅ Created ${i + 1} reviews...`);
        }
        console.log('✅ Created 30 reviews!');

        console.log('🎉 Database seeded successfully!');
        console.log(`📊 Created: ${createdUsers.length} users, ${createdServices.length} services, 30 reviews`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding database:', error);
        process.exit(1);
    }
};

seedDatabase();