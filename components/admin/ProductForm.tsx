// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import type { Product } from '../../types';
import { useAdmin } from '../../contexts/AdminContext';
import { PlusIcon } from '../icons';

interface ProductFormProps {
  product: Product | null;
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

const ProductForm: React.FC<ProductFormProps> = ({ product, onClose }) => {
    const { addProduct, updateProduct } = useAdmin();
    const [formData, setFormData] = React.useState({
        name: product?.name || '',
        description: product?.description || '',
        imageUrl: product?.imageUrl || '',
        gallery: product?.gallery || [],
        category: product?.category || '',
        applications: product?.applications || [],
        materials: product?.materials || [],
        specifications: product ? Object.entries(product.specifications).map(([k,v]) => `${k}: ${v}`).join('\n') : '',
        specSheetUrl: product?.specSheetUrl || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name === 'applications' || name === 'materials') {
            setFormData(prev => ({ ...prev, [name]: value.split(',').map(s => s.trim()) }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const base64 = await fileToBase64(e.target.files[0]);
            setFormData(prev => ({ ...prev, imageUrl: base64 }));
        }
    };

    const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            const base64Promises = files.map(fileToBase64);
            const base64Images = await Promise.all(base64Promises);
            setFormData(prev => ({ ...prev, gallery: [...prev.gallery, ...base64Images] }));
        }
    };

    const removeGalleryImage = (indexToRemove: number) => {
        setFormData(prev => ({
            ...prev,
            gallery: prev.gallery.filter((_, index) => index !== indexToRemove),
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.imageUrl) {
            alert("Please upload a main image.");
            return;
        }
        
        const specificationsObject = formData.specifications
            .split('\n')
            .filter(line => line.includes(':'))
            .reduce((acc, line) => {
                const [key, ...valueParts] = line.split(':');
                const value = valueParts.join(':').trim();
                if (key.trim() && value) {
                    acc[key.trim()] = value;
                }
                return acc;
            }, {} as { [key: string]: string });

        const { specifications, ...restOfData } = formData;

        const finalProductData = {
            ...restOfData,
            specifications: specificationsObject
        };

        if (product) {
            updateProduct({ ...product, ...finalProductData });
        } else {
            addProduct(finalProductData);
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
                    className="bg-white rounded-lg p-8 w-full max-w-2xl mx-4 dark:bg-gray-800"
                    variants={modalVariants}
                    onClick={(e) => e.stopPropagation()}
                >
                    <h2 className="text-2xl font-bold text-brand-blue dark:text-gray-100 mb-6">
                        {product ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Product Name</Label>
                            <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={formData.description} onChange={handleChange} rows={4} required />
                        </div>
                         <div>
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" name="category" value={formData.category} onChange={handleChange} required />
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
                        <div>
                            <Label>Gallery Images</Label>
                            <div className="flex flex-wrap gap-2">
                                {formData.gallery.map((img, index) => (
                                    <div key={index} className="relative group">
                                        <img src={img} alt={`Gallery item ${index + 1}`} className="w-24 h-24 object-cover rounded-md" />
                                        <button type="button" onClick={() => removeGalleryImage(index)} className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm leading-none opacity-0 group-hover:opacity-100 transition-opacity">&times;</button>
                                    </div>
                                ))}
                                <label htmlFor="gallery" className="w-24 h-24 flex flex-col items-center justify-center border-2 border-gray-300 border-dashed rounded-md cursor-pointer hover:border-brand-gold dark:border-gray-600 dark:hover:border-brand-gold">
                                    <PlusIcon className="h-8 w-8 text-gray-400" />
                                    <span className="mt-1 block text-xs text-gray-500">Add</span>
                                    <input id="gallery" name="gallery" type="file" multiple onChange={handleGalleryUpload} accept="image/*" className="sr-only" />
                                </label>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="applications">Applications (comma-separated)</Label>
                            <Input id="applications" name="applications" value={Array.isArray(formData.applications) ? formData.applications.join(', ') : formData.applications} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="materials">Materials (comma-separated)</Label>
                            <Input id="materials" name="materials" value={Array.isArray(formData.materials) ? formData.materials.join(', ') : formData.materials} onChange={handleChange} />
                        </div>
                        <div>
                            <Label htmlFor="specifications">Specifications (one per line, e.g., "Power: 2.2kW")</Label>
                            <Textarea id="specifications" name="specifications" value={formData.specifications} onChange={handleChange} rows={5} />
                        </div>
                        <div>
                            <Label htmlFor="specSheetUrl">Spec Sheet URL (e.g., /docs/sheet.pdf)</Label>
                            <Input id="specSheetUrl" name="specSheetUrl" value={formData.specSheetUrl} onChange={handleChange} />
                        </div>
                        <div className="flex justify-end space-x-4 pt-4">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">Save Product</Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ProductForm;