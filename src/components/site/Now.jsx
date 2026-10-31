import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import photo from "@/assets/photos/image_3.jpg";
import { now } from "@/data/portfolio";
import { AccentText, Eyebrow, PillButton, Reveal } from "./ui";

export default function Now() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // Slow drift of the photo against the frame while the band scrolls past
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section className="bg-paper px-5 pb-24 md:px-10 md:pb-36">
      <div
        ref={ref}
        className="relative isolate overflow-hidden rounded-3xl bg-ink text-white aspect-[4/5] sm:aspect-[16/11] lg:aspect-[16/8]"
      >
        <motion.img
          src={photo}
          alt="Md Abu Bakar Siddik smiling in a warmly lit room"
          loading="lazy"
          style={{ y }}
          className="absolute inset-x-0 top-[-6%] -z-10 h-[112%] w-full object-cover object-[78%_center]"
        />
        {/* Darken the side the text sits on: the bottom on phones, the left from tablet up */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink via-ink/50 to-transparent sm:bg-gradient-to-r sm:from-ink/90 sm:via-ink/45 sm:to-transparent" />

        <Reveal className="flex h-full max-w-xl flex-col justify-end p-6 sm:justify-center md:p-14">
          <Eyebrow className="text-white/70">Now</Eyebrow>
          <h2 className="mt-4 text-[clamp(32px,4.2vw,60px)] font-medium leading-[1.02] tracking-[-0.04em]">
            <AccentText text={now.heading} />
          </h2>
          <p className="mt-5 max-w-sm text-[16px] leading-relaxed text-white/75">{now.body}</p>
          <div className="mt-8">
            <PillButton href="#contact">Let&apos;s talk</PillButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
