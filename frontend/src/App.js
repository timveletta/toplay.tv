import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { WebSocketLink } from "apollo-link-ws";

import config from "./aws-exports";

import Home from "./pages/Home";
import Lobby from "./pages/lobby";
import WebSocketConnector from "./WebSocketConnector";

const webSocketUri = WebSocketConnector({
  uri: config.appsyncEndpoint,
  apiKey: config.apiKey,
});

const wsLink = new WebSocketLink({
  uri: webSocketUri,
  options: {
    // reconnect: true,
  },
});

const client = new ApolloClient({
  uri: config.appsyncEndpoint,
  headers: {
    "x-api-key": config.apiKey,
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/lobby">
            <Lobby />
          </Route>
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;
