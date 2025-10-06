/* eslint-disable no-unused-vars */
import { useState, lazy, Suspense } from "react";
import "./assets/css/index.css";
import Header from "./pages/Header/Header";

import { Route, Routes } from "react-router-dom";

// Lazy load components for better performance
const Hero = lazy(() => import("./pages/Hero/Hero"));
const Skills = lazy(() => import("./pages/Skills/Skills"));
const Experience = lazy(() => import("./pages/Experience/Experience"));
const Education = lazy(() => import("./pages/Education/Education"));
const Contact = lazy(() => import("./pages/Contact/Contact"));
const Projects = lazy(() => import("./pages/Projects/Projects"));

// Loading component
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-950">
    <div className="w-12 h-12 rounded-full border-2 border-blue-500 border-t-transparent animate-spin"></div>
  </div>
);

export default function App() {
  const [isOnePage, setIsOnePage] = useState(false); // Toggle state

  return (
    <>
      <Header />
      <Suspense fallback={<LoadingFallback />}>
        {/* Conditional Rendering */}
        {isOnePage ? (
          // One-Page Mode: Render all components together
          <>
            <Hero />
            <Skills />
            <Experience />
            <Education />
            <Contact />
          </>
        ) : (
          // Router Mode: Use routes for navigation
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/education" element={<Education />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/projects" element={<Projects />} />
          </Routes>
        )}
      </Suspense>
    </>
  );
}
