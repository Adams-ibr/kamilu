import React from 'react';

export interface Product {
  id: number;
  slug: string;
  name: string;
  description: string;
  imageUrl: string;
  gallery: string[];
  category: string;
  applications: string[];
  materials: string[];
  specifications: { [key: string]: string };
  specSheetUrl: string;
  views?: number;
}

export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Changed from React.ReactNode to allow for editing
  imageUrl: string;
  author: string;
  publishDate: string;
  metaDescription: string;
  metaKeywords: string[];
}

export interface NavLink {
    name: string;
    path: string;
}

export interface Stat {
    value: string;
    label: string;
}

export interface Service {
    id: number;
    slug: string;
    name: string;
    description: string;
    detailedDescription: string;
    imageUrl: string;
    features: string[];
    icon: React.ReactNode;
}

export interface Testimonial {
    id: number;
    quote: string;
    author: string;
    company: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  socials: {
    linkedin: string;
    twitter: string;
  };
}

export interface Submission {
  id: string;
  type: 'Contact' | 'Inquiry' | 'Callback';
  name: string;
  email?: string;
  subject?: string;
  message?: string;
  productName?: string;
  phone?: string;
  preferredTime?: string;
  timestamp: Date;
}

export interface AdminContextType {
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
  addTestimonial: (testimonial: Omit<Testimonial, 'id'>) => void;
  updateTestimonial: (testimonial: Testimonial) => void;
  deleteTestimonial: (id: number) => void;

  teamMembers: TeamMember[];
}
