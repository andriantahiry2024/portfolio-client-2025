import React, { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface Scene3DProps {
  className?: string;
}

const Scene3D = ({ className = "" }: Scene3DProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Transform values based on scroll
  const rotateX = useTransform(scrollYProgress, [0, 1], [15, -15]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [-15, 15]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.1, 0.9]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.6, 1, 1, 0.6],
  );

  // Cube faces colors
  const faceColors = [
    "bg-blue-500/80", // front
    "bg-red-500/80", // back
    "bg-green-500/80", // right
    "bg-yellow-500/80", // left
    "bg-purple-500/80", // top
    "bg-pink-500/80", // bottom
  ];

  return (
    <div
      ref={containerRef}
      className={`relative h-[50vh] md:h-[70vh] w-full flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/50 pointer-events-none z-10" />

      <motion.div
        style={{
          rotateX,
          rotateY,
          scale,
          opacity,
          perspective: 1000,
        }}
        className="relative w-64 h-64 md:w-80 md:h-80 preserve-3d"
      >
        {/* Cube */}
        <div className="relative w-full h-full transform-style-3d">
          {/* Front face */}
          <motion.div
            className={`absolute w-full h-full ${faceColors[0]} flex items-center justify-center text-white font-bold text-2xl border border-white/20 backdrop-blur-sm`}
            style={{ transform: "translateZ(10rem)" }}
            whileHover={{ scale: 1.05 }}
          >
            Front
          </motion.div>

          {/* Back face */}
          <motion.div
            className={`absolute w-full h-full ${faceColors[1]} flex items-center justify-center text-white font-bold text-2xl border border-white/20 backdrop-blur-sm`}
            style={{ transform: "rotateY(180deg) translateZ(10rem)" }}
            whileHover={{ scale: 1.05 }}
          >
            Back
          </motion.div>

          {/* Right face */}
          <motion.div
            className={`absolute w-full h-full ${faceColors[2]} flex items-center justify-center text-white font-bold text-2xl border border-white/20 backdrop-blur-sm`}
            style={{ transform: "rotateY(90deg) translateZ(10rem)" }}
            whileHover={{ scale: 1.05 }}
          >
            Right
          </motion.div>

          {/* Left face */}
          <motion.div
            className={`absolute w-full h-full ${faceColors[3]} flex items-center justify-center text-white font-bold text-2xl border border-white/20 backdrop-blur-sm`}
            style={{ transform: "rotateY(-90deg) translateZ(10rem)" }}
            whileHover={{ scale: 1.05 }}
          >
            Left
          </motion.div>

          {/* Top face */}
          <motion.div
            className={`absolute w-full h-full ${faceColors[4]} flex items-center justify-center text-white font-bold text-2xl border border-white/20 backdrop-blur-sm`}
            style={{ transform: "rotateX(90deg) translateZ(10rem)" }}
            whileHover={{ scale: 1.05 }}
          >
            Top
          </motion.div>

          {/* Bottom face */}
          <motion.div
            className={`absolute w-full h-full ${faceColors[5]} flex items-center justify-center text-white font-bold text-2xl border border-white/20 backdrop-blur-sm`}
            style={{ transform: "rotateX(-90deg) translateZ(10rem)" }}
            whileHover={{ scale: 1.05 }}
          >
            Bottom
          </motion.div>
        </div>
      </motion.div>

      <style jsx>{`
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
      `}</style>
    </div>
  );
};

export default Scene3D;
