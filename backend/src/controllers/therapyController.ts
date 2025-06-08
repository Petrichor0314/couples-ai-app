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

      // Get all answers for the current round from both users
      const currentRoundAnswers = this.dataService.getAllAnswersForRound(
        roomId,
        currentRound
      );

      // Debug logging to see what data we're working with
      console.log(`\n🔍 DEBUG - Next Question Request:`);
      console.log(`Room: ${roomId}, User: ${userId}, Round: ${currentRound}`);
      console.log(`User History: ${userHistory.length} messages`);
      console.log(`Partner Context: ${partnerContext.length} messages`);
      console.log(
        `Current Round Answers: ${currentRoundAnswers.length} answers`
      );

      if (userHistory.length > 0) {
        console.log(
          `Latest user answer (Round ${
            userHistory[userHistory.length - 1].round
          }): ${userHistory[userHistory.length - 1].content.substring(
            0,
            100
          )}...`
        );
      }

      // Generate personalized question using AI
      const question = await this.aiService.generateNextQuestion(
        currentRound,
        userHistory,
        partnerContext,
        currentRoundAnswers
      );

      console.log(
        `✨ Generated question for Round ${currentRound}: ${question.substring(
          0,
          100
        )}...`
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

      console.log(`\n🔍 DEBUG - Feedback Request:`);
      console.log(`Room: ${roomId}`);
      console.log(`User 1 (${users[0]}): ${user1History.length} answers`);
      console.log(`User 2 (${users[1]}): ${user2History.length} answers`);

      // Check if we have enough data for meaningful feedback
      if (user1History.length === 0 && user2History.length === 0) {
        res.status(400).json({
          error: "Insufficient data",
          message: "No user responses found for this room",
        });
        return;
      }

      // Allow feedback generation even with partial data for testing
      if (!this.dataService.hasCompleteDataForFeedback(roomId)) {
        console.log(
          "⚠️  Warning: Generating feedback with limited data for testing purposes"
        );
      }

      // Generate comprehensive feedback using AI
      const feedback = await this.aiService.generateFeedback(
        user1History,
        user2History
      );

      console.log(`✨ Generated feedback (${feedback.length} characters)`);

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

  // Debug endpoint to see what data exists for a user
  async debugUserData(req: Request, res: Response): Promise<void> {
    try {
      const { roomId, userId } = req.params;
      const debugData = this.dataService.debugUserData(roomId, userId);
      res.json(debugData);
    } catch (error) {
      console.error("Error in debugUserData:", error);
      res.status(500).json({ error: "Failed to get debug data" });
    }
  }
}
