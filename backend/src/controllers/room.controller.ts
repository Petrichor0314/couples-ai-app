import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Room } from '../models/Room';
import { User } from '../models/User';

interface JoinRoomRequest {
  name: string;
  roomId: string;
}

interface JoinRoomResponse {
  message: string;
  data: {
    userId: string;
    roomStatus: 'waiting' | 'ready';
  };
}

export const joinRoom = async (
  req: Request<{}, {}, JoinRoomRequest>,
  res: Response<JoinRoomResponse>
) => {
  try {
    const { name, roomId } = req.body;

    // Validate input
    if (!name || !roomId) {
      return res.status(400).json({
        message: 'Name and roomId are required',
        data: {
          userId: '',
          roomStatus: 'waiting'
        }
      });
    }

    // Find the room
    const room = await Room.findOne({ roomId }).populate('users');
    if (!room) {
      return res.status(404).json({
        message: 'Room not found',
        data: {
          userId: '',
          roomStatus: 'waiting'
        }
      });
    }

    // Check if room is full
    if (room.users.length >= 2) {
      return res.status(400).json({
        message: 'Room is full',
        data: {
          userId: '',
          roomStatus: room.status
        }
      });
    }

    // Create new user
    const userId = uuidv4();
    const user = new User({
      userId,
      name,
      roomId
    });
    await user.save();

    // Add user to room
    room.users.push(user._id);
    
    // If this is the second user, mark room as ready
    if (room.users.length === 2) {
      room.status = 'ready';
    }
    
    await room.save();

    return res.status(200).json({
      message: 'Successfully joined room',
      data: {
        userId,
        roomStatus: room.status
      }
    });

  } catch (error) {
    console.error('Error joining room:', error);
    return res.status(500).json({
      message: 'Error joining room',
      data: {
        userId: '',
        roomStatus: 'waiting'
      }
    });
  }
}; 