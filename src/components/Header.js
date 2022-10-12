import React, { useState, useRef } from "react";
import styled from "styled-components";

import logo from "../assets/images/logo.svg";
import { PauseDialog } from "./PauseDialog";

export const Header = ({
  initialBoard,
  setBoard,
  setCurrentPlayer,
  setProgress,
  progress,
  restartGame,
}) => {
  const menuDialogRef = useRef();

  return (
    <Wrap>
      <button onClick={() => menuDialogRef.current.openDialog()}>MENU</button>
      <img className="logo" src={logo} alt="logo" />
      <button onClick={() => restartGame()}>RESTART</button>
      <PauseDialog
        ref={menuDialogRef}
        initialBoard={initialBoard}
        setBoard={setBoard}
        setCurrentPlayer={setCurrentPlayer}
        setProgress={setProgress}
        progress={progress}
        restartGame={restartGame}
      />
    </Wrap>
  );
};

const Wrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 638px;
  margin-top: 40px;

  margin-bottom: 20px;
  button {
    background: #5c2dd5;
    min-width: 90px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
    padding: 10px;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    &:hover {
      background: #fd6687;
    }
  }
`;
