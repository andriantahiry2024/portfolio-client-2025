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
      title: "Site e-commerce Shopify",
      description:
        "Web design, refonte complète et ajout de fonctionnalités sur mesure",
      image: "/Portfolio-2025/temple-des-oracles.jpg",
      technologies: ["Shopify", "Liquid", "CSS", "JavaScript"],
      githubUrl: "",
      liveUrl: "https://templedesoracles.com/",
      category: "web",
    },
    {
      id: 2,
      title: "Développement front-end & WordPress",
      description:
        "Intégration de maquettes (HTML, CSS, JavaScript), création et personnalisation de thème WordPress from scratch",
      image: "/Portfolio-2025/uwandzani.jpg",
      technologies: ["WordPress", "PHP", "HTML", "CSS", "JavaScript"],
      githubUrl: "",
      liveUrl: "https://www.uwandzani.com/",
      category: "web",
    },
    {
      id: 3,
      title: "Golf Fang",
      description:
        "Site vitrine original pour les passionnés de golf, dans une esthétique gothique et vampirique assumée",
      image: "/Portfolio-2025/golfang.jpg",
      technologies: ["Web Design", "Frontend", "Creative"],
      githubUrl: "",
      liveUrl: "https://golffang.co.uk/",
      category: "design",
    },
    {
      id: 4,
      title: "Satisfactory",
      description:
        "Responsable production applicative : conception de questionnaires personnalisés, maintenance et évolution des fonctionnalités.",
      image: "/Portfolio-2025/satisfactory.png",
      technologies: ["Production Applicative", "Maintenance", "Gestion de Projet"],
      githubUrl: "",
      liveUrl: "https://satisfactory.fr/",
      category: "web",
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
