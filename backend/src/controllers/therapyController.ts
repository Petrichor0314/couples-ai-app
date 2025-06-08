import { Request, Response } from "express";
import { AIService } from "../services/aiService";
import { DataService } from "../services/dataService";
import { NextQuestionResponse, FeedbackResponse } from "../types";

export class TherapyController {
  private aiService: AIService;
  private dataService: DataService;

  constructor() {
    this.aiService = new AIService();
    this.dataService = new DataService();
  }

  async getNextQuestion(req: Request, res: Response): Promise<void> {
    try {
      const { roomId, userId } = req.params;

      if (!roomId || !userId) {
        res.status(400).json({ error: "Room ID and User ID are required" });
        return;
      }

      // Get user's chat history and current round
      const userHistory = this.dataService.getChatHistory(roomId, userId);
      const currentRound = this.dataService.getCurrentRound(roomId, userId);

      // Get partner's answers for context
      const partnerContext = this.dataService.getPartnerAnswers(roomId, userId);

      // Generate personalized question using AI
      const question = await this.aiService.generateNextQuestion(
        currentRound,
        userHistory,
        partnerContext
      );

      const response: NextQuestionResponse = {
        question,
        round: currentRound,
      };

      res.json(response);
    } catch (error) {
      console.error("Error in getNextQuestion:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to generate next question",
      });
    }
  }

  async getFeedback(req: Request, res: Response): Promise<void> {
    try {
      const { roomId } = req.params;

      if (!roomId) {
        res.status(400).json({ error: "Room ID is required" });
        return;
      }

      // Check if room is complete
      if (!this.dataService.isRoomComplete(roomId)) {
        res.status(400).json({
          error: "Room not complete",
          message:
            "Both users must complete all rounds before feedback can be generated",
        });
        return;
      }

      // Get all users in the room
      const users = this.dataService.getRoomUsers(roomId);

      if (users.length !== 2) {
        res.status(400).json({
          error: "Invalid room",
          message: "Room must have exactly 2 users",
        });
        return;
      }

      // Get both users' complete answer histories
      const user1History = this.dataService.getAllUserAnswers(roomId, users[0]);
      const user2History = this.dataService.getAllUserAnswers(roomId, users[1]);

      // Generate comprehensive feedback using AI
      const feedback = await this.aiService.generateFeedback(
        user1History,
        user2History
      );

      const response: FeedbackResponse = {
        feedback,
      };

      res.json(response);
    } catch (error) {
      console.error("Error in getFeedback:", error);
      res.status(500).json({
        error: "Internal server error",
        message: "Failed to generate feedback",
      });
    }
  }
}
