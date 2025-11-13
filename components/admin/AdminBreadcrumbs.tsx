
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminBreadcrumbs: React.FC = () => {
    const location = useLocation();
    // Filter out 'admin' and any empty strings from the split
    const pathnames = location.pathname.split('/').filter((x) => x && x !== 'admin');

    // Function to capitalize the first letter of a string
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

    return (
        <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm">
                <li>
                    <Link to="/admin/dashboard" className="text-gray-500 hover:text-brand-blue dark:text-gray-400 dark:hover:text-brand-gold">
                        Dashboard
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    // Create the full path for the link
                    const to = `/admin/${pathnames.slice(0, index + 1).join('/')}`;
                    const isLast = index === pathnames.length - 1;
                    const name = capitalize(value.replace(/-/g, ' '));

                    return (
                        <li key={to} className="flex items-center">
                            <span className="text-gray-400 dark:text-gray-500 mx-2">/</span>
                            {isLast ? (
                                <span className="text-brand-blue font-semibold dark:text-gray-200">{name}</span>
                            ) : (
                                <Link to={to} className="text-gray-500 hover:text-brand-blue dark:text-gray-400 dark:hover:text-brand-gold">{name}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default AdminBreadcrumbs;
