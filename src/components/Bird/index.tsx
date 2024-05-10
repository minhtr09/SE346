import { Image } from "react-native";
import React from "react";
import Matter from "matter-js";
import { styles } from "./styles";

import BLUE_BIRD from "../../assets/images/bluebird-midflap.png";
import RED_BIRD from "../../assets/images/redbird-midflap.png";
import YELLOW_BIRD from "../../assets/images/yellowbird-midflap.png";
import BIRD from "../../assets/images/01.png";


const Bird = (props) => {
  const widthBody = props.body.bounds.max.x - props.body.bounds.min.x;
  const heightBody = props.body.bounds.max.y - props.body.bounds.min.y;

  const xBody = props.body.position.x - widthBody / 2;
  const yBody = props.body.position.y - heightBody / 2;

  const color = props.color;

  return (
    <Image
      source={BIRD}
      style={
        styles({
          widthBody,
          heightBody,
          xBody,
          yBody,
          color,
        }).bird
      }
    />
  );
};

export default (world, color, pos, size) => {
  const initialBird = Matter.Bodies.rectangle(
    pos.x,
    pos.y,
    size.width,
    size.height,
    { label: "Bird" }
  );

  Matter.World.add(world, [initialBird]);

  return {
    body: initialBird,
    color,
    pos,
    renderer: <Bird />,
  };
};