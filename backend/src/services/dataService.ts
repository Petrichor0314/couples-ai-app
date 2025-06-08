import { Message, User, Room } from "../types";
import { v4 as uuidv4 } from "uuid";

export class DataService {
  // Mock data - replace with actual database calls
  private mockRooms: Room[] = [];
  private mockMessages: Message[] = [];

  // Placeholder function - replace with actual database implementation
  getChatHistory(roomId: string, userId: string): Message[] {
    // Return mock chat history
    const mockHistory: Message[] = [
      {
        id: uuidv4(),
        userId: userId,
        roomId: roomId,
        content:
          "We met at a coffee shop and talked for hours about books and travel.",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        round: 1,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: userId,
        roomId: roomId,
        content:
          "I feel like we communicate well most of the time, but sometimes I worry we avoid difficult topics.",
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        round: 2,
        type: "answer",
      },
    ];

    return mockHistory.filter(
      (msg) => msg.userId === userId && msg.roomId === roomId
    );
  }

  // Placeholder function - replace with actual database implementation
  getPartnerAnswers(roomId: string, userId: string): Message[] {
    // Get the partner's answers (other user in the same room)
    const mockPartnerHistory: Message[] = [
      {
        id: uuidv4(),
        userId: "partner-" + userId, // Mock partner ID
        roomId: roomId,
        content:
          "I was immediately drawn to their sense of humor and how passionate they were about their interests.",
        timestamp: new Date(Date.now() - 3300000), // 55 minutes ago
        round: 1,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "partner-" + userId,
        roomId: roomId,
        content:
          "We're pretty good at talking through things, though I sometimes wish we could be more direct about our needs.",
        timestamp: new Date(Date.now() - 1500000), // 25 minutes ago
        round: 2,
        type: "answer",
      },
    ];

    return mockPartnerHistory.filter(
      (msg) => msg.roomId === roomId && msg.userId !== userId
    );
  }

  // Placeholder function - replace with actual database implementation
  getCurrentRound(roomId: string, userId: string): number {
    // Mock logic to determine current round based on user's progress
    const userHistory = this.getChatHistory(roomId, userId);
    const answeredRounds = new Set(userHistory.map((msg) => msg.round));

    // Find the next round they haven't answered
    for (let round = 1; round <= 5; round++) {
      if (!answeredRounds.has(round)) {
        return round;
      }
    }

    return 5; // Default to final round if all are complete
  }

  // Placeholder function - replace with actual database implementation
  getAllUserAnswers(roomId: string, userId: string): Message[] {
    return this.getChatHistory(roomId, userId);
  }

  // Placeholder function - replace with actual database implementation
  getRoomUsers(roomId: string): string[] {
    // Mock function to get all user IDs in a room
    return ["user1", "user2"]; // Return mock user IDs
  }

  // Placeholder function - replace with actual database implementation
  isRoomComplete(roomId: string): boolean {
    // Mock logic to check if both users have completed all rounds
    const users = this.getRoomUsers(roomId);
    return users.every((userId) => {
      const userHistory = this.getChatHistory(roomId, userId);
      const completedRounds = new Set(userHistory.map((msg) => msg.round));
      return completedRounds.size >= 5; // Assuming 5 rounds total
    });
  }

  // Placeholder function - replace with actual database implementation
  saveMessage(message: Omit<Message, "id" | "timestamp">): Message {
    const newMessage: Message = {
      ...message,
      id: uuidv4(),
      timestamp: new Date(),
    };

    this.mockMessages.push(newMessage);
    return newMessage;
  }
}
