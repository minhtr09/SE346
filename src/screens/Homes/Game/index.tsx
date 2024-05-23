import React, { useRef, useState, useEffect } from "react";
import { GameEngine } from "react-native-game-engine";
import entities from "../../../entities";
import { Physics } from "../../../utils/physics";
import { styles } from "./styles";

import { Start } from "./Start";
import { GameOver } from "./GameOver";
import { Text, View, Image } from "react-native";

import One from "../../../assets/images/1.png"
import Two from "../../../assets/images/2.png";
import Three from "../../../assets/images/3.png";
import Four from "../../../assets/images/4.png";
import Five from "../../../assets/images/5.png";
import Six from "../../../assets/images/6.png";
import Seven from ".../../../assets/images/7.png";
import Eight from "../../../assets/images/8.png";
import Nine from "../../../assets/images/9.png";
import Zero from "../../../assets/images/0.png";

import { FIRESTORE_DB } from "../../../../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";


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
  const [scoreSaved, setScoreSaved] = useState(false);

  const gameEngineRef = useRef();

  const handleBackToStart = () => {
    setIsRunning(false);
    setIsGameOver(false);
    setScoreSaved(false);
  };

  const handleOnStart = () => {
    setIsRunning(true);
    setIsGameOver(false);
    setScoreSaved(false);
  };

  const handleOnGameOver = async () => {
    setIsRunning(false);
    setIsGameOver(true);
    
    // await addScoreToFirebase(currentPoints); // Add this line to save the score to Firestore
    // setCurrentPoints(0); // Reset points after saving
  };

  const handleOnEvent = (e) => {
    switch (e.type) {
      case "game_over":
          handleOnGameOver();
          //setCurrentPoints(0);
        break;
      case "new_point":
        setCurrentPoints(currentPoints + 1);
        addScoreToFirebase(currentPoints);
        break;
    }
  };

  const renderImage = (Points) => {
    if (Points < 10) {
      return <Image source={numberImages[Points]} style={{ width: 50, height: 70, alignSelf: 'center', marginTop: 20 }} />;
    } else {
      const firstDigit = Math.floor(Points / 10);
      const secondDigit = Points % 10;
      return (
        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 20 }}>
          <Image source={numberImages[firstDigit]} style={{ width: 50, height: 70 }} />
          <Image source={numberImages[secondDigit]} style={{ width: 50, height: 70 }} />
        </View>
      );
    }
  };

  // Add score to db
  const addScoreToFirebase = async (score) => {
    try {
      const scoresCollection = collection(FIRESTORE_DB, "db_scores"); // Replace "scores" with your collection name
      const newScoreDoc = await addDoc(scoresCollection, {
        score, // Store the score in the document
        // Can add other fields
      });
      console.log("Score added to Firestore with ID:", newScoreDoc.id);
    } catch (error) {
      console.error("Error adding score to Firestore:", error);
    }
  };


  if (!running && !isGameOver) {
    return <Start handleOnStart={handleOnStart} />;
  }

  if (!running && isGameOver) {
    return <GameOver handleBackToStart={handleBackToStart} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <View>
        {renderImage(currentPoints)}
      </View>
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
