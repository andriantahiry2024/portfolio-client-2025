'use client'

import { lazy, Suspense } from "react"; // Importer lazy et Suspense
import { motion } from "framer-motion";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ArrowDown, Linkedin, Mail } from "lucide-react";
// Charger SplineScene paresseusement
const SplineScene = lazy(() => import("@/components/ui/spline").then(module => ({ default: module.SplineScene })));
import { Spotlight } from "@/components/ui/spotlight";
// import { useTypedSpotlightEffect } from '@/hooks/useSpotlightEffect'; // Removed hook import

interface HeroSectionProps {
  name?: string;
  firstname?: string;
  title?: string;
  description?: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const HeroSection = ({
  name = "Andriantahiry",
  firstname = "Nomenahasina",
  title = "Full Stack Developer",
  description = "Je crée des applications web modernes et performantes avec une attention particulière aux détails et à l'expérience utilisateur.",
  ctaText = "Voir mes projets",
  onCtaClick = () => console.log("CTA clicked"),
}: HeroSectionProps) => {
  // Utiliser le hook générique avec le bon type pour chaque élément
  // Removed hook calls
  // const titleRef = useTypedSpotlightEffect<HTMLHeadingElement>();
  // const titleRef2 = useTypedSpotlightEffect<HTMLHeadingElement>();
  // const subtitleRef = useTypedSpotlightEffect<HTMLHeadingElement>();
  // const descriptionRef = useTypedSpotlightEffect<HTMLParagraphElement>();

  return (
    <div className="w-full h-screen bg-black overflow-hidden relative dark:bg-black" style={{ borderRadius: '50px' }}>
      {/* Ajout d'un effet de particules subtil */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute h-2 w-2 rounded-full bg-blue-400 animate-pulse" style={{ top: '10%', left: '20%', animationDelay: '0s' }}></div>
        <div className="absolute h-2 w-2 rounded-full bg-purple-400 animate-pulse" style={{ top: '30%', left: '80%', animationDelay: '0.5s' }}></div>
        <div className="absolute h-3 w-3 rounded-full bg-cyan-400 animate-pulse" style={{ top: '70%', left: '15%', animationDelay: '1s' }}></div>
        <div className="absolute h-2 w-2 rounded-full bg-indigo-400 animate-pulse" style={{ top: '40%', left: '40%', animationDelay: '1.5s' }}></div>
        <div className="absolute h-3 w-3 rounded-full bg-violet-400 animate-pulse" style={{ top: '80%', left: '60%', animationDelay: '2s' }}></div>
        <div className="absolute h-2 w-2 rounded-full bg-blue-400 animate-pulse" style={{ top: '20%', left: '70%', animationDelay: '2.5s' }}></div>
      </div>

      {/* Restore Spotlight to original position and remove extra classes */}
      <Spotlight size={900} />

      <div className="flex h-full relative rounded-xl overflow-hidden bg-black dark:bg-black">
        {/* Left content - with improved responsive sizing */}
        <div className="w-full md:flex-1 px-4 py-8 md:p-8 relative z-10 flex flex-col justify-center rounded-l-xl overflow-hidden bg-black dark:bg-black text-white"> {/* Remove pointer-events-none */}
          <div className="w-full max-w-[90%] sm:max-w-md md:max-w-lg">  {/* Improved container constraints */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-block px-3 py-1 mb-4 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 border border-purple-500/40 backdrop-blur-sm dark:from-purple-500/40 dark:to-blue-500/40 dark:border-purple-500/50">
              <span className="text-xs md:text-sm text-white font-medium dark:text-white">Développeur Full Stack</span>
            </motion.div>

            <motion.h1
              // ref removed
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight break-words hyphens-auto bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-200"
            >
              Andriantahiry
            </motion.h1>
            <motion.h1
              // ref removed
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl xs:text-4xl md:text-5xl lg:text-6xl text-white font-bold leading-tight break-words hyphens-auto bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-blue-200 mb-2"
            >
              Nomenahasina
            </motion.h1>
            <motion.h2
              // ref removed
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base xs:text-lg md:text-xl lg:text-2xl font-medium text-gray-600 dark:text-gray-100 mb-3 md:mb-6"
            >
              {title}
            </motion.h2>
            <motion.p
              // ref removed
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm xs:text-base md:text-lg text-neutral-300 break-words max-w-md leading-relaxed"
            >
              {description}
            </motion.p>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-4 mt-6 md:mt-8">
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: 0.6,
                type: "spring",
                stiffness: 100
              }}
              onClick={onCtaClick}
              className="px-5 md:px-8 py-2.5 md:py-3.5 text-sm md:text-base rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 hover:scale-105 transform"
            >
              {ctaText}
            </motion.button>

            <div className="flex gap-3 md:gap-4 mt-4">
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.8
                }}
                onClick={() => window.open('https://github.com/andriantahiry2024', '_blank')}
                className="p-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/10 flex items-center justify-center"
                aria-label="Github"
              >
                <GitHubLogoIcon className="w-5 h-5" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 0.9
                }}
                onClick={() => window.open('https://linkedin.com/in/nomenahasina-andriantahiry', '_blank')}
                className="p-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/10 flex items-center justify-center"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  delay: 1.0
                }}
                onClick={() => window.location.href = 'mailto:contact@andriantahiry.dev'}
                className="p-2.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/10 flex items-center justify-center"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative hidden md:block rounded-r-xl overflow-hidden bg-black dark:bg-black"> {/* Remove pointer-events-none */}
          {/* Conditionally render SplineScene only on md+ screens */}
          {/* TODO: Replace this with a proper useMediaQuery hook */}
          {typeof window !== 'undefined' && window.innerWidth >= 768 && (
            <div className="absolute inset-0 z-10">
              <Suspense fallback={<div className="w-full h-full flex items-center justify-center text-white">Chargement de la scène 3D...</div>}>
                <SplineScene
                  scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                  className="w-full h-full"
                  allowScroll={true}
                />
              </Suspense>
            </div>
          )}
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






