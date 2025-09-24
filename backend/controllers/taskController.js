const Task = require('../models/Task');
const { validationResult } = require('express-validator');

// @desc    Get all tasks for a specific user
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ date: -1 });
    res.json(tasks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// @desc    Add a new task
// @route   POST /api/tasks
// @access  Private
const addTask = async (req, res) => {
  // Check for missing title and status in the request body
  const { title, description, status } = req.body;
  
  if (!title) {
    return res.status(400).json({ msg: 'Title is required' });
  }
  
  // Correct the status validation check to match the TaskSchema enum
  if (!['To Do', 'In Progress', 'Completed'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status provided' });
  }

  try {
    const newTask = new Task({
      title,
      description,
      status,
      user: req.user.id,
    });

    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    console.error(err.message);
    // Check for Mongoose validation errors
    if (err.name === 'ValidationError') {
      return res.status(400).json({ msg: err.message });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private
const updateTask = async (req, res) => {
  const { title, description, status } = req.body;
  
  // Correct the status validation check here as well
  if (status && !['To Do', 'In Progress', 'Completed'].includes(status)) {
    return res.status(400).json({ msg: 'Invalid status provided' });
  }

  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Make sure the user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    const updateFields = {};
    if (title) updateFields.title = title;
    if (description || description === '') updateFields.description = description;
    if (status) updateFields.status = status;

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    res.json(updatedTask);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private
const deleteTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: 'Task not found' });
    }

    // Make sure the user owns the task
    if (task.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }

    await Task.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Task removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Task not found' });
    }
    res.status(500).send('Server Error');
  }
};

module.exports = {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
};