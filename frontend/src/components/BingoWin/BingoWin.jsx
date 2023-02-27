import Confetti from 'react-confetti';
import { useEffect, useRef, useState } from 'react';
import './BingoWin.css';

const BingoWin = () => {
  const [showBingo, setShowBingo] = useState(true);
  const confettiRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      setShowBingo(false);
      confettiRef.current?.stop();
    }, 5000);
  }, []);

  return (
    <div className="bingo">
      <div className="confetti-container">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={700}
          gravity={0.2}
          confettiSource={{
            x: window.innerWidth / 2,
            y: 0,
          }}
          dragFriction={0.5}
        />
      </div>
      {showBingo && (
        <div className="message-container">
          <h2 className="message-title">BINGO!</h2>
        </div>
      )}
    </div>
  );
};

export default BingoWin;
