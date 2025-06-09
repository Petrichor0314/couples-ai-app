import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import mongoose from 'mongoose';
import { Room } from '../models/Room';
import { User } from '../models/User';
import { CreateRoomRequest, CreateRoomResponse } from '../types';
import { joinRoom } from '../controllers/room.controller';

const router = express.Router();

// POST /api/create-room
router.post('/create-room', async (req: express.Request<{}, {}, CreateRoomRequest>, res: express.Response<CreateRoomResponse>) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Name is required',
        data: {
          roomId: '',
          userId: '',
          name: '',
          status: ''
        }
      });
    }

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      // MongoDB is not connected, return mock data
      const roomId = uuidv4();
      const userId = uuidv4();
      
      return res.status(201).json({
        message: 'Room created successfully (MongoDB offline - mock data)',
        data: {
          roomId,
          userId,
          name,
          status: 'waiting'
        }
      });
    }

    // If MongoDB is connected, proceed with actual data storage
    const roomId = uuidv4();
    const userId = uuidv4();

    // Create new user
    const user = new User({
      userId,
      name,
      roomId
    });
    await user.save();

    // Create new room
    const room = new Room({
      roomId,
      users: [user._id],
      status: 'waiting'
    });
    await room.save();

    res.status(201).json({
      message: 'Room created successfully',
      data: {
        roomId,
        userId,
        name,
        status: room.status
      }
    });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({
      message: 'Error creating room',
      data: {
        roomId: '',
        userId: '',
        name: '',
        status: ''
      }
    });
  }
});

// POST /api/join-room
router.post('/join-room', joinRoom);

export default router; 