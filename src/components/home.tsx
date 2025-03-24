import React, { useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import SkillsSection from "./SkillsSection";
import ProjectsSection from "./ProjectsSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import TickerSection from "./TickerSection";
import BlogSection from "./BlogSection";
import SliderSection from "./SliderSection";
import Scene3D from "./Scene3D";

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
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section with Parallax Effect */}
      <section id="home" className="relative">
        <HeroSection
          name="John Doe"
          title="Full Stack Developer"
          description="Je crée des applications web modernes et performantes avec une attention particulière aux détails et à l'expérience utilisateur."
          ctaText="Voir mes projets"
          onCtaClick={() => {
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        />
        <motion.div
          style={{ opacity }}
          className="absolute inset-0 pointer-events-none"
        />
      </section>

      {/* Main Content */}
      <main>
        {/* Ticker Section */}
        <TickerSection />

        {/* About Section */}
        <section id="about">
          <AboutSection />
        </section>

        {/* 3D Scene */}
        <Scene3D />

        {/* Skills Section */}
        <section id="skills">
          <SkillsSection />
        </section>

        {/* Slider Section */}
        <section id="interactive">
          <SliderSection />
        </section>

        {/* Projects Section */}
        <section id="projects">
          <ProjectsSection
            title="Mes Projets"
            description="Voici quelques-uns de mes projets récents. Chacun a été soigneusement conçu avec une attention particulière aux détails et aux technologies modernes."
          />
        </section>

        {/* Blog Section */}
        <section id="blog">
          <BlogSection />
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
