import React, { useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { CREATE_GAME, JOIN_GAME } from "../graphql";
import { useMutation } from "@apollo/react-hooks";
import Button from "../components/Button";
import Layout from "../components/Layout";
import JoinGame from "../components/home/JoinGame";
import Alert from "../components/Alert";
import { useGameState } from "../context/GameState";

const Container = styled.div`
  max-width: 800px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 2rem;
`;

const Error = styled(Alert.Error)`
  grid-column: span 2;
`;

interface IJoinGameForm {
  name: string;
  code: string;
}

const Home = () => {
  const [gameState, setGameState] = useGameState();
  const { register, handleSubmit } = useForm<IJoinGameForm>();
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

  const onCreateGame = () => {
    createGameMutation({ variables: { gameType: "CODEBREAKERS" } });
  };

  const onJoinGame = (data: IJoinGameForm) => {
    joinGameMutation({ variables: data });
  };

  useEffect(() => {
    if (createGameData || joinGameData) {
      setGameState((prev) => ({
        ...prev,
        state: "LOBBY",
        isPlayer: !createGameData && joinGameData,
      }));
    }
  }, [createGameData]);

  return (
    <Layout>
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
            isError={Boolean(joinGameError)}
          />
        </form>
      </Container>
    </Layout>
  );
};

export default Home;
