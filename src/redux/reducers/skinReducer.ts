
import { ActionType } from '../action-types';

interface SkinState {
  skin: string;
}

const initialState: SkinState = {
  skin: 'blue',
};

const skinReducer = (state = initialState, action) => {
    switch (action.type) {
      case ActionType.SET_BIRD_SKIN:
        return {
          ...state,
          skin: action.payload,
        };
      default:
        return state;
    }
  };

export default skinReducer;