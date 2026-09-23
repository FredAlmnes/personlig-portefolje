import { experience } from "@/data/content";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

const categoryStyles: Record<string, string> = {
  Betalt: "bg-accent-soft text-accent",
  Frivillig: "bg-ok-soft text-ok",
  Utdanning: "bg-edu-soft text-edu",
};

// Ingen boks her: seilturen passerer bak denne lange seksjonen, så tidslinjen
// holder seg til venstre halvdel på brede skjermer og lar kartet synes til høyre.
export default function ExperienceSection() {
  return (
    <section
      id="experience"
      data-voyage="6"
      className="border-t border-border py-24 lg:bg-[linear-gradient(to_right,color-mix(in_srgb,var(--bg)_85%,transparent)_0%,color-mix(in_srgb,var(--bg)_55%,transparent)_40%,transparent_58%)]"
    >
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="Erfaring" title="Hva jeg har gjort." />

        <div className="on-map relative border-l border-border pl-8 md:pl-10 flex flex-col gap-10 lg:max-w-[52%]">
          {experience.map((item, i) => (
            <FadeIn key={item.role} delay={Math.min(i * 0.06, 0.4)} className="relative">
              <span className="absolute -left-[calc(2rem+5px)] md:-left-[calc(2.5rem+5px)] top-1.5 h-2.5 w-2.5 rounded-full bg-accent ring-4 ring-bg" />
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium backdrop-blur-sm ${categoryStyles[item.category]}`}
                >
                  {item.category}
                </span>
                {item.period && <span className="text-sm text-muted">{item.period}</span>}
              </div>
              <h3 className="font-display font-semibold text-lg">{item.role}</h3>
              <div className="text-sm text-muted mt-1">{item.place}</div>
              {item.description && (
                <p className="text-sm text-muted mt-3 leading-relaxed max-w-xl">{item.description}</p>
              )}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
