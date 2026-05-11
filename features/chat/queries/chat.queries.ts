/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  sendMessage,
  getChatHistory,
  deleteChatHistory,
} from "../services/chat.api";
import { ChatMessageInput } from "../types/chat.types";
import { toast } from "sonner";

export const useChatHistoryQuery = (userId?: string, enabled = true) => {
  return useQuery({
    queryKey: ["chat-history", userId],
    queryFn: () => getChatHistory(),
    enabled: enabled && !!userId,
    staleTime: 0,
    gcTime: 0, // Ensure no stale cache across sessions
  });
};

export const useSendMessageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: ChatMessageInput) => sendMessage(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-history"] });
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to send message");
    },
  });
};

export const useDeleteChatHistoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteChatHistory(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chat-history"] });
      toast.success("Chat history cleared");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to clear history");
    },
  });
};
