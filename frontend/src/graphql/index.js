import gql from "graphql-tag";

export const CREATE_GAME = gql`
  mutation CreateGame($gameType: GameType!) {
    createGame(gameType: $gameType) {
      code
    }
  }
`;

export const JOIN_GAME = gql`
  mutation JoinGame($code: String!, $name: String!) {
    joinGame(code: $code, name: $name) {
      id
      name
      code
    }
  }
`;

export const PLAYER_JOINED = gql`
  subscription PlayerJoined($code: String!) {
    playerJoined(code: $code) {
      id
      name
    }
  }
`;
