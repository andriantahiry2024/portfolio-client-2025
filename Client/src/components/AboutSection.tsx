import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, MapPin, Star } from "lucide-react";
import LocationMap from "./LocationMap";
import WorkflowVis from "@/components/WorkflowVis";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "./ui/carousel";

interface AboutSectionProps {
  title?: string;
  subtitle?: string;
}

const AboutSection = ({
  title = "Propulser l'Innovation",
  subtitle = "Votre Partenaire IA & Automation",
}: AboutSectionProps) => {
  const expertises = [
    { name: "IA Artificielle" },
    { name: "Workflow Automation" },
    { name: "Next.js & React Native" },
    { name: "Ecosystème n8n" },
    { name: "Architecture Cloud" },
  ];

  const valueProps = [
    {
      title: "Vision Stratégique",
      company: "TECKFORGEEK SOLUTIONS",
      period: "Focus Business ROI",
      description: "Nous transformons les défis technologiques en opportunités de croissance. Notre approche est centrée sur le retour sur investissement et l'efficacité opérationnelle.",
    },
    {
      title: "Ingénierie de Pointe",
      company: "AGENCE TECH PREMIUM",
      period: "Modern Stack",
      description: "Utilisation des dernières technologies (LLMs, RAG, Agents) pour concevoir des systèmes robustes, scalables et sécurisés.",
    },
    {
      title: "Accompagnement d'Élite",
      company: "PARTENARIAT LONG TERME",
      period: "Support & Évolution",
      description: "Nous ne sommes pas juste des prestataires, mais votre bras droit technique pour naviguer dans l'ère de l'intelligence artificielle.",
    },
  ];

  const stats = [
    {
      title: "Automatisation",
      subtitle: "Gain de productivité moyen",
      period: "+40%",
    },
    {
      title: "Disponibilité",
      subtitle: "Systèmes critiques monitorés",
      period: "24/7",
    },
    {
      title: "Expertise IA",
      subtitle: "Modèles déployés & optimisés",
      period: "Custom",
    },
  ];

  const testimonials = [
    {
      name: "Marc",
      role: "Freelance",
      company: "Golffang",
      tagline: "En tant que créateur, il était indispensable.",
      text: "Développeur compétent et créatif. Refaire sites WordPress fonctionnel performant grâce à son expertise.",
      initials: "M",
    },
    {
      name: "Temple des Oracles",
      role: "Fondatrice",
      company: "E‑commerce Shopify",
      tagline: "Un accompagnement technique et design de bout en bout.",
      text: "Refonte complète de notre boutique, ajout de fonctionnalités sur mesure et optimisation du parcours client sans casser notre univers visuel.",
      initials: "TO",
    },
    {
      name: "Uwandzani",
      role: "Responsable communication",
      company: "Site vitrine & blog",
      tagline: "Une interface claire, moderne et facile à maintenir.",
      text: "Intégration pixel‑perfect, amélioration des performances et mise en place d’un back‑office WordPress vraiment exploitable au quotidien.",
      initials: "U",
    },
    {
      name: "Satisfactory",
      role: "Chef de projet",
      company: "Plateforme de questionnaires",
      tagline: "Stabilisation et évolutions continues de la plateforme.",
      text: "Capable de prendre en main un existant complexe, de le fiabiliser et de proposer des évolutions concrètes pour les utilisateurs finaux.",
      initials: "S",
    },
  ];

  const [testimonialApi, setTestimonialApi] = useState<CarouselApi | null>(null);

  useEffect(() => {
    if (!testimonialApi) return;

    const interval = setInterval(() => {
      if (!testimonialApi) return;
      if (testimonialApi.canScrollNext()) {
        testimonialApi.scrollNext();
      } else {
        testimonialApi.scrollTo(0);
      }
    }, 7000); // 7s par avis

    return () => clearInterval(interval);
  }, [testimonialApi]);

  return (
    <section id="about" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-2">{title}</h2>
          <p className="text-muted-foreground">{subtitle}</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Profile Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border p-6 shadow-none hover:border-foreground/20 transition-all">
                <h3 className="text-xl font-bold text-foreground mb-4">| Notre Mission</h3>
                <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                  <p>
                    Teckforgeek est né d'une passion pour les technologies de rupture. Nous ne créons pas seulement du code ; nous bâtissons les moteurs de croissance de demain.
                  </p>
                  <p>
                    Notre mission est de démocratiser l'IA et l'automation de haut niveau pour les entreprises ambitieuses, en transformant des processus complexes en flux de travail fluides et rentables.
                  </p>
                  <p>
                    Chaque solution sortant de notre agence est conçue avec une obsession pour la performance, la sécurité et une expérience utilisateur d'élite.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-border">
                  <Button className="w-full bg-foreground text-background hover:opacity-80 transition-opacity font-bold rounded-md">
                    Réserver un Audit Stratégique
                  </Button>
                </div>
              </Card>
            </motion.div>

            {/* Expertises Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border p-6">
                <h3 className="text-lg font-bold text-foreground mb-4">
                  | Nos Expertises Clés
                </h3>
                <div className="flex flex-wrap gap-2">
                  {expertises.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-xs font-semibold border border-border/50"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  Travaillons ensemble ! 🚀
                </h3>
                <p className="text-muted-foreground text-sm mb-4">
                  Vous avez un projet en tête ? Discutons-en autour d'un café virtuel.
                </p>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  Me Contacter
                </Button>
              </Card>
            </motion.div>

            {/* Location Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border p-6">
                <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-foreground" />
                  Ma localisation
                </h3>
                <div className="w-full h-48 rounded-lg overflow-hidden">
                  <LocationMap />
                </div>
              </Card>
            </motion.div>

            {/* Testimonial Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border p-6">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  💬 Les clients en témoignent...
                </h3>

                <Carousel
                  setApi={setTestimonialApi}
                  opts={{ loop: true, align: "start" }}
                  className="mt-4"
                >
                  <CarouselContent>
                    {testimonials.map((t, index) => (
                      <CarouselItem key={index}>
                        <div className="space-y-4">
                          <p className="text-muted-foreground text-sm italic">
                            {t.tagline}
                          </p>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 fill-foreground text-foreground"
                              />
                            ))}
                          </div>
                          <p className="text-muted-foreground text-sm mb-2">
                            “{t.text}”
                          </p>
                          <div className="flex items-center gap-3 mt-4">
                            <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-secondary-foreground font-bold text-xs">
                              {t.initials}
                            </div>
                            <div>
                              <p className="text-foreground text-sm font-semibold">
                                {t.name}
                              </p>
                              <p className="text-muted-foreground text-xs">
                                {t.role}, {t.company}
                              </p>
                            </div>
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                </Carousel>
              </Card>
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Experience Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border p-6">
                <h3 className="text-2xl font-bold text-foreground mb-8">| Notre Approche Stratégique</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {valueProps.map((exp, index) => (
                    <motion.div
                      key={index}
                      className="space-y-3"
                    >
                      <div className="w-10 h-1 rounded-full bg-foreground mb-4 opacity-20"></div>
                      <h4 className="text-lg font-bold text-foreground uppercase tracking-tight leading-tight">
                        {exp.title}
                      </h4>
                      <p className="text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2">
                        {exp.company}
                      </p>
                      <p className="text-sm text-foreground/80 leading-relaxed">
                        {exp.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Formation Card -> KPIs/Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">| Impact & Performance</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {stats.map((formation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      className="bg-secondary/30 p-4 rounded-sm border border-border hover:border-foreground/50 transition-all text-center"
                    >
                      <p className="text-foreground text-3xl font-black mb-1">{formation.period}</p>
                      <h4 className="text-foreground font-bold text-sm mb-1">{formation.title}</h4>
                      <p className="text-muted-foreground text-[10px] uppercase tracking-tighter">{formation.subtitle}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Interactive Workflow Visualization */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              viewport={{ once: true }}
            >
              <WorkflowVis />
            </motion.div>

            {/* NEW: Tech Stack Section to fill space */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border p-8">
                <h3 className="text-2xl font-bold text-foreground mb-8">| Arsenal Technologique</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {[
                    "OpenAI", "Anthropic", "n8n", "Make", "Python", "TypeScript",
                    "React", "Next.js", "Supabase", "Docker", "AWS", "Vercel"
                  ].map((tech, i) => (
                    <div key={i} className="flex items-center justify-center p-4 bg-secondary/30 rounded border border-border/50 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-secondary hover:border-foreground/20 transition-all cursor-default">
                      {tech}
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section >
  );
};

export default AboutSection;
