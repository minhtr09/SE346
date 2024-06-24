import { ActionType } from "../action-types";
import { Action } from "../actions";


// Define the initial state
const initialState = {
    birdColor: "blue",
};

// Define the reducer function
const changeSkinReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case ActionType.CHANGE_BIRD_COLOR:
            return {
                ...state,
                birdColor: action.payload,
            };
        default:
            return state;
    }
};

export default changeSkinReducer;