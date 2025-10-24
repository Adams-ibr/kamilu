// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import ProductCard from '../components/ProductCard';
import AnimatedPage from '../components/AnimatedPage';
import AnimatedSection from '../components/AnimatedSection';
import ProductGridSkeleton from '../components/ProductGridSkeleton';
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

const ProductsPage: React.FC = () => {
  const { products } = useAdmin();
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Simulate network delay
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatedPage>
      <AnimatedSection>
        <section className="bg-brand-blue text-white pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold">Our Products</h1>
            <p className="text-xl mt-4 max-w-3xl mx-auto">A showcase of our fabricated machinery for industrial and agro-allied sectors.</p>
          </div>
        </section>
      </AnimatedSection>

      <AnimatedSection className="py-20 bg-brand-light dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <SectionTitle>Product Catalog</SectionTitle>
          {loading ? (
            <ProductGridSkeleton count={products.length} />
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </AnimatedSection>
    </AnimatedPage>
  );
};

export default ProductsPage;