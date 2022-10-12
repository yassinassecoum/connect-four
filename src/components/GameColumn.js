import React from "react";

const GameColumn = ({
  columnIndex,
  column,
  updateBoard,
  setColIndex,
  showDraw,
  showWinner,
}) => {
  let tileStatus = "open";

  if (column.player === 1) {
    tileStatus = "player1";
  } else if (column.player === 2) {
    tileStatus = "player2";
  }
  return (
    <td>
      {showDraw || showWinner ? (
        <div className="tile">
          <div className={[tileStatus, "circle"].join(" ")}></div>
        </div>
      ) : (
        <div
          className="tile"
          onMouseEnter={() => setColIndex(columnIndex)}
          onClick={() => updateBoard(columnIndex)}
        >
          <div className={[tileStatus, "circle"].join(" ")}></div>
        </div>
      )}
    </td>
  );
};
export default GameColumn;
