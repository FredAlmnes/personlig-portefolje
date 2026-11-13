import FadeIn from "./FadeIn";
import PhotoCarousel from "./PhotoCarousel";
import SectionHeading from "./SectionHeading";

// Båten krysser Atlanteren fra Tenerife (Ferdigheter, 15) til Barbados mens
// man scroller ned til bildene (16). Ved Kontakt (17) zoomer kartet ut til hele ruta.
export default function GallerySection() {
  return (
    <section id="bilder" data-voyage="16" className="border-t border-border py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="lg:max-w-[52%]">
          <SectionHeading
            eyebrow="Bilder"
            title="Litt utenfor pensum"
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
