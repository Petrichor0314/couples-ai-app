import axios, { AxiosResponse } from "axios";
import { Message } from "../types";
require("dotenv").config();

const aiPrompts = require("../config/aiPrompts");

export class AIService {
  private apiKey: string;
  private model: string;
  private baseURL: string;

  constructor() {
    this.apiKey = process.env.OPENROUTER_API_KEY || "";
    this.model =
      process.env.OPENROUTER_MODEL || "mistralai/mistral-7b-instruct";
    this.baseURL = "https://openrouter.ai/api/v1";

    if (!this.apiKey) {
      console.warn(
        "OpenRouter API key not provided. Set OPENROUTER_API_KEY environment variable."
      );
    }
  }

  async generateNextQuestion(
    round: number,
    userHistory: Message[],
    partnerContext: Message[],
    currentRoundAnswers: Message[]
  ): Promise<string> {
    const prompt = aiPrompts.getPromptForRound(
      round,
      userHistory,
      partnerContext,
      currentRoundAnswers
    );

    try {
      const response: AxiosResponse = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 200,
          temperature: 0.7,
          top_p: 0.9,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://relationship-support-app.com",
            "X-Title": "Relationship Support App",
          },
        }
      );

      const question =
        response.data.choices[0]?.message?.content?.trim() ||
        "How are you feeling about your relationship today?";

      return question;
    } catch (error) {
      console.error("Error generating question:", error);
      return this.getFallbackQuestion(round);
    }
  }

  async generateFeedback(
    user1History: Message[],
    user2History: Message[]
  ): Promise<string> {
    const prompt = aiPrompts.getFeedbackPrompt(user1History, user2History);

    try {
      const response: AxiosResponse = await axios.post(
        `${this.baseURL}/chat/completions`,
        {
          model: this.model,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 800,
          temperature: 0.6,
          top_p: 0.9,
        },
        {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "https://relationship-support-app.com",
            "X-Title": "Relationship Support App",
          },
        }
      );

      const feedback =
        response.data.choices[0]?.message?.content?.trim() ||
        "Thank you both for your thoughtful responses. Your relationship shows promise and areas for growth.";

      return feedback;
    } catch (error) {
      console.error("Error generating feedback:", error);
      return this.getFallbackFeedback();
    }
  }

  private getFallbackQuestion(round: number): string {
    const fallbackQuestions = {
      1: "What initially drew you to your partner, and what about that connection still resonates with you today?",
      2: "When you and your partner disagree, how do you typically navigate those moments together?",
      3: "What does a fulfilling life look like to you, and how does your partner fit into that vision?",
      4: "What makes you feel most emotionally connected to your partner?",
      5: "What's one thing you'd like to understand better about your partner or your relationship together?",
    };

    return (
      fallbackQuestions[round as keyof typeof fallbackQuestions] ||
      fallbackQuestions[1]
    );
  }

  private getFallbackFeedback(): string {
    return `Thank you both for your thoughtful participation in this relationship exploration. 

Your willingness to engage in honest self-reflection shows a genuine commitment to understanding yourselves and each other more deeply. Every relationship is a unique journey with its own strengths and growth opportunities.

Based on your responses, I encourage you to continue having open conversations about your feelings, needs, and dreams. Remember that strong relationships are built through consistent small moments of connection, understanding, and mutual support.

Consider setting aside regular time to check in with each other, practice active listening, and celebrate the positive aspects of your relationship while working together on areas that need attention.

Your relationship has the potential to continue growing stronger through intentional effort and care from both of you.`;
  }
}
