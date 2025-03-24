import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "../lib/utils";

interface HeroSectionProps {
  name?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  name = "Nomenahasina Andriantahiry",
  title = "Full Stack Developer",
  description = "Je crée des applications web modernes et performantes avec une attention particulière aux détails et à l'expérience utilisateur.",
  ctaText = "Voir mes projets",
  onCtaClick = () => console.log("CTA clicked"),
}: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen w-full bg-black flex flex-col justify-center items-center px-4 py-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none" />

      {/* Animated gradient accent */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] opacity-30" />

      <div className="container mx-auto max-w-4xl z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {name}
          </h1>

          <h2 className="text-xl md:text-2xl font-medium text-gray-300 mb-6">
            {title}
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mb-10 text-lg">
            {description}
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <Button
              onClick={onCtaClick}
              className="bg-white text-black hover:bg-gray-200 px-6 py-6 text-lg h-auto"
            >
              {ctaText}
            </Button>

            <div className="flex gap-4 mt-4 md:mt-0">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-700 text-gray-400 hover:text-white hover:border-white"
              >
                <Github className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-700 text-gray-400 hover:text-white hover:border-white"
              >
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-gray-700 text-gray-400 hover:text-white hover:border-white"
              >
                <Mail className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-gray-500 text-sm mb-2">Scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="h-6 w-6 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
