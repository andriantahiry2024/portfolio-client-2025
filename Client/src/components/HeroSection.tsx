'use client'

import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { SplineScene } from "@/components/ui/spline";

interface HeroSectionProps {
  name?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  onLoaded?: () => void;
}

const HeroSection = ({
  name = "ANDRIANTAHIRY NOMENAHASINA",
  title = "Full Stack Developer",
  description = "Développeur polyvalent passionné par la création d'applications web complètes, pas vraiment un pro et actuellement en quête de spécialisation pour approfondir mon expertise et maximiser mon impact.",
  ctaText = "Voir mes projets",
  onCtaClick = () => console.log("CTA clicked"),
  onLoaded,
}: HeroSectionProps) => {
  return (
    <div className="w-full h-screen bg-black overflow-hidden relative flex items-center">
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left content */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-block"
            >
              <span className="text-sm text-gray-400 bg-gray-900/50 px-4 py-2 rounded-full border border-gray-800">
                Bienvenue sur mon portfolio 👋
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
            >
              {name}
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl md:text-3xl font-semibold text-yellow-500"
            >
              {title}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-400 text-base md:text-lg max-w-2xl leading-relaxed"
            >
              {description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 pt-4"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    onClick={onCtaClick}
                    className="bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                  >
                    Me contacter
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem
                    onClick={() => {
                      const el = document.getElementById("appointment");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Prendre rendez-vous
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      const el = document.getElementById("contact");
                      if (el) {
                        el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                  >
                    Me contacter directement
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => window.open('https://github.com/andriantahiry2024', '_blank')}
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-800"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={() => window.open('https://linkedin.com/in/nomenahasina-andriantahiry', '_blank')}
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-800"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={() => window.location.href = 'mailto:contact@andriantahiry.dev'}
                  className="w-10 h-10 rounded-full bg-gray-900 hover:bg-gray-800 flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-800"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5 text-white" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right content - Spline 3D Robot */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block relative h-[600px]"
          >
            <SplineScene
              scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
              className="w-full h-full"
              allowScroll={true}
              onLoad={onLoaded}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center"
      >
        <span className="text-gray-500 text-sm mb-2">Défiler</span>
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
