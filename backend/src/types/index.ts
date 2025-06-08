export interface IUser {
  userId: string;
  name: string;
  roomId: string;
  createdAt: Date;
}

export interface IRoom {
  roomId: string;
  users: string[];
  status: 'waiting' | 'ready' | 'completed';
  currentRound: number;
  createdAt: Date;
}

export interface CreateRoomRequest {
  name: string;
}

export interface CreateRoomResponse {
  message: string;
  data: {
    roomId: string;
    userId: string;
    name: string;
    status: string;
  };
}

export interface JoinRoomRequest {
  name: string;
  roomId: string;
}

export interface JoinRoomResponse {
  message: string;
  data: {
    userId: string;
    roomStatus: 'waiting' | 'ready';
  };
} 