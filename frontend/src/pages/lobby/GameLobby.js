import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { PLAYER_JOINED, GET_GAME } from "../../graphql";

import Layout from "../../components/Layout";
import Card from "../../components/Card";
import { H2 } from "../../components/Typography";
import Alert from "../../components/Alert";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 1rem;
`;

const Error = styled(Alert.Error)`
  grid-column: span 2;
`;

const GameCodeCard = styled(Card)``;

const PlayersCard = styled(Card)``;

const GameLobby = () => {
  let { id } = useParams();
  const [players, setPlayers] = useState([]);
  const [error, setError] = useState(null);
  const {
    loading: getGameLoading,
    data: getGameData,
    error: getGameError,
  } = useQuery(GET_GAME, { variables: { code: id } });

  useEffect(() => {
    if (getGameData) {
      setPlayers(getGameData.getGame.players);
    }
  }, [getGameData]);

  // useEffect(() => {
  //   const playerJoinedSubscription = API.graphql(
  //     graphqlOperation(PLAYER_JOINED, { code: id })
  //   ).subscribe({
  //     next: (playerJoinedData) => {
  //       const player = playerJoinedData.value.data.playerJoined;
  //       setPlayers((prev) => prev.concat([player]));
  //     },
  //     error: (e) => {
  //       setError(
  //         "There was an error fetching the lobby data. Please refresh and try again."
  //       );
  //     },
  //   });

  //   return () => playerJoinedSubscription.unsubscribe();
  // }, [id]);

  return (
    <Layout>
      <Container>
        {getGameLoading && <span>Loading...</span>}
        {getGameError && <Error>Cannot fetch game data.</Error>}
        {getGameData && (
          <>
            <GameCodeCard>
              <h1
                className={`font-mono text-6xl uppercase tracking-widest text-center text-gray-800`}
              >
                {id}
              </h1>
              <h6
                className={`text-base font-bold uppercase text-center text-gray-500`}
              >
                Game Code
              </h6>
            </GameCodeCard>
            <PlayersCard>
              <H2>Players</H2>
              {players &&
                players.map((player) => (
                  <div key={player.id}>{player.name}</div>
                ))}
            </PlayersCard>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default GameLobby;
