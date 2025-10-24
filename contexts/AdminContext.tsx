// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
import * as React from 'react';
import { PRODUCTS, BLOG_POSTS, SERVICES, TESTIMONIALS, TEAM_MEMBERS } from '../constants';
import type { Product, BlogPost, Service, Testimonial, TeamMember, Submission } from '../types';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (password: string) => boolean;
  logout: () => void;
  
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: number) => void;
  
  blogPosts: BlogPost[];
  addBlogPost: (post: Omit<BlogPost, 'id' | 'slug'>) => void;
  updateBlogPost: (post: BlogPost) => void;
  deleteBlogPost: (id: number) => void;

  services: Service[];
  updateService: (service: Service) => void;
  
  submissions: Submission[];
  addSubmission: (submission: Omit<Submission, 'id' | 'timestamp'>) => void;
  
  testimonials: Testimonial[];
  teamMembers: TeamMember[];
}

const AdminContext = React.createContext<AdminContextType | undefined>(undefined);

// Simple slug generator
const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [products, setProducts] = React.useState<Product[]>(PRODUCTS);
    const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>(BLOG_POSTS);
    const [services, setServices] = React.useState<Service[]>(SERVICES);
    const [submissions, setSubmissions] = React.useState<Submission[]>([]);

    // Non-editable data for now
    const testimonials = TESTIMONIALS;
    const teamMembers = TEAM_MEMBERS;

    const login = (password: string) => {
        if (password === 'admin123') { // In a real app, this would be a secure API call
            setIsAuthenticated(true);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    // Product CRUD
    const addProduct = (productData: Omit<Product, 'id' | 'slug'>) => {
        const newProduct: Product = {
            ...productData,
            id: Date.now(),
            slug: generateSlug(productData.name),
        };
        setProducts(prev => [newProduct, ...prev]);
    };
    const updateProduct = (updatedProduct: Product) => {
        setProducts(prev => prev.map(p => p.id === updatedProduct.id ? updatedProduct : p));
    };
    const deleteProduct = (id: number) => {
        setProducts(prev => prev.filter(p => p.id !== id));
    };

    // Blog Post CRUD
    const addBlogPost = (postData: Omit<BlogPost, 'id' | 'slug'>) => {
        const newPost: BlogPost = {
            ...postData,
            id: Date.now(),
            slug: generateSlug(postData.title),
        };
        setBlogPosts(prev => [newPost, ...prev]);
    };
    const updateBlogPost = (updatedPost: BlogPost) => {
        setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
    };
    const deleteBlogPost = (id: number) => {
        setBlogPosts(prev => prev.filter(p => p.id !== id));
    };

    // Service Update
    const updateService = (updatedService: Service) => {
        setServices(prev => prev.map(s => s.id === updatedService.id ? updatedService : s));
    };

    // Submissions
    const addSubmission = (submissionData: Omit<Submission, 'id' | 'timestamp'>) => {
        const newSubmission: Submission = {
            ...submissionData,
            id: `sub_${Date.now()}`,
            timestamp: new Date(),
        };
        setSubmissions(prev => [newSubmission, ...prev]);
    };

    const value = {
        isAuthenticated, login, logout,
        products, addProduct, updateProduct, deleteProduct,
        blogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
        services, updateService,
        submissions, addSubmission,
        testimonials, teamMembers,
    };

    return (
        <AdminContext.Provider value={value}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = (): AdminContextType => {
    const context = React.useContext(AdminContext);
    if (context === undefined) {
        throw new Error('useAdmin must be used within an AdminProvider');
    }
    return context;
};
