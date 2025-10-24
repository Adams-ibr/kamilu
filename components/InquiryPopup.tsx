// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Textarea } from './ui/Textarea';
import { Label } from './ui/Label';
import { useAdmin } from '../contexts/AdminContext';

interface InquiryPopupProps {
  productName: string;
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

const InquiryPopup: React.FC<InquiryPopupProps> = ({ productName, onClose }) => {
  const { addSubmission } = useAdmin();
  const [submitted, setSubmitted] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('inquiry-name') as string;
    const email = formData.get('inquiry-email') as string;
    const message = formData.get('inquiry-scope') as string;
    
    addSubmission({
      type: 'Inquiry',
      name,
      email,
      message,
      productName
    });
    
    setSubmitted(true);
    setTimeout(() => {
        onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg p-8 w-full max-w-lg mx-4 dark:bg-gray-800"
          variants={modalVariants}
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
        >
          {submitted ? (
            <div className="text-center">
                <h2 className="text-2xl font-bold text-brand-blue dark:text-gray-100 mb-4">Thank You!</h2>
                <p className="text-gray-600 dark:text-gray-300">Your inquiry has been received. We will get back to you shortly.</p>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-brand-blue dark:text-gray-100 mb-4">Inquiry for {productName}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="inquiry-name">Full Name</Label>
                  <Input id="inquiry-name" name="inquiry-name" type="text" placeholder="Your Name" required/>
                </div>
                <div>
                  <Label htmlFor="inquiry-email">Email</Label>
                  <Input id="inquiry-email" name="inquiry-email" type="email" placeholder="Your Email" required/>
                </div>
                <div>
                  <Label htmlFor="inquiry-scope">Project Scope / Details</Label>
                  <Textarea id="inquiry-scope" name="inquiry-scope" placeholder="Briefly describe the project, materials, and timeline." rows={4} required/>
                </div>
                <div className="flex justify-end space-x-4">
                  <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
                  <Button type="submit">Submit Inquiry</Button>
                </div>
              </form>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default InquiryPopup;