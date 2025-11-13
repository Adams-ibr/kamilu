// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { Link } from 'react-router-dom';

const TopProducts: React.FC = () => {
  const { products } = useAdmin();

  const topProducts = [...products]
    .sort((a, b) => (b.views || 0) - (a.views || 0))
    .slice(0, 5);

  const maxViews = Math.max(...topProducts.map(p => p.views || 0), 1);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Most Viewed Products</h3>
        <Link to="/admin/products" className="text-sm text-brand-gold hover:underline">View All</Link>
      </div>
      <ul className="space-y-4">
        {topProducts.map(product => (
          <li key={product.id}>
            <div className="flex justify-between items-center text-sm mb-1">
              <span className="font-medium text-gray-800 dark:text-gray-200 truncate">{product.name}</span>
              <span className="text-gray-500 dark:text-gray-400">{product.views || 0} views</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div 
                className="bg-brand-blue h-2.5 rounded-full" 
                style={{ width: `${((product.views || 0) / maxViews) * 100}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopProducts;
