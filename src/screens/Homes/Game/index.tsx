import React, { useRef, useState, useEffect } from "react";
import { GameEngine } from "react-native-game-engine";
import entities from "../../../entities";
import { Physics } from "../../../utils/physics";
import { styles } from "./styles";

import { Start } from "./Start";
import { GameOver } from "./GameOver";
import { View } from "react-native";
import { Text } from "react-native";

const Game = () => {
  const [running, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [ currentPoints, setCurrentPoints ] = useState(0);

  const gameEngineRef = useRef();

  const handleBackToStart = () => {
    setIsRunning(false);
    setIsGameOver(false);
  };

  const handleOnStart = () => {
    setIsRunning(true);
    setIsGameOver(false);
  };

  const handleOnGameOver = () => {
    setIsRunning(false);
    setIsGameOver(true);
  };

  const handleOnEvent = (e) => {
    switch (e.type) {
      case "game_over":
        handleOnGameOver();
        setCurrentPoints(0);
        break;
      case "new_point":
        setCurrentPoints(currentPoints + 1);
        break;
    }
  };

  useEffect(() => {}, []);

  if (!running && !isGameOver) {
    return <Start handleOnStart={handleOnStart} />;
  }

  if (!running && isGameOver) {
    return <GameOver handleBackToStart={handleBackToStart} />;
  }

  return (
    <View style={{flex: 1}}>
      <Text style={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', margin: 20 }} >{currentPoints} </Text>
      <GameEngine
        systems={[Physics]}
        running={running}
        ref={gameEngineRef}
        entities={entities()}
        onEvent={handleOnEvent}
        style={styles.engineContainer}
      />
    </View>
  );
};

export default Game;