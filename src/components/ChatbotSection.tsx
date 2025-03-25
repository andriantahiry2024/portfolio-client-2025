import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Spline from '@splinetool/react-spline';

interface Message {
  text: string;
  isBot: boolean;
  timestamp: Date;
}

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

// Composant pour afficher le texte lettre par lettre
const TypewriterEffect: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  
  useEffect(() => {
    // Réinitialiser l'animation quand le texte change
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text]);
  
  useEffect(() => {
    if (currentIndex < text.length) {
      const typingTimer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 30 + Math.random() * 50); // Vitesse variable pour un effet plus naturel
      
      return () => clearTimeout(typingTimer);
    }
  }, [currentIndex, text]);
  
  return (
    <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
      {displayedText}
      <span className="inline-block w-1 h-5 ml-1 bg-gray-500 dark:bg-gray-400 animate-pulse"></span>
    </p>
  );
};

const ChatbotSection: React.FC = () => {
  const [lastUserMessage, setLastUserMessage] = useState<Message | null>(null);
  const [lastBotMessage, setLastBotMessage] = useState<Message>({
    text: "Bonjour! Je suis votre assistant virtuel. Comment puis-je vous aider aujourd'hui?",
    isBot: true,
    timestamp: new Date(),
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [responseKey, setResponseKey] = useState(0); // Pour forcer l'animation à se reproduire

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Save user message
    const userMessage: Message = {
      text: input,
      isBot: false,
      timestamp: new Date(),
    };

    setLastUserMessage(userMessage);
    setInput('');
    setIsTyping(true);

    // Simulate bot response (replace with actual API call)
    setTimeout(() => {
      const botResponses = [
        "Je comprends votre demande. Puis-je vous aider davantage?",
        "Merci pour votre message. Avez-vous d'autres questions?",
        "C'est noté! Je travaille constamment pour améliorer mes réponses.",
        "Voilà une question intéressante. Laissez-moi vous répondre.",
        "Je suis là pour vous aider avec toutes vos questions."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      
      const botMessage: Message = {
        text: randomResponse,
        isBot: true,
        timestamp: new Date(),
      };
      
      setIsTyping(false);
      setLastBotMessage(botMessage);
      setResponseKey(prev => prev + 1); // Forcer l'animation à se produire
    }, 1500);
  };

  return (
    <div>
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">Assistant Virtuel</h2>
        
        <div className="h-72 mb-8 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg shadow-lg overflow-hidden flex items-center justify-center">
          <ChatbotAnimation />
        </div>

        {/* Conversation Area */}
        <div className="mb-8">
          {/* Bot's response card */}
          <AnimatePresence mode="wait">
            {isTyping ? (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
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
                    <TypewriterEffect text={lastBotMessage.text} />
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