// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import type { Product, BlogPost, NavLink, Stat, Service, Testimonial, TeamMember } from './types';
import { FabricationIcon, StructuralIcon, OnSiteIcon, PipeIcon, SupportIcon, ConsultationIcon } from './components/icons';

export const NAV_LINKS: NavLink[] = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Services', path: '/services' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
];

export const PRODUCTS: Product[] = [
    {
        id: 1,
        slug: 'stainless-steel-honey-processor',
        name: 'Stainless Steel Honey Processor',
        description: 'A high-grade stainless steel processing unit designed for efficient honey extraction, filtration, and processing. Built for durability and hygiene, suitable for small to large scale apiaries.',
        imageUrl: 'https://picsum.photos/seed/honey-processor/800/600',
        gallery: ['https://picsum.photos/seed/stainless-tank/800/600', 'https://picsum.photos/seed/food-machine/800/600', 'https://picsum.photos/seed/processor-detail/800/600'],
        category: 'Stainless Steel Equipment',
        applications: ['Food Processing', 'Apiculture', 'Commercial Honey Production'],
        materials: ['304 Stainless Steel', 'Food-Grade Seals'],
        specifications: {
            'Capacity': '100 Liters/Batch',
            'Power': '2.2 kW, 220V/50Hz',
            'Dimensions (LxWxH)': '1200 x 800 x 1500 mm',
            'Weight': '150 kg'
        },
        specSheetUrl: '/docs/honey-processor-spec-sheet.pdf',
        views: 125,
    },
    {
        id: 2,
        slug: 'multi-crop-thresher',
        name: 'Multi-Crop Thresher',
        description: 'An efficient and robust machine for threshing a variety of crops including maize, millet, sorghum, and beans. Designed for high output and minimal grain loss, increasing post-harvest productivity.',
        imageUrl: 'https://picsum.photos/seed/thresher/800/600',
        gallery: ['https://picsum.photos/seed/farm-machinery/800/600', 'https://picsum.photos/seed/thresher-action/800/600', 'https://picsum.photos/seed/welded-frame/800/600'],
        category: 'Agro-Allied Machinery',
        applications: ['Farming Cooperatives', 'Large-Scale Farms', 'Post-Harvest Processing'],
        materials: ['Mild Steel Frame', 'High-Carbon Steel Components'],
        specifications: {
            'Throughput': '500-800 kg/hour (Maize)',
            'Power Source': '15 HP Petrol Engine or Electric Motor',
            'Weight': '250 kg',
            'Crops': 'Maize, Millet, Sorghum, Beans'
        },
        specSheetUrl: '/docs/multi-crop-thresher-spec-sheet.pdf',
        views: 250,
    },
    {
        id: 3,
        slug: 'animal-feed-mill',
        name: 'Animal Feed Mill / Fish Feed Mill',
        description: 'A complete feed mill system for producing high-quality pellets for poultry, livestock, and aquaculture. Includes grinding, mixing, and pelletizing units, tailored to your production needs.',
        imageUrl: 'https://picsum.photos/seed/feed-mill/800/600',
        gallery: ['https://picsum.photos/seed/pellet-machine/800/600', 'https://picsum.photos/seed/fish-farm/800/600', 'https://picsum.photos/seed/feed-production/800/600'],
        category: 'Agro-Allied Machinery',
        applications: ['Poultry Farming', 'Aquaculture', 'Livestock Management', 'Commercial Feed Production'],
        materials: ['Structural Steel', 'Stainless Steel Contact Parts'],
        specifications: {
            'Capacity': '250 kg/hour',
            'Motor Power': '10 kW (Mixer), 15 kW (Pelletizer)',
            'Pellet Size': '2mm - 8mm (Customizable)',
            'System': 'Grinder, Mixer, Pelletizer'
        },
        specSheetUrl: '/docs/animal-feed-mill-spec-sheet.pdf',
        views: 480,
    },
    {
        id: 4,
        slug: 'industrial-water-boiler',
        name: 'Industrial Water Boiler',
        description: 'High-efficiency industrial boilers for generating hot water or steam for various industrial processes. Built for safety, reliability, and optimal fuel consumption.',
        imageUrl: 'https://picsum.photos/seed/industrial-boiler/800/600',
        gallery: ['https://picsum.photos/seed/pressure-vessel/800/600', 'https://picsum.photos/seed/pipe-system/800/600', 'https://picsum.photos/seed/factory-floor/800/600'],
        category: 'Industrial Equipment',
        applications: ['Textile Industry', 'Food & Beverage', 'Pharmaceuticals', 'Laundries'],
        materials: ['Boiler Steel', 'Carbon Steel', 'Refractory Materials'],
        specifications: {
            'Capacity': '500 L to 5000 L',
            'Working Pressure': 'Up to 10 Bar',
            'Fuel Type': 'Diesel, Gas, Firewood',
            'Efficiency': '> 85%'
        },
        specSheetUrl: '/docs/industrial-boiler-spec-sheet.pdf',
        views: 95,
    },
    {
        id: 5,
        slug: 'vegetable-dryer',
        name: 'Vegetable Dryer',
        description: 'A multi-purpose dehydration machine for drying vegetables, fruits, herbs, and fish. Ensures uniform drying while preserving nutrients and flavour, ideal for value addition and preservation.',
        imageUrl: 'https://picsum.photos/seed/veg-dryer/800/600',
        gallery: ['https://picsum.photos/seed/drying-racks/800/600', 'https://picsum.photos/seed/food-dehydrator/800/600', 'https://picsum.photos/seed/control-panel/800/600'],
        category: 'Agro-Allied Machinery',
        applications: ['Food Processing', 'Agro-business', 'Herbal Medicine'],
        materials: ['Stainless Steel (Food Grade)', 'Insulated Panels'],
        specifications: {
            'Tray Count': '20-100 Trays',
            'Temperature Range': '40°C - 90°C',
            'Power': '3 kW - 15 kW',
            'Control': 'Digital Thermostat Control'
        },
        specSheetUrl: '/docs/vegetable-dryer-spec-sheet.pdf',
        views: 310,
    },
    {
        id: 6,
        slug: 'branded-cold-room',
        name: 'Branded Cold Room & Chiller',
        description: 'Custom-built cold rooms and chillers for commercial and industrial use. We design and install reliable refrigeration systems for preserving perishables like produce, meat, and pharmaceuticals.',
        imageUrl: 'https://picsum.photos/seed/cold-room/800/600',
        gallery: ['https://picsum.photos/seed/chiller-unit/800/600', 'https://picsum.photos/seed/cold-storage/800/600', 'https://picsum.photos/seed/insulated-panel/800/600'],
        category: 'Industrial Equipment',
        applications: ['Food Storage', 'Pharmaceuticals', 'Logistics', 'Supermarkets'],
        materials: ['Polyurethane Panels', 'Stainless Steel Cladding', 'Refrigeration Components'],
        specifications: {
            'Size': 'Customizable (e.g., 10ft x 10ft x 8ft)',
            'Temperature Range': '-20°C to +10°C',
            'Compressor': 'Copeland / Bitzer',
            'Panel Thickness': '100mm / 150mm'
        },
        specSheetUrl: '/docs/cold-room-spec-sheet.pdf',
        views: 180,
    },
];

export const BLOG_POSTS: BlogPost[] = [
    {
        id: 1,
        slug: 'stainless-steel-in-food-processing',
        title: 'Why Stainless Steel is Essential for Food Processing Machinery',
        excerpt: 'Explore the critical role of stainless steel in ensuring hygiene, durability, and compliance in the food and beverage industry. Learn why it\'s our material of choice.',
        content: `
              <p>When it comes to fabricating machinery for the food and pharmaceutical industries, material choice is not just a matter of performance—it's a matter of public health and safety. At Kamilu Welding Services, we predominantly use high-grade stainless steel, and for good reason.</p>
              <h3>Hygienic and Easy to Clean</h3>
              <p>Stainless steel has a non-porous surface, which means bacteria, viruses, and other microorganisms have nowhere to hide. This makes it incredibly easy to clean and sanitize, a critical requirement for preventing cross-contamination in food processing lines.</p>
              <h3>Corrosion Resistance</h3>
              <p>Food products, cleaning agents, and environmental factors can be highly corrosive. Stainless steel, particularly grades like 304 and 316, contains chromium, which forms a passive, protective layer that resists rust and corrosion, ensuring the longevity of the equipment and the purity of the product.</p>
              <h3>Durability and Strength</h3>
              <p>Industrial machinery operates under demanding conditions. Stainless steel offers excellent strength, toughness, and temperature resistance, ensuring that equipment like our honey processors and industrial fryers can withstand the rigors of daily production for years to come.</p>
          `,
        imageUrl: 'https://picsum.photos/seed/stainless-steel-food/800/600',
        author: 'Dr. Aliu Yamah',
        publishDate: 'March 15, 2024',
        metaDescription: 'Learn why 304 and 316 stainless steel are the top materials for food processing equipment. Discover the benefits of hygiene, corrosion resistance, and durability with Kamilu Welding Services.',
        metaKeywords: ['stainless steel', 'food processing', 'hygiene', 'fabrication', 'Kano', 'Nigeria', 'industrial machinery'],
    },
    {
        id: 2,
        slug: 'innovations-in-agro-allied-machinery',
        title: 'Boosting Agricultural Output with Modern Agro-Allied Machinery',
        excerpt: 'Discover how modern equipment like multi-crop threshers and feed mills are revolutionizing farming in Nigeria, reducing labor, and increasing yields.',
        content: '<p>Detailed content about agro-allied machinery...</p>',
        imageUrl: 'https://picsum.photos/seed/agro-innovation/800/600',
        author: 'Abubakar S Abdullahi',
        publishDate: 'February 28, 2024',
        metaDescription: 'Explore modern agro-allied machinery from Kamilu Welding Services. Our multi-crop threshers and feed mills are designed to increase agricultural productivity and efficiency in Nigeria.',
        metaKeywords: ['agro-allied machinery', 'farming', 'agriculture', 'multi-crop thresher', 'feed mill', 'Nigeria'],
    },
    {
        id: 3,
        slug: 'our-commitment-to-youth-skills-training',
        title: 'Beyond Fabrication: Our Commitment to Youth Skills Acquisition',
        excerpt: "At K.W.S., we believe in building the future. Learn about our youth training programs and our collaboration with the NBTI to empower the next generation of fabricators.",
        content: '<p>Detailed content about youth training...</p>',
        imageUrl: 'https://picsum.photos/seed/welding-training/800/600',
        author: 'Muhammad Hamza',
        publishDate: 'January 10, 2024',
        metaDescription: 'Kamilu Welding Services is committed to youth empowerment through skills acquisition programs in welding and fabrication, in partnership with NBTI Kano.',
        metaKeywords: ['youth training', 'skills acquisition', 'welding', 'fabrication', 'empowerment', 'NBTI', 'Kano'],
    },
];

export const STATS: Stat[] = [
    { value: '10+', label: 'Years of Experience' },
    { value: '200+', label: 'Machines Delivered' },
    { value: '50+', label: 'Happy Clients' },
    { value: 'NBTI Partner', label: 'Certified Quality' },
];

export const SERVICES: Service[] = [
    { 
        id: 1, 
        slug: 'industrial-pharmaceutical-machinery',
        name: 'Industrial & Pharmaceutical Machinery', 
        description: 'Design, fabrication, and installation of custom machinery for industrial and pharmaceutical applications, adhering to strict quality standards.',
        detailedDescription: `
            <p>Our core expertise lies in the bespoke fabrication of machinery for demanding industrial and pharmaceutical environments. We understand that precision, hygiene, and reliability are non-negotiable. Our team works with high-grade materials like 304 and 316 stainless steel to create equipment that meets and exceeds industry regulations.</p>
            <h3>Our Process Includes:</h3>
            <ul>
                <li><strong>Needs Assessment:</strong> We collaborate with you to understand your exact processing requirements, throughput, and operational constraints.</li>
                <li><strong>CAD Design & Modeling:</strong> We create detailed 3D models to visualize the final product and ensure perfect integration into your existing workflow.</li>
                <li><strong>Precision Fabrication:</strong> Utilizing modern tools, we cut, form, and assemble components with meticulous attention to detail.</li>
                <li><strong>Sanitary Welding:</strong> Our certified welders specialize in sanitary TIG welding, creating smooth, non-porous seams that prevent contamination and are easy to clean.</li>
                <li><strong>FAT (Factory Acceptance Testing):</strong> Before delivery, we can conduct rigorous testing at our facility to ensure the machine operates as specified.</li>
            </ul>
        `,
        imageUrl: 'https://picsum.photos/seed/pharma-machinery/1200/800',
        features: ['Adherence to GMP Standards', 'High-Grade Stainless Steel Construction', 'Customizable to any Specification', 'Full Documentation and Support', 'On-site Installation and Commissioning'],
        icon: <FabricationIcon /> 
    },
    { 
        id: 2, 
        slug: 'agro-food-processing-solutions',
        name: 'Agro & Food Processing Solutions', 
        description: 'We build a wide range of agro-allied equipment, from threshers and dryers to complete feed mill systems, to boost agricultural productivity.',
        detailedDescription: `
            <p>We are dedicated to mechanizing Nigeria's agricultural sector with robust, efficient, and locally-built machinery. Our solutions are designed to reduce post-harvest losses, increase processing efficiency, and add value to raw agricultural products.</p>
            <h3>Equipment Showcase:</h3>
            <ul>
                <li><strong>Multi-Crop Threshers:</strong> Drastically reduce the time and labor required for threshing crops like maize, sorghum, and millet.</li>
                <li><strong>Vegetable & Fruit Dryers:</strong> Preserve produce and create new revenue streams with our controlled-environment dehydration systems.</li>
                <li><strong>Complete Feed Mills:</strong> We design and install end-to-end systems for producing high-quality animal and fish feed, from grinding and mixing to pelletizing.</li>
                <li><strong>Stainless Steel Processors:</strong> For honey, juices, and other liquid food products, our hygienic processors ensure quality and safety.</li>
            </ul>
            <p>Our designs are tailored to the Nigerian context, prioritizing durability, ease of maintenance, and the ability to handle local crop varieties.</p>
        `,
        imageUrl: 'https://picsum.photos/seed/agro-processing/1200/800',
        features: ['Durable and Robust Construction', 'Designed for Local Conditions', 'High-Efficiency Operation', 'Reduces Labor Costs', 'Increases Product Value'],
        icon: <StructuralIcon /> 
    },
    { 
        id: 3, 
        slug: 'cold-room-chiller-construction',
        name: 'Cold Room & Chiller Construction', 
        description: 'Complete design and installation of branded cold rooms and industrial chillers for reliable preservation of perishable goods.',
        detailedDescription: `
            <p>A reliable cold chain is essential for the food, pharmaceutical, and hospitality industries. We provide turnkey solutions for cold storage, from small walk-in chillers to large-scale industrial cold rooms.</p>
            <h3>Our Cold Chain Services:</h3>
            <ul>
                <li><strong>Custom Design:</strong> We design cold rooms based on your specific size requirements, temperature needs (-20°C to +10°C), and product type.</li>
                <li><strong>High-Quality Insulation:</strong> We use high-density Polyurethane (PUF) panels to ensure maximum thermal efficiency and reduce energy consumption.</li>
                <li><strong>Reliable Refrigeration Units:</strong> We source and install industry-leading compressors and evaporators from trusted brands like Copeland and Bitzer to guarantee consistent temperatures.</li>
                <li><strong>Professional Installation:</strong> Our experienced technicians handle the complete assembly, from paneling and flooring to refrigeration system setup and electrical work.</li>
                <li><strong>Maintenance and Support:</strong> We offer service contracts to ensure your cold room operates at peak performance year-round.</li>
            </ul>
        `,
        imageUrl: 'https://picsum.photos/seed/cold-chain/1200/800',
        features: ['Customizable Dimensions', 'Wide Temperature Range', 'Energy Efficient Design', 'Top-Tier Refrigeration Components', 'Full Installation & Support'],
        icon: <OnSiteIcon /> 
    },
    { 
        id: 4, 
        slug: 'youth-skills-acquisition-training',
        name: 'Youth Skills Acquisition Training', 
        description: 'In partnership with government bodies, we provide hands-on training in welding and fabrication to empower the next generation of artisans.',
        detailedDescription: `
            <p>Beyond our commercial services, we are deeply committed to building human capital. Our Youth Skills Acquisition program is a cornerstone of our corporate social responsibility, aimed at tackling unemployment and bridging the skills gap in Nigeria's industrial sector.</p>
            <h3>Program Highlights:</h3>
            <ul>
                <li><strong>Government Partnership:</strong> We proudly collaborate with the National Board for Technology Incubation (NBTI) to deliver certified training programs.</li>
                <li><strong>Practical, Hands-On Learning:</strong> Trainees work on real-world projects in our fully-equipped workshop, learning by doing.</li>
                <li><strong>Comprehensive Curriculum:</strong> The program covers welding safety, different welding techniques (Arc, TIG, MIG), metal fabrication, blueprint reading, and machine operation.</li>
                <li><strong>Entrepreneurship Focus:</strong> We don't just teach technical skills; we mentor trainees on how to start and run their own small fabrication businesses.</li>
                <li><strong>Proven Success:</strong> Many of our graduates have gone on to secure jobs in the industry or launch their own successful enterprises.</li>
            </ul>
        `,
        imageUrl: 'https://picsum.photos/seed/skill-training/1200/800',
        features: ['NBTI Certified Program', 'Real-World Workshop Experience', 'Expert Instructors', 'Focus on Safety and Quality', 'Pathways to Employment and Entrepreneurship'],
        icon: <SupportIcon /> 
    },
];

export const TESTIMONIALS: Testimonial[] = [
    { id: 1, quote: 'KamiluWelding delivered a complete poultry feed mill for our farm. The quality is excellent, and their after-sales support has been fantastic. Our production has doubled.', author: 'Aisha Bello', company: 'CEO, Bello Farms Ltd.' },
    { id: 2, quote: 'The stainless steel grinding machine they fabricated for our spice company is a workhorse. It meets all hygiene standards and has been running flawlessly since installation.', author: 'David Okon', company: 'Production Manager, SpiceMasters NG' },
    { id: 3, quote: "We contracted K.W.S. to build a custom industrial fryer. They understood our needs perfectly and delivered a high-quality, efficient machine on schedule.", author: 'Mr. Emeka Eze', company: 'Owner, Eze Foods' },
];

export const TEAM_MEMBERS: TeamMember[] = [
    { name: 'Dr. Aliu Yamah', role: 'Founder & Chief Engineer', imageUrl: 'https://picsum.photos/seed/engineer/300/300', socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' } },
    { name: 'Muhammad Hamza', role: 'Managing Director', imageUrl: 'https://picsum.photos/seed/manager/300/300', socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' } },
    { name: 'Abubakar S Abdullahi', role: 'Head of Operations', imageUrl: 'https://picsum.photos/seed/operations/300/300', socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' } },
    { name: 'Usman Abdullahi', role: 'Lead Fabricator', imageUrl: 'https://picsum.photos/seed/fabricator/300/300', socials: { linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' } },
];