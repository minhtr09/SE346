import Matter from 'matter-js'
import Bird from '../components/Bird';

export default () => {
    let engine = Matter.engine.create({ enableSleeping: false })

    let world = engine.world;

    return {
        physics: {engine, world},
        Bird: Bird(world, 'green', {x:120, y:300}, {height: 40, width: 40})
    }

}