import { studyPlan } from "@/data/content";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

// Norsk desimalkomma: 37.5 -> "37,5"
const formatCredits = (credits: number) => String(credits).replace(".", ",");

export default function StudySection() {
  return (
    <section id="study" data-voyage="12" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="lg:max-w-[52%]">
          <SectionHeading
            eyebrow="NTNU · MTDT"
            title="Studiet"
            subtitle="16 obligatoriske fag over de to første studieårene, felles for alle på datateknologi."
          />

          <div className="on-map flex flex-col gap-16">
            {studyPlan.map((year) => (
              <FadeIn key={year.year}>
                <div className="mb-6 flex items-baseline gap-3">
                  <h3 className="font-serif text-2xl font-normal">{year.year}</h3>
                  <span className="font-mono text-xs text-muted">{year.period}</span>
                  <span className="ml-auto text-sm text-faint">{year.status}</span>
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                  {year.semesters.map((semester) => (
                    <div key={semester.term}>
                      <div className="flex items-baseline justify-between pb-2">
                        <h4 className="text-sm font-medium">{semester.term}</h4>
                        <span className="font-mono text-xs text-faint">
                          {formatCredits(semester.credits)} sp
                        </span>
                      </div>
                      <ul className="border-t border-border">
                        {semester.courses.map((course) => (
                          <li
                            key={course.code}
                            className="flex items-baseline gap-4 border-b border-border py-2 text-sm"
                          >
                            <span className="w-20 shrink-0 font-mono text-xs text-muted">{course.code}</span>
                            <span className="text-fg">{course.name}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
