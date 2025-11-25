import { Button } from "./ui/button";
import { ArrowRight, FileText, Github, Linkedin } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "framer-motion";

interface HeroProps {
  onNavigate: (page: string) => void;
}

export function Hero({ onNavigate }: HeroProps) {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex w-fit items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground hover:bg-primary/80">
              App Developer Portfolio
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Turning <span className="text-muted-foreground">Crazy Ideas</span> Into Reality.
            </h1>
            <p className="text-lg text-muted-foreground">
              Hi, I'm the developer behind Expeknow. I build modern, sleek, and functional web and mobile applications. 
              From learning projects to enterprise solutions.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => onNavigate("apps")}>
                View My Apps <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" size="lg" onClick={() => onNavigate("request")}>
                Request an App
              </Button>
            </div>

            <div className="flex gap-4 pt-4 text-sm text-muted-foreground items-center">
              <a href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <FileText className="h-4 w-4" /> Resume
              </a>
              <div className="h-4 w-px bg-border" />
              <a href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Github className="h-4 w-4" /> Github
              </a>
              <div className="h-4 w-px bg-border" />
              <a href="#" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </a>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative aspect-square md:aspect-[4/5] rounded-2xl overflow-hidden bg-muted"
          >
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1595331292515-a6449d5215e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwcG9ydHJhaXQlMjBtYW4lMjBkZXZlbG9wZXIlMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDF8fHx8MTc2NDAwMTgxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Developer Portrait"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent md:hidden" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
