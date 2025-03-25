import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';
// Fonction pour formater le markdown
function formatMarkdown(text: string): string {
  // Convertir les blocs de code
  let formattedText = text.replace(/```(\w+)?\n([\s\S]*?)```/g, (match, language, code) => {
    const lang = language || '';
    return `<pre class="bg-gray-900 text-gray-200 p-4 rounded-md overflow-x-auto"><code class="language-${lang}">${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
  });
  
  // Convertir les sauts de ligne en balises <br>
  formattedText = formattedText.replace(/\n\n/g, '</p><p>');
  formattedText = formattedText.replace(/\n/g, '<br>');
  
  // Entourer le texte avec des balises <p>
  formattedText = `<p>${formattedText}</p>`;
  
  return formattedText;
}

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Service pour communiquer avec OpenRouter API et Gemini
const openRouterService = {
  API_KEY: import.meta.env.VITE_OPENROUTER_API_KEY || "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",
  BASE_URL: 'https://openrouter.ai/api/v1',
  MODEL: 'google/gemini-2.0-flash-thinking-exp:free',
  
  async generateResponse(userMessage: string): Promise<string> {
    try {
      console.log('Sending request to OpenRouter API...');
      
      // Vérifier si on est sur GitHub Pages (environnement de production)
      if (window.location.hostname.includes('github.io')) {
        console.log('Running on GitHub Pages - using fallback responses');
        throw new Error('Running on GitHub Pages - API calls disabled');
      }
      
      const requestBody = {
        model: this.MODEL,
        messages: [
          {
            role: 'system',
            content: `## Instructions pour le Chatbot Professionnel

Tu es Andriantahiry Nomena Hasina, développeur fullstack, cloud practitioner et spécialiste en automatisation.

### Domaines d'expertise
- 🌐 Développement Web : HTML, CSS, SASS, TailwindCSS, JavaScript, React, Next.js, GSAP, Framer Motion
- 🖥️ Back-End : Node.js, Express.js, PHP, Python
- 🛒 CMS & E-commerce : WordPress, Shopify
- 🤖 Automatisation : Zapier, Make, n8n, Selenium, Playwright
- 🧠 IA : ChatBots avec OpenAI, LangChain, Anthropic, Pinecone, Flask
- ☁️ Cloud : AWS, GCP, Linode, Kubernetes, Terraform, Docker
- 📱 Mobile : React Native, Expo
- 🛠️ Base de données : Supabase, Firebase, MongoDB

### Expérience
- 🏢 Responsable Production Applicatif chez Satisfactory | Konecta Madagascar
- 💻 Développeur WordPress et Fullstack en freelance
- 🎓 Créateur de plateformes éducatives avec Next.js, Express, Supabase, OpenAI

### EXIGENCE ABSOLUE POUR FORMATAGE DU CODE
- IMPÉRATIF: TOUT code et script DOIT être dans un bloc markdown avec \`\`\`
- IMPÉRATIF: Les blocs de code DOIVENT inclure le nom du langage après les backticks
- Format EXACT pour scripts bash: \`\`\`bash\\n[code ici]\\n\`\`\`
- Format EXACT pour JavaScript: \`\`\`javascript\\n[code ici]\\n\`\`\`
- Format EXACT pour HTML: \`\`\`html\\n[code ici]\\n\`\`\`
- Format EXACT pour autres codes: \`\`\`[langage]\\n[code ici]\\n\`\`\`
- JAMAIS de code en texte brut sous aucune circonstance
- TOUJOURS spécifier le langage du code après les backticks d'ouverture

### RÈGLES DE COMMUNICATION STRICTES
- Utilise un ton professionnel, direct et concis
- Structuré: Chaque sujet DOIT être dans un paragraphe séparé avec des sauts de ligne DOUBLES
- Visuel: Limite les emojis à un par paragraphe, placés uniquement au début
- Pédagogue: Utilise des phrases simples et directes
- Évite absolument toute numérotation, même sans astérisques
- AÈRE TON TEXTE: Laisse TOUJOURS une ligne vide entre chaque paragraphe

### FORMATAGE INTERDIT
- N'utilise JAMAIS d'astérisques (*) pour mettre en valeur du texte
- N'utilise JAMAIS de symboles comme "✅", "🔹", "**1...**", "#" pour structurer tes réponses
- N'utilise JAMAIS de caractères spéciaux pour mettre en valeur une phrase
- N'utilise JAMAIS de listes à puces avec symboles (utilise uniquement les tirets -)
- N'utilise JAMAIS plus de 2 points d'interrogation ou d'exclamation à la suite

### PONCTUATION ET PARAGRAPHES
- Utilise des paragraphes courts (2-3 phrases maximum)
- SÉPARE CLAIREMENT tes paragraphes par des LIGNES VIDES
- Utilise une ponctuation simple et standard
- Évite les phrases trop longues
- IMPÉRATIF: Une ligne vide entre CHAQUE paragraphe

### RÉPONSES TECHNIQUES
- Pour les explications techniques: Un paragraphe = un concept
- Pour les alternatives: Présente-les dans des paragraphes distincts
- Pour les scripts shell: TOUJOURS les encadrer dans des blocs \`\`\`bash

### QUESTIONS
- Pose maximum 2-3 questions dans une réponse
- Sépare clairement les questions dans des paragraphes distincts
- Évite d'utiliser des questions rhétoriques

Rappel final: Un bon formatage signifie:
1. DES LIGNES VIDES entre chaque paragraphe
2. DU CODE TOUJOURS en markdown avec indication du langage
3. UNE PRÉSENTATION AÉRÉE
4. PAS de formatage avec des astérisques ou symboles spéciaux

EXEMPLE FORMAT CODE CORRECT:
\`\`\`bash
#!/bin/bash
sudo apt-get update
sudo apt-get install docker-ce
\`\`\`

EXEMPLE FORMAT CODE INCORRECT:
#!/bin/bash
sudo apt-get update
sudo apt-get install docker-ce`
          },
          {
            role: 'user',
            content: userMessage
          }
        ]
      };
      
      console.log('Request body:', JSON.stringify(requestBody));
      
      const response = await fetch(`${this.BASE_URL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.API_KEY}`,
          'HTTP-Referer': window.location.origin,
          'X-Title': 'Portfolio Chatbot'
        },
        body: JSON.stringify(requestBody)
      });

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      
      if (!response.ok) {
        console.error('Error from OpenRouter API:', data);
        return "Je suis désolé, j'ai rencontré un problème technique. Pouvez-vous réessayer plus tard?";
      }
      
      if (!data.choices || !data.choices[0] || !data.choices[0].message || !data.choices[0].message.content) {
        console.error('Unexpected response format:', data);
        return "Je suis désolé, j'ai reçu une réponse dans un format inattendu. Pouvez-vous réessayer?";
      }
      
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error calling OpenRouter API:', error);
      return "Je suis désolé, j'ai rencontré un problème de connexion. Pouvez-vous réessayer plus tard?";
    }
  }
};

// Fallback réponses en cas d'échec de l'API
const fallbackResponses = [
  "Je comprends votre demande. Puis-je vous aider davantage?",
  "Merci pour votre message. Avez-vous d'autres questions?",
  "C'est noté! Je travaille constamment pour améliorer mes réponses.",
  "Voilà une question intéressante. Laissez-moi vous répondre.",
  "Je suis là pour vous aider avec toutes vos questions."
];

// Composant pour l'embed Spline - version sans script externe
const ChatbotAnimation: React.FC = () => {
  return (
    <div className="w-full h-full">
      <Spline
        scene="https://prod.spline.design/fxkQcgSmamcJ1nJr/scene.splinecode"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

// Composant pour le chatbot
const ChatbotSection: React.FC = () => {
  const [lastUserMessage, setLastUserMessage] = useState<Message | null>(null);
  const [lastBotMessage, setLastBotMessage] = useState<Message>({
    text: "Bonjour ! Je suis Andriantahiry Nomena Hasina, développeur fullstack, cloud practitioner et spécialiste en automatisation. Comment puis-je vous aider aujourd'hui ?",
    isBot: true,
    timestamp: new Date(),
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseKey, setResponseKey] = useState(0); // Pour forcer l'animation à se reproduire
  const [useLocalResponses, setUseLocalResponses] = useState(false);

  // Vérifier si on est sur GitHub Pages (environnement de production)
  useEffect(() => {
    if (window.location.hostname.includes('github.io')) {
      console.log('Running on GitHub Pages - using fallback responses');
      setUseLocalResponses(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Save user message
    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    const userQuery = input;
    setLastUserMessage(userMessage);
    setInput('');
    setIsTyping(true);

    try {
      let response;
      
      if (useLocalResponses) {
        // Si on est en mode local, utiliser les réponses prédéfinies
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simuler un délai
        const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
        response = fallbackResponses[randomIndex];
      } else {
        // Appel à l'API Gemini via OpenRouter
        try {
          response = await openRouterService.generateResponse(userQuery);
        } catch (apiError) {
          console.error('API error:', apiError);
          // En cas d'erreur avec l'API, passer en mode local
          setUseLocalResponses(true);
          const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
          response = fallbackResponses[randomIndex];
        }
      }
      
      const botMessage: Message = {
        text: response,
        isBot: true,
        timestamp: new Date(),
      };
      
      setIsTyping(false);
      setLastBotMessage(botMessage);
      setResponseKey(prev => prev + 1); // Forcer l'animation à se reproduire
    } catch (error) {
      console.error('Error handling response:', error);
      setIsTyping(false);
      
      // Utiliser une réponse de secours
      const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
      const fallbackResponse = fallbackResponses[randomIndex];
      
      setLastBotMessage({
        text: fallbackResponse,
        isBot: true,
        timestamp: new Date(),
      });
      setResponseKey(prev => prev + 1);
      
      // Passer en mode local pour les futures requêtes
      setUseLocalResponses(true);
    }
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          Assistant Virtuel
          {useLocalResponses && <span className="text-xs ml-2 text-red-500">(mode hors-ligne)</span>}
        </h2>
        
        <div className="h-72 mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
          <ChatbotAnimation />
        </div>

        {/* Conversation Area */}
        <div className="mb-8">
          {/* Bot's response card */}
          <AnimatePresence mode="wait">
            {isTyping ? (
              <motion.div
                className="flex justify-center"
              >
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
                key={`response-${responseKey}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4 }}
                className="w-full flex justify-center"
              >
                <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                  <div className="p-5">
                    <div 
                      className="text-gray-800 dark:text-gray-200 leading-relaxed markdown-content" 
                      dangerouslySetInnerHTML={{ 
                        __html: formatMarkdown(lastBotMessage.text) 
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Input form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Tapez votre message ici..."
            className="flex-1 p-4 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
          />
          <button
            type="submit"
            className="px-6 py-4 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-medium rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={isTyping}
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