import React, { useState, useRef } from "react";
import styled from "styled-components";

import logo from "../assets/images/logo.svg";
import { PauseDialog } from "./PauseDialog";

export const Header = ({ setProgress, progress, restartGame }) => {
  const menuDialogRef = useRef();

  return (
    <Wrap>
      <button onClick={() => menuDialogRef.current.openDialog()}>MENU</button>
      <img className="logo" src={logo} alt="logo" />
      <button onClick={() => restartGame()}>RESTART</button>
      <PauseDialog
        ref={menuDialogRef}
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
  @media screen and (max-width: 1200px) {
    margin-top: 20px;
    margin-bottom: 10px;
  }
  @media screen and (max-width: 670px) {
    width: 335px;
    margin-top: 50px;
    margin-bottom: 40px;
  }
  .img {
    @media screen and (max-width: 670px) {
      width: 40px;
      height: 40px;
    }
  }
  button {
    background: #5c2dd5;
    min-width: 98px;
    border-radius: 20px;
    color: white;
    cursor: pointer;
    padding: 10px;
    font-weight: 700;
    font-size: 16px;
    line-height: 20px;
    text-align: center;
    border-color: black;
    &:hover {
      background: #fd6687;
    }
  }
`;
