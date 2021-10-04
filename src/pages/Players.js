import { useDispatch, useSelector } from "react-redux";

export function Players() {
  const playerDatas = useSelector((state) => state.players);
  const players = playerDatas.players;
  const actualPlayerID = playerDatas.actualPlayer;
  return (
    <div className="m-3 position-relative col w-50 align-self-right text-white bg-dark border">
      <div className="row">
        {players.map((player) => {
          return (
            <div
              className="col border"
              style={{
                backgroundColor: player.id === actualPlayerID ? "blue" : "gray",
              }}
              key={player.id}
            >
              <div className="row">{player.name}</div>
              <div className="row">Vagonok száma:{player.trains}</div>
              {player.moves.length > 0 && (
                <div className="row border">
                  Utolsó lépése: {player.moves[player.moves.length - 1]}
                </div>
              )}
              {player.moves.length > 1 && (
                <div className="row border">
                  Utolsó előtti lépése:{player.moves[player.moves.length - 2]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
