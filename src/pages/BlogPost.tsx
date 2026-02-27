import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, Tag, BookOpen } from 'lucide-react';
import { blogDb } from '../data/blog';

export function BlogPost() {
  const { id } = useParams();
  const article = id ? blogDb[id] : undefined;

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
        <BookOpen size={64} className="text-blue-400 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Articolo non trovato</h1>
        <p className="text-white/60 mb-8">L'articolo richiesto non esiste nel blog.</p>
        <Link to="/news-blog" className="text-blue-400 hover:text-blue-300 flex items-center gap-2">
          <ArrowLeft size={20} /> Torna al Blog
        </Link>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full min-h-screen pt-32 pb-24 px-6 md:px-12 max-w-4xl mx-auto pointer-events-auto"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link to="/news-blog" className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest hover:opacity-50 transition-opacity w-fit mb-12">
          <ArrowLeft className="w-4 h-4" /> Torna al Blog
        </Link>
      </motion.div>

      <motion.div
        className="mb-16 mix-blend-difference"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-widest opacity-70 mb-6">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3 h-3" />
            {article.date}
          </span>
          <span>&mdash;</span>
          <span className="flex items-center gap-1.5">
            <Tag className="w-3 h-3" />
            {article.category}
          </span>
          <span>&mdash;</span>
          <span>Redazione danno.ch</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
          {article.title}
        </h1>
      </motion.div>

      <motion.div
        className="prose prose-invert prose-lg max-w-none bg-black/40 backdrop-blur-md border border-white/10 p-8 md:p-12 rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {article.paragraphs.map((para, i) => {
          // Detect if paragraph is an all-caps heading
          const isHeading = para === para.toUpperCase() && para.length < 80 && para.length > 3;

          // Detect blockquotes (starts with " or «)
          const isQuote = para.startsWith('"') || para.startsWith('«') || para.startsWith('\u201c');

          if (isHeading) {
            return (
              <h2 key={i} className="text-2xl font-bold mt-10 mb-4 text-white uppercase tracking-wide">
                {para}
              </h2>
            );
          }

          if (isQuote) {
            return (
              <blockquote key={i} className="border-l-4 border-white/50 pl-6 my-8 italic font-light text-xl text-white/90">
                {para}
              </blockquote>
            );
          }

          // First real paragraph gets lead styling
          if (i === 0) {
            return (
              <p key={i} className="lead text-xl font-light text-white/90 mb-6">
                {para}
              </p>
            );
          }

          return (
            <p key={i} className="font-light text-white/80 leading-relaxed mb-6">
              {para}
            </p>
          );
        })}
      </motion.div>

      {/* Category tag at bottom */}
      <motion.div
        className="mt-8 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <span className="font-mono text-[10px] uppercase tracking-widest border border-white/20 px-3 py-1 rounded-full text-white/60">
          {article.category}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/30">
          {article.date}
        </span>
      </motion.div>
    </motion.div>
  );
}
