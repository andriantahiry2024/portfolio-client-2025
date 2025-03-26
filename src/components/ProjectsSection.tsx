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
}

interface ProjectsSectionProps {
  title?: string;
  description?: string;
  projects?: Project[];
}

const ProjectsSection = ({
  title = "Mes Projets",
  description = "Voici quelques-uns de mes projets récents. Chacun a été soigneusement élaboré avec une attention particulière aux détails et aux technologies modernes.",
  projects = [
    {
      id: 1,
      title: "Plateforme E-Commerce",
      description:
        "Une plateforme e-commerce complète avec gestion des produits, fonctionnalités de panier et processus de paiement sécurisé.",
      image:
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80",
      technologies: ["React", "Node.js", "MongoDB", "Stripe"],
      githubUrl: "#",
      liveUrl: "#",
      category: "web",
    },
    {
      id: 2,
      title: "Application de Gestion de Tâches",
      description:
        "Une application de productivité pour gérer les tâches, les projets et la collaboration d'équipe avec des mises à jour en temps réel.",
      image:
        "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&q=80",
      technologies: ["React", "Firebase", "Tailwind CSS"],
      githubUrl: "#",
      liveUrl: "#",
      category: "web",
    },
    {
      id: 3,
      title: "Site Portfolio",
      description:
        "Un site portfolio moderne présentant des projets et des compétences avec un design épuré et minimaliste.",
      image:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=800&q=80",
      technologies: ["React", "Tailwind CSS", "Framer Motion"],
      githubUrl: "#",
      liveUrl: "#",
      category: "web",
    },
    {
      id: 4,
      title: "Tableau de Bord Météo",
      description:
        "Une application météo qui fournit des prévisions en temps réel, des données historiques et des cartes interactives.",
      image:
        "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&q=80",
      technologies: ["JavaScript", "Weather API", "Chart.js"],
      githubUrl: "#",
      liveUrl: "#",
      category: "mobile",
    },
    {
      id: 5,
      title: "Tableau de Bord Réseaux Sociaux",
      description:
        "Un tableau de bord d'analyse pour suivre les performances des réseaux sociaux sur plusieurs plateformes.",
      image:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&q=80",
      technologies: ["React", "D3.js", "Social Media APIs"],
      githubUrl: "#",
      liveUrl: "#",
      category: "design",
    },
    {
      id: 6,
      title: "Suivi de Fitness",
      description:
        "Une application mobile pour suivre les entraînements, la nutrition et les progrès de fitness avec des recommandations personnalisées.",
      image:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
      technologies: ["React Native", "Firebase", "Health APIs"],
      githubUrl: "#",
      liveUrl: "#",
      category: "mobile",
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
    <section id="projects" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
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
