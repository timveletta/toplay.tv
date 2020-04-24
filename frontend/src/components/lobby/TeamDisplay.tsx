import React, { FC, useMemo } from "react";
import { H4 } from "../Typography";
import IPlayer from "../../types/IPlayer";
import PlayerLine from "./PlayerLine";

interface ITeamDisplay {
  players: IPlayer[];
  team: number | null;
}

const TeamDisplay: FC<ITeamDisplay> = ({ players, team }) => {
  debugger;
  const playersInTeam = useMemo(() => {
    return players.filter((p) => p.team === team);
  }, [players, team]);

  const color = useMemo(() => {
    switch (team) {
      case 1:
        return "BLUE";
      case 2:
        return "RED";
      default:
        return "GREY";
    }
  }, [team]);

  return (
    <div>
      <H4>{team ? `Team ${team}` : "Not Selected"}</H4>
      {playersInTeam.map((player) => (
        <PlayerLine name={player.name || ""} color={color} />
      ))}
    </div>
  );
};

export default TeamDisplay;
