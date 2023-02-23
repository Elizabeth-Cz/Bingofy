import './BingoWin.css';

const BingoWin = ({ isBingo }) => {
  return <h2 className={`bingo ${isBingo ? 'win' : ''}`}>BINGO!</h2>;
};

export default BingoWin;
