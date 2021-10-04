import { useDispatch, useSelector } from "react-redux";
import logo from "../assets/logo.jpg";
import pdf from "../assets/szabalyzat.pdf";
import { getSocketID, sendMessage } from "../socketApi";
import { add_player, set_default_players } from "../state/players/actions";
import { ticketToRideData } from "../assets/ticket-to-ride-data";
import { create_room, joined_room } from "../state/room/actions";
import { updateState, getState } from "../state/store";

const longDestinations = Object.values(ticketToRideData.longDestinations);
const shortDestinations = Object.values(ticketToRideData.destinations);

export function MainPage({ onSelect }) {
  const dispatch = useDispatch();
  const roomData = useSelector((state) => state.room);
  const actualState = useSelector(getState);

  const newRoom = () => {
    const player_count = document.getElementById("numb").value;
    const player_name = document.getElementById("new_game_name").value;
    const error_place = document.getElementById("errormsg_create");

    if (roomData.roomId !== null) {
      dispatch(set_default_players());
    }

    if (player_name === "") {
      error_place.innerHTML = "Adjon meg egy nevet!";
      return;
    }
    if (player_count < 2 || player_count > 5) {
      error_place.innerHTML = "Adjon meg egy számot 2 és 5 között";
      return;
    }
    sendMessage("create-room", [player_count], (resp) => {
      if (resp.status === "ok") {
        dispatch(
          add_player({
            id: getSocketID(),
            name: player_name,
            trains: 45,
            train_cards: [],
            long_distance_card:
              longDestinations[
                Math.floor(Math.random() * longDestinations.length)
              ],
            short_distance_cards: [
              shortDestinations[
                Math.floor(Math.random() * shortDestinations.length)
              ],
              shortDestinations[
                Math.floor(Math.random() * shortDestinations.length)
              ],
              shortDestinations[
                Math.floor(Math.random() * shortDestinations.length)
              ],
              shortDestinations[
                Math.floor(Math.random() * shortDestinations.length)
              ],
            ],
            placed_connections: [],
            moves: [],
          })
        );
        dispatch(
          create_room({
            roomId: resp.roomId,
            roomSize: player_count,
            roomSyncdUp: false,
          })
        );
        onSelect(2);
        //const actualState = useSelector(getState);
      } else if (resp.status === "error") {
        error_place.innerHTML = resp.message;
        return;
      }
    });
  };

  const connectToRoom = () => {
    const room_code = document.getElementById("room_id").value;
    const player_name = document.getElementById("name2").value;
    const error_place = document.getElementById("errormsg_join");

    if (player_name === "") {
      error_place.innerHTML = "Adjon meg egy nevet!";
      return;
    }
    if (room_code === "") {
      error_place.innerHTML = "Adjon meg egy szoba kódot";
      return;
    }

    sendMessage("join-room", [room_code], (resp) => {
      console.log("resp:");
      console.log(resp);
      if (resp.status === "ok") {
        console.log("resp:");
        console.log(resp);
        const state = JSON.parse(resp.state);
        dispatch(updateState(state));

        dispatch(
          add_player({
            id: getSocketID(),
            name: player_name,
            trains: 45,
            train_cards: [],
            long_distance_card:
              longDestinations[
                Math.floor(Math.random() * longDestinations.length)
              ],
            short_distance_cards: [
              shortDestinations[
                Math.floor(Math.random() * shortDestinations.length)
              ],
              shortDestinations[
                Math.floor(Math.random() * shortDestinations.length)
              ],
              shortDestinations[
                Math.floor(Math.random() * shortDestinations.length)
              ],
              shortDestinations[
                Math.floor(Math.random() * shortDestinations.length)
              ],
            ],
            placed_connections: [],
            moves: [],
          })
        );
        dispatch(joined_room(room_code));

        //dispatch(joinRoom(code));
        onSelect(2);
      } else if (resp.status === "error") {
        error_place.innerHTML = resp.message;
        return;
      }
    });
  };
  return (
    <div className="container bg-blue align-items-center">
      <h1>Tickets to ride</h1>
      <div className="row justify-content-left align-items-center">
        <div className="col-sm-6 p-3">
          <img className="p-3 img-fluid" src={logo} alt="" />
        </div>
        <div className="col-sm-6 justify-content-center p-3">
          <div className="row button p-3 d-flex">
            <a
              className="flex-fill d-flex"
              href={pdf}
              rel="noopener noreferrer"
              target="_blank"
            >
              <button
                type="button"
                className="flex-fill p-3 btn btn-secondary bg-dark m-3"
              >
                Szabályzat
              </button>
            </a>
          </div>
          <div className="border justify-content-center border-secondary d-flex container p-3">
            <form className="container">
              <div
                className="row text-danger flex-fill"
                id="errormsg_create"
              ></div>
              <div className="p-3 row">
                <label className="flex-fill p-1" htmlFor="new_game_name">
                  Név:
                </label>
                <input className="flex-fill" type="text" id="new_game_name" />
              </div>
              <div className="p-3 row">
                <label className="flex-fill p-1" htmlFor="numb">
                  Játékosok száma:
                </label>
                <input
                  className="flex-fill"
                  type="number"
                  min="2"
                  max="5"
                  id="numb"
                />
              </div>

              <button
                type="button"
                className="p-3 row btn btn-secondary flex-fill bg-dark m-3"
                onClick={() => newRoom()}
              >
                Új Játék
              </button>
            </form>
          </div>
          <div className="border border-secondary row p-3 d-flex container form-group">
            <form className="container">
              <div
                className="row text-danger flex-fill"
                id="errormsg_join"
              ></div>
              <div className="p-3 row">
                <label htmlFor="name2" className="flex-fill p-1">
                  Név:
                </label>
                <input className="form-text flex-fill" type="text" id="name2" />
              </div>
              <div className="p-3 row flex-fill d-flex">
                <label className="flex-fill p-1" htmlFor="room_id">
                  Szoba ID:
                </label>
                <input
                  className="flex-fill form-text"
                  type="text"
                  id="room_id"
                />
              </div>
              <button
                type="button"
                className="p-3 btn btn-secondary flex-fill bg-dark m-3"
                onClick={() => connectToRoom()}
              >
                Csatlakozás
              </button>
            </form>
          </div>
        </div>
      </div>
      <a href="https://i.pinimg.com/736x/21/dc/7a/21dc7a30bc0ce28b2b84503ff9b0a784.jpg">
        graphic design is my passion
      </a>
    </div>
  );
}
