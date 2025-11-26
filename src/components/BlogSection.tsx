import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Lightbulb, Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { BlogData } from "./BlogDetailView";

export const BLOGS: BlogData[] = [
  {
    id: 1,
    title: "The Future of React Native",
    excerpt: "Why I think React Native is still the best choice for cross-platform mobile development in 2025.",
    content: `React Native has evolved significantly over the years, and despite the emergence of new frameworks, it remains a powerhouse for cross-platform development.

The framework's mature ecosystem, combined with its ability to deliver truly native performance, makes it an excellent choice for teams of all sizes. With features like the new architecture and improved developer experience, React Native continues to push the boundaries of what's possible in mobile development.

In this article, I'll explore why React Native is still my go-to choice for building mobile applications, from its robust community support to its flexibility in handling complex app requirements.`,
    date: "Oct 24, 2025",
    readTime: "5 min read",
    category: "Tech",
    author: "Expeknow",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Designing for Dark Mode",
    excerpt: "Best practices for implementing dark mode in web applications using Tailwind CSS.",
    content: `Dark mode has become an essential feature in modern web applications. Not only does it reduce eye strain, but it also provides a sleek, professional aesthetic that users love.

Implementing dark mode with Tailwind CSS is remarkably straightforward, but there are several best practices and considerations to keep in mind. From color contrast ratios to preserving visual hierarchy, creating an effective dark theme requires careful attention to detail.

Let's dive into the key principles of dark mode design and how to implement them effectively in your next project.`,
    date: "Oct 10, 2025",
    readTime: "4 min read",
    category: "Design",
    author: "Expeknow",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "From Idea to App Store",
    excerpt: "A step-by-step guide on how I deployed my first app to the Google Play Store.",
    content: `Publishing your first app to the Google Play Store is an exciting milestone in any developer's journey. However, the process can seem daunting with its many requirements and guidelines.

In this comprehensive guide, I'll walk you through every step of the deployment process, from preparing your app for release to navigating the Play Console. You'll learn about app signing, store listing optimization, and best practices for a successful launch.

By the end of this article, you'll have a clear roadmap for taking your app from development to the hands of users worldwide.`,
    date: "Sep 28, 2025",
    readTime: "8 min read",
    category: "Career",
    author: "Expeknow",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=1200&auto=format&fit=crop"
  }
];

interface BlogSectionProps {
  onBlogSelect?: (blog: BlogData) => void;
}

export function BlogSection({ onBlogSelect }: BlogSectionProps) {
  return (
    <section className="py-20 bg-black relative overflow-hidden" id="blog">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
        >
          <div className="text-center md:text-left relative">
            <div className="absolute -right-32 md:-right-48 top-0 w-[600px] h-[600px] opacity-[0.03] pointer-events-none">
              <Lightbulb className="w-full h-full text-white" strokeWidth={4} />
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-2 text-white relative z-10">Latest Thoughts</h2>
            <p className="text-neutral-400 text-lg relative z-10">Insights on development, design, and technology.</p>
          </div>
          <Button variant="outline" className="rounded-full gap-2 hover:gap-3 transition-all border-neutral-700 text-white hover:bg-neutral-900">
            View all posts
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOGS.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              onClick={() => onBlogSelect?.(blog)}
            >
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border border-neutral-800 bg-neutral-900/50 backdrop-blur h-full hover:-translate-y-2 group">
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
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-400 font-medium">
                      {blog.date}
                    </span>
                    <ArrowRight className="h-4 w-4 text-neutral-400 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
