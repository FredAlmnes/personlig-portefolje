import { person } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-border py-8">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm text-faint">
        <span>
          © {new Date().getFullYear()} {person.fullName}
        </span>
        <span>Bygget med Next.js</span>
      </div>
    </footer>
  );
}
