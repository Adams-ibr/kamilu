// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import type { Product } from '../../types';
import { Button } from '../../components/ui/Button';
import ProductForm from '../../components/admin/ProductForm';

const AdminProductsPage: React.FC = () => {
    const { products, deleteProduct } = useAdmin();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);

    const handleAddNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            deleteProduct(id);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Manage Products</h2>
                <Button onClick={handleAddNew}>Add New Product</Button>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Name</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{product.name}</td>
                                <td className="px-6 py-4">{product.category}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button onClick={() => handleEdit(product)} className="font-medium text-brand-blue dark:text-blue-500 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <ProductForm
                    product={editingProduct}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminProductsPage;
