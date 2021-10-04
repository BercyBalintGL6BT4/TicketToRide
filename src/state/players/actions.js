export const PULL_CARD_TO_HAND = "PULL_CARD_TO_HAND";
export const TAKE_AWAY_CARDS = "TAKE_AWAY_CARDS";
export const ADD_CONNECTION = "ADD_CONNECTION";
export const NEXT_PLAYER = "NEXT_PLAYER";
export const ADD_ACTION = "ADD_ACTION";
export const ADD_PLAYER = "ADD_PLAYER";
export const SET_TO_DEFAULT = "SET_TO_DEFAULT";

export const pullCardToPlayer = (card) => ({
  type: PULL_CARD_TO_HAND,
  payload: card,
});

export const takeAwayCards = (cards) => ({
  type: TAKE_AWAY_CARDS,
  payload: cards,
});

export const set_default_players = () => ({
  type: SET_TO_DEFAULT,
});

export const addConnection = (connection) => ({
  type: ADD_CONNECTION,
  payload: connection,
});

export const nextPlayer = (round) => ({
  type: NEXT_PLAYER,
  payload: round,
});

export const actionList = (act) => ({
  type: ADD_ACTION,
  payload: act,
});

export const add_player = (act) => ({
  type: ADD_PLAYER,
  payload: act,
});
