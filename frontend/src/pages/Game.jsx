import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import GameBoard from '../components/GameBoard/GameBoard';
import { useSelector, useDispatch } from 'react-redux';
import { getBoard, reset } from '../features/boards/boardSlice';
import Spinner from '../components/Spinner/Spinner';

const Game = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);
  const { boards, isLoading, isError, message } = useSelector(
    (state) => state.boards
  );

  const [board, setBoard] = useState({});

  const { id } = useParams();

  useEffect(() => {
    if (isError) {
      console.log(message);
      return;
    }

    if (!user) {
      navigate('/login');
      return;
    }
    dispatch(getBoard(id));

    return () => {
      dispatch(reset());
    };
  }, [dispatch, isError, message, navigate, user, id]);

  useEffect(() => {
    setBoard(boards);
  }, [boards]);

  if (isLoading) return <Spinner />;

  if (isError) return <div>{message}</div>;

  if (board && Object.keys(board).length > 0)
    return <GameBoard board={board} />;
};

export default Game;
