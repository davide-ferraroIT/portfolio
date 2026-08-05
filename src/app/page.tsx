import HeroSection from '@/components/home/HeroSection';
import TopDivider from '@/components/home/TopDivider';
import AboutSection from '@/components/home/AboutSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ContactSection from '@/components/home/ContactSection';
import BottomDivider from '@/components/home/BottomDivider';


export default function Home() {
  return (
    <main>
      <HeroSection />
      <TopDivider />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <BottomDivider />
    </main>
  );
}