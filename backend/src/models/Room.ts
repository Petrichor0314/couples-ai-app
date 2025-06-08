import { Schema, model } from 'mongoose';
import { IRoom } from '../types';

const roomSchema = new Schema<IRoom>({
  roomId: {
    type: String,
    required: true,
    unique: true
  },
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  status: {
    type: String,
    enum: ['waiting', 'ready', 'completed'],
    default: 'waiting'
  },
  currentRound: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Room = model<IRoom>('Room', roomSchema); 