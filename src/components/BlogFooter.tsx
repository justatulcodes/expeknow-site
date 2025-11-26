import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Clock } from "lucide-react";
import { BlogData, BLOGS } from "./BlogSection";

interface BlogFooterProps {
  currentBlogId: number;
  onBlogSelect: (blog: BlogData) => void;
}

export function BlogFooter({ currentBlogId, onBlogSelect }: BlogFooterProps) {
  const relatedBlogs = BLOGS.filter(blog => blog.id !== currentBlogId).slice(0, 3);

  return (
    <div className="mt-12 pt-12 border-t border-neutral-800">
      <h3 className="text-2xl font-bold tracking-tight mb-6 text-white">Continue Reading</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedBlogs.map((blog) => (
          <Card
            key={blog.id}
            onClick={() => onBlogSelect(blog)}
            className="hover:shadow-xl transition-all duration-300 cursor-pointer border border-neutral-800 bg-neutral-900/50 backdrop-blur hover:-translate-y-2 group"
          >
            {blog.image && (
              <div className="aspect-video overflow-hidden rounded-t-lg">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            )}
            <CardHeader className="space-y-3">
              <div className="flex justify-between items-center">
                <Badge variant="secondary" className="text-xs bg-neutral-800 text-neutral-300 border-neutral-700 rounded-full">
                  {blog.category}
                </Badge>
                <div className="flex items-center gap-1 text-xs text-neutral-400">
                  <Clock className="h-3 w-3" />
                  {blog.readTime}
                </div>
              </div>
              <CardTitle className="line-clamp-2 text-white group-hover:text-neutral-300 transition-colors text-base">
                {blog.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 text-sm text-neutral-400">
                {blog.excerpt}
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}
