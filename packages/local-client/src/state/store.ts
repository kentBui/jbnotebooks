import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { persistMiddleware } from "./middleware/persist-middleware";
import reducers from "./reducers";

const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

export const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(persistMiddleware, thunk))
);
