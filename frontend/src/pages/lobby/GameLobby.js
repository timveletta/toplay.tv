import React from "react";
import { useParams } from "react-router-dom";

const GameLobby = () => {
  let { id } = useParams();
  return <div>ID: {id}</div>;
};

export default GameLobby;