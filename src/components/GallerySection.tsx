import FadeIn from "./FadeIn";
import PhotoCarousel from "./PhotoCarousel";
import SectionHeading from "./SectionHeading";

// Ingen data-voyage her: kartet zoomer ut fra Tenerife til hele ruta
// mens man scroller forbi bildene, mellom Ferdigheter (15) og Kontakt (16).
export default function GallerySection() {
  return (
    <section id="bilder" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="lg:max-w-[52%]">
          <SectionHeading
            eyebrow="Bilder"
            title="Litt utenfor pensum."
            subtitle="Seilbåten, fjellet, Gründerjakten, Arrkom, familie og venner."
          />
          <FadeIn>
            <PhotoCarousel />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
