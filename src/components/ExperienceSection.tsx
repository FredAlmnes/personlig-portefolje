import { experience, type ExperienceCategory } from "@/data/content";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

const groups: { category: ExperienceCategory; label: string }[] = [
  { category: "Betalt", label: "Jobb" },
  { category: "Frivillig", label: "Verv" },
  { category: "Utdanning", label: "Utdanning" },
];

// Seilturen passerer bak denne lange seksjonen, så listen holder seg til
// venstre halvdel på brede skjermer og lar kartet synes til høyre.
export default function ExperienceSection() {
  return (
    <section id="experience" data-voyage="6" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="lg:max-w-[52%]">
          <SectionHeading eyebrow="Erfaring" title="Hva jeg har gjort" />

          <div className="on-map flex flex-col gap-14">
            {groups.map((group) => (
              <FadeIn key={group.category}>
                <h3 className="label mb-3">{group.label}</h3>
                <ol>
                  {experience
                    .filter((item) => item.category === group.category)
                    .map((item) => (
                      <li
                        key={item.role}
                        className="grid gap-x-6 gap-y-1 border-t border-border py-6 sm:grid-cols-[9rem_1fr]"
                      >
                        {item.period && (
                          <div className="font-mono text-xs text-faint sm:pt-1.5">{item.period}</div>
                        )}
                        <div className="sm:col-start-2">
                          <h4 className="font-serif text-lg font-normal">{item.role}</h4>
                          <div className="mt-1 text-sm text-muted">{item.place}</div>
                          {item.description && (
                            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                </ol>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
