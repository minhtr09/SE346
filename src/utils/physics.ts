import Matter from 'matter-js'
import { getPipeSizePostPair } from './random'
import { Dimensions } from 'react-native'
import Obstacle from '../components/Obstacle';
import entities from '../entities';

const windowhHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export const Physics = (entities, { touches, time, dispatch }) => {
    let engine = entities.physics.engine;
    touches.filter(t => t.type == 'press').forEach(t => {
        Matter.Body.setVelocity(entities.Bird.body, {
            x: 0,
            y: -4
        })
    });


    Matter.Engine.update(engine, time.delta);
    for(let index = 1; index <= 2; index++){

        if(entities[`ObstacleTop${index}`].body.bounds.max.x <= 0 ){
            const pipeSizePos = getPipeSizePostPair(windowWidth * 0.9);

            Matter.Body.setPosition(entities[`ObstacleTop${index}`].body, pipeSizePos.pipeTop.pos)
            Matter.Body.setPosition(entities[`ObstacleBottom${index}`].body,  pipeSizePos.pipeBottom.pos)

        }

        Matter.Body.translate(entities[`ObstacleTop${index}`].body, {x:  -3, y: 0})
        Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {x:  -3, y: 0})
    }

    return entities
}


