const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Subscription = require('../models/Subscription');
const Plan = require('../models/Plan');

// @route   POST api/subscriptions/:planId
// @desc    Subscribe to a fitness plan
// @access  Private (User)
router.post('/:planId', auth, async (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ msg: 'Only users can subscribe to plans.' });
  }

  try {
    const plan = await Plan.findById(req.params.planId);
    if (!plan) {
      return res.status(404).json({ msg: 'Plan not found' });
    }

    // Check if already subscribed
    const existingSubscription = await Subscription.findOne({ user: req.user.id, plan: req.params.planId, isActive: true });
    if (existingSubscription) {
      return res.status(400).json({ msg: 'Already subscribed to this plan' });
    }

    const startDate = new Date();
    const endDate = new Date();
    endDate.setDate(startDate.getDate() + plan.duration);

    const newSubscription = new Subscription({
      user: req.user.id,
      plan: req.params.planId,
      endDate,
    });

    await newSubscription.save();
    res.json(newSubscription);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/subscriptions/me
// @desc    Get current user's active subscriptions
// @access  Private (User)
router.get('/me', auth, async (req, res) => {
    if (req.user.role !== 'user') {
        return res.status(403).json({ msg: 'Access denied.' });
    }

    try {
        const subscriptions = await Subscription.find({ user: req.user.id, isActive: true })
            .populate('plan', ['title', 'description', 'price', 'duration'])
            .populate('user', ['name']);

        res.json(subscriptions);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
