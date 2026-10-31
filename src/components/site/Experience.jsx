import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { education, experience } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Eyebrow, PlusMark, Reveal } from "./ui";

function Job({ job, index, open, onToggle }) {
  return (
    <li className="border-b border-ink/15">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="grid w-full grid-cols-[auto_1fr_auto] items-baseline gap-x-5 gap-y-2 py-7 text-left md:grid-cols-[72px_1.4fr_1fr_auto] md:py-9"
      >
        <span className="font-mono text-xs text-ink/45">0{index + 1}</span>
        <span>
          <span className="block text-[clamp(24px,2.6vw,38px)] font-medium leading-tight tracking-[-0.03em]">{job.company}</span>
          <span className="mt-1 block text-[15px] text-ink/60">{job.role}</span>
        </span>
        <span className="col-start-2 font-mono text-[12px] uppercase tracking-[0.08em] text-ink/55 md:col-start-auto">
          {job.period}
          <span className="mt-1 block normal-case tracking-normal text-ink/45">{job.place}</span>
        </span>
        <span
          className={cn(
            "col-start-3 row-start-1 flex h-10 w-10 items-center justify-center self-center rounded-full border border-ink/15 transition-transform duration-300 md:col-start-auto md:row-start-auto",
            open && "rotate-45 bg-ink text-white"
          )}
          aria-hidden="true"
        >
          <PlusMark className="h-4 w-4" />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="grid gap-6 pb-9 md:grid-cols-[72px_1.4fr_1fr_auto] md:gap-x-5">
              <ul className="space-y-3 text-[15.5px] leading-relaxed text-ink/75 md:col-start-2">
                {job.points.map((point) => (
                  <li key={point} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-3 shrink-0 bg-ink/40" aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
              <ul className="flex flex-wrap content-start gap-2 md:col-start-3">
                {job.stack.map((tech) => (
                  <li key={tech} className="chip bg-ink/[0.06]">
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

export default function Experience() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="experience" className="bg-paper px-5 py-24 md:px-10 md:py-36">
      <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow>Experience</Eyebrow>
          <h2 className="mt-4 text-[clamp(44px,5.8vw,84px)] font-medium leading-[0.95] tracking-[-0.045em]">
            Where I&apos;ve <span className="accent">worked.</span>
          </h2>
        </div>
        <p className="max-w-sm text-[15px] leading-relaxed text-ink/60">
          Product studios, a remote US team and a fast-growing food-delivery startup — always close to production.
        </p>
      </Reveal>

      <ul className="mt-14 border-t border-ink/15 md:mt-20">
        {experience.map((job, i) => (
          <Job key={job.company} job={job} index={i} open={openIndex === i} onToggle={() => setOpenIndex(openIndex === i ? -1 : i)} />
        ))}
      </ul>

      <Reveal className="mt-20 grid gap-6 rounded-2xl bg-stone p-6 md:mt-28 md:grid-cols-[1fr_auto] md:items-end md:p-10">
        <div>
          <Eyebrow className="text-ink/55">Education</Eyebrow>
          <p className="mt-4 text-[clamp(26px,2.8vw,40px)] font-medium leading-tight tracking-[-0.03em]">
            {education.degree}
          </p>
          <p className="mt-1 text-[clamp(22px,2.2vw,32px)] font-serif italic">{education.school}</p>
          <p className="mt-4 max-w-2xl text-[14.5px] leading-relaxed text-ink/60">Coursework: {education.coursework}</p>
        </div>
        <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink/55">{education.period}</p>
      </Reveal>
    </section>
  );
}
