/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect, useMemo, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Bot,
  Sparkles,
  Loader2,
  MessageSquare,
  Trash2,
  ChevronRight,
  User,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useSendMessageMutation,
  useChatHistoryQuery,
} from "@/features/chat/queries/chat.queries";
import { useMeQuery } from "@/features/auth/queries/auth.querie";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

type ChatMessage = { role: "user" | "assistant"; content: string };

function ChatContainer() {
  const [message, setMessage] = useState("");
  const [sessionMessages, setSessionMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: user, isLoading: userLoading } = useMeQuery();
  const { data: history, isLoading: historyLoading } = useChatHistoryQuery(!!user);
  const sendMessageMutation = useSendMessageMutation();

  // Route Protection
  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login");
    }
  }, [user, userLoading, router]);

  // Derived History: Merge server and session messages safely
  const displayHistory = useMemo(() => {
    const serverHistory: ChatMessage[] = (
      (history?.data as any[]) || []
    ).flatMap((chat: any) => [
      { role: "user" as const, content: chat.message },
      { role: "assistant" as const, content: chat.response },
    ]);
    return [...serverHistory, ...sessionMessages];
  }, [history, sessionMessages]);

  // Scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current;
      const timeoutId = setTimeout(() => {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, [displayHistory.length]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim() || sendMessageMutation.isPending) return;

    const userMsg = message.trim();
    setMessage("");
    setSessionMessages((prev) => [
      ...prev,
      { role: "user" as const, content: userMsg },
    ]);

    try {
      const res = await sendMessageMutation.mutateAsync({ message: userMsg });
      if (res.data) {
        setSessionMessages((prev) => [
          ...prev,
          { role: "assistant" as const, content: res.data!.response },
        ]);
      }
    } catch (err) {}
  };

  const suggestions = [
    "What are some high-protein breakfast ideas?",
    "How can I substitute eggs in a vegan cake?",
    "Give me a 3-day meal plan for weight loss.",
    "Is honey better than refined sugar?",
  ];

  if (userLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] gap-4">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 animate-spin" />
          <Bot className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-emerald-500" />
        </div>
        <p className="text-sm font-black text-slate-400 uppercase tracking-widest animate-pulse">
          NutriSync Secure Link...
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full max-w-7xl mx-auto px-4 md:px-6 relative">
      {/* Header - Premium Glassmorphism */}
      <div className="flex flex-col md:flex-row items-center justify-between py-8 gap-4 border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 rounded-[1.25rem] bg-gradient-to-br from-[#065E32] to-[#44B74C] flex items-center justify-center text-white shadow-xl shadow-emerald-500/30 transform hover:rotate-6 transition-transform">
            <Bot className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              NutriSync <span className="text-emerald-500">AI</span>
            </h1>
            <div className="flex items-center gap-2 mt-1">
              <div className="flex gap-0.5">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                ))}
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                Neural Engine Active
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge
            variant="outline"
            className="px-4 py-2 rounded-2xl border-slate-200 dark:border-slate-800 text-slate-500 font-bold bg-white/50 dark:bg-slate-900/50 backdrop-blur-md"
          >
            <Zap className="w-3.5 h-3.5 mr-2 text-emerald-500" />
            {displayHistory.length / 2} Queries
          </Badge>
          <Button
            variant="ghost"
            size="icon"
            className="h-12 w-12 rounded-2xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 border border-transparent hover:border-rose-100 transition-all"
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Content Layout */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8 py-8 min-h-0">
        {/* Sidebar - Suggestions Only */}
        <div className="hidden lg:flex flex-col w-80 space-y-6 flex-shrink-0">
          <div className="bg-slate-50/50 dark:bg-slate-900/30 rounded-[2.5rem] p-8 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-xl">
            <h3 className="font-black text-xs text-slate-400 uppercase tracking-[0.25em] mb-6 flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-emerald-500" />
              Quick Prompts
            </h3>
            <div className="space-y-3">
              {suggestions.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setMessage(s)}
                  className="w-full text-left p-4 rounded-2xl text-xs font-bold text-slate-600 dark:text-slate-400 bg-white dark:bg-slate-800/50 hover:bg-emerald-500 hover:text-white transition-all border border-slate-100 dark:border-slate-700 hover:border-emerald-400 shadow-sm hover:shadow-emerald-500/20 group relative overflow-hidden"
                >
                  <span className="relative z-10 line-clamp-2">{s}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Window - Premium Polish */}
        <div className="flex-1 flex flex-col bg-white/50 dark:bg-slate-900/50 rounded-[3rem] border border-slate-200/50 dark:border-slate-800/50 shadow-2xl shadow-emerald-500/5 relative overflow-hidden min-h-[600px] backdrop-blur-3xl">
          {/* Background Gradient Orbs */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 scroll-smooth relative z-10">
            {displayHistory.length === 0 && !historyLoading ? (
              <div className="flex flex-col items-center justify-center h-full text-center space-y-8 max-w-sm mx-auto py-20">
                <div className="relative">
                  <div className="w-32 h-32 rounded-[3rem] bg-emerald-500/10 flex items-center justify-center animate-pulse">
                    <MessageSquare className="w-14 h-14 text-emerald-600" />
                  </div>
                  <Sparkles className="absolute -top-2 -right-2 w-8 h-8 text-emerald-400 animate-bounce" />
                </div>
                <div className="space-y-3">
                  <h2 className="text-3xl font-black text-slate-900 dark:text-white leading-tight">
                    Welcome, <span className="text-emerald-500">{user?.name?.split(' ')[0]}</span>
                  </h2>
                  <p className="text-slate-500 font-bold text-sm tracking-wide leading-relaxed uppercase opacity-60">
                    Your Personal Nutrition Expert is Ready.
                  </p>
                </div>
              </div>
            ) : historyLoading && displayHistory.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-6">
                <Loader2 className="w-12 h-12 animate-spin text-emerald-500" />
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em]">Downloading Timeline</p>
              </div>
            ) : (
              displayHistory.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className={cn("flex gap-5", msg.role === "user" ? "flex-row-reverse" : "flex-row")}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-lg",
                    msg.role === "user" 
                      ? "bg-white dark:bg-slate-800 text-slate-400 border border-slate-100 dark:border-slate-700" 
                      : "bg-gradient-to-br from-[#065E32] to-[#44B74C] text-white"
                  )}>
                    {msg.role === "user" ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
                  </div>
                  <div className={cn(
                    "max-w-[85%] rounded-[2.5rem] px-8 py-5 shadow-xl shadow-slate-200/20 dark:shadow-none",
                    msg.role === "user" 
                      ? "bg-[#065E32] text-white rounded-tr-none font-medium" 
                      : "bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 text-slate-900 dark:text-white rounded-tl-none"
                  )}>
                    <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-strong:text-emerald-500">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))
            )}

            {sendMessageMutation.isPending && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-5">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#065E32] to-[#44B74C] flex items-center justify-center text-white"><Bot className="w-6 h-6" /></div>
                <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-[2rem] px-8 py-5 flex gap-2 items-center shadow-xl shadow-slate-100">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.2s]" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-bounce [animation-delay:0.4s]" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area - Pure Perfection */}
          <div className="p-6 md:p-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border-t border-slate-200/50 dark:border-slate-800/50 relative z-20">
            <form onSubmit={handleSend} className="relative max-w-4xl mx-auto">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-[#065E32] rounded-[2.5rem] blur opacity-20 group-focus-within:opacity-40 transition-opacity duration-500" />
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type anything to NutriSync AI..."
                  className="relative h-20 pl-8 pr-20 rounded-[2.25rem] border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xl font-bold focus-visible:ring-[#065E32] shadow-2xl shadow-slate-200/50 dark:shadow-none transition-all placeholder:text-slate-300 dark:placeholder:text-slate-600"
                />
                <Button
                  type="submit"
                  disabled={!message.trim() || sendMessageMutation.isPending}
                  className="absolute right-3 top-3 h-14 w-14 rounded-[1.75rem] bg-gradient-to-br from-[#065E32] to-[#44B74C] text-white shadow-xl shadow-emerald-500/20 active:scale-90 transition-all p-0 flex items-center justify-center hover:shadow-emerald-500/40"
                >
                  <Send className="w-7 h-7" />
                </Button>
              </div>
              <p className="text-center mt-6 text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] opacity-40">
                NutriSync Neural Core • Secure End-to-End Encryption
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ChatPage() {
  return (
    <div className="min-h-[calc(100vh-80px)] py-12 bg-transparent overflow-hidden">
      <Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-[600px] gap-6">
          <Loader2 className="w-14 h-14 animate-spin text-emerald-500" />
          <p className="text-xs font-black text-slate-400 uppercase tracking-[0.4em]">Initializing Core</p>
        </div>
      }>
        <ChatContainer />
      </Suspense>
    </div>
  );
}
