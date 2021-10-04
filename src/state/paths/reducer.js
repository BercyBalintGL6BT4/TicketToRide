import { ticketToRideData } from "../../assets/ticket-to-ride-data";

const connections = Object.values(ticketToRideData.connections);

const initialState = connections.map((road) => ({
  ...road,
  taken: false,
}));

export const connectionReducer = (state = initialState, action) => {
  /*if (type === PULL_CARD_TO_HAND) {
  }*/
  return state;
};
