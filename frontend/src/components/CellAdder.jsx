import { useState } from 'react';

const CellAdder = ({ boardData, setBoardData }) => {
  const [cell, setCell] = useState('');

  const handleChange = (event) => {
    setCell(event.target.value);
  };

  const addCell = (event) => {
    event.preventDefault();
    if (cell !== '') {
      setBoardData({
        ...boardData,
        cells: [...boardData.cells, cell],
      });
    }
    setCell('');
  };

  return (
    <>
      <div className="form-group">
        <label htmlFor="cell">Board cells</label>
        <div className="add-field">
          <input
            type="text"
            name="cell"
            id="cell"
            value={cell}
            onChange={handleChange}
          ></input>
          <button className="btn" onClick={addCell}>
            Add Cell
          </button>
        </div>
      </div>
    </>
  );
};

export default CellAdder;
