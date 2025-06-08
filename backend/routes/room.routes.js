const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Room = require('../models/Room');
const User = require('../models/User');

// POST /api/create-room
router.post('/create-room', async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    // Generate unique IDs
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
    res.status(500).json({ message: 'Error creating room' });
  }
});

module.exports = router; 