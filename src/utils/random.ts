import { Dimensions } from "react-native";

const windowhHeight = Dimensions.get(  'window').height;
const windowWidth = Dimensions.get('window').width;

export const getRandom =(min,max)=>{
    return Math.floor(Math.random()*(max-min-1)+min)
}
export const getPipeSizePostPair=(addToPosX =0 )=>{
    let yPosTop = -getRandom(220,windowhHeight-900)

    const pipeTop = {pos:{x:windowWidth+addToPosX,y:yPosTop},
                    size:{height:450,width: 55}
}
    const pipeBottom = {pos:{x:windowWidth+addToPosX,y:windowhHeight},
    size:{height:450,width: 55}
}
    return {pipeTop,pipeBottom}
}