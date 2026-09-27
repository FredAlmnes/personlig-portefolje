"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { gallery } from "@/data/content";

const INTERVAL = 4000; // ms mellom hvert bilde
const RESUME_AFTER = 8000; // ms pause etter at noen har bladd selv

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";
const reduceMotion = () => window.matchMedia(REDUCE_QUERY).matches;
function subscribeReduce(cb: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

// Filmstripe med CSS scroll-snap: sveip på mobil, piler og tastatur på desktop.
// Går automatisk rundt, men pauser ved hover, fokus, egen bla-ing, når den ikke
// synes på skjermen og for dem som har slått av animasjoner.
export default function PhotoCarousel() {
  const track = useRef<HTMLUListElement>(null);
  // null = brukeren har ikke valgt selv, da styrer systeminnstillingen
  const [choice, setChoice] = useState<boolean | null>(null);
  const reduced = useSyncExternalStore(subscribeReduce, reduceMotion, () => false);
  const playing = choice ?? !reduced;
  const hovered = useRef(false);
  const inView = useRef(false);
  const lastInteract = useRef(0);

  // Blar ett bilde fram eller tilbake, og hopper rundt i endene
  const step = useCallback((dir: -1 | 1) => {
    const el = track.current;
    if (!el) return;
    const items = Array.from(el.children) as HTMLElement[];
    const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4;
    let idx = 0;
    items.forEach((item, i) => { if (item.offsetLeft <= el.scrollLeft + 4) idx = i; });
    let next = idx + dir;
    if (dir > 0 && atEnd) next = 0;
    if (next < 0) next = items.length - 1;
    el.scrollTo({ left: items[next].offsetLeft, behavior: reduceMotion() ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { inView.current = e.isIntersecting; }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      const el = track.current;
      // Bare tastaturfokus på selve stripa pauser; knappene beholder fokus etter klikk
      const focused = el?.matches(":focus-visible");
      if (hovered.current || focused || !inView.current || document.hidden) return;
      if (Date.now() - lastInteract.current < RESUME_AFTER) return;
      step(1);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [playing, step]);

  const interact = () => { lastInteract.current = Date.now(); };

  const btn =
    "flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface text-fg backdrop-blur-sm transition-colors hover:border-accent hover:text-accent";

  return (
    <div
      className="relative"
      onMouseEnter={() => { hovered.current = true; }}
      onMouseLeave={() => { hovered.current = false; }}
    >
      <ul
        ref={track}
        tabIndex={0}
        aria-label="Bilder"
        onPointerDown={interact}
        onWheel={interact}
        onKeyDown={interact}
        className="relative flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 [scrollbar-width:thin] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent rounded-2xl"
      >
        {gallery.map((photo) => (
          <li key={photo.caption} className="snap-start shrink-0">
            <figure className="rounded-2xl border border-border bg-surface backdrop-blur-sm p-2">
              <Image
                src={photo.src}
                alt={photo.alt}
                placeholder="blur"
                sizes="(max-width: 768px) 80vw, 480px"
                className="h-72 md:h-80 w-auto rounded-xl object-cover"
              />
              <figcaption className="px-2 pt-3 pb-1 text-sm text-muted">{photo.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex gap-3">
        <button type="button" onClick={() => { interact(); step(-1); }} aria-label="Forrige bilde" className={btn}>
          <span aria-hidden>←</span>
        </button>
        <button type="button" onClick={() => { interact(); step(1); }} aria-label="Neste bilde" className={btn}>
          <span aria-hidden>→</span>
        </button>
        <button
          type="button"
          onClick={() => setChoice(!playing)}
          aria-label={playing ? "Stopp automatisk visning" : "Start automatisk visning"}
          aria-pressed={!playing}
          className={`${btn} ml-auto`}
        >
          <span aria-hidden className="text-xs">{playing ? "❚❚" : "▶"}</span>
        </button>
      </div>
    </div>
  );
}
