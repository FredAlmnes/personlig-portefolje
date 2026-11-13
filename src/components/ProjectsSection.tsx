import { projects } from "@/data/content";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

export default function ProjectsSection() {
  return (
    <section id="projects" data-voyage="3" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="lg:max-w-[52%]">
          <SectionHeading
            eyebrow="Prosjekter"
            title="Ting jeg bygger"
            subtitle="Sideprosjekt ved siden av studiene, jobb og verv."
          />

          <div className="on-map">
            {projects.map((project) => (
              <FadeIn key={project.title} className="border-t border-border py-8">
                <article>
                  <div className="label">
                    {project.tag} · {project.linkLabel}
                  </div>
                  <h3 className="mt-3 font-serif text-2xl font-normal md:text-3xl">{project.title}</h3>
                  <p className="mt-4 max-w-xl leading-relaxed text-muted">{project.description}</p>
                  <p className="mt-4 font-mono text-xs text-faint">{project.stack.join(" · ")}</p>
                  <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="link">
                      {project.cta}
                      <span aria-hidden> ↗</span>
                    </a>
                    {project.repo && (
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" className="link">
                        Se koden
                        <span aria-hidden> ↗</span>
                      </a>
                    )}
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
