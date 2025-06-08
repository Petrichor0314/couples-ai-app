export interface Message {
  id: string;
  userId: string;
  roomId: string;
  content: string;
  timestamp: Date;
  round: number;
  type: "question" | "answer";
}

export interface User {
  id: string;
  name: string;
  roomId: string;
}

export interface Room {
  id: string;
  users: User[];
  currentRound: number;
  isComplete: boolean;
  createdAt: Date;
}

export interface NextQuestionResponse {
  question: string;
  round: number;
}

export interface FeedbackResponse {
  feedback: string;
}

export interface AIPromptConfig {
  systemPrompt: string;
  roundPrompts: {
    [key: number]: {
      name: string;
      description: string;
      personality: string;
      questionStyle: string;
    };
  };
}
