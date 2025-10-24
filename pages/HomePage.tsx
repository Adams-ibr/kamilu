// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { STATS } from '../constants';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import ProductCard from '../components/ProductCard';
import CallToAction from '../components/CallToAction';
import SectionTitle from '../components/SectionTitle';
import TestimonialSlider from '../components/TestimonialSlider';
import { useAdmin } from '../contexts/AdminContext';

const HomePage: React.FC = () => {
  const { products, services } = useAdmin();

  return (
    <AnimatedPage>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <img 
            src="https://picsum.photos/seed/fabrication-hero/1920/1080" 
            alt="Modern fabrication workshop" 
            className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="relative z-10 text-center px-4">
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Fabricating Nigeria's Industrial Future
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl max-w-3xl mx-auto mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Specialists in custom machinery for food, pharmaceutical, and agro-allied industries.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link to="/products" className="bg-brand-gold text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-yellow-600 transition-transform transform hover:scale-105">
              View Our Products
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <AnimatedSection className="py-20 bg-brand-light dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <SectionTitle>Featured Products</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/products" className="text-brand-gold font-semibold hover:underline text-lg">
              View All Products &rarr;
            </Link>
          </div>
        </div>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle>Our Core Services</SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {services.map(service => (
              <div key={service.id} className="p-6">
                <div className="flex justify-center mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-brand-blue dark:text-gray-100 mb-2">{service.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Stats Section */}
      <section className="bg-brand-blue text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, index) => (
               <div key={index}>
                  <p className="text-4xl font-bold text-brand-gold">{stat.value}</p>
                  <p className="mt-2 text-gray-300">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <AnimatedSection className="py-20">
        <div className="container mx-auto px-4">
          <SectionTitle>What Our Clients Say</SectionTitle>
          <TestimonialSlider />
        </div>
      </AnimatedSection>
      
      {/* Call to Action */}
      <CallToAction />
    </AnimatedPage>
  );
};

export default HomePage;