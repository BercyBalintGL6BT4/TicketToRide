export const CREATE_ROOM = "CREATE_ROOM";
export const ROOM_SYNC = "ROOM_SYNC";
export const JOIN_ROOM = "JOIN_ROOM";

export const create_room = (act) => ({
  type: CREATE_ROOM,
  payload: act,
});

export const roomSyncd = (act) => ({
  type: ROOM_SYNC,
  payload: act,
});

export const joined_room = (act) => ({
  type: ROOM_SYNC,
  payload: act,
});
