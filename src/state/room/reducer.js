import { CREATE_ROOM, ROOM_SYNC, JOIN_ROOM } from "./actions";

const initialState = {
  roomId: null,
  roomSize: null,
  roomSyncdUp: false,
};

export const roomReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (type === CREATE_ROOM) {
    return {
      ...state,
      roomId: payload.roomId,
      roomSize: payload.roomSize,
    };
  }

  if (type === ROOM_SYNC) {
    return {
      ...state,
      roomSyncdUp: true,
    };
  }

  if (type === JOIN_ROOM) {
    return {
      ...state,
      roomId: payload,
    };
  }

  return state;
};
