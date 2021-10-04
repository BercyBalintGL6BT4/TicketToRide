export const PICK_UP = "PICK_UP";
export const PULL_ONE = "PULL_ONE";

export const pickUpCard = (card) => ({
  type: PICK_UP,
  payload: card,
});

export const pullToDesk = (card) => ({
  type: PULL_ONE,
  payload: card,
});
