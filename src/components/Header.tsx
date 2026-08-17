const navLinks = [
  { href: "#now", label: "Nå" },
  { href: "#projects", label: "Prosjekter" },
  { href: "#experience", label: "Erfaring" },
  { href: "#study", label: "Studiet" },
  { href: "#skills", label: "Ferdigheter" },
];

export default function Header() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border bg-white/80 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 text-sm text-muted">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white font-display font-bold text-sm">
            FA
          </span>
          <span className="hidden sm:inline">Fredrik Almnes</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-fg transition-colors">
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="rounded-full bg-accent text-white px-4 py-2 text-sm font-medium hover:bg-sky-600 transition-colors"
        >
          Ta kontakt
        </a>
      </div>
    </header>
  );
}
