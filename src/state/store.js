import { applyMiddleware, createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { createLogger } from "redux-logger";
import { cardReducer } from "./cards/reducer";
import { playerReducer } from "./players/reducer";
import { mapReducer } from "./map/reducer";
import { connectionReducer } from "./paths/reducer";
import { roomReducer } from "./room/reducer";

const UPDATE_STATE = "UPDATE_STATE";

const appReducer = combineReducers({
  players: playerReducer,
  cards: cardReducer,
  cities: mapReducer,
  connections: connectionReducer,
  room: roomReducer,
});

const rootReducer = (state, action) => {
  const { type, payload } = action;
  if (type === UPDATE_STATE) {
    state = payload;
  }
  return appReducer(state, action);
};

const logger = createLogger({});
export const configureStore = () => {
  return createStore(rootReducer, composeWithDevTools(applyMiddleware(logger)));
};

export const updateState = (state) => ({
  type: UPDATE_STATE,
  payload: state,
});

export const getState = (state) => state;
