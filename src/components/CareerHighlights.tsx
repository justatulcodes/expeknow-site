import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Users } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AppData } from "./AppDetailView";
import { useIsMobile } from "../hooks/useIsMobile";

interface CareerHighlightsProps {
  apps: AppData[];
  onAppSelect?: (app: AppData) => void;
}

export function CareerHighlights({ apps, onAppSelect }: CareerHighlightsProps) {
  const isMobile = useIsMobile();

  const careerApps = apps.filter(app =>
    app.category === "Career" || app.category === "Learning" || app.category === "Client"
  );

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
    <section className="py-12 md:py-20 bg-neutral-950 relative overflow-hidden" id="career">
      <div className="container mx-auto px-4 relative">
        <motion.div
          {...motionProps}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">
            Career Highlights
          </h2>
          <p className="text-neutral-400 text-sm md:text-lg">
            Professional projects, learning experiences, and client work
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careerApps.map((app, index) => {
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
                      <div className="flex items-center gap-2 mb-2">
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
                      </div>

                      <h3 className="font-bold text-lg mb-1 text-white group-hover:text-neutral-300 transition-colors line-clamp-1">
                        {app.title}
                      </h3>
                      <p className="text-sm text-neutral-400 line-clamp-2">
                        {app.description}
                      </p>
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
