import React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import SectionTitle from '../components/SectionTitle';
import CallToAction from '../components/CallToAction';
import ExportProcessFlow from '../components/ExportProcessFlow';
import { Link } from 'react-router-dom';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
  },
};


const ServicesPage: React.FC = () => {
  const { services } = useAdmin();

  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-blue text-white pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">Our End-to-End Fabrication Solutions</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">We provide comprehensive services to ensure a seamless experience from design to installation.</p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-brand-light dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <SectionTitle>What We Do</SectionTitle>
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {services.map((service) => (
               <motion.div
                key={service.id}
                variants={itemVariants}
                whileHover={{ 
                    y: -5, 
                    scale: 1.02, 
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
                }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="bg-white dark:bg-gray-900 p-8 rounded-lg flex flex-col"
              >
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    {service.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-brand-blue dark:text-gray-100 mb-2">{service.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-grow">{service.description}</p>
                  </div>
                </div>
                <div className="mt-auto pt-6 flex justify-between items-center">
                    <Link to={`/services/${service.slug}`} className="text-brand-gold font-semibold hover:underline">
                        Learn More &rarr;
                    </Link>
                    <Link 
                        to="/contact" 
                        className="bg-brand-gold text-white font-bold py-2 px-4 rounded-md text-sm hover:bg-yellow-600 transition-colors"
                    >
                        Request a Quote
                    </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </AnimatedSection>

      <AnimatedSection className="py-20">
        <ExportProcessFlow />
      </AnimatedSection>

      <CallToAction />
    </AnimatedPage>
  );
};

export default ServicesPage;