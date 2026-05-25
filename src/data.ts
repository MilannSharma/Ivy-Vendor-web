/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Feature, ClientCase, BlogPost, Testimonial } from './types';

export const FEATURES: Feature[] = [
  {
    id: 'bulk-print',
    icon: 'Printer',
    name: 'Bulk Print PDF',
    description: 'Compile and download high-resolution print-ready PDFs for over 10,000 records in less than 30 seconds.',
    category: 'print'
  },
  {
    id: 'ai-crop',
    icon: 'Maximize',
    name: 'AI Auto-Crop Proportions',
    description: 'Auto-detect face coordinates and crop photos to precise student/employee standard proportions instantly.',
    category: 'ai'
  },
  {
    id: 'bg-remove',
    icon: 'Sparkles',
    name: 'Background Removal',
    description: 'Substitute noisy client photos with custom studio-quality white, blue, or grey backgrounds effortlessly.',
    category: 'ai'
  },
  {
    id: 'capture-app',
    icon: 'Smartphone',
    name: 'Photo Capture & Portal',
    description: 'Whitelabel mobile link or QR code for schools and students to upload or capture verified profile pictures.',
    category: 'design'
  },
  {
    id: 'spell-check',
    icon: 'CheckSquare',
    name: 'AI Grammar & Spell Check',
    description: 'Auto-flag spelling discrepancies, case-mismatches, and bad addresses in regional language lists.',
    category: 'ai'
  },
  {
    id: 'duplicate-detect',
    icon: 'Layers',
    name: 'Duplicate Record Detection',
    description: 'Intelligent multi-field scanning looks for double-entries of names or roll numbers to save sheets.',
    category: 'ai'
  },
  {
    id: 'auto-group',
    icon: 'FolderOpen',
    name: 'Class & Entity Auto-Grouping',
    description: 'Automatically segment 50+ classes, departments, or sections in separate folders with one drag-and-drop.',
    category: 'projects'
  },
  {
    id: 'templates',
    icon: 'LayoutGrid',
    name: 'Global ID Card Templates',
    description: 'Access 250+ standard school, university, and corporate layouts optimized for major dual-sided printers.',
    category: 'design'
  },
  {
    id: 'text-audit',
    icon: 'SearchCode',
    name: 'Natural Language Audit Search',
    description: 'Find mistakes instantly across millions of records. Search e.g., "all files in Class 10 with blue backgrounds".',
    category: 'projects'
  },
  {
    id: 'permissions',
    icon: 'ShieldAlert',
    name: 'Team & Multi-business Permissions',
    description: 'Assign distinct roles for data checkers, photo-editors, and press operators under a single master account.',
    category: 'team'
  },
  {
    id: 'custom-fields',
    icon: 'SlidersHorizontal',
    name: 'Dynamic Custom Fields',
    description: 'No strict structures. Easily add fields like Blood Group, Bus Route, House Colour, or Local Guardian dynamically.',
    category: 'design'
  },
  {
    id: 'erp-integration',
    icon: 'Link2',
    name: 'ERP & LMS Direct Integration',
    description: 'Seamless API connectors to sync master datasheets directly with school ERP systems or corporate directories.',
    category: 'team'
  }
];

export const CLIENT_CASES: ClientCase[] = [
  {
    id: 'case-1',
    clientName: 'Modern School Academy',
    city: 'New Delhi',
    category: 'school',
    challenge: 'Managing over 4,500 student photos uploaded on WhatsApp with inconsistent ratios and noisy home backgrounds.',
    result: 'IVY Prints AI auto-aligned and background-removed all 4,500 photos. The print-ready high-res PDF was compiled in under 10 minutes.',
    cardsPrinted: '4,500+ Cards',
    timeSaved: '6 Days Saved',
    errorReduction: '100% Error-Free',
    logoText: 'MS'
  },
  {
    id: 'case-2',
    clientName: 'St. Xavier Technical College',
    city: 'Mumbai',
    category: 'college',
    challenge: 'Staff manually typed out addresses, leading to spelling errors, duplicate roll numbers, and huge wastage during print batches.',
    result: 'The system auto-detected 84 duplicates and flagged invalid zipcodes prior to printing, saving ₹42,000 on wasted thermal sheets.',
    cardsPrinted: '12,000+ Cards',
    timeSaved: '11 Days Saved',
    errorReduction: 'Zero Reprint Runs',
    logoText: 'SX'
  },
  {
    id: 'case-3',
    clientName: 'Innova Health & Corp',
    city: 'Bengaluru',
    category: 'corporate',
    challenge: 'Providing secure ID cards for multi-location tech parks with integrated barcodes and high-res dual-sided details.',
    result: 'Adopted IVY cloud-based workflow allowing regional HR managers to capture biometric verified portraits that synced directly into standard template designs.',
    cardsPrinted: '8,500+ Cards',
    timeSaved: '5 Days Saved',
    errorReduction: '99.8% On-Time',
    logoText: 'IH'
  },
  {
    id: 'case-4',
    clientName: 'Rajasthan Public Services Dept',
    city: 'Jaipur',
    category: 'government',
    challenge: 'Printing and distributing regional government vendor security badges over massive rural circles with bilingual text.',
    result: 'Utilized state-wise offline-ready capture links to allow mobile phone uploads which were validated using automatic regional spell check algorithms.',
    cardsPrinted: '28,000+ Cards',
    timeSaved: '24 Days Saved',
    errorReduction: '99.9% Accuracy',
    logoText: 'RP'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Rajesh Verma',
    businessName: 'Vibrant Print World',
    city: 'Patna',
    quote: 'We used to spend 7 nights cropping photos on Photoshop and matching them to Excel lists. Standard ID cards for 2,000 kids used to take us 10 days of non-stop work. With IVY, we did it in under 6 hours. Absolutely mind-blowing profit boost!',
    rating: 5,
    achievement: 'Reduced project time from 8 days to 2 days',
    avatarText: 'RV'
  },
  {
    id: 't2',
    name: 'Anjali Sharma',
    businessName: 'Apex Graphic Printers',
    city: 'Indore',
    quote: 'Our biggest problem was spelling spelling errors and schools complaining about bad photo quality. IVY Prints AI crop and grammar tools flag issues before the card is ever sent to our physical machine. Wasted sheets dropped to zero!',
    rating: 5,
    achievement: 'Wrangled 5,000 records in one batch',
    avatarText: 'AS'
  },
  {
    id: 't3',
    name: 'Karan Mehra',
    businessName: 'Elite Smart Solutions',
    city: 'Ludhiana',
    quote: 'The photo link portals revolutionized our on-field operations! We just print a QR stands, schools scan it, take photos, and they match directly by Roll No. I did not edit a single photo myself this session.',
    rating: 5,
    achievement: 'Scored 2.5x higher margins per batch',
    avatarText: 'KM'
  },
  {
    id: 't4',
    name: 'Prakash Rao',
    businessName: 'Sri Sai Digital prints',
    city: 'Hyderabad',
    quote: 'The Bulk PDF feature exports high resolution double-sided files in exactly the layout we need for our modern high speed card printer. The multi-business operator roles let my desk team handle all corrections easily.',
    rating: 5,
    achievement: 'Printed 40,000+ security badges',
    avatarText: 'PR'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'How 3D Printing Vendors in India are Doubling and Tripling Margins',
    summary: 'Discover the business optimizations starting with automated bulk photo layout that are allowing B2B print businesses to process 3x volume for corporate and school contracts without hiring extra editors.',
    content: 'Long form content outlining detailed techniques on pricing packages, optimizing card stock, automated workflow integration, and dealing with client revisions...',
    tag: 'Business Growth',
    date: 'May 18, 2026',
    readTime: '5 min read',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=700',
    author: {
      name: 'Abishek Gupta',
      role: 'Growth Specialist',
      avatar: 'AG'
    }
  },
  {
    id: 'blog-2',
    title: 'The Ultimate Guide to Perfect Portrait Auto-Cropping Standards',
    summary: 'How to prepare portrait sheets for standard cr80 ID card specs. Common ratios, margins, eye-line coordinates, and how artificial intelligence keeps them standard over 10,000 student records.',
    content: 'Details about ID alignment guidelines, printing bleed margins (typically 2-3mm), pixel-to-millimeter ratio conversions for dual-sided machines, and setting accurate DPI in automated PDFs.',
    tag: 'Tips & Guides',
    date: 'May 12, 2026',
    readTime: '8 min read',
    imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=700',
    author: {
      name: 'Sunita Rao',
      role: 'Head of Pre-Press',
      avatar: 'SR'
    }
  },
  {
    id: 'blog-3',
    title: 'How AI-Enabled Background Replacement Speeds Up Prep Work by 92%',
    summary: 'No more manual lasso selections or Photoshop masking. See how semantic background detectors drop noisy living rooms out of portrait pictures and place professional background layers in fractions of a second.',
    content: 'Deep analysis of time trial testing on traditional manual clipping paths vs modern high-end neural segmentation models running in parallel cloud processors.',
    tag: 'AI Technology',
    date: 'April 28, 2026',
    readTime: '4 min read',
    imageUrl: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=700',
    author: {
      name: 'Rahul Joshi',
      role: 'Senior Product Engineer',
      avatar: 'RJ'
    }
  }
];

export const INDIAN_CITIES = [
  { name: 'New Delhi', x: 28, y: 35, count: '140+ Vendors' },
  { name: 'Mumbai', x: 22, y: 62, count: '190+ Vendors' },
  { name: 'Bengaluru', x: 34, y: 81, count: '220+ Vendors' },
  { name: 'Hyderabad', x: 36, y: 68, count: '110+ Vendors' },
  { name: 'Chennai', x: 42, y: 83, count: '90+ Vendors' },
  { name: 'Kolkata', x: 74, y: 50, count: '120+ Vendors' },
  { name: 'Jaipur', x: 21, y: 40, count: '80+ Vendors' },
  { name: 'Ahmedabad', x: 15, y: 51, count: '75+ Vendors' },
  { name: 'Patna', x: 61, y: 41, count: '150+ Vendors' },
  { name: 'Indore', x: 30, y: 53, count: '95+ Vendors' },
  { name: 'Ludhiana', x: 25, y: 26, count: '60+ Vendors' },
  { name: 'Guwahati', x: 88, y: 42, count: '45+ Vendors' }
];

export const FAQS = [
  {
    question: 'How fast can the AI auto-crop photos for a school project?',
    answer: 'The auto-cropping engine runs asynchronously in cloud threads, handling roughly 120 portraits per second. A school batch of 2,000 student photographs takes less than 20 seconds to crop, align, and review.'
  },
  {
    question: 'Can I design custom front and back layers, or do I have to use templates?',
    answer: 'You have full flexibility! You can either upload custom background images (front/back PNG or JPEGs) and drag-and-drop dynamic variables (Name, Class, Barcode, Roll No) onto them, or use any of our 250+ standard ready-to-print designs.'
  },
  {
    question: 'What printing sheet configurations do you support for exports?',
    answer: 'We support standard single cards, 5-up configurations, A4 grids (8-up/10-up layouts), and bleed-adjusted thermal machine templates (such as Evolis, Fargo, Zebra, and Magicard dual-sided high speed systems).'
  },
  {
    question: 'Is student data secure and compliant with data laws in India?',
    answer: 'Yes. IVY Prints uses bank-grade 256-bit SSL encryption. We secure all raw uploads and immediately purge master files upon your request after delivery, or archive them permanently with restricted passwords.'
  },
  {
    question: 'Can my on-field workers access the portal on mobile?',
    answer: 'Absolutely. IVY Prints includes a dedicated web-app optimized for smartphones. Your operators can take real-time photos at schools, capture student biometric details, and edit entries on any Android or iOS device.'
  }
];
