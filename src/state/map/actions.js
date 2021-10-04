export const ON_HOVER = "ON_HOVER";
export const CLEAR_CITIES = "CLEAR_CITIES";
export const PICK_CITY = "PICK_CITY";

export const onCardHover = (city) => ({
  type: ON_HOVER,
  payload: city,
});

export const clearCities = () => ({
  type: CLEAR_CITIES,
});

export const pickCity = (city) => ({
  type: PICK_CITY,
  payload: city,
});
