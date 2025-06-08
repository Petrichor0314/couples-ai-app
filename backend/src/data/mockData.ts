import { Message, User, Room } from "../types";
import { v4 as uuidv4 } from "uuid";

export class MockDataStore {
  // Mock data storage
  private mockRooms: Room[] = [];
  private mockMessages: Message[] = [];

  // Comprehensive mock data for different users and scenarios
  private mockUserHistories: { [key: string]: Message[] } = {
    // User John in room-123 - Multiple questions per round
    "room-123:user-john": [
      // Round 1 - Multiple answers about how they met
      {
        id: uuidv4(),
        userId: "user-john",
        roomId: "room-123",
        content:
          "We met at a coffee shop during a rainstorm. She was reading my favorite book, and we ended up talking for 4 hours straight. I felt like I'd known her forever.",
        timestamp: new Date(Date.now() - 7200000), // 2 hours ago
        round: 1,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-john",
        roomId: "room-123",
        content:
          "The first thing that attracted me was her laugh - it was so genuine and infectious. But what really drew me in was how thoughtful she was about everything, even small things like which coffee to order.",
        timestamp: new Date(Date.now() - 7000000), // 1h 57m ago
        round: 1,
        type: "answer",
      },
      // Round 2 - Multiple answers about conflict resolution
      {
        id: uuidv4(),
        userId: "user-john",
        roomId: "room-123",
        content:
          "When we disagree, I tend to get quiet and need time to think. Sometimes I worry I shut down too much instead of working through things together in the moment.",
        timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
        round: 2,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-john",
        roomId: "room-123",
        content:
          "I've noticed that I sometimes take things too personally during arguments. I'm working on listening more and not getting defensive when she brings up concerns.",
        timestamp: new Date(Date.now() - 5200000), // 1h 27m ago
        round: 2,
        type: "answer",
      },
      // Round 3 - Multiple answers about future vision
      {
        id: uuidv4(),
        userId: "user-john",
        roomId: "room-123",
        content:
          "I value stability and building something lasting together. I want us to travel more, maybe buy a house in a few years, and support each other's career growth.",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        round: 3,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-john",
        roomId: "room-123",
        content:
          "Family is important to me long-term. I'd love to have kids with her someday, but I want to make sure we're both ready and our relationship is strong.",
        timestamp: new Date(Date.now() - 3400000), // 57m ago
        round: 3,
        type: "answer",
      },
    ],

    // User Jane in room-123 (John's partner) - Multiple questions per round
    "room-123:user-jane": [
      // Round 1 - Multiple answers about how they met
      {
        id: uuidv4(),
        userId: "user-jane",
        roomId: "room-123",
        content:
          "That rainy day at the coffee shop changed everything for me. John was so genuinely curious about my thoughts on the book, and his laugh was infectious. I felt completely comfortable being myself.",
        timestamp: new Date(Date.now() - 6900000), // 1h 55m ago
        round: 1,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-jane",
        roomId: "room-123",
        content:
          "What struck me most was how present he was in our conversation. He wasn't checking his phone or looking around - he was completely focused on what I was saying. That felt rare and special.",
        timestamp: new Date(Date.now() - 6700000), // 1h 52m ago
        round: 1,
        type: "answer",
      },
      // Round 2 - Multiple answers about conflict resolution
      {
        id: uuidv4(),
        userId: "user-jane",
        roomId: "room-123",
        content:
          "I'm more direct when we have conflicts, sometimes too direct. I've learned that John needs processing time, so I'm trying to give him space while still expressing my needs clearly.",
        timestamp: new Date(Date.now() - 5100000), // 1h 25m ago
        round: 2,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-jane",
        roomId: "room-123",
        content:
          "I tend to want to resolve things immediately, but I'm learning that taking a break and coming back to difficult conversations often leads to better outcomes for both of us.",
        timestamp: new Date(Date.now() - 4900000), // 1h 22m ago
        round: 2,
        type: "answer",
      },
      // Round 3 - Multiple answers about future vision
      {
        id: uuidv4(),
        userId: "user-jane",
        roomId: "room-123",
        content:
          "Adventure and growth are important to me. I want us to keep challenging each other, maybe start a side business together, and definitely travel to at least 3 new countries in the next 5 years.",
        timestamp: new Date(Date.now() - 3300000), // 55 minutes ago
        round: 3,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-jane",
        roomId: "room-123",
        content:
          "I want us to maintain our individual identities while building something beautiful together. Having our own friends, hobbies, and goals makes us more interesting to each other.",
        timestamp: new Date(Date.now() - 3100000), // 52m ago
        round: 3,
        type: "answer",
      },
    ],

    // User Alice in room-456 (early relationship - fewer rounds completed)
    "room-456:user-alice": [
      {
        id: uuidv4(),
        userId: "user-alice",
        roomId: "room-456",
        content:
          "We've only been dating for 3 months, but there's something special here. We met through mutual friends at a game night, and I love how he makes me laugh even during stressful times.",
        timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
        round: 1,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-alice",
        roomId: "room-456",
        content:
          "He's incredibly kind and patient. I've seen how he treats service workers, his friends, even his ex - always with respect. That says a lot about his character.",
        timestamp: new Date(Date.now() - 1600000), // 27m ago
        round: 1,
        type: "answer",
      },
    ],

    // User Bob in room-456 (Alice's partner)
    "room-456:user-bob": [
      {
        id: uuidv4(),
        userId: "user-bob",
        roomId: "room-456",
        content:
          "Alice has this amazing energy that draws me in. We're still in the early stages, but I feel like we really 'get' each other. She challenges me in the best way.",
        timestamp: new Date(Date.now() - 1500000), // 25 minutes ago
        round: 1,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-bob",
        roomId: "room-456",
        content:
          "I'm usually pretty guarded at first, but with Alice I found myself opening up naturally. She creates this safe space where I can be vulnerable without judgment.",
        timestamp: new Date(Date.now() - 1300000), // 22m ago
        round: 1,
        type: "answer",
      },
    ],

    // User Mike in room-789 (long-term relationship with challenges)
    "room-789:user-mike": [
      // Round 1 - Current relationship state
      {
        id: uuidv4(),
        userId: "user-mike",
        roomId: "room-789",
        content:
          "We've been together 8 years, married for 3. Lately, it feels like we're more like roommates than partners. We still care deeply for each other, but the spark feels dimmed.",
        timestamp: new Date(Date.now() - 4800000), // 1h 20m ago
        round: 1,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-mike",
        roomId: "room-789",
        content:
          "We used to talk for hours about everything and nothing. Now our conversations are mostly logistics - bills, schedules, household tasks. I miss the deeper connection we used to have.",
        timestamp: new Date(Date.now() - 4600000), // 1h 17m ago
        round: 1,
        type: "answer",
      },
      // Round 2 - Conflict patterns
      {
        id: uuidv4(),
        userId: "user-mike",
        roomId: "room-789",
        content:
          "We've gotten into a pattern where we both avoid difficult conversations. I know we need to address some things, but it's easier to just focus on daily logistics and avoid the deeper stuff.",
        timestamp: new Date(Date.now() - 3000000), // 50 minutes ago
        round: 2,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-mike",
        roomId: "room-789",
        content:
          "When we do argue, it often feels like we're talking past each other. We both get frustrated and nothing gets resolved. Then we just sweep it under the rug until next time.",
        timestamp: new Date(Date.now() - 2800000), // 47m ago
        round: 2,
        type: "answer",
      },
      // Round 3 - Hopes and fears
      {
        id: uuidv4(),
        userId: "user-mike",
        roomId: "room-789",
        content:
          "I'm scared we're drifting apart, but I also have hope. We've been through challenges before and come out stronger. I want to fight for what we have and rediscover each other.",
        timestamp: new Date(Date.now() - 2400000), // 40m ago
        round: 3,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-mike",
        roomId: "room-789",
        content:
          "I think we both need to be more intentional about our relationship. Date nights, deeper conversations, shared goals - all the things that made us fall in love in the first place.",
        timestamp: new Date(Date.now() - 2200000), // 37m ago
        round: 3,
        type: "answer",
      },
    ],

    // User Sarah in room-789 (Mike's partner - long-term relationship)
    "room-789:user-sarah": [
      // Round 1 - Current relationship state
      {
        id: uuidv4(),
        userId: "user-sarah",
        roomId: "room-789",
        content:
          "Eight years together and I still love Mike deeply, but something has shifted. We're so busy with work and life that we've stopped really seeing each other. I feel lonely sometimes even when we're together.",
        timestamp: new Date(Date.now() - 4500000), // 1h 15m ago
        round: 1,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-sarah",
        roomId: "room-789",
        content:
          "I miss the intimacy we used to have - not just physical, but emotional. We used to share our dreams, fears, random thoughts. Now it feels like we're just managing our shared life rather than truly living it together.",
        timestamp: new Date(Date.now() - 4300000), // 1h 12m ago
        round: 1,
        type: "answer",
      },
      // Round 2 - Conflict patterns
      {
        id: uuidv4(),
        userId: "user-sarah",
        roomId: "room-789",
        content:
          "I've become conflict-avoidant, which isn't like me. I used to be more direct about issues, but now I worry that bringing things up will just create more distance between us.",
        timestamp: new Date(Date.now() - 2700000), // 45m ago
        round: 2,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-sarah",
        roomId: "room-789",
        content:
          "When we do have disagreements, I feel like Mike shuts down emotionally. Then I get frustrated and either push harder or give up entirely. Neither approach works well for us.",
        timestamp: new Date(Date.now() - 2500000), // 42m ago
        round: 2,
        type: "answer",
      },
      // Round 3 - Hopes and fears
      {
        id: uuidv4(),
        userId: "user-sarah",
        roomId: "room-789",
        content:
          "My biggest fear is that we'll just drift into being comfortable strangers. But I also believe we can reconnect if we both commit to doing the work. Our foundation is still strong.",
        timestamp: new Date(Date.now() - 2100000), // 35m ago
        round: 3,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-sarah",
        roomId: "room-789",
        content:
          "I want us to create new traditions and experiences together. Maybe couples therapy, or taking a class together, or just committing to weekly check-ins about how we're really doing.",
        timestamp: new Date(Date.now() - 1900000), // 32m ago
        round: 3,
        type: "answer",
      },
    ],

    // User Emma in room-321 (new relationship, excited but anxious)
    "room-321:user-emma": [
      // Round 1 - Early relationship excitement
      {
        id: uuidv4(),
        userId: "user-emma",
        roomId: "room-321",
        content:
          "This is the most natural relationship I've ever been in. We've been dating for 6 weeks and it feels like we've known each other forever. I'm trying not to get ahead of myself, but I'm really excited about the possibilities.",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        round: 1,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-emma",
        roomId: "room-321",
        content:
          "He's different from anyone I've dated before - more emotionally available, great at communicating, and we have this amazing physical chemistry. I feel like myself around him, which is rare for me.",
        timestamp: new Date(Date.now() - 3400000), // 57m ago
        round: 1,
        type: "answer",
      },
      // Round 2 - Fears and insecurities
      {
        id: uuidv4(),
        userId: "user-emma",
        roomId: "room-321",
        content:
          "I have some trust issues from past relationships, and I catch myself looking for red flags even when there aren't any. I don't want my past to sabotage this beautiful thing we're building.",
        timestamp: new Date(Date.now() - 2700000), // 45m ago
        round: 2,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-emma",
        roomId: "room-321",
        content:
          "Sometimes I worry I'm being too vulnerable too quickly. But then again, isn't that what genuine connection requires? I'm learning to trust my instincts and his actions, not just my fears.",
        timestamp: new Date(Date.now() - 2500000), // 42m ago
        round: 2,
        type: "answer",
      },
    ],

    // User David in room-321 (Emma's partner)
    "room-321:user-david": [
      // Round 1 - Early relationship excitement
      {
        id: uuidv4(),
        userId: "user-david",
        roomId: "room-321",
        content:
          "Emma is incredible. I've never felt this comfortable being completely myself with someone so early in a relationship. She's smart, funny, and there's this electric connection between us that I've never experienced before.",
        timestamp: new Date(Date.now() - 3300000), // 55m ago
        round: 1,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-david",
        roomId: "room-321",
        content:
          "I'm usually pretty cautious about getting serious, but with Emma everything feels different. Natural. Right. I find myself thinking about our future together, which both excites and surprises me.",
        timestamp: new Date(Date.now() - 3100000), // 52m ago
        round: 1,
        type: "answer",
      },
      // Round 2 - Understanding her needs
      {
        id: uuidv4(),
        userId: "user-david",
        roomId: "room-321",
        content:
          "I can sense that Emma has been hurt before, and I want to show her through my actions that she's safe with me. I'm trying to be extra consistent and transparent so she knows I'm trustworthy.",
        timestamp: new Date(Date.now() - 2400000), // 40m ago
        round: 2,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-david",
        roomId: "room-321",
        content:
          "I love how open she's being with me, even when it's scary for her. I want to match that vulnerability and create a space where we can both be completely authentic.",
        timestamp: new Date(Date.now() - 2200000), // 37m ago
        round: 2,
        type: "answer",
      },
    ],

    // User Lisa in room-654 (going through a rough patch)
    "room-654:user-lisa": [
      // Round 1 - Current struggles
      {
        id: uuidv4(),
        userId: "user-lisa",
        roomId: "room-654",
        content:
          "We're going through the hardest period in our 4-year relationship. Between job stress, family issues, and some trust problems we haven't fully worked through, everything feels heavy right now.",
        timestamp: new Date(Date.now() - 5400000), // 1.5 hours ago
        round: 1,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-lisa",
        roomId: "room-654",
        content:
          "I found some messages on his phone 6 months ago that made me question everything. He says it was just flirting and meant nothing, but I'm still struggling with feeling secure in our relationship.",
        timestamp: new Date(Date.now() - 5200000), // 1h 27m ago
        round: 1,
        type: "answer",
      },
      // Round 2 - Working through issues
      {
        id: uuidv4(),
        userId: "user-lisa",
        roomId: "room-654",
        content:
          "We started couples counseling last month, which has been helpful but also really challenging. Having a neutral party help us communicate has shown me how differently we handle conflict and stress.",
        timestamp: new Date(Date.now() - 3900000), // 1h 5m ago
        round: 2,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-lisa",
        roomId: "room-654",
        content:
          "I'm learning that I have a tendency to bring up past hurts during current arguments, which isn't fair to either of us. I'm working on staying present and addressing issues as they come up rather than letting them build up.",
        timestamp: new Date(Date.now() - 3700000), // 1h 2m ago
        round: 2,
        type: "answer",
      },
      // Round 3 - Hope and commitment
      {
        id: uuidv4(),
        userId: "user-lisa",
        roomId: "room-654",
        content:
          "Despite everything we're going through, I still believe in us. We've both made mistakes, but we're both committed to doing the work to rebuild trust and create something even stronger than before.",
        timestamp: new Date(Date.now() - 1800000), // 30m ago
        round: 3,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-lisa",
        roomId: "room-654",
        content:
          "I want us to come out of this period with better communication skills, clearer boundaries, and a deeper understanding of each other's needs. If we can get through this, we can get through anything.",
        timestamp: new Date(Date.now() - 1600000), // 27m ago
        round: 3,
        type: "answer",
      },
    ],

    // User Tom in room-654 (Lisa's partner)
    "room-654:user-tom": [
      // Round 1 - Taking responsibility
      {
        id: uuidv4(),
        userId: "user-tom",
        roomId: "room-654",
        content:
          "I messed up badly 6 months ago with some inappropriate texting. It was stupid and selfish, and I've been working every day since to rebuild Lisa's trust and prove that I'm committed to this relationship.",
        timestamp: new Date(Date.now() - 5100000), // 1h 25m ago
        round: 1,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-tom",
        roomId: "room-654",
        content:
          "The hardest part is seeing how much I hurt her and knowing that my actions caused this pain. I take full responsibility and I'm doing everything I can to make things right, even though I know it takes time.",
        timestamp: new Date(Date.now() - 4900000), // 1h 22m ago
        round: 1,
        type: "answer",
      },
      // Round 2 - Learning and growing
      {
        id: uuidv4(),
        userId: "user-tom",
        roomId: "room-654",
        content:
          "Therapy has been eye-opening. I'm learning about the impact of my actions and how to be more emotionally present. I realize I was using outside attention to avoid dealing with stress in our relationship.",
        timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        round: 2,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-tom",
        roomId: "room-654",
        content:
          "I'm working on being more transparent about everything - my feelings, my struggles, my day-to-day interactions. Lisa deserves that honesty, and I should have been giving it all along.",
        timestamp: new Date(Date.now() - 3400000), // 57m ago
        round: 2,
        type: "answer",
      },
      // Round 3 - Commitment to change
      {
        id: uuidv4(),
        userId: "user-tom",
        roomId: "room-654",
        content:
          "I love Lisa more than I've ever loved anyone, and I'm committed to becoming the partner she deserves. This isn't just about fixing what I broke - it's about building something better than we had before.",
        timestamp: new Date(Date.now() - 1500000), // 25m ago
        round: 3,
        type: "answer",
      },
      {
        id: uuidv4(),
        userId: "user-tom",
        roomId: "room-654",
        content:
          "I want to show her through consistent actions, not just words, that she can trust me completely. I'm in this for the long haul and I'm willing to do whatever it takes to rebuild what we have.",
        timestamp: new Date(Date.now() - 1300000), // 22m ago
        round: 3,
        type: "answer",
      },
    ],
  };

  // Helper method to get all messages for a room
  private getAllRoomMessages(roomId: string): Message[] {
    const allMessages: Message[] = [];

    // Get all messages from all users in this room
    Object.entries(this.mockUserHistories).forEach(([key, messages]) => {
      const [room] = key.split(":");
      if (room === roomId) {
        allMessages.push(...messages);
      }
    });

    // Sort by timestamp
    return allMessages.sort(
      (a, b) => a.timestamp.getTime() - b.timestamp.getTime()
    );
  }

  // Mock implementation methods
  getChatHistory(roomId: string, userId: string): Message[] {
    const key = `${roomId}:${userId}`;
    return this.mockUserHistories[key] || [];
  }

  getPartnerAnswers(roomId: string, userId: string): Message[] {
    const allRoomMessages = this.getAllRoomMessages(roomId);
    return allRoomMessages.filter((message) => message.userId !== userId);
  }

  getCurrentRound(roomId: string, userId: string): number {
    const userHistory = this.getChatHistory(roomId, userId);
    const answeredRounds = new Set(userHistory.map((msg) => msg.round));

    // Find the first round (1-5) that hasn't been answered
    for (let round = 1; round <= 5; round++) {
      if (!answeredRounds.has(round)) {
        return round;
      }
    }

    // If all rounds are complete, return 6 (or max round + 1)
    return 6;
  }

  getAllUserAnswers(roomId: string, userId: string): Message[] {
    return this.getChatHistory(roomId, userId);
  }

  getAllAnswersForRound(roomId: string, round: number): Message[] {
    const allRoomMessages = this.getAllRoomMessages(roomId);
    return allRoomMessages.filter((message) => message.round === round);
  }

  getRoomUsers(roomId: string): string[] {
    const users = new Set<string>();

    Object.entries(this.mockUserHistories).forEach(([key, messages]) => {
      const [room, userId] = key.split(":");
      if (room === roomId && messages.length > 0) {
        users.add(userId);
      }
    });

    return Array.from(users);
  }

  isRoomComplete(roomId: string): boolean {
    const users = this.getRoomUsers(roomId);

    // Check if all users have completed all 5 rounds
    return users.every((userId) => {
      const userHistory = this.getChatHistory(roomId, userId);
      const answeredRounds = new Set(userHistory.map((msg) => msg.round));
      return (
        answeredRounds.size >= 5 &&
        Array.from({ length: 5 }, (_, i) => i + 1).every((round) =>
          answeredRounds.has(round)
        )
      );
    });
  }

  hasCompleteDataForFeedback(roomId: string): boolean {
    const users = this.getRoomUsers(roomId);

    // Room needs at least 2 users and each user should have answered at least 2 rounds
    if (users.length < 2) return false;

    return users.every((userId) => {
      const userHistory = this.getChatHistory(roomId, userId);
      const answeredRounds = new Set(userHistory.map((msg) => msg.round));
      return answeredRounds.size >= 2;
    });
  }

  saveMessage(message: Omit<Message, "id" | "timestamp">): Message {
    const completeMessage: Message = {
      ...message,
      id: uuidv4(),
      timestamp: new Date(),
    };

    // Add to appropriate user history
    const key = `${message.roomId}:${message.userId}`;
    if (!this.mockUserHistories[key]) {
      this.mockUserHistories[key] = [];
    }
    this.mockUserHistories[key].push(completeMessage);

    return completeMessage;
  }

  debugUserData(roomId: string, userId: string): any {
    const history = this.getChatHistory(roomId, userId);
    const partnerAnswers = this.getPartnerAnswers(roomId, userId);
    const currentRound = this.getCurrentRound(roomId, userId);
    const allUsers = this.getRoomUsers(roomId);

    return {
      userId,
      roomId,
      currentRound,
      userHistoryCount: history.length,
      partnerAnswersCount: partnerAnswers.length,
      allUsersInRoom: allUsers,
      userHistory: history,
      partnerAnswers: partnerAnswers,
      roomComplete: this.isRoomComplete(roomId),
      hasDataForFeedback: this.hasCompleteDataForFeedback(roomId),
    };
  }
}
