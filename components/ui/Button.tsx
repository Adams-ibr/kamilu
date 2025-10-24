// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline';
}

export const Button: React.FC<ButtonProps> = ({ className, variant = 'default', ...props }) => {
  const baseClasses = "px-6 py-3 font-bold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 dark:ring-offset-gray-900";
  
  const variantClasses = {
    default: 'bg-brand-gold text-white hover:bg-yellow-600 focus:ring-brand-gold',
    outline: 'bg-transparent border border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white focus:ring-brand-blue dark:text-brand-gold dark:border-brand-gold dark:hover:bg-brand-gold dark:hover:text-brand-charcoal',
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return <button className={combinedClasses} {...props} />;
};