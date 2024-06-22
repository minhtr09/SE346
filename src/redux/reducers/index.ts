import { combineReducers } from "redux";
import approveReducer from "./approveReducer";
import fetchNftReducer from "./fetchNftReducer";
import skinReducer from "./skinReducer";

const reducers = combineReducers({
  approve: approveReducer,
  fetch: fetchNftReducer,
  skin: skinReducer,
});

export default reducers;
export type State = ReturnType<typeof reducers>;
