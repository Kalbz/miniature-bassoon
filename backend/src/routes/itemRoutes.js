const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const { authMiddleware } = require('../middleware/authMiddleware');

// Create an item
router.post('/', async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Upvote an item
router.patch('/:id/upvote', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const item = await Item.findById(req.params.id);
    const existingVote = item.votes.find(vote => vote.userId === userId);

    if (existingVote) {
      if (existingVote.voteType === 'upvote') {
        // Remove the upvote
        item.upvotes -= 1;
        item.votes = item.votes.filter(vote => vote.userId !== userId);
      } else {
        // Change downvote to upvote with +2 effect
        item.downvotes -= 1;
        item.upvotes += 1;
        existingVote.voteType = 'upvote';
      }
    } else {
      // Add a new upvote
      item.upvotes += 1;
      item.votes.push({ userId, voteType: 'upvote' });
    }

    await item.save();
    res.json({
      ...item.toObject(),
      totalVotes: item.upvotes - item.downvotes
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Downvote an item
router.patch('/:id/downvote', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.id;
    const item = await Item.findById(req.params.id);
    const existingVote = item.votes.find(vote => vote.userId === userId);

    if (existingVote) {
      if (existingVote.voteType === 'downvote') {
        // Remove the downvote
        item.downvotes -= 1;
        item.votes = item.votes.filter(vote => vote.userId !== userId);
      } else {
        // Change upvote to downvote with -2 effect
        item.upvotes -= 1;
        item.downvotes += 1;
        existingVote.voteType = 'downvote';
      }
    } else {
      // Add a new downvote
      item.downvotes += 1;
      item.votes.push({ userId, voteType: 'downvote' });
    }

    await item.save();
    res.json({
      ...item.toObject(),
      totalVotes: item.upvotes - item.downvotes
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update an item's color
router.patch('/:id/color', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    item.color = req.body.color;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
