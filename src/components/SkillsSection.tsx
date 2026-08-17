import { profile, skillGroups } from "@/data/content";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

export default function SkillsSection() {
  return (
    <section id="skills" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-16">
          <div>
            <SectionHeading eyebrow="Profil" title="Ferdigheter." />
            <FadeIn>
              <p className="text-muted max-w-md leading-relaxed">{profile}</p>
            </FadeIn>
          </div>

          <div className="grid sm:grid-cols-2 gap-8">
            {skillGroups.map((group, i) => (
              <FadeIn key={group.title} delay={i * 0.08}>
                <div className="text-sm font-medium text-accent mb-3">{group.title}</div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-border bg-bg-alt px-3.5 py-1.5 text-sm text-fg hover:border-accent hover:text-accent transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
