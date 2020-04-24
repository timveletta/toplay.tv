import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import IGameState from "../types/IGameState";
import useLocalStorage from "../hooks/useLocalStorage";

const initialState: IGameState = {
  status: "NOT_IN_GAME",
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
  const localStorage = useLocalStorage();
  const [gameState, setGameState] = useState<IGameState>({
    ...initialState,
    gameId: localStorage.get("gameId"),
    player: {
      id: localStorage.get("playerId"),
    },
    status: Boolean(localStorage.get("gameId")) ? "LOBBY" : "NOT_IN_GAME", // TODO fix to reflect returning to game using Suspense component
    isPlayer: Boolean(localStorage.get("playerId")),
  });
  const value: GameStateType = useMemo(() => [gameState, setGameState], [
    gameState,
  ]);
  return <GameStateContext.Provider value={value} {...props} />;
};

export default GameStateProvider;
export { useGameState };
