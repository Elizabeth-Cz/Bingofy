import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardItem from '../components/BoardItem/BoardItem';
import { getPublicBoards } from '../features/boards/boardSlice';

const Browse = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { boards } = useSelector((state) => state.boards);
  useEffect(() => {
    dispatch(getPublicBoards());
  }, []);
  return (
    <div className="content">
      {boards.length > 0 &&
        boards.map((board) => (
          <BoardItem key={board._id} board={board} user={user} />
        ))}
    </div>
  );
};

export default Browse;
