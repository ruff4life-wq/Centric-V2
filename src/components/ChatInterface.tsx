import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { useUser, Message } from '../context/UserContext';
import { curriculum } from '../data/curriculum';
import { generateCentricResponse } from '../services/ai';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import ReactMarkdown from 'react-markdown';

export default function ChatInterface() {
  const { state, addChatMessage } = useUser();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize with welcome message if empty
  useEffect(() => {
    if (state.chatHistory.length === 0) {
      const welcomeMsg: Message = {
        id: 'welcome',
        role: 'assistant',
        text: `Hello ${state.name || 'friend'}. I'm Centric, your self-care companion. We are currently in Week ${state.currentWeek}: ${curriculum[state.currentWeek - 1]?.title}. How is your heart today?`,
        timestamp: new Date().toISOString()
      };
      addChatMessage(welcomeMsg);
    }
  }, [state.chatHistory.length, state.name, state.currentWeek, addChatMessage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.chatHistory, isLoading]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: input,
      timestamp: new Date().toISOString()
    };

    addChatMessage(userMsg);
    setInput('');
    setIsLoading(true);

    try {
      const currentWeekContent = curriculum.find(c => c.id === state.currentWeek);
      const responseText = await generateCentricResponse(input, {
        userName: state.name,
        currentWeek: state.currentWeek,
        assessmentData: state.assessment,
        weekContent: currentWeekContent
      });

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: responseText || "I'm here with you.",
        timestamp: new Date().toISOString()
      };
      addChatMessage(aiMsg);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] md:h-[calc(100vh-100px)] bg-white rounded-3xl shadow-sm border border-sage-100 overflow-hidden">
      <div className="bg-sage-600 p-4 md:p-6 text-white flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-white/10 rounded-full">
            <Bot size={24} />
          </div>
          <div>
            <h3 className="font-serif font-medium text-lg">Centric Companion</h3>
            <p className="text-xs text-sage-100 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"/> 
              Online & Listening
            </p>
          </div>
        </div>
        <Sparkles className="text-sage-200 opacity-50" />
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-sage-50/30">
        {state.chatHistory.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "flex gap-3 max-w-[90%] md:max-w-[80%]",
              msg.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
            )}
          >
            <div className={cn(
              "w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1",
              msg.role === 'user' ? "bg-sand-400 text-white" : "bg-sage-600 text-white"
            )}>
              {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
            </div>
            <div className={cn(
              "p-4 rounded-2xl text-sm leading-relaxed shadow-sm",
              msg.role === 'user' 
                ? "bg-white text-gray-800 rounded-tr-none border border-sand-200" 
                : "bg-white text-gray-800 rounded-tl-none border border-sage-200"
            )}>
              <div className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1">
                <ReactMarkdown>{msg.text}</ReactMarkdown>
              </div>
              <span className="text-[10px] opacity-40 block mt-2 font-medium">
                {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </motion.div>
        ))}
        {isLoading && (
          <div className="flex gap-3 mr-auto max-w-[80%]">
             <div className="w-8 h-8 rounded-full bg-sage-600 text-white flex items-center justify-center shrink-0 mt-1">
              <Bot size={14} />
            </div>
            <div className="bg-white p-4 rounded-2xl rounded-tl-none border border-sage-200 shadow-sm flex items-center gap-3">
              <Loader2 className="animate-spin text-sage-500" size={18} />
              <span className="text-sm text-sage-500 italic">Centric is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 md:p-6 bg-white border-t border-sage-100">
        <div className="flex gap-3 relative">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Share what's on your mind..."
            className="flex-1 pl-6 pr-14 py-4 rounded-2xl border border-sage-200 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent bg-sage-50/50 shadow-inner text-sage-900 placeholder:text-sage-400"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            className="absolute right-2 top-2 bottom-2 aspect-square bg-sage-600 text-white rounded-xl hover:bg-sage-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center shadow-md"
          >
            <Send size={20} />
          </button>
        </div>
        <p className="text-center text-[10px] text-sage-400 mt-3">
          Centric is an AI companion. For medical emergencies, please dial 911.
        </p>
      </div>
    </div>
  );
}
