import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { GET_PLAYER } from "../../graphql";
import { useGameState } from "../../context/GameState";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";

const PlayerLobby = () => {
  const [{ gameId, player }] = useGameState();
  const {
    loading: getPlayerLoading,
    data: getPlayerData,
    error: getPlayerError,
  } = useQuery(GET_PLAYER, {
    variables: {
      id: player && player.id,
      gameId,
    },
  });

  return (
    <div className="grid w-full text-center">
      {getPlayerLoading && <Loading />}
      {getPlayerError && <Alert.Error>Could not fetch player.</Alert.Error>}
      {getPlayerData && (
        <div className="text-lg font-bold p-4 w-full bg-red-600 text-white">
          {getPlayerData && getPlayerData.getPlayer.name}
        </div>
      )}
    </div>
  );
};

export default PlayerLobby;
