import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ExternalLink, Github } from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

const ProjectCard = ({
  title = "Titre du Projet",
  description = "Une brève description du projet présentant les principales fonctionnalités et technologies utilisées.",
  image = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  technologies = ["React", "TypeScript", "Tailwind CSS"],
  githubUrl = "#",
  liveUrl = "#",
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden flex flex-col bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 group">
        <div className="relative overflow-hidden aspect-video">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="flex gap-2"
            >
              {liveUrl && (
                <Button
                  size="sm"
                  className="rounded-full bg-white text-black hover:bg-white/90 transition-all duration-300 hover:shadow-lg hover:shadow-white/20"
                  asChild
                >
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                    Démo
                  </a>
                </Button>
              )}
              {githubUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="rounded-full bg-black/50 backdrop-blur-sm border-white/20 text-white hover:bg-black/70 transition-all duration-300"
                  asChild
                >
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-1.5 h-3.5 w-3.5" />
                    Code
                  </a>
                </Button>
              )}
            </motion.div>
          </div>

          {/* Badge de technologie principale */}
          {technologies.length > 0 && (
            <div className="absolute top-3 right-3">
              <Badge
                className="bg-black/60 backdrop-blur-sm text-white border-none shadow-lg font-medium"
              >
                {technologies[0]}
              </Badge>
            </div>
          )}
        </div>

        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70 group-hover:from-primary/90 group-hover:to-blue-500 transition-all duration-500">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow">
          <CardDescription className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {description}
          </CardDescription>

          <div className="flex flex-wrap gap-1.5 mt-2">
            {technologies.slice(1).map((tech, index) => (
              <Badge
                key={index}
                variant="outline"
                className="text-xs bg-primary/5 border-primary/20 text-primary/80 hover:bg-primary/10 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-2 border-t border-border/30 mt-auto">
          <div className="flex items-center gap-2">
            {githubUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full hover:bg-primary/10 transition-colors p-2 h-auto"
                asChild
              >
                <a href={githubUrl} target="_blank" rel="noopener noreferrer" aria-label="Code source">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            )}

            {liveUrl && (
              <Button
                variant="ghost"
                size="sm"
                className="rounded-full hover:bg-primary/10 transition-colors p-2 h-auto"
                asChild
              >
                <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-label="Démo en ligne">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-xs text-muted-foreground hover:text-primary transition-colors"
            asChild
          >
            <a href={liveUrl || githubUrl || '#'} target="_blank" rel="noopener noreferrer">
              Voir les détails
            </a>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
