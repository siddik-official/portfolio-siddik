import { marqueeWords, skillGroups } from "@/data/portfolio";
import { Eyebrow, Reveal } from "./ui";

function MarqueeRow() {
  return (
    <div className="flex shrink-0 items-center gap-10 pr-10 md:gap-14 md:pr-14">
      {marqueeWords.map((word, i) => (
        <span key={word} className="flex items-center gap-10 md:gap-14">
          <span className={i % 2 ? "accent" : "font-medium tracking-[-0.045em]"}>{word}</span>
          {/* The logo's node dot as the separator */}
          <span className="h-[0.16em] w-[0.16em] rounded-full bg-ink/35" />
        </span>
      ))}
    </div>
  );
}

export default function Stack() {
  return (
    <section id="stack" className="overflow-hidden border-t border-ink/10 bg-paper py-24 md:py-36">
      <div className="px-5 md:px-10">
        <Eyebrow>Stack</Eyebrow>
      </div>

      {/* Duplicated row so the -50% keyframe loops seamlessly */}
      <div className="mt-10 flex w-max animate-marquee whitespace-nowrap text-[clamp(56px,9vw,148px)] leading-none" aria-hidden="true">
        <MarqueeRow />
        <MarqueeRow />
      </div>

      <div className="mt-16 grid gap-x-10 gap-y-10 px-5 md:mt-24 md:grid-cols-2 md:px-10 xl:grid-cols-3">
        {skillGroups.map(([group, items], i) => (
          <Reveal key={group} delay={(i % 3) * 0.06} className="border-t border-ink/15 pt-5">
            <h3 className="eyebrow text-ink/55">{group}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {items.map((item) => (
                <li key={item} className="chip border border-ink/15 bg-white/60">
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
