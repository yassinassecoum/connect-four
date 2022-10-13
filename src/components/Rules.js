import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import check from "../assets/images/icon-check.svg";
import checkHover from "../assets/images/icon-check-hover.svg";

export const Rules = () => {
  const navigate = useNavigate();

  return (
    <Wrap>
      <Box>
        <h1>RULES</h1>
        <div className="text">
          <h4>OBJECTIVE</h4>
          <p>
            Be the first player to connect 4 of the same colored discs in a row
            (either vertically, horizontally, or diagonally).
          </p>
        </div>
        <div className="text">
          <h4>HOW TO PLAY</h4>
          <div className="textContent">
            <p>1. Red goes first in the first game.</p>
            <p>
              2. Players must alternate turns, and only one disc can be dropped
              in each turn.
            </p>

            <p>3. The game ends when there is a 4-in-a-row or a stalemate.</p>

            <p>
              4. The starter of the previous game goes second on the next game.
            </p>
          </div>
        </div>
        <div className="check" onClick={() => navigate("/")}></div>
      </Box>
    </Wrap>
  );
};
const Wrap = styled.div`
  min-height: 94vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
  height: 537px;
  width: 480px;
  background-color: var(--white);
  border: 3px solid #000000;
  box-shadow: 0px 10px 0px #000000;
  border-radius: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  padding: 0px 25px;
  position: relative;
  @media screen and (max-width: 670px) {
    height: 618px;
    width: 335px;
  }
  h1 {
    color: var(--black);
    font-weight: 700;
    font-size: 56px;
    line-height: 71px;
    text-align: center;
  }
  .text {
    color: black;
    h4 {
      font-weight: 700;
      font-size: 20px;
      line-height: 26px;
      color: var(--purple-secondary);
      margin: 15px 0px;
    }
    p {
      opacity: 0.66;
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
    }
  }
  .textContent {
    height: 188px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .check {
    background-image: url(${check});
    position: absolute;
    width: 70px;
    height: 75px;
    bottom: -44px;
    cursor: pointer;
    transition: 0.3s;
    &:hover {
      background-image: url(${checkHover});
    }
  }
`;
