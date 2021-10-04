import { cardData } from "../../cards";
import { PICK_UP, PULL_ONE } from "./actions";

const initialState = cardData;
export const cardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  const cardOnTable = state;
  const cardPicked = payload;

  if (type === PICK_UP) {
    return {
      possibleCards: [...cardOnTable.possibleCards],
      cardsOnTable: cardOnTable.cardsOnTable.filter(
        (card) => card.id !== cardPicked.id
      ),
    };
  }

  if (type === PULL_ONE) {
    const obj = {
      id: cardPicked.id,
      color:
        cardOnTable.possibleCards[
          Math.floor(Math.random() * cardData.possibleCards.length)
        ],
    };
    console.log(obj);
    return {
      possibleCards: [...cardOnTable.possibleCards],
      cardsOnTable: [...cardOnTable.cardsOnTable, obj],
    };
  }
  return state;
};
