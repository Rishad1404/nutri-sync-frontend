import { api } from "@/lib/axios/http";
import { ChatMessage, ChatMessageInput } from "../types/chat.types";

export async function sendMessage(payload: ChatMessageInput) {
  const response = await api.post<ChatMessage>("/chat", payload);
  return response;
}

export async function getChatHistory() {
  const response = await api.get<ChatMessage[]>("/chat/history");
  return response;
}

export async function deleteChatHistory() {
  const response = await api.delete("/chat/history");
  return response;
}
