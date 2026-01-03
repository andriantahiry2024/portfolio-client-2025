import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import ProjectCard from "./ProjectCard";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  variant?: "default" | "social" | "nutrition";
}

interface ProjectsSectionProps {
  title?: string;
  description?: string;
  projects?: Project[];
}

const ProjectsSection = ({
  title = "Études de Cas",
  description = "Nos solutions technologiques en action. Découvrez comment nous transformons les défis complexes en succès mesurables pour nos clients.",
  projects = [
    {
      id: 1,
      title: "IA Automatisée - Secteur Immobilier",
      description:
        "Traitement intelligent des leads et automatisation des réponses. Gain de productivité : 40% sur le flux opérationnel.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
      technologies: ["n8n", "OpenAI", "Python", "Automation"],
      githubUrl: "",
      liveUrl: "#",
      category: "IA & Automation",
    },
    {
      id: 2,
      title: "Plateforme Mobile Fintech",
      description:
        "Écosystème bancaire sécurisé avec dashboard temps réel. Optimisation de l'UX pour un engagement utilisateur accru.",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80",
      technologies: ["React Native", "Supabase", "Node.js", "TypeScript"],
      githubUrl: "",
      liveUrl: "#",
      category: "Web & Mobile",
    },
    {
      id: 3,
      title: "Supply Chain Excellence",
      description:
        "Monitoring et optimisation des flux logistiques. Réduction des erreurs de saisie de 85% via automatisation Python.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
      technologies: ["Python", "Docker", "ERP Integration"],
      githubUrl: "",
      liveUrl: "#",
      category: "Enterprise",
    },
    {
      id: 4,
      title: "Rénovation Digitale E-commerce",
      description:
        "Refonte stratégique pour Temple des Oracles. Augmentation de la vitesse de chargement et du taux de conversion.",
      image: "/temple-des-oracles.jpg",
      technologies: ["Shopify", "Liquid", "Conversion Rate Optimization"],
      githubUrl: "",
      liveUrl: "https://templedesoracles.com/",
      category: "Web & Mobile",
    },
  ],
}: ProjectsSectionProps) => {
  const [activeCategory, setActiveCategory] = useState<string>("tous");

  // Extract unique categories from projects
  const categories = [
    "tous",
    ...new Set(projects.map((project) => project.category === "web" ? "web" :
      project.category === "mobile" ? "mobile" :
        project.category === "design" ? "design" : project.category)),
  ];

  // Filter projects based on active category
  const filteredProjects =
    activeCategory === "tous"
      ? projects
      : projects.filter((project) => project.category === activeCategory);

  // Animation variants for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section id="projects" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 text-foreground"
          >
            {title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-muted-foreground max-w-2xl mx-auto"
          >
            {description}
          </motion.p>
        </div>

        <Tabs defaultValue="tous" className="mb-12">
          <div className="flex justify-center">
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  onClick={() => setActiveCategory(category)}
                  className="capitalize"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory} className="mt-8">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredProjects.map((project) => (
                <motion.div key={project.id} variants={itemVariants}>
                  <ProjectCard
                    title={project.title}
                    description={project.description}
                    image={project.image}
                    technologies={project.technologies}
                    githubUrl={project.githubUrl}
                    liveUrl={project.liveUrl}
                    variant={project.variant}
                  />
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        <div className="text-center mt-12">
          <Button size="lg" asChild>
            <a href="#contact" className="px-8">
              Get in Touch
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
