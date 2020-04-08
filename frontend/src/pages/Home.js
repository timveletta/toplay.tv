import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { CREATE_GAME, JOIN_GAME } from "../graphql";
import { Redirect } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import Button from "../components/Button";
import Layout from "../components/Layout";
import JoinGame from "../components/home/JoinGame";
import Alert from "../components/Alert";

const Container = styled.div`
  max-width: 800px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
`;

const Error = styled(Alert.Error)`
  grid-column: span 2;
`;

const Home = () => {
  const { register, handleSubmit } = useForm();
  const [
    createGameMutation,
    {
      data: createGameData,
      loading: createGameLoading,
      error: createGameError,
    },
  ] = useMutation(CREATE_GAME);
  const [
    joinGameMutation,
    { data: joinGameData, loading: joinGameLoading, error: joinGameError },
  ] = useMutation(JOIN_GAME);

  const onCreateGame = async () => {
    try {
      await createGameMutation({ variables: { gameType: "CODEBREAKERS" } });
    } catch (e) {
      console.error(e);
    }
  };

  const onJoinGame = async (data) => {
    try {
      await joinGameMutation({ variables: data });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout>
      {joinGameData && (
        <Redirect to={`lobby/player/${joinGameData.joinGame.name}`} />
      )}
      {createGameData && (
        <Redirect to={`lobby/${createGameData.createGame.code}`} />
      )}
      <Container>
        {createGameError && (
          <Error>Game could not be created, please try again later.</Error>
        )}
        <Button disabled={createGameLoading} onClick={onCreateGame}>
          Create Game
        </Button>
        <form autoComplete="off" onSubmit={handleSubmit(onJoinGame)}>
          <JoinGame
            register={register}
            isLoading={createGameLoading || joinGameLoading}
            isError={joinGameError}
          />
        </form>
      </Container>
    </Layout>
  );
};

export default Home;
