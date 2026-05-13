/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  useSendMessageMutation,
  useChatHistoryQuery,
  useDeleteChatHistoryMutation,
} from "../queries/chat.queries";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  Loader2,
  Sparkles,
  Maximize2,
  ChevronDown,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMeQuery } from "@/features/auth/queries/auth.querie";
import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

export default function FloatingChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [localHistory, setLocalHistory] = useState<
    { role: "user" | "assistant"; content: string }[]
  >([]);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { data: user } = useMeQuery();
  const {
    data: history,
    isLoading: historyLoading,
    isFetching: historyFetching,
  } = useChatHistoryQuery(user?.id, !!user && isOpen);
  const sendMessageMutation = useSendMessageMutation();
  const deleteHistoryMutation = useDeleteChatHistoryMutation();

  // Scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [localHistory, isOpen]);

  // Sync with server history when it loads
  useEffect(() => {
    // Only sync if we have data AND we are not currently fetching fresh data for a new user/id
    if (history?.data && !historyFetching) {
      const formattedHistory = (history.data as any[]).flatMap((chat: any) => [
        { role: "user", content: chat.message },
        { role: "assistant", content: chat.response },
      ]);
      setLocalHistory(formattedHistory as any);
    } else if (!user) {
      // Clear history if no user is logged in (guest mode or logged out)
      setLocalHistory([]);
    }
  }, [history, user, historyFetching]);

  // Force clear when user changes to prevent cross-session leaks
  useEffect(() => {
    setLocalHistory([]);
  }, [user?.id]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!message.trim() || sendMessageMutation.isPending) return;

    const userMessage = message.trim();
    setMessage("");

    // Optimistic update
    setLocalHistory((prev) => [
      ...prev,
      { role: "user", content: userMessage },
    ]);

    try {
      const response = await sendMessageMutation.mutateAsync({
        message: userMessage,
      });
      if (response.data) {
        setLocalHistory((prev) => [
          ...prev,
          { role: "assistant", content: response.data!.response },
        ]);
      }
    } catch (error) {
      // Error is handled in mutation
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[380px] h-[520px] bg-white/80 dark:bg-slate-900/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-slate-200/50 dark:border-slate-800/50 overflow-hidden flex flex-col shadow-emerald-500/10"
          >
            {/* Header */}
            <div className="p-6 bg-gradient-to-r from-[#065E32] to-[#44B74C] text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">NutriSync Assistant</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-300 animate-pulse" />
                    <span className="text-[10px] font-medium opacity-80">
                      AI Online
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {(localHistory.length > 0 ||
                  (history?.data && history.data.length > 0)) && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you want to clear your chat history?",
                        )
                      ) {
                        deleteHistoryMutation.mutate();
                      }
                    }}
                    disabled={deleteHistoryMutation.isPending}
                    className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                    title="Clear history"
                  >
                    {deleteHistoryMutation.isPending ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                >
                  <Maximize2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-white hover:bg-white/10 rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Chat Messages */}
            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-6 space-y-4 scroll-smooth"
            >
              {localHistory.length === 0 && !historyLoading && (
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4 py-10">
                  <div className="w-16 h-16 rounded-3xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-[#065E32] dark:text-[#44B74C]" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-900 dark:text-white">
                      How can I help you today?
                    </p>
                    <p className="text-xs text-slate-500 max-w-[200px]">
                      Ask me about nutrition, recipes, or meal planning.
                    </p>
                  </div>
                </div>
              )}

              {historyLoading && localHistory.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <Loader2 className="w-6 h-6 animate-spin text-[#065E32]" />
                </div>
              )}

              {localHistory.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] rounded-3xl px-4 py-3 text-sm",
                      msg.role === "user"
                        ? "bg-[#065E32] text-white rounded-tr-none"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-tl-none",
                    )}
                  >
                    <div className="prose prose-sm dark:prose-invert max-w-none">
                      <ReactMarkdown>{msg.content}</ReactMarkdown>
                    </div>
                  </div>
                </motion.div>
              ))}

              {sendMessageMutation.isPending && (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-3xl rounded-tl-none px-4 py-3 flex gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-100" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce delay-200" />
                  </div>
                </motion.div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200/50 dark:border-slate-800/50">
              {!user && (
                <p className="text-[10px] text-slate-400 text-center mb-2">
                  Guest mode: Chat history won't be saved.{" "}
                  <Link
                    href="/login"
                    className="text-emerald-500 font-bold underline"
                  >
                    Sign in
                  </Link>
                </p>
              )}
              <form onSubmit={handleSend} className="flex gap-2">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything..."
                  className="rounded-2xl bg-white dark:bg-slate-900 border-none shadow-inner h-12 focus-visible:ring-[#065E32]"
                />
                <Button
                  type="submit"
                  disabled={!message.trim() || sendMessageMutation.isPending}
                  className="rounded-2xl w-12 h-12 bg-[#065E32] hover:bg-[#044a27] text-white p-0 flex items-center justify-center active:scale-95 transition-transform"
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-[#065E32] to-[#44B74C] text-white shadow-2xl shadow-emerald-500/40 flex items-center justify-center relative group"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <ChevronDown className="w-8 h-8" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="flex items-center justify-center"
            >
              <MessageCircle className="w-8 h-8" />
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-300 rounded-full border-4 border-white dark:border-slate-900 group-hover:animate-ping" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
