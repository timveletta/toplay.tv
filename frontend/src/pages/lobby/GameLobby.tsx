import React, { useEffect, useState, useMemo } from "react";
import styled from "styled-components";
import { useQuery, useSubscription } from "@apollo/react-hooks";
import { PLAYER_JOINED, GET_GAME, PLAYER_UPDATED } from "../../graphql";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import { H2 } from "../../components/Typography";
import Alert from "../../components/Alert";
import Loading from "../../components/Loading";
import PlayerLine from "../../components/lobby/PlayerLine";
import TeamDisplay from "../../components/lobby/TeamDisplay";
import { useGameState } from "../../context/GameState";
import IPlayer from "../../types/IPlayer";
import GAMETYPES from "../../constants/game-types.json";

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
  const [{ gameId }] = useGameState();
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const {
    loading: getGameLoading,
    data: getGameData,
    error: getGameError,
  } = useQuery(GET_GAME, { variables: { id: gameId } });

  const { data: playerJoinedData } = useSubscription(PLAYER_JOINED, {
    variables: { gameId },
  });

  const { data: playerUpdatedData } = useSubscription(PLAYER_UPDATED, {
    variables: { gameId },
  });

  useEffect(() => {
    if (playerJoinedData) {
      setPlayers((prev) => prev.concat([playerJoinedData.playerJoined]));
    }
  }, [playerJoinedData]);

  useEffect(() => {
    if (playerUpdatedData) {
      const playersList = [...players];
      const playerIndex = playersList.findIndex(
        (p) => p.id === playerUpdatedData.playerUpdated.id
      );
      if (playerIndex >= 0) {
        playersList[playerIndex] = playerUpdatedData.playerUpdated;
      }
      setPlayers(playersList);
    }
  }, [playerUpdatedData]);

  useEffect(() => {
    if (getGameData) {
      setPlayers(getGameData.getGame.players);
    }
  }, [getGameData]);

  const gameTypeData: { isTeamBased: boolean } = useMemo(
    () => getGameData && (GAMETYPES as any)[getGameData.getGame.type],
    [getGameData]
  );

  return (
    <Layout>
      <Container>
        {getGameLoading && <Loading />}
        {getGameError && <Error>Cannot fetch game data.</Error>}
        {getGameData && (
          <>
            <GameCodeCard>
              <h1
                className={`font-mono text-6xl uppercase tracking-widest text-center text-gray-800`}
              >
                {getGameData.getGame.code}
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
                !gameTypeData.isTeamBased &&
                players.map((player: any) => (
                  <PlayerLine
                    key={player.id}
                    name={player.name}
                    color={player.color}
                  />
                ))}
              {players && gameTypeData.isTeamBased && (
                <>
                  <TeamDisplay players={players} team={1} />
                  <TeamDisplay players={players} team={2} />
                  <TeamDisplay players={players} team={null} />
                </>
              )}
            </PlayersCard>
          </>
        )}
      </Container>
    </Layout>
  );
};

export default GameLobby;
