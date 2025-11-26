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
            className="bg-[#0f0f13] border border-white/5 rounded-3xl p-6 flex flex-col h-full hover:border-white/10 transition-colors group"
        >
            <div className="flex items-start gap-4 mb-4">
                <div className="p-3 bg-white/5 rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                    {icon}
                </div>
                <div>
                    <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
                </div>
            </div>

            <p className="text-gray-400 text-sm mb-6">
                {description}
            </p>

            {/* Zone de contenu hauteur fixe */}
            <div className="flex-grow mb-6 rounded-xl overflow-hidden bg-black/20 relative flex items-center justify-center min-h-[352px]">
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
                            className="flex items-center text-sm text-gray-500"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mr-3" />
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

    const makeRandomMove = useCallback(() => {
        const possibleMoves = game.moves();
        if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) return;
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        game.move(possibleMoves[randomIndex]);
        setGame(new Chess(game.fen()));
        setFen(game.fen());
    }, [game]);

    function onDrop(sourceSquare: string, targetSquare: string) {
        try {
            const move = game.move({ from: sourceSquare, to: targetSquare, promotion: "q" });
            if (move === null) return false;
            setGame(new Chess(game.fen()));
            setFen(game.fen());
            setTimeout(makeRandomMove, 200);
            return true;
        } catch (error) { return false; }
    }

    const resetGame = () => {
        const newGame = new Chess();
        setGame(newGame);
        setFen(newGame.fen());
    };

    return (
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#111]">
            <div className="w-[280px] h-[280px]">
                <Chessboard
                    position={fen}
                    onPieceDrop={onDrop}
                    boardWidth={280}
                    customDarkSquareStyle={{ backgroundColor: "#779556" }}
                    customLightSquareStyle={{ backgroundColor: "#ebecd0" }}
                />
            </div>
            <button onClick={resetGame} className="mt-4 text-xs bg-white/10 hover:bg-white/20 text-white px-3 py-1 rounded-full transition-colors">
                Reset
            </button>
        </div>
    );
};

// --- 3. Slider Divertissement (Modifié pour recevoir l'index du parent) ---
const EntertainmentSlider = ({ currentIndex }: { currentIndex: number }) => {
    // Note: Le setInterval est géré par le parent maintenant, ou on l'affiche juste ici.
    // Pour une meilleure synchro, l'affichage dépend purement de `currentIndex`.

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
        <section className="py-24 bg-[#050505] text-white">
            <div className="container px-4 md:px-6 mx-auto">

                <div className="flex flex-col items-center text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-gray-400 mb-4"
                    >
                        Au-delà du Code
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
                    >
                        Mes Passions
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-gray-400 max-w-[600px] text-lg"
                    >
                        Ce qui m'anime en dehors du développement.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto items-stretch">

                    <PassionCard
                        title="Musique"
                        description="Les mélodies qui rythment mes journées et boostent ma créativité."
                        icon={<FaMusic />}
                        delay={0.3}
                        tags={["Lo-fi Hip Hop", "Synthwave", "OST", "Rock Alternatif"]}
                    >
                        <SpotifyEmbed />
                    </PassionCard>

                    <PassionCard
                        title="Échecs"
                        description="À vous de jouer ! Essayez de battre l'ordinateur (il joue aléatoirement pour vous laisser une chance)."
                        icon={<FaChess />}
                        delay={0.4}
                        tags={["Ouvertures : Sicilienne", "Jeu en ligne", "Stratégie"]}
                    >
                        <PlayableChessBoard />
                    </PassionCard>

                    <PassionCard
                        title="Divertissement"
                        description="Ma pause culturelle : Un mélange de cinéma, d'animation et de gaming."
                        icon={<BiMoviePlay className="text-xl" />}
                        delay={0.5}
                        // ICI: On passe les tags dynamiques basés sur l'index actuel
                        tags={entertainmentItems[entertainmentIndex].tags}
                    >
                        {/* On passe l'index au slider pour qu'il affiche la bonne image */}
                        <EntertainmentSlider currentIndex={entertainmentIndex} />
                    </PassionCard>

                </div>
            </div>
        </section>
    );
};

export default PassionsSection;