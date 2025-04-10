import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Music, Gamepad2, Puzzle, Tv } from 'lucide-react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

interface PassionItem {
  title: string;
  icon: React.ElementType;
  description: string;
  examples: string[];
  spotifyUri?: string;
  previews?: string[];
}

const passionsData: PassionItem[] = [
   {
    title: 'Musique',
    icon: Music,
    description: 'Les mélodies qui rythment mes journées et boostent ma créativité.',
    examples: ['Lo-fi Hip Hop', 'Synthwave', 'Musique de films (Hans Zimmer)', 'Rock Alternatif'],
    spotifyUri: 'https://open.spotify.com/embed/playlist/6aBpIrRa4RP5ZMGPodyyEH?utm_source=generator',
  },
  {
    title: 'Échecs',
    icon: Puzzle,
    description: 'Un jeu de stratégie intemporel qui aiguise l\'esprit.',
    examples: ['Ouvertures préférées : Sicilienne, Ruy López', 'Jeu en ligne (Lichess)', 'Analyse de parties'],
  },
  // Jeux Vidéo et Films & Séries supprimés
];

const cardVariants = {
   hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.1, 0.25, 1], // Courbe d'animation douce
    },
  }),
};

// Composant SVG simplifié pour la position du Mat de l'Écolier
// FEN: rnb1k1nr/pppp1Qpp/8/4p3/2B1P3/2N5/PPPP1PPP/R1B1K1NR b KQkq - 0 4
const ScholarMatePuzzleSVG = () => {
  const size = 180; // Taille augmentée
  const sq = size / 4; // Focus sur 4x4 cases autour du roi noir
  const light = "#f0d9b5"; // Couleur SVG claire fixe
  const dark = "#b58863";  // Couleur SVG foncée fixe
  const pieceColor = "#333"; // Couleur pièce foncée fixe (visible sur clair/foncé)
  const fontSize = sq * 0.75; // Légèrement réduit pour éviter chevauchement

  return (
    <div className="flex flex-col items-center mt-4">
      <svg viewBox={`0 0 ${size} ${size}`} width={size} height={size} className="rounded shadow-md">
        {/* Cases c5-f8 */}
        <rect x="0" y="0" width={sq} height={sq} fill={light} />
        <rect x={sq} y="0" width={sq} height={sq} fill={dark} />
        <rect x={2*sq} y="0" width={sq} height={sq} fill={light} />
        <rect x={3*sq} y="0" width={sq} height={sq} fill={dark} />
        <rect x="0" y={sq} width={sq} height={sq} fill={dark} />
        <rect x={sq} y={sq} width={sq} height={sq} fill={light} />
        <rect x={2*sq} y={sq} width={sq} height={sq} fill={dark} />
        <rect x={3*sq} y={sq} width={sq} height={sq} fill={light} />
        <rect x="0" y={2*sq} width={sq} height={sq} fill={light} />
        <rect x={sq} y={2*sq} width={sq} height={sq} fill={dark} />
        <rect x={2*sq} y={2*sq} width={sq} height={sq} fill={light} />
        <rect x={3*sq} y={2*sq} width={sq} height={sq} fill={dark} />
         <rect x="0" y={3*sq} width={sq} height={sq} fill={dark} />
        <rect x={sq} y={3*sq} width={sq} height={sq} fill={light} />
        <rect x={2*sq} y={3*sq} width={sq} height={sq} fill={dark} />
        <rect x={3*sq} y={3*sq} width={sq} height={sq} fill={light} />

        {/* Pièces clés */}
        <text x={2.5*sq} y={0.5*sq + 2} fontSize={fontSize} textAnchor="middle" dominantBaseline="middle" fill={pieceColor}>♚</text> {/* Roi noir e8 */}
        <text x={3.5*sq} y={0.5*sq + 2} fontSize={fontSize} textAnchor="middle" dominantBaseline="middle" fill={pieceColor}>♝</text> {/* Fou noir f8 */}
        <text x={2.5*sq} y={1.5*sq + 2} fontSize={fontSize} textAnchor="middle" dominantBaseline="middle" fill={pieceColor}>♕</text> {/* Dame blanche f7 */}
        <text x={1.5*sq} y={2.5*sq + 2} fontSize={fontSize} textAnchor="middle" dominantBaseline="middle" fill={pieceColor}>♟</text> {/* Pion noir e5 */}
        <text x={0.5*sq} y={3.5*sq + 2} fontSize={fontSize} textAnchor="middle" dominantBaseline="middle" fill={pieceColor}>♗</text> {/* Fou blanc c4 */}

      </svg>
       {/* Indicateur simple du mat */}
       <text
         x="50%" // Centré sous le SVG
         y={size + 15} // Position sous l'échiquier
         fontSize="12"
         textAnchor="middle" // Centrer le texte
         fill="var(--primary)"
         className="font-semibold mt-2" // Ajout de marge top
       >
         Mat de l'Écolier (Blanc gagne)
       </text>
    </div>
 );
};


const PassionsSection = () => {
   return (
    <section className="py-20 bg-background/80 dark:bg-black/80 relative overflow-hidden">
       {/* Éléments décoratifs subtils */}
       <div className="absolute inset-0 overflow-hidden opacity-5 pointer-events-none">
         <div className="absolute h-72 w-72 rounded-full bg-purple-500/30 dark:bg-purple-500/20 blur-3xl -top-10 -right-20"></div>
         <div className="absolute h-72 w-72 rounded-full bg-cyan-500/20 dark:bg-cyan-500/10 blur-3xl bottom-0 -left-32"></div>
       </div>

      <div className="container mx-auto px-4 relative z-10">
         <motion.div
          className="flex flex-col items-center text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <div className="inline-block px-3 py-1 mb-4 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 dark:border-cyan-500/20 backdrop-blur-sm">
            <span className="text-sm text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-cyan-600 dark:from-purple-400 dark:to-cyan-400 font-medium">
              Au-delà du Code
            </span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-foreground">
            Mes Passions
          </h2>
          <p className="text-muted-foreground max-w-[700px] text-lg">
            Ce qui m'anime en dehors du développement.
          </p>
        </motion.div>

        {/* Ajustement de la grille pour 2 éléments */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
          {passionsData // Ne plus filtrer ici car les données sont déjà correctes
            .map((passion, index) => (
            <motion.div
              key={passion.title}
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              whileHover={{ y: -8, scale: 1.03, transition: { duration: 0.2 } }}
              className="h-full"
            >
              <Card className="border border-border/40 dark:border-border/20 bg-card/70 dark:bg-card/50 backdrop-blur-lg h-full shadow-md hover:shadow-xl dark:hover:shadow-primary/10 transition-all duration-300 overflow-hidden flex flex-col">
                 <CardHeader className="flex flex-row items-center gap-4 pb-3 pt-5 px-5">
                  <div className="p-2 rounded-full bg-gradient-to-br from-purple-500/20 to-cyan-500/20 dark:from-purple-700/30 dark:to-cyan-700/30 text-primary dark:text-cyan-300">
                    <passion.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl font-semibold text-foreground">{passion.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-5 pb-5 flex-grow flex flex-col">
                  <p className="text-muted-foreground mb-4 text-sm flex-grow">{passion.description}</p>

                  {/* Contenu spécifique par passion */}
                  {passion.title === 'Musique' && passion.spotifyUri && (
                    <iframe
                      style={{ borderRadius: '12px', marginTop: '1rem', height: '152px' }} // Hauteur augmentée
                      src={passion.spotifyUri}
                      width="100%"
                      frameBorder="0"
                      allowFullScreen={false}
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                      title={`Lecteur Spotify - ${passion.title}`}
                    ></iframe>
                  )}

                  {/* Les carrousels ne seront plus rendus car les données sont filtrées */}
                  {/* {(passion.title === 'Jeux Vidéo' || passion.title === 'Films & Séries') && passion.previews && ( ... )} */}

                  {passion.title === 'Échecs' && (
                    // Utiliser le nouveau composant SVG
                    <ScholarMatePuzzleSVG />
                  )}

                  {/* Liste d'exemples */}
                  <ul className={`space-y-1 ${passion.spotifyUri || passion.previews || passion.title === 'Échecs' ? 'mt-4' : ''}`}>
                    {passion.examples.map((example) => (
                      <li key={example} className="text-xs text-foreground/80 dark:text-foreground/70 flex items-center">
                         <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 mr-2 inline-block"></span>
                        {example}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PassionsSection;