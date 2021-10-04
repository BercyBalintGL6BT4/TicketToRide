import { useSelector } from "react-redux";

export function PlayerCard() {
  const playerDatas = useSelector((state) => state.players);
  const players = playerDatas.players;
  return (
    <div className="row">
      {players.map((player) => {
        return (
          <div className="card col">
            <div className="card-body">
              <h5 className="card-title">{player.name}</h5>
            </div>
          </div>
        );
      })}
    </div>
  );
}
