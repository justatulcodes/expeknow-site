import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Lightbulb, Clock, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";

const BLOGS = [
  {
    id: 1,
    title: "The Future of React Native",
    excerpt: "Why I think React Native is still the best choice for cross-platform mobile development in 2025.",
    date: "Oct 24, 2025",
    readTime: "5 min read",
    category: "Tech"
  },
  {
    id: 2,
    title: "Designing for Dark Mode",
    excerpt: "Best practices for implementing dark mode in web applications using Tailwind CSS.",
    date: "Oct 10, 2025",
    readTime: "4 min read",
    category: "Design"
  },
  {
    id: 3,
    title: "From Idea to App Store",
    excerpt: "A step-by-step guide on how I deployed my first app to the Google Play Store.",
    date: "Sep 28, 2025",
    readTime: "8 min read",
    category: "Career"
  }
];

export function BlogSection() {
  return (
    <section className="py-20 bg-gradient-to-br from-background via-muted/5 to-background relative overflow-hidden" id="blog">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] opacity-5">
        <Lightbulb className="w-full h-full" strokeWidth={1} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
        >
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-xl">
                <Lightbulb className="w-8 h-8 text-primary" />
              </div>
            </div>
            <h2 className="text-4xl font-bold tracking-tight mb-2">Latest Thoughts</h2>
            <p className="text-muted-foreground text-lg">Insights on development, design, and technology.</p>
          </div>
          <Button variant="outline" className="rounded-full gap-2 hover:gap-3 transition-all">
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
            >
              <Card className="hover:shadow-xl transition-all duration-300 cursor-pointer border bg-card/50 backdrop-blur h-full hover:-translate-y-2 group">
                <CardHeader className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Badge variant="secondary" className="font-semibold">
                      {blog.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {blog.readTime}
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3 leading-relaxed">
                    {blog.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground font-medium">
                      {blog.date}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
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
