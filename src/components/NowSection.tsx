import { nowCards } from "@/data/content";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

export default function NowSection() {
  return (
    <section id="now" className="border-t border-border py-24 bg-bg-alt">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="August 2026" title="Hva jeg driver med akkurat nå." />

        <div className="grid md:grid-cols-3 gap-6">
          {nowCards.map((card, i) => (
            <FadeIn key={card.title} delay={i * 0.12}>
              <div className="h-full rounded-2xl border border-border bg-white p-8 hover:border-accent/40 hover:shadow-[0_8px_30px_-12px_rgba(14,165,233,0.25)] transition-all">
                <div className="text-xs font-medium uppercase tracking-widest text-accent mb-4">
                  {card.eyebrow}
                </div>
                <h3 className="font-display font-semibold text-xl mb-3">{card.title}</h3>
                <p className="text-muted leading-relaxed">{card.description}</p>
                <div className="mt-5 text-sm text-muted/70">{card.since}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
