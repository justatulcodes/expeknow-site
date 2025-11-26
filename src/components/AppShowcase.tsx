import { useState } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AppData } from "./AppDetailView";

type Category = "All" | "Learning" | "Career" | "Client" | "In-Dev";

const APPS: AppData[] = [
  {
    id: "1",
    title: "TaskMaster Pro",
    category: "Career",
    description: "The ultimate productivity tool for teams.",
    longDescription: "TaskMaster Pro helps you organize your life and work. With intuitive lists, smart reminders, and collaborative features, you'll never miss a deadline again. Built with React Native and Node.js, it features real-time collaboration, offline support, and advanced analytics to help teams stay productive.",
    rating: 4.8,
    downloads: "10k+",
    image: "https://images.unsplash.com/photo-1762340276397-db7ca4ee6ab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkYXJrJTIwbW9kZXxlbnwxfHx8fDE3NjM5MTc0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    screenshots: [
      "https://images.unsplash.com/photo-1762340276397-db7ca4ee6ab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkYXJrJTIwbW9kZXxlbnwxfHx8fDE3NjM5MTc0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1689560042600-810f9b610cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlayUyMGFic3RyYWN0JTIwdGVjaG5vbG9neSUyMGJhY2tncm91bmQlMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDF8fHx8MTc2NDAwMTgxMHww&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1595331292515-a6449d5215e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtbWluaW1hbGlzdCUyMHBvcnRyYWl0JTIwbWFuJTIwZGV2ZWxvcGVyJTIwYmxhY2slMjBhbmQlMjB3aGl0ZXxlbnwxfHx8fDE3NjQwMDE4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    ],
    status: "live",
    tags: ["Productivity", "Tools", "Teams"],
    repoUrl: "https://github.com",
    downloadUrl: "https://github.com"
  },
  {
    id: "2",
    title: "FitTrack",
    category: "Learning",
    description: "Simple fitness tracking for beginners.",
    longDescription: "My first ever React app! It allows users to track their daily steps and calories. A bit rough around the edges but demonstrates my learning journey. Features include daily goal setting, progress charts, and motivational reminders.",
    rating: 4.2,
    downloads: "500+",
    image: "https://images.unsplash.com/photo-1689560042600-810f9b610cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlayUyMGFic3RyYWN0JTIwdGVjaG5vbG9neSUyMGJhY2tncm91bmQlMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDF8fHx8MTc2NDAwMTgxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    screenshots: [],
    status: "live",
    tags: ["Health", "Fitness", "Learning Project"],
    repoUrl: "https://github.com"
  },
  {
    id: "3",
    title: "ClientConnect",
    category: "Client",
    description: "CRM solution for small businesses.",
    longDescription: "Built for a local logistics company to manage their client relationships. Features include email automation, contact management, and sales pipelines. Integrated with popular email providers and calendar apps for seamless workflow.",
    rating: 4.9,
    downloads: "Private",
    image: "https://images.unsplash.com/photo-1595331292515-a6449d5215e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtbWluaW1hbGlzdCUyMHBvcnRyYWl0JTIwbWFuJTIwZGV2ZWxvcGVyJTIwYmxhY2slMjBhbmQlMjB3aGl0ZXxlbnwxfHx8fDE3NjQwMDE4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    screenshots: [],
    status: "live",
    tags: ["Business", "CRM", "Enterprise"]
  },
  {
    id: "4",
    title: "DreamScape VR",
    category: "In-Dev",
    description: "Immersive VR experience for web.",
    longDescription: "An ambitious project to bring VR to the browser using WebXR. Currently in alpha stage. Join the waitlist to be the first to try it out. Features will include 3D environment exploration, multiplayer support, and cross-platform compatibility.",
    rating: 0,
    downloads: "-",
    image: "https://images.unsplash.com/photo-1762340276397-db7ca4ee6ab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkYXJrJTIwbW9kZXxlbnwxfHx8fDE3NjM5MTc0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    screenshots: [],
    status: "in-dev",
    tags: ["VR", "WebXR", "Beta"],
    developmentProgress: 65,
    developmentPhase: "Alpha Testing",
    repoUrl: "https://github.com"
  },
  {
    id: "5",
    title: "CodeSnippet Manager",
    category: "In-Dev",
    description: "Organize and share code snippets easily.",
    longDescription: "A developer tool for managing code snippets across projects. Still in early development. Features syntax highlighting, tagging system, and cloud sync.",
    rating: 0,
    downloads: "-",
    image: "https://images.unsplash.com/photo-1689560042600-810f9b610cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlayUyMGFic3RyYWN0JTIwdGVjaG5vbG9neSUyMGJhY2tncm91bmQlMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDF8fHx8MTc2NDAwMTgxMHww&ixlib=rb-4.1.0&q=80&w=1080",
    screenshots: [],
    status: "in-dev",
    tags: ["Developer Tools", "Productivity", "Beta"],
    developmentProgress: 35,
    developmentPhase: "Design & Planning"
  }
];

interface AppShowcaseProps {
  onAppSelect?: (app: AppData) => void;
}

export function AppShowcase({ onAppSelect }: AppShowcaseProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const filteredApps = selectedCategory === "All"
    ? APPS
    : APPS.filter(app => app.category === selectedCategory || (selectedCategory === "In-Dev" && app.status === "in-dev"));

  const categories: Category[] = ["All", "Career", "Client", "Learning", "In-Dev"];

  return (
    <section className="py-20 bg-gradient-to-b from-background via-muted/10 to-background relative overflow-hidden" id="apps">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-muted/20 via-transparent to-transparent" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6"
        >
          <div>
            <h2 className="text-4xl font-bold tracking-tight mb-2">Featured Apps</h2>
            <p className="text-muted-foreground text-lg">Explore my portfolio of applications.</p>
          </div>

          <div className="flex gap-2 flex-wrap justify-center">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full whitespace-nowrap transition-all hover:scale-105"
              >
                {cat}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app, index) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => onAppSelect?.(app)}
                className="group cursor-pointer bg-card/50 backdrop-blur rounded-2xl border hover:shadow-xl hover:border-accent transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                <div className="flex p-5 gap-4 items-start">
                  <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-muted/50 shrink-0 ring-2 ring-border">
                    <ImageWithFallback
                      src={app.image}
                      alt={app.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate group-hover:text-primary transition-colors">{app.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{app.description}</p>

                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {app.status === 'live' ? (
                          <>
                            <Star className="h-3 w-3 fill-current text-yellow-500" />
                            <span className="font-medium">{app.rating}</span>
                          </>
                        ) : (
                          <Badge variant="secondary" className="text-[10px] h-5 font-semibold">
                            {app.developmentProgress}% Complete
                          </Badge>
                        )}
                      </span>
                      <span>•</span>
                      <span className="font-medium">{app.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export { APPS };
