import { Message, User, Room } from "../types";
import { v4 as uuidv4 } from "uuid";
import { MockDataStore } from "../data/mockData";

export class DataService {
  private mockDataStore: MockDataStore;

  constructor() {
    this.mockDataStore = new MockDataStore();
  }

  // ===== MOCK METHODS (TEMPORARY - REMOVE WHEN INTEGRATING DATABASE) =====

  getChatHistory(roomId: string, userId: string): Message[] {
    return this.mockDataStore.getChatHistory(roomId, userId);
  }

  getPartnerAnswers(roomId: string, userId: string): Message[] {
    return this.mockDataStore.getPartnerAnswers(roomId, userId);
  }

  getCurrentRound(roomId: string, userId: string): number {
    return this.mockDataStore.getCurrentRound(roomId, userId);
  }

  getAllUserAnswers(roomId: string, userId: string): Message[] {
    return this.mockDataStore.getAllUserAnswers(roomId, userId);
  }

  getAllAnswersForRound(roomId: string, round: number): Message[] {
    return this.mockDataStore.getAllAnswersForRound(roomId, round);
  }

  getRoomUsers(roomId: string): string[] {
    return this.mockDataStore.getRoomUsers(roomId);
  }

  isRoomComplete(roomId: string): boolean {
    return this.mockDataStore.isRoomComplete(roomId);
  }

  hasCompleteDataForFeedback(roomId: string): boolean {
    return this.mockDataStore.hasCompleteDataForFeedback(roomId);
  }

  saveMessage(message: Omit<Message, "id" | "timestamp">): Message {
    return this.mockDataStore.saveMessage(message);
  }

  debugUserData(roomId: string, userId: string): any {
    return this.mockDataStore.debugUserData(roomId, userId);
  }

  // ===== REAL DATABASE METHODS (UNCOMMENT AND IMPLEMENT WHEN READY) =====

  /*
  // Get chat history for a specific user in a room
  async getChatHistory(roomId: string, userId: string): Promise<Message[]> {
    // Implementation: Query database for messages where roomId matches and userId matches
    // ORDER BY timestamp ASC or round ASC
    // Example SQL: SELECT * FROM messages WHERE room_id = ? AND user_id = ? ORDER BY timestamp ASC
    throw new Error("Database method not implemented");
  }

  // Get partner's answers (all messages from other user in the same room)
  async getPartnerAnswers(roomId: string, userId: string): Promise<Message[]> {
    // Implementation: Query database for messages where roomId matches and userId does NOT match
    // ORDER BY timestamp ASC or round ASC
    // Example SQL: SELECT * FROM messages WHERE room_id = ? AND user_id != ? ORDER BY timestamp ASC
    throw new Error("Database method not implemented");
  }

  // Get the current round number for a user (next round they haven't answered)
  async getCurrentRound(roomId: string, userId: string): Promise<number> {
    // Implementation: 
    // 1. Query database for all rounds this user has answered in this room
    // 2. Find the lowest round number (1-5) that hasn't been answered
    // 3. Return that round number, or max round if all are complete
    // Example SQL: SELECT DISTINCT round FROM messages WHERE room_id = ? AND user_id = ?
    throw new Error("Database method not implemented");
  }

  // Get all answers from a user in a room
  async getAllUserAnswers(roomId: string, userId: string): Promise<Message[]> {
    // Implementation: Same as getChatHistory - get all messages for this user in this room
    // Example SQL: SELECT * FROM messages WHERE room_id = ? AND user_id = ? ORDER BY round ASC, timestamp ASC
    throw new Error("Database method not implemented");
  }

  // Get all answers for a specific round from all users in a room
  async getAllAnswersForRound(roomId: string, round: number): Promise<Message[]> {
    // Implementation: Query database for all messages in this room for this specific round
    // ORDER BY user_id, timestamp ASC to group by user
    // Example SQL: SELECT * FROM messages WHERE room_id = ? AND round = ? ORDER BY user_id ASC, timestamp ASC
    throw new Error("Database method not implemented");
  }

  // Get all user IDs in a room
  async getRoomUsers(roomId: string): Promise<string[]> {
    // Implementation: Query database for distinct user IDs in this room
    // Example SQL: SELECT DISTINCT user_id FROM messages WHERE room_id = ?
    // OR if you have a separate rooms_users table: SELECT user_id FROM rooms_users WHERE room_id = ?
    throw new Error("Database method not implemented");
  }

  // Check if a room is complete (all users have answered all rounds)
  async isRoomComplete(roomId: string): Promise<boolean> {
    // Implementation:
    // 1. Get all users in the room
    // 2. For each user, check if they have answered all required rounds (e.g., 1-5)
    // 3. Return true only if all users have completed all rounds
    throw new Error("Database method not implemented");
  }

  // Check if room has enough data for meaningful feedback
  async hasCompleteDataForFeedback(roomId: string): Promise<boolean> {
    // Implementation:
    // 1. Get all users in room
    // 2. Check if at least one user has answered minimum number of rounds (e.g., 3)
    // 3. Return true if sufficient data exists
    throw new Error("Database method not implemented");
  }

  // Save a new message to the database
  async saveMessage(message: Omit<Message, "id" | "timestamp">): Promise<Message> {
    // Implementation:
    // 1. Generate new ID (UUID)
    // 2. Set current timestamp
    // 3. Insert into database
    // 4. Return the complete message object
    // Example SQL: INSERT INTO messages (id, user_id, room_id, content, round, type, timestamp) VALUES (?, ?, ?, ?, ?, ?, ?)
    throw new Error("Database method not implemented");
  }

  // Debug method to inspect user data
  async debugUserData(roomId: string, userId: string): Promise<any> {
    // Implementation: Gather various data points for debugging
    const history = await this.getChatHistory(roomId, userId);
    const partnerAnswers = await this.getPartnerAnswers(roomId, userId);
    const currentRound = await this.getCurrentRound(roomId, userId);
    
    return {
      userId,
      roomId,
      currentRound,
      userHistoryCount: history.length,
      partnerAnswersCount: partnerAnswers.length,
      userHistory: history,
      partnerAnswers: partnerAnswers,
    };
  }

  // Additional helper methods you might need:

  // Get user by ID
  async getUserById(userId: string): Promise<User | null> {
    // Example SQL: SELECT * FROM users WHERE id = ?
    throw new Error("Database method not implemented");
  }

  // Get room by ID
  async getRoomById(roomId: string): Promise<Room | null> {
    // Example SQL: SELECT * FROM rooms WHERE id = ?
    throw new Error("Database method not implemented");
  }

  // Create a new room
  async createRoom(room: Omit<Room, "id" | "createdAt">): Promise<Room> {
    // Example SQL: INSERT INTO rooms (id, name, created_at) VALUES (?, ?, ?)
    throw new Error("Database method not implemented");
  }

  // Add user to room
  async addUserToRoom(roomId: string, userId: string): Promise<void> {
    // Example SQL: INSERT INTO rooms_users (room_id, user_id) VALUES (?, ?)
    throw new Error("Database method not implemented");
  }

  // Get messages by round for all users in room
  async getMessagesByRound(roomId: string, round: number): Promise<Message[]> {
    // Example SQL: SELECT * FROM messages WHERE room_id = ? AND round = ? ORDER BY user_id, timestamp ASC
    throw new Error("Database method not implemented");
  }

  // Get latest message for each user in a room
  async getLatestMessagesForRoom(roomId: string): Promise<Message[]> {
    // Implementation: Get the most recent message from each user in the room
    // This could be useful for showing current status
    throw new Error("Database method not implemented");
  }

  // Count messages by user in room
  async getMessageCountByUser(roomId: string, userId: string): Promise<number> {
    // Example SQL: SELECT COUNT(*) FROM messages WHERE room_id = ? AND user_id = ?
    throw new Error("Database method not implemented");
  }

  // Update message (if editing is allowed)
  async updateMessage(messageId: string, content: string): Promise<Message | null> {
    // Example SQL: UPDATE messages SET content = ?, updated_at = ? WHERE id = ?
    throw new Error("Database method not implemented");
  }

  // Delete message
  async deleteMessage(messageId: string): Promise<boolean> {
    // Example SQL: DELETE FROM messages WHERE id = ?
    throw new Error("Database method not implemented");
  }
  */
}
