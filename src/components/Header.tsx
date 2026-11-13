import { person } from "@/data/content";

const navLinks = [
  { href: "#now", label: "Nå" },
  { href: "#projects", label: "Prosjekter" },
  { href: "#experience", label: "Erfaring" },
  { href: "#study", label: "Studiet" },
  { href: "#skills", label: "Ferdigheter" },
  { href: "#bilder", label: "Bilder" },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-bg/70 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between gap-6">
        <a
          href="#top"
          className="font-serif text-base md:text-lg text-fg tracking-tight hover:text-accent transition-colors"
        >
          {person.fullName}
        </a>
        <nav className="hidden md:flex items-center gap-7 text-sm text-muted">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-fg transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        <a href="#contact" className="link shrink-0 text-sm">
          Ta kontakt
        </a>
      </div>
    </header>
  );
}
