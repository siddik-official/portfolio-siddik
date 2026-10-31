import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import photo from "@/assets/photos/image_2.jpg";
import { aboutBio, aboutFacts, aboutStatement, profile } from "@/data/portfolio";
import { ArrowUpRight, Eyebrow, PillButton, Reveal } from "./ui";

// Split "*accent*" markup into individual words that remember their style.
const words = aboutStatement
  .split(/(\*[^*]+\*)/g)
  .filter(Boolean)
  .flatMap((part) => {
    const accent = part.startsWith("*");
    return (accent ? part.slice(1, -1) : part).split(" ").filter(Boolean).map((w) => ({ w, accent }));
  });

function Word({ word, first, progress, range }) {
  // Accent words land in full ink; the rest settle at a soft grey.
  const opacity = useTransform(progress, range, [0.12, word.accent ? 1 : 0.42]);
  // Punctuation hugs the previous word instead of getting its own leading space.
  const space = first || /^[,.;:!?]/.test(word.w) ? "" : " ";
  return (
    <>
      {space}
      <motion.span style={{ opacity }} className={word.accent ? "accent" : undefined}>
        {word.w}
      </motion.span>
    </>
  );
}

export default function About() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });

  return (
    <section className="bg-paper px-5 pb-24 md:px-10 md:pb-36">
      <div className="text-center">
        <Eyebrow>About</Eyebrow>
      </div>
      <p
        ref={ref}
        className="mx-auto mt-8 max-w-5xl text-center text-[clamp(34px,5.2vw,76px)] font-medium leading-[1.08] tracking-[-0.04em]"
      >
        {words.map((word, i) => (
          <Word
            key={i}
            word={word}
            first={i === 0}
            progress={scrollYProgress}
            range={[i / words.length, (i + 1) / words.length]}
          />
        ))}
      </p>

      <div className="mx-auto mt-20 grid max-w-6xl items-end gap-10 md:mt-28 md:grid-cols-12">
        <Reveal className="md:col-span-5">
          <div className="overflow-hidden rounded-2xl bg-stone">
            <img
              src={photo}
              alt="Md Abu Bakar Siddik in a brown jacket"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover object-[50%_25%] transition-transform duration-700 hover:scale-[1.03]"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="md:col-span-6 md:col-start-7">
          <div className="space-y-5 text-[17px] leading-relaxed text-ink/75">
            {aboutBio.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {aboutFacts.map(([label, value]) => (
              <div key={label} className="flex items-baseline justify-between gap-6 py-3.5">
                <dt className="eyebrow text-ink/50">{label}</dt>
                <dd className="text-right text-[15px]">{value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-5">
            <PillButton href={encodeURI(profile.resume)} download={profile.resumeFileName} variant="dark">
              Download CV
            </PillButton>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium underline-offset-4 hover:underline"
            >
              GitHub profile <ArrowUpRight />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
