import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_GAME } from "../graphql";
import { Redirect } from "react-router-dom";

const Home = () => {
  const [createGame, { loading, error, data }] = useMutation(CREATE_GAME);
  return (
    <div>
      Home
      <button
        disabled={Boolean(loading)}
        onClick={e => {
          createGame({
            variables: {
              gameType: "GALACTICCONQUEST"
            }
          });
        }}
      >
        Create Game
      </button>
      {data && <Redirect to={`lobby/${data.createGame.code}`} />}
      {error && JSON.stringify(error)}
    </div>
  );
};

export default Home;
