import { skillGroups } from "@/data/content";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

export default function SkillsSection() {
  return (
    <section id="skills" data-voyage="15" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="lg:max-w-[52%]">
          <SectionHeading eyebrow="Profil" title="Ferdigheter" />

          <FadeIn>
            <dl className="on-map grid gap-8 sm:grid-cols-2">
              {skillGroups.map((group) => (
                <div key={group.title} className="border-t border-border pt-4">
                  <dt className="label">{group.title}</dt>
                  <dd className="mt-2 text-fg">{group.items.join(" · ")}</dd>
                </div>
              ))}
            </dl>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
