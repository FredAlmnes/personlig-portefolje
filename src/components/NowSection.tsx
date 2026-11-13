import { nowCards } from "@/data/content";
import FadeIn from "./FadeIn";
import SectionHeading from "./SectionHeading";

export default function NowSection() {
  return (
    <section id="now" data-voyage="2" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="lg:max-w-[52%]">
          <SectionHeading eyebrow="August 2026" title="Akkurat nå" />

          <FadeIn className="on-map">
            <ul>
              {nowCards.map((card) => (
                <li key={card.title} className="border-t border-border py-6">
                  <div className="label">{card.eyebrow}</div>
                  <h3 className="mt-2 font-serif text-xl font-normal">{card.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{card.description}</p>
                  <div className="mt-3 font-mono text-xs text-faint">{card.since}</div>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
