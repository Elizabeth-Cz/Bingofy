import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import boardService from './boardService';

const initialState = {
  boards: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
};

// Create new board
export const createBoard = createAsyncThunk(
  'boards/create',
  async (boardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await boardService.createBoard(boardData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Get user boards
export const getBoards = createAsyncThunk(
  'boards/getAll',
  async (_, thunkAPI) => {
    try {
      // eliminate infinate loop of "Cannot read properties of null (reading 'token')"
      if (thunkAPI.getState().auth.user) {
        const token = thunkAPI.getState().auth.user.token;
        return await boardService.getBoards(token);
      }
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Delete board
export const deleteBoard = createAsyncThunk(
  'boards/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await boardService.deleteBoard(id, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Update board
export const updateBoard = createAsyncThunk(
  'boards/update',
  async (id, boardData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await boardService.updateBoard(id, boardData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.boards.push(action.payload);
      })
      .addCase(getBoards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBoards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.boards = action.payload;
      })
      .addCase(getBoards.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deleteBoard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.boards = state.boards.filter(
          (board) => board._id !== action.payload.id
        );
      })
      .addCase(deleteBoard.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateBoard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const updatedBoardIndex = state.boards.findIndex(
          (board) => board._id === action.payload._id
        );
        state.boards[updatedBoardIndex] = action.payload;
      });
  },
});

export const { reset } = boardSlice.actions;
export default boardSlice.reducer;
