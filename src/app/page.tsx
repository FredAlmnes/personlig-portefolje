import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NowSection from "@/components/NowSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import StudySection from "@/components/StudySection";
import SkillsSection from "@/components/SkillsSection";
import GallerySection from "@/components/GallerySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import VoyageBackground from "@/components/VoyageBackground";

export default function Home() {
  return (
    <>
      <VoyageBackground />
      <Header />
      <main className="relative z-10">
        <Hero />
        <NowSection />
        <ProjectsSection />
        <ExperienceSection />
        <StudySection />
        <SkillsSection />
        <GallerySection />
        <ContactSection />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
