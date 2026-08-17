import { person, stats } from "@/data/content";
import AnimatedWords from "./AnimatedWords";
import FadeIn from "./FadeIn";

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-16">
      <div className="pointer-events-none absolute -top-24 -right-32 h-96 w-96 rounded-full bg-accent-soft blur-3xl animate-float" />
      <div className="pointer-events-none absolute top-40 -left-40 h-72 w-72 rounded-full bg-sky-100 blur-3xl animate-float-slow" />

      <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-20">
        <FadeIn>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-bg-alt px-4 py-1.5 text-sm text-muted mb-8">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            {person.short}
          </div>
        </FadeIn>

        <h1 className="font-display font-semibold leading-[1.05] text-4xl md:text-6xl tracking-tight max-w-3xl">
          <AnimatedWords text={`${person.firstName} ${person.lastName}`} delay={0.1} />
        </h1>

        <FadeIn delay={0.35}>
          <p className="mt-6 max-w-xl text-lg text-muted leading-relaxed">
            {person.title} i Trondheim. Bygger ting ved siden av studiet, jobber med kunder på dagtid,
            og leder verv på fritiden.
          </p>
        </FadeIn>

        <FadeIn delay={0.45}>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-6 py-3 text-sm font-medium hover:bg-sky-600 transition-colors"
            >
              Se hva jeg har bygd
              <span aria-hidden>→</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-fg hover:border-accent hover:text-accent transition-colors"
            >
              Ta kontakt
            </a>
          </div>
        </FadeIn>

        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-10">
          {stats.map((stat, i) => (
            <FadeIn key={stat.label} delay={0.1 * i}>
              <div className="font-display font-semibold text-3xl md:text-4xl text-accent">{stat.value}</div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
