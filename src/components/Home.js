import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import logo from "../assets/images/logo.svg";
import playerCpu from "../assets/images/player-vs-cpu.svg";
import playerPlayer from "../assets/images/player-vs-player.svg";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Wrap>
      <Box>
        <img src={logo} className="logo" alt="Okidocc Logo" />
        <div className="wrapBtns">
          <button
            className="yellowBtn"
            onClick={() => navigate("/playervsplayer")}
          >
            PLAY VS PLAYER <img src={playerPlayer} alt="logo PVP" />
          </button>
          <button onClick={() => navigate("/playervscpu")} className="roseBtn">
            PLAY VS CPU
            <img src={playerCpu} alt="logo CPU" />
          </button>
          <button
            disabled
            className="blackBtn"
            onClick={() => navigate("/playervsonline")}
          >
            PLAY ONLINE (todo) <img src={playerPlayer} alt="logo PVP" />
          </button>
          <button className="whiteBtn" onClick={() => navigate("/rules")}>
            GAMES RULES
          </button>
        </div>
      </Box>
    </Wrap>
  );
};

const Wrap = styled.div`
  min-height: 94vh;
  max-width: 586px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;

const Box = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--purple-secondary);
  border: 3px solid #000000;
  box-shadow: 0px 10px 0px #000000;
  border-radius: 40px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  .logo {
    margin-top: 45px;
    margin-bottom: 40px;
  }
  .wrapBtns {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    button {
      margin-top: 10px;
      margin-bottom: 20px;
      width: 400px;
      height: 72px;
      box-shadow: 3px 10px 3px #000000;
      border-radius: 20px;
      font-size: 24px;
      line-height: 31px;
      font-weight: 700;
      cursor: pointer;
      text-align: left;
      padding: 0px 20px;
      display: flex;
      align-items: center;
      transition: 0.3s;
      @media screen and (max-width: 670px) {
        width: 335px;
      }
      &:hover {
        box-shadow: 0px 10px 0px var(--purple-primary);
        border: 3px solid var(--purple-primary);
      }
      img {
        margin-left: auto;
      }
    }
    .roseBtn {
      background: var(--rose);
      border: 3px solid #000000;
      color: white;
    }
    .yellowBtn {
      background: var(--yellow);
      border: 3px solid #000000;
      color: black;
    }
    .whiteBtn {
      margin-top: 45px;
      margin-bottom: 40px;
      width: 220px;
      background: var(--white);
      border: 3px solid #000000;
      color: black;
    }
    .blackBtn {
      background: black; /* Green color */
      border: 3px solid #000000;
      color: white;
    }
  }
`;
