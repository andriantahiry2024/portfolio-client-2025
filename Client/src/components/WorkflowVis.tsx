import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FileText,
    Mail,
    User,
    CheckCircle2,
    Zap,
    Play,
    Timer,
    Coins,
    Cpu,
    ArrowRight,
    TrendingUp
} from "lucide-react";

// Real-world use cases with concrete stats
const USE_CASES = {
    INVOICES: {
        id: "INVOICES",
        label: "Traitement Factures",
        icon: FileText,
        sourceName: "PDFs / Factures",
        resultName: "Paiements",
        description: "Extraction auto des données et virement.",
        manualTimePerItem: 15, // minutes
        aiTimePerItem: 0.1, // minutes
        color: "text-blue-400"
    },
    LEADS: {
        id: "LEADS",
        label: "Qualification Leads",
        icon: User,
        sourceName: "Profils LinkedIn",
        resultName: "RDV Qualifiés",
        description: "Scoring, enrichissement et booking.",
        manualTimePerItem: 20,
        aiTimePerItem: 0.2,
        color: "text-emerald-400"
    },
    EMAILS: {
        id: "EMAILS",
        label: "Tri Emails",
        icon: Mail,
        sourceName: "Emails Entrants",
        resultName: "Réponses",
        description: "Analyse et brouillons de réponse.",
        manualTimePerItem: 5,
        aiTimePerItem: 0.05,
        color: "text-purple-400"
    }
};

const WorkflowVis = () => {
    const [activeCase, setActiveCase] = useState<keyof typeof USE_CASES>("INVOICES");
    const [isProcessing, setIsProcessing] = useState(false);
    const [processedCount, setProcessedCount] = useState(0);

    const currentCase = USE_CASES[activeCase];

    // Calculate stats based on processed items
    const manualTime = processedCount * currentCase.manualTimePerItem; // Minutes
    const aiTime = processedCount * currentCase.aiTimePerItem; // Minutes

    const timeSavedMinutes = manualTime - aiTime;
    const timeSavedHours = Math.floor(timeSavedMinutes / 60);
    const timeSavedMinsRemainder = Math.floor(timeSavedMinutes % 60);

    const startProcessing = () => {
        if (isProcessing) return;
        setIsProcessing(true);
        setProcessedCount(0);

        // Launch a batch of items rapidly
        let count = 0;
        const maxItems = 50; // Process 50 items in the demo

        // Fast interval to simulate high speed processing
        const interval = setInterval(() => {
            count++;
            setProcessedCount(prev => prev + 1);

            if (count >= maxItems) {
                clearInterval(interval);
                setIsProcessing(false);
            }
        }, 60); // 60ms per item = very fast
    };

    return (
        <Card className="bg-card border-border p-6 md:p-8 relative overflow-hidden flex flex-col gap-8">

            {/* 1. Header & Scenario Selection */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
                <div className="space-y-4 max-w-xl">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-foreground text-background rounded-lg">
                            <Zap className="w-6 h-6 fill-current" />
                        </div>
                        <h3 className="text-3xl font-bold text-foreground">
                            La Puissance de l'Automation
                        </h3>
                    </div>
                    <p className="text-muted-foreground text-lg">
                        Voyez la différence. Sélectionnez une tâche et lancez l'IA.
                    </p>

                    {/* Scenario Buttons */}
                    <div className="flex flex-wrap gap-2 mt-4">
                        {(Object.keys(USE_CASES) as Array<keyof typeof USE_CASES>).map((key) => (
                            <button
                                key={key}
                                onClick={() => { if (!isProcessing) { setActiveCase(key); setProcessedCount(0); } }}
                                className={`flex items-center gap-2 px-4 py-2 text-sm font-bold rounded-full border transition-all ${activeCase === key
                                    ? "bg-secondary text-secondary-foreground border-foreground/20 shadow-sm"
                                    : "bg-transparent text-muted-foreground border-border hover:border-foreground/30 hover:bg-secondary/20"
                                    }`}
                            >
                                {USE_CASES[key].label}
                            </button>
                        ))}
                    </div>

                    {/* Dynamic Description & Explanation */}
                    <motion.div
                        key={activeCase}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 p-4 rounded-lg bg-secondary/10 border border-border/50"
                    >
                        <h4 className="text-foreground font-bold text-sm flex items-center gap-2 mb-1">
                            <currentCase.icon className="w-4 h-4" />
                            Ce que l'IA fait pour vous :
                        </h4>
                        <p className="text-muted-foreground text-sm">
                            {currentCase.description}
                        </p>
                        <p className="text-xs text-muted-foreground/60 mt-3 pt-3 border-t border-border/30">
                            <span className="font-bold">Mode d'emploi :</span> Cliquez sur le bouton "Simuler" ci-dessous pour voir la vitesse de traitement de notre moteur IA face à un humain.
                        </p>
                    </motion.div>
                </div>

                {/* ROI Counter (Big Numbers) */}
                <div className="w-full lg:w-auto bg-secondary/10 p-6 rounded-2xl border border-border/50 backdrop-blur-sm">
                    <div className="flex items-center justify-between lg:justify-end gap-4 mb-2">
                        <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                            Temps Économisé (Est.)
                        </p>
                        <TrendingUp className="w-4 h-4 text-green-500" />
                    </div>
                    <div className="text-4xl md:text-5xl font-mono font-black text-foreground flex items-baseline justify-end gap-2">
                        {timeSavedHours}
                        <span className="text-lg font-bold text-muted-foreground">h</span>
                        {timeSavedMinsRemainder}
                        <span className="text-lg font-bold text-muted-foreground">m</span>
                    </div>
                    <p className="text-xs text-right text-muted-foreground mt-2">
                        sur {processedCount} {currentCase.label.toLowerCase()}
                    </p>
                </div>
            </div>

            {/* 2. The Visual Pipeline */}
            <div className="relative h-[240px] bg-black/40 rounded-2xl border border-white/5 flex items-center px-4 md:px-16 gap-4 overflow-hidden">

                {/* Background Grid & Particles */}
                <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
                    backgroundImage: "radial-gradient(circle, #333 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                }}></div>

                {/* Left: Input Pile */}
                <div className="relative z-10 flex flex-col items-center gap-3 min-w-[100px]">
                    <div className="w-20 h-20 rounded-2xl bg-secondary/30 border border-border flex items-center justify-center relative">
                        <currentCase.icon className="w-8 h-8 text-muted-foreground" />
                        <div className="absolute -top-3 -left-3 px-2 py-1 rounded-md bg-border text-xs font-mono text-muted-foreground">
                            Input
                        </div>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">{currentCase.sourceName}</span>
                </div>

                {/* Center: The Stream */}
                <div className="flex-1 h-full relative flex items-center justify-center">

                    {/* The Engine (Center) */}
                    <div className={`relative z-20 w-28 h-28 rounded-full border-4 flex items-center justify-center bg-card transition-all duration-300 ${isProcessing ? 'border-foreground shadow-[0_0_60px_rgba(255,255,255,0.15)] scale-105' : 'border-border'}`}>
                        <Cpu className={`w-12 h-12 transition-colors ${isProcessing ? 'text-foreground' : 'text-muted-foreground'}`} />
                        {isProcessing && (
                            <div className="absolute inset-0 rounded-full border-t-4 border-foreground animate-spin"></div>
                        )}
                        <div className="absolute -bottom-10 text-xs font-bold tracking-widest uppercase text-muted-foreground">
                            AI Engine
                        </div>
                    </div>

                    {/* Connecting Track */}
                    <div className="absolute top-1/2 left-0 right-0 h-[2px] bg-border/30 -z-10 -translate-y-1/2"></div>

                    {/* Flying Items */}
                    <AnimatePresence>
                        {isProcessing && [...Array(5)].map((_, i) => (
                            <motion.div
                                key={i}
                                initial={{ x: "-150%", opacity: 0, scale: 0.5 }}
                                animate={{ x: "150%", opacity: [0, 1, 1, 0], scale: 1 }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    delay: i * 0.3,
                                    ease: "easeInOut"
                                }}
                                className="absolute z-10 p-3 rounded-full bg-foreground text-background shadow-lg"
                            >
                                <currentCase.icon className="w-5 h-5" />
                            </motion.div>
                        ))}
                    </AnimatePresence>

                </div>

                {/* Right: Output Pile */}
                <div className="relative z-10 flex flex-col items-center gap-3 min-w-[100px]">
                    <div className={`w-20 h-20 rounded-2xl border flex items-center justify-center relative transition-all duration-300 ${processedCount > 0 ? 'bg-foreground text-background border-transparent shadow-xl' : 'bg-transparent border-dashed border-border'}`}>
                        <CheckCircle2 className={`w-10 h-10 transition-all ${processedCount > 0 ? 'scale-110' : 'text-muted-foreground/30'}`} />

                        <div className="absolute -top-3 -right-3 px-2 py-1 rounded-md bg-green-500/20 text-green-500 border border-green-500/30 text-xs font-bold font-mono">
                            {processedCount}
                        </div>
                    </div>
                    <span className="text-xs font-semibold text-muted-foreground">{currentCase.resultName}</span>
                </div>

            </div>

            {/* 3. Action Button */}
            <div className="mt-4 flex justify-center">
                <Button
                    size="lg"
                    onClick={startProcessing}
                    disabled={isProcessing}
                    className={`min-w-[300px] font-bold text-lg h-14 rounded-full transition-all duration-300 ${isProcessing
                        ? "bg-secondary text-muted-foreground cursor-not-allowed opacity-50"
                        : "bg-foreground text-background hover:scale-105 hover:shadow-lg"
                        }`}
                >
                    {isProcessing ? (
                        <span className="flex items-center gap-3">
                            <TrendingUp className="w-5 h-5 animate-pulse" />
                            TRAITEMENT EN COURS...
                        </span>
                    ) : (
                        <span className="flex items-center gap-3">
                            <Play className="fill-current w-5 h-5" />
                            SIMULER L'AUTOMATISATION
                        </span>
                    )}
                </Button>
            </div>

        </Card>
    );
};

export default WorkflowVis;
