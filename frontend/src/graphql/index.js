import gql from "graphql-tag";

export const CREATE_GAME = gql`
  mutation CreateGame($gameType: GameType!) {
    createGame(gameType: $gameType) {
      code
    }
  }
`;
