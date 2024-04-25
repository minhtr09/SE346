import Matter from "matter-js";
import { getPipeSizePosPair } from "./random";
import { Dimensions } from 'react-native'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get('window').width

export const Physics = (entities, {touches, time, dispatch }) => {
    let engine = entities.physics.engine;

    let bird = entities.Bird.body;
    let birdPositionX = bird.position.x;

    touches.filter(t => t.type === 'press').forEach(t => {
        Matter.Body.setVelocity(entities.Bird.body, {
            x: 0,
            y: -4 
        })
    });

    const numberOfObstacles = Object.keys(entities).filter(key => key.startsWith('ObstacleBottom')).length;

    Matter.Engine.update(engine, time.delta);

    for(let index = 1; index <= numberOfObstacles; index++){
        if (!entities[`ObstacleBottom${index}`].collided) {
            // Nếu không có va chạm, tăng điểm số lên
            dispatch({ type: 'new_point' });
            // Đánh dấu rằng chướng ngại vật này đã được xử lý
            entities[`ObstacleBottom${index}`].collided = true;
        }

        if(entities[`ObstacleTop${index}`].body.bounds.max.x <= 0 ){
            const pipeSizePos = getPipeSizePosPair(windowWidth * 0.9);

            Matter.Body.setPosition(entities[`ObstacleTop${index}`].body, pipeSizePos.pipeTop.pos)
            Matter.Body.setPosition(entities[`ObstacleBottom${index}`].body,  pipeSizePos.pipeBottom.pos)

        }

        Matter.Body.translate(entities[`ObstacleTop${index}`].body, {x:  -3, y: 0})
        Matter.Body.translate(entities[`ObstacleBottom${index}`].body, {x:  -3, y: 0})
    }
    
    
    Matter.Events.on(engine, 'collisionStart', (event) => {
        dispatch({ type: 'game_over'});
    })

    return entities
}