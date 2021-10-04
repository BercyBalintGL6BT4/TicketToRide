import { PlayerCard } from "./PlayerCard";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import { sendMessage, listener } from "../socketApi";
import { updateState, getState } from "../state/store";

import { roomSyncd } from "../state/room/actions";

export function LoadPage({ onSelect }) {
  const roomData = useSelector((state) => state.room);
  const dispatch = useDispatch();
  const actState = useSelector(getState);
  const roomSize = roomData.roomSize;

  const [syncd, setSyncd] = useState(false);

  const [onLoad, setOnLoad] = useState(true);

  const stateChanged = (resp) => {
    console.log("frissült a state");
    dispatch(updateState(resp.state));
  };

  if (onLoad === true) {
    listener(stateChanged);
    setOnLoad(false);
  }

  if (parseInt(actState.room.roomSize) === actState.players.players.length) {
    onSelect(3);
  }
  if (actState.players.players.length > 0 && !syncd) {
    sendMessage("sync-state", [roomData.roomId, actState, true], (resp2) => {
      if (resp2.status === "ok") {
        console.log("felkuldott state");
        console.log(actState);
        setSyncd(true);
      }
    });
  }
  //state updatelés

  return (
    <div className="container bg-blue">
      <div className="row">
        <div className="col-sm-12">
          <h2>Szoba ID: {roomData.roomId}</h2>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12">
          <h4>
            {roomSize}/{actState.players.players.length} Játékos áll készen
          </h4>
        </div>
      </div>
      <PlayerCard />

      <button
        type="button"
        className="p-3 btn btn-secondary bg-dark m-3"
        onClick={() => onSelect(1)}
      >
        Vissza a főoldalra
      </button>
    </div>
  );
}
