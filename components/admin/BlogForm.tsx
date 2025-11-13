// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import type { BlogPost } from '../../types';
import { useAdmin } from '../../contexts/AdminContext';
import RichTextEditor from './RichTextEditor';
import SERPPreview from './SERPPreview';

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
  hidden: { scale: 0.95, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1, 
    transition: { 
      type: "spring", 
      stiffness: 260, 
      damping: 25 
    } 
  },
};

// Simple slug generator for preview purposes
const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');


const BlogForm: React.FC<BlogFormProps> = ({ post, onClose }) => {
    const { addBlogPost, updateBlogPost } = useAdmin();
    const [formData, setFormData] = React.useState({
        title: post?.title || '',
        excerpt: post?.excerpt || '',
        content: post?.content || '',
        imageUrl: post?.imageUrl || '',
        author: post?.author || '',
        publishDate: post?.publishDate || new Date().toISOString().split('T')[0],
        metaDescription: post?.metaDescription || '',
        metaKeywords: post?.metaKeywords || [],
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'metaKeywords') {
            setFormData(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleContentChange = React.useCallback((content: string) => {
        setFormData(prev => ({...prev, content}));
    }, []);

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
                            <Label htmlFor="content">Content</Label>
                            <RichTextEditor
                                key={post?.id || 'new-post'}
                                value={formData.content}
                                onEditorChange={handleContentChange}
                            />
                        </div>
                        <div>
                            <Label>Main Image</Label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md dark:border-gray-600">
                                <div className="space-y-1 text-center">
                                    {formData.imageUrl ? (
                                        <img src={formData.imageUrl} alt="Main preview" className="mx-auto h-48 w-auto object-contain rounded-md" />
                                    ) : (
                                        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                                            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    )}
                                    <div className="flex text-sm text-gray-600 dark:text-gray-400">
                                        <label htmlFor="imageUrl" className="relative cursor-pointer bg-white rounded-md font-medium text-brand-gold hover:text-yellow-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-brand-gold dark:bg-gray-800 dark:focus-within:ring-offset-gray-800">
                                            <span>Upload a file</span>
                                            <input id="imageUrl" name="imageUrl" type="file" className="sr-only" onChange={handleImageUpload} accept="image/*" />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                        <div className="border-t pt-4 mt-4 dark:border-gray-600">
                             <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">SEO & Search Preview</h3>
                             <div>
                                <Label htmlFor="metaDescription">Meta Description</Label>
                                <Textarea id="metaDescription" name="metaDescription" value={formData.metaDescription} onChange={handleChange} rows={2} placeholder="A concise summary for search engines (approx. 160 characters)." />
                            </div>
                             <div className="mt-4">
                                <Label htmlFor="metaKeywords">Meta Keywords (comma-separated)</Label>
                                <Input id="metaKeywords" name="metaKeywords" value={Array.isArray(formData.metaKeywords) ? formData.metaKeywords.join(', ') : ''} onChange={handleChange} placeholder="e.g., keyword1, keyword2, keyword3" />
                            </div>
                            <SERPPreview 
                                title={formData.title}
                                metaDescription={formData.metaDescription}
                                slug={post?.slug || generateSlug(formData.title)}
                            />
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