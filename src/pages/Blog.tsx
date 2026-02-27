import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { blogList } from '../data/blog';

export function Blog() {
  // Sort by date descending (newest first)
  const posts = [...blogList].sort((a, b) => {
    // Extract year from Italian date string
    const yearA = parseInt(a.date.split(' ').pop() || '0');
    const yearB = parseInt(b.date.split(' ').pop() || '0');
    return yearB - yearA;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.35 }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto pointer-events-auto"
    >
      <div className="overflow-hidden mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8 mix-blend-difference">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
          News &<br />Blog
        </h1>
        <p className="font-mono text-sm opacity-70 max-w-xs uppercase tracking-widest">
          Approfondimenti, allerte pillole e report dal mondo della riduzione del danno.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, i) => (
          <Link key={post.id} to={`/news-blog/${post.id}`}>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group h-full flex flex-col justify-between border border-white/10 bg-black/20 backdrop-blur-md p-8 hover:bg-white hover:text-black transition-all duration-500 cursor-pointer"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <span className="font-mono text-[10px] uppercase tracking-widest border border-current px-3 py-1 rounded-full">
                    {post.category}
                  </span>
                  <span className="font-mono text-[10px] opacity-50 group-hover:opacity-100">{post.date}</span>
                </div>
                <h2 className="text-2xl font-bold leading-tight mb-4 group-hover:translate-x-2 transition-transform">{post.title}</h2>
                <p className="font-light text-sm opacity-80 line-clamp-3">{post.excerpt}</p>
              </div>
              <div className="mt-8 flex items-center gap-2 font-mono text-xs uppercase tracking-widest opacity-50 group-hover:opacity-100 transition-opacity">
                Leggi articolo <ArrowRight className="w-4 h-4" />
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
