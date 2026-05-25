/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type PageId =
  | 'home'
  | 'features'
  | 'how-it-works'
  | 'contact'
  | 'privacy-policy'
  | 'terms-of-service'
  | 'refund-policy'
  | 'signin'
  | 'signup';

export interface Feature {
  id: string;
  icon: string;
  name: string;
  description: string;
  category: 'projects' | 'ai' | 'print' | 'design' | 'team' | 'other';
  learnMorePath?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  summary: string;
  content: string;
  tag: string;
  date: string;
  readTime: string;
  imageUrl: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  businessName: string;
  city: string;
  quote: string;
  rating: number;
  achievement: string;
  avatarText: string;
}

export interface ClientCase {
  id: string;
  clientName: string;
  city: string;
  category: 'school' | 'college' | 'corporate' | 'government';
  challenge: string;
  result: string;
  cardsPrinted: string;
  timeSaved: string;
  errorReduction: string;
  logoText: string;
}
