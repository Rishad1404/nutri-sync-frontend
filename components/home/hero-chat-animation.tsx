"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Sparkles, User, Check, MoreHorizontal } from "lucide-react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
}

const CHAT_SEQUENCE: Message[] = [
  { id: 1, sender: "user", text: "Hey! I need a high-protein breakfast idea. 🍳" },
  { id: 2, sender: "ai", text: "Good morning! How about Avocado Toast with Poached Eggs and a side of smoked salmon? It's packed with 25g of protein." },
  { id: 3, sender: "user", text: "Sounds delicious! What about my calorie goal?" },
  { id: 4, sender: "ai", text: "That meal is approx 380 kcal. You'll still have 1,400 kcal left for the day to stay on track!" },
  { id: 5, sender: "user", text: "Perfect. Add it to my plan for tomorrow!" },
  { id: 6, sender: "ai", text: "Done! 🗓️ Tomorrow's breakfast is set. I've also updated your grocery list." },
];

export function HeroChatAnimation() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [index, setIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (index < CHAT_SEQUENCE.length) {
      const currentMsg = CHAT_SEQUENCE[index];

      if (currentMsg.sender === "ai") {
        // Start typing after a short delay to avoid synchronous state updates
        const startTypingTimer = setTimeout(() => {
          setIsTyping(true);
        }, 400);

        const messageTimer = setTimeout(() => {
          setIsTyping(false);
          setMessages((prev) => [...prev, currentMsg]);
          setIndex((prev) => prev + 1);
        }, 2400);

        return () => {
          clearTimeout(startTypingTimer);
          clearTimeout(messageTimer);
        };
      } else {
        const userTimer = setTimeout(() => {
          setMessages((prev) => [...prev, currentMsg]);
          setIndex((prev) => prev + 1);
        }, 1000);
        return () => clearTimeout(userTimer);
      }
    } else {
      const resetTimer = setTimeout(() => {
        setMessages([]);
        setIndex(0);
      }, 6000);
      return () => clearTimeout(resetTimer);
    }
  }, [index]);

  return (
    <div className="w-full h-full flex flex-col bg-slate-50 dark:bg-slate-900/50">
      {/* Header */}
      <div className="p-6 bg-white dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-11 h-11 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                <Brain className="w-6 h-6" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full" />
            </div>
            <div>
              <h4 className="font-black text-sm text-slate-900 dark:text-white tracking-tight">NutriSync Assistant</h4>
              <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-[0.2em]">AI Powered</p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center border border-slate-100 dark:border-slate-700">
            <Sparkles className="w-4 h-4 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="popLayout">
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className={`flex items-end gap-2 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
            >
              <div className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-[10px] font-black ${
                msg.sender === "user" ? "bg-slate-200 text-slate-600" : "bg-emerald-500 text-white"
              }`}>
                {msg.sender === "user" ? <User className="w-4 h-4" /> : <Brain className="w-4 h-4" />}
              </div>
              
              <div
                className={`max-w-[80%] p-4 rounded-2xl text-xs font-bold leading-relaxed shadow-sm ${
                  msg.sender === "user"
                    ? "bg-[#065E32] text-white rounded-br-none"
                    : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-bl-none border border-slate-100 dark:border-slate-700"
                }`}
              >
                {msg.text}
                {msg.sender === "ai" && msg.id === 6 && (
                   <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mt-2 pt-2 border-t border-emerald-500/10 flex items-center gap-2 text-[10px] text-emerald-500 font-black uppercase tracking-tighter"
                   >
                    <div className="w-4 h-4 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    Meal Plan Updated
                   </motion.div>
                )}
              </div>
            </motion.div>
          ))}

          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2"
            >
              <div className="w-7 h-7 rounded-lg bg-emerald-500 flex items-center justify-center text-white">
                <Brain className="w-4 h-4" />
              </div>
              <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-bl-none border border-slate-100 dark:border-slate-700">
                <MoreHorizontal className="w-4 h-4 text-slate-400 animate-pulse" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Input Placeholder */}
      <div className="p-6 pt-0">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Assistant is listening...</span>
          </div>
          <div className="w-8 h-8 rounded-xl bg-[#065E32] flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
