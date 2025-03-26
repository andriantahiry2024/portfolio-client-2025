'use client'

import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { cn } from "../lib/utils";
import { SplineScene } from "@/components/ui/spline";
import { Spotlight } from "@/components/ui/spotlight";
import { useTypedSpotlightEffect } from '@/hooks/useSpotlightEffect';

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
  // Utiliser le hook générique avec le bon type pour chaque élément
  const titleRef = useTypedSpotlightEffect<HTMLHeadingElement>();
  const subtitleRef = useTypedSpotlightEffect<HTMLHeadingElement>();
  const descriptionRef = useTypedSpotlightEffect<HTMLParagraphElement>();

  return (
    <div className="w-full h-screen bg-black/[0.96] overflow-hidden relative">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
      />
      
      <div className="flex h-full">
        {/* Left content - with improved sizing and width constraints */}
        <div className="flex-1 p-4 md:p-8 relative z-10 flex flex-col justify-center max-w-full">
          <div className="max-w-lg">  {/* Container to constrain text width */}
            <motion.h1 
              ref={titleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl lg:text-5xl text-white font-bold text-neutral-50 leading-tight"
            >
              {name}
            </motion.h1>
            <motion.h2 
              ref={subtitleRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl lg:text-2xl font-medium text-white mb-4 md:mb-6"
            >
              {title}
            </motion.h2>
            <motion.p 
              ref={descriptionRef}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm md:text-base text-neutral-300 max-w-md break-words"
            >
              {description}
            </motion.p>
          </div>
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mt-4">
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
              className="mt-2 md:mt-4 px-4 md:px-6 py-2 md:py-3 text-sm md:text-base rounded-lg bg-white text-black font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/20"
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
              className="mt-2 md:mt-4 px-2 md:px-3 py-1 md:py-1.5 text-xs rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10 flex items-center gap-1 md:gap-2"
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
              className="mt-2 md:mt-4 px-2 md:px-3 py-1 md:py-1.5 text-xs rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10 flex items-center gap-1 md:gap-2"
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
              className="mt-2 md:mt-4 px-2 md:px-3 py-1 md:py-1.5 text-xs rounded-md bg-white/10 hover:bg-white/20 text-white font-medium transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-white/10 flex items-center gap-1 md:gap-2"
            >
              <Mail className="w-3 h-3 md:w-4 md:h-4" />
              <span>Email</span>
            </motion.button>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative hidden md:block">
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
        className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-gray-500 text-xs md:text-sm mb-1 md:mb-2">Défiler</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ArrowDown className="h-4 w-4 md:h-6 md:w-6 text-gray-500" />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default HeroSection;






