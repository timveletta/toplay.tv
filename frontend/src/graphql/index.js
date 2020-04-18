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
      code
      name
      team
    }
  }
`;

export const PLAYER_JOINED = gql`
  subscription PlayerJoined($code: String!) {
    playerJoined(code: $code) {
      code
      id
      name
      team
    }
  }
`;

export const GET_GAME = gql`
  query GetGame($code: String!) {
    getGame(code: $code) {
      type
      status
      players {
        id
        name
        team
      }
    }
  }
`;
