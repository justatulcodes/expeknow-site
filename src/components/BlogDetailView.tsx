import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { BlogFooter } from "./BlogFooter";

export interface BlogData {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  image?: string;
}

interface BlogDetailViewProps {
  blog: BlogData;
  onBack: () => void;
  onBlogSelect?: (blog: BlogData) => void;
}

export function BlogDetailView({ blog, onBack, onBlogSelect }: BlogDetailViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black"
    >
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-white hover:bg-neutral-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>

        <motion.article
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          <header className="space-y-6">
            <Badge variant="secondary" className="bg-neutral-800 text-neutral-300 border-neutral-700 rounded-full">
              {blog.category}
            </Badge>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              {blog.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {blog.date}
              </div>
              <span>•</span>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {blog.readTime}
              </div>
              <span>•</span>
              <span>{blog.author}</span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" size="sm" className="border-neutral-700 text-white hover:bg-neutral-900 rounded-full">
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
            </div>
          </header>

          {blog.image && (
            <div className="aspect-video rounded-2xl overflow-hidden bg-neutral-900">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-xl text-neutral-300 leading-relaxed">
              {blog.excerpt}
            </p>

            <div className="text-neutral-400 leading-relaxed space-y-6 mt-8">
              {blog.content.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </div>

          {onBlogSelect && (
            <BlogFooter currentBlogId={blog.id} onBlogSelect={onBlogSelect} />
          )}
        </motion.article>
      </div>
    </motion.div>
  );
}
