import React, { useRef, useState, useEffect } from "react";
import { GameEngine } from "react-native-game-engine";
import entities from "../../../entities";
import { Physics } from "../../../utils/physics";
import { styles } from "./styles";

import { Start } from "./Start";
import { GameOver } from "./GameOver";
import { Text, View, Image } from "react-native";

import One from "../../../assets/images/1.png";
import Two from "../../../assets/images/2.png";
import Three from "../../../assets/images/3.png";
import Four from "../../../assets/images/4.png";
import Five from "../../../assets/images/5.png";
import Six from "../../../assets/images/6.png";
import Seven from ".../../../assets/images/7.png";
import Eight from "../../../assets/images/8.png";
import Nine from "../../../assets/images/9.png";
import Zero from "../../../assets/images/0.png";

import BottomMenu from "../../../components/BottomMenu/BottomMenu";

import { addScoreToFirebase } from "../../../database/storeScore";
import { useStateContext } from "../../../context";
import { useAccount } from "wagmi";

const numberImages = {
  0: Zero,
  1: One,
  2: Two,
  3: Three,
  4: Four,
  5: Five,
  6: Six,
  7: Seven,
  8: Eight,
  9: Nine,
};

const Game = () => {
  const [running, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [currentPoints, setCurrentPoints] = useState(0);
  const [scoreSaved, setScoreSaved] = useState(0);
  const { address } = useAccount();
  const gameEngineRef = useRef();
  const skin = "yellow";

  const handleBackToStart = () => {
    setIsRunning(false);
    setIsGameOver(false);
    setScoreSaved(0);
  };

  const handleOnStart = () => {
    setIsRunning(true);
    setIsGameOver(false);
    setScoreSaved(0);
  };

  const handleOnGameOver = async () => {
    setIsRunning(false);
    setIsGameOver(true);
    setScoreSaved(currentPoints);
    setCurrentPoints(0);
  };

  const handleOnEvent = (e) => {
    switch (e.type) {
      case "game_over":
        handleOnGameOver();

        //setCurrentPoints(0);
        break;
      case "new_point":
        setCurrentPoints(currentPoints + 1);
        break;
    }
  };

  const renderImage = (Points) => {
    if (Points < 10) {
      return (
        <Image
          source={numberImages[Points]}
          style={{ width: 50, height: 70, alignSelf: "center", marginTop: 20 }}
        />
      );
    } else {
      const firstDigit = Math.floor(Points / 10);
      const secondDigit = Points % 10;
      return (
        <View
          style={{ flexDirection: "row", alignSelf: "center", marginTop: 20 }}
        >
          <Image
            source={numberImages[firstDigit]}
            style={{ width: 50, height: 70 }}
          />
          <Image
            source={numberImages[secondDigit]}
            style={{ width: 50, height: 70 }}
          />
        </View>
      );
    }
  };

  if (!running && !isGameOver) {
    addScoreToFirebase(address?.toString(), currentPoints); // bug: Saving to database does not stop when the game is over
    return <Start handleOnStart={handleOnStart} />;
  }

  if (!running && isGameOver) {
    return <GameOver handleBackToStart={handleBackToStart} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View>{renderImage(currentPoints)}</View>
      <GameEngine
        systems={[Physics]}
        running={running}
        ref={gameEngineRef}
        entities={entities(skin)}
        onEvent={handleOnEvent}
        style={styles.engineContainer}
      />
    </View>
  );
};

export default Game;
