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
    <FadeIn className="mb-14">
      {eyebrow && (
        <div className="mb-3 flex items-center gap-2 text-sm font-medium text-accent">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {eyebrow}
        </div>
      )}
      <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight">{title}</h2>
      {subtitle && <p className="mt-4 max-w-lg text-muted">{subtitle}</p>}
    </FadeIn>
  );
}
