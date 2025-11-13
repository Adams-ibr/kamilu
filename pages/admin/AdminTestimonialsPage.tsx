import React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import type { Testimonial } from '../../types';
import { Button } from '../../components/ui/Button';
import TestimonialForm from '../../components/admin/TestimonialForm';

const AdminTestimonialsPage: React.FC = () => {
    const { testimonials, deleteTestimonial } = useAdmin();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingTestimonial, setEditingTestimonial] = React.useState<Testimonial | null>(null);

    const handleAddNew = () => {
        setEditingTestimonial(null);
        setIsModalOpen(true);
    };

    const handleEdit = (testimonial: Testimonial) => {
        setEditingTestimonial(testimonial);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            deleteTestimonial(id);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Manage Testimonials</h2>
                <Button onClick={handleAddNew}>Add New Testimonial</Button>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Quote</th>
                            <th scope="col" className="px-6 py-3">Author</th>
                            <th scope="col" className="px-6 py-3">Company</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {testimonials.map((testimonial) => (
                            <tr key={testimonial.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 max-w-md truncate">{testimonial.quote}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{testimonial.author}</td>
                                <td className="px-6 py-4">{testimonial.company}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button onClick={() => handleEdit(testimonial)} className="font-medium text-brand-blue dark:text-blue-500 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(testimonial.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <TestimonialForm
                    testimonial={editingTestimonial}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminTestimonialsPage;
