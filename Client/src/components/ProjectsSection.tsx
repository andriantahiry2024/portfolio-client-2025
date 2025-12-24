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
  title = "Mes Projets",
  description = "Voici quelques-uns de mes projets récents. Chacun a été soigneusement élaboré avec une attention particulière aux détails et aux technologies modernes.",
  projects = [
    {
      id: 1,
      title: "Site e-commerce Shopify",
      description:
        "Web design, refonte complète et ajout de fonctionnalités sur mesure",
      image: "/temple-des-oracles.jpg",
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
      image: "/uwandzani.jpg",
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
      image: "/golfang.jpg",
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
      image: "/satisfactory.png",
      technologies: ["Production Applicative", "Maintenance", "Gestion de Projet"],
      githubUrl: "",
      liveUrl: "https://satisfactory.fr/",
      category: "web",
      },
      {
        id: 5,
        title: "SeraNay – Réseau social hybride e-commerce",
        description:
          "Plateforme hybride mêlant réseau social créatif, marketplace pour produits physiques, digitaux et formations, messagerie temps réel et accompagnement par l’IA. Architecture moderne (React 18, TypeScript, Supabase Realtime, PWA) pensée pour la collaboration (collections, moodboards, conversations guidées) et la monétisation des créateurs. Projet en cours de développement.",
        image: "/temple-des-oracles.jpg",
        technologies: ["React", "TypeScript", "Supabase", "Realtime", "PWA", "IA"],
        githubUrl: "",
        liveUrl: "https://seranay.vercel.app",
        category: "web",
        variant: "social",
      },
      {
        id: 6,
        title: "Food Tracker Calorie – Création de recettes & suivi nutritionnel",
        description:
          "Application mobile moderne (React Native, Expo, TypeScript) pour créer des recettes, analyser les aliments via reconnaissance d’image, suivre les calories au quotidien et planifier ses repas. Intégration avec Supabase pour l’authentification, la synchronisation multi-appareils et la gestion des plannings de repas. Projet en cours de développement, axé sur l’équilibre alimentaire et l’expérience utilisateur.",
        image: "/satisfactory.png",
        technologies: [
          "React Native",
          "Expo",
          "TypeScript",
          "Supabase",
          "Nutrition",
          "Mobile",
        ],
        githubUrl: "https://github.com/andriantahiry2024/Food-tracking-Calories",
        liveUrl: "",
        category: "mobile",
        variant: "nutrition",
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
