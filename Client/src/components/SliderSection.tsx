import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Maximize2, Minus, X, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SliderSectionProps {
  className?: string;
}

interface CommandHistory {
  type: "input" | "output";
  content: React.ReactNode;
}

const COMMANDS = {
  help: "Commandes disponibles : about, skills, projects, contact, clear, whoami",
  about: "Je suis un développeur passionné, créant des expériences web modernes et performantes.",
  skills: "Frontend: React, Next.js, Tailwind, Framer Motion\nBackend: Node.js, Python, SQL\nDesign: Figma, UI/UX",
  projects: "Mes projets récents sont visibles dans la section 'Projets' ci-dessous. Jetez-y un œil !",
  contact: "Vous pouvez me contacter via le formulaire en bas de page ou sur mes réseaux sociaux.",
  whoami: "User: Visiteur\nRole: Recruteur Potentiel (j'espère !)\nLocation: Internet",
  clear: "clear",
};

const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    indexRef.current = 0;
    setDisplayedText("");

    const interval = setInterval(() => {
      if (indexRef.current < text.length) {
        setDisplayedText((prev) => prev + text.charAt(indexRef.current));
        indexRef.current++;
      } else {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, 20); // Vitesse de frappe

    return () => clearInterval(interval);
  }, [text, onComplete]);

  return <span className="whitespace-pre-wrap">{displayedText}</span>;
};

const SliderSection = ({ className }: SliderSectionProps) => {
  const [history, setHistory] = useState<CommandHistory[]>([
    { type: "output", content: "Bienvenue dans le terminal interactif v1.0.0" },
    { type: "output", content: "Tapez 'help' pour voir la liste des commandes." },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll vers le bas
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isTyping]);

  const handleCommand = async (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    // Ajout de la commande saisie à l'historique
    setHistory((prev) => [...prev, { type: "input", content: cmd }]);
    setInputValue("");
    setIsTyping(true);

    // Traitement de la commande
    if (trimmedCmd === "clear") {
      setTimeout(() => {
        setHistory([]);
        setIsTyping(false);
      }, 300);
      return;
    }

    let response = COMMANDS[trimmedCmd as keyof typeof COMMANDS];

    // Traitement spécifique pour whoami avec géolocalisation
    if (trimmedCmd === "whoami") {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        const location = data.city && data.country_name ? `${data.city}, ${data.country_name}` : "Internet";
        response = `User: Visiteur\nRole: Recruteur Potentiel (j'espère !)\nLocation: ${location}`;
      } catch (error) {
        response = "User: Visiteur\nRole: Recruteur Potentiel (j'espère !)\nLocation: Internet (Géolocalisation échouée)";
      }
    }

    if (response) {
      // Simulation d'un petit délai de traitement
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            type: "output",
            content: <TypewriterText text={response} onComplete={() => setIsTyping(false)} />
          }
        ]);
      }, 300);
    } else {
      setTimeout(() => {
        setHistory((prev) => [
          ...prev,
          {
            type: "output",
            content: <span className="text-red-400">Commande non reconnue: {cmd}. Tapez 'help'.</span>
          }
        ]);
        setIsTyping(false);
      }, 300);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isTyping && inputValue.trim()) {
      handleCommand(inputValue);
    }
  };

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <section className={cn("py-20 bg-background w-full", className)}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            Terminal Interactif
          </h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto mb-8">
            Explorez mon profil via la ligne de commande. Tapez <code className="bg-muted px-1 py-0.5 rounded font-mono text-sm">help</code> pour commencer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div
            className="bg-[#1e1e1e] dark:bg-[#0c0c0c] rounded-xl overflow-hidden shadow-2xl border border-white/10 font-mono text-sm md:text-base relative"
            onClick={focusInput}
          >
            {/* Terminal Header */}
            <div className="bg-[#2d2d2d] dark:bg-[#1a1a1a] px-4 py-3 flex items-center justify-between border-b border-white/5">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
                <div className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-xs">
                <Terminal className="w-3 h-3" />
                <span>visitor@portfolio: ~</span>
              </div>
              <div className="flex gap-4 opacity-0 md:opacity-100"> {/* Spacer for centering */}
                <div className="w-3 h-3" />
                <div className="w-3 h-3" />
                <div className="w-3 h-3" />
              </div>
            </div>

            {/* Terminal Content */}
            <div
              ref={scrollRef}
              className="p-6 h-[500px] overflow-y-auto text-gray-300 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent"
            >
              {history.map((entry, index) => (
                <div key={index} className="mb-2">
                  {entry.type === "input" ? (
                    <div className="flex items-center gap-2 text-gray-100">
                      <ChevronRight className="w-4 h-4 text-green-500 shrink-0" />
                      <span className="text-green-500 font-bold">~</span>
                      <span>{entry.content}</span>
                    </div>
                  ) : (
                    <div className="ml-6 text-gray-400 leading-relaxed">
                      {entry.content}
                    </div>
                  )}
                </div>
              ))}

              {/* Input Line */}
              <div className="flex items-center gap-2 mt-2">
                <ChevronRight className="w-4 h-4 text-green-500 shrink-0" />
                <span className="text-green-500 font-bold">~</span>
                <div className="relative flex-1">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full bg-transparent border-none outline-none text-gray-100 placeholder-gray-600"
                    autoFocus
                    autoComplete="off"
                    spellCheck="false"
                    disabled={isTyping}
                  />
                  {/* Blinking Cursor (only if input is focused and not typing) */}
                  {!isTyping && (
                    <motion.span
                      animate={{ opacity: [1, 0] }}
                      transition={{ duration: 0.8, repeat: Infinity }}
                      className="absolute top-0 h-5 w-2.5 bg-gray-400 ml-0.5 pointer-events-none"
                      style={{ left: `${inputValue.length}ch` }} // Approximate cursor position
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default SliderSection;
