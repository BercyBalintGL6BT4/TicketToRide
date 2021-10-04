import { useState } from "react";
import { act } from "react-dom/test-utils";
import { connect, useDispatch, useSelector } from "react-redux";
import { pickCity, clearCities } from "../state/map/actions";
import { getSocketID } from "../socketApi";

export function GameBoard({
  cardsNeeded,
  setCardsNeeded,
  checkedCity,
  setCity,
  twoCitiesChecked,
  setTwoCitiesChecked,
  pulledCards,
}) {
  const [bcolor, setColor] = useState("black");

  const cities = useSelector((state) => state.cities);
  const playerDatas = useSelector((state) => state.players);
  const road_values = useSelector((state) => state.connections);
  const dispatch = useDispatch();

  const actualPlayer = playerDatas.players.find(
    (player) => player.id === playerDatas.actualPlayer
  );

  const thisPlayer = playerDatas.players.find(
    (player) => player.id === getSocketID()
  );

  function divMaker(city) {
    const cityStyle = {
      left: city.x - 1 + "%",
      top: city.y - 1 + "%",
      position: "relative",
      width: 2 + "%",
      height: 2.5 + "%",
      borderRadius: 10 + "px",
      borderWidth: 7 + "px",
      backgroundColor: city.color,
    };
    return (
      <div
        id={city.id}
        className="position-absolute border"
        keys={city.id}
        style={cityStyle}
        onClick={() => onCityClick(city)}
      />
    );
  }

  function onCityClick(city) {
    if (pulledCards === 0 && actualPlayer.id === getSocketID()) {
      if (checkedCity === null) {
        setCity(city);
        dispatch(pickCity(city));
        setCardsNeeded(null);
      } else {
        var connection = road_values.find(
          (road) =>
            (road.to === city.id && road.from === checkedCity.id) ||
            (road.from === city.id && road.to === checkedCity.id)
        );
        if (
          connection !== undefined &&
          !twoCitiesChecked &&
          canTrackBePlaced(connection)
        ) {
          dispatch(pickCity(city));
          setTwoCitiesChecked(true);
          setCardsNeeded(connection);
        } else {
          setTwoCitiesChecked(false);
          dispatch(clearCities());
          setCity(null);
          setCardsNeeded(null);
        }
      }
    }
  }

  function canTrackBePlaced(connection) {
    const actualPlayer = playerDatas.players.find(
      (player) => player.id === playerDatas.actualPlayer
    );
    var color_cards = actualPlayer.train_cards.find(
      (card) => card.color === connection.color
    );
    var train_cards = actualPlayer.train_cards.find(
      (card) => card.color === "black"
    );

    if (color_cards !== undefined) {
      if (train_cards !== undefined) {
        if (
          train_cards.count >= connection.locomotive &&
          color_cards.count + train_cards.count >= connection.elements.length
        ) {
          return true;
        }
      } else {
        if (
          connection.locomotive === 0 &&
          color_cards.count >= connection.elements.length
        ) {
          return true;
        } else {
          return false;
        }
      }
    } else {
      return false;
    }
  }

  function roadMaker(road, roa) {
    const roadStyle = {
      left: roa.x - 1 + "%",
      top: roa.y - 1 + "%",
      position: "relative",
      width: 1.5 + "%",
      height: 1.5 + "%",
      backgroundColor: road.color,
    };
    return (
      <div
        className="position-absolute border"
        style={roadStyle}
        keys={road.id}
      ></div>
    );
  }

  return (
    <div className="col-lg-8 d-flex position-relative gameArea border text-light">
      <h1>{checkedCity !== null ? checkedCity.city : "null"}</h1>
      {cities.map((city) => {
        return divMaker(city);
      })}

      {playerDatas.players.map((player) => {
        return player.placed_connections.map((road) => {
          return road.elements.map((element) => {
            return roadMaker(road, element);
          });
        });
      })}
    </div>
  );
}
