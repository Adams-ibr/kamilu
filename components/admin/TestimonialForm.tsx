import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import type { Testimonial } from '../../types';
import { useAdmin } from '../../contexts/AdminContext';

interface TestimonialFormProps {
  testimonial: Testimonial | null;
  onClose: () => void;
}

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "-50vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.2 } },
};

const TestimonialForm: React.FC<TestimonialFormProps> = ({ testimonial, onClose }) => {
    const { addTestimonial, updateTestimonial } = useAdmin();
    const [formData, setFormData] = React.useState({
        quote: testimonial?.quote || '',
        author: testimonial?.author || '',
        company: testimonial?.company || '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (testimonial) {
            updateTestimonial({ ...testimonial, ...formData });
        } else {
            addTestimonial(formData);
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
                        {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="quote">Quote</Label>
                            <Textarea id="quote" name="quote" value={formData.quote} onChange={handleChange} rows={5} required />
                        </div>
                        <div>
                            <Label htmlFor="author">Author</Label>
                            <Input id="author" name="author" value={formData.author} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="company">Company</Label>
                            <Input id="company" name="company" value={formData.company} onChange={handleChange} required />
                        </div>
                        <div className="flex justify-end space-x-4 pt-4">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">Save Testimonial</Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default TestimonialForm;
