import Matter from 'matter-js'
import { getPipeSizePostPair } from './random'
import { Dimensions } from 'react-native'
import entities from '../entities';

const windowhHeight = Dimensions.get(  'window').height;
const windowWidth = Dimensions.get('window').width;

export const Physics = (entities,{touches,time,dispatch})=>
{
    let engine = entities.physics.engine;
    touches.filter(t=>t.type=='press').foreach(t=>{
        Matter.Body.setVelocity(entities.Bird.Body,{
            x:0,
            y:-4
        })
    })

    return entities
}

