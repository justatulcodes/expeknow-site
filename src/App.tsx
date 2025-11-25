import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AppShowcase } from "./components/AppShowcase";
import { RequestForm } from "./components/RequestForm";
import { BlogSection } from "./components/BlogSection";
import { AboutView } from "./components/AboutView";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    
    if (page === "about") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // If navigating to a section on the home page
    if (["apps", "request", "blog", "home"].includes(page)) {
      // If we are currently on about page, we need to switch to home first
      if (currentPage === "about") {
        setCurrentPage("home");
        // Allow render to happen then scroll
        setTimeout(() => {
          if (page !== "home") {
            const element = document.getElementById(page);
            element?.scrollIntoView({ behavior: "smooth" });
          } else {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }, 100);
      } else {
        // Already on home page, just scroll
        if (page !== "home") {
          const element = document.getElementById(page);
          element?.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }
    }
  };

  return (
    <div className="dark min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground flex flex-col">
      <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
      
      <main className="flex-1">
        {currentPage === "about" ? (
          <AboutView />
        ) : (
          <>
            <Hero onNavigate={handleNavigate} />
            <AppShowcase />
            <RequestForm />
            <BlogSection />
          </>
        )}
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
}
