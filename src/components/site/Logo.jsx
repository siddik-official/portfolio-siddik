import { cn } from "@/lib/utils";
import { markDot, markS } from "./logo-paths";

// The Siddik mark: an italic serif S with a node dot (the full stop) inside a circle.
// tone="light" is for dark backgrounds (paper circle, ink letter); "dark" is the reverse.
export function LogoMark({ tone = "dark", className }) {
  const [bg, fg] = tone === "light" ? ["#F4F3F0", "#0D0D0D"] : ["#0D0D0D", "#F4F3F0"];
  return (
    <svg viewBox="0 0 100 100" className={cn("h-9 w-9 shrink-0", className)} aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill={bg} />
      <path d={markS} fill={fg} />
      <circle {...markDot} fill={fg} />
    </svg>
  );
}

export default function Logo({ tone = "dark", className, markClassName }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <LogoMark tone={tone} className={markClassName} />
      <span className="text-[22px] font-medium leading-none tracking-[-0.035em]">Siddik</span>
    </span>
  );
}
