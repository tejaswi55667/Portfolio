import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowRight, Brain, Code2, Cpu, Download, GraduationCap, Lightbulb,
  Mail, MapPin, Menu, MessageCircle, Palette, Phone, Rocket, Send, Sparkles, Users, Wrench, X, Github, Linkedin, Award,
} from "lucide-react";
import coderArt from "@/assets/coder-illustration.jpg";
import logoSticker from "@/assets/logo-sticker.png";
import { profile, skillGroups, experiences, projects, achievements, exploring } from "@/config/portfolio";
import { Reveal, Section, SocialLinks, btnPrimary, btnGhost } from "@/components/portfolio/ui";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tejaswi Chirathapudi — AI & ML Student Portfolio" },
      { name: "description", content: "Portfolio of Tejaswi Chirathapudi, B.Tech AI & ML student at Vignan's University, aspiring developer and technical event coordinator." },
      { property: "og:title", content: "Tejaswi Chirathapudi — AI & ML Student Portfolio" },
      { property: "og:description", content: "Aspiring AI & ML developer passionate about technology, programming and innovation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const nav = [
  ["About", "about"], ["Skills", "skills"], ["Leadership", "experience"],
  ["Projects", "projects"], ["Education", "education"], ["Contact", "contact"],
];
const groupIcons = { code: Code2, brain: Brain, palette: Palette, wrench: Wrench };

function Index() {
  return (
    <div className="ambient min-h-screen overflow-x-hidden font-sans">
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Exploring />
        <Contact />
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 md:flex-row">
          <p className="text-sm text-muted-foreground">Designed with curiosity &amp; ambition by {profile.name}.</p>
          <SocialLinks />
        </div>
      </footer>
      <FloatingChat />
    </div>
  );
}

function FloatingChat() {
  const number = profile.phone.replace(/\D/g, "");
  return (
    <a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noreferrer"
      aria-label={`Message me on WhatsApp at ${profile.phone}`}
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-primary text-primary-foreground shadow-glow transition hover:-translate-y-1 hover:brightness-110"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" aria-label="Back to top" className="flex items-center gap-2.5">
          <img src={logoSticker} alt="Logo" width={36} height={36} className="h-9 w-9 rounded-xl object-cover shadow-glow" />
          <span className="font-display text-lg font-bold"><span className="text-gradient">TC</span><span className="text-muted-foreground">.</span></span>
        </a>
        <nav className="hidden gap-8 md:flex">
          {nav.map(([l, id]) => (
            <a key={id} href={`#${id}`} className="text-sm text-muted-foreground transition hover:text-foreground">{l}</a>
          ))}
        </nav>
        <ResumeButton className="hidden md:inline-flex" small />
        <button className="md:hidden" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="flex flex-col gap-4 border-t border-border px-6 py-6 md:hidden">
          {nav.map(([l, id]) => (
            <a key={id} href={`#${id}`} onClick={() => setOpen(false)} className="text-muted-foreground hover:text-foreground">{l}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

function ResumeButton({ className = "", small }) {
  const ready = Boolean(profile.resumeUrl);
  const cls = `${btnGhost} ${small ? "px-4 py-2 text-xs" : ""} ${className}`;
  return ready ? (
    <a href={profile.resumeUrl} download className={cls}><Download className="h-4 w-4" /> Resume</a>
  ) : (
    <span title="Resume will be available soon" aria-disabled className={`${cls} cursor-not-allowed opacity-70`}>
      <Download className="h-4 w-4" /> Resume · Soon
    </span>
  );
}

function Hero() {
  return (
    <section id="top" className="mx-auto grid min-h-screen max-w-6xl items-center gap-14 px-6 pb-16 pt-28 md:grid-cols-[1.2fr_1fr]">
      <div className="animate-rise">
        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.35em] text-primary-glow">{profile.name}</p>
        <h1 className="font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
          Hello, I'm <span className="text-gradient">Tejaswi.</span>
        </h1>
        <p className="mt-6 text-xl text-foreground/90 md:text-2xl">
          An aspiring AI &amp; ML developer passionate about technology, programming and innovation.
        </p>
        <p className="mt-5 max-w-xl leading-relaxed text-muted-foreground">
          Currently pursuing my B.Tech in Artificial Intelligence and Machine Learning, exploring new technologies,
          strengthening my programming fundamentals and turning ideas into possibilities.
        </p>
        <div className="mt-9 flex flex-wrap gap-4">
          <a href="#about" className={btnPrimary}>Explore My Journey <ArrowRight className="h-4 w-4" /></a>
          <a href="#contact" className={btnGhost}>Let's Connect</a>
        </div>
        <SocialLinks className="mt-9" />
      </div>
      <div className="animate-rise relative mx-auto w-full max-w-sm [animation-delay:200ms]">
        <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-primary opacity-30 blur-3xl" />
        <div className="glass relative aspect-[4/5] overflow-hidden rounded-[2rem]">
          <img
            src={profile.photoUrl || coderArt}
            alt={profile.photoUrl ? profile.name : "Illustration of a girl coding at her desk"}
            width={916}
            height={1145}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="glass absolute -bottom-5 -left-5 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm">
          <Cpu className="h-5 w-5 text-primary-glow" /> B.Tech · AI &amp; ML
        </div>
      </div>
    </section>
  );
}

function About() {
  const cards = [
    { Icon: Lightbulb, t: "Technology Enthusiast", d: "Curious about emerging tech and how it shapes the world." },
    { Icon: Users, t: "Technical Event Coordinator", d: "Planning and running events that spark coding culture." },
    { Icon: Sparkles, t: "Continuous Learner", d: "Always experimenting, always building new skills." },
  ];
  return (
    <Section id="about" eyebrow="About Me" title="More Than Just a Student">
      <Reveal className="grid gap-6 text-lg leading-relaxed text-muted-foreground md:grid-cols-2">
        <p>I am a second-year B.Tech student specializing in Artificial Intelligence and Machine Learning at Vignan University. I am passionate about exploring technology, programming and emerging innovations.</p>
        <div className="space-y-6">
          <p>I have foundational knowledge of C, Python and Java, along with an interest in Artificial Intelligence and Machine Learning. Beyond academics, I actively participate in organizing and coordinating technical events, gaining practical exposure to teamwork, communication, planning and leadership.</p>
          <p>I believe in continuous learning, experimenting with new technologies and developing the skills needed to create meaningful solutions.</p>
        </div>
      </Reveal>
      <div className="mt-14 grid gap-5 md:grid-cols-3">
        {cards.map(({ Icon, t, d }) => (
          <Reveal key={t} className="glass group rounded-3xl p-7 transition hover:-translate-y-1 hover:border-primary/40">
            <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-primary shadow-glow"><Icon className="h-5 w-5 text-primary-foreground" /></div>
            <h3 className="font-display text-lg font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  return (
    <Section id="skills" eyebrow="Technical Skills" title="The Toolkit I'm Building">
      <div className="grid gap-5 md:grid-cols-2">
        {skillGroups.map((g) => {
          const Icon = groupIcons[g.icon];
          return (
            <Reveal key={g.title} className="glass rounded-3xl p-7">
              <div className="mb-6 flex items-center gap-3">
                <Icon className="h-5 w-5 text-primary-glow" />
                <h3 className="font-display text-lg font-semibold">{g.title}</h3>
              </div>
              <ul className="flex flex-wrap gap-2.5">
                {g.items.map((s) => (
                  <li key={s.name} className="flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-2 text-sm transition hover:border-primary/50">
                    {s.name}
                    {"level" in s && <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] uppercase tracking-wider text-primary-glow">{s.level}</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}

function Experience() {
  return (
    <Section id="experience" eyebrow="Campus Leadership" title="Leadership Beyond Academics">
      <div className="relative space-y-8 border-l border-border pl-8 md:pl-12">
        {experiences.map((e) => (
          <Reveal key={e.title} className="relative">
            <span className="absolute -left-[2.55rem] top-2 h-3 w-3 rounded-full bg-gradient-primary shadow-glow md:-left-[3.55rem]" />
            <div className="glass rounded-3xl p-7">
              <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">{e.role}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{e.title}</h3>
              <ul className="mt-4 space-y-2 text-muted-foreground">
                {e.points.map((p) => <li key={p} className="flex gap-3"><span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-primary-glow" />{p}</li>)}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  return (
    <Section id="projects" eyebrow="Projects & Learning Journey" title="From Learning to Building">
      <Reveal><p className="-mt-6 mb-12 max-w-2xl text-lg text-muted-foreground">Every developer starts with curiosity. I'm currently strengthening my programming fundamentals and preparing to transform my knowledge into practical projects.</p></Reveal>
      <div className="grid gap-5 md:grid-cols-3">
        {projects.map((p) => (
          <Reveal key={p.title} className="glass flex flex-col rounded-3xl p-7 transition hover:-translate-y-1 hover:border-primary/40">
            <Rocket className="h-6 w-6 text-primary-glow" />
            <h3 className="mt-5 font-display text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.description}</p>
            {p.link ? (
              <a href={p.link} target="_blank" rel="noreferrer" className="mt-6 text-sm font-semibold text-primary-glow">View project →</a>
            ) : (
              <span className="mt-6 w-fit rounded-full border border-border px-3 py-1 text-xs uppercase tracking-wider text-muted-foreground">{p.status}</span>
            )}
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Education() {
  return (
    <Section id="education" eyebrow="Education" title="Academic Path">
      <Reveal className="glass flex flex-col gap-6 rounded-3xl p-8 md:flex-row md:items-center">
        <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-primary shadow-glow"><GraduationCap className="h-6 w-6 text-primary-foreground" /></div>
        <div className="flex-1">
          <h3 className="font-display text-xl font-semibold">B.Tech – Artificial Intelligence and Machine Learning</h3>
          <p className="mt-1 text-muted-foreground">{profile.institution}</p>
          <p className="mt-1 text-sm text-muted-foreground">Currently pursuing Second Year.</p>
        </div>
        <span className="w-fit rounded-full border border-primary/40 px-4 py-1.5 text-sm text-primary-glow">2025 – Present</span>
      </Reveal>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {achievements.map((a) => (
          <Reveal key={a.type} className="rounded-3xl border border-dashed border-border p-6">
            <Award className="h-5 w-5 text-muted-foreground" />
            <h4 className="mt-3 font-semibold">{a.type}</h4>
            <p className="text-sm text-muted-foreground">{a.note}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function Exploring() {
  const [active, setActive] = useState(0);
  return (
    <Section id="exploring" eyebrow="Currently Exploring" title="What I'm Diving Into">
      <Reveal className="grid gap-8 md:grid-cols-[1fr_1fr]">
        <div className="flex flex-wrap content-start gap-3">
          {exploring.map((e, i) => (
            <button
              key={e.name}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              className={`rounded-full border px-5 py-2.5 text-sm transition ${i === active ? "border-transparent bg-gradient-primary text-primary-foreground shadow-glow" : "border-border text-muted-foreground hover:text-foreground"}`}
            >
              {e.name}
            </button>
          ))}
        </div>
        <div className="glass rounded-3xl p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-primary-glow">Now learning</p>
          <h3 className="mt-3 font-display text-2xl font-semibold">{exploring[active]?.name}</h3>
          <p className="mt-3 text-muted-foreground">{exploring[active]?.note}</p>
        </div>
      </Reveal>
    </Section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);
  const onSubmit = (e) => {
    e.preventDefault();
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };
  const field = "w-full rounded-2xl border border-input bg-secondary/50 px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary";
  const items = [
    { Icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
    ...(profile.showPhone ? [{ Icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` }] : []),
    { Icon: Github, label: "github.com/tejaswi55667", href: profile.github },
    { Icon: Linkedin, label: "linkedin.com/in/tejaswi-chirathapudi", href: profile.linkedin },
    { Icon: MapPin, label: profile.location },
  ];
  return (
    <Section id="contact" eyebrow="Contact" title="Let's Build Something Together">
      <div className="grid gap-10 md:grid-cols-2">
        <Reveal>
          <p className="text-lg text-muted-foreground">I'm always open to connecting with technology enthusiasts, developers and innovators. Whether it's a collaboration, learning opportunity or simply a conversation about technology, feel free to reach out.</p>
          <ul className="mt-8 space-y-4">
            {items.map(({ Icon, label, href }) => (
              <li key={label} className="flex items-center gap-4">
                <span className="glass grid h-10 w-10 place-items-center rounded-full"><Icon className="h-4 w-4 text-primary-glow" /></span>
                {href ? <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="break-all transition hover:text-primary-glow">{label}</a> : <span>{label}</span>}
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal>
          <form onSubmit={onSubmit} className="glass space-y-4 rounded-3xl p-7">
            <div className="grid gap-4 sm:grid-cols-2">
              <input required placeholder="Name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <input required type="email" placeholder="Email" className={field} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </div>
            <input required placeholder="Subject" className={field} value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
            <textarea required rows={5} placeholder="Message" className={field} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            <button type="submit" className={`${btnPrimary} w-full justify-center`}>Send Message <Send className="h-4 w-4" /></button>
            {sent && <p className="text-center text-sm text-muted-foreground">Your email app should open with the message ready to send.</p>}
          </form>
        </Reveal>
      </div>
    </Section>
  );
}
