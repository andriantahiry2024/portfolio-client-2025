import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';
// Fonction pour nettoyer et préparer le texte pour le markdown
function prepareMarkdown(text: string): string {
  // Nettoyer les caractères spéciaux indésirables tout en préservant les blocs de code
  let cleanedText = text
    .replace(/\\n/g, '\n')     // Assurer que les sauts de ligne sont préservés
    .replace(/\*\*/g, '**')    // Conserver l'emphase forte
    .replace(/\*/g, '*')       // Conserver l'emphase
    .trim();

  // Sauvegarder les blocs de code existants avant traitement
  const existingCodeBlocks: string[] = [];
  cleanedText = cleanedText.replace(/```([\s\S]*?)```/g, (match) => {
    existingCodeBlocks.push(match);
    return `__EXISTING_CODE_BLOCK_${existingCodeBlocks.length - 1}__`;
  });

  // Identifier les titres en majuscules et les formater en markdown
  cleanedText = cleanedText.replace(/^([A-Z][A-Z\s]+)$/gm, (match) =>
    `## ${match.trim()}`
  );

  // Formater les sous-sections numérotées en markdown
  cleanedText = cleanedText.replace(/^(\d+\.\s+)([A-Z][A-Z\s]+)$/gm, (match, number, title) =>
    `### ${number}${title}`
  );

  // Conserver le format des listes à puces
  cleanedText = cleanedText.replace(/^(\s*)-\s+(.+)$/gm, (match, space, content) =>
    `${space}- ${content.trim()}`
  );

  // Détecter et envelopper le code Python qui n'est pas déjà dans des blocs de code
  const sections = cleanedText.split(/\n\n+/);

  const processedSections = sections.map(section => {
    // Si la section contient des marqueurs de code, ne pas la traiter
    if (section.includes('__EXISTING_CODE_BLOCK_')) {
      return section;
    }

    // Détection automatique du code Python par motifs courants
    const pythonPatterns = [
      /^import\s+[\w_.]+/m,                   // import statements
      /^from\s+[\w_.]+\s+import/m,            // from ... import
      /^def\s+\w+\s*\(/m,                     // function definitions
      /^class\s+\w+/m,                        // class definitions
      /^\s*for\s+\w+\s+in\s+/m,               // for loops
      /^\s*if\s+.+:/m,                        // if statements
      /^\s*while\s+.+:/m,                     // while loops
      /^\s*with\s+.+:/m,                      // with statements
      /^\s*try:/m,                            // try blocks
      /^\s*except\s+/m,                       // except blocks
      /^\s*\w+\s*=\s*{/m,                     // dictionary assignments
      /^\s*\w+\s*=\s*\[/m,                    // list assignments
      /^\s*print\(/m,                         // print statements
      /^ydl_opts\s*=/m                        // ydl_opts assignments (specific to the use case)
    ];

    // Si la section contient un ou plusieurs de ces motifs, c'est probablement du code Python
    const isPythonCode = pythonPatterns.some(pattern => pattern.test(section));

    if (isPythonCode) {
      // Envelopper dans un bloc de code Python
      return `\`\`\`python\n${section}\n\`\`\``;
    }

    return section;
  });

  // Reconstituer le texte
  cleanedText = processedSections.join('\n\n');

  // Restaurer les blocs de code existants
  cleanedText = cleanedText.replace(/__EXISTING_CODE_BLOCK_(\d+)__/g, (match, index) => {
    return existingCodeBlocks[parseInt(index)];
  });

  return cleanedText;
}

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Définir l'URL du backend selon l'environnement
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL
  ? `${import.meta.env.VITE_BACKEND_URL}/api`
  : 'http://localhost:3001/api';

// Mode debug pour suivre les appels
console.log('Mode:', import.meta.env.MODE);
console.log('Backend URL:', BACKEND_URL);

// Ajouter cette interface pour les propriétés de code
interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

// Composant pour le bouton de copie
const CopyButton: React.FC<{ content: string }> = ({ content }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-2 bg-gray-700 hover:bg-gray-600 text-gray-200 rounded px-2 py-1 text-xs flex items-center transition-colors z-10"
      title="Copier le code"
    >
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Copié
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 2a1 1 0 000 2h2a1 1 0 100-2H8z" />
            <path d="M3 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v6h-4.586l1.293-1.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L10.414 13H15v3a2 2 0 01-2 2H5a2 2 0 01-2-2V5zM15 11h2a1 1 0 110 2h-2v-2z" />
          </svg>
          Copier
        </>
      )}
    </button>
  );
};

// Extrait le texte réel d'un bloc de code
function extractCodeText(rawMarkdown: string, language: string, codeContent: string): string {
  // Si nous pouvons utiliser le contenu directement (c'est déjà une chaîne)
  if (typeof codeContent === 'string' && !codeContent.includes('[object Object]')) {
    return codeContent;
  }

  // Sinon, essayons d'extraire le code du markdown original
  try {
    // Recherche des blocs de code dans le markdown brut
    const regex = new RegExp('```' + language + '\\n([\\s\\S]*?)```', 'g');
    const matches = [...rawMarkdown.matchAll(regex)];

    // Retourne le contenu du premier bloc correspondant
    if (matches.length > 0 && matches[0][1]) {
      return matches[0][1].trim();
    }

    // Si on ne trouve pas de bloc avec la langue spécifiée, chercher n'importe quel bloc
    const genericRegex = /```(?:\w*)\n([\s\S]*?)```/g;
    const genericMatches = [...rawMarkdown.matchAll(genericRegex)];

    if (genericMatches.length > 0 && genericMatches[0][1]) {
      return genericMatches[0][1].trim();
    }
  } catch (error) {
    console.error('Error extracting code:', error);
  }

  // Fallback: essai de nettoyage basique
  return String(codeContent).replace(/\[object Object\]/g, '').replace(/,/g, '').trim();
}

// Composant pour l'embed Spline
const ChatbotAnimation: React.FC = () => {
  return (
    <div className="w-full h-full" style={{ pointerEvents: 'none' }}>
      <Spline
        scene="https://prod.spline.design/fxkQcgSmamcJ1nJr/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

// Composant pour le chatbot
const ChatbotSection: React.FC = () => {
  const chatSectionRef = useRef<HTMLDivElement>(null); // Ref pour la section entière
  const inputSectionRef = useRef<HTMLFormElement>(null); // Ref pour le formulaire de saisie
  const inputFieldRef = useRef<HTMLInputElement>(null); // Ref pour le champ input lui-même
  const titleRef = useRef<HTMLHeadingElement>(null); // Ref pour le titre H2
  const [lastUserMessage, setLastUserMessage] = useState<Message | null>(null);
  const [lastBotMessage, setLastBotMessage] = useState<Message>({
    text: "Bonjour ! Bienvenue chez Teckforgeek Agency. Nous sommes experts en intégration d'IA, automatisation de workflows et développement d'applications d'élite. Comment pouvons-nous vous accompagner dans votre transformation technologique aujourd'hui ?",
    isBot: true,
    timestamp: new Date(),
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseKey, setResponseKey] = useState(0);
  const [isOffline, setIsOffline] = useState(false);
  const [rawMarkdown, setRawMarkdown] = useState<string>("");

  // Interface pour l'historique Gemini
  interface GeminiHistoryItem {
    role: 'user' | 'model';
    parts: { text: string }[];
  }

  // État pour stocker l'historique de la conversation pour Gemini
  const [chatHistory, setChatHistory] = useState<GeminiHistoryItem[]>([]);

  // Fonction pour maintenir le scroll sur la zone de saisie
  // const maintainScroll = () => { // Fonction entièrement supprimée pour tester
  //   if (inputSectionRef.current) {
  //     setTimeout(() => {
  //       inputSectionRef.current?.scrollIntoView({
  //         behavior: 'smooth',
  //         block: 'nearest'
  //       });
  //     }, 50);
  //   }
  // };

  // Appeler maintainScroll après chaque nouvelle réponse
  // useEffect(() => { // Temporairement supprimé pour tester le comportement par défaut
  //   maintainScroll();
  // }, [lastBotMessage, isTyping]);

  // Mettre à jour le markdown brut quand le message du bot change
  useEffect(() => {
    if (lastBotMessage && lastBotMessage.text) {
      setRawMarkdown(prepareMarkdown(lastBotMessage.text));
    }
  }, [lastBotMessage]);

  // Effet pour redonner le focus à l'input après la réponse
  // useEffect(() => { // Supprimé pour tester une autre approche de focus
  //   if (!isTyping && inputFieldRef.current) {
  //     setTimeout(() => {
  //       inputFieldRef.current?.focus();
  //     }, 50);
  //   }
  // }, [isTyping]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!input.trim()) return;

    // Sauvegarder le message utilisateur
    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setLastUserMessage(userMessage);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      titleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 300);

    // Context for the agency
    const SYSTEM_PROMPT = `
Tu es l'Assistant Virtuel de l'agence **Teckforgeek**.
Ton rôle est d'aider les entreprises à comprendre comment l'IA et l'automatisation peuvent transformer leur business.

**Tes Domaines d'Expertise :**
1. **Automation & Workflows** : n8n, Make, Python.
2. **Développement Web/Mobile** : React, Next.js, Supabase, Applications "Elite".
3. **Intégration IA** : LLMs, Chatbots, Agents Autonomes.

**Tes Règles :**
- Tu réponds **UNIQUEMENT** aux questions liées à l'agence, ses services, ou la technologie.
- Si on te parle de cuisine, de politique ou d'autre chose, ramène poliment le sujet vers le business.
- Ton ton est **Sobre, Professionnel, Direct**. Pas d'emojis excessifs.
- Pousse toujours vers l'action : "Voulez-vous réserver un audit gratuit ?"
- Tu es basé sur le site web actuel de l'agence.

**Modèle** : Tu es propulsé par Grok via Teckforgeek.
    `;

    // Créer l'historique à envoyer
    const userHistoryItem: GeminiHistoryItem = {
      role: 'user',
      parts: [{ text: input }]
    };
    const historyToSend = [...chatHistory, userHistoryItem];

    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;

      if (!apiKey) {
        throw new Error("Clé API manquante");
      }

      // Prepare messages with system prompt
      const messages = [
        { role: "system", content: SYSTEM_PROMPT },
        ...chatHistory.map(h => ({
          role: h.role === 'model' ? 'assistant' : 'user',
          content: h.parts[0].text
        })),
        { role: "user", content: input }
      ];

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Teckforgeek Portfolio",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "x-ai/grok-4.1-fast", // Reverting to beta as user requested
          "messages": messages,
          "temperature": 0.7,
          "max_tokens": 500
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`OpenRouter API Error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      const botResponseText = data.choices[0].message.content;

      const botMessage: Message = {
        text: botResponseText,
        isBot: true,
        timestamp: new Date(),
      };

      // Update history
      const newHistoryItem: GeminiHistoryItem = {
        role: 'model',
        parts: [{ text: botResponseText }]
      };

      setChatHistory([...historyToSend, newHistoryItem]);

      setIsTyping(false);
      setLastBotMessage(botMessage);
      setResponseKey(prev => prev + 1);
      setIsOffline(false);

    } catch (error) {
      console.error('Error:', error);
      setIsTyping(false);
      setIsOffline(true);

      const errorMessage = (!import.meta.env.VITE_OPENROUTER_API_KEY)
        ? "⚠️ Configuration requise : Ajoutez VITE_OPENROUTER_API_KEY dans votre fichier .env"
        : "Je rencontre des difficultés à joindre mon cerveau dans le cloud. Veuillez réessayer.";

      setLastBotMessage({
        text: errorMessage,
        isBot: true,
        timestamp: new Date(),
      });
      setResponseKey(prev => prev + 1);
    }
  };


  return (
    <div className="py-16 px-4" id="chatbot-section" ref={chatSectionRef} tabIndex={-1} style={{ outline: 'none' }}> {/* Ajout de tabIndex et suppression du contour de focus */}
      <div className="max-w-2xl mx-auto">
        <h2 ref={titleRef} className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white"> {/* Ajout de la ref ici */}
          Assistant Virtuel
          {isOffline && <span className="text-xs ml-2 text-red-500">(mode hors-ligne)</span>}
        </h2>

        <div className="h-72 mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
          <ChatbotAnimation />
        </div>

        {/* Zone de conversation avec style amélioré */}
        <div className="mb-8">
          <AnimatePresence mode="wait">
            {isTyping ? (
              <motion.div className="flex justify-center">
                <div className="bg-gray-200 dark:bg-gray-700 px-4 py-2 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-300 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`response - ${responseKey} `}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="w-full flex justify-center"
              >
                <div className="w-full bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="p-6">
                    <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeHighlight]}
                        components={{
                          h2: ({ node, ...props }) => <h2 className="text-2xl font-bold my-6 text-indigo-600 dark:text-indigo-400 tracking-wide" {...props} />,
                          h3: ({ node, ...props }) => <h3 className="text-xl font-semibold my-4 text-gray-700 dark:text-gray-300" {...props} />,
                          ul: ({ node, ...props }) => <ul className="my-4 space-y-2 list-none" {...props} />,
                          li: ({ node, ...props }) => (
                            <li className="flex items-start space-x-2 my-2" {...props}>
                              <span className="text-indigo-500 dark:text-indigo-400 mt-1">•</span>
                              <span className="text-gray-700 dark:text-gray-300">{props.children}</span>
                            </li>
                          ),
                          code: ({ node, inline, className, children, ...props }: CodeProps) => {
                            const match = /language-(\w+)/.exec(className || '');
                            const language = match ? match[1] : 'plaintext';

                            // Utilise une valeur de secours pour le contenu affiché
                            const displayContent = children || '';

                            // Pour la copie, utilise la fonction d'extraction sur le markdown brut
                            const codeContent = match
                              ? extractCodeText(rawMarkdown, language, String(displayContent))
                              : String(displayContent);

                            return !inline && match ? (
                              <div className="relative">
                                <CopyButton content={codeContent} />
                                <pre className="bg-gray-900 text-gray-200 p-4 rounded-lg mt-2 overflow-x-auto font-mono text-sm">
                                  <div className="px-4 py-2 bg-gray-800 text-gray-400 text-xs">{language}</div>
                                  <code className={className} {...props}>
                                    {children}
                                  </code>
                                </pre>
                              </div>
                            ) : (
                              <code className={className} {...props}>
                                {children}
                              </code>
                            );
                          }
                        }}
                      >
                        {prepareMarkdown(lastBotMessage.text)}
                      </ReactMarkdown>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Formulaire de saisie */}
        <form
          ref={inputSectionRef} // Attacher la référence ici
          onSubmit={handleSubmit}
          className="flex gap-2"
        // onClick={(e) => { // Supprimé car onSubmit gère déjà preventDefault
        //   e.stopPropagation();
        //   e.preventDefault();
        // }}
        >
          <input
            ref={inputFieldRef} // Attacher la référence ici
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tapez votre message ici..."
            className="flex-1 p-4 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          // onClick={(e) => e.stopPropagation()} // Supprimé pour tester
          />
          <button
            type="submit"
            className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isTyping}
          // onClick={(e) => e.stopPropagation()} // Supprimé pour tester
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotSection; 