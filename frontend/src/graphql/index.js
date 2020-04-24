import gql from "graphql-tag";

export const CREATE_GAME = gql`
  mutation CreateGame($gameType: GameType!) {
    createGame(gameType: $gameType) {
      id
    }
  }
`;

export const JOIN_GAME = gql`
  mutation JoinGame($code: String!, $name: String!) {
    joinGame(code: $code, name: $name) {
      id
      gameId
      name
    }
  }
`;

export const PLAYER_JOINED = gql`
  subscription PlayerJoined($gameId: ID!) {
    playerJoined(gameId: $gameId) {
      id
      name
      team
      color
    }
  }
`;

export const PLAYER_UPDATED = gql`
  subscription PlayerUpdated($gameId: ID!) {
    playerUpdated(gameId: $gameId) {
      id
      name
      team
      color
    }
  }
`;

export const GET_GAME = gql`
  query GetGame($id: ID!) {
    getGame(id: $id) {
      code
      type
      state {
        status
      }
      players {
        id
        name
        team
        color
      }
    }
  }
`;

export const GET_GAME_AS_PLAYER = gql`
  query GetGame($id: ID!) {
    getGame(id: $id) {
      type
    }
  }
`;

export const GET_PLAYER = gql`
  query GetPlayer($id: ID!, $gameId: ID!) {
    getPlayer(id: $id, gameId: $gameId) {
      name
      team
      color
    }
  }
`;

export const UPDATE_PLAYER = gql`
  mutation UpdatePlayer($id: ID!, $gameId: ID!, $input: PlayerInput!) {
    updatePlayer(id: $id, gameId: $gameId, input: $input) {
      id
      gameId
      name
      team
      color
    }
  }
`;
