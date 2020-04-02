import React from "react";
import { useParams } from "react-router-dom";

const PlayerLobby = () => {
  let { id } = useParams();
  return <div>Player ID: {id}</div>;
};

export default PlayerLobby;
