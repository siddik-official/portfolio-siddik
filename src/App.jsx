import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import "./assets/css/site.css";
import { startSmoothScroll } from "./lib/smooth-scroll";
import Menu from "./components/site/Menu";
import Hero from "./components/site/Hero";
import Stats from "./components/site/Stats";
import About from "./components/site/About";
import Work from "./components/site/Work";
import Experience from "./components/site/Experience";
import Now from "./components/site/Now";
import Stack from "./components/site/Stack";
import Contact from "./components/site/Contact";

export default function App() {
  useEffect(() => startSmoothScroll(), []);

  return (
    <>
      <Menu />
      <main>
        <Hero />
        <Stats />
        <About />
        <Work />
        <Experience />
        <Now />
        <Stack />
      </main>
      <Contact />
      {/* Vercel Web Analytics: visitor countries, pages, referrers and devices */}
      <Analytics />
    </>
  );
}
