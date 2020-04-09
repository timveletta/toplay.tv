import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/react-hooks";
import { PLAYER_JOINED, GET_GAME } from "../../graphql";

import Layout from "../../components/Layout";
import Card from "../../components/Card";
import { H2, H4 } from "../../components/Typography";
import Alert from "../../components/Alert";
import PlayerLine from "../../components/lobby/PlayerLine";

const Container = styled.div`
  display: grid;
  grid-template-columns: 200px minmax(200px, 600px);
  grid-gap: 1rem;
  align-items: start;
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

  const getTeam = (teamNumber) =>
    players.filter((player) => player.team === teamNumber);

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
              {getGameData.getGame.type === "CODEBREAKERS" ? (
                <>
                  <H4>Team 1</H4>
                  {getTeam(1).map((player) => (
                    <PlayerLine key={player.id} name={player.name} />
                  ))}
                  <H4>Team 2</H4>
                  {getTeam(2).map((player) => (
                    <PlayerLine key={player.id} name={player.name} />
                  ))}
                </>
              ) : (
                players &&
                players.map((player) => (
                  <PlayerLine key={player.id} name={player.name} />
                ))
              )}
            </PlayersCard>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default GameLobby;
