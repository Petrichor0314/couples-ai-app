import { Schema, model } from 'mongoose';
import { IUser } from '../types';

const userSchema = new Schema<IUser>({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  roomId: {
    type: String,
    ref: 'Room'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const User = model<IUser>('User', userSchema); 