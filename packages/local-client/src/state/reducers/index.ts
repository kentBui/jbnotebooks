import { combineReducers } from "redux";
import bundleReducer from "./bundleReducer";
import cellsReducer from "./cellsReducer";

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
