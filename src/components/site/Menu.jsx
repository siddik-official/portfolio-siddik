import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { profile } from "@/data/portfolio";
import { getLenis } from "@/lib/smooth-scroll";
import Logo from "./Logo";
import { ArrowUpRight } from "./ui";

const links = [
  ["About", "#about"],
  ["Work", "#work"],
  ["Experience", "#experience"],
  ["Stack", "#stack"],
  ["Contact", "#contact"],
];

export default function Menu() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (href) => (e) => {
    e.preventDefault();
    setOpen(false);
    const lenis = getLenis();
    if (lenis) {
      lenis.start(); // still paused from the open menu; a stopped Lenis ignores scrollTo
      lenis.scrollTo(href, { offset: 0 });
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="site-menu"
        className="fixed right-5 top-5 z-[60] flex items-center gap-3 rounded-lg border border-white/10 bg-ink/80 px-4 py-3 text-[13px] font-medium uppercase tracking-wide text-white backdrop-blur-md transition-colors hover:bg-ink md:right-10 md:top-6"
      >
        <span className="relative block h-3 w-5" aria-hidden="true">
          <span className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`} />
          <span className={`absolute left-0 top-1.5 h-px w-5 bg-current transition-opacity duration-300 ${open ? "opacity-0" : ""}`} />
          <span className={`absolute left-0 h-px w-5 bg-current transition-all duration-300 ${open ? "top-1.5 -rotate-45" : "top-3"}`} />
        </span>
        {open ? "Close" : "Menu"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="site-menu"
            aria-label="Main"
            className="fixed inset-0 z-50 flex flex-col justify-between bg-ink px-5 pb-8 pt-28 text-white md:px-10"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          >
            <a href="#top" onClick={go("#top")} className="absolute left-5 top-6 md:left-10 md:top-7" aria-label="Back to top">
              <Logo tone="light" />
            </a>
            <ul className="space-y-1">
              {links.map(([label, href], i) => (
                <motion.li
                  key={href}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <a
                    href={href}
                    onClick={go(href)}
                    className="group flex items-baseline gap-4 text-[clamp(44px,8vw,112px)] font-medium leading-[1.02] tracking-[-0.045em]"
                  >
                    <span className="font-mono text-xs tracking-normal text-white/40">0{i + 1}</span>
                    <span className="transition-all duration-300 group-hover:pl-3 group-hover:font-serif group-hover:font-normal group-hover:italic">
                      {label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>

            <div className="grid gap-6 border-t border-white/10 pt-6 text-sm text-white/70 sm:grid-cols-3">
              <a href={`mailto:${profile.email}`} className="hover:text-white">{profile.email}</a>
              <a href={profile.phoneHref} className="hover:text-white">{profile.phone}</a>
              <div className="flex gap-5">
                <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                  GitHub <ArrowUpRight />
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white">
                  LinkedIn <ArrowUpRight />
                </a>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
