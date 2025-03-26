'use client'

import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "../lib/utils";
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";

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
    <div className="w-full h-screen bg-black/[0.96] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
      />
      
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400"
          >
            {name}
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl font-medium text-gray-300 mb-6"
          >
            {title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-4 text-neutral-300 max-w-lg"
          >
            {description}
          </motion.p>
          <div className="flex flex-wrap items-center gap-2 md:gap-4">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.6,
                type: "spring",
                stiffness: 100
              }}
              onClick={onCtaClick}
              className="mt-4 md:mt-8 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-lg bg-white text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
            >
              {ctaText}
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.8,
                type: "spring",
                stiffness: 100
              }}
              onClick={() => window.open('https://github.com/andriantahiry2024', '_blank')}
              className="mt-4 md:mt-8 px-2 md:px-3 py-1 md:py-1.5 text-xs rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10 flex items-center gap-1 md:gap-2"
            >
              <Github className="w-3 h-3 md:w-4 md:h-4" />
              <span>Github</span>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 1,
                type: "spring",
                stiffness: 100
              }}
              onClick={() => window.open('https://linkedin.com/in/nomenahasina-andriantahiry', '_blank')}
              className="mt-4 md:mt-8 px-2 md:px-3 py-1 md:py-1.5 text-xs rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10 flex items-center gap-1 md:gap-2"
            >
              <Linkedin className="w-3 h-3 md:w-4 md:h-4" />
              <span>LinkedIn</span>
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 1.2,
                type: "spring",
                stiffness: 100
              }}
              onClick={() => window.location.href = 'mailto:contact@andriantahiry.dev'}
              className="mt-4 md:mt-8 px-2 md:px-3 py-1 md:py-1.5 text-xs rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10 flex items-center gap-1 md:gap-2"
            >
              <Mail className="w-3 h-3 md:w-4 md:h-4" />
              <span>Email</span>
            </motion.button>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
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
    </div>
  );
};

export default HeroSection;
