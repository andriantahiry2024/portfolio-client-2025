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
import {
  ExternalLink,
  Github,
  MessageCircle,
  Users,
  ShoppingBag,
  Sparkles,
  Flame,
  UtensilsCrossed,
  BarChart3,
  Apple,
} from "lucide-react";
import { motion } from "framer-motion";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  variant?: "default" | "social" | "nutrition";
}

const ProjectCard = ({
  title = "Titre du Projet",
  description = "Une brève description du projet présentant les principales fonctionnalités et technologies utilisées.",
  image = "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80",
  technologies = ["React", "TypeScript", "Tailwind CSS"],
  githubUrl = "#",
  liveUrl = "#",
  variant = "default",
}: ProjectCardProps) => {
  const SocialNetworkAnimation = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Halo central doux */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.2 }}
        animate={{ opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(circle at 50% 45%, rgba(59,130,246,0.28), transparent 60%)",
        }}
      />

      {/* Hub central */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900/90 border border-sky-300/70 flex items-center justify-center shadow-[0_0_40px_rgba(56,189,248,0.55)] backdrop-blur-[2px]"
        initial={{ opacity: 0.85 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }}
      >
        {/* noyau + orbites, centrés */}
        <span className="relative flex h-6 w-6 items-center justify-center">
          {/* noyau */}
          <span className="h-2.5 w-2.5 rounded-full bg-sky-300 shadow-[0_0_12px_rgba(56,189,248,0.8)]" />
          {/* anneau */}
          <span className="absolute h-6 w-6 rounded-full border border-sky-300/40" />
          {/* points orbitaux équilibrés */}
          <span className="absolute -top-0.5 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-emerald-300" />
          <span className="absolute top-1/2 -left-0.5 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-violet-300" />
          <span className="absolute top-1/2 -right-0.5 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-sky-200" />
        </span>
      </motion.div>

      {/* Lignes principales (réseau) */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 56"
        preserveAspectRatio="none"
      >
        <motion.line
          x1="18"
          y1="20"
          x2="82"
          y2="20"
          stroke="rgba(148, 163, 184, 0.65)"
          strokeWidth="0.7"
          strokeLinecap="round"
          animate={{ opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
        />
        <motion.line
          x1="22"
          y1="38"
          x2="78"
          y2="38"
          stroke="rgba(148, 163, 184, 0.45)"
          strokeWidth="0.7"
          strokeLinecap="round"
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 3.4, repeat: Infinity, delay: 0.8 }}
        />
        <motion.line
          x1="18"
          y1="20"
          x2="50"
          y2="28"
          stroke="rgba(56,189,248,0.8)"
          strokeWidth="0.8"
          strokeLinecap="round"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: 0.4 }}
        />
        <motion.line
          x1="82"
          y1="20"
          x2="50"
          y2="28"
          stroke="rgba(52,211,153,0.8)"
          strokeWidth="0.8"
          strokeLinecap="round"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.2, repeat: Infinity, delay: 0.9 }}
        />
        <motion.line
          x1="22"
          y1="38"
          x2="50"
          y2="28"
          stroke="rgba(96,165,250,0.85)"
          strokeWidth="0.8"
          strokeLinecap="round"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.1, repeat: Infinity, delay: 1.2 }}
        />
        <motion.line
          x1="78"
          y1="38"
          x2="50"
          y2="28"
          stroke="rgba(192,132,252,0.85)"
          strokeWidth="0.8"
          strokeLinecap="round"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 3.1, repeat: Infinity, delay: 1.6 }}
        />
      </svg>

      {/* Noeud messages */}
      <motion.div
        className="absolute left-[10%] top-[26%] h-11 w-11 rounded-2xl bg-sky-500/15 border border-sky-300/70 flex items-center justify-center shadow-[0_0_18px_rgba(56,189,248,0.45)]"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.1 }}
      >
        <MessageCircle className="h-5 w-5 text-sky-100" />
      </motion.div>

      {/* Noeud communauté */}
      <motion.div
        className="absolute right-[10%] top-[26%] h-11 w-11 rounded-2xl bg-emerald-500/15 border border-emerald-300/70 flex items-center justify-center shadow-[0_0_18px_rgba(52,211,153,0.45)]"
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 3.3, repeat: Infinity, delay: 0.6 }}
      >
        <Users className="h-5 w-5 text-emerald-100" />
      </motion.div>

      {/* Noeud créateur */}
      <motion.div
        className="absolute left-[16%] bottom-[24%] h-10 w-10 rounded-full bg-slate-900/90 border border-sky-300/70 flex items-center justify-center"
        animate={{ y: [0, 3, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, delay: 1 }}
      >
        <span className="h-5 w-5 rounded-full bg-gradient-to-br from-sky-400 to-blue-500 shadow-inner" />
      </motion.div>

      {/* Noeud marketplace */}
      <motion.div
        className="absolute right-[16%] bottom-[24%] h-10 w-10 rounded-2xl bg-violet-500/18 border border-violet-300/80 flex items-center justify-center shadow-[0_0_20px_rgba(167,139,250,0.55)]"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3.6, repeat: Infinity, delay: 1.4 }}
      >
        <ShoppingBag className="h-5 w-5 text-violet-100" />
      </motion.div>

      {/* Légende discrète */}
      <div className="absolute left-4 bottom-3 text-[10px] uppercase tracking-[0.2em] text-slate-200/85">
        Réseau social · Marketplace · Realtime
      </div>
    </div>
  );

  const NutritionAppAnimation = () => (
    <div className="relative w-full h-full bg-gradient-to-br from-slate-900 via-slate-900 to-emerald-900">
      {/* Halo central autour de l'assiette */}
      <motion.div
        className="absolute inset-0"
        initial={{ opacity: 0.3 }}
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(52, 211, 153, 0.25), transparent 55%)",
        }}
      />

      {/* Assiette centrale au premier plan (légèrement plus compacte, décalée à gauche) */}
      <motion.div
        className="absolute left-[32%] top-[56%] z-20 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-900/90 border-2 border-emerald-300/70 flex items-center justify-center shadow-[0_0_40px_rgba(52,211,153,0.4)]"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: [0.9, 1.05, 0.9], opacity: 1 }}
        transition={{ duration: 3.2, repeat: Infinity }}
      >
        <UtensilsCrossed className="h-7 w-7 text-emerald-200" />
      </motion.div>

      {/* Badge calories (plus haut, pour ne pas chevaucher l'assiette) */}
      <motion.div
        className="absolute left-[14%] top-[22%] z-10 h-10 px-3 rounded-full bg-emerald-500/20 border border-emerald-300/80 flex items-center gap-1"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.2 }}
      >
        <Flame className="h-4 w-4 text-orange-300" />
        <span className="text-[11px] font-medium text-emerald-50">450 kcal</span>
      </motion.div>

      {/* Badge aliment (plus à droite et légèrement plus haut) */}
      <motion.div
        className="absolute right-[12%] top-[24%] z-10 h-10 px-3 rounded-full bg-lime-500/15 border border-lime-300/80 flex items-center gap-1"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 3.4, repeat: Infinity, delay: 0.7 }}
      >
        <Apple className="h-4 w-4 text-lime-200" />
        <span className="text-[11px] font-medium text-lime-50">Fruits & légumes</span>
      </motion.div>

      {/* Badge stats (décalé en bas à droite, sans chevauchement avec l'assiette) */}
      <motion.div
        className="absolute right-[10%] bottom-[14%] z-10 h-10 px-3 rounded-full bg-sky-500/15 border border-sky-300/80 flex items-center gap-1"
        animate={{ y: [0, -3, 0] }}
        transition={{ duration: 3.1, repeat: Infinity, delay: 1 }}
      >
        <BarChart3 className="h-4 w-4 text-sky-200" />
        <span className="text-[11px] font-medium text-sky-50">Objectif atteint</span>
      </motion.div>

      {/* Indicateurs autour de l'assiette (petits points animés) */}
      <div className="absolute inset-0">
        {[0, 1, 2, 3].map((i) => (
          <motion.span
            key={i}
            className="absolute h-1.5 w-1.5 rounded-full bg-emerald-300/80"
            style={{
              left: `${35 + i * 8}%`,
              top: i % 2 === 0 ? "55%" : "45%",
            }}
            animate={{ opacity: [0.2, 1, 0.2], scale: [0.9, 1.2, 0.9] }}
            transition={{ duration: 2.2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}
      </div>

      {/* Légende discrète */}
      <div className="absolute left-4 bottom-3 text-[10px] uppercase tracking-[0.2em] text-emerald-100/90">
        Recettes · Calories · Planning repas
      </div>
    </div>
  );

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="h-full"
      onClick={() => {
        if (liveUrl && liveUrl !== "#") {
          window.open(liveUrl, "_blank", "noopener,noreferrer");
        }
      }}
      role={liveUrl && liveUrl !== "#" ? "button" : undefined}
      aria-label={liveUrl && liveUrl !== "#" ? `Ouvrir le projet ${title}` : undefined}
    >
      <Card className="h-full overflow-hidden flex flex-col bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
        <div className="relative overflow-hidden aspect-video">
          {variant === "social" ? (
            <SocialNetworkAnimation />
          ) : variant === "nutrition" ? (
            <NutritionAppAnimation />
          ) : (
            <motion.img
              src={image}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            />
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileHover={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {liveUrl && (
                <Button size="sm" className="mr-2" asChild>
                  <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Démo
                  </a>
                </Button>
              )}
              {githubUrl && (
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-background/80"
                  asChild
                >
                  <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    Code
                  </a>
                </Button>
              )}
            </motion.div>
          </div>
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-bold hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-grow">
          <CardDescription className="text-sm text-muted-foreground mb-4">
            {description}
          </CardDescription>

          <div className="flex flex-wrap gap-2 mt-2">
            {technologies.map((tech, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs hover:bg-secondary/80 transition-colors"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between pt-2">
          {githubUrl && (
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-primary/10 transition-colors"
              asChild
            >
              <a href={githubUrl} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                Code
              </a>
            </Button>
          )}

          {liveUrl && (
            <Button
              size="sm"
              className="hover:bg-primary/90 transition-colors"
              asChild
            >
              <a href={liveUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Démo
              </a>
            </Button>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
