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
import AppointmentCalendar from "./AppointmentCalendar";
import ChatbotSection from "./ChatbotSection";
import FadeInView from "./FadeInView";

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
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Main Content */}
      <main>
        {/* Hero Section with Parallax Effect */}
        <section id="home" className="relative h-screen">
          <HeroSection />
          <motion.div
            style={{ opacity }}
            className="absolute inset-0 pointer-events-none"
          />
        </section>
        
        {/* About Section */}
        <section id="about">
          <FadeInView>
            <AboutSection />
          </FadeInView>
        </section>

        {/* Skills Section */}
        <section id="skills">
          <FadeInView delay={0.1}>
            <SkillsSection />
          </FadeInView>
        </section>

        {/* Slider Section */}
        <section id="interactive">
          <FadeInView delay={0.2} direction="right">
            <SliderSection />
          </FadeInView>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <FadeInView delay={0.1} direction="left">
            <ProjectsSection />
          </FadeInView>
        </section>

        {/* Blog Section */}
        <section id="blog">
          <FadeInView delay={0.2}>
            <BlogSection />
          </FadeInView>
        </section>

        {/* Appointment Calendar */}
        <section id="appointment" className="bg-gray-dark dark:bg-dark p-5">
          <FadeInView delay={0.1} direction="up">
            <AppointmentCalendar />
          </FadeInView>
        </section>
        
        {/* Chatbot Section */}
        <section id="chatbot">
          <FadeInView delay={0.2} direction="right">
            <ChatbotSection />
          </FadeInView>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <FadeInView delay={0.1} direction="up">
            <ContactSection />
          </FadeInView>
        </section>
      </main>

      <FadeInView delay={0.3} direction="none">
        <Footer />
      </FadeInView>
    </div>
  );
};

export default Home;
