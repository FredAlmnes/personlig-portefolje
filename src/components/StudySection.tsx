import { studyPlan } from "@/data/content";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

export default function StudySection() {
  return (
    <section id="study" data-voyage="12" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="NTNU · MTDT"
          title="Studiet."
          subtitle="16 obligatoriske fag over de to første studieårene, felles for alle på datateknologi."
        />

        <div className="flex flex-col gap-16 lg:max-w-[52%]">
          {studyPlan.map((year, yi) => (
            <div key={year.year}>
              <FadeIn delay={yi * 0.1}>
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="font-display font-semibold text-2xl">{year.year}</h3>
                  <span className="text-sm text-muted">{year.period}</span>
                  <span
                    className={`ml-auto rounded-full px-3 py-1 text-xs font-medium ${
                      year.status === "Fullført"
                        ? "bg-ok-soft text-ok"
                        : "bg-accent-soft text-accent"
                    }`}
                  >
                    {year.status}
                  </span>
                </div>
              </FadeIn>

              <div className="grid md:grid-cols-2 gap-6">
                {year.semesters.map((semester, si) => (
                  <FadeIn key={semester.term} delay={yi * 0.1 + si * 0.1}>
                    <div className="h-full rounded-2xl border border-border bg-surface backdrop-blur-sm p-6">
                      <div className="flex items-baseline justify-between mb-4">
                        <div className="font-display font-medium">{semester.term}</div>
                        <div className="text-sm text-muted">{semester.credits} sp</div>
                      </div>
                      <ul className="flex flex-col gap-3">
                        {semester.courses.map((course) => (
                          <li key={course.code} className="flex items-baseline gap-3 text-sm">
                            <span className="font-mono text-xs text-accent shrink-0">{course.code}</span>
                            <span className="text-muted">{course.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
