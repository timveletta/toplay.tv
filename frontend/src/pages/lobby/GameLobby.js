import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { PLAYER_JOINED } from "../../graphql";
import API, { graphqlOperation } from "@aws-amplify/api";

import Layout from "../../components/Layout";

const GameLobby = () => {
  let { id } = useParams();
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const playerJoinedSubscription = API.graphql(
      graphqlOperation(PLAYER_JOINED, { code: id })
    ).subscribe({
      next: playerJoinedData => {
        const player = playerJoinedData.value.data.playerJoined;
        debugger;
        setPlayers(prev => prev.concat([player]));
      },
      error: e => {
        debugger;
      }
    });

    return () => playerJoinedSubscription.unsubscribe();
  }, []);

  return (
    <Layout>
      <div>ID: {id}</div>
      <div>
        Players:
        {players &&
          players.map(player => <div key={player.id}>{player.name}</div>)}
      </div>
    </Layout>
  );
};

export default GameLobby;
