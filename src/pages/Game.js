import { ticketToRideData } from "../assets/ticket-to-ride-data";
import { GameBoard } from "./GameBoard";
import { Players } from "./Players";
import { TicketCard } from "./TickerCard";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pickUpCard, pullToDesk } from "../state/cards/actions";
import {
  addConnection,
  nextPlayer,
  pullCardToPlayer,
  takeAwayCards,
  actionList,
} from "../state/players/actions";
import { cardData } from "../cards";
import { clearCities } from "../state/map/actions";
import { updateState, getState } from "../state/store";
import { getSocketID, sendMessage } from "../socketApi";

export function Game({ onSelect }) {
  const [placed, setPlaced] = useState([1]);

  const playerDatas = useSelector((state) => state.players);
  const players = playerDatas.players;

  const cards = useSelector((state) => state.cards);

  const actualPlayer = players.find(
    (player) => player.id === playerDatas.actualPlayer
  );

  const thisPlayer = players.find((player) => player.id === getSocketID());

  let amIActive = false;
  if (actualPlayer.id === getSocketID()) {
    amIActive = true;
  }
  const dispatch = useDispatch();

  const [checkedCity, setCity] = useState(null);
  const [twoCitiesChecked, setTwoCitiesChecked] = useState(false);

  const [cardsNeeded, setCardsNeeded] = useState(null);
  const [cardsToPick, setCardsToPick] = useState([]);
  const [cardsToShow, setCardsToShow] = useState([]);

  const [pulledCards, setPulledCards] = useState(0);

  const [round, setRound] = useState(1);

  const [syncd, setSyncd] = useState(true);

  function goNextRound() {
    setCardsNeeded(null);
    setCity(null);
    setTwoCitiesChecked(false);
    dispatch(clearCities());
    dispatch(nextPlayer(round));
    setRound(round + 1);
    setPulledCards(0);
    setCardsToPick([]);
    setCardsToShow([]);
    setSyncd(false);
  }

  const actualState = useSelector(getState);

  if (syncd === false) {
    sendMessage(
      "sync-state",
      [actualState.room.roomId, actualState, true],
      (resp) => {
        if (resp.status === "ok") {
          console.log("felkuldott state játék közben");
          console.log(actualState);
          setSyncd(true);
        }
      }
    );
  }

  return (
    <div className="bg-blue h-100 page">
      <div className="row play_area">
        <div className="col-lg-2 card_holders bg-dark text-white border">
          <h3> Kártyák az asztalon</h3>
          <div
            className="m-4 row playing_card bg-dark border"
            onClick={() => {
              if (checkedCity === null && amIActive) {
                const card_from_pack = {
                  id: 10,
                  color:
                    cardData.possibleCards[
                      Math.floor(Math.random() * cardData.possibleCards.length)
                    ],
                };
                if (pulledCards < 1) {
                  dispatch(pullCardToPlayer(card_from_pack));
                  setPulledCards(pulledCards + 1);
                  setSyncd(false);
                } else {
                  dispatch(pullCardToPlayer(card_from_pack));
                  dispatch(actionList("Húzott 2-t a pakliból"));
                  goNextRound();
                }
              }
            }}
          >
            Húzó pakli
          </div>
          {cards.cardsOnTable.map((card) => {
            return (
              <div
                style={{ backgroundColor: card.color }}
                className="m-4 row playing_card border"
                onClick={() => {
                  if (checkedCity === null && amIActive) {
                    if (pulledCards < 1) {
                      dispatch(pickUpCard(card));
                      dispatch(pullToDesk(card));
                      dispatch(pullCardToPlayer(card));
                      setPulledCards(pulledCards + 1);
                      if (card.color === "black") {
                        dispatch(actionList("Húzott egy mozdonykártyát"));
                        goNextRound();
                      } else {
                        setSyncd(false);
                      }
                    } else {
                      if (card.color !== "black") {
                        dispatch(pickUpCard(card));
                        dispatch(pullToDesk(card));
                        dispatch(pullCardToPlayer(card));
                        dispatch(actionList("Húzott a felfedett kártyákból"));
                        goNextRound();
                      }
                    }
                  }
                }}
              ></div>
            );
          })}
        </div>

        <GameBoard
          cardsNeeded={cardsNeeded}
          setCardsNeeded={setCardsNeeded}
          checkedCity={checkedCity}
          setCity={setCity}
          twoCitiesChecked={twoCitiesChecked}
          setTwoCitiesChecked={setTwoCitiesChecked}
          pulledCards={pulledCards}
          key="1"
        />
        <div className="col-lg-2 justify-content-center bg-dark text-white border card_holders">
          <h3> Kártyák a kézben</h3>
          {thisPlayer.train_cards.map((card) => {
            return (
              <div
                style={{
                  backgroundColor: card.color,
                  color:
                    card.color === "yellow" || card.color === "white"
                      ? "black"
                      : "white",
                }}
                className="h-20 m-4 row border "
                onClick={() => {
                  if (cardsNeeded !== null && amIActive) {
                    if (
                      card.color === cardsNeeded.color ||
                      card.color === "black"
                    ) {
                      var db = cardsToPick.length;
                      setCardsToPick([...cardsToPick, card.color]);
                      dispatch(takeAwayCards([...cardsToShow, card.color]));
                      setCardsToShow([]);

                      if (db + 1 === cardsNeeded.elements.length) {
                        //dispatch(takeAwayCards([...cardsToPick, card.color]));
                        console.log("ezt adom at:");
                        console.log(cardsNeeded);
                        dispatch(addConnection(cardsNeeded));
                        dispatch(actionList("Utat épített"));
                        goNextRound();
                      } else {
                        setSyncd(false);
                      }
                    }
                  }
                }}
              >
                <h2>{card.count}</h2>
              </div>
            );
          })}
        </div>
        {cardsToPick.length > 0 ? (
          <div className="position-absolute mx-auto row h-25 w-20 ">
            {cardsToPick.length > 0
              ? cardsToPick.map((card) => {
                  return (
                    <div
                      className="col m-1 border h-100"
                      style={{ backgroundColor: card }}
                    ></div>
                  );
                })
              : ""}
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="row m-0 p-0">
        <TicketCard actualPlayer={thisPlayer} />
        <Players actualPlayer={actualPlayer} players={players} />
      </div>
      <button
        type="button"
        className="p-3 btn btn-secondary bg-dark m-3"
        onClick={() => onSelect(1)}
      >
        Vissza a kezdőképernyőre
      </button>
    </div>
  );
}
