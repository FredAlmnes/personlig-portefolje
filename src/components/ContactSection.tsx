import { person } from "@/data/content";
import FadeIn from "./FadeIn";

export default function ContactSection() {
  return (
    <section id="contact" data-voyage="17" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <FadeIn className="on-map lg:max-w-[52%]">
          <div className="label mb-3">Kontakt</div>
          <h2 className="font-serif text-3xl font-normal tracking-tight md:text-5xl">Ta gjerne kontakt</h2>

          <a href={`mailto:${person.email}`} className="link mt-10 inline-block font-serif text-2xl md:text-3xl">
            {person.email}
          </a>

          <div className="mt-6 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm text-muted">
            <span>
              <a href={`tel:${person.phone.replace(/\s/g, "")}`} className="link">
                {person.phone}
              </a>
              <span aria-hidden className="mx-2 text-faint">
                ·
              </span>
              {person.location}
            </span>
            <a href={person.github} target="_blank" rel="noopener noreferrer" className="link">
              GitHub
              <span aria-hidden> ↗</span>
            </a>
            <a href={person.linkedin} target="_blank" rel="noopener noreferrer" className="link">
              LinkedIn
              <span aria-hidden> ↗</span>
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
