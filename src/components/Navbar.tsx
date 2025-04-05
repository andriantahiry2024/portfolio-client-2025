import React, { useState, useEffect, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X, LogOut, User } from "lucide-react";
import { useNavigate, useLocation, Link } from "react-router-dom"; // Ajouter Link
import { useToast } from "@/components/ui/use-toast";

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
        const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/auth/me`;
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

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
    // Priorité à la mise à jour visuelle
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");

    // Puis mettre à jour l'état et localStorage
    setTheme(newTheme);

    // Utiliser requestAnimationFrame pour différer l'écriture localStorage
    requestAnimationFrame(() => {
      localStorage.setItem("theme", newTheme);
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
        "fixed top-0 w-full z-50 transition-all duration-300 bg-background",
        isScrolled ? "border-b shadow-sm" : "",
        className,
      )}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <a
            href="/"
            className="text-xl font-bold tracking-tight hover:text-primary transition-colors"
            onClick={(e) => {
              e.preventDefault();
              navigate("/");
            }}
          >
            Portfolio
          </a>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4"> {/* Ajuster space-x si besoin */}
          {/* Liens de navigation principaux */}
          {navItems
            .filter(item => !(item.name === 'Admin' && (!userData || !['ADMIN', 'SUPERADMIN'].includes(userData.role)))) // Filtrer Admin si non autorisé
            .filter(item => !(item.name === 'Blog' && location.pathname.startsWith('/blog'))) // Optionnel: Cacher Blog si déjà sur une page de blog
            .map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href, item.isExternal);
                }}
              >
                {item.name}
              </a>
           ))}

          {/* Section Authentification */}
          <div className="flex items-center space-x-2 border-l pl-4 ml-2"> {/* Séparateur visuel */}
            {userData ? (
              <>
                <span className="text-sm font-medium text-muted-foreground hidden lg:inline flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Bonjour, {userData.name || userData.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleLogout} className="flex items-center">
                  <LogOut className="h-4 w-4 mr-1" />
                  Déconnexion
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/login">Connexion</Link>
                </Button>
                <Button variant="default" size="sm" asChild>
                   <Link to="/create-user">S'inscrire</Link>
                 </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="ml-2" // Marge pour séparer du reste
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t">
          <div className="container mx-auto px-4 py-4 space-y-1">
             {/* Liens de navigation principaux Mobile */}
            {navItems
              .filter(item => !(item.name === 'Admin' && (!userData || !['ADMIN', 'SUPERADMIN'].includes(userData.role))))
              .filter(item => !(item.name === 'Blog' && location.pathname.startsWith('/blog')))
              .map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href, item.isExternal);
                  }}
                >
                  {item.name}
                </a>
            ))}
             {/* Section Authentification Mobile */}
             <div className="border-t pt-4 mt-4 space-y-2">
               {userData ? (
                 <>
                   <div className="px-3 py-2 text-base font-medium text-muted-foreground flex items-center">
                     <User className="h-4 w-4 mr-2" />
                     Bonjour, {userData.name || userData.email}
                   </div>
                   <button
                     onClick={handleLogout}
                     className="block w-full text-left rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground flex items-center"
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
                     className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                   >
                     Connexion
                   </Link>
                   <Link
                     to="/create-user"
                     onClick={() => setIsMobileMenuOpen(false)}
                     className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                   >
                     S'inscrire
                   </Link>
                 </>
               )}
             </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
