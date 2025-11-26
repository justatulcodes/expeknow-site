import { motion } from "framer-motion";
import { Download, Star } from "lucide-react";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { AppData } from "./AppDetailView";
import { useIsMobile } from "../hooks/useIsMobile";

interface ForYouSectionProps {
  apps: AppData[];
  onAppSelect?: (app: AppData) => void;
}

export function ForYouSection({ apps, onAppSelect }: ForYouSectionProps) {
  const isMobile = useIsMobile();

  const liveApps = apps.filter(app => app.status === "live");

  const motionProps = isMobile ? {} : {
    initial: { y: 20, opacity: 0 },
    whileInView: { y: 0, opacity: 1 },
    viewport: { once: true }
  };

  return (
    <section className="py-12 md:py-20 bg-black relative overflow-hidden" id="for-you">
      <div className="container mx-auto px-4 relative">
        <motion.div
          {...motionProps}
          className="text-center mb-8 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-2 text-white">
            For You
          </h2>
          <p className="text-neutral-400 text-sm md:text-lg">
            Apps ready for download
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {liveApps.map((app, index) => {
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
                      <h3 className="font-bold text-lg mb-1 text-white group-hover:text-neutral-300 transition-colors line-clamp-1">
                        {app.title}
                      </h3>
                      <p className="text-sm text-neutral-400 line-clamp-2 mb-3">
                        {app.description}
                      </p>

                      <div className="flex items-center gap-4 text-xs text-neutral-400">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-white font-semibold">{app.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{app.downloads}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-white rounded-full shrink-0"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (app.downloadUrl) {
                          window.open(app.downloadUrl, '_blank');
                        }
                      }}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
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
