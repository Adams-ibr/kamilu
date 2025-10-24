// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import StatCard from '../../components/admin/StatCard';
import { Link } from 'react-router-dom';
import type { Submission } from '../../types';

const AdminDashboardPage: React.FC = () => {
    const { products, blogPosts, services, submissions } = useAdmin();

    const recentSubmissions = submissions.slice(0, 5);

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Dashboard</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
                <StatCard title="Total Products" value={products.length.toString()} />
                <StatCard title="Total Blog Posts" value={blogPosts.length.toString()} />
                <StatCard title="Total Services" value={services.length.toString()} />
                <StatCard title="Total Submissions" value={submissions.length.toString()} />
            </div>

            <div className="mt-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Recent Submissions</h3>
                    <Link to="/admin/submissions" className="text-sm text-brand-gold hover:underline">View All</Link>
                </div>
                {recentSubmissions.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                           <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">From</th>
                                    <th scope="col" className="px-6 py-3">Type</th>
                                    <th scope="col" className="px-6 py-3">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentSubmissions.map((sub: Submission) => (
                                    <tr key={sub.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{sub.name}</td>
                                        <td className="px-6 py-4">{sub.type}</td>
                                        <td className="px-6 py-4">{new Date(sub.timestamp).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 dark:text-gray-400 py-4">No recent submissions.</p>
                )}
            </div>
        </div>
    );
};

export default AdminDashboardPage;
