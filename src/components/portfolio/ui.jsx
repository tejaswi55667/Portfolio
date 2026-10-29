import { useEffect, useRef } from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { profile } from "@/config/portfolio";

export function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => e?.isIntersecting && (el.classList.add("is-visible"), io.disconnect()),
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-6xl px-6 py-24">
      <Reveal>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-primary-glow">{eyebrow}</p>
        <h2 className="mb-12 font-display text-3xl font-semibold tracking-tight md:text-5xl">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}

export function SocialLinks({ className = "" }) {
  const links = [
    { href: profile.github, label: "GitHub", Icon: Github },
    { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
    { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
  ];
  return (
    <div className={`flex gap-3 ${className}`}>
      {links.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target={href.startsWith("http") ? "_blank" : undefined}
          rel="noreferrer"
          className="glass grid h-11 w-11 place-items-center rounded-full text-muted-foreground transition hover:-translate-y-0.5 hover:text-foreground hover:shadow-glow"
        >
          <Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

export const btnPrimary =
  "inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition hover:-translate-y-0.5 hover:brightness-110";
export const btnGhost =
  "glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-foreground transition hover:-translate-y-0.5 hover:border-primary/50";
