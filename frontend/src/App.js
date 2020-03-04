import React from "react";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import config from "./aws-exports";

import Home from "./pages/Home";
import Lobby from "./pages/lobby";

const client = new AWSAppSyncClient({
  url: config.appsyncEndpoint,
  region: config.region,
  auth: {
    type: AUTH_TYPE.API_KEY,
    apiKey: config.apiKey
  }
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
