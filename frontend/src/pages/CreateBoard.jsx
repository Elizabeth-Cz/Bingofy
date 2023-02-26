import BoardForm from '../components/BoardForm/BoardForm';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Spinner from '../components/Spinner/Spinner';

const CreateBoard = () => {
  const navigate = useNavigate();

  const { user, isError, message } = useSelector((state) => state.auth);
  const { boards, isLoading } = useSelector((state) => state.boards);
  // console.log(boards);
  useEffect(() => {
    if (!user || isError) {
      navigate('/');
      console.log(message);
    }
  }, [boards, user, navigate, isError, message]);

  if (isLoading) return <Spinner />;

  return <BoardForm data={boards} />;
};

export default CreateBoard;
