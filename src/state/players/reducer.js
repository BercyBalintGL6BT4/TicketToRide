import { playerDatas } from "../../players";
import {
  PULL_CARD_TO_HAND,
  TAKE_AWAY_CARDS,
  ADD_CONNECTION,
  NEXT_PLAYER,
  ADD_ACTION,
  ADD_PLAYER,
  SET_TO_DEFAULT,
} from "./actions";

const initialState = {
  players: [],
  actualPlayer: null,
  round: 0,
};

export const playerReducer = (state = initialState, action) => {
  const { type, payload } = action;
  const all_players = state.players;
  const actualPlayer = state.actualPlayer;
  const roundCount = state.round;

  if (type === ADD_PLAYER) {
    const player_to_add = payload;
    const array = {
      actualPlayer: actualPlayer === null ? player_to_add.id : actualPlayer,
      players: [...all_players, player_to_add],
      round: roundCount,
    };
    return array;
  }

  if (type === SET_TO_DEFAULT) {
    return initialState;
  }
  if (type === PULL_CARD_TO_HAND) {
    const player = all_players.find(({ id }) => id === actualPlayer);

    const cardAvailable = player.train_cards.some(
      (t) => t.color === payload.color
    );

    if (cardAvailable) {
      player.train_cards.find((t) => t.color === payload.color).count++;

      const array = {
        actualPlayer: actualPlayer,
        players: all_players.map((p) => {
          var temp = Object.assign({}, p);
          if (temp.id === actualPlayer) {
            temp.train_cards.map((tr) => {
              var temp2 = Object.assign({}, tr);
              if (temp2.color === payload.color) {
                temp2.color++;
              }
              return temp2;
            });
          }
          return temp;
        }),
        round: roundCount,
      };

      return array;
    } else {
      const obj = {
        id: payload.id,
        color: payload.color,
        count: 1,
      };

      const array = {
        actualPlayer: actualPlayer,
        players: all_players.map((p) => {
          var temp = Object.assign({}, p);
          if (temp.id === actualPlayer) {
            temp.train_cards.push(obj);
          }
          return temp;
        }),
        round: roundCount,
      };
      return array;
    }
  }
  if (type === TAKE_AWAY_CARDS) {
    const cards = payload;

    cards.map((colorToDelete) => {
      const c_db = all_players
        .find((player) => player.id === actualPlayer)
        .train_cards.find((card) => card.color === colorToDelete).count;
      if (c_db - 1 > 0) {
        //start
        const player = all_players.find(({ id }) => id === actualPlayer);
        player.train_cards.find((t) => t.color === colorToDelete).count--;

        const array = {
          actualPlayer: actualPlayer,
          players: all_players.map((p) => {
            var temp = Object.assign({}, p);
            if (temp.id === actualPlayer) {
              temp.train_cards.map((tr) => {
                var temp2 = Object.assign({}, tr);
                if (temp2.color === colorToDelete) {
                  temp2.color++;
                }

                return temp2;
              });
              console.log(cards.length);
            }
            return temp;
          }),
          round: roundCount,
        };

        return array;

        //end
      } else {
        const array = {
          actualPlayer: actualPlayer,
          players: all_players.map((p) => {
            var temp = Object.assign({}, p);
            if (temp.id === actualPlayer) {
              var ind = temp.train_cards.findIndex(
                (card) => card.color === colorToDelete
              );
              temp.train_cards.splice(ind, 1);
            }
            return temp;
          }),
          round: roundCount,
        };
        return array;
      }
    });
  }

  if (type === ADD_CONNECTION) {
    const connection = payload;
    const array = {
      actualPlayer: actualPlayer,
      players: all_players.map((p) => {
        var temp = Object.assign({}, p);
        if (temp.id === actualPlayer) {
          console.log("ezt vettem at");
          console.log(connection);
          temp.placed_connections.push(connection);
          temp.trains = temp.trains - connection.elements.length;
        }
        return temp;
      }),
      round: roundCount,
    };
    return array;
  }
  if (type === NEXT_PLAYER) {
    const round = roundCount + 1;
    const player_index = round % all_players.length;
    console.log("akt player");
    console.log(player_index);
    const array = {
      players: all_players,
      actualPlayer: all_players[player_index].id,
      round: roundCount + 1,
    };
    return array;
  }

  if (type === ADD_ACTION) {
    const act = payload;
    const array = {
      actualPlayer: actualPlayer,
      players: all_players.map((p) => {
        var temp = Object.assign({}, p);
        if (temp.id === actualPlayer) {
          temp.moves.push(act);
        }
        return temp;
      }),
      round: roundCount,
    };
    console.log(array);
    return array;
  }

  return state;
};
