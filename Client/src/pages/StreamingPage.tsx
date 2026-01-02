import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Play, Film, Tv, Sparkles } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const platforms = [
    { name: "Wiflix", url: "https://flemmix.bond/", tags: ["film", "serie", "anime"] },
    { name: "Colfix", url: "https://coflix.nexus/", tags: ["film", "serie"] },
    { name: "Moiflix", url: "https://moiflix.org/", tags: ["film", "serie"] },
    { name: "Walalix", url: "https://walalix.fr/", tags: ["film", "serie"] },
    { name: "Movix", url: "https://movix.club/", tags: ["film", "serie"] },
    { name: "Papadustream", url: "https://papadustream.trade/", tags: ["film", "serie"] },
    { name: "Wowfilm", url: "https://wowfilms1225.site/", tags: ["film", "serie"] },
    { name: "1jour1film", url: "https://1jour1film1225b.site/", tags: ["film", "serie"] },
    { name: "Walaflix", url: "https://xalaflix.men/", tags: ["film", "serie"] },
    { name: "FrenchStream", url: "https://fs2.lol/", tags: ["film", "serie", "anime"] },
    { name: "Wookafr", url: "https://wookafr.nexus/", tags: ["film", "serie"] },
    { name: "Esprit dongua", url: "https://esprit-donghua.xyz/anime/", tags: ["anime"] },
    { name: "Gum gum", url: "https://gum-gum-streaming.com/vf/", tags: ["anime"] },
];

const TagIcon = ({ tag }: { tag: string }) => {
    switch (tag) {
        case "film":
            return <Film className="w-3 h-3 mr-1" />;
        case "serie":
            return <Tv className="w-3 h-3 mr-1" />;
        case "anime":
            return <Sparkles className="w-3 h-3 mr-1" />;
        default:
            return null;
    }
};

const StreamingPage = () => {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-black text-white pt-20 pb-10 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
                {/* Background gradients */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointing-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[100px]" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 mb-6">
                            Plateformes de Streaming
                        </h1>
                        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                            Retrouvez une sélection des meilleures plateformes pour regarder vos films, séries et animes préférés.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {platforms.map((platform, index) => (
                            <motion.div
                                key={platform.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-25 group-hover:opacity-60 transition duration-500"></div>

                                <div className="relative h-full bg-gray-900/90 backdrop-blur-xl border border-white/10 p-6 rounded-xl hover:border-white/20 transition duration-300 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="p-3 bg-white/5 rounded-lg group-hover:bg-white/10 transition-colors">
                                                <Play className="w-6 h-6 text-purple-400 group-hover:text-purple-300 transition-colors" />
                                            </div>
                                            <a
                                                href={platform.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 text-gray-400 hover:text-white transition-colors"
                                            >
                                                <ExternalLink className="w-5 h-5" />
                                            </a>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 transition-all duration-300">
                                            {platform.name}
                                        </h3>

                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {platform.tags.map((tag) => (
                                                <span
                                                    key={tag}
                                                    className="px-3 py-1 text-xs rounded-full bg-white/5 border border-white/5 text-gray-300 flex items-center capitalize group-hover:border-white/10 transition-colors"
                                                >
                                                    <TagIcon tag={tag} />
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <a
                                        href={platform.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-medium rounded-lg text-center transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-purple-500/25 flex items-center justify-center gap-2"
                                    >
                                        Accéder au site
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default StreamingPage;
