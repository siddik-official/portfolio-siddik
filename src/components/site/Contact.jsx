import { useState } from "react";
import { profile } from "@/data/portfolio";
import { LogoMark } from "./Logo";
import { ArrowRight, ArrowUpRight, Eyebrow, PillButton, Reveal } from "./ui";

// Public Web3Forms access key (same one the previous site used); submissions arrive by email.
const WEB3FORMS_KEY = "f381dfc1-3495-4c01-89b7-f890d6694b4e";

const field =
  "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5 text-[15px] text-white placeholder:text-white/35 outline-none transition-colors focus:border-white/40";

function ContactForm() {
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.append("access_key", WEB3FORMS_KEY);
    data.append("subject", `Portfolio message from ${data.get("name")}`);
    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body: data });
      const json = await res.json();
      if (!json.success) throw new Error(json.message);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 md:p-8">
      <p className="eyebrow text-white/55">Send a message</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        <label className="sr-only" htmlFor="c-name">Your name</label>
        <input id="c-name" name="name" required placeholder="Your name" className={field} />
        <label className="sr-only" htmlFor="c-email">Email</label>
        <input id="c-email" name="email" type="email" required placeholder="Email" className={field} />
      </div>
      <label className="sr-only" htmlFor="c-message">Message</label>
      <textarea
        id="c-message"
        name="message"
        required
        rows={5}
        placeholder="Tell me about the role or project"
        className={`${field} mt-3 resize-none`}
      />
      {/* Honeypot field that bots fill in and people never see */}
      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
      <div className="mt-5 flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-3 rounded-full bg-white py-1.5 pl-1.5 pr-5 text-sm font-medium text-ink transition-colors hover:bg-stone disabled:opacity-60"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-white transition-transform duration-300 group-hover:rotate-[-45deg]">
            <ArrowRight />
          </span>
          {status === "sending" ? "Sending…" : "Send message"}
        </button>
        <p className="text-sm text-white/60" role="status">
          {status === "sent" && "Thanks — your message is on its way."}
          {status === "error" && `Couldn't send right now. Email me at ${profile.email}.`}
        </p>
      </div>
    </form>
  );
}

export default function Contact() {
  return (
    <footer id="contact" className="bg-ink text-white">
      <div className="grid gap-14 px-5 pt-24 md:px-10 md:pt-36 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <Eyebrow className="text-white/70">Contact</Eyebrow>
          <h2 className="mt-4 text-[clamp(48px,6.4vw,96px)] font-medium leading-[0.92] tracking-[-0.045em]">
            Let&apos;s build
            <br />
            <span className="accent">something real.</span>
          </h2>
          <p className="mt-6 max-w-md text-[16px] leading-relaxed text-white/65">
            I&apos;m open to full-time roles and freelance projects, remote or in Dhaka. Tell me what you&apos;re building.
          </p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-10 inline-block text-[clamp(22px,2.4vw,34px)] tracking-[-0.02em] underline decoration-white/30 underline-offset-[10px] transition-colors hover:decoration-white"
          >
            {profile.email}
          </a>
          <div className="mt-10 grid max-w-lg grid-cols-2 gap-3 text-[14px]">
            {[
              ["Phone", profile.phone, profile.phoneHref],
              ["Location", profile.location],
              ["GitHub", "siddik-official", profile.github],
              ["LinkedIn", "msiddik31", profile.linkedin],
            ].map(([label, value, href]) => (
              <div key={label} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                <p className="eyebrow text-white/45">{label}</p>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 hover:text-white/70"
                  >
                    {value}
                    {href.startsWith("http") && <ArrowUpRight />}
                  </a>
                ) : (
                  <p className="mt-2">{value}</p>
                )}
              </div>
            ))}
          </div>
          <div className="mt-8">
            <PillButton href={encodeURI(profile.resume)} download={profile.resumeFileName}>
              Download CV
            </PillButton>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="lg:pt-10">
          <ContactForm />
        </Reveal>
      </div>

      {/* Stacked on phones, one line from tablet up */}
      <div
        className="mt-24 flex select-none flex-col gap-2 overflow-hidden px-5 text-[23vw] leading-[0.85] md:mt-36 md:flex-row md:items-end md:justify-between md:gap-4 md:px-10 md:text-[14.5vw] md:leading-[0.8] 2xl:text-[240px]"
        aria-hidden="true"
      >
        <span className="font-medium tracking-[-0.06em]">Siddik</span>
        <span className="accent self-end pr-[0.04em] md:self-auto">engineer.</span>
      </div>

      <div className="mt-10 flex flex-col gap-4 border-t border-white/10 px-5 py-6 text-[13px] text-white/50 md:flex-row md:items-center md:justify-between md:px-10">
        <p className="flex items-center gap-3">
          <LogoMark tone="light" className="h-6 w-6" />© {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <a href={profile.github} target="_blank" rel="noreferrer" className="hover:text-white">GitHub</a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-white">LinkedIn</a>
          <a href="#top" className="hover:text-white">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
