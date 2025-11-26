import { motion } from "framer-motion";
import { ArrowLeft, Download, Github, Star, Bell, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";
import { DevelopmentProgressBar } from "./DevelopmentProgressBar";
import { APPS } from "./AppShowcase";
import { Card } from "./ui/card";

export interface AppData {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  rating: number;
  downloads: string;
  image: string;
  screenshots: string[];
  status: "live" | "in-dev";
  tags: string[];
  downloadUrl?: string;
  repoUrl?: string;
  developmentProgress?: number;
  developmentPhase?: string;
}

interface AppDetailViewProps {
  app: AppData;
  onBack: () => void;
  onAppSelect?: (app: AppData) => void;
}

export function AppDetailView({ app, onBack, onAppSelect }: AppDetailViewProps) {
  const handleNotify = () => {
    toast.success("You're on the list! We'll notify you when it launches.");
  };

  const handleDownload = () => {
    if (app.downloadUrl) {
      window.open(app.downloadUrl, '_blank');
    } else {
      toast.info("Download link coming soon!");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-black"
    >
      <div className="relative h-[50vh] w-full bg-gradient-to-br from-neutral-900/50 to-black overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src={app.image}
            alt={app.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />

        <div className="container mx-auto px-4 h-full relative">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mt-8 hover:bg-neutral-900 text-white"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Apps
          </Button>

          <div className="absolute bottom-8 left-4 right-4 md:left-auto md:right-auto md:w-full max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="h-32 w-32 rounded-3xl overflow-hidden bg-neutral-900 shadow-2xl border-4 border-black"
              >
                <ImageWithFallback
                  src={app.image}
                  alt={app.title}
                  className="object-cover w-full h-full"
                />
              </motion.div>

              <div className="flex-1">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h1 className="text-4xl md:text-5xl font-bold mb-2 text-white">{app.title}</h1>
                  <p className="text-neutral-400 text-lg mb-4">{app.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {app.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm bg-neutral-800 text-neutral-300 border-neutral-700 rounded-full">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              </div>

              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex gap-3"
              >
                {app.status === "live" ? (
                  <>
                    <Button size="lg" className="rounded-full h-12 px-8 bg-green-600 hover:bg-green-700 text-white" onClick={handleDownload}>
                      <Download className="mr-2 h-5 w-5" />
                      Download
                    </Button>
                    {app.repoUrl && (
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full h-12 px-8 border-neutral-700 text-white hover:bg-neutral-900"
                        onClick={() => window.open(app.repoUrl, '_blank')}
                      >
                        <Github className="mr-2 h-5 w-5" />
                        View Repo
                      </Button>
                    )}
                  </>
                ) : (
                  <Button size="lg" className="rounded-full h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white" onClick={handleNotify}>
                    <Bell className="mr-2 h-5 w-5" />
                    Notify Me
                  </Button>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2 space-y-8"
          >
            {app.status === "in-dev" && app.developmentProgress !== undefined && (
              <DevelopmentProgressBar
                progress={app.developmentProgress}
                currentPhase={app.developmentPhase || "Development"}
              />
            )}

            <div className="bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800">
              <h3 className="text-xl font-semibold mb-4 text-white">About this app</h3>
              <p className="text-neutral-400 leading-relaxed">
                {app.longDescription}
              </p>
            </div>

            {app.screenshots.length > 0 && (
              <div className="bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800">
                <h3 className="text-xl font-semibold mb-4 text-white">Screenshots</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {app.screenshots.map((shot, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="aspect-video rounded-lg overflow-hidden bg-neutral-900 border border-neutral-800 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <ImageWithFallback
                        src={shot}
                        alt={`Screenshot ${i + 1}`}
                        className="object-cover w-full h-full"
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-6"
          >
            <div className="bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800">
              <h3 className="text-xl font-semibold mb-6 text-white">Statistics</h3>
              <div className="space-y-4">
                {app.status === "live" && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Rating</span>
                      <div className="flex items-center gap-1 font-bold text-white">
                        {app.rating}
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-400">Downloads</span>
                      <span className="font-bold text-white">{app.downloads}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Category</span>
                  <Badge variant="outline" className="border-neutral-700 text-neutral-300">{app.category}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400">Status</span>
                  <Badge variant={app.status === "live" ? "default" : "secondary"} className={app.status === "live" ? "bg-green-600 text-white" : "bg-blue-600 text-white"}>
                    {app.status === "live" ? "Live" : "In Development"}
                  </Badge>
                </div>
              </div>
            </div>

            {app.repoUrl && (
              <div className="bg-neutral-900/50 rounded-2xl p-6 border border-neutral-800">
                <h3 className="text-xl font-semibold mb-4 text-white">Links</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-neutral-700 text-white hover:bg-neutral-900"
                    onClick={() => window.open(app.repoUrl, '_blank')}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub Repository
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Button>
                  {app.downloadUrl && app.status === "live" && (
                    <Button
                      variant="outline"
                      className="w-full justify-start border-neutral-700 text-white hover:bg-neutral-900"
                      onClick={handleDownload}
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download App
                      <ExternalLink className="ml-auto h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Related Apps Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 pt-12 border-t border-neutral-800"
        >
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6 text-white">Other Apps</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {APPS.filter(a => a.id !== app.id).slice(0, 3).map((relatedApp) => (
              <Card
                key={relatedApp.id}
                onClick={() => onAppSelect?.(relatedApp)}
                className="group cursor-pointer bg-neutral-900/50 backdrop-blur rounded-2xl border border-neutral-800 hover:shadow-xl hover:border-neutral-700 transition-all duration-300 overflow-hidden hover:-translate-y-2"
              >
                <div className="flex p-5 gap-4 items-start">
                  <div className="relative h-16 w-16 rounded-xl overflow-hidden bg-neutral-800 shrink-0">
                    <ImageWithFallback
                      src={relatedApp.image}
                      alt={relatedApp.title}
                      className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-base mb-1 text-white group-hover:text-neutral-300 transition-colors line-clamp-1">
                      {relatedApp.title}
                    </h3>
                    <p className="text-xs text-neutral-400 line-clamp-2 mb-2">
                      {relatedApp.description}
                    </p>
                    {relatedApp.status === "live" && (
                      <div className="flex items-center gap-2 text-xs">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-white font-semibold">{relatedApp.rating}</span>
                      </div>
                    )}
                    {relatedApp.status === "in-dev" && (
                      <Badge variant="secondary" className="text-xs bg-blue-600/20 text-blue-400 border-blue-600/30 rounded-full">
                        In Dev
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
