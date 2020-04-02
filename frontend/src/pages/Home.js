import React, { useState } from "react";
import styled from "styled-components";
import { CREATE_GAME, JOIN_GAME } from "../graphql";
import { Redirect } from "react-router-dom";
import API, { graphqlOperation } from "@aws-amplify/api";
import { Button } from "react-bulma-components";

import Layout from "../components/Layout";
import JoinGame from "../components/JoinGame";

const Container = styled.div`
  max-width: 800px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
`;

const Home = () => {
  const [createGameResult, setCreateGameResult] = useState({});
  const [joinGameResult, setJoinGameResult] = useState({});

  const onCreateGame = async () => {
    setCreateGameResult(
      await API.graphql(
        graphqlOperation(CREATE_GAME, { gameType: "GALACTICCONQUEST" })
      )
    );
  };

  const onJoinGame = async () => {
    setJoinGameResult();
    // await API.graphql(graphqlOperation(JOIN_GAME, { code, name }))
  };

  return (
    <Layout>
      {createGameResult.data && (
        <Redirect to={`lobby/${createGameResult.data.createGame.code}`} />
      )}
      {createGameResult.error && JSON.stringify(createGameResult.error)}
      {joinGameResult.data && (
        <Redirect to={`lobby/player/${joinGameResult.data.joinGame.name}`} />
      )}
      <Container>
        <Button onClick={onCreateGame}>Create Game</Button>
        <JoinGame onJoinGame={onJoinGame} />
      </Container>
    </Layout>
  );
};

export default Home;
