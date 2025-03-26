import React from "react";
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

const getSkillIcon = (skillName: string) => {
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
};

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

// Animations pour les cartes
const cardVariants: Variants = {
  hidden: { 
    opacity: 0,
    y: 20 
  },
  visible: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.2 // Délai entre chaque enfant
    }
  }
};

// Animations pour chaque barre de compétence
const skillVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.3,
      ease: "easeInOut"
    }
  }
};

// Animations pour la barre de progression
const progressVariants = (level: number): Variants => ({
  hidden: { width: "0%" },
  visible: { 
    width: `${level}%`,
    transition: { 
      duration: 1.5,
      ease: [0.34, 1.56, 0.64, 1], // Effet rebond
    }
  }
});

// Composant pour une barre de compétence animée
const AnimatedSkill = ({ skill, index }: { skill: { name: string; level: number }; index: number }) => {
  const [count, setCount] = React.useState(0);
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.8 });
  
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isInView) {
      interval = setInterval(() => {
        setCount((prev) => {
          if (prev < skill.level) {
            return prev + 1;
          }
          clearInterval(interval);
          return prev;
        });
      }, 15); // Vitesse du compteur
    } else {
      setCount(0);
    }
    return () => clearInterval(interval);
  }, [isInView, skill.level]);

  return (
    <motion.div
      ref={ref}
      className="space-y-2"
      variants={skillVariants}
      custom={index}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          {getSkillIcon(skill.name)}
          <span className="font-medium">{skill.name}</span>
        </div>
        <motion.span 
          className="text-sm text-muted-foreground font-bold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {count}%
        </motion.span>
      </div>
      <div className="h-2 w-full bg-secondary/30 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-primary/80 to-primary relative"
          initial={{ width: 0 }}
          animate={{ 
            width: isInView ? `${skill.level}%` : 0,
          }}
          transition={{ 
            duration: 1.5, 
            delay: index * 0.2,
            ease: [0.34, 1.56, 0.64, 1] // Animation avec rebond
          }}
        >
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ["0%", "100%"],
            }}
            transition={{
              repeat: isInView ? Infinity : 0,
              repeatDelay: 1,
              duration: 1.2,
              ease: "easeInOut",
              delay: index * 0.2 + 1.5,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

// Composant pour une carte de compétences
const SkillCard = ({ title, skills }: { title: string; skills: { name: string; level: number }[] }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
  
  React.useEffect(() => {
    if (isInView) {
      controls.start("visible");
    } else {
      controls.start("hidden");
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
    >
      <Card className="border border-border/40 bg-background/60 backdrop-blur-sm h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
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
};

const SkillsSection = ({
  title = "Compétences",
  description = "Mes compétences techniques et mon niveau d'expertise",
}: SkillsSectionProps) => {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-muted-foreground max-w-[700px] mb-8">
            {description}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillCard title="Frontend" skills={skills.frontend} />
          <SkillCard title="Backend" skills={skills.backend} />
          <SkillCard title="Design" skills={skills.design} />
          <SkillCard title="Tools" skills={skills.tools} />
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
