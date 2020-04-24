import React, { useMemo, useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { GET_PLAYER, GET_GAME_AS_PLAYER, UPDATE_PLAYER } from "../../graphql";
import { useGameState } from "../../context/GameState";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";
import COLORS from "../../constants/colors.json";
import GAMETYPES from "../../constants/game-types.json";
import Button from "../../components/Button";
import IPlayer from "../../types/IPlayer";

const PlayerLobby = () => {
  const [player, setPlayer] = useState<IPlayer>();
  const [gameState] = useGameState();
  const {
    loading: getPlayerLoading,
    data: getPlayerData,
    error: getPlayerError,
  } = useQuery(GET_PLAYER, {
    variables: {
      id: gameState.player && gameState.player.id,
      gameId: gameState.gameId,
    },
  });
  const {
    loading: getGameLoading,
    data: getGameData,
    error: getGameError,
  } = useQuery(GET_GAME_AS_PLAYER, { variables: { id: gameState.gameId } });
  const [
    updatePlayer,
    {
      loading: updatePlayerLoading,
      data: updatePlayerData,
      error: updatePlayerError,
    },
  ] = useMutation(UPDATE_PLAYER);

  useEffect(() => {
    if (getPlayerData) {
      setPlayer({
        id: gameState.player && gameState.player.id,
        ...getPlayerData.getPlayer,
      });
    }
  }, [getPlayerData]);

  useEffect(() => {
    if (updatePlayerData) {
      setPlayer({
        id: gameState.player && gameState.player.id,
        ...updatePlayerData.updatePlayer,
      });
    }
  }, [updatePlayerData]);

  const gameTypeData: { isTeamBased: boolean } = useMemo(
    () => getGameData && (GAMETYPES as any)[getGameData.getGame.type],
    [getGameData]
  );

  const color: string = useMemo(() => {
    if (gameTypeData && player) {
      if (!gameTypeData.isTeamBased) {
        return player.color || "GREY";
      }
      switch (player.team) {
        case 1:
          return "BLUE";
        case 2:
          return "RED";
        default:
          return "GREY";
      }
    }
    return "GREY";
  }, [gameTypeData, player]);

  const onJoinTeam = (team: 1 | 2) => {
    updatePlayer({
      variables: {
        id: player && player.id,
        gameId: gameState.gameId,
        input: {
          team,
        },
      },
    });
  };

  return (
    <div className="grid w-full text-center">
      {(getPlayerLoading || getGameLoading) && <Loading />}
      {getPlayerError && <Alert.Error>Could not fetch player.</Alert.Error>}
      {getGameError && <Alert.Error>Could not fetch game.</Alert.Error>}
      {player && getGameData && (
        <>
          <div
            className={`text-lg font-bold p-4 w-full ${
              (COLORS as any)[color]
            } text-white`}
          >
            {getPlayerData && getPlayerData.getPlayer.name}
          </div>
          <div className={`grid grid-cols-2 gap-2 p-4`}>
            <Button type="button" color="primary" onClick={() => onJoinTeam(1)}>
              Join Team 1
            </Button>
            <Button type="button" color="accent" onClick={() => onJoinTeam(2)}>
              Join Team 2
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PlayerLobby;
