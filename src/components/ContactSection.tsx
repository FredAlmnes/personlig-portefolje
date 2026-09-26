import { person } from "@/data/content";
import FadeIn from "./FadeIn";

export default function ContactSection() {
  return (
    <section id="contact" data-voyage="16" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="relative overflow-hidden rounded-3xl border border-accent/30 bg-surface backdrop-blur-sm px-8 py-16 md:px-16 md:py-20 lg:px-12 lg:py-14 lg:max-w-[52%] shadow-[0_20px_60px_-30px_rgba(56,189,248,0.45)]">
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-accent/15 blur-3xl animate-float" />

          <div className="relative">
            <div className="mb-3 flex items-center gap-2 text-sm font-medium text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Kontakt
            </div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight mb-12 max-w-xl">
              Ta gjerne kontakt
            </h2>

            <div className="grid sm:grid-cols-3 lg:grid-cols-2 gap-8 border-t border-border pt-8">
              <a href={`mailto:${person.email}`} className="group">
                <div className="text-sm text-muted mb-2">E-post</div>
                <div className="font-display font-medium text-lg group-hover:text-accent transition-colors">
                  {person.email}
                </div>
              </a>
              <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="group">
                <div className="text-sm text-muted mb-2">Telefon</div>
                <div className="font-display font-medium text-lg group-hover:text-accent transition-colors">
                  {person.phone}
                </div>
              </a>
              <div>
                <div className="text-sm text-muted mb-2">Sted</div>
                <div className="font-display font-medium text-lg">{person.location}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-10">
              <a
                href={person.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent-fill text-white px-5 py-2.5 text-sm font-medium hover:bg-accent-fill-hover transition-colors"
              >
                GitHub
                <span aria-hidden>↗</span>
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-medium text-fg hover:border-accent hover:text-accent transition-colors"
              >
                LinkedIn
                <span aria-hidden>↗</span>
              </a>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
