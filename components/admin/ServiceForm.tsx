// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { Label } from '../ui/Label';
import type { Service } from '../../types';
import { useAdmin } from '../../contexts/AdminContext';

interface ServiceFormProps {
  service: Service;
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

const ServiceForm: React.FC<ServiceFormProps> = ({ service, onClose }) => {
    const { updateService } = useAdmin();
    const [description, setDescription] = React.useState(service.description);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateService({ ...service, description });
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
                        Edit Service: {service.name}
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="description">Description</Label>
                            <Textarea 
                                id="description" 
                                name="description" 
                                value={description} 
                                onChange={(e) => setDescription(e.target.value)} 
                                rows={5} 
                                required 
                            />
                        </div>
                        <div className="flex justify-end space-x-4 pt-4">
                            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default ServiceForm;
