import React from "react";
import { Routes, Route } from "react-router-dom";
import { Home } from "../components/Home";
import { Rules } from "../components/Rules";
import GameBoard from "../components/GameBoard";
import GameBoardVsCPU from "../components/GameBoardVsCPU";
import GameBoardOnline from "../components/GameBoardOnline";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/rules" element={<Rules />} exact />
      <Route path="/playervscpu" element={<GameBoardVsCPU />} exact />
      <Route path="/playervsplayer" element={<GameBoard />} exact />
      <Route path="/playervsonline" element={<GameBoardOnline />} exact />
    </Routes>
  );
};

export default Routing;
