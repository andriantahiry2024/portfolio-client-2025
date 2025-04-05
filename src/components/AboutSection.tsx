import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import LocationMap from "./LocationMap";
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
  SiPostgresql
} from "react-icons/si";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
  description?: string[];
  skills?: string[];
  experience?: {
    title: string;
    company: string;
    period: string;
    description: string;
  }[];
  education?: {
    degree: string;
    institution: string;
    year: string;
  }[];
}

const getSkillIcon = (skillName: string) => {
  const icons: { [key: string]: React.ReactNode } = {
    "React": <FaReact className="w-5 h-5 text-[#61DAFB]" />,
    "TypeScript": <SiTypescript className="w-5 h-5 text-[#3178C6]" />,
    "Node.js": <FaNodeJs className="w-5 h-5 text-[#339933]" />,
    "Tailwind CSS": <SiTailwindcss className="w-5 h-5 text-[#06B6D4]" />,
    "Next.js": <SiNextdotjs className="w-5 h-5 text-[#000000]" />,
    "GraphQL": <SiGraphql className="w-5 h-5 text-[#E10098]" />,
    "MongoDB": <SiMongodb className="w-5 h-5 text-[#47A248]" />,
    "PostgreSQL": <SiPostgresql className="w-5 h-5 text-[#336791]" />,
  };
  return icons[skillName] || null;
};

const AboutSection = ({
  title = "À propos de moi",
  subtitle = "Développeur Web Passionné",
  description = [
    "Je suis un développeur web full-stack avec une passion pour la création d'interfaces utilisateur élégantes et performantes.",
    "Avec plus de 5 ans d'expérience dans le développement web, j'ai travaillé sur divers projets allant des applications SPA aux sites e-commerce complexes.",
    "J'aime résoudre des problèmes complexes et apprendre constamment de nouvelles technologies pour améliorer mes compétences.",
  ],
  skills = [
    "React",
    "TypeScript",
    "Node.js",
    "Tailwind CSS",
    "Next.js",
    "GraphQL",
    "MongoDB",
    "PostgreSQL",
  ],
  experience = [
    {
      title: "Web Designer & Développeur Fullstack",
      company: "ADP/TTR | FREELANCE",
      period: "Septembre 2021 - Août 2023",
      description: "Refonte de sites e-commerce Shopify, développement d'applications avec React et EC2, intégration d'IA et automatisation avec Zapier.",
    },
    {
      title: "Développeur WordPress",
      company: "GOLFFANG | FREELANCE",
      period: "Janvier 2023 - Février 2023",
      description: "Conception avec Elementor, développement de thèmes, intégration d'OpenAI et chatbot IA.",
    },
    {
      title: "Web Designer",
      company: "UWANDZANI | FREELANCE",
      period: "Février 2019 - Juin 2019",
      description: "Création de designs et interfaces, intégration HTML/CSS/JavaScript, WordPress et Elementor.",
    },
    {
      title: "Agent Verbalisateur",
      company: "ARM MADAGASCAR",
      period: "Septembre 2018 - Octobre 2020",
      description: "Gestion d'équipes, coordination des opérations, reporting et gestion des matériels.",
    },
    {
      title: "Agent Marketing",
      company: "INTELCIA",
      period: "Septembre 2017 - Août 2018",
      description: "Responsable SAV et commercial, gestion des tickets clients et géolocalisation des commandes.",
    },
  ],
  education = [
    {
      degree: "Master en Informatique",
      institution: "Université de Technologie",
      year: "2018",
    },
    {
      degree: "Licence en Développement Web",
      institution: "Institut Supérieur du Digital",
      year: "2016",
    },
  ],
}: AboutSectionProps) => {
  return (
    <section id="about" className="py-20 bg-background w-full">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-2">{title}</h2>
          <p className="text-xl text-muted-foreground">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <div className="space-y-4">
              {description.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-muted-foreground leading-relaxed"
                >
                  {paragraph}
                </p>
              ))}
              <div className="mt-6 space-y-4">
                <Button variant="outline">
                  Télécharger CV
                </Button>
                <div className="w-full h-[300px] rounded-lg overflow-hidden">
                  <LocationMap />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="overflow-hidden border border-border/40 bg-background/60 backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">Compétences</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className={cn(
                        "px-3 py-1 rounded-full text-sm flex items-center gap-2",
                        "bg-primary/10 text-primary",
                      )}
                    >
                      {getSkillIcon(skill)}
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Expérience</h3>
                  <div className="space-y-4">
                    {experience.map((exp, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.1 * index,
                          type: "spring",
                          stiffness: 100
                        }}
                        className="border-l-2 border-primary/50 pl-4"
                      >
                        <motion.h4 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.1 * index + 0.1
                          }}
                          className="font-medium"
                        >
                          {exp.title}
                        </motion.h4>
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.1 * index + 0.2
                          }}
                          className="text-sm text-muted-foreground"
                        >
                          {exp.company} | {exp.period}
                        </motion.p>
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true, amount: 0.3 }}
                          transition={{
                            duration: 0.3,
                            delay: 0.1 * index + 0.3
                          }}
                          className="text-sm mt-1"
                        >
                          {exp.description}
                        </motion.p>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Formation</h3>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{
                          duration: 0.5,
                          delay: 0.1 * index,
                          type: "spring",
                          stiffness: 100
                        }}
                      >
                        <h4 className="font-medium">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground">
                          {edu.institution} | {edu.year}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
