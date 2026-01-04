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
  isPrivate?: boolean;
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
      title: "Finanz SaaS",
      description: "Tableau de bord financier haute performance avec monitoring temps réel et prévisions de trésorerie par IA.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
      technologies: ["Next.js", "Chart.js", "OpenAI", "Supabase"],
      githubUrl: "",
      liveUrl: "https://baremetrics.com/live-demo",
      category: "Enterprise",
      isPrivate: false,
    },
    {
      id: 2,
      title: "Aura AI Studio",
      description: "Studio de création visuelle utilisant des modèles de diffusion pour générer des assets marketing et vidéos uniques.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80",
      technologies: ["React", "Python", "FastAPI", "Stable Diffusion"],
      githubUrl: "",
      liveUrl: "https://aurai.net",
      category: "IA & Automation",
      isPrivate: false,
    },
    {
      id: 3,
      title: "Nexus IoT Control",
      description: "Application mobile de gestion domotique centralisée pour l'optimisation de la consommation énergétique.",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80",
      technologies: ["React Native", "Node.js", "MQTT", "AWS IoT"],
      githubUrl: "",
      liveUrl: "https://www.home-assistant.io/demo/",
      category: "Web & Mobile",
      isPrivate: false,
    },
    {
      id: 4,
      title: "PropFlow AI",
      description: "Solution d'intelligence immobilière automatisant la détection d'opportunités et l'analyse de rentabilité.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80",
      technologies: ["n8n", "TypeScript", "GPT-4", "Mapbox"],
      githubUrl: "",
      liveUrl: "https://dealcheck.io/",
      category: "IA & Automation",
      isPrivate: false,
    },
    {
      id: 5,
      title: "LogiTrack Enterprise",
      description: "Système de gestion de flotte logistique optimisant les tournées via des algorithmes génétiques.",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
      technologies: ["NestJS", "PostgreSQL", "Google Maps API", "Docker"],
      githubUrl: "",
      liveUrl: "https://www.samsara.com/fr/fleet/",
      category: "Enterprise",
      isPrivate: false,
    },
    {
      id: 6,
      title: "Ecom Next.js",
      description: "Plateforme e-commerce moderne construite avec Next.js, offrant une expérience utilisateur fluide.",
      image: "/ecom_nextjs.png",
      technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      githubUrl: "https://github.com/andriantahiry2024/Ecom",
      liveUrl: "#",
      category: "Web & Mobile",
      isPrivate: false,
    },
    {
      id: 7,
      title: "Workflows n8n (v5/v6)",
      description: "Série de workflows d'automatisation complexes pour la gestion de données et l'intégration IA.",
      image: "/n8n_workflow.png",
      technologies: ["n8n", "AI", "Automation", "DevOps"],
      githubUrl: "",
      liveUrl: "#",
      category: "IA & Automation",
      isPrivate: true,
    },
    {
      id: 8,
      title: "ChatSimple",
      description: "Interface de chat minimaliste et performante, optimisée pour la communication en temps réel.",
      image: "/chat_app.png",
      technologies: ["React", "WebRTC", "Node.js"],
      githubUrl: "https://github.com/andriantahiry2024/ChatSimple",
      liveUrl: "#",
      category: "Web & Mobile",
      isPrivate: false,
    },
    {
      id: 9,
      title: "Vocal Vibe Hub",
      description: "Gestion intelligente des flux vocaux et communication interactive.",
      image: "/private_repo.png",
      technologies: ["React", "AI", "Realtime"],
      githubUrl: "",
      liveUrl: "#",
      category: "IA & Automation",
      isPrivate: true,
    },
    {
      id: 10,
      title: "Seranay",
      description: "Solution enterprise pour l'optimisation des flux de données et la sécurité applicative.",
      image: "/private_repo.png",
      technologies: ["Enterprise", "Database", "Security"],
      githubUrl: "",
      liveUrl: "https://seranay.vercel.app",
      category: "Enterprise",
      isPrivate: false,
    },
    {
      id: 11,
      title: "Boutique V3",
      description: "Refonte complète d'une boutique en ligne avec gestion avancée des stocks.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80",
      technologies: ["E-commerce", "React", "CSS3"],
      githubUrl: "",
      liveUrl: "#",
      category: "Web & Mobile",
      isPrivate: true,
    },
    {
      id: 12,
      title: "Temple des Oracles",
      description: "Refonte stratégique e-commerce. Optimisation de la performance et du taux de conversion.",
      image: "/temple-des-oracles.jpg",
      technologies: ["Shopify", "Liquid", "CRO"],
      githubUrl: "",
      liveUrl: "https://templedesoracles.com/",
      category: "Web & Mobile",
      isPrivate: false,
    },
    {
      id: 13,
      title: "Golffang",
      description: "Refonte complète d'un site WordPress pour une expérience utilisateur fun et immersive, optimisée pour le SEO.",
      image: "/golffang.png",
      technologies: ["WordPress", "PHP", "SEO", "Custom CSS"],
      githubUrl: "",
      liveUrl: "https://golffang.co.uk/",
      category: "Web & Mobile",
      isPrivate: false,
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
                    isPrivate={project.isPrivate}
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
