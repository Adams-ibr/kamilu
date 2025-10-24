// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import type { Submission } from '../../types';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { DownloadIcon } from '../../components/icons';

// Declare jsPDF and autoTable from global scope for TypeScript
declare const jspdf: any;

const backdropVariants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const modalVariants = {
  hidden: { y: "-50vh", opacity: 0 },
  visible: { y: "0", opacity: 1, transition: { delay: 0.2 } },
};


const AdminSubmissionsPage: React.FC = () => {
    const { submissions } = useAdmin();
    const [selectedSubmission, setSelectedSubmission] = React.useState<Submission | null>(null);

    const exportToPDF = () => {
        const { jsPDF } = jspdf;
        const doc = new jsPDF();
        
        doc.setFontSize(18);
        doc.text("Form Submissions - Kamilu Welding Services", 14, 22);
        
        const tableColumn = ["Date", "From", "Email", "Type", "Subject / Product", "Message"];
        const tableRows: (string | null | undefined)[][] = [];

        submissions.forEach(sub => {
            const submissionData = [
                new Date(sub.timestamp).toLocaleString(),
                sub.name,
                sub.email,
                sub.type,
                sub.subject || sub.productName,
                sub.message
            ];
            tableRows.push(submissionData);
        });

        (doc as any).autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            theme: 'grid',
            styles: { fontSize: 8 },
            headStyles: { fillColor: [27, 59, 111] }, // brand-blue
            columnStyles: {
                5: { cellWidth: 'auto' }, // Message column
            }
        });

        const date = new Date().toISOString().slice(0, 10);
        doc.save(`KWS_Submissions_${date}.pdf`);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-200">Form Submissions</h2>
                <Button onClick={exportToPDF} className="flex items-center space-x-2">
                    <DownloadIcon className="w-5 h-5" />
                    <span>Export to PDF</span>
                </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">Date</th>
                            <th scope="col" className="px-6 py-3">From</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Type</th>
                            <th scope="col" className="px-6 py-3">Subject / Product</th>
                            <th scope="col" className="px-6 py-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {submissions.map((sub) => (
                            <tr key={sub.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4">{new Date(sub.timestamp).toLocaleString()}</td>
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{sub.name}</td>
                                <td className="px-6 py-4">{sub.email}</td>
                                <td className="px-6 py-4">{sub.type}</td>
                                <td className="px-6 py-4">{sub.subject || sub.productName}</td>
                                <td className="px-6 py-4">
                                    <button onClick={() => setSelectedSubmission(sub)} className="font-medium text-brand-blue dark:text-blue-500 hover:underline">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                 {submissions.length === 0 && <p className="text-center p-4">No submissions yet.</p>}
            </div>

            {selectedSubmission && (
                 <AnimatePresence>
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4"
                        variants={backdropVariants}
                        initial="hidden" animate="visible" exit="hidden"
                        onClick={() => setSelectedSubmission(null)}
                    >
                        <motion.div
                            className="bg-white rounded-lg p-8 w-full max-w-2xl mx-4 dark:bg-gray-800"
                            variants={modalVariants}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h2 className="text-2xl font-bold text-brand-blue dark:text-gray-100 mb-4">
                                Submission Details
                            </h2>
                            <div className="space-y-4 text-gray-700 dark:text-gray-300">
                                <p><strong>From:</strong> {selectedSubmission.name} ({selectedSubmission.email})</p>
                                <p><strong>Date:</strong> {new Date(selectedSubmission.timestamp).toLocaleString()}</p>
                                <p><strong>Type:</strong> {selectedSubmission.type}</p>
                                <p><strong>Subject:</strong> {selectedSubmission.subject || selectedSubmission.productName}</p>
                                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md">
                                    <p className="font-semibold">Message:</p>
                                    <p className="whitespace-pre-wrap">{selectedSubmission.message}</p>
                                </div>
                            </div>
                            <div className="flex justify-end mt-6">
                                <Button variant="outline" onClick={() => setSelectedSubmission(null)}>Close</Button>
                            </div>
                        </motion.div>
                    </motion.div>
                </AnimatePresence>
            )}
        </div>
    );
};

export default AdminSubmissionsPage;