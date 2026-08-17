import Header from "@/components/Header";
import Hero from "@/components/Hero";
import NowSection from "@/components/NowSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import StudySection from "@/components/StudySection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <NowSection />
        <ProjectsSection />
        <ExperienceSection />
        <StudySection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
