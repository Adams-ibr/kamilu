// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import type { Product } from '../types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)"
  },
};

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden group dark:bg-gray-800 dark:border dark:border-gray-700 flex flex-col"
      variants={itemVariants}
      whileHover={{ 
        y: -5, 
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <div className="overflow-hidden">
        <img className="w-full h-56 object-cover object-center transition-transform duration-300 ease-in-out group-hover:scale-110" src={product.imageUrl} alt={product.name} loading="lazy" />
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-brand-blue dark:text-gray-100 mb-2 transition-colors duration-300 group-hover:text-brand-gold">{product.name}</h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">{product.category}</p>
        <p className="text-gray-600 dark:text-gray-400 text-base mb-4 line-clamp-2 flex-grow">{product.description}</p>
        <div className="flex justify-end items-center mt-auto pt-2">
          <Link to={`/products/${product.slug}`} className="text-brand-gold font-semibold">
            View Details <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;