"use client";

import { useEffect, useRef } from "react";

// Scroll-styrt seiltur (Oslo → Tenerife) som ligger fast bak innholdet.
// Motoren (d3-geo + topojson) og kartdataene lastes først etter at siden har
// rendret, så ingen av delene havner i hovedbundelen.
export default function VoyageBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let destroy: (() => void) | undefined;
    let cancelled = false;

    import("@/lib/voyage/engine").then(({ initVoyage }) => {
      if (!cancelled) destroy = initVoyage(el);
    });

    return () => {
      cancelled = true;
      destroy?.();
    };
  }, []);

  return (
    <div ref={ref} className="voyage-bg" aria-hidden="true">
      <canvas className="voyage-map" />
      <canvas className="voyage-overlay" />
    </div>
  );
}
