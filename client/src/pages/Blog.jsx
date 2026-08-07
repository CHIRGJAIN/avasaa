import React from 'react';
import { Link } from 'react-router-dom';

function Blog() {
  const posts = [
    {
      id: 'winter-trekking-jalori',
      title: 'A Guide to Winter Trekking at Jalori Pass',
      excerpt: 'At 10,800 feet, Jalori Pass transforms into a pristine white wonderland. Here is how to prepare for the ultimate winter adventure.',
      date: 'December 12, 2024',
      category: 'Adventure',
      image: 'https://images.unsplash.com/photo-1548574505-5e239809ee19?q=80&w=800&auto=format&fit=crop',
      readTime: '6 min read'
    },
    {
      id: 'silence-mindfulness-nature',
      title: 'The Art of Silence: Reconnecting in the Tirthan Valley',
      excerpt: 'In the modern world, silence is the ultimate luxury. Discover how a stay nestled in pine forests can restore mental clarity and peace.',
      date: 'November 28, 2024',
      category: 'Wellness',
      image: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?q=80&w=800&auto=format&fit=crop',
      readTime: '4 min read'
    },
    {
      id: 'traditional-kathguni-architecture',
      title: 'Preserving Heritage: The Kathguni Architecture of Himachal',
      excerpt: 'An inside look at the centuries-old interlocking wood-and-stone building style that makes our Himalayan sanctuaries both earthquake-resilient and beautiful.',
      date: 'November 15, 2024',
      category: 'Culture',
      image: 'https://images.unsplash.com/photo-1605647540924-852290f6b0d5?q=80&w=800&auto=format&fit=crop',
      readTime: '8 min read'
    },
    {
      id: 'himachali-culinary-secrets',
      title: 'From Siddu to Madra: Himachali Dishes You Must Try',
      excerpt: 'Explore the hearty, rustic, and spice-infused traditional cuisine prepared over wood fires in Jibhi’s mountain kitchens.',
      date: 'October 30, 2024',
      category: 'Gastronomy',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800&auto=format&fit=crop',
      readTime: '5 min read'
    }
  ];

  return (
    <div className="pt-32 pb-24 bg-[#fbf9f5]">
      {/* Editorial Header */}
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center space-y-4">
        <span className="font-sans text-xs font-semibold uppercase tracking-[0.3em] text-secondary block">
          Mountain Chronicles
        </span>
        <h1 className="font-serif text-4xl md:text-6xl text-primary font-medium tracking-tight">
          The Avaasa Journal
        </h1>
        <p className="font-sans text-base text-on-surface-variant font-light max-w-xl mx-auto leading-relaxed">
          Stories of high-altitude living, traditional Himachali heritage, wild treks, and quiet reflections from Jibhi valley.
        </p>
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[#c2a25a]/40 to-transparent w-40 mx-auto pt-4"></div>
      </div>

      {/* Blog Posts Grid */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {posts.map((post) => (
          <article 
            key={post.id}
            className="group flex flex-col bg-white rounded-[32px] overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-black/5"
          >
            <div className="aspect-[16/10] overflow-hidden relative">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-full object-cover transition-transform duration-[8s] ease-out group-hover:scale-103"
              />
              <span className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm text-primary px-4 py-1.5 rounded-full font-sans text-[10px] font-bold uppercase tracking-widest border border-black/5 shadow-sm">
                {post.category}
              </span>
            </div>
            
            <div className="p-8 md:p-10 flex flex-col flex-grow space-y-4">
              <div className="flex items-center gap-4 text-xs font-sans text-gray-400">
                <span>{post.date}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                <span>{post.readTime}</span>
              </div>
              
              <h2 className="font-serif text-2xl md:text-3xl text-primary font-medium leading-tight group-hover:text-secondary transition-colors">
                {post.title}
              </h2>
              
              <p className="font-sans text-sm text-on-surface-variant font-light leading-relaxed flex-grow">
                {post.excerpt}
              </p>
              
              <div className="pt-6 border-t border-outline-variant/30 flex items-center justify-between">
                <span className="inline-flex items-center font-sans text-xs font-bold uppercase tracking-widest text-primary group-hover:text-secondary transition-colors">
                  Read Article
                  <span className="material-symbols-outlined ml-1.5 text-sm transition-transform group-hover:translate-x-1">
                    arrow_right_alt
                  </span>
                </span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Blog;
