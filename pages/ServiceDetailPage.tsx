
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import Breadcrumbs from '../components/Breadcrumbs';
import CallToAction from '../components/CallToAction';

const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { services } = useAdmin();
  const service = services.find(s => s.slug === slug);

  if (!service) {
    return (
      <AnimatedPage>
        <div className="container mx-auto px-4 py-32 text-center">
          <h1 className="text-4xl font-bold">Service not found</h1>
          <Link to="/services" className="text-brand-gold mt-4 inline-block">Back to Services</Link>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <img 
            src={service.imageUrl} 
            alt={service.name} 
            className="absolute inset-0 w-full h-full object-cover" 
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold">{service.name}</h1>
        </div>
      </section>

      <div className="bg-brand-light dark:bg-gray-800">
          <div className="container mx-auto px-4">
              <Breadcrumbs />
          </div>
      </div>

      <AnimatedSection className="py-20 bg-brand-light dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-brand-blue dark:text-gray-100 mb-6">Service Overview</h2>
              <div 
                className="prose lg:prose-lg max-w-none text-gray-700 dark:prose"
                dangerouslySetInnerHTML={{ __html: service.detailedDescription }}
              />
            </div>

            {/* Key Features Sidebar */}
            <aside>
              <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-lg sticky top-28">
                <h3 className="text-2xl font-bold text-brand-blue dark:text-gray-100 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </AnimatedSection>
      
      <CallToAction />
    </AnimatedPage>
  );
};

export default ServiceDetailPage;
