import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Mail, Download } from "lucide-react";

export function AboutView() {
  return (
    <div className="container mx-auto px-4 py-20 md:py-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            I'm a passionate full-stack developer with a knack for building intuitive, 
            high-performance applications. With over 5 years of experience in the industry, 
            I've helped startups and established companies alike bring their visions to life.
          </p>
          
          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-muted mb-12">
             <ImageWithFallback 
                src="https://images.unsplash.com/photo-1689560042600-810f9b610cd2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbGVlayUyMGFic3RyYWN0JTIwdGVjaG5vbG9neSUyMGJhY2tncm91bmQlMjBibGFjayUyMGFuZCUyMHdoaXRlfGVufDF8fHx8MTc2NDAwMTgxMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Workspace"
                className="object-cover w-full h-full"
             />
          </div>

          <h2 className="text-2xl font-bold mb-4">My Journey</h2>
          <p className="mb-6">
            My journey started when I wrote my first "Hello World" program in Python. 
            Since then, I've dived deep into the JavaScript ecosystem, mastering React, Node.js, and TypeScript.
            I believe in writing clean, maintainable code and designing interfaces that delight users.
          </p>

          <h2 className="text-2xl font-bold mb-4">Skills & Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {["React & React Native", "TypeScript", "Node.js & Express", "Supabase & PostgreSQL", "Tailwind CSS", "UI/UX Design"].map((skill) => (
              <div key={skill} className="p-4 border rounded-lg bg-card text-center font-medium">
                {skill}
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4">Let's Connect</h2>
          <p className="mb-6">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
          
          <div className="flex gap-4">
            <Button>
              <Mail className="mr-2 h-4 w-4" /> Contact Me
            </Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
