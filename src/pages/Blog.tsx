/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { PageId, BlogPost } from '../types';
import { BLOG_POSTS } from '../data';
import { 
  Calendar, 
  Clock, 
  ArrowRight, 
  User, 
  CheckCircle,
  Mail,
  BookOpen,
  Sparkles,
  Lightbulb,
  Cpu,
  TrendingUp
} from 'lucide-react';

interface BlogProps {
  onPageChange: (page: PageId) => void;
}

export default function Blog({ onPageChange }: BlogProps) {
  const [filter, setFilter] = useState<'all' | 'Tips & Guides' | 'AI Technology' | 'Business Growth'>('all');
  const [newsEmail, setNewsEmail] = useState('');
  const [newsSuccess, setNewsSuccess] = useState('');
  const [viewingPost, setViewingPost] = useState<BlogPost | null>(null);

  const categories = [
    { id: 'all', label: 'All Articles', icon: BookOpen },
    { id: 'Tips & Guides', label: 'Practical Tips', icon: Lightbulb },
    { id: 'AI Technology', label: 'AI & Automation', icon: Cpu },
    { id: 'Business Growth', label: 'Vendor Growth', icon: TrendingUp }
  ];

  const filteredPosts = filter === 'all' 
    ? BLOG_POSTS 
    : BLOG_POSTS.filter(p => p.tag === filter);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!newsEmail.trim()) return;
    setNewsSuccess('Subscribed successfully! You will receive weekly B2B printing guides every Tuesday.');
    setNewsEmail('');
  };

  return (
    <div id="blog-resources-page" className="pt-20 bg-white min-h-screen text-left pb-20">
      
      {/* Editorial Header */}
      <section className="bg-slate-50 border-b border-slate-150 py-16 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-4">
          <span className="text-[#00AEEF] font-mono text-xs font-black uppercase tracking-widest block font-bold">MERCHANT GUIDES & ESSAYS</span>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-[#0A1628] tracking-tight">
            The Smart B2B Printer's Journal
          </h1>
          <p className="font-sans text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed">
            Discover pre-press optimization metrics, thermal laminate guidelines, and client management advice from professional print business directors.
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-12">
        
        {/* Category Filters */}
        <div className="flex justify-center gap-1 border-b border-slate-200 pb-2 overflow-x-auto whitespace-nowrap">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id as any)}
                className={`px-4.5 py-2 border-b-2 font-display text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5 ${
                  filter === cat.id 
                    ? 'border-[#00AEEF] text-[#00AEEF]' 
                    : 'border-transparent text-slate-400 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5 shrink-0" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Post Card (Hero) */}
        {filter === 'all' && BLOG_POSTS.length > 0 && (
          <div 
            onClick={() => setViewingPost(BLOG_POSTS[0])}
            className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-xl transition flex flex-col lg:flex-row"
          >
            <div className="lg:w-1/2 min-h-64 lg:min-h-auto relative bg-slate-200">
              <img 
                src={BLOG_POSTS[0].imageUrl} 
                alt="Featured Article Thumbnail" 
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <span className="absolute top-4 left-4 bg-[#FFB800] text-[#0A1628] font-mono text-[9px] font-bold px-2.5 py-1 roundeduppercase">
                ★ FEATURED READ
              </span>
            </div>
            
            <div className="lg:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 font-mono text-[10px] text-[#00AEEF] uppercase font-bold">
                  <span>{BLOG_POSTS[0].tag}</span>
                  <span>·</span>
                  <span>{BLOG_POSTS[0].readTime}</span>
                </div>
                
                <h3 className="font-display font-black text-xl sm:text-2xl text-[#0A1628] leading-tight hover:text-[#00AEEF] transition-colors">
                  {BLOG_POSTS[0].title}
                </h3>
                
                <p className="font-sans text-xs text-slate-500 leading-relaxed">
                  {BLOG_POSTS[0].summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-150">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#00AEEF] text-white flex items-center justify-center font-display font-bold text-xs">
                    {BLOG_POSTS[0].author.avatar}
                  </div>
                  <div className="font-sans text-left text-[11px]">
                    <span className="block font-bold text-slate-800">{BLOG_POSTS[0].author.name}</span>
                    <span className="text-slate-400 text-[10px]">{BLOG_POSTS[0].author.role}</span>
                  </div>
                </div>

                <span className="font-mono text-[11px] text-[#00AEEF] font-bold flex items-center gap-0.5 hover:underline">
                  READ ARTICLE →
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Regular list columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.filter((_, idx) => filter !== 'all' || idx !== 0).map((post) => (
            <div 
              key={post.id}
              onClick={() => setViewingPost(post)}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden cursor-pointer hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="h-44 bg-slate-100 relative overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt="Article image" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-2 left-2 bg-slate-900/80 backdrop-blur text-white font-mono text-[8px] px-2 py-0.5 rounded font-bold uppercase">
                    {post.tag}
                  </span>
                </div>

                <div className="p-5 text-left space-y-2.5">
                  <div className="flex items-center justify-between font-mono text-[10px] text-slate-400">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h4 className="font-display font-bold text-sm text-[#0A1628] leading-snug hover:text-[#00AEEF] transition-colors">
                    {post.title}
                  </h4>

                  <p className="font-sans text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {post.summary}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 border-t border-slate-100/70 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-slate-600">
                  <User className="w-3.5 h-3.5 text-[#00AEEF]" />
                  <span className="text-[10px] font-medium text-slate-400">{post.author.name}</span>
                </div>
                <span className="font-mono text-[10px] text-[#00AEEF] font-bold">READ GUIDE →</span>
              </div>
            </div>
          ))}

          {filteredPosts.length === 0 && (
            <div className="col-span-3 text-center py-16 bg-slate-50 rounded-xl border border-slate-150 flex flex-col items-center justify-center space-y-2">
              <BookOpen className="w-8 h-8 text-slate-400" />
              <p className="font-display text-xs text-slate-500 mt-2">No Articles published in this category yet.</p>
            </div>
          )}
        </div>

        {/* NEWSLETTER SIGNUP BOX SPLIT STRIP */}
        <section className="bg-slate-50 border border-slate-205 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 justify-between relative overflow-hidden mt-16">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#FFB800]/10 to-transparent pointer-events-none" />
          
          <div className="space-y-2 text-left flex-1">
            <div className="inline-flex items-center gap-1 bg-[#FFB800]/10 border border-[#FFB800]/25 text-[#FFB800] px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold">
              <Sparkles className="w-3" />
              <span>Free Educational Service</span>
            </div>
            <h3 className="font-display font-black text-base text-[#0A1628]">Weekly Printing Business Tips</h3>
            <p className="font-sans text-xs text-slate-500 max-w-md">Learn sheet configuration, crop guide setups, customer retention tactics, and thermal sheet maintenance logs safely.</p>
          </div>

          <div className="w-full md:w-auto shrink-0 md:max-w-xs flex-1">
            {newsSuccess ? (
              <div className="p-3 bg-emerald-50 border border-emerald-250 text-emerald-850 text-xs rounded-xl flex items-center gap-2 animate-in zoom-in-95 duration-200">
                <CheckCircle className="w-4 h-4 text-[#10B981] shrink-0" />
                <span className="text-left font-sans">{newsSuccess}</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input 
                  type="email" 
                  value={newsEmail}
                  onChange={(e) => setNewsEmail(e.target.value)}
                  placeholder="Enter email e.g. owner@business.in" 
                  required
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-200 text-xs rounded-lg font-sans focus:outline-none focus:border-[#00AEEF]"
                />
                <button 
                  type="submit" 
                  className="px-4 py-2.5 bg-[#00AEEF] hover:bg-[#0096ce] text-white rounded-lg text-xs font-sans font-bold whitespace-nowrap"
                >
                  Join List
                </button>
              </form>
            )}
          </div>
        </section>

      </div>

      {/* FULL POST DETAIL VIEW MODAL */}
      {viewingPost && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl w-full max-w-2xl overflow-y-auto max-h-[90vh] border border-slate-200">
            {/* Image Banner */}
            <div className="h-56 bg-slate-100 relative">
              <img 
                src={viewingPost.imageUrl} 
                alt="Banner" 
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <button 
                onClick={() => setViewingPost(null)}
                className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold"
              >
                ✕
              </button>
              <div className="absolute bottom-4 left-4 text-white text-left text-xs font-mono bg-cyan-600 px-2 py-0.5 rounded font-bold uppercase tracking-wider">
                {viewingPost.tag}
              </div>
            </div>

            <div className="p-6 md:p-8 space-y-5 text-left">
              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>Published: {viewingPost.date}</span>
                <span>·</span>
                <span>{viewingPost.readTime}</span>
              </div>

              <h2 className="font-display font-black text-xl sm:text-2xl text-[#0A1628] leading-tight">
                {viewingPost.title}
              </h2>

              <div className="border-t border-slate-100 pt-4 text-xs sm:text-sm font-sans text-slate-600 leading-relaxed space-y-4">
                <p className="font-bold text-slate-850">
                  {viewingPost.summary}
                </p>
                <p>
                  {viewingPost.content}
                </p>
                <div className="bg-slate-50 p-4 border rounded-xl space-y-2">
                  <h5 className="font-display font-bold text-xs text-[#0A1628] uppercase">CORE PRINTER RECONCILIATIONS:</h5>
                  <p className="text-xs">Always verify you are exporting sheets in native CMYK color models at 600 DPI density before loading sheets on your dual-sided thermal machine. This preserves the high fidelity barcode resolution perfectly on final laminate finishes.</p>
                </div>
              </div>

              {/* Author foot */}
              <div className="pt-6 border-t border-slate-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0a1628] text-white flex items-center justify-center font-display font-bold text-sm">
                  {viewingPost.author.avatar}
                </div>
                <div className="font-sans text-left text-xs">
                  <span className="block font-bold text-slate-800">{viewingPost.author.name}</span>
                  <span className="text-slate-400 text-[10px]">{viewingPost.author.role}</span>
                </div>
              </div>

              <div className="pt-3 text-center">
                <button
                  onClick={() => setViewingPost(null)}
                  className="px-6 py-2 bg-slate-100 text-[#0a1628] font-sans font-bold text-xs rounded-lg hover:bg-slate-250"
                >
                  Close Document
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
