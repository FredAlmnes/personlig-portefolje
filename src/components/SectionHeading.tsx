import FadeIn from "./FadeIn";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <FadeIn className="mb-12 on-map">
      {eyebrow && <p className="label mb-3">{eyebrow}</p>}
      <h2 className="font-serif font-normal text-3xl md:text-4xl tracking-tight text-fg">{title}</h2>
      {subtitle && <p className="mt-4 max-w-lg text-muted leading-relaxed">{subtitle}</p>}
    </FadeIn>
  );
}
