import { Button } from "./ui/button";
import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-black">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <Badge variant="secondary" className="inline-flex w-fit items-center rounded-full px-4 py-2 text-xs font-semibold bg-neutral-800 text-neutral-300 border-neutral-700">
              App Developer Portfolio
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-white">
              Turning <span className="text-neutral-400">Crazy Ideas</span> Into Reality.
            </h1>
            <p className="text-lg text-neutral-400 leading-relaxed">
              Hi, I'm the developer behind Expeknow. I build modern, sleek, and functional web and mobile applications.
              From learning projects to enterprise solutions.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => onNavigate("apps")} className="bg-white text-black hover:bg-neutral-200 rounded-full">
                View My Apps <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => onNavigate("request")} className="border-neutral-700 text-white hover:bg-neutral-900 rounded-full">
                Request an App
              </Button>
            </div>

            <div className="flex gap-4 pt-4 text-sm text-neutral-400 items-center">
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                <FileText className="h-4 w-4" /> Resume
              </a>
              <div className="h-4 w-px bg-neutral-800" />
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                <Github className="h-4 w-4" /> Github
              </a>
              <div className="h-4 w-px bg-neutral-800" />
              <a href="#" className="flex items-center gap-2 hover:text-white transition-colors">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-900"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1595331292515-a6449d5215e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcG9ydHJhaXQlMjBtYW4lMjBkZXZlbG9wZXIlMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDF8fHx8MTc2NDAwMTgxMHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="Developer Portrait"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent md:hidden" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
