/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage, getChatHistory } from "../services/chat.api";
import { ChatMessageInput } from "../types/chat.types";
import { toast } from "sonner";

export const useChatHistoryQuery = (enabled = true) => {
  return useQuery({
    queryKey: ["chat-history"],
    queryFn: () => getChatHistory(),
    enabled,
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
