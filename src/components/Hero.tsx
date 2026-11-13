import { person } from "@/data/content";
import FadeIn from "./FadeIn";

export default function Hero() {
  return (
    <section id="top" data-voyage="0" className="relative pt-16">
      <div className="mx-auto max-w-6xl px-6 min-h-[calc(88vh-4rem)] flex flex-col justify-center pt-24 pb-28">
        <div className="on-map lg:max-w-[52%]">
          <FadeIn>
            <p className="label">
              59°54′ N&nbsp;&nbsp;10°42′ Ø<span className="mx-2 text-faint">·</span>Oslo til Barbados
            </p>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="mt-6 font-serif font-normal text-5xl md:text-7xl leading-[1.02] tracking-tight text-balance">
              {person.firstName} {person.lastName}
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="mt-8 max-w-xl text-lg text-muted leading-relaxed">
              {person.title} i Trondheim. Digger AI, gode utfordringer og å ha et sideprosjekt
              gående til enhver tid.
            </p>
          </FadeIn>

          <FadeIn delay={0.24}>
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm">
              <a href="#projects" className="link">
                Prosjekter
              </a>
              <a href="#contact" className="link">
                Kontakt
              </a>
              <a href={person.github} target="_blank" rel="noopener noreferrer" className="link">
                GitHub <span aria-hidden>↗</span>
              </a>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
