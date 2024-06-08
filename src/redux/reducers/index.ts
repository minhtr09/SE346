import { combineReducers } from "redux";
import approveReducer from "./approveReducer";
import fetchNftReducer from "./fetchNftReducer";

const reducers = combineReducers({
  approve: approveReducer,
  fetch: fetchNftReducer,
});

export default reducers;
export type State = ReturnType<typeof reducers>;
