// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import type { Service } from '../../types';
import { Button } from '../../components/ui/Button';
import ServiceForm from '../../components/admin/ServiceForm';

const AdminServicesPage: React.FC = () => {
    const { services } = useAdmin();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingService, setEditingService] = React.useState<Service | null>(null);

    const handleEdit = (service: Service) => {
        setEditingService(service);
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Manage Services</h2>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Description</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
                            <tr key={service.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{service.name}</td>
                                <td className="px-6 py-4 max-w-md truncate">{service.description}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => handleEdit(service)} className="font-medium text-brand-blue dark:text-blue-500 hover:underline">Edit</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && editingService && (
                <ServiceForm
                    service={editingService}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminServicesPage;
