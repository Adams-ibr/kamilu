// FIX: Using a namespace import for React to solve JSX intrinsic element type errors.
// The default import `import React from 'react'` was causing TypeScript's global
// JSX.IntrinsicElements to be overwritten, removing standard HTML element types.
// Changing to `import * as React from 'react'` ensures correct module augmentation.
import * as React from 'react';

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
    name: string;
    description: string;
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
  type: 'Contact' | 'Inquiry';
  name: string;
  email: string;
  subject?: string;
  message: string;
  productName?: string;
  timestamp: Date;
}