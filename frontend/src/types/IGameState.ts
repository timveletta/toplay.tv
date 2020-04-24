import IPlayer from "./IPlayer";

export default interface IGameState {
  gameId?: string;
  isPlayer: boolean;
  player?: IPlayer;
  status: "NOT_IN_GAME" | "LOBBY";
}
