import { ticketToRideData } from "../../assets/ticket-to-ride-data";
import { CLEAR_CITIES, ON_HOVER, PICK_CITY } from "./actions";

const cities = Object.values(ticketToRideData.cities);

const initialState = cities.map((city) => ({
  ...city,
  color: "black",
}));

export const mapReducer = (state = initialState, action) => {
  const { type, payload } = action;
  const cities = state;

  if (type === ON_HOVER) {
    return cities.map((city) =>
      city.id === payload.from || city.id === payload.to
        ? { ...city, color: "yellow" }
        : city
    );
  }

  if (type === CLEAR_CITIES) {
    return cities.map((city) => ({
      ...city,
      color: "black",
    }));
  }

  if (type === PICK_CITY) {
    return cities.map((city) =>
      city.id === payload.id ? { ...city, color: "yellow" } : city
    );
  }

  return state;
};
