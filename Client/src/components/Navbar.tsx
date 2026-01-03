import React, { useState, useEffect, useLayoutEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu, X } from "lucide-react";
import logo from "/logo-portfolio.svg";
import { useNavigate, useLocation } from "react-router-dom";

interface NavbarProps {
  className?: string;
}

interface UserData {
  id: string | number;
  email: string;
  firstName?: string;
  lastName?: string;
  role: string;
}

const Navbar = ({ className = "" }: NavbarProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const [activeSection, setActiveSection] = useState("#home");

  useLayoutEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" || "dark";
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
    setTheme(savedTheme);
  }, []);

  const navItems: { name: string; href: string; isExternal?: boolean }[] = [
    { name: "Accueil", href: "#home" },
    { name: "L'Agence", href: "#about" },
    { name: "Nos Expertises", href: "#skills" },

    { name: "Études de Cas", href: "#projects" },
    { name: "Contact", href: "#contact" }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section detection
      const sections = navItems
        .filter(item => !item.isExternal && item.href.startsWith("#"))
        .map(item => item.href.substring(1));

      let current = "";

      // Special check for bottom of page to activate Contact
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 50) {
        current = "#contact";
      } else {
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            // Check if section is roughly in the upper part of the viewport
            if (rect.top <= 200 && rect.bottom >= 200) {
              current = "#" + section;
              break;
            }
          }
        }
      }

      // Default to home if at top
      if (window.scrollY < 100) {
        current = "#home";
      }

      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData));
      } catch (e) {
        console.error("Erreur parsing userData dans Navbar:", e);
        localStorage.removeItem('userData');
        localStorage.removeItem('authToken');
      }
    }
  }, [location]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    setTheme(newTheme);
    requestAnimationFrame(() => {
      localStorage.setItem("theme", newTheme);
    });
  };

  const scrollToSection = (sectionId: string, isExternal = false) => {
    if (isExternal) {
      navigate(sectionId);
    } else {
      if (location.pathname !== "/" && sectionId.startsWith("#")) {
        navigate("/");
        setTimeout(() => {
          const element = document.querySelector(sectionId);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.querySelector(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[92%] md:w-[900px] max-w-5xl transition-all duration-500 ease-in-out",
          className
        )}
      >
        <div
          className={cn(
            "relative flex items-center justify-between px-5 py-2.5 rounded-full border transition-all duration-300",
            "bg-neutral-100/90 dark:bg-neutral-950/90 backdrop-blur-md shadow-xl",
            "border-neutral-300/70 dark:border-neutral-800"
          )}
        >
          {/* Logo */}
          <button
            type="button"
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            onClick={() => navigate("/")}
            aria-label="Retour à l'accueil de l'agence Teckforgeek"
          >
            <img
              src={logo}
              alt="Logo Teckforgeek Agency 2025"
              className="h-7 w-auto md:h-8"
            />

          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1.5">
            {navItems
              .filter(item => !(item.name === 'Admin' && (!userData || !['ADMIN', 'SUPERADMIN'].includes(userData.role))))
              .filter(item => !(item.name === 'Blog' && location.pathname.startsWith('/blog')))
              .map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative px-4 py-2 text-xs md:text-sm font-medium transition-all duration-300 rounded-full group",
                    activeSection === item.href
                      ? "bg-black text-white dark:bg-white dark:text-black shadow-[0_0_18px_rgba(0,0,0,0.25)] dark:shadow-[0_0_18px_rgba(255,255,255,0.25)]"
                      : "text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10"
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href, item.isExternal);
                  }}
                >
                  {item.name}
                </a>
              ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full w-8 h-8 hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-black dark:text-white"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4" />
              ) : (
                <Moon className="h-4 w-4" />
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-full w-8 h-8 hover:bg-black/5 dark:hover:bg-white/10"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          className={cn(
            "absolute top-full left-0 w-full mt-2 p-2 rounded-3xl border border-black/5 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-xl shadow-xl transition-all duration-300 origin-top",
            isMobileMenuOpen
              ? "opacity-100 scale-100 translate-y-0"
              : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
          )}
        >
          <div className="flex flex-col gap-1 p-2">
            {navItems
              .filter(item => !(item.name === 'Admin' && (!userData || !['ADMIN', 'SUPERADMIN'].includes(userData.role))))
              .filter(item => !(item.name === 'Blog' && location.pathname.startsWith('/blog')))
              .map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="px-4 py-3 text-center text-sm font-medium rounded-xl hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href, item.isExternal);
                  }}
                >
                  {item.name}
                </a>
              ))}
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
