import { useState, useEffect } from 'react';
import { Button } from './button';
import { motion, AnimatePresence } from 'framer-motion';

// Types pour les blagues
interface Joke {
  setup: string;
  options: string[];
  correctAnswer: number;
  punchline: string;
}

interface LoaderProps {
  onReady: () => void;
  isReady: boolean;
}

// Définir l'URL du backend selon l'environnement
const BACKEND_URL = import.meta.env.MODE === 'development' 
  ? 'https://portfolio-backend-eta-ten.vercel.app/api' 
  : import.meta.env.PROD && window.location.hostname.includes('vercel.app')
    ? `https://portfolio-backend-eta-ten.vercel.app/api`
    : 'https://portfolio-backend-eta-ten.vercel.app/api';

// Service pour communiquer avec le backend pour les blagues
const jokeService = {
  async generateJoke(): Promise<Joke> {
    try {
      // D'abord, essayer d'utiliser l'API de blague existante
      try {
        const response = await fetch('/api/joke');
        if (response.ok) {
          const data = await response.json();
          return data;
        }
      } catch (error) {
        console.error('Erreur API de blague standard:', error);
      }

      // Si l'API de blague échoue, générer une blague via OpenRouter
      const requestBody = {
        model: "google/gemini-2.5-pro-exp-03-25:free",
        messages: [
          {
            role: 'system',
            content: [
              {
                type: 'text',
                text: `Génère une blague de programmation au format JSON. La blague doit être structurée exactement comme ceci:
                {
                  "setup": "La question de la blague avec un emoji",
                  "options": ["Option A", "Option B", "Option C"],
                  "correctAnswer": 0, 1 ou 2 (index de la bonne réponse),
                  "punchline": "La chute de la blague avec un emoji"
                }
                IMPORTANT: Renvoie UNIQUEMENT le JSON sans texte supplémentaire.`
              }
            ]
          }
        ]
      };

      const response = await fetch(`${BACKEND_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération de blague');
      }

      const data = await response.json();
      
      // Extraire le contenu du message selon la structure disponible
      const choice = data.choices?.[0];
      let messageContent = '';
      
      if (choice?.message?.content) {
        messageContent = choice.message.content;
      } else if (choice?.message?.content?.[0]?.text) {
        messageContent = choice.message.content[0].text;
      } else if (choice?.text) {
        messageContent = choice.text;
      } else if (typeof choice?.message === 'string') {
        messageContent = choice.message;
      }

      // Extraire le JSON de la réponse
      let jokeJson;
      try {
        // Chercher une structure JSON dans la réponse
        const jsonMatch = messageContent.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          jokeJson = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('Format JSON non trouvé');
        }
      } catch (error) {
        console.error('Erreur lors de l\'analyse JSON:', error);
        throw error;
      }

      return jokeJson;
    } catch (error) {
      console.error('Erreur lors de la génération de blague:', error);
      // Fallback avec une blague prédéfinie
      return {
        setup: "Pourquoi les développeurs n'aiment pas la nature ? 🌲🤔",
        options: [
          "Ils préfèrent les écrans",
          "Il y a trop de bugs dehors",
          "Ils sont allergiques aux feuilles",
        ],
        correctAnswer: 1,
        punchline: "Il y a trop de bugs dehors 🐞",
      };
    }
  }
};

export function Loader({ onReady, isReady }: LoaderProps) {
  const [joke, setJoke] = useState<Joke | null>(null);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  // Exemple de blagues (au cas où l'API ne fonctionnerait pas)
  const fallbackJokes: Joke[] = [
    {
      setup: "Pourquoi les développeurs n'aiment pas la nature ? 🌲🤔",
      options: [
        "Ils préfèrent les écrans",
        "Il y a trop de bugs dehors",
        "Ils sont allergiques aux feuilles",
      ],
      correctAnswer: 1,
      punchline: "Il y a trop de bugs dehors 🐞",
    },
    {
      setup: "Comment un développeur répare-t-il son ordinateur ? 💻🔧",
      options: [
        "En utilisant des outils",
        "En le redémarrant et en croisant les doigts",
        "En ouvrant et fermant",
      ],
      correctAnswer: 1,
      punchline: "En le redémarrant et en croisant les doigts 🤞",
    },
    {
      setup: "Pourquoi les programmeurs préfèrent-ils le noir ? 🌑",
      options: [
        "Pour économiser de l'énergie",
        "Pour réduire la fatigue oculaire",
        "C'est leur mode par défaut",
      ],
      correctAnswer: 2,
      punchline: "C'est leur mode par défaut (dark mode) 🖥️",
    },
  ];

  useEffect(() => {
    const fetchJoke = async () => {
      try {
        // Essayer de générer une blague via OpenRouter
        const jokeData = await jokeService.generateJoke();
        setJoke(jokeData);
      } catch (error) {
        console.error('Erreur lors du chargement de la blague:', error);
        // Utiliser une blague de secours en cas d'erreur
        const randomJoke = fallbackJokes[Math.floor(Math.random() * fallbackJokes.length)];
        setJoke(randomJoke);
      } finally {
        setLoading(false);
      }
    };

    fetchJoke();
  }, []);

  const handleOptionSelect = (index: number) => {
    setSelectedOption(index);
    setShowAnswer(true);
  };

  const handleEnterSite = () => {
    if (isReady) {
      setShowLoader(false);
      onReady();
    }
  };

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-[url('/paper-texture.png')] p-6"
          style={{ backgroundBlendMode: 'multiply' }}
        >
          {/* Témoin de chargement */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className={`h-3 w-3 rounded-full ${isReady ? 'animate-pulse bg-green-500' : 'bg-gray-300'}`} />
            <span className="text-xs font-medium text-white">{isReady ? 'Prêt' : 'Chargement...'}</span>
          </div>

          <div className="max-w-md rounded-lg bg-gray-900 bg-opacity-70 p-6 shadow-lg text-white">
            {loading ? (
              <div className="flex h-40 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-blue-500" />
              </div>
            ) : (
              <>
                <h2 className="mb-4 text-xl font-bold">{joke?.setup}</h2>
                
                <div className="mb-6 space-y-2">
                  {joke?.options.map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleOptionSelect(index)}
                      disabled={showAnswer}
                      className={`w-full rounded-md border p-3 text-left transition-colors ${
                        selectedOption === index
                          ? selectedOption === joke.correctAnswer
                            ? 'border-green-500 bg-green-900 bg-opacity-40'
                            : 'border-red-500 bg-red-900 bg-opacity-40'
                          : 'border-gray-600 hover:border-blue-500 hover:bg-gray-800'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {showAnswer && (
                  <div className="mb-4 rounded-md bg-gray-800 p-4 text-blue-200">
                    <p className="font-medium">
                      {selectedOption === joke?.correctAnswer ? (
                        <span className="text-green-400">✅ Bonne réponse !</span>
                      ) : (
                        <>
                          <span className="text-red-400">❌ Mauvaise réponse</span>
                          <br />
                          <span className="mt-2 block">
                            La bonne réponse était: {joke?.options[joke?.correctAnswer]}
                          </span>
                        </>
                      )}
                    </p>
                    <p className="mt-2 font-medium">{joke?.punchline}</p>
                  </div>
                )}
              </>
            )}

            <div className="mt-6 flex flex-col items-center space-y-4">
              <p className={`text-center text-sm ${isReady ? 'text-yellow-300' : 'text-gray-400'}`}>
                {isReady 
                  ? "La page est prête ! Cliquez sur le bouton ci-dessous pour accéder au site."
                  : "Veuillez patienter le temps de chargement de la page..."}
              </p>
              <Button
                onClick={handleEnterSite}
                disabled={!isReady}
                className={`w-full bg-white text-black hover:bg-gray-200 ${!isReady ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Accéder au site
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 