import Matter from 'matter-js'
import { getPipeSizePostPair } from './random'
import { Dimensions } from 'react-native'
import entities from '../entities';

const windowHeight = Dimensions.get(  'window').height;
const windowWidth = Dimensions.get('window').width;

export const Physics = (entities,{touches,time,dispatch})=>
{
    let engine = entities.physics.engine;
    touches.filter(t => t.type == 'press').forEach(t => {
        Matter.Body.setVelocity(entities.Bird.Body,{
            x:0,
            y:-4
        })
    });

    for(let index = 1;index<=2;index++)
    {
        if(entities['ObstacleTop${index}'].Body.bounds.max.x<=0){
            const pipeSizePos = getPipeSizePostPair(windowWidth*0.9);

            Matter.Body.setPosition(entities['ObstacleTop${index}'].Body,pipeSizePos.pipeTop.pos)
            Matter.Body.setPosition(entities['ObstacleBottom${index}'].Body,pipeSizePos.pipeBottom.pos)

        }
        Matter.Body.translate(entities['ObstacleTop${index}'].Body,{x:-3,y:0})
        Matter.Body.translate(entities['ObstacleBottom${index}'].Body,{x:-3,y:0})
    }


    Matter.Engine.update(engine, time.delta);
    return entities
}

