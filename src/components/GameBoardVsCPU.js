import React, { useState, useEffect } from "react";
import GameRow from "./GameRow";
import { Header } from "./Header";
import styled from "styled-components";

import layer from "../assets/images/layer.svg";
import layerSmall from "../assets/images/layer-small.svg";
import bg from "../assets/images/bg.svg";
import bgSmall from "../assets/images/bg-small.svg";
import player1 from "../assets/images/player-one.svg";
import cpu from "../assets/images/cpu.svg";
import turnPlayer1 from "../assets/images/turn-p1.svg";
import turnPlayer2 from "../assets/images/turn-p2.svg";
import turnPlayer1Bg from "../assets/images/turn-background-red.svg";
import turnPlayer2Bg from "../assets/images/turn-background-yellow.svg";
import winnerCard from "../assets/images/winnerCard.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const GameBoardVsCPU = () => {
  const theme = useTheme();
  const lowerThanLarge = useMediaQuery(theme.breakpoints.down("lg"));
  const lowerThanSmall = useMediaQuery(theme.breakpoints.down(670));
  const c4Rows = 6;
  const c4Columns = 7;
  const initialBoard = {
    rows: Array.from({ length: c4Rows }, () => ({
      columns: Array.from({ length: c4Columns }, () => ({
        player: null,
      })),
    })),
  };
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [colIndex, setColIndex] = useState(3);
  const [progress, setProgress] = useState(15);
  const [player1Score, setPlayer1Score] = useState(0);
  const [cpuScore, setCpuScore] = useState(0);
  const [showWinner, setShowWinner] = useState(false);
  const [showDraw, setShowDraw] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) =>
        prevProgress === 0 ? 15 : prevProgress - 1
      );
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (!showDraw && !showWinner) {
      if (progress === 0) {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    }
  }, [progress, showDraw, showWinner, currentPlayer]);

  useEffect(() => {
    setProgress(15);
    if (currentPlayer === 2 && !showWinner && !showDraw) {
      setTimeout(() => {
        makeCPUMove();
      }, 1000);
    }
  }, [currentPlayer]);

  const restartGame = () => {
    setCurrentPlayer(1);
    setBoard(initialBoard);
    setShowWinner(false);
    setShowDraw(false);
  };

  const updateBoard = (columnIndex) => {
    if (currentPlayer !== 1 || showWinner || showDraw) return;

    let boardCopy = { ...board };
    let rowIndex = getLowestEmptyRow(boardCopy, columnIndex);

    if (rowIndex !== -1) {
      boardCopy.rows[rowIndex].columns[columnIndex].player = 1;
      setBoard(boardCopy);

      if (winCheck(rowIndex, columnIndex)) {
        setShowWinner(true);
        setPlayer1Score(player1Score + 1);
      } else if (drawCheck()) {
        setShowDraw(true);
      } else {
        setCurrentPlayer(2);
      }
    }
  };

  const makeCPUMove = () => {
    const bestMove = findBestMove(board);
    let boardCopy = { ...board };
    let rowIndex = getLowestEmptyRow(boardCopy, bestMove);

    if (rowIndex !== -1) {
      boardCopy.rows[rowIndex].columns[bestMove].player = 2;
      setBoard(boardCopy);
      setColIndex(bestMove);

      if (winCheck(rowIndex, bestMove)) {
        setShowWinner(true);
        setCpuScore(cpuScore + 1);
      } else if (drawCheck()) {
        setShowDraw(true);
      } else {
        setCurrentPlayer(1);
      }
    }
  };

  const getLowestEmptyRow = (board, columnIndex) => {
    for (let i = c4Rows - 1; i >= 0; i--) {
      if (!board.rows[i].columns[columnIndex].player) {
        return i;
      }
    }
    return -1;
  };

  const findBestMove = (board) => {
    // Check for winning move
    for (let col = 0; col < c4Columns; col++) {
      let row = getLowestEmptyRow(board, col);
      if (row !== -1) {
        let boardCopy = JSON.parse(JSON.stringify(board));
        boardCopy.rows[row].columns[col].player = 2;
        if (winCheck(row, col, boardCopy)) {
          return col;
        }
      }
    }

    // Block player's winning move
    for (let col = 0; col < c4Columns; col++) {
      let row = getLowestEmptyRow(board, col);
      if (row !== -1) {
        let boardCopy = JSON.parse(JSON.stringify(board));
        boardCopy.rows[row].columns[col].player = 1;
        if (winCheck(row, col, boardCopy)) {
          return col;
        }
      }
    }

    // Choose center column if available
    let centerCol = 3;
    if (getLowestEmptyRow(board, centerCol) !== -1) {
      return centerCol;
    }

    // Choose random column
    let availableColumns = [];
    for (let col = 0; col < c4Columns; col++) {
      if (getLowestEmptyRow(board, col) !== -1) {
        availableColumns.push(col);
      }
    }
    return availableColumns[
      Math.floor(Math.random() * availableColumns.length)
    ];
  };

  const drawCheck = () => {
    return board.rows.every((row) =>
      row.columns.every((column) => column.player !== null)
    );
  };

  const winCheck = (rowIndex, columnIndex, checkBoard = board) => {
    return (
      checkHorizontal(rowIndex, columnIndex, checkBoard) ||
      checkVertical(rowIndex, columnIndex, checkBoard) ||
      checkDiagonalRight(rowIndex, columnIndex, checkBoard) ||
      checkDiagonalLeft(rowIndex, columnIndex, checkBoard)
    );
  };

  const checkHorizontal = (rowIndex, columnIndex, checkBoard) => {
    let row = checkBoard.rows[rowIndex];
    let count = 0;
    let player = row.columns[columnIndex].player;

    for (let i = 0; i < c4Columns; i++) {
      if (row.columns[i].player === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }
    return false;
  };

  const checkVertical = (rowIndex, columnIndex, checkBoard) => {
    let count = 0;
    let player = checkBoard.rows[rowIndex].columns[columnIndex].player;

    for (let i = 0; i < c4Rows; i++) {
      if (checkBoard.rows[i].columns[columnIndex].player === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
    }
    return false;
  };

  const checkDiagonalRight = (rowIndex, columnIndex, checkBoard) => {
    let count = 0;
    let player = checkBoard.rows[rowIndex].columns[columnIndex].player;
    let r = rowIndex - Math.min(rowIndex, columnIndex);
    let c = columnIndex - Math.min(rowIndex, columnIndex);

    while (r < c4Rows && c < c4Columns) {
      if (checkBoard.rows[r].columns[c].player === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
      r++;
      c++;
    }
    return false;
  };

  const checkDiagonalLeft = (rowIndex, columnIndex, checkBoard) => {
    let count = 0;
    let player = checkBoard.rows[rowIndex].columns[columnIndex].player;
    let r = rowIndex - Math.min(rowIndex, c4Columns - 1 - columnIndex);
    let c = columnIndex + Math.min(rowIndex, c4Columns - 1 - columnIndex);

    while (r < c4Rows && c >= 0) {
      if (checkBoard.rows[r].columns[c].player === player) {
        count++;
        if (count === 4) return true;
      } else {
        count = 0;
      }
      r++;
      c--;
    }
    return false;
  };

  <div className="box p2">
    <img src={cpu} alt="CPU logo" />
    {lowerThanSmall ? (
      <>
        <span className="player">CPU</span>
        <span className="score"> {cpuScore} </span>
      </>
    ) : (
      <>
        <span className="score"> {cpuScore} </span>
        <span className="player">CPU</span>
      </>
    )}
  </div>;

  return (
    <Wrap>
      <Header
        setProgress={setProgress}
        progress={progress}
        restartGame={restartGame}
      />
      {lowerThanLarge ? (
        <div className="wrapsBox">
          <div className="box p1">
            <img src={player1} alt="player 1 logo" />
            <span className="player">Player 1</span>
            <span className="score"> {player1Score} </span>
          </div>
          <div className="box p2">
            <img src={cpu} alt="CPU logo" />
            {lowerThanSmall ? (
              <>
                <span className="player">CPU</span>
                <span className="score"> {cpuScore} </span>
              </>
            ) : (
              <>
                <span className="score"> {cpuScore} </span>
                <span className="player">CPU</span>
              </>
            )}
          </div>
        </div>
      ) : (
        ""
      )}

      <div className="tableWrap">
        {!lowerThanLarge ? (
          <div className="box p1">
            <img src={player1} alt="player 1 logo" />
            <span className="player">Player 1</span>
            <span className="score"> {player1Score} </span>
          </div>
        ) : (
          ""
        )}
        {currentPlayer === 1 ? (
          <img
            className={`turn col${colIndex}`}
            src={turnPlayer1}
            alt="turn player"
          />
        ) : (
          <img
            className={`turn col${colIndex}`}
            src={turnPlayer2}
            alt="turn CPU"
          />
        )}
        <table>
          <tbody>
            {board.rows.map((row, i) => (
              <GameRow
                key={i}
                row={row}
                updateBoard={updateBoard}
                setColIndex={setColIndex}
                showDraw={showDraw}
                showWinner={showWinner}
              />
            ))}
          </tbody>
        </table>

        {!lowerThanLarge ? (
          <div className="box p2">
            <img src={cpu} alt="CPU logo" />
            <span className="player">CPU</span>
            <span className="score"> {cpuScore} </span>
          </div>
        ) : (
          ""
        )}

        {showWinner ? (
          <>
            <div className="winnerCard">
              <img src={winnerCard} alt="Winner Card" />
            </div>
            <div className="winnerCardContent">
              <span className="player">
                {currentPlayer === 2 ? "CPU" : "PLAYER 1"}
              </span>
              <span className="status">WINS</span>
              <button className="roseBtn" onClick={() => restartGame()}>
                PLAY AGAIN
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        {showDraw ? (
          <>
            <div className="winnerCard">
              <img src={winnerCard} alt="Winner Card" />
            </div>
            <div className="winnerCardContent">
              <span className="status">DRAW</span>
              <button className="roseBtn" onClick={() => restartGame()}>
                PLAY AGAIN
              </button>
            </div>
          </>
        ) : (
          ""
        )}
        <div className="turnCard">
          {currentPlayer === 1 ? (
            <img src={turnPlayer1Bg} alt="turn player 1" />
          ) : (
            <img src={turnPlayer2Bg} alt="turn CPU" />
          )}
        </div>
        <div className="turnCardContent">
          <span className="turnPlayer">
            {currentPlayer === 1 ? "PLAYER 1" : "CPU"}'S TURN
          </span>
          <span className="turnPlayerTimer">{progress}s</span>
        </div>
      </div>
      {lowerThanSmall ? (
        <img className="bg" src={bgSmall} alt="background" />
      ) : (
        <img className="bg" src={bg} alt="background" />
      )}
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: 94vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .wrapsBox {
    width: 638px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media screen and (max-width: 670px) {
      width: 359px;
      margin-bottom: 30px;
      margin-top: 20px;
    }
    .box {
      background: #ffffff;
      width: 272px;
      height: 80px;
      border: 3px solid #000000;
      box-shadow: 0px 10px 0px #000000;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      color: black;
      position: relative;
      margin-bottom: 10px;
      @media screen and (max-width: 670px) {
        width: 142px;
        flex-direction: column;
      }
      .player {
        font-weight: 700;
        font-size: 20px;
        line-height: 26px;
        text-align: center;
        @media screen and (max-width: 670px) {
          font-size: 16px;
          line-height: 20px;
        }
      }
      .score {
        font-weight: 700;
        font-size: 56px;
        line-height: 71px;
        text-align: center;
        @media screen and (max-width: 670px) {
          font-size: 32px;
          line-height: 41px;
        }
      }
    }
    .p1 {
      img {
        position: absolute;
        left: -30px;
      }
    }
    .p2 {
      img {
        position: absolute;
        right: -30px;
      }
    }
  }
  .tableWrap {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    @media screen and (max-width: 1200px) {
      margin-top: 10px;
    }
    .turn {
      position: absolute;
      top: -35px;
      @media screen and (max-width: 1200px) {
        display: none;
      }
    }
    .col0 {
      left: 212px;
    }
    .col1 {
      left: 302px;
    }
    .col2 {
      left: 390px;
    }
    .col4 {
      right: 390px;
    }
    .col5 {
      right: 302px;
    }
    .col6 {
      right: 214px;
    }
    table {
      background-image: url(${layer});
      background-repeat: no-repeat;
      background-size: cover;
      height: 588px;
      width: 630px;
      padding-bottom: 46px;
      padding-top: 16px;
      padding-left: 16px;
      z-index: 1;
      @media screen and (max-width: 670px) {
        background-image: url(${layerSmall});
        height: 320px;
        width: 335px;
        padding-bottom: 32px;
        padding-top: 6px;
        padding-left: 6px;
        background-repeat: no-repeat;
        background-size: initial;
      }
    }
    .box {
      background: #ffffff;
      width: 141px;
      height: 160px;
      border: 3px solid #000000;
      box-shadow: 0px 7px 0px #000000;
      border-radius: 13px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: black;
      position: relative;
      padding-top: 10px;
      img {
        position: absolute;
        top: -30px;
      }
      .player {
        font-weight: 700;
        font-size: 20px;
        line-height: 26px;
        text-align: center;
      }
      .score {
        font-weight: 700;
        font-size: 56px;
        line-height: 71px;
        text-align: center;
      }
    }
    .p1 {
      margin-right: 40px;
    }
    .p2 {
      margin-left: 40px;
    }

    .turnCard {
      position: absolute;
      bottom: -122px;
      z-index: 4;
      @media screen and (max-width: 1200px) {
        bottom: -110px;
      }
      @media screen and (max-width: 670px) {
        bottom: -152px;
      }
    }
    .turnCardContent {
      position: absolute;
      bottom: -90px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index: 5;
      @media screen and (max-width: 1200px) {
        bottom: -85px;
      }
      @media screen and (max-width: 670px) {
        bottom: -120px;
      }

      .turnPlayer {
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
      }
      .turnPlayerTimer {
        font-weight: 700;
        font-size: 56px;
        line-height: 71px;
        text-align: center;
      }
    }
    .winnerCard {
      position: absolute;
      bottom: -122px;
      z-index: 10;
      @media screen and (max-width: 670px) {
        bottom: -154px;
      }
    }
    .winnerCardContent {
      color: black;
      position: absolute;
      bottom: -90px;
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      flex-direction: column;
      z-index: 11;
      height: 138px;
      @media screen and (max-width: 670px) {
        bottom: -124px;
      }
      .player {
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
      }
      .status {
        font-weight: 700;
        font-size: 56px;
        line-height: 71px;
        text-align: center;
      }
      .roseBtn {
        font-weight: 700;
        font-size: 16px;
        line-height: 20px;
        text-align: center;
        background: #fd6687;
        border-radius: 20px;
        min-width: 130px;
        height: 39px;
        cursor: pointer;
        color: #ffffff;
        @media screen and (max-width: 670px) {
          background: #5c2dd5;
        }
      }
    }
  }

  .bg {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: -50;
    @media screen and (min-width: 1200px) {
      max-height: 200px;
    }
  }
`;
export default GameBoardVsCPU;
