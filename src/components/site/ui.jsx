import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ArrowRight({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={cn("h-4 w-4", className)} aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function ArrowUpRight({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className={cn("h-3.5 w-3.5", className)} aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlusMark({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" className={cn("h-5 w-5", className)} aria-hidden="true">
      <path d="M12 4v16M4 12h16" strokeLinecap="round" />
    </svg>
  );
}

// "(Selected work)" style section label
export function Eyebrow({ children, className }) {
  return <p className={cn("eyebrow", className)}>({children})</p>;
}

// Renders "*word*" segments in the italic serif accent face.
export function AccentText({ text }) {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") ? (
      <span key={i} className="accent">
        {part.slice(1, -1)}
      </span>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

// Pill with a round arrow badge, the signature button of the design.
export function PillButton({ href, children, variant = "light", download, external, className }) {
  const light = variant === "light";
  return (
    <a
      href={href}
      download={download}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-3 whitespace-nowrap rounded-full py-1.5 pl-1.5 pr-5 text-sm font-medium normal-case tracking-normal transition-colors",
        light ? "bg-white text-ink hover:bg-stone" : "bg-ink text-white hover:bg-neutral-800",
        className
      )}
    >
      <span
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-[-45deg]",
          light ? "bg-ink text-white" : "bg-white text-ink"
        )}
      >
        <ArrowRight />
      </span>
      {children}
    </a>
  );
}

// Fade-and-rise on scroll into view.
export function Reveal({ children, delay = 0, y = 28, className, as = "div" }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  );
}
