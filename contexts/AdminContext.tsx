import React from 'react';
import { PRODUCTS, BLOG_POSTS, SERVICES, TESTIMONIALS, TEAM_MEMBERS } from '../constants';
import type { Product, BlogPost, Service, Testimonial, TeamMember, Submission, AdminContextType } from '../types';

const AdminContext = React.createContext<AdminContextType | undefined>(undefined);

// Simple slug generator
const generateSlug = (name: string) => name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [products, setProducts] = React.useState<Product[]>(PRODUCTS);
    const [blogPosts, setBlogPosts] = React.useState<BlogPost[]>(BLOG_POSTS);
    const [services, setServices] = React.useState<Service[]>(SERVICES);
    const [testimonials, setTestimonials] = React.useState<Testimonial[]>(TESTIMONIALS);

    const [submissions, setSubmissions] = React.useState<Submission[]>(() => {
        try {
            const stored = localStorage.getItem('kws-submissions');
            if (stored) {
                const parsed = JSON.parse(stored);
                // Convert timestamp strings back to Date objects
                return parsed.map((sub: Submission) => ({ ...sub, timestamp: new Date(sub.timestamp) }));
            }
            return [];
        } catch (error) {
            console.error("Failed to load submissions from local storage:", error);
            return [];
        }
    });

    React.useEffect(() => {
        try {
            localStorage.setItem('kws-submissions', JSON.stringify(submissions));
        } catch (error) {
            console.error("Failed to save submissions to local storage:", error);
        }
    }, [submissions]);

    // Non-editable data for now
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

    // Testimonial CRUD
    const addTestimonial = (testimonialData: Omit<Testimonial, 'id'>) => {
        const newTestimonial: Testimonial = {
            ...testimonialData,
            id: Date.now(),
        };
        setTestimonials(prev => [newTestimonial, ...prev]);
    };

    const updateTestimonial = (updatedTestimonial: Testimonial) => {
        setTestimonials(prev => prev.map(t => t.id === updatedTestimonial.id ? updatedTestimonial : t));
    };

    const deleteTestimonial = (id: number) => {
        setTestimonials(prev => prev.filter(t => t.id !== id));
    };

    const value = {
        isAuthenticated, login, logout,
        products, addProduct, updateProduct, deleteProduct,
        blogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
        services, updateService,
        submissions, addSubmission,
        testimonials, addTestimonial, updateTestimonial, deleteTestimonial,
        teamMembers,
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
