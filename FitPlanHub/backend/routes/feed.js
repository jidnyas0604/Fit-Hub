const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Plan = require('../models/Plan');
const User = require('../models/User');
const Subscription = require('../models/Subscription');

// @route   GET api/feed
// @desc    Get personalized feed for the user
// @access  Private (User)
router.get('/', auth, async (req, res) => {
  if (req.user.role !== 'user') {
    return res.status(403).json({ msg: 'Access denied. Only for users.' });
  }

  try {
    const user = await User.findById(req.user.id);
    const followedTrainers = user.following;

    // Get plans from followed trainers
    const feedPlans = await Plan.find({ trainer: { $in: followedTrainers } })
      .populate('trainer', ['name'])
      .sort({ createdAt: -1 });

    // Get user's subscribed plan IDs
    const userSubscriptions = await Subscription.find({ user: req.user.id, isActive: true });
    const subscribedPlanIds = userSubscriptions.map(sub => sub.plan.toString());

    // Add subscription status to each plan
    const feedWithSubscriptionStatus = feedPlans.map(plan => ({
      ...plan.toObject(),
      isSubscribed: subscribedPlanIds.includes(plan._id.toString()),
    }));

    res.json(feedWithSubscriptionStatus);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
