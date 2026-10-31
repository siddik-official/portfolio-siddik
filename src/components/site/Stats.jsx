import { stats } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { Eyebrow, Reveal } from "./ui";

// Cards step down left to right, like a staircase.
const offsets = ["", "md:mt-12", "md:mt-24", "md:mt-36"];

function Dots({ filled }) {
  return (
    <span className="flex gap-1" aria-hidden="true">
      {[0, 1, 2, 3].map((i) => (
        <span key={i} className={cn("h-1.5 w-1.5 rounded-[1px]", i <= filled ? "bg-ink" : "bg-ink/25")} />
      ))}
    </span>
  );
}

export default function Stats() {
  return (
    <section id="about" className="bg-paper px-5 pb-24 pt-24 md:px-10 md:pb-40 md:pt-36">
      <Reveal className="text-center">
        <Eyebrow>In numbers</Eyebrow>
        <h2 className="mt-5 text-[clamp(44px,6.4vw,92px)] font-medium leading-none tracking-[-0.045em]">
          Siddik <span className="accent">in figures.</span>
        </h2>
        <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-ink/60">
          Two and a half years of shipping production software for food delivery, dating, matrimony and e-commerce.
        </p>
      </Reveal>

      <div className="mt-16 grid grid-cols-2 gap-3 md:mt-20 md:grid-cols-4 md:gap-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} className={offsets[i]}>
            <div className="flex h-52 flex-col justify-between rounded-2xl bg-stone p-4 md:h-72 md:p-5">
              <div className="flex items-start justify-between gap-3">
                <p className="text-[13px] font-medium leading-snug">{stat.label}</p>
                <Dots filled={i} />
              </div>
              <p className="font-serif text-[clamp(52px,6.2vw,104px)] italic leading-[0.9] tracking-tight">
                {stat.value}
                <span className="text-[0.7em]">{stat.suffix}</span>
              </p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
