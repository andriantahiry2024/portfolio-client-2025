import { useState, useEffect, useLayoutEffect } from "react";
import { fetchWithAuth } from '../lib/apiConfig';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, LogOut, User } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Ajouter Link
import { useToast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";

interface NavbarProps {
  className?: string;
}

// Interface pour les données utilisateur stockées
interface UserData {
  id: string | number; // Peut être UUID (string) ou Int (number)
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
  name?: string; // Ajout de la propriété name pour compatibilité
}

const Navbar = ({ className = "" }: NavbarProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null); // État pour l'utilisateur connecté
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize theme from localStorage or default to dark - Utiliser useLayoutEffect pour les changements visuels immédiats
  useLayoutEffect(() => {
    // Appliquer le thème sauvegardé immédiatement au chargement
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" || "dark";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    setTheme(savedTheme);
  }, []);

  const navItems = [
    { name: "Accueil", href: "#home" },
    { name: "À propos", href: "#about" },
    { name: "Compétences", href: "#skills" },
    { name: "Interactif", href: "#interactive" },
    { name: "Projets", href: "#projects" },
    { name: "Passions", href: "#passions" }, // Ajouter le lien Passions
    { name: "Blog", href: "/blog", isExternal: true },
    { name: "Admin", href: "/admin", isExternal: true },
    { name: "Contact", href: "#contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Récupérer les données utilisateur depuis l'API
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');

      if (!token) {
        setUserData(null);
        return;
      }

      try {
        const response = await fetchWithAuth('/auth/me');

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
        } else {
          // Si la réponse n'est pas OK, supprimer le token
          console.error(`Erreur d'authentification: ${response.status}`);
          localStorage.removeItem('authToken');
          setUserData(null);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données utilisateur:", error);
        localStorage.removeItem('authToken');
        setUserData(null);
      }
    };

    fetchUserData();
  }, [location]); // Ré-évaluer si la location change (après login/logout)

  // Fonction de déconnexion
  const { toast } = useToast();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setUserData(null);
    setIsMobileMenuOpen(false);

    toast({
      title: "Déconnexion réussie",
      description: "Vous avez été déconnecté avec succès.",
      variant: "success",
    });

    navigate('/login'); // Rediriger vers la page de login
  };

  // Fonction optimisée pour changer le thème
  const toggleTheme = () => {
    // Désactiver les transitions pendant le changement de thème
    document.documentElement.classList.add('disable-transitions');

    // Priorité à la mise à jour visuelle
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    // Puis mettre à jour l'état et localStorage
    setTheme(newTheme);

    // Utiliser requestAnimationFrame pour différer l'écriture localStorage
    requestAnimationFrame(() => {
      localStorage.setItem("theme", newTheme);

      // Réactiver les transitions après un court délai
      setTimeout(() => {
        document.documentElement.classList.remove('disable-transitions');
      }, 100);
    });
  };

  const scrollToSection = (sectionId: string, isExternal = false) => {
    if (isExternal) {
      navigate(sectionId);
    } else {
      // Check if we're on a different page and trying to navigate to a section on home page
      if (location.pathname !== "/" && sectionId.startsWith("#")) {
        // Navigate to home first, then scroll to section
        navigate("/");
        // Use setTimeout to wait for navigation to complete
        setTimeout(() => {
          const element = document.querySelector(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        // We're already on the home page, just scroll
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        isScrolled
          ? "dark:bg-black/90 dark:text-white bg-white/90 backdrop-blur-md border-b border-border/40 shadow-sm text-black"
          : "dark:bg-black/70 dark:text-white bg-white/90 backdrop-blur-sm text-black",
        className,
      )}
    >
      <div className="max-w-[1280px] mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a
            href="/"
            className="text-xl font-bold tracking-tight hover:text-primary transition-colors flex items-center gap-2"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm">NA</div>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600 font-extrabold dark:from-blue-400 dark:to-purple-500">Portfolio</span>
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 overflow-x-auto"> {/* Ajuster space-x si besoin */}
          {/* Liens de navigation principaux */}
          <div id="desktop-nav-links-container" className="bg-gray-100 dark:bg-neutral-800/60 backdrop-blur-sm rounded-full px-2 py-1.5 border border-gray-200 dark:border-neutral-700 flex flex-wrap text-neutral-700 dark:text-white"> {/* Correction des styles dark/light */}
            {navItems
              .filter(item => !(item.name === 'Admin' && (!userData || !['ADMIN', 'SUPERADMIN'].includes(userData.role)))) // Filtrer Admin si non autorisé
              .filter(item => !(item.name === 'Blog' && location.pathname.startsWith('/blog'))) // Optionnel: Cacher Blog si déjà sur une page de blog
              .map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium hover:text-primary transition-colors px-3 py-1.5 rounded-full dark:hover:bg-white/20 hover:bg-gray-200 dark:text-white/90 dark:hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href, item.isExternal);
                  }}
                >
                  {item.name}
                </a>
             ))}
          </div>

          {/* Section Authentification */}
          <div className="flex items-center space-x-3 ml-4"> {/* Séparateur visuel */}
            {userData ? (
              <>
                <div className="bg-primary/10 rounded-full px-3 py-1.5 hidden lg:flex items-center gap-2 border border-primary/20">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-primary">
                    {userData.name || userData.email}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center rounded-full hover:bg-red-500/10 hover:text-red-500 transition-colors"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild className="rounded-full dark:hover:bg-white/10 hover:bg-gray-100 dark:text-white dark:border-white/10">
                  <Link to="/login">Connexion</Link>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  asChild
                  className="rounded-full bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-md hover:shadow-blue-500/20 border-none text-white"
                >
                   <Link to="/create-user">S'inscrire</Link>
                 </Button>
              </>
            )}
            <Button
              variant="outline"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full border border-border/40 dark:bg-black/70 bg-gray-100/80 backdrop-blur-sm dark:hover:bg-black/90 hover:bg-gray-200/80 dark:text-white dark:border-white/20"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-full border border-border/40 dark:bg-black/70 bg-gray-100/80 backdrop-blur-sm dark:hover:bg-black/90 hover:bg-gray-200/80 h-9 w-9 dark:text-white dark:border-white/20"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            className="rounded-full border border-border/40 dark:bg-black/70 bg-gray-100/80 backdrop-blur-sm dark:hover:bg-black/90 hover:bg-gray-200/80 h-9 w-9 dark:text-white dark:border-white/20"
          >
            {isMobileMenuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="md:hidden dark:bg-black/95 dark:text-white bg-white/95 backdrop-blur-md border-t border-border/30 shadow-lg"
        >
          <div className="container mx-auto px-4 py-6 space-y-2">
             {/* Liens de navigation principaux Mobile */}
            {navItems
              .filter(item => !(item.name === 'Admin' && (!userData || !['ADMIN', 'SUPERADMIN'].includes(userData.role))))
              .filter(item => !(item.name === 'Blog' && location.pathname.startsWith('/blog')))
              .map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-full px-4 py-2.5 text-base font-medium hover:bg-primary/10 hover:text-primary transition-colors dark:text-white/90 dark:hover:text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href, item.isExternal);
                  }}
                >
                  {item.name}
                </a>
            ))}
             {/* Section Authentification Mobile */}
             <div className="border-t border-border/20 pt-4 mt-4 space-y-3">
               {userData ? (
                 <>
                   <div className="px-4 py-2 text-base font-medium text-primary flex items-center bg-primary/10 rounded-full">
                     <User className="h-4 w-4 mr-2" />
                     {userData.name || userData.email}
                   </div>
                   <button
                     onClick={handleLogout}
                     className="block w-full text-left rounded-full px-4 py-2.5 text-base font-medium hover:bg-red-500/10 hover:text-red-500 transition-colors flex items-center"
                   >
                     <LogOut className="h-4 w-4 mr-2" />
                     Déconnexion
                   </button>
                 </>
               ) : (
                 <>
                   <Link
                     to="/login"
                     onClick={() => setIsMobileMenuOpen(false)}
                     className="block rounded-full px-4 py-2.5 text-base font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                   >
                     Connexion
                   </Link>
                   <Link
                     to="/create-user"
                     onClick={() => setIsMobileMenuOpen(false)}
                     className="block rounded-full px-4 py-2.5 text-base font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center hover:shadow-md hover:shadow-blue-500/20 transition-all"
                   >
                     S'inscrire
                   </Link>
                 </>
               )}
             </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;
