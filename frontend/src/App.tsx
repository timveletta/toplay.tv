import React from "react";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloLink } from "apollo-link";
import { createHttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { createAppSyncLink, AUTH_TYPE } from "aws-appsync";
import { createSubscriptionHandshakeLink } from "aws-appsync-subscription-link";

import config from "./aws-exports.json";

import GameStateProvider, { useGameState } from "./context/GameState";

import Home from "./pages/Home";

const wsLink = createSubscriptionHandshakeLink({
  url: config.appsyncEndpoint,
  region: config.region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: config.apiKey,
  },
});

const httpLink = createHttpLink({
  uri: config.appsyncEndpoint,
});

const awsLink = createAppSyncLink({
  complexObjectsCredentials: () => null,
  url: config.appsyncEndpoint,
  region: config.region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: config.apiKey,
  },
});

const client = new ApolloClient({
  link: ApolloLink.from([awsLink, httpLink, wsLink]),
  cache: new InMemoryCache({ addTypename: false }),
});

function App() {
  const [{ state }] = useGameState();

  return (
    <ApolloProvider client={client}>
      <GameStateProvider>
        {state === "NOT_IN_GAME" && <Home />}
        {/* {state === "LOBBY" && <Lobby />} */}
      </GameStateProvider>
    </ApolloProvider>
  );
}

export default App;
