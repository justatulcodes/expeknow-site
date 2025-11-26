import { motion } from "framer-motion";
import { ArrowLeft, Download, Github, Star, Bell, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { toast } from "sonner";

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
}

export function AppDetailView({ app, onBack }: AppDetailViewProps) {
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
      className="min-h-screen bg-background"
    >
      <div className="relative h-[50vh] w-full bg-gradient-to-br from-muted/50 to-background overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <ImageWithFallback
            src={app.image}
            alt={app.title}
            className="object-cover w-full h-full"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        <div className="container mx-auto px-4 h-full relative">
          <Button
            variant="ghost"
            onClick={onBack}
            className="mt-8 hover:bg-accent"
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
                className="h-32 w-32 rounded-3xl overflow-hidden bg-card shadow-2xl border-4 border-background"
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
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">{app.title}</h1>
                  <p className="text-muted-foreground text-lg mb-4">{app.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {app.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
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
                    <Button size="lg" className="rounded-full h-12 px-8" onClick={handleDownload}>
                      <Download className="mr-2 h-5 w-5" />
                      Download
                    </Button>
                    {app.repoUrl && (
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full h-12 px-8"
                        onClick={() => window.open(app.repoUrl, '_blank')}
                      >
                        <Github className="mr-2 h-5 w-5" />
                        View Repo
                      </Button>
                    )}
                  </>
                ) : (
                  <Button size="lg" className="rounded-full h-12 px-8" onClick={handleNotify}>
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
              <div className="bg-card rounded-2xl p-6 border animate-slide-up">
                <h3 className="text-xl font-semibold mb-4">Development Progress</h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Current Phase: {app.developmentPhase}</span>
                    <span className="font-semibold">{app.developmentProgress}%</span>
                  </div>
                  <Progress value={app.developmentProgress} className="h-3" />
                </div>
              </div>
            )}

            <div className="bg-card rounded-2xl p-6 border">
              <h3 className="text-xl font-semibold mb-4">About this app</h3>
              <p className="text-muted-foreground leading-relaxed">
                {app.longDescription}
              </p>
            </div>

            {app.screenshots.length > 0 && (
              <div className="bg-card rounded-2xl p-6 border">
                <h3 className="text-xl font-semibold mb-4">Screenshots</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {app.screenshots.map((shot, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6 + i * 0.1 }}
                      className="aspect-video rounded-lg overflow-hidden bg-muted border cursor-pointer hover:scale-105 transition-transform"
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
            <div className="bg-card rounded-2xl p-6 border">
              <h3 className="text-xl font-semibold mb-6">Statistics</h3>
              <div className="space-y-4">
                {app.status === "live" && (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Rating</span>
                      <div className="flex items-center gap-1 font-bold">
                        {app.rating}
                        <Star className="h-4 w-4 fill-current" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Downloads</span>
                      <span className="font-bold">{app.downloads}</span>
                    </div>
                  </>
                )}
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Category</span>
                  <Badge variant="outline">{app.category}</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant={app.status === "live" ? "default" : "secondary"}>
                    {app.status === "live" ? "Live" : "In Development"}
                  </Badge>
                </div>
              </div>
            </div>

            {app.repoUrl && (
              <div className="bg-card rounded-2xl p-6 border">
                <h3 className="text-xl font-semibold mb-4">Links</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => window.open(app.repoUrl, '_blank')}
                  >
                    <Github className="mr-2 h-4 w-4" />
                    GitHub Repository
                    <ExternalLink className="ml-auto h-4 w-4" />
                  </Button>
                  {app.downloadUrl && app.status === "live" && (
                    <Button
                      variant="outline"
                      className="w-full justify-start"
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
      </div>
    </motion.div>
  );
}
