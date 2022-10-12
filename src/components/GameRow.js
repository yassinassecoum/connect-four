import React from "react";
import GameColumn from "./GameColumn";

const GameRow = ({ row, updateBoard, setColIndex, showDraw, showWinner }) => {
  return (
    <tr>
      {row.columns.map((column, i) => (
        <GameColumn
          key={i}
          columnIndex={i}
          column={column}
          updateBoard={updateBoard}
          setColIndex={setColIndex}
          showDraw={showDraw}
          showWinner={showWinner}
        />
      ))}
    </tr>
  );
};

export default GameRow;
