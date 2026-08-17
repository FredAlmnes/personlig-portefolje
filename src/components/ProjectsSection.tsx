import { projects } from "@/data/content";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

export default function ProjectsSection() {
  return (
    <section id="projects" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          eyebrow="Prosjekter"
          title="Ting jeg bygger."
          subtitle="Sideprosjekt ved siden av studiene, jobb og verv."
        />

        <div className="grid gap-6">
          {projects.map((project, i) => (
            <FadeIn key={project.title} delay={i * 0.1}>
              <div className="rounded-2xl border border-border p-8 md:p-10 grid md:grid-cols-[1fr_auto] gap-8 items-start hover:border-accent/40 hover:shadow-[0_8px_30px_-12px_rgba(14,165,233,0.25)] transition-all">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="rounded-full bg-accent-soft text-accent px-3 py-1 text-xs font-medium">
                      {project.tag}
                    </span>
                    <span className="text-sm text-muted">{project.linkLabel}</span>
                  </div>
                  <h3 className="font-display font-semibold text-2xl md:text-3xl mb-4">{project.title}</h3>
                  <p className="text-muted max-w-xl mb-6 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-border px-3 py-1 text-xs text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent text-white px-5 py-3 text-sm font-medium hover:bg-sky-600 transition-colors h-fit whitespace-nowrap"
                >
                  {project.cta}
                  <span aria-hidden>↗</span>
                </a>
              </div>
            </FadeIn>
          ))}

          <FadeIn delay={projects.length * 0.1}>
            <div className="rounded-2xl border border-dashed border-border p-8 md:p-10 text-muted">
              <div className="text-xs font-medium uppercase tracking-widest text-muted mb-3">
                Under arbeid
              </div>
              <p className="max-w-xl">
                Neste prosjekt er på vei — kommer hit så snart det er klart til å vises frem.
              </p>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
