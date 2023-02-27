const express = require('express');
const router = express.Router();
const {
  getBoards,
  getPublicBoards,
  setBoard,
  updateBoard,
  deleteBoard,
  getBoard,
} = require('../controllers/boardsController');

const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getBoards).post(protect, setBoard);
router.route('/public').get(getPublicBoards);
router
  .route('/:id')
  .delete(protect, deleteBoard)
  .get(protect, getBoard)
  .put(protect, updateBoard);

module.exports = router;
