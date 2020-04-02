import React from "react";
import { useRouteMatch, Switch, Route } from "react-router-dom";

import GameLobby from "./GameLobby";
import PlayerLobby from "./PlayerLobby";

const Lobby = () => {
  let { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/player/:id`}>
        <PlayerLobby />
      </Route>
      <Route path={`${path}/:id`}>
        <GameLobby />
      </Route>
    </Switch>
  );
};

export default Lobby;
