// In reducers/skinReducer.ts
import { ActionType } from '../action-types';

interface SkinState {
  skin: string;
}

const initialState: SkinState = {
  skin: 'default', // Assuming 'default' is the initial skin
};

const skinReducer = (state = initialState, action: { type: string; payload: string; }): SkinState => {
  switch (action.type) {
    case ActionType.CHANGE_BIRD_CHARACTER:
      return {
        ...state,
        skin: action.payload,
      };
    default:
      return state;
  }
};

export default skinReducer;