const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const { authMiddleware } = require('../middleware/authMiddleware');

// Create an item
router.post('/', authMiddleware, async (req, res) => {
  const newItem = new Item({
    ...req.body,
    creator: req.user.id // Set the creator to the authenticated user's ID
  });
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an item
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.creator !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this item' });
    }

    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Item deleted' });
  }
  catch (err) {
    res.status(500).json({ message: err.message });
  }
})

// Get all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update an item
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if the authenticated user is the creator of the item
    if (item.creator !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to edit this item' });
    }

    // Update item properties
    item.name = req.body.name || item.name;
    item.description = req.body.description || item.description;
    item.categories = req.body.categories || item.categories;
    item.emoji = req.body.emoji || item.emoji;
    item.color = req.body.color || item.color;

    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
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
router.patch('/:id/color', authMiddleware, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Check if the authenticated user is the creator of the item
    if (item.creator !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to edit this item' });
    }

    item.color = req.body.color;
    const updatedItem = await item.save();
    res.json(updatedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }

});

module.exports = router;
