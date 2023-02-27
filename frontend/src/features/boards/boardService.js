import axios from 'axios';

const API_URL = '/api/boards/';

// Create new board
const createBoard = async (boardData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, boardData, config);

  return response.data;
};

// Get user boards
const getBoards = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Get user boards
const getPublicBoards = async () => {
  const response = await axios.get(API_URL + '/public');

  return response.data;
};

// Get user boards
const getBoard = async (boardId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + boardId, config);

  return response.data;
};

// Delete user board
const deleteBoard = async (boardId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + boardId, config);

  return response.data;
};

// Update board
const updateBoard = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + data._id, data, config);

  return response.data;
};

const boardService = {
  createBoard,
  getPublicBoards,
  getBoards,
  getBoard,
  deleteBoard,
  updateBoard,
};

export default boardService;
