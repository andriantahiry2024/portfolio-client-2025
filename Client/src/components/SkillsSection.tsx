import React, { useState, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate
} from "framer-motion";
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
  SiNextdotjs,
  SiPostgresql,
  SiPython, // Ajouté
  SiPhp     // Ajouté
} from "react-icons/si";
import { MdDesignServices } from "react-icons/md";

// --- Types ---
type CategoryType = "frontend" | "backend" | "design" | "tools";

interface Skill {
  name: string;
  level: number;
}

// --- Données ---
const skillsData: Record<CategoryType, Skill[]> = {
  frontend: [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Next.js", level: 85 },
  ],
  backend: [
    { name: "Node.js", level: 80 },
    { name: "Python", level: 75 },   // Ajouté
    { name: "PHP", level: 70 },      // Ajouté
    { name: "Express", level: 75 },
    { name: "MongoDB", level: 70 },
    { name: "GraphQL", level: 65 },
  ],
  design: [
    { name: "Figma", level: 85 },
    { name: "UI/UX Design", level: 80 },
    { name: "Photoshop", level: 60 },
    { name: "Illustrator", level: 50 },
  ],
  tools: [
    { name: "Git", level: 90 },
    { name: "Docker", level: 65 },
    { name: "PostgreSQL", level: 70 },
    { name: "CI/CD", level: 60 },
  ],
};

const categories: { id: CategoryType; label: string }[] = [
  { id: "frontend", label: "Apps Web & Mobiles" },
  { id: "backend", label: "IA & Automation" },
  { id: "design", label: "UI/UX & Branding" },
  { id: "tools", label: "Stacks & DevOps" },
];

const SkillsSection = () => {
  const [activeTab, setActiveTab] = useState<CategoryType>("frontend");

  // --- Mouse Follow Logic ---
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const backgroundStyle = useMotionTemplate`
    radial-gradient(
      650px circle at ${mouseX}px ${mouseY}px,
      rgba(120, 119, 198, 0.15),
      transparent 80%
    )
  `;

  // --- Icons ---
  const getSkillIcon = useMemo(() => (skillName: string) => {
    const iconClass = "w-6 h-6 transition-transform duration-300 group-hover:scale-110";
    const icons: { [key: string]: React.ReactNode } = {
      // Frontend
      "React": <FaReact className={`${iconClass} text-[#61DAFB]`} />,
      "TypeScript": <SiTypescript className={`${iconClass} text-[#3178C6]`} />,
      "Tailwind CSS": <SiTailwindcss className={`${iconClass} text-[#06B6D4]`} />,

      // Backend
      "Node.js": <FaNodeJs className={`${iconClass} text-[#339933]`} />,
      "Python": <SiPython className={`${iconClass} text-[#3776AB]`} />, // Bleu Python
      "PHP": <SiPhp className={`${iconClass} text-[#777BB4]`} />,       // Violet PHP
      "MongoDB": <SiMongodb className={`${iconClass} text-[#47A248]`} />,
      "GraphQL": <SiGraphql className={`${iconClass} text-[#E10098]`} />,

      // Design & Tools
      "Figma": <FaFigma className={`${iconClass} text-[#F24E1E]`} />,
      "UI/UX Design": <MdDesignServices className={`${iconClass} text-[#FF69B4]`} />,
      "Git": <FaGitAlt className={`${iconClass} text-[#F05032]`} />,
      "Docker": <FaDocker className={`${iconClass} text-[#2496ED]`} />,
      "PostgreSQL": <SiPostgresql className={`${iconClass} text-[#336791]`} />,

      // Adaptatifs (Noir/Blanc selon le thème)
      "Next.js": <SiNextdotjs className={`${iconClass} text-black dark:text-white`} />,
      "Express": <SiExpress className={`${iconClass} text-black dark:text-white`} />,
      "CI/CD": <FaGitAlt className={`${iconClass} text-gray-600 dark:text-gray-400`} />,
    };
    return icons[skillName] || <MdDesignServices className={`${iconClass} text-black dark:text-white`} />;
  }, []);

  return (
    <section
      className="py-16 bg-transparent relative overflow-hidden group/section"
      onMouseMove={handleMouseMove}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Mouse Spotlight Effect */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover/section:opacity-100"
        style={{ background: backgroundStyle }}
      />

      <div className="container px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight text-foreground">
              Nos Expertises
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-[600px] mx-auto text-lg">
              Des solutions technologiques de pointe pour propulser votre business au niveau supérieur.
            </p>
          </motion.div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          <div className="p-1.5 rounded-full bg-gray-200/50 dark:bg-white/5 backdrop-blur-md border border-gray-200 dark:border-white/10 flex flex-wrap justify-center gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`
                  relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 z-20
                  ${activeTab === cat.id ? "text-white" : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"}
                `}
              >
                {activeTab === cat.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-foreground rounded-full -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className={activeTab === cat.id ? "text-background" : ""}>
                  {cat.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="max-w-5xl mx-auto min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-5"
            >
              {skillsData[activeTab].map((skill, index) => (
                <SkillCard
                  key={skill.name}
                  skill={skill}
                  icon={getSkillIcon(skill.name)}
                  index={index}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

// --- Composant Individuel Carte ---
const SkillCard = ({ skill, icon, index }: { skill: Skill, icon: React.ReactNode, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="group relative"
    >
      <div className="
          relative overflow-hidden rounded-2xl p-6 h-full
          bg-white/50 dark:bg-[#121212]/50 
          border border-gray-200 dark:border-white/5
          hover:border-purple-500/30 dark:hover:border-purple-500/30
          transition-colors duration-500 backdrop-blur-sm
        ">
        <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-500/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

        <div className="relative z-10 flex flex-col justify-center h-full gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="
                          w-12 h-12 flex items-center justify-center rounded-xl
                          bg-gray-100 dark:bg-[#1A1A24] 
                          border border-gray-200 dark:border-white/5
                          group-hover:scale-105 transition-transform duration-300
                          shadow-sm
                        ">
                {icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900 dark:text-white/90">{skill.name}</h3>
                <span className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase">Expertise</span>
              </div>
            </div>
            <div className="text-right">
              <span className="block text-2xl font-bold text-gray-900 dark:text-white">{skill.level}%</span>
            </div>
          </div>

          <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400"
              initial={{ width: 0 }}
              animate={{ width: `${skill.level}%` }}
              transition={{ duration: 1.2, delay: 0.2 + (index * 0.05), ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ repeat: Infinity, duration: 2, ease: "linear", repeatDelay: 1 }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SkillsSection;