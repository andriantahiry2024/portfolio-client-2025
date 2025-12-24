import React from "react";
import { cn } from "@/lib/utils";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { Link } from "react-router-dom";

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
        "w-full py-8 px-4 md:px-8 border-t bg-background/50 backdrop-blur-md",
        className,
      )}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-col items-center md:items-start gap-2">
          <div className="text-sm text-foreground font-medium">
            © {currentYear} Teckforgeek. Tous droits réservés.
          </div>
          <div className="flex space-x-4 text-xs text-muted-foreground">
            <Link to="/politique-de-confidentialite" className="hover:text-primary transition-colors">
              Politique de confidentialité
            </Link>
            <Link to="/conditions-utilisation" className="hover:text-primary transition-colors">
              Conditions d'utilisation
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {socialLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
