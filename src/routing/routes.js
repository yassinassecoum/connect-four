import React from "react";
import { Routes, Route } from "react-router-dom";
import GameBoardPvP from "../components/GameBoard";
import { Home } from "../components/Home";
import { Rules } from "../components/Rules";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/rules" element={<Rules />} exact />
      <Route path="/playervsplayer" element={<GameBoardPvP />} exact />
    </Routes>
  );
};

export default Routing;
