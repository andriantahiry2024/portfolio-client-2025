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
          <AboutSection />
        </section>

        

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
          <ProjectsSection />
        </section>

        {/* Blog Section */}
        <section id="blog">
          <BlogSection />
        </section>

{/* Appointment Calendar */}
        <section id="appointment" className="bg-gray-dark dark:bg-dark p-5">
          <AppointmentCalendar />
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
