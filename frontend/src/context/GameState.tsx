import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import IGameState from "../types/IGameState";

const initialState: IGameState = {
  state: "NOT_IN_GAME",
  isPlayer: false,
};

type GameStateType = [IGameState, Dispatch<SetStateAction<IGameState>>];

const GameStateContext = createContext<GameStateType>([initialState, () => {}]);

const useGameState = () => {
  const context = useContext<GameStateType>(GameStateContext);
  if (!context) {
    throw new Error("useGameState must be used within a GameStateProvider");
  }
  return context;
};

const GameStateProvider = ({ ...props }) => {
  const [gameState, setGameState] = useState<IGameState>(initialState);
  const value: GameStateType = useMemo(() => [gameState, setGameState], [
    gameState,
  ]);
  return <GameStateContext.Provider value={value} {...props} />;
};

export default GameStateProvider;
export { useGameState };
