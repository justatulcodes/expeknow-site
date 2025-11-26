import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { BlogData, BLOGS } from "./BlogSection";

interface AllBlogsViewProps {
  onBack: () => void;
  onBlogSelect: (blog: BlogData) => void;
}

export function AllBlogsView({ onBack, onBlogSelect }: AllBlogsViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black"
    >
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-8 text-white hover:bg-neutral-900"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-4">
            All Blog Posts
          </h1>
          <p className="text-neutral-400 text-lg">
            Explore all my thoughts on development, design, and technology.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOGS.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              onClick={() => onBlogSelect(blog)}
            >
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border border-neutral-800 bg-neutral-900/50 backdrop-blur h-full hover:-translate-y-2 group">
                {blog.image && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <CardHeader className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="font-semibold bg-neutral-800 text-neutral-300 border-neutral-700 rounded-full">
                      {blog.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-neutral-400">
                      <Clock className="h-3 w-3" />
                      {blog.readTime}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 text-white group-hover:text-neutral-300 transition-colors">
                    {blog.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 leading-relaxed text-neutral-400">
                    {blog.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-xs text-neutral-400">
                    <Calendar className="h-3 w-3" />
                    <span>{blog.date}</span>
                    <span>•</span>
                    <span>{blog.author}</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
