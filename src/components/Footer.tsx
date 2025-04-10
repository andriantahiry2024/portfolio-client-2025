import React from "react";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail, Twitter, Phone, MapPin } from "lucide-react";

interface FooterProps {
  className?: string;
}

const Footer = ({ className }: FooterProps = {}) => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com",
      label: "GitHub",
    },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://linkedin.com",
      label: "LinkedIn",
    },
    {
      icon: <Twitter className="h-5 w-5" />,
      href: "https://twitter.com",
      label: "Twitter",
    },
    {
      icon: <Mail className="h-5 w-5" />,
      href: "mailto:andriantahirynomena@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer
      className={cn(
        "w-full py-12 px-4 md:px-8 border-t border-border/30 bg-gradient-to-b from-background to-background/90 relative overflow-hidden",
        className,
      )}
    >
      {/* Éléments décoratifs */}
      <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
        <div className="absolute h-64 w-64 rounded-full bg-primary/30 blur-3xl bottom-0 left-1/4"></div>
        <div className="absolute h-64 w-64 rounded-full bg-blue-500/20 blur-3xl top-0 right-1/4"></div>
      </div>

      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">NA</div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">Portfolio</span>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Développeur full stack passionné par la création d'applications web modernes et performantes. Spécialisé en React, Node.js et technologies cloud.
            </p>
            <div className="flex items-center space-x-3 mt-4">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full bg-primary/10 hover:bg-primary/20 text-primary transition-colors hover:scale-110 transform duration-200"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Navigation</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Accueil</a></li>
              <li><a href="#projects" className="text-muted-foreground hover:text-primary transition-colors">Projets</a></li>
              <li><a href="#skills" className="text-muted-foreground hover:text-primary transition-colors">Compétences</a></li>
              <li><a href="#contact" className="text-muted-foreground hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Légal</h3>
            <ul className="space-y-2">
              <li><a href="/privacy-policy" className="text-muted-foreground hover:text-primary transition-colors">Politique de confidentialité</a></li>
              <li><a href="/terms-of-service" className="text-muted-foreground hover:text-primary transition-colors">Conditions d'utilisation</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); const cookieSettingsBtn = document.querySelector('button[aria-label="Paramètres des cookies"]'); if (cookieSettingsBtn instanceof HTMLButtonElement) { cookieSettingsBtn.click(); } else { alert('Les paramètres de cookies ne sont pas disponibles pour le moment.'); } }} className="text-muted-foreground hover:text-primary transition-colors">Paramètres des cookies</a></li>
            </ul>
          </div>

          <div className="sm:col-span-2 md:col-span-1">
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2 max-w-xs">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4 flex-shrink-0" />
                <a href="mailto:andriantahirynomena@gmail.com" className="hover:text-primary transition-colors truncate">andriantahirynomena@gmail.com</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4 flex-shrink-0" />
                <a href="tel:+261349671222" className="hover:text-primary transition-colors">+261 34 96 712 22</a>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0" />
                <span>Antananarivo, Madagascar</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Andriantahiry Nomenahasina. Tous droits réservés.
          </div>

          <div className="text-sm text-muted-foreground">
            <a href="#" className="hover:text-primary transition-colors">Politique de confidentialité</a>
            <span className="mx-2">•</span>
            <a href="#" className="hover:text-primary transition-colors">Mentions légales</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
