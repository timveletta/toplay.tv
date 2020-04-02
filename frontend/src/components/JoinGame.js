import React, { useState } from "react";
import styled from "styled-components";
import Input from "./Input";
import Button from "./Button";

const Container = styled.div`
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const JoinButton = styled(Button)`
  width: 100%;
`;

const JoinGame = ({ onJoinGame }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");

  return (
    <Container>
      <Input
        type="text"
        value={code}
        onChange={({ target }) => setCode(target.value)}
        placeholder="Code"
      />
      <Input
        type="text"
        value={name}
        onChange={({ target }) => setName(target.value)}
        placeholder="Name"
      />
      <JoinButton onClick={onJoinGame} color="primary">
        Join Game
      </JoinButton>
    </Container>
  );
};

export default JoinGame;
