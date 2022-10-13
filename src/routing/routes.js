import React from "react";
import { Routes, Route } from "react-router-dom";
import GameBoardPvP from "../components/GameBoard";
import GameBoard2 from "../components/GameBoard2";
import { Home } from "../components/Home";
import { Rules } from "../components/Rules";

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} exact />
      <Route path="/rules" element={<Rules />} exact />
      {/* <Route path="/playervsplayer" element={<GameBoardPvP />} exact /> */}
      <Route path="/playervsplayer" element={<GameBoard2 />} exact />
    </Routes>
  );
};

export default Routing;
