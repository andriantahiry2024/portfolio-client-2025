import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

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
      title: "Développeur Frontend Senior",
      company: "TechCorp",
      period: "2021 - Présent",
      description:
        "Développement d'applications web modernes avec React et TypeScript.",
    },
    {
      title: "Développeur Full Stack",
      company: "WebSolutions",
      period: "2018 - 2021",
      description: "Création de solutions web complètes pour divers clients.",
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
              <div className="mt-6">
                <Button variant="outline" className="mt-4">
                  Télécharger CV
                </Button>
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
                        "px-3 py-1 rounded-full text-sm",
                        "bg-primary/10 text-primary",
                      )}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Expérience</h3>
                  <div className="space-y-4">
                    {experience.map((exp, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-primary/50 pl-4"
                      >
                        <h4 className="font-medium">{exp.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {exp.company} | {exp.period}
                        </p>
                        <p className="text-sm mt-1">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Formation</h3>
                  <div className="space-y-4">
                    {education.map((edu, index) => (
                      <div key={index}>
                        <h4 className="font-medium">{edu.degree}</h4>
                        <p className="text-sm text-muted-foreground">
                          {edu.institution} | {edu.year}
                        </p>
                      </div>
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
