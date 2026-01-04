import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MessageCircle } from 'lucide-react';
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
// Composant pour le chatbot
const ChatbotSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatSectionRef = useRef<HTMLDivElement>(null);
  const [lastBotMessage, setLastBotMessage] = useState<Message>({
    text: "Bonjour ! Bienvenue chez Teckforgeek Agency. Nous sommes experts en intégration d'IA, automatisation de workflows et développement d'applications d'élite. Comment pouvons-nous vous accompagner ?",
    isBot: true,
    timestamp: new Date(),
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseKey, setResponseKey] = useState(0);
  const [isOffline, setIsOffline] = useState(false);
  const [rawMarkdown, setRawMarkdown] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<GeminiHistoryItem[]>([]);

  useEffect(() => {
    if (lastBotMessage && lastBotMessage.text) {
      setRawMarkdown(prepareMarkdown(lastBotMessage.text));
    }
  }, [lastBotMessage]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setInput('');
    setIsTyping(true);

    const SYSTEM_PROMPT = `Tu es l'Assistant Virtuel de l'agence **Teckforgeek**. Expertise: n8n, Python, React, Next.js, IA. Ton ton est pro et direct. Pousse vers l'audit gratuit.`;

    const userHistoryItem: GeminiHistoryItem = { role: 'user', parts: [{ text: input }] };
    const historyToSend = [...chatHistory, userHistoryItem];

    try {
      const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
      if (!apiKey) throw new Error("Clé API manquante");

      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "HTTP-Referer": window.location.origin,
          "X-Title": "Teckforgeek Portfolio",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          "model": "x-ai/grok-4.1-fast",
          "messages": [
            { role: "system", content: SYSTEM_PROMPT },
            ...chatHistory.map(h => ({ role: h.role === 'model' ? 'assistant' : 'user', content: h.parts[0].text })),
            { role: "user", content: input }
          ],
          "temperature": 0.7,
        })
      });

      const data = await response.json();
      if (data.choices && data.choices[0]) {
        const botResponseText = data.choices[0].message.content;
        setChatHistory([...historyToSend, { role: 'model', parts: [{ text: botResponseText }] }]);
        setLastBotMessage({ text: botResponseText, isBot: true, timestamp: new Date() });
      }
      setIsTyping(false);
      setResponseKey(prev => prev + 1);
      setIsOffline(false);
    } catch (error) {
      setIsTyping(false);
      setIsOffline(true);
      setLastBotMessage({ text: "Erreur de connexion.", isBot: true, timestamp: new Date() });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-[90vw] md:w-[400px] max-h-[600px] bg-white dark:bg-neutral-900 rounded-3xl shadow-2xl border border-neutral-200 dark:border-neutral-800 flex flex-col overflow-hidden pointer-events-auto"
          >
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-xs">TG</div>
                <div>
                  <h3 className="text-sm font-bold dark:text-white">Assistant Virtuel</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">En ligne</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-full transition-colors text-neutral-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="h-48 bg-neutral-50 dark:bg-black/20 flex-shrink-0">
              <ChatbotAnimation />
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 max-h-[300px] bg-white dark:bg-neutral-900">
              <div className="flex flex-col gap-1">
                <div className="bg-neutral-100 dark:bg-neutral-800 p-4 rounded-2xl rounded-tl-none prose prose-sm dark:prose-invert max-w-none">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[rehypeHighlight]}
                    components={{
                      code: ({ node, inline, className, children, ...props }: CodeProps) => {
                        const match = /language-(\w+)/.exec(className || '');
                        const language = match ? match[1] : 'plaintext';
                        const displayContent = children || '';
                        const codeContent = match ? extractCodeText(rawMarkdown, language, String(displayContent)) : String(displayContent);
                        return !inline && match ? (
                          <div className="relative">
                            <CopyButton content={codeContent} />
                            <pre className="bg-neutral-900 text-neutral-200 p-3 rounded-lg mt-2 overflow-x-auto font-mono text-xs">
                              <code className={className} {...props}>{children}</code>
                            </pre>
                          </div>
                        ) : (
                          <code className="bg-neutral-200 dark:bg-neutral-700 px-1 rounded" {...props}>{children}</code>
                        );
                      }
                    }}
                  >
                    {prepareMarkdown(lastBotMessage.text)}
                  </ReactMarkdown>
                </div>
                <span className="text-[10px] text-neutral-400 ml-1">Assistant • {lastBotMessage.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Discutons de votre projet..."
                className="flex-1 bg-neutral-100 dark:bg-neutral-800 border-none rounded-full px-4 py-2 text-sm focus:ring-2 focus:ring-indigo-500 dark:text-white"
                disabled={isTyping}
              />
              <button
                type="submit"
                disabled={isTyping || !input.trim()}
                className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white hover:bg-indigo-600 transition-colors disabled:opacity-50"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-16 h-16 rounded-full bg-indigo-600 shadow-2xl flex items-center justify-center text-white pointer-events-auto group relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        {isOpen ? (
          <X className="w-8 h-8 relative z-10" />
        ) : (
          <MessageCircle className="w-8 h-8 relative z-10" />
        )}
        {!isOpen && (
          <span className="absolute top-3 right-3 w-4 h-4 bg-red-500 border-2 border-indigo-600 rounded-full z-20"></span>
        )}
      </motion.button>
    </div>
  );
};

export default ChatbotSection;