import React from "react";
import AWSAppSyncClient, { AUTH_TYPE } from "aws-appsync";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import API, { graphqlOperation } from "@aws-amplify/api";
import PubSub from "@aws-amplify/pubsub";

import config from "./aws-exports";

import Home from "./pages/Home";
import Lobby from "./pages/lobby";

const amplifyConfig = {
  aws_appsync_graphqlEndpoint: config.appsyncEndpoint,
  aws_appsync_region: config.region,
  aws_appsync_authenticationType: "API_KEY",
  aws_appsync_apiKey: config.apiKey
};

API.configure(amplifyConfig);
PubSub.configure(amplifyConfig);

function App() {
  return (
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
  );
}

export default App;
