import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

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
    <section className="py-20 bg-muted/20" id="blog">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Latest Thoughts</h2>
            <p className="text-muted-foreground">Insights on development, design, and technology.</p>
          </div>
          <a href="#" className="text-primary font-medium hover:underline">View all posts →</a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOGS.map((blog) => (
            <Card key={blog.id} className="hover:shadow-md transition-shadow cursor-pointer border-muted-foreground/20">
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="secondary" className="font-normal">{blog.category}</Badge>
                  <span className="text-xs text-muted-foreground">{blog.date}</span>
                </div>
                <CardTitle className="line-clamp-2">{blog.title}</CardTitle>
                <CardDescription className="line-clamp-3 pt-2">
                  {blog.excerpt}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground font-medium">
                  {blog.readTime}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
