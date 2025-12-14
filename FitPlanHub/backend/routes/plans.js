const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Plan = require('../models/Plan');
const User = require('../models/User');

// @route   POST api/plans
// @desc    Create a fitness plan
// @access  Private (Trainer)
router.post('/', auth, async (req, res) => {
  // Check if the user is a trainer
  if (req.user.role !== 'trainer') {
    return res.status(403).json({ msg: 'Access denied. Only trainers can create plans.' });
  }

  const { title, description, price, duration } = req.body;

  try {
    const newPlan = new Plan({
      title,
      description,
      price,
      duration,
      trainer: req.user.id,
    });

    const plan = await newPlan.save();
    res.json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   GET api/plans/my-plans
// @desc    Get plans for the logged-in trainer
// @access  Private (Trainer)
router.get('/my-plans', auth, async (req, res) => {
  if (req.user.role !== 'trainer') {
    return res.status(403).json({ msg: 'Access denied.' });
  }

  try {
    const plans = await Plan.find({ trainer: req.user.id });
    res.json(plans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/plans/:id
// @desc    Get a single plan by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const plan = await Plan.findById(req.params.id).populate('trainer', ['name']);
    if (!plan) {
      return res.status(404).json({ msg: 'Plan not found' });
    }

    const subscription = await Subscription.findOne({ user: req.user.id, plan: req.params.id, isActive: true });

    res.json({ plan, isSubscribed: !!subscription });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/plans
// @desc    Get all fitness plans (preview)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const plans = await Plan.find().populate('trainer', ['name']);
    res.json(plans);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   PUT api/plans/:id
// @desc    Update a fitness plan
// @access  Private (Trainer)
router.put('/:id', auth, async (req, res) => {
  if (req.user.role !== 'trainer') {
    return res.status(403).json({ msg: 'Access denied.' });
  }

  const { title, description, price, duration } = req.body;

  const planFields = {};
  if (title) planFields.title = title;
  if (description) planFields.description = description;
  if (price) planFields.price = price;
  if (duration) planFields.duration = duration;

  try {
    let plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ msg: 'Plan not found' });
    }

    // Make sure the trainer owns the plan
    if (plan.trainer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    plan = await Plan.findByIdAndUpdate(
      req.params.id,
      { $set: planFields },
      { new: true }
    );

    res.json(plan);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   DELETE api/plans/:id
// @desc    Delete a fitness plan
// @access  Private (Trainer)
router.delete('/:id', auth, async (req, res) => {
  if (req.user.role !== 'trainer') {
    return res.status(403).json({ msg: 'Access denied.' });
  }

  try {
    let plan = await Plan.findById(req.params.id);

    if (!plan) {
      return res.status(404).json({ msg: 'Plan not found' });
    }

    if (plan.trainer.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Plan.findByIdAndRemove(req.params.id);

    res.json({ msg: 'Plan removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


module.exports = router;
