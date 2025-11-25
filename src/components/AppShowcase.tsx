import { useState } from "react";
import { Star, Download, Bell, X, Smartphone } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "./ui/dialog";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

type Category = "All" | "Learning" | "Career" | "Client" | "In-Dev";

interface AppData {
  id: string;
  title: string;
  category: Category;
  description: string;
  longDescription: string;
  rating: number;
  downloads: string;
  image: string;
  screenshots: string[];
  status: "live" | "in-dev";
  tags: string[];
}

const APPS: AppData[] = [
  {
    id: "1",
    title: "TaskMaster Pro",
    category: "Career",
    description: "The ultimate productivity tool for teams.",
    longDescription: "TaskMaster Pro helps you organize your life and work. With intuitive lists, smart reminders, and collaborative features, you'll never miss a deadline again. Built with React Native and Node.js.",
    rating: 4.8,
    downloads: "10k+",
    image: "https://images.unsplash.com/photo-1762340276397-db7ca4ee6ab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkYXJrJTIwbW9kZXxlbnwxfHx8fDE3NjM5MTc0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    screenshots: [
      "https://images.unsplash.com/photo-1762340276397-db7ca4ee6ab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkYXJrJTIwbW9kZXxlbnwxfHx8fDE3NjM5MTc0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1689560042600-810f9b610cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlayUyMGFic3RyYWN0JTIwdGVjaG5vbG9neSUyMGJhY2tncm91bmQlMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDF8fHx8MTc2NDAwMTgxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    status: "live",
    tags: ["Productivity", "Tools"]
  },
  {
    id: "2",
    title: "FitTrack",
    category: "Learning",
    description: "Simple fitness tracking for beginners.",
    longDescription: "My first ever React app! It allows users to track their daily steps and calories. A bit rough around the edges but demonstrates my learning journey.",
    rating: 4.2,
    downloads: "500+",
    image: "https://images.unsplash.com/photo-1689560042600-810f9b610cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlayUyMGFic3RyYWN0JTIwdGVjaG5vbG9neSUyMGJhY2tncm91bmQlMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDF8fHx8MTc2NDAwMTgxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    screenshots: [],
    status: "live",
    tags: ["Health", "Fitness"]
  },
  {
    id: "3",
    title: "ClientConnect",
    category: "Client",
    description: "CRM solution for small businesses.",
    longDescription: "Built for a local logistics company to manage their client relationships. Features include email automation, contact management, and sales pipelines.",
    rating: 4.9,
    downloads: "Private",
    image: "https://images.unsplash.com/photo-1595331292515-a6449d5215e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtbWluaW1hbGlzdCUyMHBvcnRyYWl0JTIwbWFuJTIwZGV2ZWxvcGVyJTIwYmxhY2slMjBhbmQlMjB3aGl0ZXxlbnwxfHx8fDE3NjQwMDE4MTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    screenshots: [],
    status: "live",
    tags: ["Business", "CRM"]
  },
  {
    id: "4",
    title: "DreamScape VR",
    category: "In-Dev",
    description: "Immersive VR experience for web.",
    longDescription: "An ambitious project to bring VR to the browser using WebXR. Currently in alpha stage. Join the waitlist to be the first to try it out.",
    rating: 0,
    downloads: "-",
    image: "https://images.unsplash.com/photo-1762340276397-db7ca4ee6ab6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2UlMjBkYXJrJTIwbW9kZXxlbnwxfHx8fDE3NjM5MTc0MTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    screenshots: [],
    status: "in-dev",
    tags: ["VR", "WebXR", "Beta"]
  }
];

export function AppShowcase() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);

  const filteredApps = selectedCategory === "All" 
    ? APPS 
    : APPS.filter(app => app.category === selectedCategory || (selectedCategory === "In-Dev" && app.status === "in-dev"));

  const categories: Category[] = ["All", "Career", "Client", "Learning", "In-Dev"];

  const handleNotify = (e: React.MouseEvent) => {
    e.stopPropagation();
    toast.success("You're on the list! We'll notify you when it launches.");
  };

  return (
    <section className="py-20 bg-muted/20" id="apps">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Featured Apps</h2>
            <p className="text-muted-foreground">Explore my portfolio of applications.</p>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto no-scrollbar">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full whitespace-nowrap"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app) => (
              <motion.div
                key={app.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={() => setSelectedApp(app)}
                className="group cursor-pointer bg-card rounded-xl border hover:shadow-lg transition-all duration-300 overflow-hidden"
              >
                <div className="flex p-4 gap-4 items-start">
                  <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-muted shrink-0">
                    <ImageWithFallback
                      src={app.image}
                      alt={app.title}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg truncate">{app.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1">{app.description}</p>
                    
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        {app.status === 'live' ? (
                          <>
                             <Star className="h-3 w-3 fill-current" /> {app.rating}
                          </>
                        ) : (
                           <Badge variant="secondary" className="text-[10px] h-5">Beta</Badge>
                        )}
                      </span>
                      <span>•</span>
                      <span>{app.category}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Dialog open={!!selectedApp} onOpenChange={(open) => !open && setSelectedApp(null)}>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-hidden flex flex-col p-0 gap-0 border-none">
            {selectedApp && (
              <>
                <ScrollArea className="flex-1">
                  <div className="relative h-64 w-full bg-muted">
                    <ImageWithFallback
                       src={selectedApp.image}
                       alt={selectedApp.title}
                       className="object-cover w-full h-full opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                    <div className="absolute bottom-4 left-6 flex items-end gap-4">
                      <div className="h-24 w-24 rounded-2xl overflow-hidden bg-card shadow-lg border-4 border-background">
                        <ImageWithFallback
                          src={selectedApp.image}
                          alt={selectedApp.title}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="mb-2 shadow-sm">
                        <h2 className="text-2xl font-bold drop-shadow-md">{selectedApp.title}</h2>
                        <p className="text-muted-foreground text-sm font-medium text-foreground/80">{selectedApp.tags.join(" • ")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 space-y-8">
                    <div className="flex items-center justify-between">
                       <div className="flex gap-8 text-center">
                          {selectedApp.status === 'live' && (
                            <>
                              <div>
                                <div className="flex items-center gap-1 font-bold justify-center">
                                  {selectedApp.rating} <Star className="h-3 w-3 fill-current" />
                                </div>
                                <div className="text-xs text-muted-foreground">Rating</div>
                              </div>
                              <div>
                                <div className="font-bold">{selectedApp.downloads}</div>
                                <div className="text-xs text-muted-foreground">Downloads</div>
                              </div>
                            </>
                          )}
                          <div>
                             <div className="font-bold">{selectedApp.category}</div>
                             <div className="text-xs text-muted-foreground">Category</div>
                          </div>
                       </div>
                    </div>

                    <div className="space-y-2">
                      <h3 className="font-semibold">About this app</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {selectedApp.longDescription}
                      </p>
                    </div>

                    {selectedApp.screenshots.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="font-semibold">Screenshots</h3>
                        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                          {selectedApp.screenshots.map((shot, i) => (
                            <div key={i} className="h-48 w-28 shrink-0 rounded-lg overflow-hidden bg-muted border">
                              <ImageWithFallback
                                src={shot}
                                alt={`Screenshot ${i}`}
                                className="object-cover w-full h-full"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <DialogFooter className="p-6 border-t bg-background z-10">
                  {selectedApp.status === "live" ? (
                    <Button className="w-full h-12 text-base rounded-full" size="lg">
                      <Download className="mr-2 h-4 w-4" /> Install
                    </Button>
                  ) : (
                    <Button className="w-full h-12 text-base rounded-full" size="lg" onClick={handleNotify}>
                      <Bell className="mr-2 h-4 w-4" /> Notify Me
                    </Button>
                  )}
                </DialogFooter>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
