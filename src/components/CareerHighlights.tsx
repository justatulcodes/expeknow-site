import { useState } from "react";
import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Users, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AppData } from "./AppDetailView";
import { useIsMobile } from "../hooks/useIsMobile";

interface CareerHighlightsProps {
  apps: AppData[];
  onAppSelect?: (app: AppData) => void;
}

type Category = "All" | "Career" | "Learning" | "Client" | "In-Dev";

export function CareerHighlights({ apps, onAppSelect }: CareerHighlightsProps) {
  const isMobile = useIsMobile();
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");

  const categories: Category[] = ["All", "Career", "Learning", "Client", "In-Dev"];

  const filteredApps = selectedCategory === "All"
    ? apps
    : selectedCategory === "In-Dev"
    ? apps.filter(app => app.status === "in-dev")
    : apps.filter(app => app.category === selectedCategory);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Career":
        return <Briefcase className="h-4 w-4" />;
      case "Learning":
        return <GraduationCap className="h-4 w-4" />;
      case "Client":
        return <Users className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const motionProps = isMobile ? {} : {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true }
  };

  return (
    <section className="py-12 md:py-20 bg-neutral-950 relative overflow-hidden" id="apps">
      <div className="container mx-auto px-4 relative">
        <motion.div
          {...motionProps}
          className="flex flex-col md:flex-row justify-between items-center mb-8 md:mb-12 gap-4 md:gap-6"
        >
          <div className="text-center md:text-left w-full md:w-auto">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">
              All Apps
            </h2>
            <p className="text-neutral-400 text-sm md:text-lg">
              Explore my portfolio of applications
            </p>
          </div>

          <div className="flex gap-2 flex-wrap justify-center w-full md:w-auto">
            {categories.map((cat) => (
              <Button
                key={cat}
                variant={selectedCategory === cat ? "default" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full whitespace-nowrap transition-all hover:scale-105 text-xs md:text-sm px-3 md:px-4 py-1.5 md:py-2"
              >
                {cat}
              </Button>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredApps.map((app, index) => {
            const cardMotionProps = isMobile ? {} : {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.3, delay: index * 0.1 }
            };

            return (
              <motion.div
                key={app.id}
                {...cardMotionProps}
                onClick={() => onAppSelect?.(app)}
              >
                <Card className="group cursor-pointer bg-neutral-900/50 backdrop-blur rounded-2xl border border-neutral-800 hover:shadow-xl hover:border-neutral-700 transition-all duration-300 overflow-hidden hover:-translate-y-2">
                  <div className="flex p-5 gap-4 items-start">
                    <div className="relative h-20 w-20 rounded-2xl overflow-hidden bg-neutral-800 shrink-0 ring-2 ring-neutral-700">
                      <ImageWithFallback
                        src={app.image}
                        alt={app.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-neutral-800 text-neutral-300 border-neutral-700 rounded-full flex items-center gap-1"
                        >
                          {getCategoryIcon(app.category)}
                          {app.category}
                        </Badge>
                        {app.status === "in-dev" && (
                          <Badge variant="secondary" className="text-xs bg-blue-600/20 text-blue-400 border-blue-600/30 rounded-full">
                            In Dev
                          </Badge>
                        )}
                        {app.status === "live" && (
                          <Badge variant="secondary" className="text-xs bg-green-600/20 text-green-400 border-green-600/30 rounded-full">
                            Live
                          </Badge>
                        )}
                      </div>

                      <h3 className="font-bold text-lg mb-1 text-white group-hover:text-neutral-300 transition-colors line-clamp-1">
                        {app.title}
                      </h3>
                      <p className="text-sm text-neutral-400 line-clamp-2 mb-2">
                        {app.description}
                      </p>

                      {app.status === "live" && (
                        <div className="flex items-center gap-4 text-xs text-neutral-400">
                          <div className="flex items-center gap-1">
                            <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-white font-semibold">{app.rating}</span>
                          </div>
                          <span>•</span>
                          <span>{app.downloads}</span>
                        </div>
                      )}
                      {app.status === "in-dev" && app.developmentProgress !== undefined && (
                        <div className="text-xs text-neutral-400">
                          {app.developmentProgress}% Complete
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
