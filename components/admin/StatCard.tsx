// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';

interface StatCardProps {
    title: string;
    value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <h4 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h4>
            <p className="text-3xl font-bold text-brand-blue dark:text-gray-100 mt-2">{value}</p>
        </div>
    );
};

export default StatCard;
