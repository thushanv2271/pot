import { AmbientBackground } from "@/components/ambient-background";
import { CursorGlow } from "@/components/cursor-glow";
import { ScrollProgress } from "@/components/scroll-progress";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Statement } from "@/components/statement";
import { About } from "@/components/about";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Experience } from "@/components/experience";
import { Achievements } from "@/components/achievements";
import { TechWall } from "@/components/tech-wall";
import { GithubStats } from "@/components/github-stats";
import { Testimonials } from "@/components/testimonials";
import { KineticDivider } from "@/components/kinetic-divider";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <AmbientBackground />
      <CursorGlow />
      <ScrollProgress />
      {/* fades content that scrolls past the floating nav island */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-16 bg-gradient-to-b from-void via-void/70 to-transparent sm:h-24"
      />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <Statement />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Achievements />
        <TechWall />
        <GithubStats />
        <Testimonials />
        <KineticDivider />
        <Contact />
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </>
  );
}
