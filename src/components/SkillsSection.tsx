import React, { useCallback, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  FaReact,
  FaNodeJs,
  FaDocker,
  FaGitAlt,
  FaFigma
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiExpress,
  SiMongodb,
  SiGraphql,
  SiNextdotjs
} from "react-icons/si";
import { MdDesignServices } from "react-icons/md";
import { motion, useInView, Variants, useAnimation, MotionProps } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  category: "frontend" | "backend" | "design" | "tools";
}

interface SkillsSectionProps {
  title?: string;
  description?: string;
}

const skills = {
  frontend: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Next.js", level: 85 },
  ],
  backend: [
    { name: "Node.js", level: 80 },
    { name: "Express", level: 75 },
    { name: "MongoDB", level: 70 },
    { name: "GraphQL", level: 70 },
  ],
  design: [
    { name: "Figma", level: 85 },
    { name: "UI/UX Design", level: 80 },
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "Docker", level: 65 },
  ],
};

// Optimisation : Réduire la complexité des animations
const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 10
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

// Optimisation : Animations plus légères
const skillVariants: Variants = {
  hidden: { opacity: 0, x: -5 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  }
};

const SkillsSection = ({
  title = "Compétences",
  description = "Mes compétences techniques et mon niveau d'expertise",
}: SkillsSectionProps) => {
  // Optimisation : Memoize les icônes pour éviter les re-rendus inutiles
  const getSkillIcon = useMemo(() => (skillName: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      "React": <FaReact className="w-5 h-5 text-[#61DAFB]" />,
      "TypeScript": <SiTypescript className="w-5 h-5 text-[#3178C6]" />,
      "Tailwind CSS": <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" />,
      "Next.js": <SiNextdotjs className="w-5 h-5 text-[#000000] dark:text-white" />,
      "Node.js": <FaNodeJs className="w-5 h-5 text-[#339933]" />,
      "Express": <SiExpress className="w-5 h-5 text-[#000000] dark:text-white" />,
      "MongoDB": <SiMongodb className="w-5 h-5 text-[#47A248]" />,
      "GraphQL": <SiGraphql className="w-5 h-5 text-[#E10098]" />,
      "Figma": <FaFigma className="w-5 h-5 text-[#F24E1E]" />,
      "UI/UX Design": <MdDesignServices className="w-5 h-5 text-[#FF69B4]" />,
      "Git": <FaGitAlt className="w-5 h-5 text-[#F05032]" />,
      "Docker": <FaDocker className="w-5 h-5 text-[#2496ED]" />,
    };
    return icons[skillName] || null;
  }, []);

  // Composant optimisé pour la barre de compétence avec getSkillIcon passé en prop
  const AnimatedSkill = React.memo(({ skill, index }: { skill: { name: string; level: number }; index: number }) => {
    const [count, setCount] = React.useState(0);
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.5, margin: "50px" });

    // Optimisation : Animation plus efficace avec RAF
    React.useEffect(() => {
      if (!isInView) return;

      let rafId: number;
      const startTime = performance.now();
      const duration = 1000; // Réduit à 1 seconde

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        setCount(Math.floor(progress * skill.level));

        if (progress < 1) {
          rafId = requestAnimationFrame(animate);
        }
      };

      rafId = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(rafId);
    }, [isInView, skill.level]);

    const transformStyle = {
      transform: 'translate3d(0,0,0)',
      backfaceVisibility: 'hidden' as const,
      willChange: 'transform',
      contain: 'paint layout'
    };

    return (
      <motion.div
        ref={ref}
        className="space-y-4 mb-2"
        variants={skillVariants}
        custom={index}
        style={transformStyle}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              {getSkillIcon(skill.name)}
            </div>
            <span className="font-medium">{skill.name}</span>
          </div>
          <span className="text-sm bg-primary/10 text-primary font-bold px-2 py-0.5 rounded-full min-w-[40px] text-center">
            {count}%
          </span>
        </div>
        <div className="h-3 w-full bg-secondary/30 dark:bg-black/40 rounded-full overflow-hidden backdrop-blur-sm shadow-inner mt-2 mb-1 border border-border/10">
          <motion.div
            className="h-full bg-gradient-to-r from-primary/80 via-primary to-blue-500 relative rounded-full"
            initial={{ width: 0 }}
            animate={{ width: isInView ? `${skill.level}%` : 0 }}
            transition={{
              duration: 0.8,
              delay: index * 0.05,
              ease: "easeOut"
            }}
            style={{
              ...transformStyle,
              originX: 0,
              borderRadius: '9999px', // Assure que les bords sont arrondis
              boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)' // Ajoute un léger halo bleu
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
              animate={{ x: ["0%", "100%"] }}
              transition={{
                repeat: isInView ? Infinity : 0,
                repeatDelay: 1,
                duration: 1.5,
                ease: "easeInOut",
                delay: index * 0.1
              }}
              style={transformStyle}
            />
            {/* Point lumineux supprimé */}
          </motion.div>
        </div>
      </motion.div>
    );
  });

  // Optimisation : Memoization du SkillCard
  const SkillCard = React.memo(({ title, skills }: { title: string; skills: { name: string; level: number }[] }) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2, margin: "100px" });
    const controls = useAnimation();

    React.useEffect(() => {
      if (isInView) {
        controls.start("visible");
      }
    }, [isInView, controls]);

    return (
      <motion.div
        ref={ref}
        variants={cardVariants}
        initial="hidden"
        animate={controls}
      >
        <Card className="border border-border/40 bg-background/60 backdrop-blur-sm h-full hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 overflow-visible">
          <CardHeader className="pb-2">
            <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-500/70">{title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 pt-2">
            {skills.map((skill, index) => (
              <AnimatedSkill
                key={skill.name}
                skill={skill}
                index={index}
              />
            ))}
          </CardContent>
        </Card>
      </motion.div>
    );
  });

  return (
    <section className="py-20 bg-gradient-to-b from-background to-background/80 relative overflow-hidden">
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute h-64 w-64 rounded-full bg-primary/30 blur-3xl -top-20 -left-20"></div>
        <div className="absolute h-64 w-64 rounded-full bg-blue-500/20 blur-3xl bottom-10 right-10"></div>
      </div>

      <div className="container px-4 md:px-6 relative z-10">
        <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
            <span className="text-sm text-primary/90 font-medium">Expertise technique</span>
          </div>

          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-[700px] mb-8 text-lg">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SkillCard title="Frontend" skills={skills.frontend} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SkillCard title="Backend" skills={skills.backend} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SkillCard title="Design" skills={skills.design} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <SkillCard title="Outils" skills={skills.tools} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
