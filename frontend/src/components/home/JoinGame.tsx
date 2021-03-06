import React, { FC } from "react";
import styled from "styled-components";
import Input from "../Input";
import Button from "../Button";
import Card from "../Card";
import Alert from "../Alert";
import { useForm } from "react-hook-form";

const JoinButton = styled(Button)`
  width: 100%;
`;

interface IJoinGame {
  register: ReturnType<typeof useForm>["register"];
  isLoading: boolean;
  isError: boolean;
}

const JoinGame: FC<IJoinGame> = ({ register, isLoading, isError }) => {
  return (
    <Card>
      {isError && <Alert.Error>Game code not found.</Alert.Error>}
      <Input
        type="text"
        name="code"
        register={register}
        validation={{ required: true, minLength: 4, maxLength: 4 }}
        placeholder="Code"
        disabled={isLoading}
      />
      <Input
        type="text"
        name="name"
        register={register}
        validation={{ required: true }}
        placeholder="Name"
        disabled={isLoading}
      />
      <JoinButton type="submit" disabled={isLoading} color="primary">
        Join Game
      </JoinButton>
    </Card>
  );
};

export default JoinGame;
