import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import { person } from "@/data/content";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: `${person.fullName} — datateknologi ved NTNU, Trondheim`,
  description: `${person.fullName}, datateknologistudent ved NTNU. Sideprosjekter, jobb og verv ved siden av studiene.`,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="no"
      data-theme="dark"
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-fg font-body">
        {children}
      </body>
    </html>
  );
}
