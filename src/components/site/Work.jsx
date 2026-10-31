import { profile, projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";
import { ArrowUpRight, Eyebrow, PillButton, PlusMark, Reveal } from "./ui";

function ProjectImage({ project }) {
  const alt = `${project.title} — ${project.category}`;
  // Wide promo art is shown whole over a blurred copy of itself instead of being cropped.
  if (project.fit === "contain") {
    return (
      <div className="relative aspect-[16/10] overflow-hidden">
        <img src={project.image} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full scale-110 object-cover blur-2xl" />
        <img
          src={project.image}
          alt={alt}
          loading="lazy"
          className="relative h-full w-full object-contain transition-transform duration-700 group-hover:scale-[1.04]"
        />
      </div>
    );
  }
  return (
    <img
      src={project.image}
      alt={alt}
      loading="lazy"
      className="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
    />
  );
}

function ProjectCard({ project }) {
  const [primary, ...more] = project.links;
  return (
    <Reveal as="article" className="group">
      <a href={primary.href} target="_blank" rel="noreferrer" className="block overflow-hidden rounded-2xl bg-white/5">
        <ProjectImage project={project} />
      </a>
      <div className="mt-5 flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.12em] text-white/55">
        <span>{project.category}</span>
        <span className="shrink-0 whitespace-nowrap">@{project.year}</span>
      </div>
      <h3 className="mt-3 text-[clamp(34px,3.4vw,48px)] font-medium leading-none tracking-[-0.035em]">{project.title}</h3>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-white/65">{project.description}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((tech) => (
          <li key={tech} className="chip bg-white/10 text-white/80">
            {tech}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap items-center gap-5">
        <PillButton href={primary.href} external>
          {primary.label}
        </PillButton>
        {more.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-white"
          >
            {link.label} <ArrowUpRight />
          </a>
        ))}
      </div>
    </Reveal>
  );
}

export default function Work() {
  return (
    <section id="work" className="bg-ink px-5 py-24 text-white md:px-10 md:pb-64 md:pt-32">
      <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow className="text-white/70">Selected work</Eyebrow>
          <h2 className="mt-4 text-[clamp(44px,5.8vw,84px)] font-medium leading-[0.95] tracking-[-0.045em]">
            Products I&apos;ve
            <br />
            <span className="accent">shipped.</span>
          </h2>
        </div>
        <div className="hidden items-center gap-24 pb-4 text-white/60 lg:flex" aria-hidden="true">
          <PlusMark />
          <PlusMark />
        </div>
        <PillButton href={profile.github} external className="self-start md:self-auto">
          View GitHub
        </PillButton>
      </Reveal>

      <div className="mt-16 grid gap-x-8 gap-y-16 md:mt-24 md:grid-cols-2 md:gap-y-28">
        {projects.map((project, i) => (
          // The stagger offset lives on a wrapper: Reveal's own transform would override it.
          <div key={project.title} className={cn(i % 2 === 1 && "md:translate-y-40")}>
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
