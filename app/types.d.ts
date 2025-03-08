// Type definitions for React JSX elements
import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

// Define custom types for our application
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  description: string;
  features: string[];
}

export interface AppointmentRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  reason: string;
  preferredTimes?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
}

export interface BookChapter {
  id: string;
  title: string;
  releaseDate: Date;
  description: string;
  content?: string;
  isPublished: boolean;
}

// Extend existing types
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: 'user' | 'admin';
    }
  }
} 