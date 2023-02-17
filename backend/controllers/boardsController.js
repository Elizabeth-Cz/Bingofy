const asyncHandler = require('express-async-handler');

const Board = require('../models/boardModel');
const User = require('../models/userModel');

// @desc    Get boards
// @route   GET /api/boards
// @access  Private
const getBoards = asyncHandler(async (req, res) => {
  const boards = await Board.find({ user: req.user.id });

  res.status(200).json(boards);
});

// @desc    Get board
// @route   GET /api/boards
// @access  Private
const getBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(400);
    throw new Error('Board not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the board user
  if (board.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  res.status(200).json(board);
});

// @desc    Set board
// @route   POST /api/boards
// @access  Private
const setBoard = asyncHandler(async (req, res) => {
  const { title, cells, tags, category } = req.body;

  if (!title || !cells || !category || cells.length !== 25) {
    res.status(400);

    throw new Error('Please add all board data');
  }

  const board = await Board.create({
    title: title,
    cells: cells,
    tags: tags,
    category: category,
    private: true,
    activeCells: [],
    user: req.user.id,
  });

  res.status(200).json(board);
});

// @desc    Update board
// @route   PUT /api/boards/:id
// @access  Private
// FIXME: make update boards work
const updateBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(400);
    throw new Error('Board not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the board user
  if (board.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  const updatedBoard = await Board.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBoard);
});

// @desc    Delete board
// @route   DELETE /api/boards/:id
// @access  Private
const deleteBoard = asyncHandler(async (req, res) => {
  const board = await Board.findById(req.params.id);

  if (!board) {
    res.status(400);
    throw new Error('Board not found');
  }

  // Check for user
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  // Make sure the logged in user matches the board user
  if (board.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error('User not authorized');
  }

  await board.remove();

  res.status(200).json({ id: req.params.id });
});

module.exports = {
  getBoards,
  getBoard,
  setBoard,
  updateBoard,
  deleteBoard,
};
