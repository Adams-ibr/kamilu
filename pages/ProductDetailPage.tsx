// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import { Button } from '../components/ui/Button';
import InquiryPopup from '../components/InquiryPopup';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import SectionTitle from '../components/SectionTitle';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { products } = useAdmin();
  const product = products.find(p => p.slug === slug);
  const [showInquiry, setShowInquiry] = React.useState(false);
  const [mainImage, setMainImage] = React.useState(product ? product.imageUrl : '');

  React.useEffect(() => {
    if (product) {
      setMainImage(product.imageUrl);
    }
  }, [product]);

  const relatedProducts = React.useMemo(() => {
    if (!product) return [];
    return products.filter(
      p => p.category === product.category && p.id !== product.id
    ).slice(0, 4);
  }, [product, products]);

  if (!product) {
    return (
      <AnimatedPage>
        <div className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold">Product not found</h1>
          <Link to="/products" className="text-brand-gold mt-4 inline-block">Back to Products</Link>
        </div>
      </AnimatedPage>
    );
  }

  return (
    <AnimatedPage>
        <div className="pt-24 bg-brand-light dark:bg-gray-800">
             <div className="container mx-auto px-4">
                 <Breadcrumbs />
            </div>
        </div>
      <AnimatedSection className="py-20 bg-brand-light dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            {/* Image Gallery */}
            <div>
              <div className="w-full rounded-lg shadow-lg mb-4 overflow-hidden">
                <img src={mainImage} alt={product.name} className="w-full h-96 object-cover transition-transform duration-300 hover:scale-105" />
              </div>
              <div className="flex flex-wrap gap-2">
                {[product.imageUrl, ...product.gallery].map((img, idx) => (
                  <div 
                    key={idx}
                    className={`w-20 h-20 rounded-md cursor-pointer border-2 transition-all overflow-hidden ${mainImage === img ? 'border-brand-gold scale-105' : 'border-transparent hover:border-gray-300 dark:hover:border-gray-600'}`}
                    onClick={() => setMainImage(img)}
                  >
                    <img 
                      src={img} 
                      alt={`${product.name} gallery ${idx + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="flex flex-col">
              <p className="text-brand-gold font-semibold mb-2">{product.category}</p>
              <h1 className="text-3xl md:text-4xl font-bold text-brand-blue dark:text-gray-100 mb-4">{product.name}</h1>
              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">{product.description}</p>
              
              <div className="border-t dark:border-gray-700 pt-6">
                <h3 className="text-xl font-semibold text-brand-blue dark:text-gray-200 mb-4">Product Details</h3>
                 <div className="space-y-3 text-gray-700 dark:text-gray-300">
                    <div className="flex justify-between border-b dark:border-gray-700 pb-2">
                      <dt className="font-medium text-gray-800 dark:text-gray-200">Materials</dt>
                      <dd className="text-gray-600 dark:text-gray-400 text-right">{product.materials.join(', ')}</dd>
                    </div>
                </div>
              </div>

              <div className="border-t dark:border-gray-700 pt-6 mt-6">
                  <h3 className="text-xl font-semibold text-brand-blue dark:text-gray-200 mb-4">Common Applications</h3>
                  <div className="space-y-3 text-gray-700 dark:text-gray-300">
                      <div className="flex flex-wrap gap-2">
                          {product.applications.map((app, idx) => (
                              <span key={idx} className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-full dark:bg-gray-700 dark:text-gray-200">{app}</span>
                          ))}
                      </div>
                  </div>
              </div>
              
              <div className="mt-auto pt-8">
                <Button onClick={() => setShowInquiry(true)} className="w-full text-lg">
                  Request a Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <AnimatedSection className="py-20">
          <div className="container mx-auto px-4">
            <SectionTitle>Related Products</SectionTitle>
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} />
              ))}
            </motion.div>
          </div>
        </AnimatedSection>
      )}

      {showInquiry && <InquiryPopup productName={product.name} onClose={() => setShowInquiry(false)} />}
    </AnimatedPage>
  );
};

export default ProductDetailPage;