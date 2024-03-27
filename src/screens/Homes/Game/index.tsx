import { useRef, useState, useEffect } from "react";
import { Start } from "./Start";
import { GameEngine } from "react-native-game-engine";

import entities from "../../../entities";
import { styles } from "./styles";
import { Physics } from "../../../utils/physics";

const Game = () => {
  const [running, setIsRunning] = useState(false);

  const gameEngineRef = useRef();
  useEffect(() => {
    setIsRunning(true);
  }, []);

  const handleOnStartGame = () => {
    // TODO:
  };

  //return <Start handleOnStartGame={handleOnStartGame} />;

  return (
    <GameEngine
      systems={[Physics]}
      ref={gameEngineRef}
      running={running}
      entities={entities()}
      style={styles.engineContainer}
    />

  );
};

export { Game };