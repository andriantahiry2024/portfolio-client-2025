import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, MapPin, Star } from "lucide-react";
import LocationMap from "./LocationMap";
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
  title = "À propos de moi",
  subtitle = "Développeur Web Passionné",
}: AboutSectionProps) => {
  const skills = [
    { name: "React" },
    { name: "TypeScript" },
    { name: "GraphQL" },
    { name: "MongoDB" },
    { name: "PostgreSQL" },
  ];

  const experiences = [
    {
      title: "Responsable Production Applicative",
      company: "SATISFACTORY | UPNTECH, MADAGASCAR",
      period: "Avril 2024 - Aujourd'hui",
      description: "Conception de questionnaires de satisfaction, développement Front-End, support ZENDESK, déploiement API REST, management Agile, automatisation des services commerciaux.",
    },
    {
      title: "Développeur et Designer",
      company: "CARGLASS | FREELANCE | LUXEMBOURG",
      period: "Septembre 2023 - Décembre 2023 (4 mois)",
      description: "Conception avec Elementor, développement de thèmes WordPress, déploiement Serveur Linux, intégration d'OpenAI IA, web DigitalAI.",
    },
    {
      title: "Développeur WordPress",
      company: "GOLFFANG | FREELANCE",
      period: "Janvier 2023 - Février 2023 (2 mois)",
      description: "Conception avec Elementor, développement de thèmes, déploiement serveur Linux, intégration d'OpenAI et chatbot IA.",
    },
    {
      title: "Web Designer & Développeur Fullstack",
      company: "ADITITTI | FREELANCE",
      period: "Septembre 2022 - Août 2023 (1 an)",
      description: "Refonte sites e-commerce Shopify, développement applications React, déploiement EC2, automatisation avec Zapier/Make, création designs interfaces.",
    },
    {
      title: "Agent Verbalisateur",
      company: "ARM MADAGASCAR",
      period: "Septembre 2018 - Octobre 2020 (2 ans)",
      description: "Gestion d'équipes, presto-verbaux, comptes rendus, gestion des matériels et stocks.",
    },
    {
      title: "Agent Marketing",
      company: "INTELCIA",
      period: "Septembre 2017 - Août 2018 (1 an)",
      description: "Responsable SAV et Commercial, gestion tickets clients, stocks produits, géolocalisation commandes.",
    },
    {
      title: "Web Designer",
      company: "UWANDZANI | FREELANCE",
      period: "Février 2019 - Juin 2019 (5 mois)",
      description: "Création designs d'interfaces, intégration HTML/CSS/JavaScript, déploiement WordPress et Elementor, gestion d'hébergement.",
    },
  ];

  const formations = [
    {
      title: "Autodidacte",
      subtitle: "Formation professionnelle web et marketing",
      period: "2016-2023",
    },
    {
      title: "NETPRO WEB",
      subtitle: "Formation professionnelle administration réseaux et cloud",
      period: "2021",
    },
    {
      title: "Faculté DEGS",
      subtitle: "Licence en Gestion et Administration d'Entreprise",
      period: "2014-2016",
    },
    {
      title: "CFO (Centre Formation Commerce International)",
      subtitle: "Formation Professionnelle du Ministère du Commerce",
      period: "2011-2012",
    },
    {
      title: "Baccalauréat Série D",
      subtitle: "Mention assez bien",
      period: "2010-2011",
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
    <section id="about" className="py-20 bg-background">
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
              <Card className="bg-card border-border p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">| Profil</h3>
                <div className="space-y-4 text-muted-foreground text-sm leading-relaxed">
                  <p>
                    Actuellement en poste en tant que responsable production applicative de
                    réalisation de questionnaires personnalisés. Depuis mon plus jeune âge,
                    j'ai toujours été fassiné par les nouvelles technologies et j'ai décidé de
                    me former de façon autodidacte.
                  </p>
                  <p>
                    Mon objectif est de créer des solutions innovantes ayant un impact réel
                    sur notre société, tout en recherchant sans cesse des défis stimulants
                    pour continuer à évoluer.
                  </p>
                  <p>
                    Avec plusieurs années d'expérience dans le développement web full-stack,
                    j'ai travaillé sur divers projets allant des SPA aux sites e-commerce
                    complexes. J'aime résoudre des problèmes et apprendre constamment de
                    nouvelles technologies pour améliorer mes compétences et l'automatisation.
                  </p>
                </div>
                <a
                  href="/CV_NOMENAHASINA_ANDRIANTAHIRY.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-6"
                >
                  <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                    <Download className="w-4 h-4 mr-2" />
                    Télécharger mon CV (PDF)
                  </Button>
                </a>
              </Card>
            </motion.div>

            {/* Skills Card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border p-6">
                <h3 className="text-xl font-bold text-foreground mb-4">
                  | Vos technos sont-elles parmi celles-ci ?
                </h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
                <p className="text-muted-foreground text-xs mt-4">
                  Actuellement passionné, je m'adapte rapidement à toutes nouvelles technologies.
                </p>
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
                <h3 className="text-xl font-bold text-foreground mb-6">| Expérience Professionnelle</h3>
                <div className="space-y-6">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.1,
                        ease: "easeOut"
                      }}
                      className="relative pl-6 border-l-2 border-foreground"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true, margin: "-50px" }}
                        transition={{
                          duration: 0.3,
                          delay: index * 0.1 + 0.2,
                          type: "spring",
                          stiffness: 200
                        }}
                        className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-foreground"
                      ></motion.div>
                      <h4 className="text-foreground font-semibold">{exp.title}</h4>
                      <p className="text-muted-foreground text-sm font-medium">{exp.company}</p>
                      <p className="text-muted-foreground/70 text-xs mb-2">{exp.period}</p>
                      <p className="text-muted-foreground text-sm">{exp.description}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Formation Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-card border-border p-6">
                <h3 className="text-xl font-bold text-foreground mb-6">| Formation & Diplômes</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {formations.map((formation, index) => (
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
                      className="bg-secondary/50 p-4 rounded-lg border border-border hover:border-border/60 transition-colors"
                    >
                      <h4 className="text-foreground font-semibold mb-1">{formation.title}</h4>
                      <p className="text-muted-foreground text-sm mb-2">{formation.subtitle}</p>
                      <p className="text-muted-foreground/70 text-xs">{formation.period}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
