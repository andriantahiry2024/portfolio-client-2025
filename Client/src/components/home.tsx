import React, { useEffect, lazy, Suspense, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import TickerSection from "./TickerSection";
import FadeInView from "./FadeInView";

// Lazy load heavy components
const HeroSection = lazy(() => import("./HeroSection"));
const AboutSection = lazy(() => import("./AboutSection"));
const SkillsSection = lazy(() => import("./SkillsSection"));
const PassionsSection = lazy(() => import("./Passions"));
const SliderSection = lazy(() => import("./SliderSection"));
const ProjectsSection = lazy(() => import("./ProjectsSection"));
const Scene3D = lazy(() => import("./Scene3D"));
const AppointmentCalendar = lazy(() => import("./AppointmentCalendar"));
const ChatbotSection = lazy(() => import("./ChatbotSection"));
const ContactSection = lazy(() => import("./ContactSection"));

const HeroLoader3D = () => {
  const messages = [
    "[boot] initialisation du moteur 3d…",
    "[scene] chargement du robot portfolio…",
    "[ui] synchronisation des sections…",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setTimeout(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 1400); // ~1.4s par message
    return () => clearTimeout(id);
  }, [index]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative w-24 h-24">
        <motion.div
          className="absolute inset-0 rounded-[1.75rem] border border-white/10 bg-gradient-to-br from-white/10 to-white/5 shadow-[0_0_40px_rgba(0,0,0,0.8)]"
          style={{ transformStyle: "preserve-3d" }}
          animate={{
            rotateX: [15, -15, 15],
            rotateY: [-20, 20, -20],
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-3 rounded-2xl border border-white/20 bg-gradient-to-tr from-black via-neutral-900 to-neutral-800 flex items-center justify-center"
          animate={{ rotateZ: [0, 4, -4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.div
            className="w-8 h-8 rounded-full border border-white/40 bg-white/5"
            animate={{ scale: [1, 1.15, 1], rotate: [0, 360] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
        </motion.div>
        <motion.div
          className="absolute inset-0 rounded-full bg-white/10 blur-3xl"
          animate={{ opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Texte type "console" animé une ligne à la fois */}
      <div className="mt-4 h-[3rem] font-mono text-[11px] text-left text-white/70 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.p
            key={messages[index]}
            initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
            transition={{ duration: 0.6 }}
            className="uppercase tracking-[0.25em] text-white/60"
          >
            {messages[index]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

const Home = () => {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);
  const [isHeroLoaded, setIsHeroLoaded] = useState(false);

  useEffect(() => {
    // Scroll au top par défaut au chargement
    if (!window.location.hash) {
      window.scrollTo(0, 0);
      // Deuxième tentative après un court instant pour contrer les décalages de layout (lazy loading)
      const timeout = setTimeout(() => window.scrollTo(0, 0), 100);
      return () => clearTimeout(timeout);
    }

    // Scroll vers une section précise uniquement si un hash est présent
    const id = window.location.hash.substring(1);
    const element = document.getElementById(id);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 500); // Délai plus long pour attendre que les composants lazy-loadés soient prêts
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Loader global qui masque aussi la navbar tant que le Hero (robot) n'est pas prêt */}
      {!isHeroLoaded && (
        <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-start pt-32 bg-black">
          <HeroLoader3D />

        </div>
      )}

      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section with Parallax Effect */}
        <section id="home" className="relative h-screen">
          <Suspense fallback={<div className="h-screen w-full bg-black flex items-center justify-center"><HeroLoader3D /></div>}>
            <HeroSection onLoaded={() => setIsHeroLoaded(true)} />
          </Suspense>
          <motion.div
            style={{ opacity }}
            className="absolute inset-0 pointer-events-none"
          />
        </section>

        {/* About Section */}
        <section id="about">
          <Suspense fallback={<div className="py-20 text-center text-white/50">Chargement...</div>}>
            <FadeInView>
              <AboutSection />
            </FadeInView>
          </Suspense>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <Suspense fallback={<div className="py-20 text-center text-white/50">Chargement...</div>}>
            <FadeInView delay={0.1}>
              <SkillsSection />
            </FadeInView>
          </Suspense>
        </section>

        {/* Passion Section */}
        <section id="passion">
          <Suspense fallback={<div className="py-20 text-center text-white/50">Chargement...</div>}>
            <FadeInView delay={0.1}>
              <PassionsSection />
            </FadeInView>
          </Suspense>
        </section>

        {/* Slider Section */}
        <section id="interactive">
          <Suspense fallback={<div className="py-20 text-center text-white/50">Chargement...</div>}>
            <FadeInView delay={0.2} direction="right">
              <SliderSection />
            </FadeInView>
          </Suspense>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <Suspense fallback={<div className="py-20 text-center text-white/50">Chargement...</div>}>
            <FadeInView delay={0.1} direction="left">
              <ProjectsSection />
            </FadeInView>
          </Suspense>
        </section>

        {/* Appointment Calendar */}
        <section id="appointment" className="bg-gray-dark dark:bg-dark p-5">
          <Suspense fallback={<div className="py-20 text-center text-white/50">Chargement...</div>}>
            <FadeInView delay={0.1} direction="up">
              <AppointmentCalendar />
            </FadeInView>
          </Suspense>
        </section>

        {/* Chatbot Section (lazy load) */}
        <section id="chatbot">
          <Suspense
            fallback={
              <div className="py-16 px-4 text-center text-muted-foreground">
                Chargement de l’assistant virtuel...
              </div>
            }
          >
            <ChatbotSection />
          </Suspense>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <Suspense fallback={<div className="py-20 text-center text-white/50">Chargement...</div>}>
            <ContactSection />
          </Suspense>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
