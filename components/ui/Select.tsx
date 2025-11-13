// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select: React.FC<SelectProps> = ({ className, ...props }) => {
  const combinedClasses = `w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-brand-gold ${className}`;
  return <select className={combinedClasses} {...props} />;
};