import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FaMusic,
    FaChess,
} from "react-icons/fa";
import { BiMoviePlay } from "react-icons/bi";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

// --- Types ---
interface PassionCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
    children: React.ReactNode;
    tags: string[];
    delay: number;
}

// --- Données du Slider (Définies en dehors pour être accessibles partout) ---
const entertainmentItems = [
    {
        title: "Peaky Blinders",
        type: "Série TV",
        image: "https://goldendiscs.ie/cdn/shop/products/MM00306950.jpg?v=1690704327",
        // Tags spécifiques à Peaky Blinders
        tags: ["Drame Historique", "Gangsters", "Birmingham", "Cillian Murphy"]
    },
    {
        title: "Solo Leveling",
        type: "Animé",
        image: "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2373990/076c85e9fccad9865b82d91e939f73a4a7314632/capsule_616x353.jpg?t=1764021513",
        // Tags spécifiques à Solo Leveling
        tags: ["Action Fantasy", "Système RPG", "Chasseurs", "Animation High-Tier"]
    },
    {
        title: "Wuthering Waves",
        type: "Jeu Vidéo",
        image: "https://cdn1.epicgames.com/spt-assets/c1586295960b46f88bbfeec32c199e0e/wuthering-waves-6ccb7.jpg",
        // Tags spécifiques à Wuthering Waves
        tags: ["Action RPG", "Open World", "Combat Rapide", "Gacha"]
    },
    {
        title: "Interstellar",
        type: "Film",
        image: "https://m.media-amazon.com/images/M/MV5BYzdjMDAxZGItMjI2My00ODA1LTlkNzItOWFjMDU5ZDJlYWY3XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
        // Tags spécifiques à Interstellar
        tags: ["Sci-Fi", "Espace", "Hans Zimmer", "Voyage Temporel"]
    }
];

// --- Composant Carte Générique ---
const PassionCard = ({ title, description, icon, children, tags, delay }: PassionCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="bg-gray-50 dark:bg-[#0f0f13] border border-black/5 dark:border-white/5 rounded-3xl p-6 flex flex-col h-full hover:border-black/10 dark:hover:border-white/10 transition-colors group shadow-sm dark:shadow-none"
        >
            <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-black/5 dark:bg-white/5 rounded-xl text-black dark:text-white group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-black dark:text-white mb-1">{title}</h3>
                </div>
            </div>

            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                {description}
            </p>

            {/* Zone de contenu hauteur fixe */}
            <div className="flex-grow mb-6 rounded-xl overflow-hidden bg-black/5 dark:bg-black/20 relative flex items-center justify-center min-h-[352px]">
                {children}
            </div>

            <div className="mt-auto">
                {/* Ajout d'une animation légère sur le changement de liste */}
                <ul className="space-y-2">
                    {tags.map((tag, i) => (
                        <motion.li
                            key={`${tag}-${i}`} // Clé unique pour forcer l'animation
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            className="flex items-center text-sm text-gray-500 dark:text-gray-500"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-600 mr-3" />
                            {tag}
                        </motion.li>
                    ))}
                </ul>
            </div>
        </motion.div>
    );
};

// --- 1. Composant Spotify Embed ---
const SpotifyEmbed = () => (
    <div className="w-full h-full">
        <iframe
            style={{ borderRadius: "12px" }}
            src="https://open.spotify.com/embed/playlist/6aBpIrRa4RP5ZMGPodyyEH?utm_source=generator"
            width="100%"
            height="352"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Player"
        ></iframe>
    </div>
);

// --- 2. Composant Jeu d'Échecs ---
const PlayableChessBoard = () => {
    const [game, setGame] = useState(new Chess());
    const [fen, setFen] = useState(game.fen());
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('medium');

    // Fonction d'évaluation simple pour le niveau Difficile
    const evaluateBoard = (game: Chess) => {
        const pieceValues: { [key: string]: number } = {
            p: 1, n: 3, b: 3, r: 5, q: 9, k: 0,
            P: -1, N: -3, B: -3, R: -5, Q: -9, K: 0
        };
        let totalEvaluation = 0;
        const board = game.board();
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = board[i][j];
                if (piece) {
                    totalEvaluation += pieceValues[piece.type] * (piece.color === 'w' ? 1 : -1);
                }
            }
        }
        return totalEvaluation;
    };

    const makeComputerMove = useCallback(() => {
        const possibleMoves = game.moves({ verbose: true });
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;

        let chosenMove;

        if (difficulty === 'easy') {
            // Facile : Coup totalement aléatoire
            const randomIndex = Math.floor(Math.random() * possibleMoves.length);
            chosenMove = possibleMoves[randomIndex];
        } else if (difficulty === 'medium') {
            // Moyen : Essaie de capturer une pièce si possible, sinon aléatoire
            const captureMoves = possibleMoves.filter(move => move.flags.includes('c') || move.flags.includes('e'));
            if (captureMoves.length > 0) {
                const randomIndex = Math.floor(Math.random() * captureMoves.length);
                chosenMove = captureMoves[randomIndex];
            } else {
                const randomIndex = Math.floor(Math.random() * possibleMoves.length);
                chosenMove = possibleMoves[randomIndex];
            }
        } else {
            // Difficile : Cherche le meilleur coup immédiat (profondeur 1)
            let bestMove = null;
            let bestValue = Infinity; // L'IA joue les noirs, elle cherche à MINIMISER le score

            // Mélanger les coups pour varier les parties si égalité
            possibleMoves.sort(() => Math.random() - 0.5);

            for (const move of possibleMoves) {
                game.move(move.san);
                const boardValue = evaluateBoard(game);
                game.undo();

                if (boardValue < bestValue) {
                    bestValue = boardValue;
                    bestMove = move;
                }
            }
            chosenMove = bestMove || possibleMoves[0];
        }

        if (chosenMove) {
            game.move(chosenMove.san);
            setGame(new Chess(game.fen()));
            setFen(game.fen());
        }
    }, [game, difficulty]);

    function onDrop(sourceSquare: string, targetSquare: string) {
        try {
            const move = game.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
            if (move === null) return false;
            setGame(new Chess(game.fen()));
            setFen(game.fen());
            setTimeout(makeComputerMove, 250);
            return true;
        } catch (error) { return false; }
    }

    const resetGame = () => {
        const newGame = new Chess();
        setGame(newGame);
        setFen(newGame.fen());
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 dark:bg-[#111]">
            <div className="w-[280px] h-[280px] mb-2">
                <Chessboard
                    position={fen}
                    onPieceDrop={onDrop}
                    boardWidth={280}
                    customDarkSquareStyle={{ backgroundColor: "#779556" }}
                    customLightSquareStyle={{ backgroundColor: "#ebecd0" }}
                />
            </div>

            <div className="flex gap-2 items-center">
                <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value as any)}
                    className="text-xs bg-white dark:bg-black border border-gray-300 dark:border-white/20 rounded-md px-2 py-1 text-black dark:text-white focus:outline-none focus:ring-1 focus:ring-primary"
                >
                    <option value="easy">Facile</option>
                    <option value="medium">Moyen</option>
                    <option value="hard">Difficile</option>
                </select>

                <button onClick={resetGame} className="text-xs bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 text-black dark:text-white px-3 py-1 rounded-md transition-colors">
                    Reset
                </button>
            </div>
        </div>
    );
};

// --- 3. Slider Divertissement (Modifié pour recevoir l'index du parent) ---
const EntertainmentSlider = ({ currentIndex }: { currentIndex: number }) => {
    return (
        <div className="w-full h-[352px] relative overflow-hidden rounded-xl group cursor-pointer">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                    {/* Image de fond */}
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url('${entertainmentItems[currentIndex].image}')` }}
                    />

                    {/* Overlay Gradient pour le texte */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90" />

                    {/* Contenu Texte */}
                    <div className="absolute bottom-0 left-0 p-6 w-full">
                        <motion.span
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1 block"
                        >
                            {entertainmentItems[currentIndex].type}
                        </motion.span>

                        <motion.h4
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-3xl font-black text-white leading-tight"
                        >
                            {entertainmentItems[currentIndex].title}
                        </motion.h4>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Indicateurs (petits points) */}
            <div className="absolute top-4 right-4 flex gap-1.5 z-10">
                {entertainmentItems.map((_, idx) => (
                    <div
                        key={idx}
                        className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-6 bg-white' : 'w-2 bg-white/30'}`}
                    />
                ))}
            </div>
        </div>
    );
};

// --- COMPOSANT PRINCIPAL ---
const PassionsSection = () => {
    // État géré ici pour synchroniser le slider ET les tags de la carte
    const [entertainmentIndex, setEntertainmentIndex] = useState(0);

    // Rotation automatique toutes les 5 secondes
    useEffect(() => {
        const timer = setInterval(() => {
            setEntertainmentIndex((prev) => (prev + 1) % entertainmentItems.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-12 bg-background text-foreground transition-colors duration-300">
            <div className="container px-4 md:px-6 mx-auto">

                <div className="flex flex-col items-center text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border mb-4"
                    >
                        Innovation Lab
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
                    >
                        Laboratoire d'Innovation
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-600 dark:text-gray-400 max-w-[600px] text-lg"
                    >
                        Nos expérimentations techniques et démonstrations d'algorithmes.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch mt-12">

                    <PassionCard
                        title="Vibe & Audio"
                        description="Intégration d'API audio et curation de flux pour optimiser focus et créativité."
                        icon={<FaMusic />}
                        delay={0.3}
                        tags={["Audio API", "Mixage Digital", "Focus Flow"]}
                    >
                        <SpotifyEmbed />
                    </PassionCard>

                    <PassionCard
                        title="Démonstration Algorithmique"
                        description="Une implémentation temps réel de logique de jeu complexe (Chess Engine Demo)."
                        icon={<FaChess />}
                        delay={0.4}
                        tags={["Théorie des Graphes", "Logique de Jeu", "Minimax Pattern"]}
                    >
                        <PlayableChessBoard />
                    </PassionCard>

                    <PassionCard
                        title="Veille Culturelle & IA"
                        description="Exploration des nouveaux formats de contenus et narration assistée par IA."
                        icon={<BiMoviePlay className="text-xl" />}
                        delay={0.5}
                        tags={entertainmentItems[entertainmentIndex].tags}
                    >
                        <EntertainmentSlider currentIndex={entertainmentIndex} />
                    </PassionCard>

                </div>
            </div>
        </section>
    );
};

export default PassionsSection;