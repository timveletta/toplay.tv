export default interface IGameState {
  state: "NOT_IN_GAME" | "LOBBY";
  isPlayer: boolean;
}
