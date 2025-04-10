import { useEffect, lazy, Suspense } from "react"; // Ajout de lazy et Suspense
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "./Navbar";
// Chargement paresseux des sections
const HeroSection = lazy(() => import("./HeroSection"));
const AboutSection = lazy(() => import("./AboutSection"));
const SkillsSection = lazy(() => import("./SkillsSection"));
const ProjectsSection = lazy(() => import("./ProjectsSection"));
const ContactSection = lazy(() => import("./ContactSection"));
const Footer = lazy(() => import("./Footer"));
const BlogSection = lazy(() => import("./BlogSection"));
const SliderSection = lazy(() => import("./SliderSection"));
const AppointmentCalendar = lazy(() => import("./AppointmentCalendar"));
const ChatbotSection = lazy(() => import("./ChatbotSection"));
const PassionsSection = lazy(() => import("./PassionsSection")); // Importer la nouvelle section
import FadeInView from "./FadeInView";

// Composant de fallback simple pour Suspense
const SectionLoader = () => <div className="min-h-[200px] flex items-center justify-center"><p>Chargement de la section...</p></div>;

const Home = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    // Scroll to section if URL has hash
    if (window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, []);

  return (
    <div className="min-h-screen home-component" style={{ backgroundColor: 'var(--background)' }}>
      <Navbar />

      {/* Main Content */}
      <main className="max-w-[1280px] mx-auto px-4">
        {/* Hero Section with Parallax Effect */}
        <section id="home" className="relative h-screen p-4 mb-8">
          <Suspense fallback={<SectionLoader />}>
            <HeroSection />
          </Suspense>
          <motion.div
            style={{ opacity }}
            className="absolute inset-0 pointer-events-none"
          />
        </section>

        {/* About Section */}
        <section id="about">
          <Suspense fallback={<SectionLoader />}>
            <FadeInView>
              <AboutSection />
          </FadeInView>
          </Suspense>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <Suspense fallback={<SectionLoader />}>
            <FadeInView delay={0.1}>
              <SkillsSection />
          </FadeInView>
          </Suspense>
        </section>

        {/* Slider Section */}
        <section id="interactive">
          <Suspense fallback={<SectionLoader />}>
            <FadeInView delay={0.2} direction="right">
              <SliderSection />
          </FadeInView>
          </Suspense>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <Suspense fallback={<SectionLoader />}>
            <FadeInView delay={0.1} direction="left">
              <ProjectsSection />
          </FadeInView>
          </Suspense>
        </section>

        {/* Blog Section */}
        <section id="blog">
          <Suspense fallback={<SectionLoader />}>
            <FadeInView delay={0.2}>
              <BlogSection />
          </FadeInView>
          </Suspense>
        </section>

        {/* Passions Section */}
        <section id="passions">
          <Suspense fallback={<SectionLoader />}>
            <PassionsSection />
          </Suspense>
        </section>

        {/* Appointment Calendar */}
        <section id="appointment" className="p-5" style={{ backgroundColor: 'var(--background)' }}>
          <Suspense fallback={<SectionLoader />}>
            <FadeInView delay={0.1} direction="up">
              <AppointmentCalendar />
          </FadeInView>
          </Suspense>
        </section>

        {/* Chatbot Section */}
        <section id="chatbot">
          {/* <FadeInView delay={0.2} direction="right"> {/* Temporairement supprimé pour tester le scroll */}
            <Suspense fallback={<SectionLoader />}>
              <ChatbotSection />
            </Suspense>
          {/* </FadeInView> */}
        </section>

        {/* Contact Section */}
        <section id="contact">
          {/* <FadeInView delay={0.1} direction="up"> {/* Temporairement supprimé pour tester le scroll */}
            <Suspense fallback={<SectionLoader />}>
              <ContactSection />
            </Suspense>
          {/* </FadeInView> */}
        </section>
      </main>

      <Suspense fallback={<SectionLoader />}>
        <FadeInView delay={0.3} direction="none">
          <Footer />
      </FadeInView>
      </Suspense>
    </div>
  );
};

export default Home;
