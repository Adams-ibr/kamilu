// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAdmin } from '../../contexts/AdminContext';
import { AnimatePresence, motion } from 'framer-motion';

interface AdminSidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const navLinks = [
  { name: 'Dashboard', path: '/admin/dashboard' },
  { name: 'Products', path: '/admin/products' },
  { name: 'Blog Posts', path: '/admin/blogs' },
  { name: 'Services', path: '/admin/services' },
  { name: 'Submissions', path: '/admin/submissions' },
];

const AdminSidebar: React.FC<AdminSidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const { logout } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
        <div className="text-white text-2xl font-bold p-4 text-center border-b border-gray-700">
            K<span className="text-brand-gold">W</span>S Admin
        </div>
        <nav className="mt-5 flex-1">
            {navLinks.map(link => (
                <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setSidebarOpen(false)}
                    className={({ isActive }) => 
                        `flex items-center mt-4 py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200 ${isActive ? 'bg-gray-700 text-white' : ''}`
                    }
                >
                    <span className="mx-3">{link.name}</span>
                </NavLink>
            ))}
        </nav>
        <div className="p-4 border-t border-gray-700">
             <button
                onClick={handleLogout}
                className="w-full text-left flex items-center py-2 px-6 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors duration-200"
            >
                <span className="mx-3">Logout</span>
            </button>
        </div>
    </div>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 z-20 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 w-64 h-full bg-brand-charcoal z-30 lg:hidden"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>
      
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 bg-brand-charcoal text-white">
        <SidebarContent />
      </aside>
    </>
  );
};

export default AdminSidebar;
