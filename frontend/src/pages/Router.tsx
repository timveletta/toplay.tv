import React from "react";
import { useGameState } from "../context/GameState";

import Home from "./Home";
import PlayerLobby from "./lobby/PlayerLobby";
import GameLobby from "./lobby/GameLobby";

const Router = () => {
  const [{ status, isPlayer }] = useGameState();

  // TODO check game status if available

  return (
    <>
      {status === "NOT_IN_GAME" && <Home />}
      {status === "LOBBY" && !isPlayer && <GameLobby />}
      {status === "LOBBY" && isPlayer && <PlayerLobby />}
    </>
  );
};

export default Router;
