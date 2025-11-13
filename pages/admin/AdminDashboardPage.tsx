import React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import StatCard from '../../components/admin/StatCard';
import SubmissionsChart from '../../components/admin/SubmissionsChart';
import TopProducts from '../../components/admin/TopProducts';

const AdminDashboardPage: React.FC = () => {
    const { products, blogPosts, services, submissions } = useAdmin();

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Products" value={products.length.toString()} />
                <StatCard title="Total Blog Posts" value={blogPosts.length.toString()} />
                <StatCard title="Total Services" value={services.length.toString()} />
                <StatCard title="Total Submissions" value={submissions.length.toString()} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
                <div className="lg:col-span-2">
                    <SubmissionsChart />
                </div>
                <div>
                    <TopProducts />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;