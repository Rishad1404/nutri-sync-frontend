/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ChatMessage {
  id: string;
  userId?: string;
  message: string;
  response: string;
  recipeContext?: any;
  createdAt: string;
}

export interface ChatMessageInput {
  message: string;
  recipeContext?: any;
}
