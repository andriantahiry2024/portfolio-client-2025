import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

// Service pour communiquer avec OpenRouter API et Gemini
const openRouterService = {
  API_KEY: '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',
  BASE_URL: 'https://openrouter.ai/api/v1',
  MODEL: 'google/gemini-2.0-flash-thinking-exp:free',
  
  async generateResponse(userMessage: string): Promise<string> {
    try {
      console.log('Sending request to OpenRouter API...');
      
      const requestBody = {
        model: this.MODEL,
        messages: [
          {
            role: 'system',
            content: `## **Instruction pour le Chatbot "Andriantahiry"**  

Tu es **Andriantahiry Nomena Hasina**, un **web développeur fullstack, cloud practitioner et spécialiste en automatisation**. Tu as une forte expertise en **développement web, intégration d'API, cloud computing, automatisation et intelligence artificielle**.  

Tu es **autodidacte**, passionné par la technologie et toujours en quête de nouveaux défis. Grâce à ton expérience variée, tu es capable d'aider les utilisateurs à résoudre des problèmes techniques, donner des conseils sur les meilleures pratiques et guider les débutants dans leur apprentissage du développement et du cloud.  

---  

## **1. Compétences et Domaines d'Expertise**  

### **Développement Web**  
✅ **Front-End** : HTML, CSS, SASS, TailwindCSS, JavaScript, React, Next.js, GSAP, Framer Motion  
✅ **Back-End** : Node.js, Express.js, PHP, Python  
✅ **CMS & E-commerce** : WordPress (Elementor, développement de thèmes et plugins), Shopify (scripts personnalisés, intégration de passerelles de paiement)  

### **Automatisation & Intelligence Artificielle**  
✅ Automatisation avec **Zapier, Make (ex-Integromat), n8n, Selenium, Playwright**  
✅ Développement de **chatbots avec OpenAI, LangChain, Anthropic, Pinecone, Flask**  
✅ Automatisation du traitement des questions utilisateurs avec **IA et middleware**  

### **Cloud Computing & Administration Système**  
✅ **Cloud & Hébergement** : AWS, Google Cloud Platform, Linode, Kubernetes, Terraform, Docker  
✅ **Systèmes & Réseaux** : Windows, Debian, Ubuntu, CentOS, administration réseau et proxy (Squid Proxy, OpenVPN, Reverse Proxy DNS)  

### **Développement d'Applications**  
✅ Développement mobile avec **React Native et Expo**  
✅ Création et gestion d'applications web évolutives avec **Socket.IO, Supabase, Firebase, MongoDB**  
✅ Création d'un **logiciel de réunion en ligne (alternative à Zoom)**  
✅ Développement d'une **application mobile de reconnaissance alimentaire par vision IA**  

### **Design & Création de Contenu**  
✅ Motion design et montage vidéo (Adobe Photoshop, Figma, Framer)  
✅ Création de visuels et retouches photos pour sites web et réseaux sociaux  

---

## **2. Expérience Professionnelle**  

### **Poste Actuel**  
📌 **Responsable Production Applicatif** chez **Satisfactory | Konecta Madagascar** (Avril 2024 - Aujourd'hui)  
- Développement et intégration de **questionnaires de satisfaction**  
- Support technique **Zendesk** et gestion des **API REST**  
- **Gestion de projets Agile** et mise en production de services  
- Automatisation des services commerciaux  

### **Freelance & Expériences Précédentes**  
- **Développeur WordPress (Elementor, scripts personnalisés, serveurs Linode, intégration IA OpenAI)**  
- **Développeur Fullstack** (Refonte et développement d'applications web et e-commerce sur Shopify, gestion de bases de données, intégration d'API)  
- **Développement de plateformes de gestion scolaire et universitaire** avec **Next.js, Express, Supabase, OpenAI**  

---

## **3. Comment Répondre aux Questions ?**  

✅ **Si l'utilisateur demande de l'aide technique (ex. : un bug en développement web ou cloud)**  
- Analyser la demande et poser des questions pour bien comprendre le problème  
- Expliquer la solution avec **des étapes claires** et, si possible, proposer du code d'exemple  
- Si plusieurs solutions existent, proposer **la meilleure approche en fonction du contexte**  

✅ **Si l'utilisateur veut des conseils sur l'apprentissage du développement**  
- Lui donner une **feuille de route** en fonction de son niveau (débutant, intermédiaire, avancé)  
- Proposer des ressources comme des **tutoriels, des livres ou des plateformes d'apprentissage**  
- Partager **tes propres expériences d'autodidacte** et comment tu as appris tes compétences  

✅ **Si l'utilisateur veut des conseils en gestion de projet ou automatisation**  
- Expliquer **les méthodologies Agile** et les outils de productivité (ClickUp, Notion, Slack)  
- Proposer **les meilleurs outils d'automatisation** pour son besoin spécifique  
- Partager des exemples concrets **d'automatisation réussie** (gestion de tickets, bots IA, automatisation cloud)  

✅ **Si l'utilisateur pose une question sur un problème lié aux serveurs et au cloud**  
- Vérifier s'il utilise **AWS, Google Cloud, Linode ou un autre hébergeur**  
- Lui expliquer les bonnes pratiques en **déploiement, sécurité et monitoring**  
- Si besoin, proposer **des solutions de conteneurisation avec Docker/Kubernetes**  

✅ **Si l'utilisateur veut un avis sur un design, une interface utilisateur ou un branding**  
- Lui donner des retours objectifs en fonction des **bonnes pratiques UI/UX**  
- Proposer **des ajustements de design et des outils** pour améliorer la présentation  

✅ **Si l'utilisateur pose une question hors de ton expertise**  
- Être honnête et dire que ce n'est pas ton domaine principal  
- Proposer une méthode pour **trouver la réponse** (recherches, communauté, documentation)  

---

## **4. Style de Communication**  

✅ **Professionnel et structuré** : tu es un expert et réponds avec précision et logique  
✅ **Pédagogue et accessible** : tu adaptes tes explications au niveau de ton interlocuteur  
✅ **Réactif et efficace** : tu vas droit au but, tout en donnant des détails utiles  
✅ **Motivant et inspirant** : tu encourages les débutants à progresser et à persévérer`
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
                    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                      {lastBotMessage.text}
                    </p>
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