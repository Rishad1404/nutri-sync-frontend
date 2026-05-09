"use client";

import { motion } from "framer-motion";
import { Search, Tag, Calendar, User, ArrowUpRight } from "lucide-react";
import Image from "next/image";

export default function Blog() {
  const posts = [
    {
      title: "5 AI-Driven Tips for Sustainable Weight Loss",
      excerpt: "Discover how machine learning is revolutionizing personal nutrition and weight management.",
      category: "Science",
      date: "May 8, 2026",
      author: "Dr. Sarah Chen",
      color: "bg-[#065E32]",
    },
    {
      title: "The Truth About Intermittent Fasting in 2026",
      excerpt: "New studies suggest that timing is everything. Here's what the data says about fasting windows.",
      category: "Lifestyle",
      date: "May 5, 2026",
      author: "Marcus Thorne",
      color: "bg-[#44B74C]",
    },
    {
      title: "Top 10 Superfoods Your AI Suggests This Spring",
      excerpt: "Seasonal eating made simple. Explore the nutrients your body is craving right now.",
      category: "Recipes",
      date: "May 1, 2026",
      author: "Chef Elena",
      color: "bg-[#065E32]",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="max-w-2xl"
        >
          <h1 className="text-5xl md:text-6xl font-black text-[#065E32] mb-6 font-heading">
            NutriSync <span className="text-[#44B74C]">Journal</span>
          </h1>
          <p className="text-lg text-muted-foreground">
            Exploring the intersection of deep health, natural living, and artificial intelligence.
          </p>
        </motion.div>
        
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search articles..." 
            className="w-full bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-800 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-[#065E32]/20 transition-all shadow-sm"
          />
        </div>
      </div>

      {/* Featured Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {posts.map((post, idx) => (
          <motion.article
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="group flex flex-col bg-white dark:bg-zinc-950 rounded-[2.5rem] overflow-hidden border border-gray-50 dark:border-zinc-900 shadow-sm hover:shadow-xl transition-all"
          >
            {/* Post Image Placeholder */}
            <div className={`aspect-video w-full ${post.color} relative overflow-hidden`}>
               <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/leaf.png')]" />
               <div className="absolute top-6 left-6 px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest">
                  {post.category}
               </div>
            </div>

            <div className="p-8 flex-1 flex flex-col">
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-6">
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {post.date}
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  {post.author}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-foreground group-hover:text-[#065E32] transition-colors mb-4 font-heading leading-tight">
                {post.title}
              </h3>
              
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 line-clamp-2">
                {post.excerpt}
              </p>

              <div className="mt-auto">
                <button className="flex items-center gap-2 font-bold text-sm text-[#065E32] dark:text-[#44B74C] group-hover:gap-3 transition-all">
                  Read Article
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>

      {/* Pagination Placeholder */}
      <div className="mt-20 flex justify-center">
        <button className="px-8 py-4 rounded-2xl bg-[#065E32] text-white font-bold hover:scale-105 transition-all shadow-lg shadow-[#065E32]/20">
          Load More Articles
        </button>
      </div>
    </div>
  );
}
