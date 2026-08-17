import { person } from "@/data/content";
import FadeIn from "./FadeIn";

export default function ContactSection() {
  return (
    <section id="contact" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="relative overflow-hidden rounded-3xl bg-accent px-8 py-16 md:px-16 md:py-20 text-white">
          <div className="pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl animate-float" />

          <div className="relative">
            <div className="text-sm font-medium text-white/80 mb-3">Kontakt</div>
            <h2 className="font-display font-semibold text-3xl md:text-5xl tracking-tight mb-12 max-w-xl">
              Ta gjerne kontakt
            </h2>

            <div className="grid sm:grid-cols-3 gap-8 border-t border-white/20 pt-8">
              <a href={`mailto:${person.email}`} className="group">
                <div className="text-sm text-white/70 mb-2">E-post</div>
                <div className="font-display font-medium text-lg group-hover:underline">
                  {person.email}
                </div>
              </a>
              <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="group">
                <div className="text-sm text-white/70 mb-2">Telefon</div>
                <div className="font-display font-medium text-lg group-hover:underline">
                  {person.phone}
                </div>
              </a>
              <div>
                <div className="text-sm text-white/70 mb-2">Sted</div>
                <div className="font-display font-medium text-lg">{person.location}</div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-10">
              <a
                href={person.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                GitHub
                <span aria-hidden>↗</span>
              </a>
              <a
                href={person.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-white/30 px-5 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
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
