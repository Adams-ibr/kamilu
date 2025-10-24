// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import type { Product } from '../../types';
import { useAdmin } from '../../contexts/AdminContext';

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
                            <Label htmlFor="imageUrl">Main Image</Label>
                            {formData.imageUrl && <img src={formData.imageUrl} alt="Main preview" className="w-32 h-32 object-cover rounded-md mb-2" />}
                            <Input id="imageUrl" name="imageUrl" type="file" onChange={handleImageUpload} accept="image/*" />
                        </div>
                        <div>
                            <Label htmlFor="gallery">Gallery Images</Label>
                             <div className="flex flex-wrap gap-2 mb-2">
                                {formData.gallery.map((img, index) => (
                                    <div key={index} className="relative">
                                        <img src={img} alt={`Gallery item ${index + 1}`} className="w-24 h-24 object-cover rounded-md" />
                                        <button type="button" onClick={() => removeGalleryImage(index)} className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs leading-none">&times;</button>
                                    </div>
                                ))}
                            </div>
                            <Input id="gallery" name="gallery" type="file" multiple onChange={handleGalleryUpload} accept="image/*" />
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