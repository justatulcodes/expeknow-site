import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { AppDetailView, AppData } from "./components/AppDetailView";
import { RequestForm } from "./components/RequestForm";
import { BlogSection } from "./components/BlogSection";
import { BlogDetailView, BlogData } from "./components/BlogDetailView";
import { AllBlogsView } from "./components/AllBlogsView";
import { AboutView } from "./components/AboutView";
import { Footer } from "./components/Footer";
import { Toaster } from "./components/ui/sonner";
import { ForYouSection } from "./components/ForYouSection";
import { CareerHighlights } from "./components/CareerHighlights";
import { APPS } from "./components/AppShowcase";

export default function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedApp, setSelectedApp] = useState<AppData | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogData | null>(null);
  const [showAllBlogs, setShowAllBlogs] = useState(false);

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

  const handleAppSelect = (app: AppData) => {
    setSelectedApp(app);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToApps = () => {
    setSelectedApp(null);
    setCurrentPage("home");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleBlogSelect = (blog: BlogData) => {
    setSelectedBlog(blog);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToBlog = () => {
    setSelectedBlog(null);
    setCurrentPage("home");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleViewAllBlogs = () => {
    setShowAllBlogs(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackFromAllBlogs = () => {
    setShowAllBlogs(false);
    setCurrentPage("home");
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="dark min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black flex flex-col">
      {!selectedApp && !selectedBlog && !showAllBlogs && <Navbar currentPage={currentPage} onNavigate={handleNavigate} />}

      <main className="flex-1">
        {selectedApp ? (
          <AppDetailView app={selectedApp} onBack={handleBackToApps} onAppSelect={handleAppSelect} />
        ) : selectedBlog ? (
          <BlogDetailView blog={selectedBlog} onBack={handleBackToBlog} onBlogSelect={handleBlogSelect} />
        ) : showAllBlogs ? (
          <AllBlogsView onBack={handleBackFromAllBlogs} onBlogSelect={handleBlogSelect} />
        ) : currentPage === "about" ? (
          <AboutView />
        ) : (
          <>
            <Hero onNavigate={handleNavigate} />
            <ForYouSection apps={APPS} onAppSelect={handleAppSelect} />
            <CareerHighlights apps={APPS} onAppSelect={handleAppSelect} />
            <BlogSection onBlogSelect={handleBlogSelect} onViewAll={handleViewAllBlogs} />
            <RequestForm />
          </>
        )}
      </main>

      {!selectedApp && !selectedBlog && !showAllBlogs && <Footer />}
      <Toaster />
    </div>
  );
}
