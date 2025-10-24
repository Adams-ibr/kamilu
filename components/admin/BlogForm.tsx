// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import type { BlogPost } from '../../types';
import { useAdmin } from '../../contexts/AdminContext';

interface BlogFormProps {
  post: BlogPost | null;
  onClose: () => void;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
    });
};

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "-50vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.2 } },
};

const BlogForm: React.FC<BlogFormProps> = ({ post, onClose }) => {
    const { addBlogPost, updateBlogPost } = useAdmin();
    const [formData, setFormData] = React.useState({
        title: post?.title || '',
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        imageUrl: post?.imageUrl || '',
        author: post?.author || '',
        publishDate: post?.publishDate || new Date().toISOString().split('T')[0],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const base64 = await fileToBase64(e.target.files[0]);
            setFormData(prev => ({ ...prev, imageUrl: base64 }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.imageUrl) {
            alert("Please upload an image for the blog post.");
            return;
        }

        if (post) {
            updateBlogPost({ ...post, ...formData });
        } else {
            addBlogPost(formData);
        }
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start py-10 overflow-y-auto"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={onClose}
            >
                <motion.div
                    className="bg-white rounded-lg p-8 w-full max-w-3xl mx-4 dark:bg-gray-800"
                    variants={modalVariants}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold text-brand-blue dark:text-gray-100 mb-6">
                        {post ? 'Edit Blog Post' : 'Add New Blog Post'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="excerpt">Excerpt</Label>
                            <Textarea id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleChange} rows={3} required />
                        </div>
                        <div>
                            <Label htmlFor="content">Content (HTML allowed)</Label>
                            <Textarea id="content" name="content" value={formData.content} onChange={handleChange} rows={10} required />
                        </div>
                        <div>
                            <Label htmlFor="imageUrl">Image</Label>
                             {formData.imageUrl && <img src={formData.imageUrl} alt="preview" className="w-full h-48 object-cover rounded-md mb-2" />}
                            <Input id="imageUrl" name="imageUrl" type="file" onChange={handleImageUpload} accept="image/*" />
                        </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="author">Author</Label>
                                <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label htmlFor="publishDate">Publish Date</Label>
                                <Input id="publishDate" name="publishDate" type="date" value={formData.publishDate} onChange={handleChange} required />
                            </div>
                        </div>
                        <div className="flex justify-end space-x-4 pt-4">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">Save Post</Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default BlogForm;