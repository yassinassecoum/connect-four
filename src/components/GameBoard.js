import React, { useState, useRef, useEffect } from "react";
import GameRow from "./GameRow";
import { Header } from "./Header";
import styled from "styled-components";

import layer from "../assets/images/layer.svg";
import bg from "../assets/images/bg.svg";
import player1 from "../assets/images/player-one.svg";
import player2 from "../assets/images/player-two.svg";
import turnPlayer1 from "../assets/images/turn-p1.svg";
import turnPlayer2 from "../assets/images/turn-p2.svg";
import turnPlayer1Bg from "../assets/images/turn-background-red.svg";
import turnPlayer2Bg from "../assets/images/turn-background-yellow.svg";
import winnerCard from "../assets/images/winnerCard.svg";

const GameBoardPvP = () => {
  const c4Rows = 6;
  const c4Columns = 7;
  const initialBoard = {
    rows: Array.from({ length: c4Rows }, (_, i) => ({
      columns: Array.from({ length: c4Columns }, (_, i) => ({
        player: null,
      })),
    })),
  };
  const [board, setBoard] = useState(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [colIndex, setColIndex] = useState(3);
  const [progress, setProgress] = useState(15);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
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

  //check when timer is out change player
  useEffect(() => {
    if (!showDraw && !showWinner) {
      if (progress === 0) {
        setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
      }
    }
  }, [progress]);

  //check when player changed reset timer
  useEffect(() => {
    setProgress(15);
  }, [currentPlayer]);

  const restartGame = () => {
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    setBoard(initialBoard);
    setShowWinner(false);
    setShowDraw(false);
  };
  const updateBoard = (columnIndex) => {
    let boardCopy = board;
    let areColumnsFilled = true;
    let rowIndex = 0;
    for (let i = 5; i >= 0; i--) {
      let columnPlayer = boardCopy.rows[i].columns[columnIndex].player;
      if (!columnPlayer) {
        boardCopy.rows[i].columns[columnIndex].player = currentPlayer;
        areColumnsFilled = false;
        rowIndex = i;
        break;
      }
    }
    setBoard(boardCopy);
    if (!areColumnsFilled) {
      setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    }
    if (winCheck(rowIndex, columnIndex)) {
      // setBoard(initialBoard);
      setShowWinner(true);
      // alert("Player " + currentPlayer + " wins.");
      if (currentPlayer === 1) {
        setPlayer1Score(player1Score + 1);
      } else {
        setPlayer2Score(player2Score + 1);
      }
      // setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
    } else if (drawCheck()) {
      setShowDraw(true);
      // setBoard(initialBoard);
      // alert("DRAW");
      // setCurrentPlayer(1);
    }
  };
  const drawCheck = () => {
    let isBoardFilled =
      board.rows.filter(
        (row) =>
          row.columns.filter((column) => column.player === null).length > 0
      ).length > 0
        ? false
        : true;
    return isBoardFilled;
  };
  const winCheck = (rowIndex, columnIndex) => {
    return (
      checkHorizontal(rowIndex, columnIndex) ||
      checkVertical(rowIndex, columnIndex) ||
      checkDiagonalRight(rowIndex, columnIndex) ||
      checkDiagonalLeft(rowIndex, columnIndex)
    );
  };
  const checkDiagonalRight = (rowIndex, columnIndex) => {
    let consecutiveColumns = 0;
    let indexDifference = rowIndex - columnIndex;
    let columnToStartFrom = 0;
    let rowToStartFrom = 0;
    if (indexDifference > 0) {
      rowToStartFrom = indexDifference;
    } else if (indexDifference < 0) {
      columnToStartFrom = Math.abs(indexDifference);
    }
    for (let i = 0; i < c4Rows; i++) {
      let column =
        board.rows[rowToStartFrom + i]?.columns[columnToStartFrom + i];
      if (column) {
        if (
          column.player === board.rows[rowIndex].columns[columnIndex].player
        ) {
          consecutiveColumns++;
          if (consecutiveColumns >= 4) {
            return true;
          }
        } else {
          consecutiveColumns = 0;
        }
      }
    }
    return false;
  };
  const checkDiagonalLeft = (rowIndex, columnIndex) => {
    let consescutiveColumns = 0;
    let columnToStartFrom = rowIndex;
    let rowToStartFrom = columnIndex;
    for (let i = 0; i < c4Rows; i++) {
      let column = board.rows[rowIndex - i]?.columns[columnIndex + i];
      if (column) {
        columnToStartFrom = columnIndex + i;
        rowToStartFrom = rowIndex + i;
      } else {
        break;
      }
    }
    for (let j = 0; j > c4Rows; j++) {
      let column =
        board.rows[rowToStartFrom + j]?.columns[columnToStartFrom - j];
      if (column) {
        if (
          column.player === board.rows[rowIndex].columns[columnIndex].player
        ) {
          consescutiveColumns++;
          if (consescutiveColumns >= 4) {
            return true;
          }
        } else {
          consescutiveColumns = 0;
        }
      }
    }
    return false;
  };
  const checkVertical = (rowIndex, columnIndex) => {
    let row = board.rows[rowIndex];
    let consecutiveColumns = 0;

    for (let i = 0; i < c4Rows; i++) {
      if (
        board.rows[i].columns[columnIndex].player ===
        row.columns[columnIndex].player
      ) {
        consecutiveColumns++;
        if (consecutiveColumns >= 4) {
          return true;
        }
      } else {
        consecutiveColumns = 0;
      }
    }
    return false;
  };

  const checkHorizontal = (rowIndex, columnIndex) => {
    let row = board.rows[rowIndex];
    let consecutiveColumns = 0;
    for (let i = 0; i < c4Columns; i++) {
      if (row.columns[i].player === row.columns[columnIndex].player) {
        consecutiveColumns++;
        if (consecutiveColumns >= 4) {
          return true;
        }
      } else {
        consecutiveColumns = 0;
      }
    }
    return false;
  };

  return (
    <Wrap>
      <Header
        initialBoard={initialBoard}
        setBoard={setBoard}
        setCurrentPlayer={setCurrentPlayer}
        setProgress={setProgress}
        progress={progress}
        restartGame={restartGame}
      />
      <div className="tableWrap">
        <div className="box p1">
          <img src={player1} alt="player 1 logo" />
          <span className="player">Player 1</span>
          <span className="score"> {player1Score} </span>
        </div>
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
            alt="turn player"
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
        <div className="box p2">
          <img src={player2} alt="player 2 logo" />
          <span className="player">Player 2</span>
          <span className="score"> {player2Score} </span>
        </div>
        {showWinner ? (
          <>
            <div className="winnerCard">
              <img src={winnerCard} alt="Winner Card" />
            </div>
            <div className="winnerCardContent">
              <span className="player">
                {" "}
                PLAYER {currentPlayer === 1 ? 2 : 1}{" "}
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
              <span className="player">
                {" "}
                PLAYER {currentPlayer === 1 ? 2 : 1}{" "}
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
        <div className="turnCard">
          {currentPlayer === 1 ? (
            <img src={turnPlayer1Bg} alt="turn player 1" />
          ) : (
            <img src={turnPlayer2Bg} alt="turn player 2" />
          )}
        </div>
        <div className="turnCardContent">
          <span className="turnPlayer">PLAYER {currentPlayer}'S TURN </span>
          <span className="turnPlayerTimer">{progress}s</span>
        </div>
      </div>

      <img className="bg" src={bg} alt="background" />
    </Wrap>
  );
};
const Wrap = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  .tableWrap {
    margin-top: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    .turn {
      position: absolute;
      top: -35px;
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
    }
    .turnCardContent {
      position: absolute;
      bottom: -90px;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index: 5;
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

        /* White */

        color: #ffffff;
      }
    }
  }

  .bg {
    width: 100%;
    position: fixed;
    bottom: 0;
    z-index: -50;
    height: 200px;
  }
`;
export default GameBoardPvP;
