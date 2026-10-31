import { motion } from "framer-motion";
import portrait from "@/assets/photos/image_1.jpg";
import { heroTags, profile } from "@/data/portfolio";
import Logo from "./Logo";
import { ArrowUpRight, PillButton, PlusMark } from "./ui";

const ease = [0.22, 1, 0.36, 1];
// Fade the portrait's edges into the black page so it reads as one surface.
const portraitMask = "linear-gradient(to right, transparent 0%, #000 25%, #000 80%, transparent 100%)";

function Line({ children, delay, className }) {
  return (
    <span className={`block overflow-hidden pb-[0.06em] ${className ?? ""}`}>
      <motion.span
        className="block"
        initial={{ y: "105%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1.1, delay, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100svh] flex-col overflow-hidden bg-ink text-white">
      {/* Centred on phones and tablets, right of centre on desktop so the name has room on the left.
          Positioning sits on the wrapper because the motion layer's scale owns `transform`. */}
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 w-[min(980px,140vw)] -translate-x-1/2 lg:translate-x-0"
        style={{ WebkitMaskImage: portraitMask, maskImage: portraitMask }}
      >
        <motion.img
          src={portrait}
          alt="Black and white portrait of Md Abu Bakar Siddik"
          className="h-full w-full object-cover object-[50%_35%] grayscale"
          fetchpriority="high"
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40" />

      {/* Top bar */}
      <header className="relative z-10 grid grid-cols-2 items-start gap-6 px-5 pt-6 md:px-10 lg:grid-cols-[1.3fr_1fr_1fr_1fr] lg:pr-44">
        <a href="#top" aria-label="Siddik — back to top" className="self-center justify-self-start">
          <Logo tone="light" />
        </a>
        <div className="hidden text-[13px] leading-snug lg:block">
          <p className="text-white/55">Based in</p>
          <p>{profile.location}</p>
        </div>
        <div className="hidden text-[13px] leading-snug lg:block">
          <a href={profile.phoneHref} className="block hover:text-white/70">{profile.phone}</a>
          <a href={`mailto:${profile.email}`} className="block hover:text-white/70">{profile.email}</a>
        </div>
        <div className="hidden text-[13px] leading-snug lg:block">
          <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white/70">
            GitHub <ArrowUpRight />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white/70">
            LinkedIn <ArrowUpRight />
          </a>
        </div>
      </header>

      {/* Skill grid with plus marks */}
      <motion.div
        className="relative z-10 mt-[12vh] hidden space-y-10 px-10 text-[14px] lg:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
        aria-hidden="true"
      >
        {[
          [heroTags[0][0], null, heroTags[0][1], null, heroTags[0][2]],
          [null, heroTags[1][0], null, heroTags[1][1], null],
        ].map((row, r) => (
          <div key={r} className="grid grid-cols-5 items-center">
            {row.map((tag, i) => (
              <span key={i} className={i === 0 ? "justify-self-start" : i === 4 ? "justify-self-end" : "justify-self-center"}>
                {tag ?? <PlusMark className="text-white/80" />}
              </span>
            ))}
          </div>
        ))}
      </motion.div>

      {/* Name, tagline and CTA */}
      <div className="relative z-10 mt-auto px-5 pb-8 md:px-10 md:pb-10">
        <h1 className="sr-only">
          {profile.name} — {profile.role}
        </h1>
        <div aria-hidden="true" className="display uppercase text-[15.5vw] md:text-[12.6vw] 2xl:text-[200px]">
          <div className="flex items-center justify-between gap-6">
            <Line delay={0.2}>{profile.firstLine}</Line>
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1, ease }}
            >
              <PillButton href="#contact">Let&apos;s work together</PillButton>
            </motion.div>
          </div>
          <div className="mt-6 flex flex-col-reverse gap-6 md:mt-0 md:flex-row md:items-end md:justify-between">
            <motion.p
              className="max-w-[380px] text-[17px] font-normal normal-case leading-[1.45] tracking-normal text-white/80 md:mb-[0.12em] md:text-[19px]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease }}
            >
              {profile.tagline}
            </motion.p>
            <Line delay={0.35} className="md:text-right">
              {profile.lastLine}
            </Line>
          </div>
          <div className="mt-6 lg:hidden">
            <PillButton href="#contact">Let&apos;s work together</PillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
