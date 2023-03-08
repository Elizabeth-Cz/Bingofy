import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BoardItem from '../components/BoardItem/BoardItem';
import Spinner from '../components/Spinner/Spinner';
import { getPublicBoards } from '../features/boards/boardSlice';

const Browse = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { boards, isLoading } = useSelector((state) => state.boards);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    dispatch(getPublicBoards());
  }, []);

  const filteredBoards = Array.isArray(boards)
    ? boards.filter((board) => {
        return board.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  if (isLoading) return <Spinner />;

  // TODO: improve search page by category
  return (
    <div className="content">
      <div className="form-group">
        <label htmlFor="search">Search boards by title</label>
        <input type="text" name="search" id="search" onChange={handleSearch} />
      </div>
      {filteredBoards.length > 0 &&
        filteredBoards.map((board) => (
          <BoardItem key={board._id} board={board} user={user} />
        ))}
    </div>
  );
};

export default Browse;
