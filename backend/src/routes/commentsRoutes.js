const express = require('express');
const router = express.Router();
const Comment = require('../models/comment');  // Ensure this path is correct
const { authMiddleware } = require('../middleware/authMiddleware');

// Get comments for an item
router.get('/:itemId', async (req, res) => {
  try {
    const comments = await Comment.find({ itemId: req.params.itemId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Post a comment
router.post('/', authMiddleware, async (req, res) => {
  const comment = new Comment({
    ...req.body,
    userId: mongoose.Types.ObjectId(req.user.id), // Convert to ObjectId
    userName: req.user.name,
    timestamp: new Date()
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a comment
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not authorized to delete this comment' });
    }

    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Comment deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
