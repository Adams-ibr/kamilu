// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import type { BlogPost } from '../../types';
import { Button } from '../../components/ui/Button';
import BlogForm from '../../components/admin/BlogForm';

const AdminBlogsPage: React.FC = () => {
    const { blogPosts, deleteBlogPost } = useAdmin();
    const [isModalOpen, setIsModalOpen] = React.useState(false);
    const [editingPost, setEditingPost] = React.useState<BlogPost | null>(null);

    const handleAddNew = () => {
        setEditingPost(null);
        setIsModalOpen(true);
    };

    const handleEdit = (post: BlogPost) => {
        setEditingPost(post);
        setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this blog post?')) {
            deleteBlogPost(id);
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Manage Blog Posts</h2>
                <Button onClick={handleAddNew}>Add New Post</Button>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Title</th>
                            <th scope="col" className="px-6 py-3">Author</th>
                            <th scope="col" className="px-6 py-3">Publish Date</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {blogPosts.map((post) => (
                            <tr key={post.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{post.title}</td>
                                <td className="px-6 py-4">{post.author}</td>
                                <td className="px-6 py-4">{post.publishDate}</td>
                                <td className="px-6 py-4 flex space-x-2">
                                    <button onClick={() => handleEdit(post)} className="font-medium text-brand-blue dark:text-blue-500 hover:underline">Edit</button>
                                    <button onClick={() => handleDelete(post.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <BlogForm
                    post={editingPost}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default AdminBlogsPage;
