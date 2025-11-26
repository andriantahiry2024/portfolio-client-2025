import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Target, Trophy, Timer, Play, RotateCcw, Zap } from "lucide-react";

interface SliderSectionProps {
  className?: string;
}

const GAME_DURATION = 30; // seconds
const DIFFICULTIES = {
  easy: { speed: 2000, size: 70, label: "Facile" },
  medium: { speed: 1200, size: 60, label: "Moyen" },
  hard: { speed: 800, size: 50, label: "Difficile" },
};

type Difficulty = keyof typeof DIFFICULTIES;

interface Particle {
  id: number;
  x: number;
  y: number;
}

const SliderSection = ({ className }: SliderSectionProps) => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameStatus, setGameStatus] = useState<"idle" | "playing" | "finished">("idle");
  const [targetPosition, setTargetPosition] = useState({ top: "50%", left: "50%" });
  const [difficulty, setDifficulty] = useState<Difficulty>("medium");
  const [particles, setParticles] = useState<Particle[]>([]);
  const [combo, setCombo] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const moveIntervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      endGame();
    }
    return () => clearInterval(interval);
  }, [isPlaying, timeLeft]);

  useEffect(() => {
    if (isPlaying) {
      const speed = DIFFICULTIES[difficulty].speed;
      moveIntervalRef.current = setInterval(() => {
        moveTarget();
      }, speed);
    }
    return () => {
      if (moveIntervalRef.current) {
        clearInterval(moveIntervalRef.current);
      }
    };
  }, [isPlaying, difficulty]);

  const startGame = () => {
    setScore(0);
    setCombo(0);
    setTimeLeft(GAME_DURATION);
    setIsPlaying(true);
    setGameStatus("playing");
    moveTarget();
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameStatus("finished");
    if (score > highScore) {
      setHighScore(score);
    }
    setCombo(0);
  };

  const moveTarget = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      const targetSize = DIFFICULTIES[difficulty].size;
      const maxX = container.clientWidth - targetSize;
      const maxY = container.clientHeight - targetSize;

      const newX = Math.floor(Math.random() * maxX);
      const newY = Math.floor(Math.random() * maxY);

      setTargetPosition({ top: `${newY}px`, left: `${newX}px` });
    }
  };

  const createParticles = (x: number, y: number) => {
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x,
      y,
    }));
    setParticles((prev) => [...prev, ...newParticles]);
    setTimeout(() => {
      setParticles((prev) => prev.filter((p) => !newParticles.find((np) => np.id === p.id)));
    }, 1000);
  };

  const handleTargetClick = (e: React.MouseEvent) => {
    if (!isPlaying) return;

    const newCombo = combo + 1;
    setCombo(newCombo);
    const points = 1 + Math.floor(newCombo / 5);
    setScore((prev) => prev + points);

    createParticles(e.clientX, e.clientY);
    moveTarget();
  };

  const targetSize = DIFFICULTIES[difficulty].size;

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
            Zone Interactive
          </h2>
          <p className="text-muted-foreground max-w-[700px] mx-auto mb-8">
            Testez vos réflexes ! Cliquez sur la cible aussi vite que possible pour marquer des points.
          </p>
        </motion.div>

        <Card className="max-w-4xl mx-auto border border-border/40 bg-card overflow-hidden relative min-h-[500px] flex flex-col">
          {/* Header Stats */}
          <div className="p-6 border-b border-border/40 flex justify-between items-center bg-muted/30">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-xl font-bold">
                <Trophy className="text-yellow-500 w-6 h-6" />
                <span>Score: {score}</span>
              </div>
              {combo > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex items-center gap-1 text-sm font-bold text-orange-500"
                >
                  <Zap className="w-4 h-4" />
                  <span>Combo x{combo}</span>
                </motion.div>
              )}
            </div>
            <div className="flex items-center gap-4">
              {highScore > 0 && (
                <div className="text-sm text-muted-foreground">
                  Record: {highScore}
                </div>
              )}
              <div className="flex items-center gap-2 text-xl font-bold font-mono">
                <Timer className={cn("w-6 h-6", timeLeft < 10 ? "text-red-500" : "text-primary")} />
                <span className={cn(timeLeft < 10 ? "text-red-500" : "")}>00:{timeLeft.toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          {/* Game Area */}
          <div
            ref={containerRef}
            className="flex-1 relative bg-gradient-to-br from-black/5 via-black/10 to-black/5 dark:from-black/20 dark:via-black/30 dark:to-black/20 cursor-crosshair overflow-hidden"
          >
            {/* Particles */}
            <AnimatePresence>
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  initial={{ scale: 1, opacity: 1, x: particle.x, y: particle.y }}
                  animate={{
                    scale: 0,
                    opacity: 0,
                    x: particle.x + (Math.random() - 0.5) * 100,
                    y: particle.y + (Math.random() - 0.5) * 100,
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="absolute w-2 h-2 bg-primary rounded-full pointer-events-none"
                  style={{ left: 0, top: 0 }}
                />
              ))}
            </AnimatePresence>

            <AnimatePresence>
              {gameStatus === "idle" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm z-10"
                >
                  <Target className="w-24 h-24 text-primary mb-6 animate-pulse" />
                  <h3 className="text-2xl font-bold mb-4">Prêt à jouer ?</h3>
                  <div className="flex gap-2 mb-6">
                    {(Object.keys(DIFFICULTIES) as Difficulty[]).map((diff) => (
                      <Button
                        key={diff}
                        variant={difficulty === diff ? "default" : "outline"}
                        size="sm"
                        onClick={() => setDifficulty(diff)}
                      >
                        {DIFFICULTIES[diff].label}
                      </Button>
                    ))}
                  </div>
                  <Button size="lg" onClick={startGame} className="text-lg px-8">
                    <Play className="mr-2 w-5 h-5" /> Commencer
                  </Button>
                </motion.div>
              )}

              {gameStatus === "finished" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-background/90 backdrop-blur-md z-10"
                >
                  <Trophy className="w-24 h-24 text-yellow-500 mb-6" />
                  <h3 className="text-3xl font-bold mb-2">Partie Terminée !</h3>
                  <p className="text-xl text-muted-foreground mb-2">
                    Votre score : <span className="text-primary font-bold">{score}</span>
                  </p>
                  {score === highScore && score > 0 && (
                    <p className="text-sm text-yellow-500 mb-4">🎉 Nouveau record !</p>
                  )}
                  <p className="text-sm text-muted-foreground mb-8">
                    Difficulté : {DIFFICULTIES[difficulty].label}
                  </p>
                  <Button size="lg" onClick={startGame} className="text-lg px-8">
                    <RotateCcw className="mr-2 w-5 h-5" /> Rejouer
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>

            {gameStatus === "playing" && (
              <motion.button
                key={`${targetPosition.top}-${targetPosition.left}`}
                initial={{ scale: 0 }}
                animate={{
                  top: targetPosition.top,
                  left: targetPosition.left,
                  scale: 1
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 25
                }}
                onClick={handleTargetClick}
                className="absolute rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-[0_0_20px_rgba(var(--primary),0.6)] flex items-center justify-center group"
                style={{
                  width: `${targetSize}px`,
                  height: `${targetSize}px`
                }}
              >
                <div className="w-[60%] h-[60%] rounded-full border-2 border-white/50 group-hover:border-white transition-colors" />
                <div className="absolute w-[20%] h-[20%] bg-white rounded-full" />
              </motion.button>
            )}
          </div>
        </Card>
      </div>
    </section>
  );
};

export default SliderSection;
