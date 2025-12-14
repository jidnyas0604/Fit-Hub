const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const Plan = require('../models/Plan');

// @route   GET api/users/trainer/:id
// @desc    Get trainer profile by ID
// @access  Private
router.get('/trainer/:id', auth, async (req, res) => {
  try {
    const trainer = await User.findById(req.params.id).select('-password');
    if (!trainer || trainer.role !== 'trainer') {
      return res.status(404).json({ msg: 'Trainer not found' });
    }

    const plans = await Plan.find({ trainer: req.params.id });
    const isFollowing = trainer.followers.includes(req.user.id);

    res.json({ trainer, plans, isFollowing });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route   PUT api/users/follow/:id
// @desc    Follow a trainer
// @access  Private (User)
router.put('/follow/:id', auth, async (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ msg: 'Only users can follow trainers.' });
  }

  try {
    const trainer = await User.findById(req.params.id);
    const user = await User.findById(req.user.id);

    if (!trainer || trainer.role !== 'trainer') {
      return res.status(404).json({ msg: 'Trainer not found' });
    }

    // Check if already following
    if (trainer.followers.includes(req.user.id)) {
      return res.status(400).json({ msg: 'Already following this trainer' });
    }

    trainer.followers.push(req.user.id);
    user.following.push(req.params.id);

    await trainer.save();
    await user.save();

    res.json({ msg: 'Trainer followed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/users/unfollow/:id
// @desc    Unfollow a trainer
// @access  Private (User)
router.put('/unfollow/:id', auth, async (req, res) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ msg: 'Only users can unfollow trainers.' });
    }

    try {
        const trainer = await User.findById(req.params.id);
        const user = await User.findById(req.user.id);

        if (!trainer || trainer.role !== 'trainer') {
            return res.status(404).json({ msg: 'Trainer not found' });
        }

        // Check if the user is not following the trainer
        if (!trainer.followers.includes(req.user.id)) {
            return res.status(400).json({ msg: 'You are not following this trainer' });
        }

        // Remove follower and following
        trainer.followers = trainer.followers.filter(followerId => followerId.toString() !== req.user.id);
        user.following = user.following.filter(followingId => followingId.toString() !== req.params.id);

        await trainer.save();
        await user.save();

        res.json({ msg: 'Trainer unfollowed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
